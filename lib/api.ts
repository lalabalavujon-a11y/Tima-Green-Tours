export interface FlightSearchBody {
  origin: string;
  destination: string;
  departDate: string;
  returnDate?: string;
  adults: number;
  children?: number;
  infants?: number;
  cabin?: 'economy' | 'premium_economy' | 'business' | 'first';
}

export interface Airport {
  iata: string;
  name: string;
  city: string;
  country: string;
}

export interface FlightOffer {
  id: string;
  carrier: string;
  segments: Array<{
    from: string;
    to: string;
    departAt: string;
    arriveAt?: string;
    carrier?: string;
  }>;
  price: {
    amount: number;
    currency: string;
  };
  refundable: boolean;
  changeable: boolean;
  baggage?: string;
  deepLink?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export async function searchAirports(query: string): Promise<Airport[]> {
  const response = await fetch(`${API_BASE}/v1/airports/search?query=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.data || [];
}

export async function searchFlights(body: FlightSearchBody): Promise<FlightOffer[]> {
  const response = await fetch(`${API_BASE}/v1/flights/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data.data || [];
}
