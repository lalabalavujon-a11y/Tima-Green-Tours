import tours from '@/content/tours.json';
import Container from '@/components/Container';
import TourCard from '@/components/TourCard';

export const metadata = { title: 'Tours' };

export default function ToursPage() {
  return (
    <Container>
      <div className="py-14">
        <h1 className="text-3xl md:text-4xl font-semibold">Eco-Cultural Tours</h1>
        <p className="mt-3 text-slate-700 max-w-2xl">
          Small groups, locally guided, and designed for meaningful cultural exchange.
        </p>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {tours.map((t) => (
            <TourCard key={t.slug} tour={t} />
          ))}
        </div>
      </div>
    </Container>
  );
}
