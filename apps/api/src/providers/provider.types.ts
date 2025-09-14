export interface Airport {
  iata: string;
  name: string;
  city: string;
  country: string;
}

export interface Segment {
  from: string;
  to: string;
  departAt: string;
  arriveAt?: string;
  carrier?: string;
  flightNumber?: string;
}

export interface FlightOffer {
  id: string;
  carrier: string;
  segments: Segment[];
  price: {
    amount: number;
    currency: string;
  };
  refundable: boolean;
  changeable: boolean;
  baggage?: string;
  deepLink?: string;
  provider?: string;
}

export interface FlightSearchRequest {
  origin: string;
  destination: string;
  departDate: string;
  returnDate?: string;
  adults: number;
  children?: number;
  infants?: number;
  cabin?: 'economy' | 'premium_economy' | 'business' | 'first';
}

export interface BookingRequest {
  offerId: string;
  contactEmail: string;
}

export interface BookingResponse {
  status: string;
  reference?: string;
  bookingId?: string;
  deepLink?: string;
}

export interface PaymentSession {
  provider: 'duffel';
  clientToken?: string;   // token for Duffel Elements/SDK (if applicable)
  redirectUrl?: string;   // if Duffel provides a hosted checkout URL
}

export interface SeatMapSeatService { 
  id: string; 
  total_amount?: string; 
  total_currency?: string; 
}

export interface SeatMapSeat { 
  label?: string; 
  disclosures?: string[]; 
  available_services?: SeatMapSeatService[] 
}

export interface SeatMapCabin { 
  cabin_class?: string; 
  seats?: SeatMapSeat[] 
}

export interface SeatMap { 
  id: string; 
  segment_id?: string; 
  cabins?: SeatMapCabin[] 
}

export interface OfferService { 
  id: string; 
  type: 'baggage'; 
  total_amount: string; 
  total_currency: string; 
  passenger_ids: string[]; 
  segment_ids: string[]; 
  maximum_quantity?: number 
}

export interface Provider {
  name: string;
  searchAirports(query: string): Promise<Airport[]>;
  searchFlights(request: FlightSearchRequest): Promise<FlightOffer[]>;
  createBooking?(offerId: string, contactEmail: string): Promise<BookingResponse>;
  selectOffer?(offerId: string): Promise<any>;
  createOrder?(payload: any): Promise<any>;
  getSeatMaps?(offerId: string): Promise<SeatMap[]>;
  getOfferServices?(offerId: string): Promise<OfferService[]>;
  payOrder?(orderId: string, amount: number, currency: string): Promise<{ status: 'succeeded'|'pending'|'failed' }>;
  createPaymentSession?(
    params: { amount: number; currency: string; offerId: string; returnUrl?: string }
  ): Promise<PaymentSession>;
}
