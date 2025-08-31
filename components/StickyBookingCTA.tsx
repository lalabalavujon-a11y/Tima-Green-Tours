'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface StickyBookingCTAProps {
  tourName: string;
  price: string;
  currency: string;
  tourSlug: string;
}

export default function StickyBookingCTA({ tourName, price, currency, tourSlug }: StickyBookingCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 300;
      setIsVisible(scrolled);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Mobile Sticky CTA - only visible on mobile */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-4 md:hidden transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="text-sm font-semibold text-slate-900 truncate">{tourName}</div>
            <div className="text-lg font-bold text-brand-green">
              From {currency} {price}
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              href="/contact"
              className="bg-brand-green text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-brand-green/90 transition-colors whitespace-nowrap"
            >
              Book Now
            </Link>
            <Link
              href="/contact"
              className="border border-brand-green text-brand-green px-4 py-2 rounded-lg font-semibold text-sm hover:bg-brand-green/5 transition-colors whitespace-nowrap"
            >
              Enquire
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop CTA - always visible */}
      <div className="hidden md:block fixed bottom-6 right-6 z-40">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 max-w-sm">
          <div className="text-center mb-4">
            <div className="text-lg font-semibold text-slate-900 mb-1">{tourName}</div>
            <div className="text-2xl font-bold text-brand-green mb-3">
              From {currency} {price}
            </div>
            <div className="text-sm text-slate-600">per person</div>
          </div>
          <div className="space-y-3">
            <Link
              href="/contact"
              className="w-full bg-brand-green text-white py-3 px-6 rounded-xl font-semibold hover:bg-brand-green/90 transition-colors text-center block"
            >
              Book This Tour
            </Link>
            <Link
              href="/contact"
              className="w-full border-2 border-brand-green text-brand-green py-3 px-6 rounded-xl font-semibold hover:bg-brand-green/5 transition-colors text-center block"
            >
              Ask Questions
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
