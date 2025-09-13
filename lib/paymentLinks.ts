// Map tour slugs to Stripe Payment Link URLs
// Paste your Stripe Payment Link URLs below when ready
export type PaymentLinks = Record<string, { adult?: string; child?: string }>;

export const paymentLinks: PaymentLinks = {
  // Assumption: first link per tour = Adult, second = Child
  'sabeto-mudpool-nadi-temple': {
    adult: 'https://buy.stripe.com/test_4gM6oI6FW1Dc8wRgET5kk0c',
    child: 'https://buy.stripe.com/test_eVq00k0hy0z8fZj9cr5kk06',
  },
  'lomawai-salt-natadola-horse-riding': {
    adult: 'https://buy.stripe.com/test_3cIaEY2pG3LkaEZbkz5kk0b',
    child: 'https://buy.stripe.com/test_4gM7sM1lCbdMaEZ74j5kk0a',
  },
  'sigatoka-valley-lawai-pottery': {
    adult: 'https://buy.stripe.com/test_fZudRaaWc2Hg4gB60f5kk09',
    child: 'https://buy.stripe.com/test_28E6oI9S82Hg00lgET5kk08',
  },
  'shark-diving-beqa-lagoon': {
    adult: 'https://buy.stripe.com/test_3cIfZi7K04Po28t2O35kk05',
    child: 'https://buy.stripe.com/test_5kQ4gA9S84Po00l9cr5kk04',
  },
  'malolo-island-getaway': {
    adult: 'https://buy.stripe.com/test_5kQ8wQ1lCdlU28t0FV5kk03',
    child: 'https://buy.stripe.com/test_9B66oI9S80z828t74j5kk02',
  },
  'biausevu-waterfall-tour': {
    adult: 'https://buy.stripe.com/test_aFafZifcsgy64gB0FV5kk01',
    child: 'https://buy.stripe.com/test_aFa5kEe8o2Hg00lewL5kk00',
  },
};

// Transfer Payment Links - Comprehensive coverage of all routes and services
export type TransferPaymentLinks = Record<string, { 
  private?: string; 
  shared?: string; 
  premium?: string; 
}>;

export const transferPaymentLinks: TransferPaymentLinks = {
  // Nadi Airport to Denarau
  'nadi-airport-denarau': {
    private: 'https://buy.stripe.com/test_nadi_denarau_private',
    shared: 'https://buy.stripe.com/test_nadi_denarau_shared',
    premium: 'https://buy.stripe.com/test_nadi_denarau_premium',
  },

  // Nadi Airport to Coral Coast
  'nadi-airport-coral-coast': {
    private: 'https://buy.stripe.com/test_nadi_coral_private',
    shared: 'https://buy.stripe.com/test_nadi_coral_shared',
    premium: 'https://buy.stripe.com/test_nadi_coral_premium',
  },

  // Nadi Airport to Pacific Harbour
  'nadi-airport-pacific-harbour': {
    private: 'https://buy.stripe.com/test_nadi_pacific_private',
    premium: 'https://buy.stripe.com/test_nadi_pacific_premium',
  },

  // Nadi Airport to Suva
  'nadi-airport-suva': {
    private: 'https://buy.stripe.com/test_nadi_suva_private',
    premium: 'https://buy.stripe.com/test_nadi_suva_premium',
  },

  // Nadi Airport to Lautoka
  'nadi-airport-lautoka': {
    private: 'https://buy.stripe.com/test_nadi_lautoka_private',
    shared: 'https://buy.stripe.com/test_nadi_lautoka_shared',
    premium: 'https://buy.stripe.com/test_nadi_lautoka_premium',
  },

  // Nadi Airport to Rakiraki
  'nadi-airport-rakiraki': {
    private: 'https://buy.stripe.com/test_nadi_rakiraki_private',
    premium: 'https://buy.stripe.com/test_nadi_rakiraki_premium',
  },

  // Secondary Routes
  'denarau-coral-coast': {
    private: 'https://buy.stripe.com/test_denarau_coral_private',
  },
  'coral-coast-suva': {
    private: 'https://buy.stripe.com/test_coral_suva_private',
  },
  'lautoka-nadi-town': {
    private: 'https://buy.stripe.com/test_lautoka_nadi_private',
    shared: 'https://buy.stripe.com/test_lautoka_nadi_shared',
  },

  // Island Routes
  'suva-airport-suva': {
    private: 'https://buy.stripe.com/test_suva_airport_private',
    shared: 'https://buy.stripe.com/test_suva_airport_shared',
  },
  'savusavu-airport-savusavu': {
    private: 'https://buy.stripe.com/test_savusavu_private',
  },
  'labasa-airport-labasa': {
    private: 'https://buy.stripe.com/test_labasa_private',
  },
  'taveuni-airport-resorts': {
    private: 'https://buy.stripe.com/test_taveuni_private',
    premium: 'https://buy.stripe.com/test_taveuni_premium',
  },
};

// Surcharge Payment Links
export type SurchargePaymentLinks = Record<string, string>;

export const surchargePaymentLinks: SurchargePaymentLinks = {
  'after-hours-surcharge': 'https://buy.stripe.com/test_after_hours_surcharge',
  'public-holiday-surcharge': 'https://buy.stripe.com/test_public_holiday_surcharge',
  'child-seat-surcharge': 'https://buy.stripe.com/test_child_seat_surcharge',
  'extra-luggage-surcharge': 'https://buy.stripe.com/test_extra_luggage_surcharge',
};

// Helper function to get transfer payment link
export function getTransferPaymentLink(
  routeId: string, 
  serviceType: 'private' | 'shared' | 'premium'
): string | null {
  return transferPaymentLinks[routeId]?.[serviceType] || null;
}

// Helper function to get surcharge payment link
export function getSurchargePaymentLink(surchargeType: string): string | null {
  return surchargePaymentLinks[surchargeType] || null;
}