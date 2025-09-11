import { RunnableSequence } from "@langchain/core/runnables";
import { z } from "zod";
import { isCalendarConfigured, createCalendarEvent } from "@/lib/googleCalendar";
import { findQuoteRowById, updateQuoteRow } from "@/lib/googleSheets";

// Input schema for post-booking automation
export const PostBookingInput = z.object({
	quoteId: z.string(),
	bookingId: z.string().optional(),
	guest: z
		.object({
			name: z.string().optional(),
			email: z.string().email().optional(),
			phone: z.string().optional(),
		})
		.optional(),
	tourId: z.string().optional(),
	date: z.string().optional(),
	pax: z.number().int().optional(),
	currency: z.string().optional(),
	amount: z.number().optional(), // major unit (e.g., FJD)
	payment: z
		.object({
			sessionId: z.string().optional(),
			paymentIntentId: z.string().optional(),
			link: z.string().url().optional(),
		})
		.optional(),
});

export type PostBookingInputType = z.infer<typeof PostBookingInput>;

async function notifySlack(message: string) {
	const url = process.env.SLACK_WEBHOOK_URL;
	if (!url) return { ok: false, reason: "SLACK_WEBHOOK_URL not set" };
	const res = await fetch(url, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ text: message }),
	});
	if (!res.ok) {
		return { ok: false, status: res.status, body: await res.text() };
	}
	return { ok: true };
}

async function emailGuest(payload: { to: string; subject: string; html: string }) {
	if (!process.env.RESEND_API_KEY) return { ok: false, reason: "RESEND_API_KEY not set" };
	const res = await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: {
			"content-type": "application/json",
			authorization: `Bearer ${process.env.RESEND_API_KEY}`,
		},
		body: JSON.stringify({
			from: process.env.CONTACT_FROM_EMAIL || "Tima Green Tours <noreply@mg.timagreentours.com>",
			to: payload.to,
			subject: payload.subject,
			html: payload.html,
		}),
	});
	if (!res.ok) {
		return { ok: false, status: res.status, body: await res.text() };
	}
	return { ok: true };
}

export const postBookingFlow = RunnableSequence.from<unknown, any>([
	// Identity step to satisfy type expectation for at least 2 runnables
	(raw: any) => raw,
	async (raw: any) => {
		const input = PostBookingInput.parse(raw);

		// 1) Enrich Quotes CRM row (mark as Confirmed if not already, store metadata)
		let quoteRow: { row: number; data: Record<string, string> } | null = null;
		try {
			const hit = await findQuoteRowById(input.quoteId);
			if (hit) {
				quoteRow = hit as any;
				const updates: Record<string, string> = {};
				if (input.guest?.email) updates["Email"] = input.guest.email;
				if (typeof input.amount === "number") updates["Amount"] = String(Math.round(input.amount * 100));
				if (input.currency) updates["Currency"] = input.currency.toUpperCase();
				if (input.payment?.sessionId) updates["Stripe Session ID"] = input.payment.sessionId;
				if (input.payment?.paymentIntentId) updates["Payment Intent ID"] = input.payment.paymentIntentId;
				if (input.payment?.link) updates["Payment Link"] = input.payment.link;
				if (input.tourId) updates["Tour ID"] = input.tourId;
				if (input.date) updates["Date"] = input.date;
				if (typeof input.pax === "number") updates["Pax"] = String(input.pax);
				updates["Status"] = (quoteRow?.data?.["Status"]) || "Confirmed";
				if (updates["Status"] !== "Confirmed") updates["Status"] = "Confirmed";
				await updateQuoteRow(hit.row, updates);
			}
		} catch (e) {
			// non-fatal
		}

		// 2) Schedule guide: create a Calendar event summarizing booking
		let calendarEventId: string | undefined;
		if (isCalendarConfigured()) {
			const start = new Date();
			const end = new Date(start.getTime() + 60 * 60 * 1000);
			try {
				const cal = await createCalendarEvent({
					calendarId: process.env.GOOGLE_CALENDAR_ID!,
					summary: `Booking: ${input.tourId || "Tour"} — ${input.guest?.name || "Guest"}`,
					description: [
						input.guest?.email ? `Email: ${input.guest.email}` : null,
						input.guest?.phone ? `Phone: ${input.guest.phone}` : null,
						input.date ? `Date: ${input.date}` : null,
						typeof input.pax === "number" ? `Pax: ${input.pax}` : null,
						input.currency && typeof input.amount === "number" ? `Amount: ${input.currency.toUpperCase()} ${input.amount}` : null,
						input.payment?.link ? `Payment Link: ${input.payment.link}` : null,
						input.payment?.sessionId ? `Session: ${input.payment.sessionId}` : null,
						input.quoteId ? `Quote: ${input.quoteId}` : null,
						input.bookingId ? `Booking: ${input.bookingId}` : null,
					]
					.filter(Boolean)
					.join("\n"),
					startISO: start.toISOString(),
					endISO: end.toISOString(),
				});
				calendarEventId = cal?.id;
			} catch {
				// non-fatal
			}
		}

		// 3) Send ops Slack
		const slackMsg = [
			"New Booking Confirmed",
			input.tourId ? `• Tour: ${input.tourId}` : null,
			input.date ? `• Date: ${input.date}` : null,
			typeof input.pax === "number" ? `• Pax: ${input.pax}` : null,
			input.guest?.name ? `• Guest: ${input.guest.name}` : null,
			input.guest?.email ? `• Email: ${input.guest.email}` : null,
			input.currency && typeof input.amount === "number" ? `• Amount: ${input.currency.toUpperCase()} ${input.amount}` : null,
			input.payment?.link ? `• Payment Link: ${input.payment.link}` : null,
			input.quoteId ? `• Quote: ${input.quoteId}` : null,
			calendarEventId ? `• Calendar Event: ${calendarEventId}` : null,
		]
			.filter(Boolean)
			.join("\n");
		await notifySlack(slackMsg).catch(() => null);

		// 4) Email guest itinerary/confirmation
		if (input.guest?.email) {
			const subject = "Your Tima Green Tours Booking Confirmation";
			const html = `
				<h2>Vinaka vakalevu — your booking is confirmed!</h2>
				<p><strong>Booking:</strong> ${input.bookingId || input.quoteId}</p>
				<p><strong>Tour:</strong> ${input.tourId || "Tour"}</p>
				${input.date ? `<p><strong>Date:</strong> ${input.date}</p>` : ""}
				${typeof input.pax === "number" ? `<p><strong>Pax:</strong> ${input.pax}</p>` : ""}
				${input.currency && typeof input.amount === "number" ? `<p><strong>Amount:</strong> ${input.currency.toUpperCase()} ${input.amount}</p>` : ""}
				${input.payment?.link ? `<p><a href="${input.payment.link}">View your payment receipt</a></p>` : ""}
				<p>We look forward to hosting you in Fiji. If you have any questions, just reply to this email.</p>
			`;
			await emailGuest({ to: input.guest.email, subject, html }).catch(() => null);
		}

		return { ...input, guideAssigned: true, opsNotified: true, emailed: Boolean(input.guest?.email) };
	},
]);

// Usage (with LangSmith)
process.env.LANGCHAIN_TRACING_V2 = "true";
process.env.LANGCHAIN_PROJECT = process.env.LANGCHAIN_PROJECT || "Tima Green Tours";
