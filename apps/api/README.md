# TGT Flight Search API

A minimal working version of the Tima Green Tours Flight Search API.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

## Endpoints

- `GET /health` - Health check
- `GET /v1/airports/search?query=LON` - Search airports
- `POST /v1/flights/search` - Search flights
- `POST /v1/bookings/create` - Create booking
- `GET /v1/meta/providers` - Provider information

## Example Usage

### Search Airports
```bash
curl "http://localhost:8080/v1/airports/search?query=LON"
```

### Search Flights
```bash
curl -X POST http://localhost:8080/v1/flights/search \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "LON",
    "destination": "NBO",
    "departDate": "2024-12-01",
    "adults": 2
  }'
```

### Create Booking
```bash
curl -X POST http://localhost:8080/v1/bookings/create \
  -H "Content-Type: application/json" \
  -d '{
    "offerId": "offer_1",
    "contactEmail": "customer@example.com"
  }'
```

## Deployment

This API is ready for deployment on Vercel, Railway, or any Node.js hosting platform.
