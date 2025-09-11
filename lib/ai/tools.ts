import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { getAllTours } from "@/lib/data";
import { listCalendarEvents, isCalendarConfigured, createCalendarEvent } from "@/lib/googleCalendar";
import { postBookingFlow, PostBookingInput } from "@/agents/tgt/postBooking";
import {
  appendLeadRow,
  updateLeadRow,
  appendQuoteRow,
  updateQuoteRow,
  findQuoteRowById,
} from "@/lib/googleSheets";

function normalize(str: string) {
  return str.toLowerCase();
}

const searchSchema = z.object({
  query: z
    .string()
    .describe(
      "Free text such as 'waterfall', 'Nadi temple', 'horse riding', or 'Sigatoka pottery'"
    ),
  location: z.string().optional().describe("Preferred area like Nadi, Sabeto, Sigatoka, Mamanuca"),
  maxHours: z.number().optional().describe("Maximum duration in hours"),
  maxPriceFJD: z.number().optional().describe("Maximum adult price in FJD"),
});

export const searchTours = new DynamicStructuredTool({
  name: "search_tours",
  description:
    "Search available tours by free-text query and optional filters (location, maxHours, maxPriceFJD). Return up to 5 best matches.",
  schema: searchSchema,
  // Keep input looser to avoid deep zod inference issues in TS
  func: async (args: any) => {
    const { query, location, maxHours, maxPriceFJD } = args as z.infer<typeof searchSchema>;
    const q = normalize(query || "");
    const tours = getAllTours();

    const scored = tours
      .map((t) => {
        let score = 0;
        const haystack = [
          t.slug,
          t.name,
          t.tagline,
          t.shortDescription,
          ...(t.locations || []),
          ...(t.highlights || []),
        ]
          .filter(Boolean)
          .map(String)
          .map(normalize)
          .join(" \n ");

        // Basic keyword scoring
        q.split(/\s+/).forEach((word) => {
          if (!word) return;
          if (haystack.includes(word)) score += 2;
        });

        // Filters
        if (location && t.locations?.map(normalize).some((l) => l.includes(normalize(location)))) {
          score += 3;
        }
        if (typeof maxHours === "number" && t.durationHours <= maxHours) {
          score += 1;
        }
        if (
          typeof maxPriceFJD === "number" &&
          typeof t.priceFromFJD === "number" &&
          t.priceFromFJD > 0 &&
          t.priceFromFJD <= maxPriceFJD
        ) {
          score += 2;
        }

        return { score, tour: t };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((x) => x.tour);

    return JSON.stringify(
      scored.map((t) => ({
        slug: t.slug,
        name: t.name,
        priceFromFJD: t.priceFromFJD,
        durationHours: t.durationHours,
        locations: t.locations,
        highlights: t.highlights?.slice(0, 3),
        paymentLinks: t.paymentLinks,
      }))
    );
  },
});

const availabilitySchema = z.object({
  startISO: z.string().optional().describe("Start of range in ISO 8601, defaults to now"),
  endISO: z.string().optional().describe("End of range in ISO 8601, defaults to +14 days"),
  limit: z.number().optional().describe("Max number of events to return, default 10"),
});

export const checkAvailability = new DynamicStructuredTool({
  name: "check_availability",
  description:
    "Check upcoming availability from the Google Calendar. Optionally specify a date range; returns upcoming events and calendar embed URL.",
  schema: availabilitySchema,
  func: async (args: any) => {
    const { startISO, endISO, limit = 10 } = args as z.infer<typeof availabilitySchema>;
    const calendarId = process.env.GOOGLE_CALENDAR_ID ||
      "7c946f45f3b3918035d691a7e1a4f12dbc55aad72978973d50ac5171538ae013@group.calendar.google.com";
    const embedUrl = process.env.NEXT_PUBLIC_CALENDAR_EMBED_SRC ||
      "https://calendar.google.com/calendar/embed?src=7c946f45f3b3918035d691a7e1a4f12dbc55aad72978973d50ac5171538ae013%40group.calendar.google.com&ctz=Pacific%2FPago_Pago";

    const now = new Date();
    const start = startISO ? new Date(startISO) : now;
    const end = endISO ? new Date(endISO) : new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

    if (!isCalendarConfigured()) {
      // Graceful fallback: return embed link only
      return JSON.stringify({
        configured: false,
        message: "Service Account not configured; showing public calendar embed link.",
        calendarId,
        embedUrl,
      });
    }

    const events = await listCalendarEvents({
      calendarId,
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      maxResults: Math.max(1, Math.min(50, limit)),
    });

    return JSON.stringify({
      configured: true,
      calendarId,
      embedUrl,
      events: events.map((e) => ({
        id: e.id,
        status: e.status,
        summary: e.summary,
        description: e.description,
        start: e.start,
        end: e.end,
        location: e.location,
      })),
    });
  },
});

// --- CRM: create lead ---
const createLeadSchema = z.object({
  name: z.string().optional().describe("Full name of the contact"),
  email: z.string().email().describe("Email address"),
  phone: z.string().optional().describe("Phone/WhatsApp number"),
  source: z.string().describe("Source attribution, e.g. 'Chat', 'Website', 'WhatsApp'")
    .default('Chat'),
  stage: z.string().optional().describe("Pipeline stage: New/Contacted/Qualified/Booked/Lost").default('New'),
});

export const createCrmLead = new DynamicStructuredTool({
  name: "create_crm_lead",
  description: "Create/update lead in CRM (Google Sheets). Stores basic contact and stage.",
  schema: createLeadSchema,
  func: async (args: any) => {
    const { name, email, phone, source, stage } = args as z.infer<typeof createLeadSchema>;
    if (!process.env.GOOGLE_SHEETS_ID) {
      return JSON.stringify({ ok: false, error: "CRM not configured (missing GOOGLE_SHEETS_ID)" });
    }
    const ts = new Date().toISOString();
    await appendLeadRow([
      ts,            // Created At
      name || '',    // Name
      email,         // Email
      phone || '',   // WhatsApp/Phone
      '',            // Tour
      '',            // Dates
      '',            // Group Size
      stage || 'New',// Status
      source || '',  // Notes (store source here)
      '',            // Message
    ]);
    // We can't easily get row number here from generic helper; leads UI is for admins.
    return JSON.stringify({ ok: true, email, stage: stage || 'New' });
  },
});

// --- CRM: update stage ---
const updateStageSchema = z.object({
  leadId: z.string().describe("Lead row number in the sheet"),
  stage: z.string().describe("New/Contacted/Qualified/Booked/Lost"),
});

export const updateCrmStage = new DynamicStructuredTool({
  name: "update_crm_stage",
  description: "Update a CRM lead's pipeline stage (Google Sheets row).",
  schema: updateStageSchema,
  func: async (args: any) => {
    const { leadId, stage } = args as z.infer<typeof updateStageSchema>;
    if (!process.env.GOOGLE_SHEETS_ID) {
      return JSON.stringify({ ok: false, error: "CRM not configured (missing GOOGLE_SHEETS_ID)" });
    }
    const row = parseInt(String(leadId), 10);
    if (!row) return JSON.stringify({ ok: false, error: "Invalid leadId (row)" });
    await updateLeadRow(row, { Status: stage });
    return JSON.stringify({ ok: true, leadId, stage });
  },
});

// --- Quotes: create provisional quote ---
const createQuoteSchema = z.object({
  tourId: z.string().describe("Tour slug or ID"),
  date: z.string().describe("Requested date (ISO or free-text)"),
  pax: z.number().int().describe("Number of guests"),
  currency: z.string().describe("Currency code, e.g., FJD, USD"),
});

export const createQuote = new DynamicStructuredTool({
  name: "create_quote",
  description: "Create a provisional quote and hold seats (records to Google Sheets; optional calendar hold).",
  schema: createQuoteSchema,
  func: async (args: any) => {
    const { tourId, date, pax, currency } = args as z.infer<typeof createQuoteSchema>;
    if (!process.env.GOOGLE_SHEETS_ID) {
      return JSON.stringify({ ok: false, error: "Quotes not configured (missing GOOGLE_SHEETS_ID)" });
    }
    const quoteId = `Q-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    const ts = new Date().toISOString();
    const res = await appendQuoteRow([
      ts,          // Created At
      quoteId,     // Quote ID
      tourId,      // Tour ID
      date,        // Date
      String(pax), // Pax
      currency.toUpperCase(), // Currency
      '',          // Amount
      '',          // Email
      'Quote Created', // Status
      '',          // Stripe Session ID
      '',          // Payment Link
      '',          // Payment Intent ID (reserved)
    ]);

    // Optional calendar hold: create a tentative 30-min hold now
    if (isCalendarConfigured()) {
      try {
        const start = new Date();
        const end = new Date(start.getTime() + 30 * 60 * 1000);
        await createCalendarEvent({
          calendarId: process.env.GOOGLE_CALENDAR_ID!,
          summary: `Quote Hold: ${tourId} — ${pax} pax`,
          description: `Quote ${quoteId} for ${date} (${currency})`,
          startISO: start.toISOString(),
          endISO: end.toISOString(),
        });
      } catch {
        // non-fatal
      }
    }

    return JSON.stringify({ ok: true, quoteId, row: res.row });
  },
});

// --- Payments: create a Stripe pay link (via Checkout Session) ---
const createPaymentIntentSchema = z.object({
  quoteId: z.string(),
  amount: z.number().int().describe("Amount in the smallest currency unit (e.g., cents)"),
  currency: z.string().describe("Currency code, e.g., fjd"),
  email: z.string().email().describe("Customer email for receipt"),
});

export const createStripePaymentIntent = new DynamicStructuredTool({
  name: "create_stripe_payment_intent",
  description:
    "Create a Stripe Payment Intent and return a hosted pay link (Checkout Session). Stores link + session against the quote.",
  schema: createPaymentIntentSchema,
  func: async (args: any) => {
    const { quoteId, amount, currency, email } = args as z.infer<typeof createPaymentIntentSchema>;
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) return JSON.stringify({ ok: false, error: "Missing STRIPE_SECRET_KEY" });
    if (!process.env.GOOGLE_SHEETS_ID) {
      return JSON.stringify({ ok: false, error: "Quotes not configured (missing GOOGLE_SHEETS_ID)" });
    }
    const quote = await findQuoteRowById(quoteId);
    if (!quote) return JSON.stringify({ ok: false, error: "Quote not found" });
    const tourId = quote.data['Tour ID'] || quote.data['TourId'] || 'Tour Booking';
    const website = process.env.NEXT_PUBLIC_WEBSITE_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://timagreentours.com';
    const successUrl = `${website}/booking/success?session_id={CHECKOUT_SESSION_ID}&quote=${encodeURIComponent(quoteId)}`;
    const cancelUrl = `${website}/booking/cancelled?quote=${encodeURIComponent(quoteId)}`;

    const params = new URLSearchParams();
    params.set('mode', 'payment');
    params.set('success_url', successUrl);
    params.set('cancel_url', cancelUrl);
    params.set('customer_email', email);
    // One-off line item
    params.set('line_items[0][price_data][currency]', currency.toLowerCase());
    params.set('line_items[0][price_data][unit_amount]', String(amount));
    params.set('line_items[0][price_data][product_data][name]', `Deposit for ${tourId}`);
    params.set('line_items[0][quantity]', '1');
    // Metadata
    params.set('metadata[quoteId]', quoteId);
    params.set('metadata[tourId]', String(tourId));

    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: { authorization: `Bearer ${key}`, 'content-type': 'application/x-www-form-urlencoded' },
      body: params,
    });
    if (!res.ok) {
      const txt = await res.text();
      return JSON.stringify({ ok: false, error: `Stripe error: ${res.status} ${txt}` });
    }
    const json: any = await res.json();
    const sessionId = json.id as string;
    const url = json.url as string;

    // Persist details to Quotes row
    await updateQuoteRow(quote.row, {
      'Amount': String(amount),
      'Currency': currency.toUpperCase(),
      'Email': email,
      'Stripe Session ID': sessionId,
      'Payment Link': url,
      'Status': 'Payment Link Created',
    });

    return JSON.stringify({ ok: true, payUrl: url, sessionId });
  },
});

// --- Confirm booking (after payment) ---
const confirmBookingSchema = z.object({
  quoteId: z.string(),
  paymentIntentId: z.string().optional().describe('Payment intent or session identifier'),
});

export const confirmBooking = new DynamicStructuredTool({
  name: "confirm_booking",
  description: "Confirm booking after successful payment; marks quote as Confirmed.",
  schema: confirmBookingSchema,
  func: async (args: any) => {
    const { quoteId, paymentIntentId } = args as z.infer<typeof confirmBookingSchema>;
    if (!process.env.GOOGLE_SHEETS_ID) {
      return JSON.stringify({ ok: false, error: "Quotes not configured (missing GOOGLE_SHEETS_ID)" });
    }
    const quote = await findQuoteRowById(quoteId);
    if (!quote) return JSON.stringify({ ok: false, error: "Quote not found" });
    await updateQuoteRow(quote.row, {
      'Status': 'Confirmed',
      ...(paymentIntentId ? { 'Payment Intent ID': paymentIntentId } : {}),
    });
    const bookingId = `B-${quoteId}`;
    // Optionally kick off post-booking orchestration (non-blocking best-effort)
    try {
      await postBookingFlow.invoke({ quoteId, bookingId }).catch(() => null);
    } catch {}
    return JSON.stringify({ ok: true, bookingId });
  },
});

// --- Send confirmation ---
const sendConfirmationSchema = z.object({
  bookingId: z.string(),
  channel: z.enum(["email", "sms", "whatsapp"]),
});

export const sendConfirmation = new DynamicStructuredTool({
  name: "send_confirmation",
  description: "Send itinerary/receipt to the guest via the selected channel (email supported).",
  schema: sendConfirmationSchema,
  func: async (args: any) => {
    const { bookingId, channel } = args as z.infer<typeof sendConfirmationSchema>;
    // Minimal: treat bookingId as quoteId for lookup
    const quoteId = bookingId.replace(/^B-/, '');
    const quote = await findQuoteRowById(quoteId).catch(() => null);
    const email = quote?.data?.['Email'] || '';

    if (channel === 'email') {
      if (!process.env.RESEND_API_KEY || !email) {
        return JSON.stringify({ ok: false, error: 'Email not configured or missing guest email' });
      }
      try {
        const html = `\n          <h2>Your Booking is Confirmed</h2>\n          <p>Booking: ${bookingId}</p>\n          <p>Quote: ${quoteId}</p>\n          <p>Tour: ${quote?.data?.['Tour ID'] || ''}</p>\n          <p>Date: ${quote?.data?.['Date'] || ''}</p>\n          <p>Pax: ${quote?.data?.['Pax'] || ''}</p>\n          <p>We look forward to hosting you. Vinaka vakalevu!</p>\n        `;
        // Lightweight send via Resend REST API to avoid SDK dependency
        const payload = {
          from: process.env.CONTACT_FROM_EMAIL || 'Tima Green Tours <noreply@mg.timagreentours.com>',
          to: email,
          subject: 'Your Tima Green Tours Booking Confirmation',
          html,
        };
        const r = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { 'content-type': 'application/json', authorization: `Bearer ${process.env.RESEND_API_KEY}` },
          body: JSON.stringify(payload),
        });
        if (!r.ok) {
          const txt = await r.text();
          return JSON.stringify({ ok: false, error: `Send failed: ${r.status} ${txt}` });
        }
        return JSON.stringify({ ok: true, channel: 'email', to: email });
      } catch (e: any) {
        return JSON.stringify({ ok: false, error: String(e?.message || e) });
      }
    }

    // SMS/WhatsApp not wired; return a hint
    return JSON.stringify({ ok: false, error: `Channel ${channel} not supported` });
  },
});

// --- Slack alert ---
const slackSchema = z.object({
  channel: z.string().describe('Slack channel name (for reference)'),
  message: z.string(),
});

export const postSlackAlert = new DynamicStructuredTool({
  name: "post_slack_alert",
  description: "Notify ops in Slack via incoming webhook for edge cases or VIPs.",
  schema: slackSchema,
  func: async (args: any) => {
    const { channel, message } = args as z.infer<typeof slackSchema>;
    const url = process.env.SLACK_WEBHOOK_URL;
    if (!url) return JSON.stringify({ ok: false, error: 'Missing SLACK_WEBHOOK_URL' });
    const body = { text: message, channel };
    const res = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
    if (!res.ok) {
      const txt = await res.text();
      return JSON.stringify({ ok: false, error: `Slack error: ${res.status} ${txt}` });
    }
    return JSON.stringify({ ok: true });
  },
});

// --- Orchestrator: run post-booking flow explicitly ---
// Lets the Assistant trigger the LangChain RunnableSequence and be traced in LangSmith
const postBookingSchema = PostBookingInput;

export const runPostBooking = new DynamicStructuredTool({
  name: "run_post_booking",
  description:
    "Run the post-booking automation: enrich Quotes, create Calendar event, notify Slack, email guest. Trace in LangSmith.",
  schema: postBookingSchema,
  func: async (args: any) => {
    try {
      const result = await postBookingFlow.invoke(args);
      return JSON.stringify({ ok: true, result });
    } catch (e: any) {
      return JSON.stringify({ ok: false, error: String(e?.message || e) });
    }
  },
});
