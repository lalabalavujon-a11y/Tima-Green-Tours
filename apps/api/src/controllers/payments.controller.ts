import { Request, Response, NextFunction } from 'express';
import Stripe from 'stripe';
import { config } from '../config';
import { logger } from '../logger';
import { getProvider } from '../providers/provider.factory';

const stripe = new Stripe(config.STRIPE_SECRET_KEY as string, { 
  apiVersion: '2024-06-20' 
} as any);

export async function createPaymentIntent(req: Request, res: Response, next: NextFunction) {
  try {
    const { amount, currency = 'USD', metadata } = req.body || {};
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Valid amount required' 
      });
    }

    const idemKey = (req as any).__idem_key as string | undefined;
    
    logger.info({
      amount,
      currency,
      idempotencyKey: idemKey,
      metadata
    }, 'Creating payment intent');

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(amount) * 100), // Convert to cents
      currency: String(currency).toLowerCase(),
      metadata: metadata || {},
      automatic_payment_methods: { 
        enabled: true 
      }
    }, idemKey ? { idempotencyKey: idemKey } : undefined);

    logger.info({
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency
    }, 'Payment intent created successfully');

    res.json({ 
      success: true, 
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error: any) {
    logger.error({ 
      error: error.message,
      stack: error.stack,
      body: req.body 
    }, 'Payment intent creation failed');
    
    next(error);
  }
}

export async function getPaymentIntent(req: Request, res: Response, next: NextFunction) {
  try {
    const { paymentIntentId } = req.params;
    
    if (!paymentIntentId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Payment intent ID required' 
      });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    res.json({ 
      success: true, 
      data: {
        id: paymentIntent.id,
        status: paymentIntent.status,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        metadata: paymentIntent.metadata
      }
    });
  } catch (error: any) {
    logger.error({ 
      error: error.message,
      paymentIntentId: req.params.paymentIntentId 
    }, 'Payment intent retrieval failed');
    
    next(error);
  }
}

export async function createDuffelPaySession(req: Request, res: Response, next: NextFunction) {
  try {
    const { amount, currency = 'USD', offerId } = req.body || {};
    
    if (!amount || !offerId) {
      return res.status(400).json({ 
        success: false, 
        message: 'amount and offerId required' 
      });
    }

    const provider: any = getProvider();
    
    if (!provider.createPaymentSession) {
      return res.status(400).json({ 
        success: false, 
        message: 'Duffel Pay not supported' 
      });
    }

    const session = await provider.createPaymentSession({ 
      amount, 
      currency, 
      offerId, 
      returnUrl: config.payments.duffelCallbackUrl 
    });

    logger.info({
      amount,
      currency,
      offerId,
      provider: 'duffel'
    }, 'Duffel Pay session created successfully');

    res.json({ 
      success: true, 
      data: session 
    });
  } catch (error: any) {
    logger.error({ 
      error: error.message,
      stack: error.stack,
      body: req.body 
    }, 'Duffel Pay session creation failed');
    
    next(error);
  }
}
