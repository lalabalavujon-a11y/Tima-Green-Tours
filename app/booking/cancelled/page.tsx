import Link from 'next/link';
import Container from '@/components/Container';

export const dynamic = 'force-static';

export default function BookingCancelled({ searchParams }: { searchParams: { slug?: string } }) {
  const slug = searchParams?.slug || '';
  return (
    <div className="py-16">
      <Container>
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <div className="text-3xl">🛑</div>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">Checkout Cancelled</h1>
          <p className="mt-2 text-slate-700">No worries — your cart was not charged. You can adjust your group and try again, or contact us for help.</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            {slug ? (
              <Link href={`/tours/${slug}#book`} className="btn-primary">Back to booking</Link>
            ) : null}
            <Link href="/contact" className="btn-secondary">Contact support</Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

