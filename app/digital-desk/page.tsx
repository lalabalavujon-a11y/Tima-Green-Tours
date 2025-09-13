import Container from '@/components/Container';
import SEOHead from '@/components/SEOHead';
import DigitalTourDesk from '@/components/DigitalTourDesk';
import { getPreferredResortTransfers } from '@/lib/transfers';

export default function DigitalDeskPage() {
  const preferredResorts = getPreferredResortTransfers();

  return (
    <>
      <SEOHead
        title="Digital Tour Desk - Partner Resort QR System | Tima Green Tours"
        description="QR code digital tour desk system for partner resorts. Instant booking, local tips, and 24/7 support through Sia, your Fiji travel expert."
        url="/digital-desk"
      />
      
      <section className="pt-20 pb-16">
        <Container>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Digital Tour Desk System
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              QR code-powered digital tour desks for partner resorts. Guests can instantly book transfers, 
              get local tips, and connect with Sia, your 24/7 Fiji travel expert.
            </p>
          </div>

          {/* How It Works */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-brand-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Scan QR Code</h3>
              <p className="text-gray-600">Guests scan the QR code at your resort's front desk, lobby, or in-room compendium.</p>
            </div>

            <div className="text-center">
              <div className="bg-brand-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Chat with Sia</h3>
              <p className="text-gray-600">Instant connection to Sia, our AI travel expert, with pre-filled property information.</p>
            </div>

            <div className="text-center">
              <div className="bg-brand-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Book & Pay</h3>
              <p className="text-gray-600">Get instant quotes, book transfers, and pay securely in 60 seconds.</p>
            </div>
          </div>

          {/* Demo QR Desks */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Partner Resort QR Desks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {preferredResorts.slice(0, 6).map((resort) => (
                <DigitalTourDesk
                  key={resort.resortId}
                  propertyCode={resort.resortId.toUpperCase()}
                  propertyName={resort.resortName}
                  qrCodeUrl={resort.qrCodeUrl || `/qr/${resort.resortId}`}
                />
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Digital Desk Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">For Guests</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-brand-emerald-500 mr-3">✓</span>
                    <span className="text-gray-700">Instant transfer quotes and booking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-emerald-500 mr-3">✓</span>
                    <span className="text-gray-700">Local tips and recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-emerald-500 mr-3">✓</span>
                    <span className="text-gray-700">24/7 support via WhatsApp</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-emerald-500 mr-3">✓</span>
                    <span className="text-gray-700">Secure payment processing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-emerald-500 mr-3">✓</span>
                    <span className="text-gray-700">Flight tracking and updates</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">For Resorts</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-brand-emerald-500 mr-3">✓</span>
                    <span className="text-gray-700">No additional staff required</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-emerald-500 mr-3">✓</span>
                    <span className="text-gray-700">Commission on bookings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-emerald-500 mr-3">✓</span>
                    <span className="text-gray-700">Branded QR codes and materials</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-emerald-500 mr-3">✓</span>
                    <span className="text-gray-700">Analytics and reporting</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-emerald-500 mr-3">✓</span>
                    <span className="text-gray-700">Easy setup and maintenance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Setup Process */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Easy Setup Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-brand-emerald text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="font-semibold text-gray-900 mb-2">Contact Us</h3>
                <p className="text-sm text-gray-600">Reach out to discuss partnership and setup requirements.</p>
              </div>
              <div className="text-center">
                <div className="bg-brand-emerald text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="font-semibold text-gray-900 mb-2">Receive Materials</h3>
                <p className="text-sm text-gray-600">Get branded QR codes, tent cards, and placement guides.</p>
              </div>
              <div className="text-center">
                <div className="bg-brand-emerald text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="font-semibold text-gray-900 mb-2">Place QR Codes</h3>
                <p className="text-sm text-gray-600">Position QR codes at front desk, lobby, and in-room locations.</p>
              </div>
              <div className="text-center">
                <div className="bg-brand-emerald text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
                <h3 className="font-semibold text-gray-900 mb-2">Start Earning</h3>
                <p className="text-sm text-gray-600">Begin earning commissions on guest bookings immediately.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-brand-emerald rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Partner with Us?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Join our network of partner resorts and start offering seamless transfer booking to your guests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-brand-emerald px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Become a Partner
              </a>
              <a
                href="mailto:partnerships@timagreentours.com"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-brand-emerald transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
