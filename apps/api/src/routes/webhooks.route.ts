import { Router } from 'express';

const r = Router();

// Placeholder for webhook routes
r.get('/v1/webhooks/status', (req, res) => {
  res.json({
    success: true,
    data: {
      webhooks: {
        duffel: false,
        stripe: false
      }
    },
    timestamp: new Date().toISOString()
  });
});

export default r;
