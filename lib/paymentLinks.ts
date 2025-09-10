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
