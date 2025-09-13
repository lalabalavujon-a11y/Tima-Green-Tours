'use client';

import { useState, useEffect, useCallback } from 'react';
import Container from '@/components/Container';
import SEOHead from '@/components/SEOHead';
import IslandConnector from '@/components/IslandConnector';
import MultilingualConcierge from '@/components/MultilingualConcierge';
import { getTransferZones, getTransferRoutes, getTransferServices } from '@/lib/transfers';
import type { TransferZone, TransferRoute, TransferService, TransferQuote } from '@/lib/types/transfer';

export default function TransfersPage() {
  const [zones] = useState<TransferZone[]>(getTransferZones());
  const [routes] = useState<TransferRoute[]>(getTransferRoutes());
  const [services] = useState<TransferService[]>(getTransferServices());
  
  const [selectedFromZone, setSelectedFromZone] = useState<string>('');
  const [selectedToZone, setSelectedToZone] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [passengers, setPassengers] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [infants, setInfants] = useState<number>(0);
  const [luggage, setLuggage] = useState<number>(1);
  const [childSeats, setChildSeats] = useState<number>(0);
  
  const [quote, setQuote] = useState<TransferQuote | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [selectedIslandConnector, setSelectedIslandConnector] = useState<any>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  // Filter routes based on selected zones
  const availableRoutes = routes.filter(route => 
    route.fromZone === selectedFromZone && route.toZone === selectedToZone
  );

  // Filter services based on selected route
  const availableServices = services.filter(service => {
    if (!availableRoutes.length) return false;
    const route = availableRoutes[0];
    return (
      (service.type === 'private' && route.isPrivate) ||
      (service.type === 'shared' && route.isShared) ||
      (service.type === 'premium' && route.isPremium)
    );
  });

  const calculateQuote = useCallback(async () => {
    if (!availableRoutes.length) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/transfers/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          routeId: availableRoutes[0].id,
          serviceType: selectedService,
          passengers,
          children,
          infants,
          luggage,
          childSeats,
          date: selectedDate,
          time: selectedTime
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setQuote(data.quote);
      } else {
        setError(data.error || 'Failed to calculate quote');
      }
    } catch (err) {
      setError('Failed to calculate quote');
    } finally {
      setLoading(false);
    }
  }, [availableRoutes, selectedService, passengers, children, infants, luggage, childSeats, selectedDate, selectedTime]);

  // Reset selected service when route changes
  useEffect(() => {
    if (selectedService && !availableServices.some(service => service.type === selectedService)) {
      setSelectedService('');
    }
  }, [availableServices, selectedService]);

  // Calculate quote when parameters change
  useEffect(() => {
    if (selectedFromZone && selectedToZone && selectedService && selectedDate && selectedTime) {
      calculateQuote();
    }
  }, [selectedFromZone, selectedToZone, selectedService, selectedDate, selectedTime, passengers, children, infants, luggage, childSeats, calculateQuote]);

  const handleBooking = async () => {
    if (!quote || !availableRoutes.length) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/transfers/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transfer: {
            routeId: availableRoutes[0].id,
            serviceId: selectedService,
            date: selectedDate,
            time: selectedTime,
            passengers,
            children,
            infants,
            luggage,
            childSeats
          },
          customer: {
            name: 'Guest User', // In real app, get from form
            email: 'guest@example.com', // In real app, get from form
            phone: '+6791234567' // In real app, get from form
          }
        }),
      });

      const data = await response.json();
      
      if (data.success && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        setError(data.error || 'Failed to create booking');
      }
    } catch (err) {
      setError('Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <SEOHead
        title="Fiji Airport Transfers & Transport | Tima Green Tours"
        description="Professional airport transfers and transport services throughout Fiji. Private, shared, and premium options with meet & greet, Wi-Fi, and 24/7 support."
        url="/transfers"
      />
      
      <section className="pt-20 pb-16">
        <Container>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Fiji Airport Transfers & Transport
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional, reliable, and comfortable transfer services throughout Fiji. 
              From Nadi Airport to all major destinations with private, shared, and premium options.
            </p>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* From Zone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From
                </label>
                <select
                  value={selectedFromZone}
                  onChange={(e) => setSelectedFromZone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-emerald focus:border-transparent"
                >
                  <option value="">Select pickup location</option>
                  {zones.map((zone) => (
                    <option key={zone.id} value={zone.id}>
                      {zone.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* To Zone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To
                </label>
                <select
                  value={selectedToZone}
                  onChange={(e) => setSelectedToZone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-emerald focus:border-transparent"
                >
                  <option value="">Select destination</option>
                  {zones.map((zone) => (
                    <option key={zone.id} value={zone.id}>
                      {zone.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Type
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-emerald focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  disabled={!availableServices.length}
                >
                  <option value="">
                    {!selectedFromZone || !selectedToZone 
                      ? "Select pickup and destination first" 
                      : !availableServices.length 
                        ? "No services available for this route" 
                        : "Select service"
                    }
                  </option>
                  {availableServices.map((service) => (
                    <option key={service.id} value={service.type}>
                      {service.name}
                    </option>
                  ))}
                </select>
                {!selectedFromZone || !selectedToZone ? (
                  <p className="text-xs text-gray-500 mt-1">
                    Please select both pickup location and destination to see available services
                  </p>
                ) : null}
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={today}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-emerald focus:border-transparent"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-emerald focus:border-transparent"
                />
              </div>

              {/* Passengers */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passengers
                </label>
                <input
                  type="number"
                  min="1"
                  max="8"
                  value={passengers}
                  onChange={(e) => setPassengers(parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-emerald focus:border-transparent"
                />
              </div>

              {/* Children */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Children (2-12)
                </label>
                <input
                  type="number"
                  min="0"
                  max="6"
                  value={children}
                  onChange={(e) => setChildren(parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-emerald focus:border-transparent"
                />
              </div>

              {/* Infants */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Infants (0-2)
                </label>
                <input
                  type="number"
                  min="0"
                  max="4"
                  value={infants}
                  onChange={(e) => setInfants(parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-emerald focus:border-transparent"
                />
              </div>

              {/* Luggage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Luggage Pieces
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={luggage}
                  onChange={(e) => setLuggage(parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-emerald focus:border-transparent"
                />
              </div>

              {/* Child Seats */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Child Seats
                </label>
                <input
                  type="number"
                  min="0"
                  max="4"
                  value={childSeats}
                  onChange={(e) => setChildSeats(parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-emerald focus:border-transparent"
                />
              </div>
            </div>

            {/* Quote Display */}
            {quote && (
              <div className="bg-brand-emerald-50 border border-brand-emerald-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-brand-emerald-900 mb-4">
                  Transfer Quote
                </h3>
                <div className="space-y-2">
                  {quote.breakdown.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-700">{item.description}</span>
                      <span className={`font-medium ${item.amount < 0 ? 'text-green-600' : 'text-gray-900'}`}>
                        {item.amount < 0 ? '-' : ''}FJD {Math.abs(item.amount).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-brand-emerald-200 pt-2 mt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-brand-emerald-900">Total</span>
                      <span className="text-brand-emerald-900">FJD {quote.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {/* Multilingual Concierge */}
            {selectedService && (
              <div className="mb-6">
                <MultilingualConcierge
                  onLanguageSelect={setSelectedLanguage}
                  selectedLanguage={selectedLanguage}
                  showDriverInfo={selectedService === 'premium'}
                />
              </div>
            )}

            {/* Island Connector Add-on */}
            {(selectedToZone === 'denarau-marina' || selectedFromZone === 'denarau-marina') && (
              <div className="mb-6">
                <IslandConnector
                  onSelectConnector={setSelectedIslandConnector}
                  selectedConnector={selectedIslandConnector}
                />
              </div>
            )}

            {/* Book Now Button */}
            <button
              onClick={handleBooking}
              disabled={!quote || loading}
              className="w-full bg-brand-emerald text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-brand-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Processing...' : 'Book Transfer Now'}
            </button>
          </div>

          {/* Service Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-brand-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Service</h3>
              <p className="text-gray-600">Round-the-clock availability with meet & greet services at all major airports and destinations.</p>
            </div>

            <div className="text-center">
              <div className="bg-brand-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Reliable & Safe</h3>
              <p className="text-gray-600">Professional drivers, modern vehicles, and comprehensive insurance coverage for your peace of mind.</p>
            </div>

            <div className="text-center">
              <div className="bg-brand-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Amenities</h3>
              <p className="text-gray-600">Wi-Fi, bottled water, child seats, and cultural commentary available on premium services.</p>
            </div>
          </div>

          {/* Popular Routes */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Popular Transfer Routes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {routes.slice(0, 6).map((route) => (
                <div key={route.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {route.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {route.distance}km • {route.estimatedDuration} minutes
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {route.isPrivate && (
                      <span className="px-2 py-1 bg-brand-emerald-100 text-brand-emerald-800 text-xs rounded-full">
                        Private
                      </span>
                    )}
                    {route.isShared && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        Shared
                      </span>
                    )}
                    {route.isPremium && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                        Premium
                      </span>
                    )}
                    {route.isAccessible && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Accessible
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
