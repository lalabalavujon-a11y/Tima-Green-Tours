import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Tima Green Tours - Your Gateway to Fijian Wonders",
  description: "Experience the beauty and rich culture of Fiji with our locally-owned business. Discover authentic Fijian tours, cultural experiences, and unforgettable adventures.",
  keywords: "Fiji tours, Fijian culture, Sigatoka tours, waterfall tours, cultural tours, adventure tours, sustainable tourism",
  authors: [{ name: "Tima Green Tours" }],
  creator: "Tima Green Tours",
  publisher: "Tima Green Tours",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://timagreentours.com/app'),
  alternates: {
    canonical: '/',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "Tima Green Tours - Your Gateway to Fijian Wonders",
    description: "Experience the beauty and rich culture of Fiji with our locally-owned business. Discover authentic Fijian tours, cultural experiences, and unforgettable adventures.",
    url: 'https://timagreentours.com/app',
    siteName: 'Tima Green Tours',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Tima Green Tours - Your Gateway to Fijian Wonders",
    description: "Experience the beauty and rich culture of Fiji with our locally-owned business. Discover authentic Fijian tours, cultural experiences, and unforgettable adventures.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
