import FlightSearchForm from '@/components/FlightSearchForm';

export default function FlightsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Flight
          </h1>
          <p className="text-lg text-gray-600">
            Search and compare flights to destinations around the world
          </p>
        </div>
        
        <FlightSearchForm />
      </div>
    </div>
  );
}
