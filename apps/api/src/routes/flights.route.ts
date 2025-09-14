import { Router } from 'express';
import { searchFlightsSvc } from '../services/flights.service';

const r = Router();

r.post('/v1/flights/search', async (req, res, next) => {
  try {
    const { origin, destination, departDate, adults = 1 } = req.body;

    if (!origin || !destination || !departDate) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: origin, destination, departDate',
        timestamp: new Date().toISOString()
      });
    }

    const flights = await searchFlightsSvc(req.body);
    
    res.json({
      success: true,
      data: flights,
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] || 'req_' + Date.now()
    });
  } catch (error) {
    next(error);
  }
});

export default r;
