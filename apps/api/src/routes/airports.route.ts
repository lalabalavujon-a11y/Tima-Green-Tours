import { Router } from 'express';
import { searchAirportsSvc } from '../services/airports.service';

const r = Router();

r.get('/v1/airports/search', async (req, res, next) => {
  try {
    const { query } = req.query;
    
    if (!query || typeof query !== 'string' || query.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Query must be at least 2 characters',
        timestamp: new Date().toISOString()
      });
    }

    const airports = await searchAirportsSvc(query);
    
    res.json({
      success: true,
      data: airports,
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] || 'req_' + Date.now()
    });
  } catch (error) {
    next(error);
  }
});

export default r;
