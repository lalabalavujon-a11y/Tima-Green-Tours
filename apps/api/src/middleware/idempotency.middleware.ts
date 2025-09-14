import { Request, Response, NextFunction } from 'express';
import { config } from '../config';
import { cacheGet, cacheSet } from '../utils/cache';
import crypto from 'crypto';

export function requireIdempotency(req: Request, res: Response, next: NextFunction) {
  const idempotencyKey = req.headers['idempotency-key'] as string;
  
  if (!idempotencyKey) {
    return res.status(400).json({
      success: false,
      message: 'Idempotency-Key header is required'
    });
  }
  
  // Check if we've already processed this request
  const cacheKey = `idempotency:${idempotencyKey}`;
  
  cacheGet(cacheKey).then((cached) => {
    if (cached) {
      // Return cached response
      return res.json(cached);
    }
    
    // Store original res.json to intercept response
    const originalJson = res.json.bind(res);
    res.json = function(body: any) {
      // Cache the response for idempotency
      cacheSet(cacheKey, body, parseInt(config.IDEMPOTENCY_TTL_SECONDS || '86400', 10));
      return originalJson(body);
    };
    
    next();
  }).catch(next);
}