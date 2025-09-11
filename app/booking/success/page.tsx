import Link from 'next/link';
import Container from '@/components/Container';

export const dynamic = 'force-static';

export default function BookingSuccess({ searchParams }: { searchParams: { session_id?: string; slug?: string } }) {
  const sessionId = searchParams?.session_id;
  const slug = searchParams?.slug || '';
  return (
    <div className="py-16">
      <Container>
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <div className="text-3xl">🎉</div>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">Booking Confirmed</h1>
          <p className="mt-2 text-slate-700">Thank you for booking with Tima Green Tours. A confirmation has been sent to your email.</p>
          {sessionId && (
            <p className="mt-2 text-xs text-slate-500">Ref: {sessionId}</p>
          )}
          <div className="mt-6 flex items-center justify-center gap-3">
            {slug ? (
              <Link href={`/tours/${slug}`} className="btn-primary">Back to tour</Link>
            ) : null}
            <Link href="/tours" className="btn-secondary">Browse more tours</Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

