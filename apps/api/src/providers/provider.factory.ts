import { config } from '../config';
import { createTravelpayoutsProvider } from './travelpayouts.provider';
import { createDuffelProvider } from './duffel.provider';
import type { Provider } from './provider.types';

let providerInstance: Provider | null = null;

export function getProvider(): Provider {
  if (!providerInstance) {
    const providerName = config.TGT_ACTIVE_PROVIDER || 'mock';
    
    switch (providerName) {
      case 'duffel':
        if (!config.DUFFEL_ACCESS_TOKEN) {
          throw new Error('DUFFEL_ACCESS_TOKEN is required for Duffel provider');
        }
        providerInstance = createDuffelProvider(
          config.DUFFEL_ACCESS_TOKEN,
          config.DUFFEL_ENVIRONMENT || 'sandbox'
        );
        break;
        
      case 'travelpayouts':
        if (!config.TRAVELPAYOUTS_TOKEN || !config.TRAVELPAYOUTS_MARKER || !config.TRAVELPAYOUTS_HOST) {
          throw new Error('TRAVELPAYOUTS_TOKEN, TRAVELPAYOUTS_MARKER, and TRAVELPAYOUTS_HOST are required for Travelpayouts provider');
        }
        providerInstance = createTravelpayoutsProvider({
          token: config.TRAVELPAYOUTS_TOKEN,
          marker: config.TRAVELPAYOUTS_MARKER,
          host: config.TRAVELPAYOUTS_HOST
        });
        break;
        
      default:
        // Mock provider for development
        providerInstance = createMockProvider();
        break;
    }
  }
  
  return providerInstance;
}

function createMockProvider(): Provider {
  return {
    name: 'mock',
    
    async searchAirports(query: string) {
      const mockAirports = [
        { iata: 'LON', city: 'London', country: 'United Kingdom', name: 'London Heathrow' },
        { iata: 'NBO', city: 'Nairobi', country: 'Kenya', name: 'Jomo Kenyatta International' },
        { iata: 'LAX', city: 'Los Angeles', country: 'United States', name: 'Los Angeles International' },
        { iata: 'JFK', city: 'New York', country: 'United States', name: 'John F. Kennedy International' }
      ];
      
      return mockAirports.filter(airport => 
        airport.iata.toLowerCase().includes(query.toLowerCase()) ||
        airport.city.toLowerCase().includes(query.toLowerCase())
      );
    },
    
    async searchFlights(req) {
      const mockOffers = [
        {
          id: 'offer_1',
          carrier: 'British Airways',
          segments: [
            {
              from: req.origin,
              to: req.destination,
              departAt: `${req.departDate}T08:00:00Z`,
              arriveAt: `${req.departDate}T18:30:00Z`,
              carrier: 'British Airways',
              flightNumber: 'BA123'
            }
          ],
          price: { amount: 800, currency: 'USD' },
          deepLink: 'https://mock-booking.com/offer/1',
          provider: 'mock'
        }
      ];
      
      return mockOffers;
    },
    
    async createBooking(offerId: string, contactEmail: string) {
      return {
        status: 'created',
        deepLink: `https://mock-booking.com/booking/${Date.now()}`,
        reference: `MOCK${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        bookingId: `booking_${Date.now()}`
      };
    }
  };
}
