"use client";

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@/components/Container';
import { getTourBySlug } from '@/lib/data';

export default function BookTourPage({ params }: { params: { slug: string } }) {
  const tour = useMemo(() => getTourBySlug(params.slug), [params.slug]);
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle');

  if (!tour) {
    if (typeof window !== 'undefined') router.replace('/tours');
    return null;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!tour) return; // type guard for TS
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const enriched = {
      ...payload,
      tourSlug: tour.slug,
      tourName: tour.name,
      booking: true
    };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(enriched)
      });
      if (!res.ok) throw new Error('Send failed');
      setStatus('ok');
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <Container>
      <div className="py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Book: {tour.name}</h1>
          <p className="text-slate-600 mt-2">From {tour.currency} {tour.priceFromFJD} • {tour.durationHours} hours • Max {tour.groupSizeMax ?? 12} guests</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Your Details</h2>
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                    <input id="name" name="name" required className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                    <input id="email" name="email" type="email" required className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent" />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Phone / WhatsApp</label>
                    <input id="phone" name="whatsapp" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent" />
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-2">Preferred Date</label>
                    <input id="date" name="date" type="date" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent" />
                  </div>
                  <div>
                    <label htmlFor="groupSize" className="block text-sm font-medium text-slate-700 mb-2">Group Size</label>
                    <select id="groupSize" name="groupSize" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent">
                      <option value="">Select</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3-5">3-5</option>
                      <option value="6-10">6-10</option>
                      <option value="11+">11+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Notes</label>
                  <textarea id="message" name="message" rows={5} placeholder="Any special requests or questions" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent" />
                </div>

                <button type="submit" className="w-full bg-brand-green text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-green/90 transition-colors">Request Booking</button>

                {status === 'ok' && (
                  <p className="text-green-600">Thanks! We received your request and will confirm shortly.</p>
                )}
                {status === 'error' && (
                  <p className="text-red-600">Something went wrong. Please try again or email bookings@timagreentours.com</p>
                )}
              </form>
            </div>
          </div>

          <aside className="md:col-span-1">
            <div className="bg-brand-sand/30 rounded-xl p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2">Summary</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>Name: {tour.name}</li>
                <li>Duration: {tour.durationHours} hours</li>
                <li>From: {tour.currency} {tour.priceFromFJD} per person</li>
                <li>Departure: {tour.departure}</li>
                <li>Availability: {tour.availability}</li>
              </ul>
              <p className="text-xs text-slate-500 mt-4">Free cancellation up to 24 hours before the tour.</p>
            </div>
          </aside>
        </div>
      </div>
    </Container>
  );
}

