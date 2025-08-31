import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <nav className="container-base flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <img src="/logo.svg" alt="Tima Green Tours" className="h-7 w-7" />
          <span>Tima Green Tours</span>
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/tours" className="hover:text-brand-green">Tours</Link>
          <Link href="/about" className="hover:text-brand-green">About</Link>
          <Link href="/contact" className="rounded-md bg-brand-green text-white px-3 py-1.5 hover:opacity-90">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
