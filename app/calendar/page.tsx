import Container from '@/components/Container';
import { notFound } from 'next/navigation';

export const metadata = { title: 'Calendar' };

export default function CalendarPage({ searchParams }: { searchParams: { key?: string } }) {
  const adminKey = process.env.ADMIN_ACCESS_KEY;
  if (adminKey && searchParams?.key !== adminKey) return notFound();
  const src = process.env.NEXT_PUBLIC_CALENDAR_EMBED_SRC || 'https://calendar.google.com/calendar/embed?src=lalabalavu.jon%40gmail.com&ctz=Pacific%2FPago_Pago';
  return (
    <Container>
      <div className="py-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Team Calendar</h1>
          <span className="px-3 py-1 rounded-full text-sm bg-brand-emerald-100 text-brand-emerald-700">Admin</span>
        </div>
        <div className="rounded-xl overflow-hidden border border-slate-200">
          <iframe
            src={src}
            style={{ border: 0, width: '100%', height: '80vh' }}
            frameBorder={0}
            scrolling="no"
          />
        </div>
      </div>
    </Container>
  );
}
