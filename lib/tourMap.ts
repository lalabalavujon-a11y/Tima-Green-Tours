import tours from '@/content/tours.json';

export type TourMatch = { slug: string; title: string };

const catalog: TourMatch[] = (tours as any[]).map(t => ({ slug: t.slug, title: t.title }));

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

export function inferSlugFromText(text: string): string | null {
  if (!text) return null;
  const n = normalize(text);
  // Try exact title inclusion
  for (const t of catalog) {
    if (n.includes(normalize(t.title))) return t.slug;
  }
  // Try word overlap score
  const words = new Set(n.split(' ').filter(Boolean));
  let best: { slug: string; score: number } | null = null;
  for (const t of catalog) {
    const cand = normalize(t.title).split(' ').filter(Boolean);
    const overlap = cand.filter(w => words.has(w)).length;
    if (!best || overlap > best.score) best = { slug: t.slug, score: overlap };
  }
  return best && best.score > 0 ? best.slug : null;
}

