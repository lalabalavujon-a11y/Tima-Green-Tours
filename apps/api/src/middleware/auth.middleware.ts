import { Request, Response, NextFunction } from 'express';
import { config } from '../config';

export function requireAuth(roles: string[] = ['staff', 'admin']) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authorization header required'
      });
    }
    
    const token = authHeader.substring(7);
    
    // Simple token validation - in production, use proper JWT validation
    if (token !== config.STAFF_API_KEY) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }
    
    // For now, assume all valid tokens have staff access
    // In production, decode JWT and check roles
    req.user = { roles: ['staff', 'admin'] };
    next();
  };
}
