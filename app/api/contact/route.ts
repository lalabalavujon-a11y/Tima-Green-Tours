import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  whatsapp: z.string().optional(),
  message: z.string().min(3).optional(),
  // Booking-specific optional fields
  booking: z.union([z.boolean(), z.string()]).optional(),
  tourSlug: z.string().optional(),
  tourName: z.string().optional(),
  date: z.string().optional(),
  groupSize: z.string().optional()
});

export async function POST(req: Request) {
  const data = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.format() }, { status: 400 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? 'bookings@timagreentours.com';
  const from = process.env.CONTACT_FROM ?? 'web@timagreentours.com';

  // If Resend key not set, fail gracefully (front-end will show alt contact).
  if (!resendKey) {
    return NextResponse.json({ ok: false, reason: 'Email not configured' }, { status: 503 });
  }

  const resend = new Resend(resendKey);

  const { name, email, whatsapp, message, booking, tourSlug, tourName, date, groupSize } = parsed.data as any;
  const isBooking = booking === true || booking === 'true';
  const subject = isBooking ? `New Booking Request — ${tourName ?? tourSlug ?? 'Tour'} — ${name}` : `New Tour Inquiry — ${name}`;
  const html = `
    <h2>${isBooking ? 'New Booking Request' : 'New Inquiry'}</h2>
    ${isBooking ? `<p><strong>Tour:</strong> ${tourName ?? 'N/A'} (${tourSlug ?? 'n/a'})</p>` : ''}
    ${isBooking ? `<p><strong>Date:</strong> ${date ?? 'N/A'}</p>` : ''}
    ${isBooking ? `<p><strong>Group Size:</strong> ${groupSize ?? 'N/A'}</p>` : ''}
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>WhatsApp:</strong> ${whatsapp ?? 'N/A'}</p>
    ${message ? `<p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>` : ''}
  `;

  try {
    await resend.emails.send({ to, from, subject, html });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
