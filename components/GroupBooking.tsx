'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { CONTACT_URL } from '@/lib/config';

type Props = {
  tourSlug: string;
  tourName: string;
  currency: string; // e.g., FJD
  adultPriceFJD: number; // unit price per adult (0 means contact-only)
  childPriceFJD?: number; // optional unit price per child
};

function formatMoney(value: number, currency: string) {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
  } catch {
    return `${currency} ${value.toFixed(2)}`;
  }
}

export default function GroupBooking({ tourSlug, tourName, currency, adultPriceFJD, childPriceFJD }: Props) {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [date, setDate] = useState('');
  const [pickup, setPickup] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const childEnabled = typeof childPriceFJD === 'number' && childPriceFJD > 0;
  const total = useMemo(() => {
    const a = Math.max(0, adults) * (adultPriceFJD || 0);
    const c = Math.max(0, children) * (childPriceFJD || 0);
    return a + c;
  }, [adults, children, adultPriceFJD, childPriceFJD]);

  const disabled = adultPriceFJD <= 0; // contact-only tours

  const quickSets = [
    { label: 'Solo', a: 1, c: 0 },
    { label: 'Couple', a: 2, c: 0 },
    ...(childEnabled ? [{ label: 'Family 2+2', a: 2, c: 2 }] as const : []),
  ];

  async function handleCheckout() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          slug: tourSlug,
          adults: Math.max(0, adults),
          children: Math.max(0, children),
          date: date || undefined,
          pickup: pickup || undefined,
          notes: notes || undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || `Checkout failed (${res.status})`);
      }
      const url = json.url as string;
      if (url) window.location.href = url;
      else throw new Error('Missing checkout URL');
    } catch (e: any) {
      setError(e?.message || 'Something went wrong starting checkout');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id="book" className="rounded-xl border border-slate-200 bg-white p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-base font-semibold text-slate-900">Build your group</div>
        <div className="text-sm text-slate-600">{tourName}</div>
      </div>

      <div className="mb-3 flex gap-2">
        {quickSets.map((q) => (
          <button
            key={q.label}
            type="button"
            onClick={() => { setAdults(q.a); setChildren(q.c as number); }}
            className="px-3 py-1.5 rounded-full text-sm bg-slate-100 hover:bg-slate-200 text-slate-700"
          >
            {q.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="rounded-lg border border-slate-200 p-4">
          <div className="text-sm text-slate-600 mb-1">Adults</div>
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">{formatMoney(adultPriceFJD, currency)}</div>
            <div className="flex items-center gap-2">
              <button aria-label="Decrease adults" className="px-3 py-1 rounded-lg border" onClick={() => setAdults((x) => Math.max(0, x - 1))}>-</button>
              <div className="w-8 text-center font-semibold">{adults}</div>
              <button aria-label="Increase adults" className="px-3 py-1 rounded-lg border" onClick={() => setAdults((x) => x + 1)}>+</button>
            </div>
          </div>
        </div>

        <div className={`rounded-lg border border-slate-200 p-4 ${childEnabled ? '' : 'opacity-60'}`}>
          <div className="text-sm text-slate-600 mb-1">Children</div>
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">{childEnabled ? formatMoney(childPriceFJD!, currency) : 'N/A'}</div>
            <div className="flex items-center gap-2">
              <button aria-label="Decrease children" disabled={!childEnabled} className="px-3 py-1 rounded-lg border disabled:opacity-40" onClick={() => setChildren((x) => Math.max(0, x - 1))}>-</button>
              <div className="w-8 text-center font-semibold">{children}</div>
              <button aria-label="Increase children" disabled={!childEnabled} className="px-3 py-1 rounded-lg border disabled:opacity-40" onClick={() => setChildren((x) => x + 1)}>+</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 mb-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="date" className="text-sm text-slate-600">Preferred date</label>
          <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2"/>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="pickup" className="text-sm text-slate-600">Pickup location (hotel/area)</label>
          <input id="pickup" type="text" placeholder="e.g., Hilton Fiji – Denarau" value={pickup} onChange={(e) => setPickup(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2"/>
        </div>
      </div>

      <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="notes" className="text-sm text-slate-600">Notes (optional)</label>
        <textarea id="notes" rows={2} placeholder="Any special requests or timing preferences" value={notes} onChange={(e) => setNotes(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2"/>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="text-slate-700">Total</div>
        <div className="text-2xl font-bold" style={{ color: '#007707' }}>{formatMoney(total, currency)}</div>
      </div>

      {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

      {disabled ? (
        <Link href={CONTACT_URL} className="inline-block w-full text-center rounded-xl bg-brand-emerald text-white px-4 py-3 font-semibold hover:bg-brand-emerald/90">
          Enquire to Book
        </Link>
      ) : (
        <button
          type="button"
          disabled={loading || (adults <= 0 && children <= 0)}
          onClick={handleCheckout}
          className="w-full rounded-xl bg-brand-emerald text-white px-4 py-3 font-semibold hover:bg-brand-emerald/90 disabled:opacity-60"
        >
          {loading ? 'Starting checkout…' : 'Continue to Payment'}
        </button>
      )}

      <div className="mt-3 text-xs text-slate-500">You’ll be redirected to a secure Stripe checkout. Taxes and fees, if any, appear on the next step.</div>
    </div>
  );
}

