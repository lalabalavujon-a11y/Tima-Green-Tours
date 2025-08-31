import Link from 'next/link';
import Section from '@/components/Section';
import Container from '@/components/Container';

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-sand">
        <Container>
          <div className="py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
                Discover Fiji beyond the postcards.
              </h1>
              <p className="mt-5 text-lg text-slate-700">
                With Tima Green Tours, travel becomes connection — to land, people,
                and tradition. Every journey is eco-conscious and community-led.
              </p>
              <div className="mt-8 flex gap-3">
                <Link
                  href="/tours"
                  className="rounded-md bg-brand-green px-6 py-3 text-white font-medium hover:opacity-90"
                >
                  Explore Our Tours
                </Link>
                <Link
                  href="/contact"
                  className="rounded-md border border-brand-green px-6 py-3 text-brand-green font-medium hover:bg-brand-green/10"
                >
                  Plan Your Trip
                </Link>
              </div>
              <ul className="mt-6 text-sm text-slate-600 space-y-1">
                <li>🌿 Eco-friendly practices</li>
                <li>🤝 Community-driven experiences</li>
                <li>🌊 Immersive cultural journeys</li>
              </ul>
            </div>
            <div className="rounded-lg bg-white shadow-sm p-4">
              <img
                src="/og-default.jpg"
                alt="Fiji waterfalls and rainforest"
                className="w-full h-auto rounded-md"
              />
            </div>
          </div>
        </Container>
      </section>

      <Section
        overline="Signature Experiences"
        title="Eco-Cultural Tours curated by locals"
        subtitle="Small groups, real connections, measurable impact."
      >
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Village Life & Kava Ceremony',
              desc:
                'Visit a traditional village, learn customs, and share a respectful kava ceremony with elders.'
            },
            {
              title: 'Rainforest & Waterfalls',
              desc:
                'Guided hike through lush forest trails with refreshing swims in hidden falls and biodiversity insights.'
            },
            {
              title: 'Dance & Craft Workshop',
              desc:
                'Learn meke rhythms and craft techniques from local artisans in an interactive cultural session.'
            }
          ].map((t) => (
            <article key={t.title} className="rounded-lg border p-6 bg-white">
              <h3 className="text-lg font-semibold">{t.title}</h3>
              <p className="mt-2 text-slate-700">{t.desc}</p>
              <div className="mt-4">
                <a href="/tours" className="text-brand-green font-medium">
                  View details →
                </a>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        overline="Our Promise"
        title="Travel that enriches guests and hosts"
        subtitle="We measure success in smiles and stewardship."
      >
        <div className="grid md:grid-cols-3 gap-6">
          <Stat label="Local Partners" value="30+" />
          <Stat label="Avg. Group Size" value="8–12" />
          <Stat label="Eco Rating" value="5/5" />
        </div>
      </Section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-brand-sand p-6 text-center">
      <div className="text-3xl font-semibold">{value}</div>
      <div className="mt-1 text-sm text-slate-600">{label}</div>
    </div>
  );
}
