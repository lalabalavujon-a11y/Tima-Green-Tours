import axios from 'axios';
import type { Airport, FlightOffer, FlightSearchRequest, Provider, Segment, PaymentSession } from './provider.types';

const BASE = 'https://api.duffel.com';

export function createDuffelProvider(token: string, env: string): Provider & {
  selectOffer?: (offerId: string) => Promise<any>;
  createOrder?: (payload: any) => Promise<any>;
} {
  const client = axios.create({ 
    baseURL: BASE, 
    headers: { 
      Authorization: `Bearer ${token}`, 
      'Duffel-Version': 'v1' 
    }, 
    timeout: 20000 
  });

  return {
    name: 'duffel',

    async searchAirports(query: string): Promise<Airport[]> {
      const response = await client.get('/places', {
        params: {
          query,
          types: ['airport']
        }
      });
      
      const places = response.data?.data || [];
      return places.map((place: any) => ({
        iata: place.iata_code,
        name: place.name,
        city: place.city_name,
        country: place.city?.country_code || ''
      }));
    },

    async searchFlights(req: FlightSearchRequest): Promise<FlightOffer[]> {
      const searchRequest = {
        slices: [
          {
            origin: req.origin,
            destination: req.destination,
            departure_date: req.departDate
          }
        ],
        passengers: [
          ...Array(req.adults).fill({ type: 'adult' }),
          ...Array(req.children || 0).fill({ type: 'child' }),
          ...Array(req.infants || 0).fill({ type: 'infant' })
        ],
        cabin_class: req.cabin || 'economy'
      };

      if (req.returnDate) {
        searchRequest.slices.push({
          origin: req.destination,
          destination: req.origin,
          departure_date: req.returnDate
        });
      }

      const response = await client.post('/air/search', searchRequest);
      const offers = response.data?.data?.offers || [];

      return offers.map((offer: any, index: number) => ({
        id: offer.id,
        carrier: offer.owner?.name || 'Unknown Carrier',
        segments: offer.slices.flatMap((slice: any) =>
          slice.segments.map((segment: any) => ({
            from: segment.origin?.iata_code,
            to: segment.destination?.iata_code,
            departAt: segment.departing_at,
            arriveAt: segment.arriving_at,
            carrier: segment.marketing_carrier?.name,
            flightNumber: segment.marketing_carrier_flight_number
          }))
        ),
        price: {
          amount: parseFloat(offer.total_amount),
          currency: offer.total_currency
        },
        refundable: offer.refundable || false,
        changeable: offer.changeable || false,
        deepLink: offer.deep_link
      }));
    },

    async createBooking(offerId: string, contactEmail: string) {
      // Duffel doesn't have a direct booking endpoint in the same way
      // This would typically create an order instead
      return {
        status: 'pending',
        reference: offerId
      };
    },

    async selectOffer(offerId: string) {
      const response = await client.get(`/air/offers/${offerId}`);
      return response.data?.data;
    },

    async createOrder(payload: { 
      offerId: string; 
      contact: { email: string; phone: string }; 
      passengers: any[];
      seats?: any[];
      baggage?: { paxId: string; pieces: number; weightKg?: number }[];
      payment?: { provider: 'duffel'; paymentToken?: string };
    }) {
      const orderRequest: any = {
        selected_offers: [payload.offerId],
        passengers: payload.passengers.map((p: any, idx: number) => ({ 
          id: `pax_${idx + 1}`, 
          ...p 
        })),
        contacts: [{ 
          email: payload.contact.email, 
          phone_number: payload.contact.phone 
        }],
        // TODO: map seats/baggage to Duffel ancillary structures once fetched from API
      };

      if (payload.payment?.provider === 'duffel') {
        orderRequest.payments = [
          // Provide Duffel‑compatible payment object; fill fields from Duffel Pay token/session
          // { type: 'balance', amount: '...', currency: 'USD' } OR a payments token reference, depending on your setup.
        ];
      } else {
        orderRequest.payments = [];
      }

      const response = await client.post('/air/orders', orderRequest);
      return response.data?.data;
    },

    async createPaymentSession(params: { amount: number; currency: string; offerId: string; returnUrl?: string }): Promise<PaymentSession> {
      // Placeholder: call Duffel Payments session/init endpoint.
      // Example shape; replace path/body with your Duffel Pay integration.
      // const r = await client.post('/payments/intents', { amount: params.amount, currency: params.currency, metadata: { offer_id: params.offerId }, return_url: params.returnUrl });
      // return { provider: 'duffel', clientToken: r.data?.client_token, redirectUrl: r.data?.redirect_url };
      return { provider: 'duffel', clientToken: undefined, redirectUrl: undefined };
    }
  } as any;
}
