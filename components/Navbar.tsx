import Link from 'next/link';
import MobileNav from './MobileNav';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-brand-emerald-100/95 backdrop-blur border-b border-brand-emerald-200">
      <nav className="container-base flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3 font-bold text-brand-black hover:text-brand-emerald-700 transition-colors">
          <div className="w-10 h-10 bg-brand-emerald-500 rounded-full flex items-center justify-center">
            <span className="text-brand-white text-xl">🌴</span>
          </div>
          <span className="text-xl">Tima Green Tours</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/tours" className="text-brand-black hover:text-brand-emerald-600 transition-colors">Tours</Link>
          <Link href="/about" className="text-brand-black hover:text-brand-emerald-600 transition-colors">About</Link>
          <Link href="/contact" className="btn-primary">
            Contact
          </Link>
        </div>
        
        <MobileNav />
      </nav>
    </header>
  );
}
