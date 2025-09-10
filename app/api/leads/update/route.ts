import { NextRequest, NextResponse } from 'next/server';
import { updateLeadRow } from '@/lib/googleSheets';

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const key = url.searchParams.get('key') || req.headers.get('x-admin-key') || '';
    const adminKey = process.env.ADMIN_ACCESS_KEY;
    if (adminKey && key !== adminKey) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });

    const row = parseInt(url.searchParams.get('row') || '0', 10);
    if (!row || !process.env.GOOGLE_SHEETS_ID) return NextResponse.json({ ok: false }, { status: 400 });

    const form = await req.formData();
    const updates: Record<string, string> = {};
    for (const [k, v] of form.entries()) {
      if (k.startsWith('__')) continue;
      updates[k] = v.toString();
    }

    await updateLeadRow(row, updates);

    // Redirect back to leads page
    const redirect = new URL('/admin/leads', req.url);
    if (key) redirect.searchParams.set('key', key);
    return NextResponse.redirect(redirect);
  } catch (e) {
    console.error('Lead update error', e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

