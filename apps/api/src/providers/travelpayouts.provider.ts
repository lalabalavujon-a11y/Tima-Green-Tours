import axios from 'axios';
import type { Airport, FlightOffer, FlightSearchRequest, Provider } from './provider.types';

export function createTravelpayoutsProvider(cfg: { token: string; marker: string; host: string }): Provider {
  const headers = { 'X-Access-Token': cfg.token };
  const http = axios.create({ baseURL: `https://${cfg.host}`, headers, timeout: 15000 });
  const auto = axios.create({ baseURL: 'https://autocomplete.travelpayouts.com', timeout: 10000 });

  return {
    name: 'travelpayouts',

    async searchAirports(query: string): Promise<Airport[]> {
      const res = await auto.get('/places', { params: { term: query, locale: 'en' } });
      const arr = Array.isArray(res.data) ? res.data : [];
      return arr
        .filter((a: any) => a.code)
        .map((a: any) => ({ iata: a.code, city: a.city_name, country: a.country_code, name: a.name }));
    },

    async searchFlights(req: FlightSearchRequest): Promise<FlightOffer[]> {
      // Use prices_for_dates — returns date-bucketed fares; normalize to offers.
      const r = await http.get('/aviasales/v3/prices_for_dates', {
        params: {
          origin: req.origin,
          destination: req.destination,
          departure_at: req.departDate,
          return_at: req.returnDate,
          currency: 'USD',
          sorting: 'price',
          direct: false,
          limit: 30,
          marker: cfg.marker
        }
      });
      const data = r.data?.data ?? [];
      return data.map((x: any, i: number) => ({
        id: `${x.link || 'tp'}-${i}`,
        carrier: x.airline ?? 'Carrier',
        segments: [
          { from: req.origin, to: req.destination, departAt: x.departure_at },
          ...(req.returnDate ? [{ from: req.destination, to: req.origin, departAt: x.return_at }] : [])
        ],
        price: { amount: Number(x.price), currency: 'USD' },
        refundable: false,
        changeable: true,
        deepLink: x.link
      }));
    },

    async createBooking(offerId: string, contactEmail: string) {
      return { status: 'pending', reference: offerId };
    }
  };
}