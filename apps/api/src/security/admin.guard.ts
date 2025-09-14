import { Request, Response, NextFunction } from 'express';

const STAFF_KEY = process.env.STAFF_API_KEY || '';
export function adminGuard(req: Request, res: Response, next: NextFunction) {
  const header = req.header('x-staff-key');
  if (!STAFF_KEY || header !== STAFF_KEY) return res.status(401).json({ success: false, message: 'Unauthorized' });
  return next();
}
