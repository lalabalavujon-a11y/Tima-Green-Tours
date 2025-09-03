import Link from 'next/link';
import Image from 'next/image';
import type { Tour } from '@/lib/types/tour';

interface TourCardProps {
  tour: Tour;
}

export default function TourCard({ tour }: TourCardProps) {
  const getFormattedPrice = (): string => {
    if (!tour.priceFromFJD || tour.priceFromFJD <= 0) return 'Contact for Pricing';
    const formatted = new Intl.NumberFormat('en-US').format(tour.priceFromFJD);
    return `From ${tour.currency} ${formatted}`;
  };

  const getShortCopy = (text: string, limit: number = 140): string => {
    if (!text) return '';
    return text.length > limit ? `${text.slice(0, limit)}…` : text;
  };
  const getIcon = (slug: string) => {
    if (slug.includes('waterfall')) return '🌊';
    if (slug.includes('pottery')) return '🏺';
    if (slug.includes('horse')) return '🐎';
    if (slug.includes('mudpool')) return '♨️';
    if (slug.includes('shark')) return '🦈';
    if (slug.includes('malolo')) return '🏝️';
    return '🌴';
  };

  return (
    <article className="card group hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Tour Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={tour.heroImage.src}
          alt={tour.heroImage.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          priority={false}
        />
        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-brand-emerald-500 text-brand-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
          {getFormattedPrice()}
        </div>
        {/* Duration Badge */}
        <div className="absolute top-4 left-4 bg-brand-black/80 text-brand-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur">
          ⏱️ {tour.durationHours}h
        </div>
      </div>

      {/* Tour Content */}
      <div className="p-6">
        {/* Icon and Title */}
        <div className="flex items-start gap-3 mb-4">
          <div className="text-3xl">{getIcon(tour.slug)}</div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-brand-black mb-2 group-hover:text-brand-emerald-600 transition-colors">
              {tour.name}
            </h3>
            <p className="text-accent-gray-600 text-sm leading-relaxed">
              {getShortCopy(tour.shortDescription, 140)}
            </p>
          </div>
        </div>

        {/* Tour Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-accent-gray-600">
            <span className="w-2 h-2 bg-brand-emerald-400 rounded-full"></span>
            <span>📍 {tour.departure}</span>
          </div>
          {tour.groupSizeMax && (
            <div className="flex items-center gap-2 text-sm text-accent-gray-600">
              <span className="w-2 h-2 bg-brand-emerald-400 rounded-full"></span>
              <span>👥 Max {tour.groupSizeMax} people</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-accent-gray-600">
            <span className="w-2 h-2 bg-brand-emerald-400 rounded-full"></span>
            <span>🌿 Eco Rating: 5/5</span>
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-6">
          <h4 className="font-medium text-brand-black mb-2">Highlights:</h4>
          <div className="flex flex-wrap gap-1">
            {tour.highlights.slice(0, 3).map((highlight, index) => (
              <span
                key={index}
                className="inline-block bg-brand-emerald-100 text-brand-emerald-700 text-xs px-2 py-1 rounded-full"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={`/tours/${tour.slug}`}
          className="btn-primary w-full text-center group-hover:bg-brand-emerald-600 transition-colors"
        >
          View Details →
        </Link>
      </div>
    </article>
  );
}
