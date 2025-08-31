import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://timagreentours.com';
  return [
    { url: `${base}/`, priority: 1 },
    { url: `${base}/about`, priority: 0.8 },
    { url: `${base}/tours`, priority: 0.9 },
    { url: `${base}/contact`, priority: 0.7 }
  ];
}
