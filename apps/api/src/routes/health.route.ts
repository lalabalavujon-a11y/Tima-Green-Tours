import { Router } from 'express';
import { getProvider } from '../providers/provider.factory';
import { config } from '../config';

const r = Router();

r.get('/health', (req, res) => {
  const provider = getProvider();
  
  res.json({
    success: true,
    data: {
      api: 'ok',
      provider: provider.name,
      environment: config.NODE_ENV,
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    },
    timestamp: new Date().toISOString(),
    requestId: req.headers['x-request-id'] || 'req_' + Date.now()
  });
});

export default r;
