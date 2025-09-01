import Link from 'next/link';
import Container from '@/components/Container';
import tours from '@/content/tours.json';

export default function ToursPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white text-center">
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
              <div key={tour.slug} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-4">
                  {tour.slug.includes('waterfall') ? '🌊' : 
                   tour.slug.includes('pottery') ? '🏺' : 
                   tour.slug.includes('horse') ? '🐎' : '🏝️'}
                </div>
                <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
                <p className="text-gray-700 mb-4">{tour.summary}</p>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>⏱️ {tour.duration}</span>
                  <span className="font-semibold text-green-600">{tour.price}</span>
                </div>
                <div className="text-xs text-gray-500 mb-4">
                  👥 {tour.group_size} • 🌿 Eco Rating: {tour.eco_rating}/5
                </div>
                <Link href={`/tours/${tour.slug}`} className="inline-flex items-center text-green-600 font-medium hover:text-green-700 transition-colors">
                  View details 
                  <span className="ml-1">→</span>
                </Link>
              </div>
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
            <Link href="/contact" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg text-lg">
              Get in Touch
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
