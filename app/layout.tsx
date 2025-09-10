import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: "Tima Green Tours — Fiji's Premier Eco-Cultural Tours",
    template: '%s | Tima Green Tours'
  },
  description:
    'Discover authentic Fiji with eco-friendly, community-led cultural tours: village experiences, kava ceremonies, rainforest hikes, waterfalls, dance & craft workshops.',
  openGraph: {
    title: "Tima Green Tours — Fiji's Premier Eco-Cultural Tours",
    description:
      'Authentic eco-cultural experiences across Fiji. Travel that connects: people, land, and tradition.',
    url: 'https://app.timagreentours.com',
    siteName: 'Tima Green Tours',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website'
  },
<<<<<<< HEAD
  metadataBase: new URL('https://app.timagreentours.com'),
  icons: { icon: '/favicon.ico' }
=======
  metadataBase: new URL('https://timagreentours.com'),
  icons: {
    icon: ['/favicon.ico', '/logo.png'],
    apple: ['/logo.png'],
    shortcut: ['/favicon.ico']
  }
>>>>>>> 1248443 (feat: admin payment links + CRM calendar scaffolding; SEO and UI updates)
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
