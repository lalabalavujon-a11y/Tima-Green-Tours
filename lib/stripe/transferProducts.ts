import type { TransferPricing, TransferService, TransferRoute } from '@/lib/types/transfer';
import { transferPricing, transferServices, transferRoutes } from '@/lib/data/transfers';

// Stripe Product Configuration for Transfers
export interface StripeTransferProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  serviceType: 'private' | 'shared' | 'premium';
  routeId: string;
  routeName: string;
  fromZone: string;
  toZone: string;
  capacity: {
    minPassengers: number;
    maxPassengers: number;
    maxLuggage: number;
  };
  amenities: string[];
  features: string[];
  isWifiIncluded: boolean;
  isMeetAndGreet: boolean;
  isLeiGreeting: boolean;
  isBottledWater: boolean;
  isChildSeatAvailable: boolean;
  isAccessible: boolean;
  cancellationPolicy: string;
  bookingAdvanceRequired: number;
  stripeProductId?: string;
  stripePriceId?: string;
}

// Generate all Stripe products for transfers
export function generateTransferProducts(): StripeTransferProduct[] {
  const products: StripeTransferProduct[] = [];

  for (const pricing of transferPricing) {
    const route = transferRoutes.find(r => r.id === pricing.routeId);
    const service = transferServices.find(s => s.type === pricing.serviceType);
    
    if (!route || !service) continue;

    const fromZone = route.fromZone;
    const toZone = route.toZone;
    
    // Create product name based on route and service
    const routeName = route.name;
    const serviceName = service.name;
    const productName = `${serviceName} - ${routeName}`;
    
    // Create detailed description
    const description = `${service.description} from ${fromZone.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} to ${toZone.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}. ${service.features.join(', ')}.`;

    products.push({
      id: `${pricing.routeId}-${pricing.serviceType}`,
      name: productName,
      description,
      price: pricing.basePrice,
      currency: pricing.currency,
      serviceType: pricing.serviceType,
      routeId: pricing.routeId,
      routeName,
      fromZone,
      toZone,
      capacity: pricing.capacity,
      amenities: service.amenities,
      features: service.features,
      isWifiIncluded: service.isWifiIncluded,
      isMeetAndGreet: service.isMeetAndGreet,
      isLeiGreeting: service.isLeiGreeting,
      isBottledWater: service.isBottledWater,
      isChildSeatAvailable: service.isChildSeatAvailable,
      isAccessible: service.isAccessible,
      cancellationPolicy: service.cancellationPolicy,
      bookingAdvanceRequired: service.bookingAdvanceRequired
    });
  }

  return products;
}

// Stripe Product IDs mapping (to be populated after creating products in Stripe)
export const stripeTransferProducts: Record<string, { productId: string; priceId: string }> = {
  // Nadi Airport to Denarau
  'nadi-airport-denarau-private': {
    productId: 'prod_nadi_denarau_private',
    priceId: 'price_nadi_denarau_private'
  },
  'nadi-airport-denarau-shared': {
    productId: 'prod_nadi_denarau_shared',
    priceId: 'price_nadi_denarau_shared'
  },
  'nadi-airport-denarau-premium': {
    productId: 'prod_nadi_denarau_premium',
    priceId: 'price_nadi_denarau_premium'
  },

  // Nadi Airport to Coral Coast
  'nadi-airport-coral-coast-private': {
    productId: 'prod_nadi_coral_private',
    priceId: 'price_nadi_coral_private'
  },
  'nadi-airport-coral-coast-shared': {
    productId: 'prod_nadi_coral_shared',
    priceId: 'price_nadi_coral_shared'
  },
  'nadi-airport-coral-coast-premium': {
    productId: 'prod_nadi_coral_premium',
    priceId: 'price_nadi_coral_premium'
  },

  // Nadi Airport to Pacific Harbour
  'nadi-airport-pacific-harbour-private': {
    productId: 'prod_nadi_pacific_private',
    priceId: 'price_nadi_pacific_private'
  },
  'nadi-airport-pacific-harbour-premium': {
    productId: 'prod_nadi_pacific_premium',
    priceId: 'price_nadi_pacific_premium'
  },

  // Nadi Airport to Suva
  'nadi-airport-suva-private': {
    productId: 'prod_nadi_suva_private',
    priceId: 'price_nadi_suva_private'
  },
  'nadi-airport-suva-premium': {
    productId: 'prod_nadi_suva_premium',
    priceId: 'price_nadi_suva_premium'
  },

  // Nadi Airport to Lautoka
  'nadi-airport-lautoka-private': {
    productId: 'prod_nadi_lautoka_private',
    priceId: 'price_nadi_lautoka_private'
  },
  'nadi-airport-lautoka-shared': {
    productId: 'prod_nadi_lautoka_shared',
    priceId: 'price_nadi_lautoka_shared'
  },
  'nadi-airport-lautoka-premium': {
    productId: 'prod_nadi_lautoka_premium',
    priceId: 'price_nadi_lautoka_premium'
  },

  // Nadi Airport to Rakiraki
  'nadi-airport-rakiraki-private': {
    productId: 'prod_nadi_rakiraki_private',
    priceId: 'price_nadi_rakiraki_private'
  },
  'nadi-airport-rakiraki-premium': {
    productId: 'prod_nadi_rakiraki_premium',
    priceId: 'price_nadi_rakiraki_premium'
  },

  // Secondary Routes
  'denarau-coral-coast-private': {
    productId: 'prod_denarau_coral_private',
    priceId: 'price_denarau_coral_private'
  },
  'coral-coast-suva-private': {
    productId: 'prod_coral_suva_private',
    priceId: 'price_coral_suva_private'
  },
  'lautoka-nadi-town-private': {
    productId: 'prod_lautoka_nadi_private',
    priceId: 'price_lautoka_nadi_private'
  },
  'lautoka-nadi-town-shared': {
    productId: 'prod_lautoka_nadi_shared',
    priceId: 'price_lautoka_nadi_shared'
  },

  // Island Routes
  'suva-airport-suva-private': {
    productId: 'prod_suva_airport_private',
    priceId: 'price_suva_airport_private'
  },
  'suva-airport-suva-shared': {
    productId: 'prod_suva_airport_shared',
    priceId: 'price_suva_airport_shared'
  },
  'savusavu-airport-savusavu-private': {
    productId: 'prod_savusavu_private',
    priceId: 'price_savusavu_private'
  },
  'labasa-airport-labasa-private': {
    productId: 'prod_labasa_private',
    priceId: 'price_labasa_private'
  },
  'taveuni-airport-resorts-private': {
    productId: 'prod_taveuni_private',
    priceId: 'price_taveuni_private'
  },
  'taveuni-airport-resorts-premium': {
    productId: 'prod_taveuni_premium',
    priceId: 'price_taveuni_premium'
  }
};

// Surcharge products for additional services
export const stripeSurchargeProducts: Record<string, { productId: string; priceId: string }> = {
  'after-hours-surcharge': {
    productId: 'prod_after_hours_surcharge',
    priceId: 'price_after_hours_surcharge'
  },
  'public-holiday-surcharge': {
    productId: 'prod_public_holiday_surcharge',
    priceId: 'price_public_holiday_surcharge'
  },
  'child-seat-surcharge': {
    productId: 'prod_child_seat_surcharge',
    priceId: 'price_child_seat_surcharge'
  },
  'extra-luggage-surcharge': {
    productId: 'prod_extra_luggage_surcharge',
    priceId: 'price_extra_luggage_surcharge'
  }
};

// Get Stripe product configuration for a specific transfer
export function getStripeProductConfig(routeId: string, serviceType: 'private' | 'shared' | 'premium'): StripeTransferProduct | null {
  const products = generateTransferProducts();
  return products.find(p => p.routeId === routeId && p.serviceType === serviceType) || null;
}

// Get Stripe product IDs for a specific transfer
export function getStripeProductIds(routeId: string, serviceType: 'private' | 'shared' | 'premium'): { productId: string; priceId: string } | null {
  const key = `${routeId}-${serviceType}`;
  return stripeTransferProducts[key] || null;
}

// Generate Stripe product creation payload
export function generateStripeProductPayload(product: StripeTransferProduct) {
  return {
    name: product.name,
    description: product.description,
    metadata: {
      routeId: product.routeId,
      serviceType: product.serviceType,
      fromZone: product.fromZone,
      toZone: product.toZone,
      maxPassengers: product.capacity.maxPassengers.toString(),
      maxLuggage: product.capacity.maxLuggage.toString(),
      isWifiIncluded: product.isWifiIncluded.toString(),
      isMeetAndGreet: product.isMeetAndGreet.toString(),
      isLeiGreeting: product.isLeiGreeting.toString(),
      isBottledWater: product.isBottledWater.toString(),
      isChildSeatAvailable: product.isChildSeatAvailable.toString(),
      isAccessible: product.isAccessible.toString()
    }
  };
}

// Generate Stripe price creation payload
export function generateStripePricePayload(product: StripeTransferProduct, stripeProductId: string) {
  return {
    product: stripeProductId,
    unit_amount: Math.round(product.price * 100), // Convert to cents
    currency: product.currency.toLowerCase(),
    metadata: {
      routeId: product.routeId,
      serviceType: product.serviceType,
      basePrice: product.price.toString()
    }
  };
}

// Generate all Stripe products and prices for bulk creation
export function generateBulkStripeProducts() {
  const products = generateTransferProducts();
  
  return {
    products: products.map(product => ({
      product: generateStripeProductPayload(product),
      price: generateStripePricePayload(product, `prod_${product.id.replace('-', '_')}`)
    })),
    surcharges: [
      {
        product: {
          name: 'After Hours Surcharge',
          description: 'Additional charge for transfers between 22:00-05:29',
          metadata: {
            type: 'surcharge',
            surchargeType: 'afterHours'
          }
        },
        price: {
          unit_amount: 2000, // FJD 20.00
          currency: 'fjd',
          metadata: {
            surchargeType: 'afterHours',
            amount: '20'
          }
        }
      },
      {
        product: {
          name: 'Public Holiday Surcharge',
          description: 'Additional charge for transfers on public holidays',
          metadata: {
            type: 'surcharge',
            surchargeType: 'publicHoliday'
          }
        },
        price: {
          unit_amount: 2500, // FJD 25.00
          currency: 'fjd',
          metadata: {
            surchargeType: 'publicHoliday',
            amount: '25'
          }
        }
      },
      {
        product: {
          name: 'Child Seat Surcharge',
          description: 'Additional charge for child safety seats',
          metadata: {
            type: 'surcharge',
            surchargeType: 'childSeat'
          }
        },
        price: {
          unit_amount: 1500, // FJD 15.00
          currency: 'fjd',
          metadata: {
            surchargeType: 'childSeat',
            amount: '15'
          }
        }
      },
      {
        product: {
          name: 'Extra Luggage Surcharge',
          description: 'Additional charge for extra luggage beyond included allowance',
          metadata: {
            type: 'surcharge',
            surchargeType: 'extraLuggage'
          }
        },
        price: {
          unit_amount: 1000, // FJD 10.00
          currency: 'fjd',
          metadata: {
            surchargeType: 'extraLuggage',
            amount: '10'
          }
        }
      }
    ]
  };
}
