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

export interface OrderCreateRequest {
  offerId: string;
  contact: {
    email: string;
    phone: string;
  };
  passengers: Array<{
    title?: 'mr' | 'ms' | 'mrs' | 'mx';
    given_name: string;
    family_name: string;
    born_on: string;
    type: 'adult' | 'child' | 'infant';
  }>;
  seats?: any[];
  baggage?: Array<{
    paxId: string;
    pieces: number;
    weightKg?: number;
  }>;
  payment?: {
    provider: 'duffel';
    paymentToken?: string;
  };
}

export interface OrderResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export async function selectOffer(offerId: string, token?: string): Promise<OrderResponse> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_BASE}/v1/offers/select`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ offerId }),
  });
  
  return response.json();
}

export async function createOrder(payload: OrderCreateRequest): Promise<OrderResponse> {
  // Generate a unique idempotency key
  const idempotencyKey = `order_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  
  const response = await fetch(`${API_BASE}/v1/orders/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey,
    },
    body: JSON.stringify(payload),
  });
  
  return response.json();
}

export interface PaymentIntentRequest {
  amount: number;
  currency?: string;
  metadata?: Record<string, string>;
}

export interface PaymentIntentResponse {
  success: boolean;
  clientSecret: string;
  paymentIntentId: string;
}

export async function createPaymentIntent(
  body: PaymentIntentRequest,
  idempotencyKey: string
): Promise<PaymentIntentResponse> {
  const response = await fetch(`${API_BASE}/v1/payments/create-intent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey,
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message || 'Payment intent creation failed');
  }
  return data;
}

export interface OrderCreateRequest {
  offerId: string;
  contact: {
    email: string;
    phone: string;
  };
  passengers: Array<{
    title?: 'mr' | 'ms' | 'mrs' | 'mx';
    given_name: string;
    family_name: string;
    born_on: string;
    type: 'adult' | 'child' | 'infant';
  }>;
}

export interface OrderCreateResponse {
  success: boolean;
  data?: any;
  message?: string;
}

export async function createOrder(
  body: OrderCreateRequest,
  idempotencyKey?: string
): Promise<OrderCreateResponse> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (idempotencyKey) {
    headers['Idempotency-Key'] = idempotencyKey;
  }

  const response = await fetch(`${API_BASE}/v1/orders/create`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
}

export interface DuffelPaySessionRequest {
  amount: number;
  currency?: string;
  offerId: string;
}

export interface DuffelPaySessionResponse {
  success: boolean;
  data?: {
    provider: 'duffel';
    clientToken?: string;
    redirectUrl?: string;
  };
  message?: string;
}

export async function createDuffelPaySession(
  params: DuffelPaySessionRequest,
  idempotencyKey?: string
): Promise<DuffelPaySessionResponse> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (idempotencyKey) {
    headers['Idempotency-Key'] = idempotencyKey;
  }

  const response = await fetch(`${API_BASE}/v1/payments/duffel/session`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });
  const data = await response.json();
  return data;
}
