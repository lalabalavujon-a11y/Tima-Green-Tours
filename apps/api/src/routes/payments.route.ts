import { Router } from 'express';
import { createPaymentIntent, getPaymentIntent, createDuffelPaySession } from '../controllers/payments.controller';
import { requireIdempotency } from '../middleware/idempotency.middleware';
import { validate } from '../middleware/validation.middleware';
import { z } from 'zod';

const router = Router();

// Validation schemas
const createPaymentIntentSchema = z.object({
  body: z.object({
    amount: z.number().positive('Amount must be positive'),
    currency: z.string().optional().default('USD'),
    metadata: z.record(z.string()).optional()
  })
});

const createDuffelPaySessionSchema = z.object({
  body: z.object({
    amount: z.number().positive('Amount must be positive'),
    currency: z.string().optional().default('USD'),
    offerId: z.string().min(1, 'Offer ID is required')
  })
});

// Routes
router.post('/v1/payments/create-intent', 
  requireIdempotency, 
  validate(createPaymentIntentSchema), 
  createPaymentIntent
);

router.get('/v1/payments/:paymentIntentId', getPaymentIntent);

router.post('/v1/payments/duffel/session',
  requireIdempotency,
  validate(createDuffelPaySessionSchema),
  createDuffelPaySession
);

export default router;
