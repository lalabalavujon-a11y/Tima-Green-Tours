const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 8080;

// Security middleware
app.use(helmet());
app.use(cors());

// Body parsing
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    data: {
      api: 'ok',
      provider: 'mock',
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    },
    timestamp: new Date().toISOString(),
    requestId: req.headers['x-request-id'] || 'req_' + Date.now()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'TGT Flight Search API',
    version: '1.0.0',
    documentation: '/docs',
    endpoints: {
      health: '/health',
      airports: '/v1/airports',
      flights: '/v1/flights',
      bookings: '/v1/bookings'
    },
    timestamp: new Date().toISOString(),
    requestId: req.headers['x-request-id'] || 'req_' + Date.now()
  });
});

// Mock airport search
app.get('/v1/airports/search', (req, res) => {
  const { query } = req.query;
  
  if (!query || query.length < 2) {
    return res.status(400).json({
      success: false,
      error: 'Query must be at least 2 characters',
      timestamp: new Date().toISOString()
    });
  }

  const mockAirports = [
    { iata: 'LON', city: 'London', country: 'United Kingdom', name: 'London Heathrow' },
    { iata: 'NBO', city: 'Nairobi', country: 'Kenya', name: 'Jomo Kenyatta International' },
    { iata: 'LAX', city: 'Los Angeles', country: 'United States', name: 'Los Angeles International' },
    { iata: 'JFK', city: 'New York', country: 'United States', name: 'John F. Kennedy International' }
  ];

  const results = mockAirports.filter(airport => 
    airport.iata.toLowerCase().includes(query.toLowerCase()) ||
    airport.city.toLowerCase().includes(query.toLowerCase())
  );

  res.json({
    success: true,
    data: results,
    timestamp: new Date().toISOString(),
    requestId: req.headers['x-request-id'] || 'req_' + Date.now()
  });
});

// Mock flight search
app.post('/v1/flights/search', (req, res) => {
  const { origin, destination, departDate, adults = 1 } = req.body;

  if (!origin || !destination || !departDate) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: origin, destination, departDate',
      timestamp: new Date().toISOString()
    });
  }

  const mockOffers = [
    {
      id: 'offer_1',
      carrier: 'British Airways',
      segments: [
        {
          from: origin,
          to: destination,
          departAt: `${departDate}T08:00:00Z`,
          arriveAt: `${departDate}T18:30:00Z`,
          carrier: 'British Airways',
          flightNumber: 'BA123'
        }
      ],
      price: { amount: 800, currency: 'USD' },
      deepLink: 'https://mock-booking.com/offer/1',
      provider: 'mock'
    },
    {
      id: 'offer_2',
      carrier: 'Kenya Airways',
      segments: [
        {
          from: origin,
          to: destination,
          departAt: `${departDate}T14:00:00Z`,
          arriveAt: `${departDate}T23:45:00Z`,
          carrier: 'Kenya Airways',
          flightNumber: 'KQ456'
        }
      ],
      price: { amount: 750, currency: 'USD' },
      deepLink: 'https://mock-booking.com/offer/2',
      provider: 'mock'
    }
  ];

  res.json({
    success: true,
    data: mockOffers,
    timestamp: new Date().toISOString(),
    requestId: req.headers['x-request-id'] || 'req_' + Date.now()
  });
});

// Mock booking creation
app.post('/v1/bookings/create', (req, res) => {
  const { offerId, contactEmail } = req.body;

  if (!offerId || !contactEmail) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: offerId, contactEmail',
      timestamp: new Date().toISOString()
    });
  }

  res.json({
    success: true,
    data: {
      status: 'created',
      deepLink: `https://mock-booking.com/booking/${Date.now()}`,
      reference: `MOCK${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      bookingId: `booking_${Date.now()}`
    },
    timestamp: new Date().toISOString(),
    requestId: req.headers['x-request-id'] || 'req_' + Date.now()
  });
});

// Provider info
app.get('/v1/meta/providers', (req, res) => {
  res.json({
    success: true,
    data: {
      active: 'mock',
      features: {
        search: true,
        booking: true,
        webhooks: false,
        cache: false
      }
    },
    timestamp: new Date().toISOString(),
    requestId: req.headers['x-request-id'] || 'req_' + Date.now()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.method} ${req.originalUrl} not found`,
    timestamp: new Date().toISOString()
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                    TGT Flight Search API                    ║
║                                                              ║
║  🚀 Server running on port ${PORT}                          ║
║  ❤️  Health check: http://localhost:${PORT}/health            ║
║  🔧 Provider: mock                                           ║
║  🌍 Environment: ${process.env.NODE_ENV || 'development'}    ║
╚══════════════════════════════════════════════════════════════╝
  `);
});
