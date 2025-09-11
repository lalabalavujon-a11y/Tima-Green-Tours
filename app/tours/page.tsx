import Link from 'next/link';
import Container from '@/components/Container';
import TourCard from '@/components/TourCard';
import { getAllTours } from '@/lib/data';
import { CONTACT_URL } from '@/lib/config';

export default function ToursPage() {
  const tours = getAllTours();
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-brand-emerald-600 via-brand-emerald-700 to-brand-emerald-800 text-white text-center">
        <Container>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our Signature Tours
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover authentic Fiji with our eco-friendly, community-led cultural tours. Experience village life, kava ceremonies, rainforest hikes, and more.
          </p>
        </Container>
      </section>

      {/* Tours Grid */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <TourCard key={tour.slug} tour={tour} />
            ))}
          </div>
          
          {/* CTA Section */}
          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Book Your Adventure?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Contact us to customize your perfect Fijian experience.
            </p>
            <Link href={CONTACT_URL} className="btn-primary text-lg">
              Get in Touch
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
