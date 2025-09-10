import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/Container';
import { getAllTours } from '@/lib/data';
import { paymentLinks } from '@/lib/paymentLinks';
import { PAYMENT_MODE, isPaymentLive } from '@/lib/config';

export default function PaymentLinksAdmin({ searchParams }: { searchParams: { key?: string } }) {
  const adminKey = process.env.ADMIN_ACCESS_KEY;
  if (adminKey && searchParams?.key !== adminKey) {
    return notFound();
  }

  const tours = getAllTours();

  return (
    <div className="py-12">
      <Container>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold">Stripe Payment Links Audit</h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${isPaymentLive ? 'bg-brand-emerald-100 text-brand-emerald-700' : 'bg-amber-100 text-amber-800'}`}>
            Mode: {PAYMENT_MODE === 'live' ? 'Live' : 'Test'}
          </span>
        </div>
        <p className="text-slate-600 mb-8">Shows which tours have adult/child Stripe Payment Links configured. {isPaymentLive ? '' : 'Currently in TEST mode; buttons on tour pages are labeled as Test.'}</p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700">Tour</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Adult Price</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Child Price</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Adult Link</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Child Link</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tours.map((t) => {
                const links = paymentLinks[t.slug] || {};
                const missingAdult = !links.adult;
                const missingChild = !links.child;
                return (
                  <tr key={t.slug} className="border-t border-slate-100">
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{t.name}</div>
                      <div className="text-xs text-slate-500">{t.slug}</div>
                    </td>
                    <td className="px-4 py-3">{t.priceFromFJD ? `${t.currency} ${t.priceFromFJD}` : '—'}</td>
                    <td className="px-4 py-3">{t.childPriceFromFJD ? `${t.currency} ${t.childPriceFromFJD}` : '—'}</td>
                    <td className="px-4 py-3">
                      {links.adult ? (
                        <a href={links.adult} target="_blank" rel="noopener" className="text-brand-emerald-700 hover:underline">Configured ✓</a>
                      ) : (
                        <span className="text-red-600">Missing ✗</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {links.child ? (
                        <a href={links.child} target="_blank" rel="noopener" className="text-brand-emerald-700 hover:underline">Configured ✓</a>
                      ) : (
                        <span className="text-red-600">Missing ✗</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/tours/${t.slug}`} className="text-brand-emerald-700 hover:underline">Preview</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">How to add links</h2>
          <p className="text-slate-600 mb-3">Edit <code className="bg-slate-100 px-1 rounded">lib/paymentLinks.ts</code> and paste Stripe Payment Link URLs:</p>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs">
{`export const paymentLinks = {
  'biausevu-waterfall-tour': {
    adult: 'https://buy.stripe.com/XXXXXadult',
    child: 'https://buy.stripe.com/XXXXXchild',
  },
};`}
          </pre>
          <p className="text-slate-500 mt-2">Optional: set an access key with <code className="bg-slate-100 px-1 rounded">ADMIN_ACCESS_KEY</code> env var and open this page as <code className="bg-slate-100 px-1 rounded">/admin/payment-links?key=YOUR_KEY</code>.</p>
        </div>
      </Container>
    </div>
  );
}
