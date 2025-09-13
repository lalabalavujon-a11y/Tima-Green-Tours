'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Container from '@/components/Container';
import SEOHead from '@/components/SEOHead';

interface BookingDetails {
  bookingReference: string;
  routeId: string;
  serviceId: string;
  date: string;
  time: string;
  passengers: number;
  children: number;
  infants: number;
  luggage: number;
  childSeats: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  totalPrice: number;
  currency: string;
}

function TransferBookingSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (sessionId) {
      fetchBookingDetails(sessionId);
    } else {
      setError('No session ID provided');
      setLoading(false);
    }
  }, [sessionId]);

  const fetchBookingDetails = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/transfers/booking/verify?session_id=${sessionId}`);
      const data = await response.json();
      
      if (data.success) {
        setBookingDetails(data.booking);
      } else {
        setError(data.error || 'Failed to fetch booking details');
      }
    } catch (err) {
      setError('Failed to fetch booking details');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <section className="pt-20 pb-16">
        <Container>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-emerald mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your booking details...</p>
          </div>
        </Container>
      </section>
    );
  }

  if (error || !bookingDetails) {
    return (
      <section className="pt-20 pb-16">
        <Container>
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-red-900 mb-2">Booking Not Found</h2>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      <SEOHead
        title="Transfer Booking Confirmed | Tima Green Tours"
        description="Your transfer booking has been confirmed. Thank you for choosing Tima Green Tours for your Fiji transport needs."
        url="/booking/transfer-success"
      />
      
      <section className="pt-20 pb-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Transfer Booking Confirmed!
              </h1>
              <p className="text-xl text-gray-600">
                Thank you for choosing Tima Green Tours. Your transfer has been successfully booked.
              </p>
            </div>

            {/* Booking Details Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Booking Reference</div>
                  <div className="text-lg font-bold text-brand-emerald-600">
                    {bookingDetails.bookingReference}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Transfer Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Transfer Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Route:</span>
                      <span className="font-medium">{bookingDetails.routeId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-medium">{bookingDetails.serviceId.split('-').pop()?.charAt(0).toUpperCase() + (bookingDetails.serviceId.split('-').pop()?.slice(1) || '')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{formatDate(bookingDetails.date)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{formatTime(bookingDetails.time)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Passengers:</span>
                      <span className="font-medium">{bookingDetails.passengers} adult{bookingDetails.passengers > 1 ? 's' : ''}</span>
                    </div>
                    {bookingDetails.children > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Children:</span>
                        <span className="font-medium">{bookingDetails.children} child{bookingDetails.children > 1 ? 'ren' : ''}</span>
                      </div>
                    )}
                    {bookingDetails.infants > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Infants:</span>
                        <span className="font-medium">{bookingDetails.infants} infant{bookingDetails.infants > 1 ? 's' : ''}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Luggage:</span>
                      <span className="font-medium">{bookingDetails.luggage} piece{bookingDetails.luggage > 1 ? 's' : ''}</span>
                    </div>
                    {bookingDetails.childSeats > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Child Seats:</span>
                        <span className="font-medium">{bookingDetails.childSeats} seat{bookingDetails.childSeats > 1 ? 's' : ''}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Customer Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{bookingDetails.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{bookingDetails.customerEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{bookingDetails.customerPhone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Paid:</span>
                      <span className="font-bold text-lg text-brand-emerald-600">
                        {bookingDetails.currency} {bookingDetails.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Important Information</h3>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Please arrive at the pickup location 10 minutes before your scheduled time
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Our driver will contact you via WhatsApp 30 minutes before pickup
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Free cancellation up to 24 hours before your transfer
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Contact us at +679 123 4567 for any changes or questions
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.print()}
                className="bg-brand-emerald text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-emerald-700 transition-colors"
              >
                Print Booking Confirmation
              </button>
              <button
                onClick={() => window.location.href = '/transfers'}
                className="bg-gray-100 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Book Another Transfer
              </button>
              <button
                onClick={() => window.location.href = '/tours'}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Explore Tours
              </button>
            </div>

            {/* Contact Information */}
            <div className="text-center mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
              <div className="flex flex-col sm:flex-row gap-6 justify-center text-gray-600">
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 text-brand-emerald-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +679 123 4567
                </div>
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 text-brand-emerald-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@timagreentours.com
                </div>
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 text-brand-emerald-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  WhatsApp Support
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default function TransferBookingSuccessPage() {
  return (
    <Suspense fallback={
      <section className="pt-20 pb-16">
        <Container>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-emerald mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </Container>
      </section>
    }>
      <TransferBookingSuccessContent />
    </Suspense>
  );
}
