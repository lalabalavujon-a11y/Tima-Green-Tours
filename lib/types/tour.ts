export interface Tour {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  durationHours: number;
  departure: string; // e.g. Nadi, Denarau, Coral Coast
  availability: string; // Daily, Mon–Sat, Seasonal
  groupSizeMax?: number;
  languages?: string[];
  cancellationPolicy: string;
  priceFromFJD: number;
  childPriceFromFJD?: number;
  currency: 'FJD' | 'USD' | 'AUD' | 'NZD';
  locations: string[]; // tags: Nadi, Sabeto, Sigatoka, Mamanuca, etc.
  highlights: string[];
  itinerary: Array<{ time?: string; title: string; description: string }>;
  includes: string[];
  excludes?: string[];
  whatToBring?: string[];
  cultureNotes?: string[];
  mapEmbedUrl?: string;
  heroImage: ImageAsset;
  gallery: ImageAsset[];
  reviews?: Array<{ name: string; rating: number; quote: string; date?: string }>;
  faqs?: Array<{ q: string; a: string }>;
  bookingCode?: string; // your PMS/booking system code
  paymentLinks?: {
    adult?: string;
    child?: string;
  };
}

export interface ImageAsset {
  src: string;      // CDN URL (e.g., Cloudinary)
  alt: string;      // meaningful alt text
  width: number;    // intrinsic dims for CLS control
  height: number;
  caption?: string;
  locationTag?: string; // e.g., Sabeto, Navala Village
  photographer?: string;
  consentRef?: string;  // model release ID when people are recognizable
}
