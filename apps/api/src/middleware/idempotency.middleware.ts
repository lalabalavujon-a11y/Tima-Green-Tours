import { Request, Response, NextFunction } from 'express';
import { config } from '../config';
import { getCacheClient } from '../utils/cache';
import { logger } from '../logger';

const TTL = Number(process.env.IDEMPOTENCY_TTL_SECONDS ?? 86400);

export async function requireIdempotency(req: Request, res: Response, next: NextFunction) {
  const key = req.header('Idempotency-Key');
  
  if (!key) {
    return res.status(400).json({ 
      success: false, 
      message: 'Idempotency-Key header required' 
    });
  }

  const cacheKey = `idem:${key}`;
  const cache = getCacheClient();
  
  try {
    const exists = await cache.exists(cacheKey);
    if (exists) {
      logger.warn({ idempotencyKey: key }, 'Duplicate request detected');
      return res.status(409).json({ 
        success: false, 
        message: 'Duplicate request' 
      });
    }
    
    // Set the idempotency key in cache
    await cache.set(cacheKey, '1', TTL);
    
    // Attach the key to the request for use in controllers
    (req as any).__idem_key = key;
    
    logger.debug({ idempotencyKey: key }, 'Idempotency key registered');
    next();
  } catch (error) {
    logger.error({ error, idempotencyKey: key }, 'Idempotency check failed');
    // If cache fails, we still allow the request to proceed
    // The Stripe API will handle idempotency on its end
    (req as any).__idem_key = key;
    next();
  }
}
