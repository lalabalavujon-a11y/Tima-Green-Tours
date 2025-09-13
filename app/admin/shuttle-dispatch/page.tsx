import Container from '@/components/Container';
import SEOHead from '@/components/SEOHead';
import DynamicShuttleDispatch from '@/components/DynamicShuttleDispatch';

export default function ShuttleDispatchPage() {
  return (
    <>
      <SEOHead
        title="Dynamic Shuttle Dispatch | Tima Green Tours Admin"
        description="Monitor demand levels and automatically dispatch additional shuttles when booking thresholds are reached for optimal service delivery."
        url="/admin/shuttle-dispatch"
      />
      
      <section className="pt-20 pb-16">
        <Container>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dynamic Shuttle Dispatch
            </h1>
            <p className="text-gray-600">
              Monitor demand levels and automatically dispatch additional shuttles when booking thresholds are reached.
            </p>
          </div>

          <DynamicShuttleDispatch autoRefresh={true} refreshInterval={30000} />

          {/* Dispatch Statistics */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-sm text-gray-600">Dispatches Today</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-gray-900">94%</div>
              <div className="text-sm text-gray-600">On-Time Performance</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-gray-900">156</div>
              <div className="text-sm text-gray-600">Passengers Served</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-gray-900">FJD 2,340</div>
              <div className="text-sm text-gray-600">Additional Revenue</div>
            </div>
          </div>

          {/* Dispatch History */}
          <div className="mt-8 bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Dispatch History</h3>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Extra departure added for Nadi → Denarau
                    </p>
                    <p className="text-sm text-gray-500">
                      32 bookings (threshold: 30) • 14:15
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Completed
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Vehicle upgrade for Nadi → Lautoka
                    </p>
                    <p className="text-sm text-gray-500">
                      22 bookings (threshold: 20) • 13:45
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Completed
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Route split for Nadi → Coral Coast
                    </p>
                    <p className="text-sm text-gray-500">
                      28 bookings (threshold: 25) • 12:30
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    In Progress
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Configuration */}
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dispatch Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Threshold (% of capacity)
                </label>
                <input
                  type="number"
                  defaultValue="75"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-emerald focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Auto-approve Threshold
                </label>
                <input
                  type="number"
                  defaultValue="90"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-emerald focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check Interval (seconds)
                </label>
                <input
                  type="number"
                  defaultValue="30"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-emerald focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Dispatches per Hour
                </label>
                <input
                  type="number"
                  defaultValue="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-emerald focus:border-transparent"
                />
              </div>
            </div>
            <div className="mt-6">
              <button className="bg-brand-emerald text-white px-6 py-2 rounded-lg font-medium hover:bg-brand-emerald-700 transition-colors">
                Save Configuration
              </button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
