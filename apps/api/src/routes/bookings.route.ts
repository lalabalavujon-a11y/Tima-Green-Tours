import { Router } from 'express';
import { getProvider } from '../providers/provider.factory';

const r = Router();

r.post('/v1/bookings/create', async (req, res, next) => {
  try {
    const { offerId, contactEmail } = req.body;

    if (!offerId || !contactEmail) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: offerId, contactEmail',
        timestamp: new Date().toISOString()
      });
    }

    const provider = getProvider();
    const booking = await provider.createBooking!(offerId, contactEmail);
    
    res.json({
      success: true,
      data: booking,
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] || 'req_' + Date.now()
    });
  } catch (error) {
    next(error);
  }
});

export default r;
