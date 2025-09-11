# Stripe Products & Payment Links

This repo now supports two booking modes:

- Stripe Checkout (recommended): The site creates a Checkout Session dynamically with adult/child quantities. No pre-created prices are required. Configure `STRIPE_SECRET_KEY` and done.
- Payment Links (optional/fallback): Create Payment Links in Stripe and paste URLs into `lib/paymentLinks.ts`. These are still used in the sticky quick-buy CTAs and the admin audit page.

## Recommended Product/Price Setup (if you prefer Payment Links)

Create one Product per tour with two recurring Prices (one-time) for Adult and Child. Suggested names and amounts below (in FJD):

- Biausevu Waterfall Tour
  - Price: Adult — FJD 90.00
  - Price: Child — FJD 45.00
- Sigatoka Valley Drive & Lawai Pottery Village
  - Price: Adult — FJD 75.00
  - Price: Child — FJD 37.50
- Lomawai Salt Making Village & Horse Riding at Natadola Beach
  - Price: Adult — FJD 86.00
  - Price: Child — FJD 43.00
- Sabeto Mudpool and Nadi Temple/Shopping Tour
  - Price: Adult — FJD 100.00
  - Price: Child — FJD 50.00
- Shark Diving in Beqa Lagoon — Contact for Pricing
- Malolo Island 3 Nights Get-Away — Contact for Pricing

Tips:

- Use Price nicknames: “Adult” and “Child”.
- Create a single Payment Link per tour that contains both prices with adjustable quantities. Enable phone/address collection, terms, and any custom fields.
- Paste the adult/child Payment Link URLs into `lib/paymentLinks.ts` under the tour slug.
- Switch to live mode by setting `PAYMENT_MODE=live` and using production Payment Links.

## Checkout Mode (already wired)

The group booking widget calls `POST /api/checkout` with adults/children/date/pickup. The server:

- Looks up the tour (prices from `content/tours.json` via `lib/data.ts`)
- Creates a Stripe Checkout Session with two line items (Adult/Child) using `price_data`
- Redirects the guest to Stripe securely
- Includes metadata: `slug`, `tour`, `adults`, `children`, `date`, `pickup` (consumed by the webhook)

Configure:

- `STRIPE_SECRET_KEY` (required)
- `STRIPE_WEBHOOK_SECRET` (optional but recommended for post-payment automation)

Success/Cancel URLS:

- `/booking/success?session_id=...&slug=...`
- `/booking/cancelled?slug=...`

