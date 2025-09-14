import { Router } from 'express';
import { validate } from '../middleware/validation.middleware';
import { offerSelectSchema, orderCreateSchema } from '../schemas/orders.schema';
import { selectOffer, createOrder } from '../controllers/orders.controller';
import { requireAuth } from '../middleware/auth.middleware';
import { requireIdempotency } from '../middleware/idempotency.middleware';

const r = Router();

// Optional: require staff for selecting/locking offers. Customer order create is public.
r.post('/v1/offers/select', requireAuth(['staff', 'admin']), validate(offerSelectSchema), selectOffer);
r.post('/v1/orders/create', requireIdempotency, validate(orderCreateSchema), createOrder);

export default r;
