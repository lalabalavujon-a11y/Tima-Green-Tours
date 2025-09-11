'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { isPaymentLive, CONTACT_URL } from '@/lib/config';

interface StickyBookingCTAProps {
  tourName: string;
  price: string;
  currency: string;
  tourSlug: string;
  childPrice?: string;
  paymentLinks?: {
    adult?: string;
    child?: string;
  };
}

export default function StickyBookingCTA({ tourName, price, currency, tourSlug, childPrice, paymentLinks }: StickyBookingCTAProps) {
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
            {childPrice ? (
              <div className="text-lg font-bold text-brand-emerald">
                Adult {currency} {price} <span className="text-slate-600 text-base">• Child {currency} {childPrice}</span>
              </div>
            ) : (
              <div className="text-lg font-bold text-brand-emerald">From {currency} {price}</div>
            )}
          </div>
          <div className="flex gap-2">
            {paymentLinks?.adult ? (
              <Link
                href={paymentLinks.adult}
                target="_blank"
                rel="noopener nofollow"
                aria-label="Buy Adult ticket via Stripe Checkout"
                data-cta="buy-adult"
                className="bg-brand-emerald text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-brand-emerald/90 transition-colors whitespace-nowrap"
              >
                Buy Adult{!isPaymentLive ? ' (Test)' : ''}
              </Link>
            ) : (
              <Link
                href={CONTACT_URL}
                title="No Stripe link configured yet. Opens contact form."
                aria-label="Enquire to buy Adult ticket"
                data-cta="contact-adult"
                className="bg-brand-emerald text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-brand-emerald/90 transition-colors whitespace-nowrap"
              >
                Buy Adult (Contact)
              </Link>
            )}
            {paymentLinks?.child ? (
              <Link
                href={paymentLinks.child}
                target="_blank"
                rel="noopener nofollow"
                aria-label="Buy Child ticket via Stripe Checkout"
                data-cta="buy-child"
                className="border border-brand-emerald text-brand-emerald px-4 py-2 rounded-lg font-semibold text-sm hover:bg-brand-emerald/5 transition-colors whitespace-nowrap"
              >
                Buy Child{!isPaymentLive ? ' (Test)' : ''}
              </Link>
            ) : (
              <Link
                href={CONTACT_URL}
                title="No Stripe link configured yet. Opens contact form."
                aria-label="Enquire to buy Child ticket"
                data-cta="contact-child"
                className="border border-brand-emerald text-brand-emerald px-4 py-2 rounded-lg font-semibold text-sm hover:bg-brand-emerald/5 transition-colors whitespace-nowrap"
              >
                Buy Child (Contact)
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Desktop CTA - always visible */}
      <div className="hidden md:block fixed bottom-6 right-6 z-40">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 max-w-sm">
          <div className="text-center mb-4">
            <div className="text-lg font-semibold text-slate-900 mb-1">{tourName}</div>
            {childPrice ? (
              <div className="text-2xl font-bold text-brand-emerald mb-3">
                Adult {currency} {price} <span className="text-slate-600 text-lg">• Child {currency} {childPrice}</span>
              </div>
            ) : (
              <div className="text-2xl font-bold text-brand-emerald mb-3">From {currency} {price}</div>
            )}
            <div className="text-sm text-slate-600">per person</div>
          </div>
          <div className="space-y-3">
            {paymentLinks?.adult ? (
              <Link
                href={paymentLinks.adult}
                target="_blank"
                rel="noopener nofollow"
                aria-label="Buy Adult ticket via Stripe Checkout"
                data-cta="buy-adult"
                className="w-full bg-brand-emerald text-white py-3 px-6 rounded-xl font-semibold hover:bg-brand-emerald/90 transition-colors text-center block"
              >
                Buy Adult{!isPaymentLive ? ' (Test)' : ''}
              </Link>
            ) : (
              <Link
                href={CONTACT_URL}
                title="No Stripe link configured yet. Opens contact form."
                aria-label="Enquire to buy Adult ticket"
                data-cta="contact-adult"
                className="w-full bg-brand-emerald text-white py-3 px-6 rounded-xl font-semibold hover:bg-brand-emerald/90 transition-colors text-center block"
              >
                Buy Adult (Contact)
              </Link>
            )}
            {paymentLinks?.child ? (
              <Link
                href={paymentLinks.child}
                target="_blank"
                rel="noopener nofollow"
                aria-label="Buy Child ticket via Stripe Checkout"
                data-cta="buy-child"
                className="w-full border-2 border-brand-emerald text-brand-emerald py-3 px-6 rounded-xl font-semibold hover:bg-brand-emerald/5 transition-colors text-center block"
              >
                Buy Child{!isPaymentLive ? ' (Test)' : ''}
              </Link>
            ) : (
              <Link
                href={CONTACT_URL}
                title="No Stripe link configured yet. Opens contact form."
                aria-label="Enquire to buy Child ticket"
                data-cta="contact-child"
                className="w-full border-2 border-brand-emerald text-brand-emerald py-3 px-6 rounded-xl font-semibold hover:bg-brand-emerald/5 transition-colors text-center block"
              >
                Buy Child (Contact)
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
