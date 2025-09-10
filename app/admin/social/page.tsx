import { notFound } from 'next/navigation';
import Container from '@/components/Container';

export const metadata = { title: 'Social Scheduler' };

export default function SocialPage({ searchParams }: { searchParams: { key?: string } }) {
  const adminKey = process.env.ADMIN_ACCESS_KEY;
  if (adminKey && searchParams?.key !== adminKey) return notFound();

  return (
    <Container>
      <div className="py-10 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Social Scheduler</h1>
        <form action="/api/social/schedule" method="post" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea name="message" required rows={4} className="w-full border rounded-lg p-3"></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input name="image" type="url" className="w-full border rounded-lg p-3" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Schedule Time (ISO)</label>
              <input name="when" type="datetime-local" required className="w-full border rounded-lg p-3" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Platforms</label>
            <div className="flex gap-4 text-sm">
              <label className="inline-flex items-center gap-2"><input type="checkbox" name="platforms" value="facebook" /> Facebook</label>
              <label className="inline-flex items-center gap-2"><input type="checkbox" name="platforms" value="instagram" /> Instagram</label>
              <label className="inline-flex items-center gap-2"><input type="checkbox" name="platforms" value="x" /> X/Twitter</label>
            </div>
          </div>
          <button className="btn-primary px-6 py-3 rounded-lg">Schedule</button>
          <p className="text-sm text-slate-600 mt-2">If Buffer credentials are not set, this will create a Google Calendar event (Social Content). You can connect Zapier/Make to auto-post from calendar.</p>
        </form>
      </div>
    </Container>
  );
}

