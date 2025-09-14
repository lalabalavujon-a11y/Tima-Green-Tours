import { z } from 'zod';

export const offerSelectSchema = z.object({
  body: z.object({
    offerId: z.string().min(1, 'Offer ID is required')
  })
});

export const orderCreateSchema = z.object({
  body: z.object({
    offerId: z.string().min(1, 'Offer ID is required'),
    contact: z.object({
      email: z.string().email('Valid email is required'),
      phone: z.string().min(5, 'Phone number must be at least 5 characters')
    }),
    passengers: z.array(z.object({
      title: z.enum(['mr', 'ms', 'mrs', 'mx']).optional(),
      given_name: z.string().min(1, 'Given name is required'),
      family_name: z.string().min(1, 'Family name is required'),
      born_on: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
      type: z.enum(['adult', 'child', 'infant'])
    })).min(1, 'At least one passenger is required')
  })
});
