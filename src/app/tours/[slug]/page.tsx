import { getTourBySlug, tours } from '@/data/tours';
import { MapPin, Clock, Users, Star, Check, ArrowLeft, Calendar, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface TourPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all tours
export async function generateStaticParams() {
  return tours.map((tour) => ({
    slug: tour.slug,
  }));
}

export default function TourPage({ params }: TourPageProps) {
  const tour = getTourBySlug(params.slug);

  if (!tour) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <Link 
            href="/tours"
            className="inline-flex items-center gap-2 text-white hover:text-gray-200 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Tours
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{tour.title}</h1>
          <p className="text-xl max-w-3xl">{tour.description}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tour Overview */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Tour Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{tour.longDescription}</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-semibold">Duration</p>
                    <p className="text-gray-600">{tour.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-semibold">Group Size</p>
                    <p className="text-gray-600">Max {tour.maxGroupSize} people</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-gray-600">{tour.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-semibold">Difficulty</p>
                    <p className="text-gray-600">{tour.difficulty}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Highlights</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {tour.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">What's Included</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {tour.includes.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Pricing Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6 sticky top-6">
                             <div className="text-center mb-6">
                 <div className="text-4xl font-bold text-green-600 mb-2">${tour.price}</div>
                 <p className="text-gray-600">per person</p>
               </div>
              
              <div className="space-y-4">
                <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  Book This Tour
                </button>
                
                <button className="w-full border-2 border-green-600 text-green-600 py-3 px-6 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                  Contact for Custom Booking
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>Available year-round</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Users className="w-4 h-4" />
                  <span>Small group experience</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Star className="w-4 h-4" />
                  <span>Local expert guides</span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Need Help?</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-semibold">Call Us</p>
                    <p className="text-gray-600">+679 XXX XXXX</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-semibold">Email Us</p>
                    <p className="text-gray-600">info@timaimagreentours.com</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  We're here to help you plan the perfect Fijian adventure. 
                  Contact us for any questions or custom tour requests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Tours */}
      <div className="bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Other Tours You Might Like</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {tours
              .filter(t => t.id !== tour.id)
              .slice(0, 3)
              .map((relatedTour) => (
                <div key={relatedTour.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="h-32 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold text-center px-4">{relatedTour.title}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold mb-2">{relatedTour.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{relatedTour.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-green-600">${relatedTour.price}</div>
                      <Link 
                        href={`/tours/${relatedTour.slug}`}
                        className="text-green-600 hover:text-green-700 font-semibold text-sm"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

