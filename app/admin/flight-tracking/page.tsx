import Container from '@/components/Container';
import SEOHead from '@/components/SEOHead';
import FlightTracking from '@/components/FlightTracking';

export default function FlightTrackingPage() {
  return (
    <>
      <SEOHead
        title="Flight Tracking & SMS Updates | Tima Green Tours Admin"
        description="Monitor flight delays and automatically send SMS updates to customers about pickup time changes and flight status updates."
        url="/admin/flight-tracking"
      />
      
      <section className="pt-20 pb-16">
        <Container>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Flight Tracking & SMS Updates
            </h1>
            <p className="text-gray-600">
              Monitor flight delays and automatically notify customers of pickup time changes.
            </p>
          </div>

          <FlightTracking autoRefresh={true} refreshInterval={30000} />

          {/* SMS Configuration */}
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">SMS Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delay Threshold (minutes)
                </label>
                <input
                  type="number"
                  defaultValue="15"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-emerald focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Send SMS when flight is delayed by this many minutes or more
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SMS Provider
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-emerald focus:border-transparent">
                  <option value="twilio">Twilio</option>
                  <option value="aws-sns">AWS SNS</option>
                  <option value="messagebird">MessageBird</option>
                </select>
              </div>
            </div>
          </div>

          {/* Recent SMS Log */}
          <div className="mt-8 bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent SMS Notifications</h3>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Delay notification sent to John Smith
                    </p>
                    <p className="text-sm text-gray-500">
                      Flight FJ910 delayed by 15 minutes, pickup updated to 15:15
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">2 minutes ago</p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Sent
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Arrival confirmation sent to Sarah Johnson
                    </p>
                    <p className="text-sm text-gray-500">
                      Flight FJ811 arrived on time, driver en route
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">15 minutes ago</p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Sent
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Pickup reminder sent to Mike Wilson
                    </p>
                    <p className="text-sm text-gray-500">
                      Your driver will arrive in 10 minutes at Terminal 1
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">1 hour ago</p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Sent
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
