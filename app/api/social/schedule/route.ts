import { NextRequest, NextResponse } from 'next/server';
import { appendSocialPost } from '@/lib/googleSheets';
import { createCalendarEvent, isCalendarConfigured } from '@/lib/googleCalendar';
import { scheduleSocialPostViaWebhook } from '@/lib/social';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const message = (formData.get('message') || '').toString();
    const image = (formData.get('image') || '').toString();
    const when = (formData.get('when') || '').toString();
    const platforms = formData.getAll('platforms').map(v => v.toString());

    // If a webhook is configured (Zapier/Make/Buffer proxy), call it
    if (process.env.SOCIAL_WEBHOOK_URL || process.env.ZAPIER_WEBHOOK_URL || process.env.MAKE_WEBHOOK_URL) {
      await scheduleSocialPostViaWebhook({ message, image, when, platforms });
    }

    // Always create a Calendar event and append to Sheets for tracking.

    if (isCalendarConfigured()) {
      const start = new Date(when || Date.now());
      const end = new Date(start.getTime() + 30 * 60 * 1000);
      await createCalendarEvent({
        calendarId: process.env.SOCIAL_CALENDAR_ID || process.env.GOOGLE_CALENDAR_ID!,
        summary: `Social Post: ${message.slice(0, 40)}${message.length > 40 ? '…' : ''}`,
        description: [`Platforms: ${platforms.join(', ')}`, image ? `Image: ${image}` : null, '', message].filter(Boolean).join('\n'),
        startISO: start.toISOString(),
        endISO: end.toISOString(),
      });
    }

    if (process.env.GOOGLE_SHEETS_ID) {
      await appendSocialPost([
        new Date().toISOString(),
        when,
        platforms.join(','),
        message,
        image,
        'Scheduled',
      ]);
    }

    return NextResponse.redirect(new URL('/admin/social', req.url));
  } catch (e) {
    console.error('Social schedule error', e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
