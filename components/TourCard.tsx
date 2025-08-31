import Link from 'next/link';

interface Tour {
  slug: string;
  title: string;
  summary: string;
  duration: string;
  eco_rating: number;
  price: string;
  group_size: string;
  highlights: string[];
  description: string;
  includes: string[];
}

export default function TourCard({ tour }: { tour: Tour }) {
  const getIcon = (slug: string) => {
    if (slug.includes('village')) return '🏘️';
    if (slug.includes('rainforest')) return '🌿';
    if (slug.includes('dance')) return '💃';
    if (slug.includes('island')) return '🏝️';
    if (slug.includes('farming')) return '🌾';
    return '🌊';
  };

  return (
    <article className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Header with icon and eco rating */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl">{getIcon(tour.slug)}</div>
          <div className="flex items-center gap-1 bg-brand-green/10 px-2 py-1 rounded-full">
            <span className="text-brand-green text-sm font-medium">🌿 {tour.eco_rating}/5</span>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-2 text-slate-900">{tour.title}</h3>
        <p className="text-slate-700 mb-4 leading-relaxed">{tour.summary}</p>
        
        {/* Key details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">⏱️ Duration</span>
            <span className="font-medium">{tour.duration}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">👥 Group Size</span>
            <span className="font-medium">{tour.group_size}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">💰 Price</span>
            <span className="font-semibold text-brand-green">{tour.price}</span>
          </div>
        </div>
      </div>
      
      {/* Highlights */}
      <div className="px-6 pb-4">
        <h4 className="text-sm font-semibold text-slate-900 mb-3">Highlights:</h4>
        <ul className="space-y-1">
          {tour.highlights.slice(0, 3).map((highlight, index) => (
            <li key={index} className="text-sm text-slate-700 flex items-start gap-2">
              <span className="text-brand-green mt-0.5">•</span>
              {highlight}
            </li>
          ))}
          {tour.highlights.length > 3 && (
            <li className="text-sm text-slate-500 italic">
              +{tour.highlights.length - 3} more highlights
            </li>
          )}
        </ul>
      </div>
      
      {/* Footer with CTA */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
        <Link 
          href={`/tours/${tour.slug}`}
          className="inline-flex items-center justify-center w-full text-brand-green font-semibold hover:text-brand-green/80 transition-colors"
        >
          View Full Details
          <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </article>
  );
}
