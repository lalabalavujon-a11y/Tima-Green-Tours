import { Router } from 'express';
import { getProvider } from '../providers/provider.factory';
import { config } from '../config';

const r = Router();

r.get('/v1/meta/providers', (req, res) => {
  const provider = getProvider();
  
  res.json({
    success: true,
    data: {
      active: provider.name,
      features: {
        search: !!provider.searchFlights,
        booking: !!provider.createBooking,
        orders: !!(provider as any).createOrder,
        webhooks: false,
        cache: config.TGT_ENABLE_CACHE
      }
    },
    timestamp: new Date().toISOString(),
    requestId: req.headers['x-request-id'] || 'req_' + Date.now()
  });
});

export default r;
