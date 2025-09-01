export default function Footer() {
  return (
    <footer className="bg-brand-black text-brand-white">
      <div className="container-base py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-green-500 rounded-full flex items-center justify-center">
                <span className="text-brand-white text-xl">🌴</span>
              </div>
              <span className="text-xl font-bold">Tima Green Tours - NEW DESIGN</span>
            </div>
            <p className="text-brand-white/80 mb-4 max-w-md">
              Indigenous owned Fijian tour company offering authentic cultural experiences and sustainable tourism.
            </p>
            <div className="flex gap-4">
              <a href="mailto:bookings@timagreentours.com" className="text-brand-green-400 hover:text-brand-green-300 transition-colors">
                📧 Email
              </a>
              <a href="https://wa.me/6790000000" className="text-brand-green-400 hover:text-brand-green-300 transition-colors">
                📱 WhatsApp
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-brand-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/tours" className="text-brand-white/80 hover:text-brand-green-400 transition-colors">Tours</a></li>
              <li><a href="/about" className="text-brand-white/80 hover:text-brand-green-400 transition-colors">About</a></li>
              <li><a href="/contact" className="text-brand-white/80 hover:text-brand-green-400 transition-colors">Contact</a></li>
              <li><a href="/sitemap.xml" className="text-brand-white/80 hover:text-brand-green-400 transition-colors">Sitemap</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-brand-white mb-4">Contact Info</h3>
            <ul className="space-y-2 text-brand-white/80">
              <li>📍 Sigatoka, Fiji</li>
              <li>📞 +679 XXX XXXX</li>
              <li>🌿 Indigenous Owned</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-accent-gray-700 mt-12 pt-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="text-brand-white/60 text-sm">
            © {new Date().getFullYear()} Tima Green Tours. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm">
            <a href="/privacy" className="text-brand-white/60 hover:text-brand-green-400 transition-colors">Privacy</a>
            <a href="/terms" className="text-brand-white/60 hover:text-brand-green-400 transition-colors">Terms</a>
            <a href="/sitemap.xml" className="text-brand-white/60 hover:text-brand-green-400 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
