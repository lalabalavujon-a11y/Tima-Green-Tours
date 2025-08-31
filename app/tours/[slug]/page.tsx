import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/Container';
import { getTourBySlug, getRelatedTours } from '@/lib/data';
import StickyBookingCTA from '@/components/StickyBookingCTA';
import ImageGallery from '@/components/ImageGallery';
import SEOHead from '@/components/SEOHead';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tour = await getTourBySlug(params.slug);
  if (!tour) return {};
  
  const title = `${tour.name} | Tima Green Tours`;
  const description = tour.shortDescription;
  
  return { title, description };
}

export async function generateStaticParams() {
  const tours = await import('@/content/tours.json');
  return tours.default.map((tour) => ({
    slug: tour.slug,
  }));
}

export default async function TourPage({ params }: { params: { slug: string } }) {
  const tour = await getTourBySlug(params.slug);
  if (!tour) return notFound();
  
  const related = await getRelatedTours(tour.slug);

  return (
    <>
      <SEOHead
        title={`${tour.name} | Tima Green Tours`}
        description={tour.shortDescription}
        url={`/tours/${tour.slug}`}
        image={tour.heroImage}
        tourData={{
          name: tour.name,
          price: tour.priceFromFJD,
          currency: tour.currency,
          duration: `${tour.durationHours} hours`,
          location: tour.locations[0] || 'Fiji',
          rating: 5,
          reviewCount: tour.reviews?.length || 0
        }}
      />
      <Container>
      <div className="py-8">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm text-slate-600">
          <Link href="/" className="hover:text-brand-green">Home</Link>
          <span className="mx-2">→</span>
          <Link href="/tours" className="hover:text-brand-green">Tours</Link>
          <span className="mx-2">→</span>
          <span className="text-slate-900">{tour.name}</span>
        </nav>

        {/* HERO */}
        <section className="grid gap-8 md:grid-cols-2 items-start mb-12">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              {tour.name}
            </h1>
            <p className="text-xl text-slate-700 mb-6 leading-relaxed">
              {tour.tagline}
            </p>
            
            {/* Key Facts */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span className="text-brand-green">⏱️</span>
                <span>{tour.durationHours} hours</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span className="text-brand-green">📍</span>
                <span>{tour.departure}</span>
              </div>
              {tour.groupSizeMax && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="text-brand-green">👥</span>
                  <span>Max {tour.groupSizeMax}</span>
                </div>
              )}
            </div>

            {/* Price and CTA */}
            <div className="bg-brand-sand/30 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-bold text-brand-green">
                    From {tour.currency} {tour.priceFromFJD}
                  </div>
                  <div className="text-sm text-slate-600">per person</div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                  <span className="ml-2 text-sm font-medium">5.0</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/contact"
                  className="flex-1 bg-brand-green text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-green/90 transition-colors text-center"
                >
                  Book Now
                </Link>
                <Link
                  href="/contact"
                  className="flex-1 border-2 border-brand-green text-brand-green py-3 px-6 rounded-lg font-semibold hover:bg-brand-green/5 transition-colors text-center"
                >
                  Enquire
                </Link>
              </div>
            </div>
          </div>
          
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
            <Image 
              src={tour.heroImage.src} 
              alt={tour.heroImage.alt} 
              fill 
              priority 
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </section>

        {/* HIGHLIGHTS */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">Highlights</h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {tour.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3">
                <span className="text-brand-green mt-1">✓</span>
                <span className="text-slate-700">{highlight}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ITINERARY */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">Itinerary</h2>
          <ol className="space-y-4">
            {tour.itinerary.map((step, idx) => (
              <li key={idx} className="rounded-xl border border-slate-200 p-6 bg-white">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    {step.time && (
                      <div className="text-sm text-slate-500 mb-1">{step.time}</div>
                    )}
                    <div className="font-semibold text-slate-900 mb-2">{step.title}</div>
                    <p className="text-slate-700">{step.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* INCLUDED / NOT */}
        <section className="mb-12 grid gap-8 md:grid-cols-2">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">What's included</h3>
            <ul className="space-y-3">
              {tour.includes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-brand-green">✓</span>
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {tour.excludes && tour.excludes.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Not included</h3>
              <ul className="space-y-3">
                {tour.excludes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-red-500">✗</span>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* GALLERY */}
        {tour.gallery.length > 0 && (
          <ImageGallery 
            images={tour.gallery}
            title="Tour Gallery"
          />
        )}

        {/* WHAT TO BRING */}
        {tour.whatToBring && tour.whatToBring.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">What to Bring</h2>
            <div className="bg-brand-sand/30 rounded-xl p-6">
              <ul className="grid gap-2 md:grid-cols-2">
                {tour.whatToBring.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-brand-green">•</span>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* FAQs */}
        {tour.faqs && tour.faqs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {tour.faqs.map((faq, index) => (
                <details key={index} className="bg-white rounded-xl border border-slate-200 p-6">
                  <summary className="cursor-pointer font-semibold text-slate-900 hover:text-brand-green transition-colors">
                    {faq.q}
                  </summary>
                  <p className="mt-3 text-slate-700">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* RELATED TOURS */}
        {related && related.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">You may also like</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link 
                  key={r.slug} 
                  href={`/tours/${r.slug}`} 
                  className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg mb-4">
                    <Image 
                      src={r.heroImage.src} 
                      alt={r.heroImage.alt} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div className="font-semibold text-slate-900 mb-2">{r.name}</div>
                  <div className="text-sm text-slate-600 mb-2">{r.tagline}</div>
                  <div className="text-brand-green font-semibold">
                    From {r.currency} {r.priceFromFJD}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
      
      {/* Sticky Booking CTA */}
      {tour && (
        <StickyBookingCTA 
          tourName={tour.name}
          price={tour.priceFromFJD.toString()}
          currency={tour.currency}
          tourSlug={tour.slug}
        />
      )}
    </Container>
    </>
  );
}
