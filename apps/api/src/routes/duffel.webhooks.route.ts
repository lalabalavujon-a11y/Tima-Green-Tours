import { Router } from 'express';

const r = Router();

r.post('/v1/webhooks/duffel', (req, res) => {
  // TODO: Verify with DUFFEL_WEBHOOK_SECRET when enabling in production
  // const signature = req.headers['duffel-signature'];
  // if (!verifyDuffelSignature(req.body, signature)) {
  //   return res.status(401).json({ error: 'Invalid signature' });
  // }
  
  // Log the webhook for debugging
  console.log('Duffel webhook received:', req.body);
  
  // TODO: Process webhook data (order updates, payment status, etc.)
  
  res.status(200).json({ ok: true });
});

export default r;
