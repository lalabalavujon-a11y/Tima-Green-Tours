import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createCalendarEvent, isCalendarConfigured } from '@/lib/googleCalendar';
import { fetchLineItems } from '@/lib/stripe';
import { inferSlugFromText } from '@/lib/tourMap';
import { findQuoteRowById, updateQuoteRow } from '@/lib/googleSheets';

// Stripe webhook signature verification without SDK
function verifyStripeSignature(rawBody: string, sigHeader: string, secret: string) {
  // Stripe header format: t=timestamp,v1=signature[,v1=...]
  const parts = sigHeader.split(',').reduce<Record<string, string[]>>((acc, p) => {
    const [k, v] = p.split('=');
    if (!acc[k]) acc[k] = [];
    acc[k].push(v);
    return acc;
  }, {});
  const timestamp = parts['t']?.[0];
  const v1s = parts['v1'] || [];
  if (!timestamp || v1s.length === 0) return false;

  const payloadToSign = `${timestamp}.${rawBody}`;
  const expected = crypto.createHmac('sha256', secret).update(payloadToSign, 'utf8').digest('hex');
  // constant-time compare against any of the provided signatures
  return v1s.some((v1) => crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(v1)));
}

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!secret) return NextResponse.json({ ok: false, error: 'Missing STRIPE_WEBHOOK_SECRET' }, { status: 500 });

    const raw = await req.text();
    const sig = req.headers.get('stripe-signature') || '';
    const valid = verifyStripeSignature(raw, sig, secret);
    if (!valid) return NextResponse.json({ ok: false, error: 'Invalid signature' }, { status: 400 });

    const event = JSON.parse(raw);
    // Handle only completed Checkout Sessions (Payment Links flow)
    if (event.type === 'checkout.session.completed') {
      const s = event.data?.object || {};
      const customerEmail = s.customer_details?.email || s.customer_email || 'unknown@customer';
      const customerName = s.customer_details?.name || 'Guest';
      const amountTotal = typeof s.amount_total === 'number' ? s.amount_total / 100 : undefined;
      const currency = (s.currency || 'fjd').toUpperCase();
      const paymentLink = s.payment_link || s.payment_link_id || '';
      let tour = s.metadata?.tour || s.metadata?.product || s.metadata?.name || '';
      let slug: string | null = tour ? inferSlugFromText(tour) : null;

      // Optionally fetch line items to infer tour/product name and adult/child counts
      if (!slug && s.id && process.env.STRIPE_SECRET_KEY) {
        try {
          const items = await fetchLineItems(s.id, process.env.STRIPE_SECRET_KEY);
          const descriptions: string[] = [];
          let adultQty = 0;
          let childQty = 0;
          for (const li of items.data || []) {
            const parts: string[] = [];
            if (li.description) parts.push(li.description);
            if (li.price?.nickname) parts.push(li.price.nickname);
            if (li.price?.product && li.price?.product.name) parts.push(li.price.product.name);
            const joined = parts.join(' ');
            descriptions.push(joined);
            const lower = joined.toLowerCase();
            const qty = typeof li.quantity === 'number' ? li.quantity : 0;
            if (lower.includes('child')) childQty += qty;
            else if (lower.includes('adult')) adultQty += qty;
          }
          const joined = descriptions.join(' | ');
          slug = inferSlugFromText(joined);
          if (!tour && joined) tour = joined;
          if (!s.metadata) s.metadata = {};
          s.metadata.adults = String(adultQty);
          s.metadata.children = String(childQty);
        } catch (e) {
          // Non-fatal
          console.warn('Could not fetch Stripe line items', e);
        }
      }
      if (!tour) tour = paymentLink || 'Tour Booking';

      // Update Quotes sheet if we have a quoteId
      const quoteId = s.metadata?.quoteId as string | undefined;
      if (quoteId && process.env.GOOGLE_SHEETS_ID) {
        try {
          const hit = await findQuoteRowById(quoteId);
          if (hit) {
            const amt = typeof amountTotal === 'number' ? String(Math.round(amountTotal * 100)) : hit.data['Amount'] || '';
            await updateQuoteRow(hit.row, {
              'Status': 'Paid',
              'Stripe Session ID': s.id || hit.data['Stripe Session ID'] || '',
              'Amount': amt,
              'Currency': currency,
              'Email': customerEmail || hit.data['Email'] || '',
            });
          }
        } catch (e) {
          console.warn('Quotes update failed', e);
        }
      }

      if (isCalendarConfigured()) {
        const calendarId = process.env.GOOGLE_CALENDAR_ID!;
        const start = new Date();
        const end = new Date(start.getTime() + 60 * 60 * 1000);
        const summary = `Booking: ${tour}${slug ? ` (${slug})` : ''} — ${customerName}`;
        const description = [
          `Email: ${customerEmail}`,
          amountTotal ? `Amount: ${currency} ${amountTotal}` : null,
          paymentLink ? `Payment Link: ${paymentLink}` : null,
          s.id ? `Session: ${s.id}` : null,
          slug ? `Slug: ${slug}` : null,
          s.metadata?.adults ? `Adults: ${s.metadata.adults}` : null,
          s.metadata?.children ? `Children: ${s.metadata.children}` : null,
        ].filter(Boolean).join('\n');
        await createCalendarEvent({
          calendarId,
          summary,
          description,
          startISO: start.toISOString(),
          endISO: end.toISOString(),
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Stripe webhook error', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export const runtime = 'nodejs'; // ensure Node APIs for crypto
export const dynamic = 'force-dynamic';
