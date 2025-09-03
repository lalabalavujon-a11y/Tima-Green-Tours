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
      <div className="py-14">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-emerald mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
            Your Gateway to Fiji's Wonders - Embark on an unforgettable journey through the stunning 
            landscapes and vibrant culture of Fiji with Timaima Green Tours and Transfers.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-emerald focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-emerald focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium text-slate-700 mb-2">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-emerald focus:border-transparent"
                  placeholder="+679 XXX XXXX"
                />
              </div>

              <div>
                <label htmlFor="tour" className="block text-sm font-medium text-slate-700 mb-2">
                  Tour of Interest
                </label>
                <select
                  id="tour"
                  name="tour"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-emerald focus:border-transparent"
                >
                  <option value="">Select a tour</option>
                  <option value="biausevu-waterfall">Biausevu Waterfall Tour</option>
                  <option value="sigatoka-valley">Sigatoka Valley Drive & Lawai Pottery Village</option>
                  <option value="lomawai-salt">Lomawai Salt Making Village & Horse Riding</option>
                  <option value="sabeto-mudpool">Sabeto Mudpool and Nadi Temple Tour</option>
                  <option value="shark-diving">Shark Diving in Beqa Lagoon</option>
                  <option value="malolo-island">Malolo Island 3 Nights Get-Away</option>
                  <option value="custom">Custom Tour</option>
                </select>
              </div>

              <div>
                <label htmlFor="dates" className="block text-sm font-medium text-slate-700 mb-2">
                  Preferred Dates
                </label>
                <input
                  type="text"
                  id="dates"
                  name="dates"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-emerald focus:border-transparent"
                  placeholder="e.g., March 15-20, 2024"
                />
              </div>

              <div>
                <label htmlFor="group-size" className="block text-sm font-medium text-slate-700 mb-2">
                  Group Size
                </label>
                <select
                  id="group-size"
                  name="groupSize"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-emerald focus:border-transparent"
                >
                  <option value="">Select group size</option>
                  <option value="1-2">1-2 people</option>
                  <option value="3-5">3-5 people</option>
                  <option value="6-10">6-10 people</option>
                  <option value="11+">11+ people</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-emerald focus:border-transparent"
                  placeholder="Tell us about your travel plans, special requirements, or any questions you have..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-emerald text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-emerald/90 transition-colors"
              >
                Send Message
              </button>

              {status === 'ok' && (
                <p className="text-green-600 text-center">
                  Thank you! We'll get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-600 text-center">
                  Something went wrong. Please try again or contact us directly.
                </p>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="bg-brand-sand/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="text-brand-emerald text-xl">📧</div>
                    <div>
                      <h4 className="font-medium">Email Us</h4>
                      <a href="mailto:info@timaimagreentours.com" className="text-brand-emerald hover:underline">
                        info@timaimagreentours.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-brand-emerald text-xl">📞</div>
                    <div>
                      <h4 className="font-medium">Call Us</h4>
                      <a href="tel:+679XXXXXXX" className="text-brand-emerald hover:underline">
                        +679 XXX XXXX
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-brand-emerald text-xl">📍</div>
                    <div>
                      <h4 className="font-medium">Visit Us</h4>
                      <p className="text-slate-700">Sigatoka, Fiji Islands</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Why Choose Timaima Green Tours?</h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-emerald mt-1">✓</span>
                    <span>Indigenous owned and operated</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-emerald mt-1">✓</span>
                    <span>20+ years of combined experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-emerald mt-1">✓</span>
                    <span>Budget-friendly packages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-emerald mt-1">✓</span>
                    <span>Personalized service and attention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-emerald mt-1">✓</span>
                    <span>Support for local communities</span>
                  </li>
                </ul>
              </div>

              <div className="bg-brand-sand/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Bula Vinaka!</h3>
                <p className="text-slate-700 mb-4">
                  We look forward to welcoming you to our beautiful island home and creating 
                  memories that will last a lifetime.
                </p>
                <p className="text-sm text-slate-600">
                  Don't miss your chance to experience the warmth and hospitality of the Fijian 
                  people - book your tour today for the vacation of a lifetime!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
