import Link from 'next/link';
import type { Tour } from '@/lib/types/tour';
import Image from 'next/image';

interface TourCardProps {
  tour: Tour;
}

export default function TourCard({ tour }: TourCardProps) {
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
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-brand-green-500 text-brand-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
          From {tour.currency} {tour.priceFromFJD}
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
            <h3 className="text-xl font-semibold text-brand-black mb-2 group-hover:text-brand-green-600 transition-colors">
              {tour.name}
            </h3>
            <p className="text-accent-gray-600 text-sm leading-relaxed">
              {tour.shortDescription}
            </p>
          </div>
        </div>

        {/* Tour Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-accent-gray-600">
            <span className="w-2 h-2 bg-brand-green-400 rounded-full"></span>
            <span>📍 {tour.departure}</span>
          </div>
          {tour.groupSizeMax && (
            <div className="flex items-center gap-2 text-sm text-accent-gray-600">
              <span className="w-2 h-2 bg-brand-green-400 rounded-full"></span>
              <span>👥 Max {tour.groupSizeMax} people</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-accent-gray-600">
            <span className="w-2 h-2 bg-brand-green-400 rounded-full"></span>
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
                className="inline-block bg-brand-green-100 text-brand-green-700 text-xs px-2 py-1 rounded-full"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={`/tours/${tour.slug}`}
          className="btn-primary w-full text-center group-hover:bg-brand-green-600 transition-colors"
        >
          View Details →
        </Link>
      </div>
    </article>
  );
}
