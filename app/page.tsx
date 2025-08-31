import Link from 'next/link';
import Section from '@/components/Section';
import Container from '@/components/Container';
import tours from '@/content/tours.json';

export default function HomePage() {
  // Get the first 3 tours for the homepage
  const featuredTours = tours.slice(0, 3);

  return (
    <>
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-sand to-white">
        <div className="absolute inset-0 opacity-5"></div>
        <Container>
          <div className="py-20 md:py-32 grid md:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-sm font-medium mb-6">
                🌿 Indigenous Owned Company
              </div>
              <h1 className="text-display-sm md:text-display font-bold leading-tight bg-gradient-to-r from-lagoon to-deepsea bg-clip-text text-transparent">
                Your Gateway to Fijian Wonders
              </h1>
              <p className="mt-6 text-xl text-slate-700 leading-relaxed">
                Experience the beauty and rich culture of Fiji with our locally-owned business, 
                based in the charming town of Sigatoka. With over 20 years of combined experience, 
                we specialise in showcasing the best of Fiji.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/tours"
                  className="rounded-xl bg-lagoon px-8 py-4 text-white font-semibold hover:bg-deepsea transition-colors shadow-md hover:shadow-lg"
                >
                  Explore Our Tours
                </Link>
                <Link
                  href="/contact"
                  className="rounded-xl border-2 border-lagoon px-8 py-4 text-lagoon font-semibold hover:bg-lagoon/5 transition-colors"
                >
                  Plan Your Trip
                </Link>
              </div>
              <div className="mt-8 p-4 bg-white/80 rounded-lg backdrop-blur">
                <ul className="text-sm text-slate-700 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-brand-green">✓</span>
                    Indigenous owned & operated
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-brand-green">✓</span>
                    20+ years combined experience
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-brand-green">✓</span>
                    Budget-friendly packages
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl bg-white shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <img
                  src="/tours/placeholder.jpg"
                  alt="Fiji waterfalls and rainforest"
                  className="w-full h-auto rounded-xl"
                />
                <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                  <span>📍 Sigatoka, Fiji</span>
                  <span>📸 @tima_green_tours</span>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-brand-teal text-white p-3 rounded-full shadow-lg">
                <span className="text-sm font-semibold">5★</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Enhanced Signature Experiences */}
      <Section
        overline="Signature Experiences"
        title="Eco-Cultural Tours curated by locals"
        subtitle="Small groups, real connections, measurable impact."
      >
        <div className="grid md:grid-cols-3 gap-8">
          {featuredTours.map((tour) => (
            <article key={tour.slug} className="group rounded-xl border border-slate-200 p-6 bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl mb-4">
                {tour.slug.includes('waterfall') ? '🌊' : 
                 tour.slug.includes('pottery') ? '🏺' : 
                 tour.slug.includes('horse') ? '🐎' : '🏝️'}
              </div>
              <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
              <p className="text-slate-700 mb-4">{tour.summary}</p>
              <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                <span>⏱️ {tour.duration}</span>
                <span className="font-semibold text-brand-green">{tour.price}</span>
              </div>
              <div className="text-xs text-slate-500 mb-4">
                👥 {tour.group_size} • 🌿 Eco Rating: {tour.eco_rating}/5
              </div>
              <Link href="/tours" className="inline-flex items-center text-brand-green font-medium group-hover:gap-2 transition-all">
                View details 
                <span className="ml-1">→</span>
              </Link>
            </article>
          ))}
        </div>
      </Section>

      {/* Enhanced Stats Section */}
      <Section
        overline="Our Promise"
        title="Travel that enriches guests and hosts"
        subtitle="We measure success in smiles and stewardship."
      >
        <div className="grid md:grid-cols-4 gap-6">
          <Stat label="Years Experience" value="20+" icon="🌟" />
          <Stat label="Local Partners" value="30+" icon="🤝" />
          <Stat label="Eco Rating" value="5/5" icon="🌿" />
          <Stat label="Guest Satisfaction" value="98%" icon="⭐" />
        </div>
      </Section>

      {/* New Testimonials Section */}
      <Section
        overline="Guest Stories"
        title="What our visitors say"
        subtitle="Real experiences from real people."
      >
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              quote: "Absolutely incredible! Timaima Green Tours & Transfers showed us the best of Fiji and made our vacation truly unforgettable. Their knowledge of hidden spots and attention to detail exceeded all expectations.",
              author: "Sarah & James",
              location: "UK",
              rating: 5
            },
            {
              quote: "If you want to see the real Fiji, look no further than Timaima Green Tours & Transfers. From the moment we booked, we knew we were in good hands. Their passion for hospitality shone through every step of the way.",
              author: "David Thompson",
              location: "Australia",
              rating: 5
            }
          ].map((t) => (
            <blockquote key={t.author} className="bg-brand-sand/30 p-6 rounded-xl">
              <div className="flex gap-1 mb-3">
                {[...Array(t.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-500">★</span>
                ))}
              </div>
              <p className="text-lg italic mb-4">"{t.quote}"</p>
              <footer className="text-sm text-slate-600">
                <strong>{t.author}</strong> • {t.location}
              </footer>
            </blockquote>
          ))}
        </div>
      </Section>

      {/* New About Section */}
      <Section
        overline="Who We Are"
        title="Indigenous owned company with deep roots"
        subtitle="We're your gateway to Fijian wonders, with a deep commitment to sustainable tourism."
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-slate-700 mb-6 leading-relaxed">
              Tima Green Tours and Transfers is recognised as an indigenous owned company established 
              to provide unique and unforgettable experiences for first-time travellers in Fiji. 
              With roots in the local community and a passion for sharing our beautiful island home 
              with visitors, we strive to create experiences that benefit both our guests and the 
              indigenous communities we work with.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="text-brand-green text-xl">🌿</div>
                <div>
                  <h4 className="font-semibold">Sustainable Tourism</h4>
                  <p className="text-sm text-slate-600">Our commitment to responsible tourism means that your adventure with us helps support local employment and preservation of natural resources.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-brand-green text-xl">🤝</div>
                <div>
                  <h4 className="font-semibold">Local Expertise</h4>
                  <p className="text-sm text-slate-600">Our team of knowledgeable guides specialises in highlighting the best that Fiji has to offer, from its breathtaking natural scenery to its vibrant cultural traditions.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-brand-sand/30 rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-4">Our Services</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                <div>
                  <h4 className="font-medium">Tour Bookings</h4>
                  <p className="text-sm text-slate-600">Comprehensive tours showcasing Fiji's natural beauty and cultural heritage</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                <div>
                  <h4 className="font-medium">Transfer Services</h4>
                  <p className="text-sm text-slate-600">Airport pick-up, drop-off, and hotel transfers throughout Fiji</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                <div>
                  <h4 className="font-medium">Budget-Friendly Packages</h4>
                  <p className="text-sm text-slate-600">Affordable prices tailored to fit your budget with bundled tours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="rounded-xl bg-gradient-to-br from-brand-sand to-white p-6 text-center border border-slate-200">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-3xl font-bold text-brand-green">{value}</div>
      <div className="mt-1 text-sm text-slate-600 font-medium">{label}</div>
    </div>
  );
}
