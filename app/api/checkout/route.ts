import { NextRequest, NextResponse } from 'next/server';
import { getTourBySlug } from '@/lib/data';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function toAmount(value: number) {
  return Math.round(value * 100);
}

export async function POST(req: NextRequest) {
  try {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) return NextResponse.json({ ok: false, error: 'Missing STRIPE_SECRET_KEY' }, { status: 500 });

    const body = await req.json().catch(() => ({}));
    const { slug, adults = 0, children = 0, date, pickup, notes } = body || {};
    if (!slug) return NextResponse.json({ ok: false, error: 'Missing tour slug' }, { status: 400 });
    if ((adults || 0) <= 0 && (children || 0) <= 0) return NextResponse.json({ ok: false, error: 'Group must include at least one guest' }, { status: 400 });

    const tour = getTourBySlug(String(slug));
    if (!tour) return NextResponse.json({ ok: false, error: 'Tour not found' }, { status: 404 });

    // If price is 0, this tour is "Contact for Pricing"
    if (!tour.priceFromFJD || tour.priceFromFJD <= 0) {
      return NextResponse.json({ ok: false, error: 'This tour requires enquiry to book' }, { status: 400 });
    }

    const website = process.env.NEXT_PUBLIC_WEBSITE_URL || process.env.NEXT_PUBLIC_APP_URL || '';
    const baseUrl = website || new URL(req.url).origin;

    const successUrl = `${baseUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}&slug=${encodeURIComponent(tour.slug)}`;
    const cancelUrl = `${baseUrl}/booking/cancelled?slug=${encodeURIComponent(tour.slug)}`;

    // Build line items dynamically using price_data
    const items: Array<[string, string][]> = [];
    let i = 0;
    if ((adults || 0) > 0) {
      const idx = i++;
      items.push([
        ['line_items[' + idx + '][price_data][currency]', tour.currency.toLowerCase()],
        ['line_items[' + idx + '][price_data][unit_amount]', String(toAmount(tour.priceFromFJD))],
        ['line_items[' + idx + '][price_data][product_data][name]', `${tour.name} — Adult`],
        ['line_items[' + idx + '][quantity]', String(Math.max(0, adults))],
      ]);
    }
    if ((children || 0) > 0 && tour.childPriceFromFJD && tour.childPriceFromFJD > 0) {
      const idx = i++;
      items.push([
        ['line_items[' + idx + '][price_data][currency]', tour.currency.toLowerCase()],
        ['line_items[' + idx + '][price_data][unit_amount]', String(toAmount(tour.childPriceFromFJD))],
        ['line_items[' + idx + '][price_data][product_data][name]', `${tour.name} — Child`],
        ['line_items[' + idx + '][quantity]', String(Math.max(0, children))],
      ]);
    }

    const params: [string, string][] = [
      ['mode', 'payment'],
      ['success_url', successUrl],
      ['cancel_url', cancelUrl],
      // Metadata for webhook/ops
      ['metadata[slug]', tour.slug],
      ['metadata[tour]', tour.name],
      ...(date ? [['metadata[date]', String(date)]] : []),
      ...(pickup ? [['metadata[pickup]', String(pickup)]] : []),
      ...(notes ? [['metadata[notes]', String(notes)]] : []),
      ['metadata[adults]', String(Math.max(0, adults || 0))],
      ['metadata[children]', String(Math.max(0, children || 0))],
    ];

    // Flatten items into params
    for (const kvs of items) params.push(...kvs);

    const bodyEncoded = new URLSearchParams(params);

    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: { authorization: `Bearer ${key}`, 'content-type': 'application/x-www-form-urlencoded' },
      body: bodyEncoded,
    });
    if (!res.ok) {
      const txt = await res.text();
      return NextResponse.json({ ok: false, error: `Stripe error: ${res.status} ${txt}` }, { status: 500 });
    }
    const json: any = await res.json();
    return NextResponse.json({ ok: true, id: json.id, url: json.url });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || String(e) }, { status: 500 });
  }
}

