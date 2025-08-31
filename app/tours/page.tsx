import tours from '@/content/tours.json';
import Container from '@/components/Container';
import TourCard from '@/components/TourCard';

export const metadata = { title: 'Tours' };

export default function ToursPage() {
  return (
    <Container>
      <div className="py-14">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-green mb-4">
            Eco-Cultural Tours
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto">
            Small groups, locally guided, and designed for meaningful cultural exchange. 
            Each tour supports local communities and preserves Fijian traditions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-brand-sand/50 rounded-xl p-8">
            <h2 className="text-2xl font-semibold mb-4">Ready to Book Your Adventure?</h2>
            <p className="text-slate-700 mb-6">
              Contact us to customize your experience or book your preferred tour.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-brand-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-green/90 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}
