import { CONTACT_URL, SOCIAL_LINKS } from '@/lib/config';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-brand-black text-brand-white">
      <div className="container-base py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                <Image src="/logo.svg" alt="Tima Green Tours" fill sizes="40px" className="object-contain" unoptimized />
              </div>
              <span className="text-xl font-bold">Tima Green Tours</span>
            </div>
            <p className="text-brand-white/80 mb-4 max-w-md">
              Indigenous owned Fijian tour company offering authentic cultural experiences and sustainable tourism.
            </p>
            <div className="flex gap-4">
              <a href="mailto:info@timagreentours.com" className="text-brand-emerald-400 hover:text-brand-emerald-300 transition-colors">
                📧 Email Us
              </a>
              <a href="https://wa.me/6799189902" className="text-brand-emerald-400 hover:text-brand-emerald-300 transition-colors">
                📱 WhatsApp
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-brand-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/tours" className="text-brand-white/80 hover:text-brand-emerald-400 transition-colors">Tours</a></li>
              <li><a href="/about" className="text-brand-white/80 hover:text-brand-emerald-400 transition-colors">About</a></li>
              <li><a href={CONTACT_URL} className="text-brand-white/80 hover:text-brand-emerald-400 transition-colors">Contact</a></li>
              <li><a href="/sitemap.xml" className="text-brand-white/80 hover:text-brand-emerald-400 transition-colors">Sitemap</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-brand-white mb-4">Contact Info</h3>
            <ul className="space-y-2 text-brand-white/80">
              <li>📍 Navua, Fiji Islands</li>
              <li>📞 +679 9189902</li>
              <li>🌿 Indigenous Owned</li>
            </ul>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="border-t border-accent-gray-700 mt-12 pt-8 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
          <div className="text-brand-white/60 text-sm">
            © {new Date().getFullYear()} Tima Green Tours. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm items-center">
            {(SOCIAL_LINKS.facebook || SOCIAL_LINKS.instagram || SOCIAL_LINKS.tiktok || SOCIAL_LINKS.youtube || SOCIAL_LINKS.x) && (
              <div className="flex items-center gap-3">
                <span className="text-brand-white/70">Follow us:</span>
                <div className="flex items-center gap-3">
                  {SOCIAL_LINKS.facebook && (
                    <a href={SOCIAL_LINKS.facebook} aria-label="Facebook" target="_blank" rel="noopener" className="text-brand-white/70 hover:text-brand-emerald-400 transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-2.9h2v-2.2c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2v2h2.2l-.3 2.9H13v7A10 10 0 0 0 22 12"/></svg>
                    </a>
                  )}
                  {SOCIAL_LINKS.instagram && (
                    <a href={SOCIAL_LINKS.instagram} aria-label="Instagram" target="_blank" rel="noopener" className="text-brand-white/70 hover:text-brand-emerald-400 transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5Zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5ZM17.8 6.2a1 1 0 1 0 1.4 1.4 1 1 0 0 0-1.4-1.4Z"/></svg>
                    </a>
                  )}
                  {SOCIAL_LINKS.tiktok && (
                    <a href={SOCIAL_LINKS.tiktok} aria-label="TikTok" target="_blank" rel="noopener" className="text-brand-white/70 hover:text-brand-emerald-400 transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 3c.3 2.3 1.8 4 4 4V9c-1.8 0-3.4-.7-4.7-1.8l-.1 6.6c0 2.5-2 4.6-4.6 4.6S4 16.3 4 13.8 6 9.2 8.6 9.2c.4 0 .8 0 1.1.1v2.3c-.3-.1-.6-.1-1-.1-1.3 0-2.4 1.1-2.4 2.4S7.4 16.4 8.7 16.4s2.3-1 2.3-2.3L11 3h3Z"/></svg>
                    </a>
                  )}
                  {SOCIAL_LINKS.youtube && (
                    <a href={SOCIAL_LINKS.youtube} aria-label="YouTube" target="_blank" rel="noopener" className="text-brand-white/70 hover:text-brand-emerald-400 transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.6 7.2c.3 1 .4 2 .4 3v3.6c0 1-.1 2-.4 3a3.4 3.4 0 0 1-2.4 2.4c-1 .3-6 .3-6 .3s-5 0-6-.3A3.4 3.4 0 0 1 1.6 16.8c-.3-1-.4-2-.4-3V10c0-1 .1-2 .4-3A3.4 3.4 0 0 1 4 4.6c1-.3 6-.3 6-.3s5 0 6 .3a3.4 3.4 0 0 1 2.4 2.6ZM10 9.8v5l4.5-2.5L10 9.8Z"/></svg>
                    </a>
                  )}
                  {SOCIAL_LINKS.x && (
                    <a href={SOCIAL_LINKS.x} aria-label="X" target="_blank" rel="noopener" className="text-brand-white/70 hover:text-brand-emerald-400 transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 3h4.6l4.1 5.6L16.7 3H21l-7.2 8.2L21 21h-4.6l-4.3-5.9L7.3 21H3l7.5-8.6L3 3Z"/></svg>
                    </a>
                  )}
                </div>
              </div>
            )}
            <a href="/privacy" className="text-brand-white/60 hover:text-brand-emerald-400 transition-colors">Privacy</a>
            <a href="/terms" className="text-brand-white/60 hover:text-brand-emerald-400 transition-colors">Terms</a>
            <a href="/sitemap.xml" className="text-brand-white/60 hover:text-brand-emerald-400 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
