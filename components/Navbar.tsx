import Link from 'next/link';
import Image from 'next/image';
import { CONTACT_URL } from '@/lib/config';
import MobileNav from './MobileNav';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-brand-emerald-100/95 backdrop-blur border-b border-brand-emerald-200">
      <nav className="container-base flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3 font-bold text-brand-black hover:text-brand-emerald-700 transition-colors">
          <div className="relative w-10 h-10">
            <Image src="/logo.png" alt="Tima Green Tours logo" fill sizes="40px" className="object-contain" />
          </div>
          <span className="text-xl">Tima Green Tours</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/tours" className="text-brand-black hover:text-brand-emerald-600 transition-colors">Tours</Link>
          <Link href="/about" className="text-brand-black hover:text-brand-emerald-600 transition-colors">About</Link>
          {process.env.NEXT_PUBLIC_SHOW_ADMIN_LINKS === 'true' && (
            <>
              <Link href="/calendar" className="text-brand-black hover:text-brand-emerald-600 transition-colors">Calendar</Link>
              <Link href="/admin/payment-links" className="text-brand-black hover:text-brand-emerald-600 transition-colors">Admin</Link>
            </>
          )}
          <Link href={CONTACT_URL} className="btn-primary">
            Contact
          </Link>
        </div>
        
        <MobileNav />
      </nav>
    </header>
  );
}
