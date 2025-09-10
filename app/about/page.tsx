import Container from '@/components/Container';
import { CONTACT_URL } from '@/lib/config';

export const metadata = { title: 'About Us' };

export default function AboutPage() {
  return (
    <Container>
      <div className="py-14">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-emerald mb-6">
            About Tima Green Tours
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
            Your Gateway to Fijian Wonders - Experience the beauty and rich culture of Fiji with our 
            locally-owned business, based in the charming town of Sigatoka.
          </p>
        </div>

        {/* Who We Are */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Who We Are</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                Tima Green Tours and Transfers is recognised as an indigenous owned company established 
                to provide unique and unforgettable experiences for first-time travellers in Fiji. 
                We're your gateway to Fijian wonders, with a deep commitment to sustainable tourism 
                and personalised customer service.
              </p>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                Our team of knowledgeable guides specialises in highlighting the best that Fiji has 
                to offer, from its breathtaking natural scenery to its vibrant cultural traditions. 
                Whether you're in search of a laid-back island retreat or an action-packed excursion, 
                we have a tour package designed just for you.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                With roots in the local community and a passion for sharing our beautiful island home 
                with visitors, we strive to create experiences that benefit both our guests and the 
                indigenous communities we work with. Our commitment to responsible tourism means that 
                your adventure with us helps support local employment and preservation of natural resources.
              </p>
            </div>
            <div className="bg-brand-sand/30 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6">Why Choose Us</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-brand-emerald text-xl">🤝</div>
                  <div>
                    <h4 className="font-semibold">Friendly and Dependable Service</h4>
                    <p className="text-sm text-slate-600">Our team is known for warm Fijian hospitality and reliable service that ensures your journey is smooth and enjoyable.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-brand-emerald text-xl">💰</div>
                  <div>
                    <h4 className="font-semibold">Affordable Prices</h4>
                    <p className="text-sm text-slate-600">We offer competitive rates without compromising on quality, making Fijian adventures accessible to travellers with various budgets.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-brand-emerald text-xl">🌟</div>
                  <div>
                    <h4 className="font-semibold">Experts in Fiji Local Tours</h4>
                    <p className="text-sm text-slate-600">With over two decades of combined experience, our guides know the hidden gems and cultural nuances that make for truly authentic experiences.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-brand-emerald text-xl">🌿</div>
                  <div>
                    <h4 className="font-semibold">Support for Indigenous Communities</h4>
                    <p className="text-sm text-slate-600">By choosing us, you're directly contributing to the wellbeing of Fiji's indigenous communities through sustainable tourism practices.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">What We Do</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="w-12 h-12 bg-brand-emerald rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">1</div>
              <h3 className="text-xl font-semibold mb-3">Tour Bookings</h3>
              <p className="text-slate-700">
                We specialise in arranging comprehensive tours for tourists, showcasing the best of 
                Fiji's natural beauty and cultural heritage. Our tours are carefully designed to 
                provide authentic experiences that connect you with the heart and soul of Fiji.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="w-12 h-12 bg-brand-emerald rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">2</div>
              <h3 className="text-xl font-semibold mb-3">Transfer Services</h3>
              <p className="text-slate-700">
                We provide convenient airport pick-up and drop-off services, as well as hotel 
                transfers throughout Fiji. Our reliable transport ensures you'll reach your 
                destination safely and on time, with friendly drivers who know the local area well.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="w-12 h-12 bg-brand-emerald rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">3</div>
              <h3 className="text-xl font-semibold mb-3">Budget-Friendly Packages</h3>
              <p className="text-slate-700">
                Our affordable prices are tailored to fit your budget, offering bundled tours 
                that include local attractions, activities, and services, complete with guided 
                tours and meals. We believe everyone should be able to experience the magic of Fiji.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Our Mission</h2>
          <div className="bg-brand-sand/30 rounded-xl p-8 mb-8">
            <p className="text-lg text-slate-700 leading-relaxed">
              Our mission is to promote sustainable tourism practices that uplift local communities 
              by providing employment opportunities, preserving natural resources, and supporting 
              local projects. We believe that responsible tourism should positively benefit the 
              local communities and environment.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-3">Local Employment</h3>
              <p className="text-slate-700">
                We prioritise hiring local people, ensuring that tourism benefits those who call 
                Fiji home. By employing indigenous guides and staff, we help create sustainable 
                livelihoods whilst providing authentic cultural insights for our guests.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="text-xl font-semibold mb-3">Resource Preservation</h3>
              <p className="text-slate-700">
                We are committed to preserving Fiji's natural beauty for future generations. 
                Our tours are designed with minimal environmental impact, and we actively 
                participate in conservation efforts across the islands.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🏘️</div>
              <h3 className="text-xl font-semibold mb-3">Community Investment</h3>
              <p className="text-slate-700">
                A portion of our profits is invested back into local projects, from educational 
                initiatives to infrastructure improvements. We believe in creating a positive 
                cycle where tourism directly enhances the quality of life for Fijian communities.
              </p>
            </div>
          </div>
        </section>

        {/* Our Staff */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Our Staff</h2>
          <p className="text-lg text-slate-700 mb-8 leading-relaxed">
            Experience the beauty and warmth of Fiji with Timaima Green Tours and Transfers! 
            Our dedicated team has over 20 years of combined experience in showcasing the best 
            of Fiji's culture and attractions. Located in the vibrant cities of Lautoka and Suva, 
            we offer budget-friendly tours that guarantee an unforgettable experience.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
              <div className="w-20 h-20 bg-brand-emerald rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">T</div>
              <h3 className="text-xl font-semibold mb-2">Tima - Director</h3>
              <p className="text-slate-700">
                Leading with a love for Fiji and its people, Tima brings passion and vision to 
                every aspect of our operations. With deep roots in the local community and 
                extensive knowledge of Fijian culture, she ensures that each tour offers authentic 
                and meaningful experiences.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
              <div className="w-20 h-20 bg-brand-emerald rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">E</div>
              <h3 className="text-xl font-semibold mb-2">Eroni - Tour Organiser</h3>
              <p className="text-slate-700">
                Crafting the perfect itinerary for your adventure, Eroni combines his extensive 
                knowledge of Fiji's hidden gems with a keen understanding of what makes a memorable 
                tour. His attention to detail ensures that every aspect of your journey is carefully planned.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
              <div className="w-20 h-20 bg-brand-emerald rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">S</div>
              <h3 className="text-xl font-semibold mb-2">Savenaca - Transport Coordinator</h3>
              <p className="text-slate-700">
                Ensuring seamless and comfortable travels throughout your Fijian adventure, 
                Savenaca manages our fleet of vehicles and coordinates all transportation logistics. 
                His commitment to safety and punctuality means you can relax and enjoy the journey.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-brand-sand/30 rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-4">Ready to Experience Fiji?</h2>
          <p className="text-slate-700 mb-6">
            Let us guide you on a journey through the heart of Fiji, where every moment is worth cherishing. 
            Our team's combined expertise and genuine hospitality ensure that your experience with us will be truly unforgettable.
          </p>
          <a 
            href={CONTACT_URL} 
            className="inline-block bg-brand-emerald text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-emerald/90 transition-colors"
          >
            Contact Us Today
          </a>
        </section>
      </div>
    </Container>
  );
}
