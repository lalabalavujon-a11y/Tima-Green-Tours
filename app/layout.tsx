import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';
import ChatMount from '@/components/ChatMount';

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
  metadataBase: new URL('https://app.timagreentours.com'),
  icons: {
    icon: ['/favicon.ico', '/logo.svg'],
    apple: ['/logo.svg'],
    shortcut: ['/favicon.ico']
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
        <ChatMount />
      </body>
    </html>
  );
}
