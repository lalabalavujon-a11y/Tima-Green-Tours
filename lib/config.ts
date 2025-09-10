// Centralized payment mode configuration
// Set PAYMENT_MODE or NEXT_PUBLIC_PAYMENT_MODE to 'live' once links are live.
// Defaults to 'test' to prevent accidental live assumptions.

export const PAYMENT_MODE = (process.env.PAYMENT_MODE || process.env.NEXT_PUBLIC_PAYMENT_MODE || 'test').toLowerCase();
export const isPaymentLive = PAYMENT_MODE === 'live';

// Centralized external contact URL (Booking portal)
export const CONTACT_URL = process.env.CONTACT_URL || 'https://app.timagreentours.com/contact/';

// Public social links (optional). Set any of these envs to show icons in footer.
export const SOCIAL_LINKS = {
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || process.env.FACEBOOK_URL || '',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || process.env.INSTAGRAM_URL || '',
  tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || process.env.TIKTOK_URL || '',
  youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || process.env.YOUTUBE_URL || '',
  x: process.env.NEXT_PUBLIC_X_URL || process.env.X_URL || '',
};
