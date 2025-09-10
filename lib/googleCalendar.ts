// Lightweight Google Calendar client using a Service Account
// Requires sharing the target calendar with the service account email.

import crypto from 'crypto';

const GCAL_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GCAL_EVENTS_URL = 'https://www.googleapis.com/calendar/v3/calendars';

export type CalendarEventInput = {
  calendarId: string;
  summary: string;
  description?: string;
  startISO: string; // ISO 8601 string
  endISO: string;   // ISO 8601 string
  timezone?: string;
  location?: string;
};

export function isCalendarConfigured() {
  return Boolean(process.env.GOOGLE_SA_EMAIL && process.env.GOOGLE_SA_PRIVATE_KEY && process.env.GOOGLE_CALENDAR_ID);
}

async function getAccessToken(): Promise<string> {
  const clientEmail = process.env.GOOGLE_SA_EMAIL!;
  let privateKey = process.env.GOOGLE_SA_PRIVATE_KEY!;
  // Handle escaped newlines in env var
  privateKey = privateKey.replace(/\\n/g, '\n');

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/calendar',
    aud: GCAL_TOKEN_URL,
    exp: now + 3600,
    iat: now,
  };

  const base64url = (obj: any) => Buffer.from(JSON.stringify(obj)).toString('base64url');
  const unsigned = `${base64url(header)}.${base64url(payload)}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(unsigned);
  const signature = signer.sign(privateKey).toString('base64url');
  const assertion = `${unsigned}.${signature}`;

  const body = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion,
  });

  const res = await fetch(GCAL_TOKEN_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body,
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Failed to get Google token: ${res.status} ${txt}`);
  }
  const json = await res.json();
  return json.access_token as string;
}

export async function createCalendarEvent(input: CalendarEventInput) {
  const token = await getAccessToken();
  const event = {
    summary: input.summary,
    description: input.description,
    start: { dateTime: input.startISO, timeZone: input.timezone || process.env.GOOGLE_CALENDAR_TIMEZONE || 'Pacific/Pago_Pago' },
    end: { dateTime: input.endISO, timeZone: input.timezone || process.env.GOOGLE_CALENDAR_TIMEZONE || 'Pacific/Pago_Pago' },
    location: input.location,
  } as any;

  const url = `${GCAL_EVENTS_URL}/${encodeURIComponent(input.calendarId)}/events`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(event),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Failed to create event: ${res.status} ${txt}`);
  }
  return res.json();
}

