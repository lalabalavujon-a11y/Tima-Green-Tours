export interface TransferZone {
  id: string;
  name: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  radius: number; // in kilometers
  isAirport: boolean;
  isResort: boolean;
  isCity: boolean;
  amenities: string[];
}

export interface TransferRoute {
  id: string;
  name: string;
  fromZone: string;
  toZone: string;
  distance: number; // in kilometers
  estimatedDuration: number; // in minutes
  isActive: boolean;
  isShared: boolean;
  isPrivate: boolean;
  isPremium: boolean;
  isAccessible: boolean;
  operatingHours: {
    start: string; // HH:MM format
    end: string; // HH:MM format
    days: string[]; // ['monday', 'tuesday', etc.]
  };
  seasonalAvailability?: {
    start: string; // MM-DD format
    end: string; // MM-DD format
  };
}

export interface TransferPricing {
  routeId: string;
  serviceType: 'private' | 'shared' | 'premium';
  basePrice: number; // FJD
  currency: 'FJD' | 'USD' | 'AUD' | 'NZD';
  pricingRules: {
    afterHoursSurcharge: number; // FJD (22:00-05:29)
    publicHolidaySurcharge: number; // FJD
    childSeatSurcharge: number; // FJD per seat
    luggageSurcharge: number; // FJD per extra bag
    groupDiscount?: {
      minPassengers: number;
      discountPercent: number;
    };
    peakSeasonMultiplier?: number;
  };
  capacity: {
    minPassengers: number;
    maxPassengers: number;
    maxLuggage: number;
  };
}

export interface TransferService {
  id: string;
  name: string;
  description: string;
  type: 'private' | 'shared' | 'premium';
  vehicleType: 'sedan' | 'suv' | 'van' | 'coach' | 'luxury';
  amenities: string[];
  features: string[];
  imageUrl?: string;
  isWifiIncluded: boolean;
  isMeetAndGreet: boolean;
  isLeiGreeting: boolean;
  isBottledWater: boolean;
  isChildSeatAvailable: boolean;
  isAccessible: boolean;
  languages: string[];
  cancellationPolicy: string;
  bookingAdvanceRequired: number; // hours
}

export interface TransferBooking {
  id: string;
  bookingReference: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    whatsapp?: string;
    nationality?: string;
  };
  transfer: {
    routeId: string;
    serviceId: string;
    date: string; // YYYY-MM-DD
    time: string; // HH:MM
    passengers: number;
    children: number;
    infants: number;
    luggage: number;
    childSeats: number;
    specialRequests?: string;
    flightNumber?: string;
    flightArrivalTime?: string;
    pickupLocation?: string;
    dropoffLocation?: string;
  };
  pricing: {
    basePrice: number;
    surcharges: {
      afterHours?: number;
      publicHoliday?: number;
      childSeats?: number;
      luggage?: number;
    };
    discounts: {
      group?: number;
      loyalty?: number;
    };
    totalPrice: number;
    currency: string;
  };
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  payment: {
    method: 'stripe' | 'cash' | 'bank_transfer';
    status: 'pending' | 'paid' | 'failed' | 'refunded';
    stripeSessionId?: string;
    stripePaymentIntentId?: string;
  };
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface TransferAvailability {
  routeId: string;
  serviceId: string;
  date: string;
  timeSlots: Array<{
    time: string;
    available: boolean;
    price: number;
    capacity: number;
    remainingSeats: number;
  }>;
}

export interface PublicHoliday {
  id: string;
  name: string;
  date: string; // YYYY-MM-DD
  isRecurring: boolean;
  surcharge: number; // FJD
}

export interface TransferSearchFilters {
  fromZone?: string;
  toZone?: string;
  date?: string;
  time?: string;
  passengers?: number;
  children?: number;
  infants?: number;
  luggage?: number;
  serviceType?: 'private' | 'shared' | 'premium';
  amenities?: string[];
  maxPrice?: number;
  currency?: string;
}

export interface TransferQuote {
  routeId: string;
  serviceId: string;
  basePrice: number;
  surcharges: {
    afterHours?: number;
    publicHoliday?: number;
    childSeats?: number;
    luggage?: number;
  };
  discounts: {
    group?: number;
    loyalty?: number;
  };
  totalPrice: number;
  currency: string;
  breakdown: Array<{
    item: string;
    amount: number;
    description: string;
  }>;
  validUntil: string; // ISO timestamp
}

// Island and location specific types
export interface IslandTransfer {
  islandId: string;
  islandName: string;
  mainlandConnection: {
    port: string;
    ferryOperator: string;
    transferRoute: string;
  };
  localTransfers: TransferRoute[];
  isPartnerOperated: boolean;
  partnerOperator?: string;
}

export interface ResortTransfer {
  resortId: string;
  resortName: string;
  zone: string;
  isPreferredPartner: boolean;
  qrCodeUrl?: string;
  digitalDeskActive: boolean;
  specialRates?: {
    serviceType: string;
    discountPercent: number;
  }[];
}
