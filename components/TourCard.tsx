type Tour = {
  slug: string;
  title: string;
  summary: string;
  duration: string;
  eco_rating: number;
  highlights: string[];
};

export default function TourCard({ tour }: { tour: Tour }) {
  return (
    <article className="rounded-lg border bg-white p-5 flex flex-col">
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{tour.title}</h3>
        <p className="mt-2 text-slate-700">{tour.summary}</p>
        <ul className="mt-3 text-sm list-disc pl-5 space-y-1">
          {tour.highlights.slice(0, 3).map((h) => <li key={h}>{h}</li>)}
        </ul>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-slate-600">Duration: {tour.duration}</span>
        <span aria-label={`Eco rating ${tour.eco_rating} of 5`} title="Eco rating">
          {'🌿'.repeat(tour.eco_rating)}
        </span>
      </div>
    </article>
  );
}
