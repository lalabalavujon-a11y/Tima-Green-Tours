import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createCalendarEvent, isCalendarConfigured } from '@/lib/googleCalendar';
import { appendLeadRow } from '@/lib/googleSheets';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json().catch(() => ({}));
    const name = (data.name || '').toString();
    const email = (data.email || '').toString();
    const whatsapp = (data.whatsapp || '').toString();
    const tour = (data.tour || '').toString();
    const dates = (data.dates || '').toString();
    const groupSize = (data['group-size'] || data.groupSize || '').toString();
    const message = (data.message || '').toString();

    // Optional email via Resend
    if (process.env.RESEND_API_KEY && process.env.CONTACT_RECEIVE_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const html = `
        <h2>New Tour Enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>WhatsApp:</strong> ${whatsapp}</p>
        <p><strong>Tour:</strong> ${tour}</p>
        <p><strong>Dates:</strong> ${dates}</p>
        <p><strong>Group size:</strong> ${groupSize}</p>
        <p><strong>Message:</strong></p>
        <pre>${message}</pre>
      `;
      await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL || 'Tima Green Tours <noreply@mg.timagreentours.com>',
        to: process.env.CONTACT_RECEIVE_EMAIL,
        subject: `New enquiry${tour ? `: ${tour}` : ''} from ${name || 'Guest'}`,
        html,
      });
    }

    // Optional Google Calendar event
    if (isCalendarConfigured()) {
      const calendarId = process.env.GOOGLE_CALENDAR_ID!;
      const now = new Date();
      const end = new Date(now.getTime() + 30 * 60 * 1000);
      const summary = `Enquiry${tour ? `: ${tour}` : ''} — ${name || 'Guest'}`;
      const description = [
        email ? `Email: ${email}` : null,
        whatsapp ? `WhatsApp: ${whatsapp}` : null,
        dates ? `Preferred Dates: ${dates}` : null,
        groupSize ? `Group Size: ${groupSize}` : null,
        message ? `\n${message}` : null,
      ].filter(Boolean).join('\n');
      await createCalendarEvent({
        calendarId,
        summary,
        description,
        startISO: now.toISOString(),
        endISO: end.toISOString(),
      });
    }

    // Optional: append to Google Sheet CRM
    if (process.env.GOOGLE_SHEETS_ID) {
      const timestamp = new Date().toISOString();
      const status = 'New';
      await appendLeadRow([
        timestamp, // Created At
        name,
        email,
        whatsapp,
        tour,
        dates,
        groupSize,
        status,
        message,
      ]);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact error', err);
    return NextResponse.json({ ok: false, error: 'Failed to submit' }, { status: 500 });
  }
}
