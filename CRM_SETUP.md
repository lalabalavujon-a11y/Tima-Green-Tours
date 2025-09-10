Mini CRM and Social Scheduling

Leads capture
- `/api/contact` appends enquiries to Google Sheets and creates Google Calendar events.
- Admin list at `/admin/leads?key=ADMIN_ACCESS_KEY` reads from Google Sheets.

Sheets structure
- Create a Google Sheet and set `GOOGLE_SHEETS_ID` to its ID.
- Add a sheet named `Leads` with header row:
  Created At | Name | Email | WhatsApp | Tour | Dates | Group Size | Status | Notes | Message
- Add a sheet named `Posts` with header row:
  Created At | When | Platforms | Message | Image | Status

Social scheduler
- `/admin/social?key=ADMIN_ACCESS_KEY` creates a "Social Post" calendar event and appends to `Posts` sheet.
- Connect Zapier/Make to your calendar to auto-post to social platforms when new events appear, or bring your own Buffer/Hootsuite keys later.

Environment
- GOOGLE_SA_EMAIL, GOOGLE_SA_PRIVATE_KEY, GOOGLE_SHEETS_ID, GOOGLE_CALENDAR_ID
- Optional: SOCIAL_CALENDAR_ID, LEADS_SHEET_NAME, POSTS_SHEET_NAME
- NEXT_PUBLIC_SHOW_ADMIN_LINKS=true to reveal Admin + Calendar in navbar (still protected by key when loaded).

Social Webhook
- Optionally set `SOCIAL_WEBHOOK_URL` or `ZAPIER_WEBHOOK_URL` or `MAKE_WEBHOOK_URL` to push scheduled posts to your automation tool.

Stripe → Calendar
- Add a webhook in Stripe for `checkout.session.completed` to `/api/stripe/webhook` and set `STRIPE_WEBHOOK_SECRET`.
- Optional: set `STRIPE_SECRET_KEY` to let the webhook fetch line items to infer the tour and slug.
