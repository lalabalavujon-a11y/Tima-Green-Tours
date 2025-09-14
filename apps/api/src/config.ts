export const config = {
  PORT: parseInt(process.env.PORT || '8080', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  
  // Cache
  TGT_ENABLE_CACHE: process.env.TGT_ENABLE_CACHE === 'true',
  REDIS_URL: process.env.REDIS_URL,
  REDIS_NAMESPACE: process.env.REDIS_NAMESPACE || 'tgt',
  REDIS_TTL_SECONDS: parseInt(process.env.REDIS_TTL_SECONDS || '3600', 10),
  
  // Provider
  TGT_ACTIVE_PROVIDER: process.env.TGT_ACTIVE_PROVIDER || 'mock',
  
  // Duffel
  DUFFEL_ACCESS_TOKEN: process.env.DUFFEL_ACCESS_TOKEN,
  DUFFEL_ENVIRONMENT: process.env.DUFFEL_ENVIRONMENT || 'sandbox',
  DUFFEL_WEBHOOK_SECRET: process.env.DUFFEL_WEBHOOK_SECRET,
  
  // Travelpayouts
  TRAVELPAYOUTS_TOKEN: process.env.TRAVELPAYOUTS_TOKEN,
  TRAVELPAYOUTS_MARKER: process.env.TRAVELPAYOUTS_MARKER,
  TRAVELPAYOUTS_HOST: process.env.TRAVELPAYOUTS_HOST,
  
  // Payments
  PAYMENT_PROVIDER: process.env.PAYMENT_PROVIDER || 'stripe',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  APP_BASE_URL: process.env.APP_BASE_URL || 'http://localhost:3000',
  
  // Payment provider configuration
  payments: {
    provider: (process.env.PAYMENT_PROVIDER ?? 'stripe') as 'stripe' | 'duffel',
    duffelPayEnabled: process.env.DUFFEL_PAY_ENABLED === 'true',
    duffelCallbackUrl: process.env.DUFFEL_PAY_CALLBACK_URL ?? ''
  },
  
  // Auth
  STAFF_API_KEY: process.env.STAFF_API_KEY,
};
