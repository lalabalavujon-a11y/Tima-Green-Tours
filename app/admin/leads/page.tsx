import { notFound } from 'next/navigation';
import Container from '@/components/Container';
import { listLeadsWithRows } from '@/lib/googleSheets';

export const metadata = { title: 'Leads' };

export default async function LeadsPage({ searchParams }: { searchParams: { key?: string } }) {
  const adminKey = process.env.ADMIN_ACCESS_KEY;
  if (adminKey && searchParams?.key !== adminKey) return notFound();

  let leads: { row: number; data: any }[] = [];
  try {
    if (process.env.GOOGLE_SHEETS_ID) {
      leads = await listLeadsWithRows(200);
    }
  } catch (e) {
    console.warn('Failed to load leads', e);
  }

  return (
    <Container>
      <div className="py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Leads</h1>
          {process.env.NEXT_PUBLIC_SHOW_ADMIN_LINKS === 'true' && (
            <a href={`/api/leads/export${searchParams?.key ? `?key=${searchParams.key}` : ''}`} className="text-brand-emerald-700 hover:underline">Export CSV</a>
          )}
        </div>
        {/* Pipeline counts */}
        <div className="flex gap-4 mb-6 text-sm">
          {['New','Contacted','Qualified','Booked','Lost'].map(stage => {
            const count = leads.filter(l => (l.data['Status'] || '').toLowerCase() === stage.toLowerCase()).length;
            return (
              <div key={stage} className="px-3 py-2 rounded bg-brand-emerald-100 text-brand-emerald-800">
                {stage}: {count}
              </div>
            );
          })}
        </div>
        {!process.env.GOOGLE_SHEETS_ID && (
          <p className="text-slate-600">Connect Google Sheets in env to enable CRM list.</p>
        )}
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                {['Row','Created At','Name','Email','WhatsApp','Tour','Dates','Group Size','Status','Notes','Message','Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-semibold text-slate-700">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((l, idx) => (
                <tr key={idx} className="border-t border-slate-100 align-top">
                  <td className="px-4 py-3 text-slate-500">{l.row}</td>
                  <td className="px-4 py-3">{l.data['Created At']}</td>
                  <td className="px-4 py-3">{l.data['Name']}</td>
                  <td className="px-4 py-3">{l.data['Email']}</td>
                  <td className="px-4 py-3">{l.data['WhatsApp']}</td>
                  <td className="px-4 py-3">{l.data['Tour']}</td>
                  <td className="px-4 py-3">{l.data['Dates']}</td>
                  <td className="px-4 py-3">{l.data['Group Size']}</td>
                  <td className="px-4 py-3">
                    <form method="post" action={`/api/leads/update?row=${l.row}${searchParams?.key ? `&key=${searchParams.key}` : ''}`} className="flex items-center gap-2">
                      <select name="Status" defaultValue={l.data['Status'] || 'New'} className="border rounded px-2 py-1">
                        {['New','Contacted','Qualified','Booked','Lost'].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                  </form>
                  </td>
                  <td className="px-4 py-3">
                    <form method="post" action={`/api/leads/update?row=${l.row}${searchParams?.key ? `&key=${searchParams.key}` : ''}`}>
                      <textarea name="Notes" defaultValue={l.data['Notes'] || ''} rows={2} className="border rounded px-2 py-1 w-64"></textarea>
                      <input type="hidden" name="__action" value="notes" />
                      <div className="mt-2">
                        <button className="text-brand-emerald-700 hover:underline">Save</button>
                      </div>
                    </form>
                  </td>
                  <td className="px-4 py-3 max-w-[300px] truncate" title={l.data['Message']}>{l.data['Message']}</td>
                  <td className="px-4 py-3">
                    <form method="post" action={`/api/leads/update?row=${l.row}${searchParams?.key ? `&key=${searchParams.key}` : ''}`}>
                      <input type="hidden" name="Status" value={l.data['Status'] || 'New'} />
                      <input type="hidden" name="Notes" value={l.data['Notes'] || ''} />
                      <button className="text-brand-emerald-700 hover:underline">Apply</button>
                    </form>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-slate-600" colSpan={9}>No leads yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}
