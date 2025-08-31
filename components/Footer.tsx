export default function Footer() {
  return (
    <footer className="mt-20 border-t">
      <div className="container-base py-10 text-sm text-slate-600 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div>© {new Date().getFullYear()} Tima Green Tours. All rights reserved.</div>
        <div className="flex gap-4">
          <a href="mailto:bookings@timagreentours.com" className="hover:text-brand-green">Email</a>
          <a href="https://wa.me/6790000000" className="hover:text-brand-green">WhatsApp</a>
          <a href="/sitemap.xml" className="hover:text-brand-green">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
