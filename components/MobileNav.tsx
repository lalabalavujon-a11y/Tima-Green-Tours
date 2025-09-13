'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/components/Logo';
import { CONTACT_URL } from '@/lib/config';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="p-2 text-slate-700 hover:text-lagoon transition-colors"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
          }`}></span>
          <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`}></span>
          <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
          }`}></span>
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`} onClick={toggleMenu}>
        <div className={`absolute right-0 top-0 h-full w-80 bg-white shadow-xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`} onClick={(e) => e.stopPropagation()}>
          
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div className="flex items-center gap-2 font-semibold text-lg">
              <Logo className="relative h-8 w-8" alt="Tima Green Tours" sizes="32px" />
              <span>Tima Green Tours</span>
            </div>
            <button
              onClick={toggleMenu}
              className="p-2 text-slate-600 hover:text-slate-900"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Menu Items */}
          <nav className="p-6">
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  onClick={toggleMenu}
                  className="block text-lg font-medium text-slate-900 hover:text-lagoon transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/tours"
                  onClick={toggleMenu}
                  className="block text-lg font-medium text-slate-900 hover:text-lagoon transition-colors"
                >
                  Tours
                </Link>
              </li>
              <li>
                <Link
                  href="/transfers"
                  onClick={toggleMenu}
                  className="block text-lg font-medium text-slate-900 hover:text-lagoon transition-colors"
                >
                  Transfers
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  onClick={toggleMenu}
                  className="block text-lg font-medium text-slate-900 hover:text-lagoon transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href={CONTACT_URL}
                  onClick={toggleMenu}
                  className="block text-lg font-medium text-slate-900 hover:text-lagoon transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>

            {/* CTA Button */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <Link
                href={CONTACT_URL}
                onClick={toggleMenu}
                className="block w-full btn-primary rounded-xl text-center"
              >
                Book Your Tour
              </Link>
            </div>

            {/* Contact Info */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="text-sm text-slate-600 space-y-2">
                <div>📧 info@timagreentours.com</div>
                <div>📞 +679 9189902</div>
                <div>📱 WhatsApp: +679 9189902</div>
                <div>📍 Based: Navua, Fiji Islands</div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
