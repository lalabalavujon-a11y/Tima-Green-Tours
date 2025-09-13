import Container from '@/components/Container';
import SEOHead from '@/components/SEOHead';
import KPIDashboard from '@/components/KPIDashboard';

export default function KPIPage() {
  return (
    <>
      <SEOHead
        title="Operations KPI Dashboard | Tima Green Tours Admin"
        description="Real-time operations dashboard tracking on-time performance, NPS scores, incident rates, and other key metrics for Tima Green Tours transfer services."
        url="/admin/kpi"
      />
      
      <section className="pt-20 pb-16">
        <Container>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Operations KPI Dashboard
            </h1>
            <p className="text-gray-600">
              Monitor key performance indicators for transfer operations and service quality.
            </p>
          </div>

          <KPIDashboard />

          {/* Additional Analytics */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Analytics */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Analytics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Today's Revenue</span>
                  <span className="font-semibold text-gray-900">FJD 2,450</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">This Week</span>
                  <span className="font-semibold text-gray-900">FJD 15,680</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-semibold text-gray-900">FJD 58,920</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Avg. Booking Value</span>
                  <span className="font-semibold text-gray-900">FJD 185</span>
                </div>
              </div>
            </div>

            {/* Service Mix */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Mix</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Private Transfers</span>
                  <span className="font-semibold text-gray-900">65%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shared Shuttles</span>
                  <span className="font-semibold text-gray-900">25%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Premium Services</span>
                  <span className="font-semibold text-gray-900">10%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Bookings</span>
                  <span className="font-semibold text-gray-900">127</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h3>
            <div className="bg-white rounded-lg shadow">
              <div className="divide-y divide-gray-200">
                <div className="p-4">
                  <div className="flex items-center">
                    <span className="text-green-500 mr-3">✅</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">All systems operational</p>
                      <p className="text-sm text-gray-500">2 minutes ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-3">⚠️</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">High demand detected for Nadi → Denarau route</p>
                      <p className="text-sm text-gray-500">15 minutes ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center">
                    <span className="text-blue-500 mr-3">ℹ️</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">New booking received for premium service</p>
                      <p className="text-sm text-gray-500">1 hour ago</p>
                    </div>
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
