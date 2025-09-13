'use client';

import { useState, useEffect } from 'react';

interface FlightInfo {
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  scheduledArrival: string;
  estimatedArrival: string;
  status: 'on-time' | 'delayed' | 'early' | 'cancelled';
  delayMinutes: number;
}

interface BookingWithFlight {
  bookingId: string;
  customerPhone: string;
  customerName: string;
  flightNumber: string;
  pickupTime: string;
  transferDate: string;
  routeId: string;
}

interface FlightTrackingProps {
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export default function FlightTracking({ 
  autoRefresh = true, 
  refreshInterval = 30000 
}: FlightTrackingProps) {
  const [bookings, setBookings] = useState<BookingWithFlight[]>([]);
  const [flights, setFlights] = useState<Record<string, FlightInfo>>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchFlightData = async () => {
    try {
      // In real implementation, this would fetch from your booking system
      const response = await fetch('/api/flight-tracking');
      const data = await response.json();
      
      if (data.success) {
        setBookings(data.bookings || []);
        setFlights(data.flights || {});
        setLastUpdate(new Date());
      }
    } catch (error) {
      console.error('Error fetching flight data:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkForDelays = async () => {
    try {
      const response = await fetch('/api/flight-tracking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'check-delays'
        }),
      });

      const data = await response.json();
      if (data.success && data.notificationsSent > 0) {
        console.log(`${data.notificationsSent} delay notifications sent`);
        // Refresh data after sending notifications
        fetchFlightData();
      }
    } catch (error) {
      console.error('Error checking delays:', error);
    }
  };

  useEffect(() => {
    fetchFlightData();
    
    if (autoRefresh) {
      const interval = setInterval(() => {
        fetchFlightData();
        checkForDelays();
      }, refreshInterval);

      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-time': return 'text-green-600 bg-green-100';
      case 'delayed': return 'text-red-600 bg-red-100';
      case 'early': return 'text-blue-600 bg-blue-100';
      case 'cancelled': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-time': return '✅';
      case 'delayed': return '⏰';
      case 'early': return '🚀';
      case 'cancelled': return '❌';
      default: return '❓';
    }
  };

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Pacific/Fiji'
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Flight Tracking</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={fetchFlightData}
            className="bg-brand-emerald text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-emerald-700 transition-colors"
          >
            Refresh
          </button>
          <span className="text-sm text-gray-500">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Active Flights */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Flights</h3>
        <div className="space-y-4">
          {bookings.map((booking) => {
            const flight = flights[booking.flightNumber];
            if (!flight) return null;

            return (
              <div key={booking.bookingId} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-semibold text-gray-900">
                      {flight.flightNumber}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(flight.status)}`}>
                      {getStatusIcon(flight.status)} {flight.status.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Pickup Time</div>
                    <div className="font-semibold text-gray-900">{booking.pickupTime}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <div className="text-sm text-gray-500">Route</div>
                    <div className="font-medium text-gray-900">{flight.origin} → {flight.destination}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Scheduled Arrival</div>
                    <div className="font-medium text-gray-900">{formatTime(flight.scheduledArrival)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Estimated Arrival</div>
                    <div className="font-medium text-gray-900">{formatTime(flight.estimatedArrival)}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{booking.customerName}</span> • {booking.routeId}
                  </div>
                  {flight.delayMinutes !== 0 && (
                    <div className={`text-sm font-medium ${
                      flight.delayMinutes > 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {flight.delayMinutes > 0 ? '+' : ''}{flight.delayMinutes} min
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Flight Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {Object.values(flights).filter(f => f.status === 'on-time').length}
          </div>
          <div className="text-sm text-green-700">On Time</div>
        </div>
        <div className="bg-red-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-600">
            {Object.values(flights).filter(f => f.status === 'delayed').length}
          </div>
          <div className="text-sm text-red-700">Delayed</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {Object.values(flights).filter(f => f.status === 'early').length}
          </div>
          <div className="text-sm text-blue-700">Early</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-600">
            {Object.values(flights).filter(f => f.status === 'cancelled').length}
          </div>
          <div className="text-sm text-gray-700">Cancelled</div>
        </div>
      </div>

      {/* Auto-refresh indicator */}
      {autoRefresh && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Auto-refreshing every {refreshInterval / 1000}s
          </div>
        </div>
      )}
    </div>
  );
}
