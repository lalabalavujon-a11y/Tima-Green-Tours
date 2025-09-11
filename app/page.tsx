import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/Container';
import Section from '@/components/Section';
import TourCard from '@/components/TourCard';
import { getRelatedTours } from '@/lib/data';
import { CONTACT_URL } from '@/lib/config';
import SiaChat from '@/components/SiaChat';

export default function HomePage() {
  const featuredTours = getRelatedTours('biausevu-waterfall-tour');

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-brand-emerald-600 via-brand-emerald-700 to-brand-emerald-800 text-white text-center">
        <div className="container-base">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Fiji with Tima Green Tours
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-white/90">
            Indigenous-owned eco‑cultural experiences across Viti Levu. Waterfalls, village hospitality, kava ceremonies, craft workshops, and island getaways.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tours" className="bg-brand-emerald-500 hover:bg-brand-emerald-600 text-white font-semibold py-3 px-6 rounded-lg">
              Explore Our Tours
            </Link>
            <Link href={CONTACT_URL} className="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg border-2 border-green-500">
              Plan Your Trip
            </Link>
            <a
              href="https://wa.me/6790000000?text=Hi%20Tima%2C%20I%27d%20love%20to%20book%20a%20tour!"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Indigenous owned & operated</h3>
              <p className="text-gray-600">Authentic experiences with local experts</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⏰</span>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">20+ years combined experience</h3>
              <p className="text-gray-600">Guides who know Fiji’s hidden gems</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Budget-friendly packages</h3>
              <p className="text-gray-600">Quality experiences at fair prices</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Tours */}
      <Section
        overline="Signature Experiences"
        title="Eco-Cultural Tours curated by locals"
        subtitle="Small groups, real connections, measurable impact."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTours.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/tours" className="bg-brand-emerald-500 hover:bg-brand-emerald-600 text-white font-semibold py-3 px-6 rounded-lg">
            View All Tours
          </Link>
        </div>
      </Section>

      {/* Image strip */}
      <section className="py-12 bg-white">
        <div className="container-base grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4].map((i) => (
            <div key={i} className="relative h-28 md:h-40 rounded-lg overflow-hidden">
              <Image src="/tours/placeholder.jpg" alt="Fiji scene" fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black text-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Promise
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Travel that enriches guests and hosts. We measure success in smiles and stewardship.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">20+</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">30+</div>
              <div className="text-gray-300">Local Partners</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">5/5</div>
              <div className="text-gray-300">Eco Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">98%</div>
              <div className="text-gray-300">Guest Satisfaction</div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-50">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Ready to Experience Fiji?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join us for an unforgettable journey through the heart of the Pacific.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tours" className="bg-brand-emerald-500 hover:bg-brand-emerald-600 text-white font-semibold py-3 px-6 rounded-lg">
                Browse Tours
              </Link>
              <Link href={CONTACT_URL} className="bg-transparent hover:bg-brand-emerald-500 text-brand-emerald-600 hover:text-white font-semibold py-3 px-6 rounded-lg border-2 border-brand-emerald-500">
                Get in Touch
              </Link>
            </div>
          </div>
        </Container>
      </section>
      {process.env.NEXT_PUBLIC_ENABLE_ASSISTANTS_WIDGET === 'true' ? null : <SiaChat />}
    </div>
  );
}
