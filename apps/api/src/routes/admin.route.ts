import { Router } from 'express';
import { adminGuard } from '../security/admin.guard';
import { cacheDel } from '../utils/cache';

const r = Router();

r.post('/v1/admin/cache/purge', adminGuard, async (req: any, res) => {
  const { key } = req.body || {};
  if (!key) return res.status(400).json({ success: false, message: 'key required' });
  await cacheDel(key);
  res.json({ success: true });
});

export default r;
