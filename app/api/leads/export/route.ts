import { NextRequest } from 'next/server';
import { listLeadsWithRows } from '@/lib/googleSheets';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const key = url.searchParams.get('key') || '';
  const adminKey = process.env.ADMIN_ACCESS_KEY;
  if (adminKey && key !== adminKey) return new Response('Unauthorized', { status: 401 });

  const rows = process.env.GOOGLE_SHEETS_ID ? await listLeadsWithRows(10000) : [];
  const header = ['Row','Created At','Name','Email','WhatsApp','Tour','Dates','Group Size','Status','Notes','Message'];
  const csv = [header.join(',')]
    .concat(
      rows.map(r => header.map(h => {
        const val = h === 'Row' ? r.row : (r.data[h] || '');
        const s = String(val).replace(/\"/g, '\"\"');
        const needsQuotes = s.includes(',') || s.includes('"') || s.includes('\n');
        return needsQuotes ? `\"${s}\"` : s;
      }).join(','))
    )
    .join('\n');
  return new Response(csv, { headers: { 'content-type': 'text/csv; charset=utf-8' } });
}

