import type { 
  TransferZone, 
  TransferRoute, 
  TransferPricing, 
  TransferService, 
  PublicHoliday,
  IslandTransfer,
  ResortTransfer 
} from '@/lib/types/transfer';

// Transfer Zones based on recce report analysis
export const transferZones: TransferZone[] = [
  // Airport Zones
  {
    id: 'nadi-airport',
    name: 'Nadi International Airport',
    description: 'Main international gateway to Fiji',
    coordinates: { lat: -17.7554, lng: 177.4434 },
    radius: 2,
    isAirport: true,
    isResort: false,
    isCity: false,
    amenities: ['meet-greet', 'luggage-assistance', 'flight-tracking', '24-7-service']
  },
  {
    id: 'suva-airport',
    name: 'Nausori International Airport',
    description: 'Domestic and limited international flights',
    coordinates: { lat: -18.0433, lng: 178.5592 },
    radius: 1.5,
    isAirport: true,
    isResort: false,
    isCity: false,
    amenities: ['meet-greet', 'luggage-assistance', 'flight-tracking']
  },
  {
    id: 'savusavu-airport',
    name: 'Savusavu Airport',
    description: 'Domestic flights to Vanua Levu',
    coordinates: { lat: -16.8028, lng: 179.3411 },
    radius: 1,
    isAirport: true,
    isResort: false,
    isCity: false,
    amenities: ['meet-greet', 'luggage-assistance']
  },
  {
    id: 'labasa-airport',
    name: 'Labasa Airport',
    description: 'Domestic flights to Vanua Levu',
    coordinates: { lat: -16.4667, lng: 179.3397 },
    radius: 1,
    isAirport: true,
    isResort: false,
    isCity: false,
    amenities: ['meet-greet', 'luggage-assistance']
  },
  {
    id: 'taveuni-airport',
    name: 'Matei Airport',
    description: 'Domestic flights to Garden Island',
    coordinates: { lat: -16.6906, lng: -179.8769 },
    radius: 1,
    isAirport: true,
    isResort: false,
    isCity: false,
    amenities: ['meet-greet', 'luggage-assistance']
  },

  // Resort Zones - Denarau
  {
    id: 'denarau-marina',
    name: 'Denarau Marina',
    description: 'Gateway to Mamanuca and Yasawa Islands',
    coordinates: { lat: -17.7733, lng: 177.3867 },
    radius: 3,
    isAirport: false,
    isResort: true,
    isCity: false,
    amenities: ['island-connections', 'ferry-terminal', 'resort-shuttles']
  },
  {
    id: 'denarau-resorts',
    name: 'Denarau Island Resorts',
    description: 'Premium resort complex with multiple properties',
    coordinates: { lat: -17.7750, lng: 177.3800 },
    radius: 2,
    isAirport: false,
    isResort: true,
    isCity: false,
    amenities: ['resort-access', 'golf-course', 'marina', 'shopping']
  },

  // Resort Zones - Coral Coast
  {
    id: 'coral-coast',
    name: 'Coral Coast',
    description: 'Stunning coastline with multiple resorts',
    coordinates: { lat: -18.1667, lng: 177.5000 },
    radius: 15,
    isAirport: false,
    isResort: true,
    isCity: false,
    amenities: ['beach-access', 'resort-cluster', 'cultural-sites']
  },
  {
    id: 'natadola-beach',
    name: 'Natadola Beach',
    description: 'World-class beach and resort area',
    coordinates: { lat: -18.1167, lng: 177.4833 },
    radius: 2,
    isAirport: false,
    isResort: true,
    isCity: false,
    amenities: ['beach-access', 'horse-riding', 'resort-cluster']
  },

  // City Zones
  {
    id: 'nadi-town',
    name: 'Nadi Town',
    description: 'Commercial center and shopping district',
    coordinates: { lat: -17.8000, lng: 177.4167 },
    radius: 5,
    isAirport: false,
    isResort: false,
    isCity: true,
    amenities: ['shopping', 'markets', 'restaurants', 'banks']
  },
  {
    id: 'lautoka',
    name: 'Lautoka',
    description: 'Sugar City and industrial center',
    coordinates: { lat: -17.6167, lng: 177.4500 },
    radius: 8,
    isAirport: false,
    isResort: false,
    isCity: true,
    amenities: ['shopping', 'markets', 'industrial', 'port']
  },
  {
    id: 'suva',
    name: 'Suva',
    description: 'Capital city and business center',
    coordinates: { lat: -18.1416, lng: 178.4419 },
    radius: 10,
    isAirport: false,
    isResort: false,
    isCity: true,
    amenities: ['government', 'business', 'shopping', 'cultural-sites']
  },

  // Specialized Zones
  {
    id: 'pacific-harbour',
    name: 'Pacific Harbour',
    description: 'Adventure capital and resort area',
    coordinates: { lat: -18.2500, lng: 178.0500 },
    radius: 5,
    isAirport: false,
    isResort: true,
    isCity: false,
    amenities: ['adventure-activities', 'diving', 'resort-cluster']
  },
  {
    id: 'rakiraki',
    name: 'Rakiraki',
    description: 'Northern Viti Levu resort area',
    coordinates: { lat: -17.3500, lng: 178.2000 },
    radius: 8,
    isAirport: false,
    isResort: true,
    isCity: false,
    amenities: ['resort-cluster', 'cultural-sites', 'fishing']
  },
  {
    id: 'momi-bay',
    name: 'Momi Bay',
    description: 'Luxury resort area with Marriott and other properties',
    coordinates: { lat: -17.8000, lng: 177.3500 },
    radius: 3,
    isAirport: false,
    isResort: true,
    isCity: false,
    amenities: ['luxury-resorts', 'beach-access', 'golf-course']
  },

  // Vanua Levu Island Zones
  {
    id: 'savusavu-town',
    name: 'Savusavu Town',
    description: 'Charming coastal town and commercial center of Vanua Levu',
    coordinates: { lat: -16.8000, lng: 179.3500 },
    radius: 5,
    isAirport: false,
    isResort: false,
    isCity: true,
    amenities: ['shopping', 'markets', 'restaurants', 'banks', 'marina']
  },
  {
    id: 'savusavu-resorts',
    name: 'Savusavu Resorts',
    description: 'Luxury resorts and accommodations around Savusavu Bay',
    coordinates: { lat: -16.7833, lng: 179.3333 },
    radius: 8,
    isAirport: false,
    isResort: true,
    isCity: false,
    amenities: ['luxury-resorts', 'diving', 'fishing', 'spa-services']
  },
  {
    id: 'labasa-town',
    name: 'Labasa Town',
    description: 'Sugar industry center and largest town in Vanua Levu',
    coordinates: { lat: -16.4333, lng: 179.3667 },
    radius: 6,
    isAirport: false,
    isResort: false,
    isCity: true,
    amenities: ['shopping', 'markets', 'industrial', 'sugar-mills']
  },
  {
    id: 'labasa-resorts',
    name: 'Labasa Resorts',
    description: 'Resort accommodations in the Labasa region',
    coordinates: { lat: -16.4000, lng: 179.3500 },
    radius: 10,
    isAirport: false,
    isResort: true,
    isCity: false,
    amenities: ['resort-cluster', 'cultural-sites', 'fishing']
  },

  // Taveuni Island Zones
  {
    id: 'taveuni-resorts',
    name: 'Taveuni Resorts',
    description: 'Garden Island luxury resorts and eco-lodges',
    coordinates: { lat: -16.8000, lng: -179.9000 },
    radius: 12,
    isAirport: false,
    isResort: true,
    isCity: false,
    amenities: ['luxury-resorts', 'eco-lodges', 'diving', 'hiking', 'waterfalls']
  },
  {
    id: 'taveuni-town',
    name: 'Taveuni Town',
    description: 'Main town center on Garden Island',
    coordinates: { lat: -16.8167, lng: -179.9167 },
    radius: 3,
    isAirport: false,
    isResort: false,
    isCity: true,
    amenities: ['shopping', 'markets', 'restaurants', 'banks']
  }
];

// Transfer Routes based on recce report corridors
export const transferRoutes: TransferRoute[] = [
  // Primary Viti Levu Routes
  {
    id: 'nadi-airport-denarau',
    name: 'Nadi Airport to Denarau',
    fromZone: 'nadi-airport',
    toZone: 'denarau-marina',
    distance: 12,
    estimatedDuration: 20,
    isActive: true,
    isShared: true,
    isPrivate: true,
    isPremium: true,
    isAccessible: true,
    operatingHours: {
      start: '05:00',
      end: '23:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }
  },
  {
    id: 'nadi-airport-coral-coast',
    name: 'Nadi Airport to Coral Coast',
    fromZone: 'nadi-airport',
    toZone: 'coral-coast',
    distance: 45,
    estimatedDuration: 60,
    isActive: true,
    isShared: true,
    isPrivate: true,
    isPremium: true,
    isAccessible: true,
    operatingHours: {
      start: '06:00',
      end: '22:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }
  },
  {
    id: 'nadi-airport-pacific-harbour',
    name: 'Nadi Airport to Pacific Harbour',
    fromZone: 'nadi-airport',
    toZone: 'pacific-harbour',
    distance: 80,
    estimatedDuration: 90,
    isActive: true,
    isShared: false,
    isPrivate: true,
    isPremium: true,
    isAccessible: true,
    operatingHours: {
      start: '06:00',
      end: '20:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }
  },
  {
    id: 'nadi-airport-suva',
    name: 'Nadi Airport to Suva',
    fromZone: 'nadi-airport',
    toZone: 'suva',
    distance: 120,
    estimatedDuration: 120,
    isActive: true,
    isShared: false,
    isPrivate: true,
    isPremium: true,
    isAccessible: true,
    operatingHours: {
      start: '06:00',
      end: '18:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }
  },
  {
    id: 'nadi-airport-lautoka',
    name: 'Nadi Airport to Lautoka',
    fromZone: 'nadi-airport',
    toZone: 'lautoka',
    distance: 25,
    estimatedDuration: 35,
    isActive: true,
    isShared: true,
    isPrivate: true,
    isPremium: true,
    isAccessible: true,
    operatingHours: {
      start: '05:00',
      end: '23:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }
  },
  {
    id: 'nadi-airport-rakiraki',
    name: 'Nadi Airport to Rakiraki',
    fromZone: 'nadi-airport',
    toZone: 'rakiraki',
    distance: 65,
    estimatedDuration: 75,
    isActive: true,
    isShared: false,
    isPrivate: true,
    isPremium: true,
    isAccessible: true,
    operatingHours: {
      start: '06:00',
      end: '20:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }
  },
  {
    id: 'nadi-airport-momi-bay',
    name: 'Nadi Airport to Momi Bay',
    fromZone: 'nadi-airport',
    toZone: 'momi-bay',
    distance: 35,
    estimatedDuration: 45,
    isActive: true,
    isShared: false,
    isPrivate: true,
    isPremium: true,
    isAccessible: true,
    operatingHours: {
      start: '05:00',
      end: '23:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }
  },

  // Secondary Corridors
  {
    id: 'denarau-coral-coast',
    name: 'Denarau to Coral Coast',
    fromZone: 'denarau-marina',
    toZone: 'coral-coast',
    distance: 55,
    estimatedDuration: 70,
    isActive: true,
    isShared: false,
    isPrivate: true,
    isPremium: true,
    isAccessible: true,
    operatingHours: {
      start: '07:00',
      end: '19:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }
  },
  {
    id: 'coral-coast-suva',
    name: 'Coral Coast to Suva',
    fromZone: 'coral-coast',
    toZone: 'suva',
    distance: 75,
    estimatedDuration: 90,
    isActive: true,
    isShared: false,
    isPrivate: true,
    isPremium: true,
    isAccessible: true,
    operatingHours: {
      start: '07:00',
      end: '18:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }
  },
  {
    id: 'lautoka-nadi-town',
    name: 'Lautoka to Nadi Town',
    fromZone: 'lautoka',
    toZone: 'nadi-town',
    distance: 20,
    estimatedDuration: 25,
    isActive: true,
    isShared: true,
    isPrivate: true,
    isPremium: false,
    isAccessible: true,
    operatingHours: {
      start: '06:00',
      end: '22:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }
  },

  // Island Extensions (Partner Operated)
  {
    id: 'suva-airport-suva',
    name: 'Nausori Airport to Suva',
    fromZone: 'suva-airport',
    toZone: 'suva',
    distance: 15,
    estimatedDuration: 20,
    isActive: true,
    isShared: true,
    isPrivate: true,
    isPremium: true,
    isAccessible: true,
    operatingHours: {
      start: '06:00',
      end: '22:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }
  },
  {
    id: 'savusavu-airport-savusavu',
    name: 'Savusavu Airport to Town',
    fromZone: 'savusavu-airport',
    toZone: 'savusavu-town',
    distance: 8,
    estimatedDuration: 15,
    isActive: true,
    isShared: false,
    isPrivate: true,
    isPremium: false,
    isAccessible: true,
    operatingHours: {
      start: '07:00',
      end: '19:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }
  },
  {
    id: 'labasa-airport-labasa',
    name: 'Labasa Airport to Town',
    fromZone: 'labasa-airport',
    toZone: 'labasa-town',
    distance: 10,
    estimatedDuration: 15,
    isActive: true,
    isShared: false,
    isPrivate: true,
    isPremium: false,
    isAccessible: true,
    operatingHours: {
      start: '07:00',
      end: '19:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }
  },
  {
    id: 'taveuni-airport-resorts',
    name: 'Matei Airport to Resorts',
    fromZone: 'taveuni-airport',
    toZone: 'taveuni-resorts',
    distance: 12,
    estimatedDuration: 20,
    isActive: true,
    isShared: false,
    isPrivate: true,
    isPremium: true,
    isAccessible: true,
    operatingHours: {
      start: '07:00',
      end: '19:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }
  },
  {
    id: 'taveuni-airport-town',
    name: 'Matei Airport to Taveuni Town',
    fromZone: 'taveuni-airport',
    toZone: 'taveuni-town',
    distance: 8,
    estimatedDuration: 15,
    isActive: true,
    isShared: false,
    isPrivate: true,
    isPremium: false,
    isAccessible: true,
    operatingHours: {
      start: '07:00',
      end: '19:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }
  },
  {
    id: 'savusavu-airport-resorts',
    name: 'Savusavu Airport to Resorts',
    fromZone: 'savusavu-airport',
    toZone: 'savusavu-resorts',
    distance: 15,
    estimatedDuration: 25,
    isActive: true,
    isShared: false,
    isPrivate: true,
    isPremium: true,
    isAccessible: true,
    operatingHours: {
      start: '07:00',
      end: '19:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }
  },
  {
    id: 'labasa-airport-resorts',
    name: 'Labasa Airport to Resorts',
    fromZone: 'labasa-airport',
    toZone: 'labasa-resorts',
    distance: 20,
    estimatedDuration: 30,
    isActive: true,
    isShared: false,
    isPrivate: true,
    isPremium: false,
    isAccessible: true,
    operatingHours: {
      start: '07:00',
      end: '19:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }
  },

  // Island Connector Routes
  {
    id: 'coral-coast-port-denarau',
    name: 'Coral Coast to Port Denarau (Island Connector)',
    fromZone: 'coral-coast',
    toZone: 'denarau-marina',
    distance: 55,
    estimatedDuration: 70,
    isActive: true,
    isShared: true,
    isPrivate: false,
    isPremium: false,
    isAccessible: true,
    operatingHours: {
      start: '08:00',
      end: '16:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }
  },
  {
    id: 'pacific-harbour-port-denarau',
    name: 'Pacific Harbour to Port Denarau (Island Connector)',
    fromZone: 'pacific-harbour',
    toZone: 'denarau-marina',
    distance: 80,
    estimatedDuration: 90,
    isActive: true,
    isShared: true,
    isPrivate: false,
    isPremium: false,
    isAccessible: true,
    operatingHours: {
      start: '08:00',
      end: '15:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }
  },
  {
    id: 'suva-port-denarau',
    name: 'Suva to Port Denarau (Island Connector)',
    fromZone: 'suva',
    toZone: 'denarau-marina',
    distance: 120,
    estimatedDuration: 120,
    isActive: true,
    isShared: true,
    isPrivate: false,
    isPremium: false,
    isAccessible: true,
    operatingHours: {
      start: '07:00',
      end: '14:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }
  }
];

// Transfer Services based on recce report service standards
export const transferServices: TransferService[] = [
  {
    id: 'private-sedan',
    name: 'Private Sedan Transfer',
    description: 'Comfortable private transfer in air-conditioned sedan',
    type: 'private',
    vehicleType: 'sedan',
    amenities: ['air-conditioning', 'bottled-water', 'meet-greet'],
    features: ['Private vehicle', 'Professional driver', 'Flight tracking', '24/7 support'],
    isWifiIncluded: false,
    isMeetAndGreet: true,
    isLeiGreeting: false,
    isBottledWater: true,
    isChildSeatAvailable: true,
    isAccessible: false,
    languages: ['English', 'Fijian', 'Hindi'],
    cancellationPolicy: 'Free cancellation up to 24 hours before transfer',
    bookingAdvanceRequired: 2
  },
  {
    id: 'private-suv',
    name: 'Private SUV Transfer',
    description: 'Spacious private transfer in air-conditioned SUV',
    type: 'private',
    vehicleType: 'suv',
    amenities: ['air-conditioning', 'bottled-water', 'meet-greet', 'extra-luggage-space'],
    features: ['Private vehicle', 'Professional driver', 'Flight tracking', '24/7 support', 'Extra luggage space'],
    isWifiIncluded: false,
    isMeetAndGreet: true,
    isLeiGreeting: false,
    isBottledWater: true,
    isChildSeatAvailable: true,
    isAccessible: false,
    languages: ['English', 'Fijian', 'Hindi'],
    cancellationPolicy: 'Free cancellation up to 24 hours before transfer',
    bookingAdvanceRequired: 2
  },
  {
    id: 'private-van',
    name: 'Private Van Transfer',
    description: 'Group transfer in air-conditioned van (up to 8 passengers)',
    type: 'private',
    vehicleType: 'van',
    amenities: ['air-conditioning', 'bottled-water', 'meet-greet', 'group-friendly'],
    features: ['Private vehicle', 'Professional driver', 'Flight tracking', '24/7 support', 'Group discounts'],
    isWifiIncluded: false,
    isMeetAndGreet: true,
    isLeiGreeting: false,
    isBottledWater: true,
    isChildSeatAvailable: true,
    isAccessible: true,
    languages: ['English', 'Fijian', 'Hindi'],
    cancellationPolicy: 'Free cancellation up to 24 hours before transfer',
    bookingAdvanceRequired: 2
  },
  {
    id: 'premium-luxury',
    name: 'Premium Luxury Transfer',
    description: 'Premium transfer with Land Cruiser/Prado, Wi-Fi, chilled towels, and enhanced amenities',
    type: 'premium',
    vehicleType: 'luxury',
    amenities: ['air-conditioning', 'bottled-water', 'meet-greet', 'wifi', 'lei-greeting', 'premium-service', 'chilled-towels', 'priority-exit'],
    features: ['Premium Land Cruiser/Prado', 'Professional driver', 'Wi-Fi included', 'Chilled towels', 'Lei greeting', 'Priority exit', 'Flight tracking', '24/7 support', 'Cultural commentary', 'Work & WhatsApp on the road'],
    isWifiIncluded: true,
    isMeetAndGreet: true,
    isLeiGreeting: true,
    isBottledWater: true,
    isChildSeatAvailable: true,
    isAccessible: false,
    languages: ['English', 'Fijian', 'Hindi', 'French', 'German', 'Japanese', 'Mandarin', 'Korean'],
    cancellationPolicy: 'Free cancellation up to 24 hours before transfer',
    bookingAdvanceRequired: 6
  },
  {
    id: 'shared-shuttle',
    name: 'Shared Shuttle Service',
    description: 'Cost-effective shared transfer with other passengers',
    type: 'shared',
    vehicleType: 'coach',
    amenities: ['air-conditioning', 'bottled-water', 'scheduled-departures'],
    features: ['Shared vehicle', 'Scheduled departures', 'Cost-effective', 'Professional driver', '24/7 support'],
    isWifiIncluded: false,
    isMeetAndGreet: false,
    isLeiGreeting: false,
    isBottledWater: true,
    isChildSeatAvailable: true,
    isAccessible: true,
    languages: ['English', 'Fijian'],
    cancellationPolicy: 'Free cancellation up to 12 hours before transfer',
    bookingAdvanceRequired: 1
  },
  {
    id: 'accessible-transfer',
    name: 'Accessible Transfer',
    description: 'Wheelchair accessible transfer with specialized equipment',
    type: 'private',
    vehicleType: 'van',
    amenities: ['air-conditioning', 'bottled-water', 'meet-greet', 'wheelchair-accessible', 'assistance'],
    features: ['Wheelchair accessible', 'Professional driver', 'Assistance available', 'Flight tracking', '24/7 support'],
    isWifiIncluded: false,
    isMeetAndGreet: true,
    isLeiGreeting: false,
    isBottledWater: true,
    isChildSeatAvailable: false,
    isAccessible: true,
    languages: ['English', 'Fijian', 'Hindi'],
    cancellationPolicy: 'Free cancellation up to 24 hours before transfer',
    bookingAdvanceRequired: 4
  },
  {
    id: 'island-connector-coach',
    name: 'Island Connector Coach',
    description: 'Coach transfer to Port Denarau for island ferry connections',
    type: 'shared',
    vehicleType: 'coach',
    amenities: ['air-conditioning', 'bottled-water', 'ferry-connection', 'luggage-assistance'],
    features: ['Timed to ferry departures', 'Luggage assistance', 'Professional driver', 'South Sea Cruises connection', 'Through-ticketing available'],
    isWifiIncluded: false,
    isMeetAndGreet: false,
    isLeiGreeting: false,
    isBottledWater: true,
    isChildSeatAvailable: true,
    isAccessible: true,
    languages: ['English', 'Fijian'],
    cancellationPolicy: 'Free cancellation up to 12 hours before transfer',
    bookingAdvanceRequired: 2
  }
];

// Transfer Pricing based on recce report pricing intelligence
export const transferPricing: TransferPricing[] = [
  // Nadi Airport to Denarau - Updated to match Rosie Holidays benchmark
  {
    routeId: 'nadi-airport-denarau',
    serviceType: 'private',
    basePrice: 130,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 20,
      publicHolidaySurcharge: 25,
      childSeatSurcharge: 15,
      luggageSurcharge: 10,
      groupDiscount: {
        minPassengers: 4,
        discountPercent: 10
      }
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 3,
      maxLuggage: 4
    }
  },
  {
    routeId: 'nadi-airport-denarau',
    serviceType: 'shared',
    basePrice: 29,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 20,
      publicHolidaySurcharge: 25,
      childSeatSurcharge: 15,
      luggageSurcharge: 10
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 1,
      maxLuggage: 2
    }
  },
  {
    routeId: 'nadi-airport-denarau',
    serviceType: 'premium',
    basePrice: 220,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 20,
      publicHolidaySurcharge: 25,
      childSeatSurcharge: 15,
      luggageSurcharge: 10
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 4,
      maxLuggage: 6
    }
  },

  // Nadi Airport to Coral Coast - Updated to match Rosie Holidays benchmark
  {
    routeId: 'nadi-airport-coral-coast',
    serviceType: 'private',
    basePrice: 299,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 20,
      publicHolidaySurcharge: 25,
      childSeatSurcharge: 15,
      luggageSurcharge: 10,
      groupDiscount: {
        minPassengers: 4,
        discountPercent: 15
      }
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 6,
      maxLuggage: 4
    }
  },
  {
    routeId: 'nadi-airport-coral-coast',
    serviceType: 'shared',
    basePrice: 79,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 20,
      publicHolidaySurcharge: 25,
      childSeatSurcharge: 15,
      luggageSurcharge: 10
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 1,
      maxLuggage: 2
    }
  },
  {
    routeId: 'nadi-airport-coral-coast',
    serviceType: 'premium',
    basePrice: 350,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 20,
      publicHolidaySurcharge: 25,
      childSeatSurcharge: 15,
      luggageSurcharge: 10
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 4,
      maxLuggage: 6
    }
  },

  // Nadi Airport to Momi Bay (Marriott etc.) - New route from competitor recon
  {
    routeId: 'nadi-airport-momi-bay',
    serviceType: 'private',
    basePrice: 189,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 20,
      publicHolidaySurcharge: 25,
      childSeatSurcharge: 15,
      luggageSurcharge: 10,
      groupDiscount: {
        minPassengers: 4,
        discountPercent: 10
      }
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 6,
      maxLuggage: 4
    }
  },

  // Nadi Airport to Pacific Harbour - Updated pricing
  {
    routeId: 'nadi-airport-pacific-harbour',
    serviceType: 'private',
    basePrice: 369,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 20,
      publicHolidaySurcharge: 25,
      childSeatSurcharge: 15,
      luggageSurcharge: 10,
      groupDiscount: {
        minPassengers: 4,
        discountPercent: 20
      }
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 6,
      maxLuggage: 4
    }
  },
  {
    routeId: 'nadi-airport-pacific-harbour',
    serviceType: 'shared',
    basePrice: 109,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 20,
      publicHolidaySurcharge: 25,
      childSeatSurcharge: 15,
      luggageSurcharge: 10
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 1,
      maxLuggage: 2
    }
  },
  {
    routeId: 'nadi-airport-pacific-harbour',
    serviceType: 'premium',
    basePrice: 450,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 20,
      publicHolidaySurcharge: 25,
      childSeatSurcharge: 15,
      luggageSurcharge: 10
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 4,
      maxLuggage: 6
    }
  },

  // Nadi Airport to Suva - Updated pricing
  {
    routeId: 'nadi-airport-suva',
    serviceType: 'private',
    basePrice: 449,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 20,
      publicHolidaySurcharge: 25,
      childSeatSurcharge: 15,
      luggageSurcharge: 10,
      groupDiscount: {
        minPassengers: 4,
        discountPercent: 20
      }
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 6,
      maxLuggage: 4
    }
  },
  {
    routeId: 'nadi-airport-suva',
    serviceType: 'shared',
    basePrice: 129,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 20,
      publicHolidaySurcharge: 25,
      childSeatSurcharge: 15,
      luggageSurcharge: 10
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 1,
      maxLuggage: 2
    }
  },
  {
    routeId: 'nadi-airport-suva',
    serviceType: 'premium',
    basePrice: 550,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 20,
      publicHolidaySurcharge: 25,
      childSeatSurcharge: 15,
      luggageSurcharge: 10
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 4,
      maxLuggage: 6
    }
  },

  // Nadi Airport to Lautoka - Updated pricing
  {
    routeId: 'nadi-airport-lautoka',
    serviceType: 'private',
    basePrice: 120,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 20,
      publicHolidaySurcharge: 25,
      childSeatSurcharge: 15,
      luggageSurcharge: 10,
      groupDiscount: {
        minPassengers: 4,
        discountPercent: 10
      }
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 3,
      maxLuggage: 4
    }
  },
  {
    routeId: 'nadi-airport-lautoka',
    serviceType: 'shared',
    basePrice: 35,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 20,
      publicHolidaySurcharge: 25,
      childSeatSurcharge: 15,
      luggageSurcharge: 10
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 1,
      maxLuggage: 2
    }
  },
  {
    routeId: 'nadi-airport-lautoka',
    serviceType: 'premium',
    basePrice: 150,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 20,
      publicHolidaySurcharge: 25,
      childSeatSurcharge: 15,
      luggageSurcharge: 10
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 4,
      maxLuggage: 6
    }
  },

  // Nadi Airport to Rakiraki - Updated pricing
  {
    routeId: 'nadi-airport-rakiraki',
    serviceType: 'private',
    basePrice: 440,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 20,
      publicHolidaySurcharge: 25,
      childSeatSurcharge: 15,
      luggageSurcharge: 10,
      groupDiscount: {
        minPassengers: 4,
        discountPercent: 15
      }
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 6,
      maxLuggage: 4
    }
  },
  {
    routeId: 'nadi-airport-rakiraki',
    serviceType: 'premium',
    basePrice: 550,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 20,
      publicHolidaySurcharge: 25,
      childSeatSurcharge: 15,
      luggageSurcharge: 10
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 4,
      maxLuggage: 6
    }
  },

  // Secondary Routes - Denarau to Coral Coast
  {
    routeId: 'denarau-coral-coast',
    serviceType: 'private',
    basePrice: 260,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 20,
      publicHolidaySurcharge: 25,
      childSeatSurcharge: 15,
      luggageSurcharge: 10,
      groupDiscount: {
        minPassengers: 4,
        discountPercent: 15
      }
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 6,
      maxLuggage: 4
    }
  },
  {
    routeId: 'coral-coast-suva',
    serviceType: 'private',
    basePrice: 110,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 25,
      publicHolidaySurcharge: 25,
      childSeatSurcharge: 15,
      luggageSurcharge: 10,
      groupDiscount: {
        minPassengers: 4,
        discountPercent: 15
      }
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 4,
      maxLuggage: 4
    }
  },
  {
    routeId: 'lautoka-nadi-town',
    serviceType: 'private',
    basePrice: 35,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 15,
      publicHolidaySurcharge: 15,
      childSeatSurcharge: 15,
      luggageSurcharge: 10,
      groupDiscount: {
        minPassengers: 4,
        discountPercent: 10
      }
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 4,
      maxLuggage: 4
    }
  },
  {
    routeId: 'lautoka-nadi-town',
    serviceType: 'shared',
    basePrice: 20,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 15,
      publicHolidaySurcharge: 15,
      childSeatSurcharge: 15,
      luggageSurcharge: 10
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 1,
      maxLuggage: 2
    }
  },

  // Island Routes
  {
    routeId: 'suva-airport-suva',
    serviceType: 'private',
    basePrice: 25,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 15,
      publicHolidaySurcharge: 15,
      childSeatSurcharge: 15,
      luggageSurcharge: 10
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 4,
      maxLuggage: 4
    }
  },
  {
    routeId: 'suva-airport-suva',
    serviceType: 'shared',
    basePrice: 15,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 15,
      publicHolidaySurcharge: 15,
      childSeatSurcharge: 15,
      luggageSurcharge: 10
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 1,
      maxLuggage: 2
    }
  },
  {
    routeId: 'savusavu-airport-savusavu',
    serviceType: 'private',
    basePrice: 30,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 15,
      publicHolidaySurcharge: 15,
      childSeatSurcharge: 15,
      luggageSurcharge: 10
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 4,
      maxLuggage: 4
    }
  },
  {
    routeId: 'labasa-airport-labasa',
    serviceType: 'private',
    basePrice: 35,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 15,
      publicHolidaySurcharge: 15,
      childSeatSurcharge: 15,
      luggageSurcharge: 10
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 4,
      maxLuggage: 4
    }
  },
  {
    routeId: 'taveuni-airport-resorts',
    serviceType: 'private',
    basePrice: 40,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 15,
      publicHolidaySurcharge: 15,
      childSeatSurcharge: 15,
      luggageSurcharge: 10
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 4,
      maxLuggage: 4
    }
  },
  {
    routeId: 'taveuni-airport-resorts',
    serviceType: 'premium',
    basePrice: 60,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 15,
      publicHolidaySurcharge: 15,
      childSeatSurcharge: 15,
      luggageSurcharge: 10
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 4,
      maxLuggage: 6
    }
  },
  {
    routeId: 'taveuni-airport-town',
    serviceType: 'private',
    basePrice: 25,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 15,
      publicHolidaySurcharge: 15,
      childSeatSurcharge: 15,
      luggageSurcharge: 10
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 4,
      maxLuggage: 4
    }
  },
  {
    routeId: 'savusavu-airport-resorts',
    serviceType: 'private',
    basePrice: 45,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 15,
      publicHolidaySurcharge: 15,
      childSeatSurcharge: 15,
      luggageSurcharge: 10
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 4,
      maxLuggage: 4
    }
  },
  {
    routeId: 'savusavu-airport-resorts',
    serviceType: 'premium',
    basePrice: 65,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 15,
      publicHolidaySurcharge: 15,
      childSeatSurcharge: 15,
      luggageSurcharge: 10
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 4,
      maxLuggage: 6
    }
  },
  {
    routeId: 'labasa-airport-resorts',
    serviceType: 'private',
    basePrice: 50,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 15,
      publicHolidaySurcharge: 15,
      childSeatSurcharge: 15,
      luggageSurcharge: 10
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 4,
      maxLuggage: 4
    }
  },

  // Island Connector Pricing
  {
    routeId: 'coral-coast-port-denarau',
    serviceType: 'shared',
    basePrice: 45,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 20,
      publicHolidaySurcharge: 25,
      childSeatSurcharge: 15,
      luggageSurcharge: 10
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 1,
      maxLuggage: 2
    }
  },
  {
    routeId: 'pacific-harbour-port-denarau',
    serviceType: 'shared',
    basePrice: 65,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 20,
      publicHolidaySurcharge: 25,
      childSeatSurcharge: 15,
      luggageSurcharge: 10
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 1,
      maxLuggage: 2
    }
  },
  {
    routeId: 'suva-port-denarau',
    serviceType: 'shared',
    basePrice: 85,
    currency: 'FJD',
    pricingRules: {
      afterHoursSurcharge: 20,
      publicHolidaySurcharge: 25,
      childSeatSurcharge: 15,
      luggageSurcharge: 10
    },
    capacity: {
      minPassengers: 1,
      maxPassengers: 1,
      maxLuggage: 2
    }
  }
];

// Public Holidays based on Fiji calendar
export const publicHolidays: PublicHoliday[] = [
  {
    id: 'new-year',
    name: 'New Year\'s Day',
    date: '2024-01-01',
    isRecurring: true,
    surcharge: 25
  },
  {
    id: 'good-friday',
    name: 'Good Friday',
    date: '2024-03-29',
    isRecurring: true,
    surcharge: 25
  },
  {
    id: 'easter-monday',
    name: 'Easter Monday',
    date: '2024-04-01',
    isRecurring: true,
    surcharge: 25
  },
  {
    id: 'constitution-day',
    name: 'Constitution Day',
    date: '2024-09-07',
    isRecurring: true,
    surcharge: 25
  },
  {
    id: 'fiji-day',
    name: 'Fiji Day',
    date: '2024-10-10',
    isRecurring: true,
    surcharge: 25
  },
  {
    id: 'diwali',
    name: 'Diwali',
    date: '2024-11-01',
    isRecurring: true,
    surcharge: 25
  },
  {
    id: 'christmas',
    name: 'Christmas Day',
    date: '2024-12-25',
    isRecurring: true,
    surcharge: 25
  },
  {
    id: 'boxing-day',
    name: 'Boxing Day',
    date: '2024-12-26',
    isRecurring: true,
    surcharge: 25
  }
];

// Island Transfers for outer islands
export const islandTransfers: IslandTransfer[] = [
  {
    islandId: 'mamanuca-islands',
    islandName: 'Mamanuca Islands',
    mainlandConnection: {
      port: 'Denarau Marina',
      ferryOperator: 'South Sea Cruises',
      transferRoute: 'nadi-airport-denarau'
    },
    localTransfers: [],
    isPartnerOperated: true,
    partnerOperator: 'South Sea Cruises'
  },
  {
    islandId: 'yasawa-islands',
    islandName: 'Yasawa Islands',
    mainlandConnection: {
      port: 'Denarau Marina',
      ferryOperator: 'South Sea Cruises',
      transferRoute: 'nadi-airport-denarau'
    },
    localTransfers: [],
    isPartnerOperated: true,
    partnerOperator: 'South Sea Cruises'
  },
  {
    islandId: 'taveuni',
    islandName: 'Taveuni (Garden Island)',
    mainlandConnection: {
      port: 'Matei Airport',
      ferryOperator: 'Fiji Airways',
      transferRoute: 'taveuni-airport-resorts'
    },
    localTransfers: [
      {
        id: 'taveuni-airport-resorts',
        name: 'Matei Airport to Resorts',
        fromZone: 'taveuni-airport',
        toZone: 'taveuni-resorts',
        distance: 12,
        estimatedDuration: 20,
        isActive: true,
        isShared: false,
        isPrivate: true,
        isPremium: true,
        isAccessible: true,
        operatingHours: {
          start: '07:00',
          end: '19:00',
          days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        }
      }
    ],
    isPartnerOperated: false
  }
];

// Resort Transfers for major resort partnerships
export const resortTransfers: ResortTransfer[] = [
  {
    resortId: 'sheraton-denarau',
    resortName: 'Sheraton Denarau Villas',
    zone: 'denarau-resorts',
    isPreferredPartner: true,
    qrCodeUrl: '/qr/sheraton-denarau',
    digitalDeskActive: true,
    specialRates: [
      {
        serviceType: 'premium',
        discountPercent: 10
      }
    ]
  },
  {
    resortId: 'westin-denarau',
    resortName: 'The Westin Denarau Island Resort & Spa',
    zone: 'denarau-resorts',
    isPreferredPartner: true,
    qrCodeUrl: '/qr/westin-denarau',
    digitalDeskActive: true,
    specialRates: [
      {
        serviceType: 'premium',
        discountPercent: 10
      }
    ]
  },
  {
    resortId: 'sofitel-denarau',
    resortName: 'Sofitel Fiji Resort & Spa',
    zone: 'denarau-resorts',
    isPreferredPartner: true,
    qrCodeUrl: '/qr/sofitel-denarau',
    digitalDeskActive: true,
    specialRates: [
      {
        serviceType: 'premium',
        discountPercent: 10
      }
    ]
  },
  {
    resortId: 'intercontinental-coral-coast',
    resortName: 'InterContinental Fiji Golf Resort & Spa',
    zone: 'coral-coast',
    isPreferredPartner: true,
    qrCodeUrl: '/qr/intercontinental-coral-coast',
    digitalDeskActive: true,
    specialRates: [
      {
        serviceType: 'premium',
        discountPercent: 15
      }
    ]
  },
  {
    resortId: 'outrigger-coral-coast',
    resortName: 'Outrigger Fiji Beach Resort',
    zone: 'coral-coast',
    isPreferredPartner: true,
    qrCodeUrl: '/qr/outrigger-coral-coast',
    digitalDeskActive: true,
    specialRates: [
      {
        serviceType: 'premium',
        discountPercent: 15
      }
    ]
  },
  {
    resortId: 'warwick-coral-coast',
    resortName: 'Warwick Fiji Resort & Spa',
    zone: 'coral-coast',
    isPreferredPartner: true,
    qrCodeUrl: '/qr/warwick-coral-coast',
    digitalDeskActive: true,
    specialRates: [
      {
        serviceType: 'premium',
        discountPercent: 15
      }
    ]
  },
  {
    resortId: 'pearl-pacific-harbour',
    resortName: 'The Pearl South Pacific',
    zone: 'pacific-harbour',
    isPreferredPartner: true,
    qrCodeUrl: '/qr/pearl-pacific-harbour',
    digitalDeskActive: true,
    specialRates: [
      {
        serviceType: 'premium',
        discountPercent: 20
      }
    ]
  },

  // Taveuni Island Resorts
  {
    resortId: 'paradise-taveuni',
    resortName: 'Paradise Taveuni',
    zone: 'taveuni-resorts',
    isPreferredPartner: true,
    qrCodeUrl: '/qr/paradise-taveuni',
    digitalDeskActive: true,
    specialRates: [
      {
        serviceType: 'premium',
        discountPercent: 15
      }
    ]
  },
  {
    resortId: 'taveuni-palace',
    resortName: 'Taveuni Palms Resort',
    zone: 'taveuni-resorts',
    isPreferredPartner: true,
    qrCodeUrl: '/qr/taveuni-palace',
    digitalDeskActive: true,
    specialRates: [
      {
        serviceType: 'premium',
        discountPercent: 15
      }
    ]
  },
  {
    resortId: 'maravu-taveuni',
    resortName: 'Maravu Taveuni Lodge',
    zone: 'taveuni-resorts',
    isPreferredPartner: true,
    qrCodeUrl: '/qr/maravu-taveuni',
    digitalDeskActive: true,
    specialRates: [
      {
        serviceType: 'private',
        discountPercent: 10
      }
    ]
  },

  // Savusavu Resorts
  {
    resortId: 'namale-resort',
    resortName: 'Namale Resort & Spa',
    zone: 'savusavu-resorts',
    isPreferredPartner: true,
    qrCodeUrl: '/qr/namale-resort',
    digitalDeskActive: true,
    specialRates: [
      {
        serviceType: 'premium',
        discountPercent: 20
      }
    ]
  },
  {
    resortId: 'koro-sun-resort',
    resortName: 'Koro Sun Resort & Rainforest Spa',
    zone: 'savusavu-resorts',
    isPreferredPartner: true,
    qrCodeUrl: '/qr/koro-sun-resort',
    digitalDeskActive: true,
    specialRates: [
      {
        serviceType: 'premium',
        discountPercent: 15
      }
    ]
  },
  {
    resortId: 'dolphin-bay-divers',
    resortName: 'Dolphin Bay Divers Retreat',
    zone: 'savusavu-resorts',
    isPreferredPartner: true,
    qrCodeUrl: '/qr/dolphin-bay-divers',
    digitalDeskActive: true,
    specialRates: [
      {
        serviceType: 'private',
        discountPercent: 10
      }
    ]
  },

  // Labasa Resorts
  {
    resortId: 'labasa-town-hotel',
    resortName: 'Labasa Town Hotel',
    zone: 'labasa-town',
    isPreferredPartner: true,
    qrCodeUrl: '/qr/labasa-town-hotel',
    digitalDeskActive: true,
    specialRates: [
      {
        serviceType: 'private',
        discountPercent: 10
      }
    ]
  },
  {
    resortId: 'northern-inn',
    resortName: 'Northern Inn',
    zone: 'labasa-town',
    isPreferredPartner: true,
    qrCodeUrl: '/qr/northern-inn',
    digitalDeskActive: true,
    specialRates: [
      {
        serviceType: 'private',
        discountPercent: 10
      }
    ]
  }
];
