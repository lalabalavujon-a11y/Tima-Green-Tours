'use client';

import { useState } from 'react';
import Container from '@/components/Container';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload)
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
      <div className="py-14 max-w-2xl">
        <h1 className="text-3xl font-semibold">Plan Your Trip</h1>
        <p className="mt-2 text-slate-700">
          Tell us a bit about your group and interests. We'll reply with tailored options.
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input name="name" required className="mt-1 w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" name="email" required className="mt-1 w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">WhatsApp (optional)</label>
            <input name="whatsapp" className="mt-1 w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea name="message" required rows={5} className="mt-1 w-full border rounded-md px-3 py-2" />
          </div>
          <button className="rounded-md bg-brand-green px-6 py-3 text-white font-medium hover:opacity-90">
            Send Inquiry
          </button>
          {status === 'ok' && <p className="text-green-700">Thanks! We'll be in touch shortly.</p>}
          {status === 'error' && <p className="text-red-600">Sorry—something went wrong. Try again or email us directly.</p>}
        </form>

        <div className="mt-8 text-sm text-slate-600">
          Prefer direct contact? Email{' '}
          <a className="text-brand-green" href="mailto:bookings@timagreentours.com">bookings@timagreentours.com</a>
          {' '}or WhatsApp <a className="text-brand-green" href="https://wa.me/6790000000">+679 000 0000</a>.
        </div>
      </div>
    </Container>
  );
}
