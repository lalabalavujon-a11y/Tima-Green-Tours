Google Calendar Integration

Overview
- Creates a calendar event for every enquiry submitted via `/contact` (API: `POST /api/contact`).
- Optional admin view at `/calendar` embeds your Google Calendar.

What’s included
- `lib/googleCalendar.ts`: Service Account JWT flow + `createCalendarEvent()`.
- `app/api/contact/route.ts`: Accepts form payload, optionally emails via Resend, and creates a calendar event.
- `app/calendar/page.tsx`: Embeds a read-only calendar iframe (configurable via `NEXT_PUBLIC_CALENDAR_EMBED_SRC`).

Setup (Service Account)
1) Create a Google Cloud Project + Service Account, enable “Google Calendar API”.
2) Create a JSON key, copy values into env:
   - `GOOGLE_SA_EMAIL`
   - `GOOGLE_SA_PRIVATE_KEY` (escape newlines as \n)
   - `GOOGLE_CALENDAR_ID` (e.g., your Gmail or a team calendar ID)
   - Optional `GOOGLE_CALENDAR_TIMEZONE` (defaults to `Pacific/Pago_Pago`)
3) In Google Calendar, share the calendar with the Service Account email with “Make changes to events”.

Contact Email (optional)
- Set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_RECEIVE_EMAIL` to receive enquiry emails.

Embed Page
- Adjust `NEXT_PUBLIC_CALENDAR_EMBED_SRC` in `.env.local` if you want a different calendar/ctz.

Stripe (optional)
- To add bookings from Stripe Payment Links, create a Stripe webhook and implement an events handler to call `createCalendarEvent()` on `checkout.session.completed`. A skeleton route can be added next on request.

