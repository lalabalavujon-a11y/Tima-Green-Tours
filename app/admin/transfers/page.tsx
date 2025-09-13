'use client';

import { useState, useEffect } from 'react';
import Container from '@/components/Container';
import SEOHead from '@/components/SEOHead';
import { 
  getTransferZones, 
  getTransferRoutes, 
  getTransferServices, 
  getTransferPricing
} from '@/lib/transfers';
import { generateTransferProducts, generateBulkStripeProducts } from '@/lib/stripe/transferProducts';
import type { 
  TransferZone, 
  TransferRoute, 
  TransferService, 
  TransferPricing
} from '@/lib/types/transfer';
import type { StripeTransferProduct } from '@/lib/stripe/transferProducts';

export default function TransfersAdminPage() {
  const [zones] = useState<TransferZone[]>(getTransferZones());
  const [routes] = useState<TransferRoute[]>(getTransferRoutes());
  const [services] = useState<TransferService[]>(getTransferServices());
  const [pricing] = useState<TransferPricing[]>(getTransferPricing());
  const [stripeProducts] = useState<StripeTransferProduct[]>(generateTransferProducts());
  const [bulkProducts] = useState(generateBulkStripeProducts());
  
  const [activeTab, setActiveTab] = useState<'overview' | 'routes' | 'pricing' | 'stripe'>('overview');
  const [selectedRoute, setSelectedRoute] = useState<string>('');

  const filteredRoutes = selectedRoute 
    ? routes.filter(route => route.id === selectedRoute)
    : routes;

  const routeStats = {
    totalRoutes: routes.length,
    activeRoutes: routes.filter(r => r.isActive).length,
    privateRoutes: routes.filter(r => r.isPrivate).length,
    sharedRoutes: routes.filter(r => r.isShared).length,
    premiumRoutes: routes.filter(r => r.isPremium).length,
    accessibleRoutes: routes.filter(r => r.isAccessible).length
  };

  const pricingStats = {
    totalPricing: pricing.length,
    averagePrice: pricing.reduce((sum, p) => sum + p.basePrice, 0) / pricing.length,
    minPrice: Math.min(...pricing.map(p => p.basePrice)),
    maxPrice: Math.max(...pricing.map(p => p.basePrice))
  };

  return (
    <>
      <SEOHead
        title="Transfer Management Dashboard | Tima Green Tours Admin"
        description="Comprehensive transfer management system for all Fiji routes and services"
        url="/admin/transfers"
      />
      
      <section className="pt-20 pb-16">
        <Container>
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Transfer Management Dashboard
            </h1>
            <p className="text-xl text-gray-600">
              Comprehensive management system for all transfer routes, pricing, and services across Fiji
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', name: 'Overview', count: null },
                { id: 'routes', name: 'Routes', count: routes.length },
                { id: 'pricing', name: 'Pricing', count: pricing.length },
                { id: 'stripe', name: 'Stripe Products', count: stripeProducts.length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-brand-emerald text-brand-emerald'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                  {tab.count !== null && (
                    <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-brand-emerald-100 rounded-md flex items-center justify-center">
                        <svg className="w-5 h-5 text-brand-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Routes</dt>
                        <dd className="text-lg font-medium text-gray-900">{routeStats.totalRoutes}</dd>
                      </dl>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Active Routes</dt>
                        <dd className="text-lg font-medium text-gray-900">{routeStats.activeRoutes}</dd>
                      </dl>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Avg Price</dt>
                        <dd className="text-lg font-medium text-gray-900">FJD {pricingStats.averagePrice.toFixed(0)}</dd>
                      </dl>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Stripe Products</dt>
                        <dd className="text-lg font-medium text-gray-900">{stripeProducts.length}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Type Distribution */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Service Type Distribution</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-brand-emerald-600">{routeStats.privateRoutes}</div>
                    <div className="text-sm text-gray-500">Private Routes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{routeStats.sharedRoutes}</div>
                    <div className="text-sm text-gray-500">Shared Routes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{routeStats.premiumRoutes}</div>
                    <div className="text-sm text-gray-500">Premium Routes</div>
                  </div>
                </div>
              </div>

              {/* Price Range */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Price Range</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">FJD {pricingStats.minPrice}</div>
                    <div className="text-sm text-gray-500">Minimum Price</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">FJD {pricingStats.averagePrice.toFixed(0)}</div>
                    <div className="text-sm text-gray-500">Average Price</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">FJD {pricingStats.maxPrice}</div>
                    <div className="text-sm text-gray-500">Maximum Price</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Routes Tab */}
          {activeTab === 'routes' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Transfer Routes</h2>
                <select
                  value={selectedRoute}
                  onChange={(e) => setSelectedRoute(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-emerald focus:border-transparent"
                >
                  <option value="">All Routes</option>
                  {routes.map((route) => (
                    <option key={route.id} value={route.id}>
                      {route.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredRoutes.map((route) => (
                  <div key={route.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{route.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        route.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {route.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Distance:</span>
                        <span className="font-medium">{route.distance}km</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{route.estimatedDuration} minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Operating Hours:</span>
                        <span className="font-medium">{route.operatingHours.start} - {route.operatingHours.end}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {route.isPrivate && (
                        <span className="px-2 py-1 bg-brand-emerald-100 text-brand-emerald-800 text-xs rounded-full">
                          Private
                        </span>
                      )}
                      {route.isShared && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          Shared
                        </span>
                      )}
                      {route.isPremium && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                          Premium
                        </span>
                      )}
                      {route.isAccessible && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Accessible
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pricing Tab */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Transfer Pricing</h2>
              
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Route
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Base Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        After Hours
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Public Holiday
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Capacity
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pricing.map((price) => {
                      const route = routes.find(r => r.id === price.routeId);
                      return (
                        <tr key={`${price.routeId}-${price.serviceType}`}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {route?.name || price.routeId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              price.serviceType === 'private' ? 'bg-brand-emerald-100 text-brand-emerald-800' :
                              price.serviceType === 'shared' ? 'bg-blue-100 text-blue-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {price.serviceType.charAt(0).toUpperCase() + price.serviceType.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            FJD {price.basePrice}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            FJD {price.pricingRules.afterHoursSurcharge}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            FJD {price.pricingRules.publicHolidaySurcharge}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {price.capacity.minPassengers}-{price.capacity.maxPassengers} pax
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Stripe Products Tab */}
          {activeTab === 'stripe' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Stripe Products</h2>
                <div className="text-sm text-gray-500">
                  {stripeProducts.length} products ready for Stripe creation
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Stripe Products Ready for Creation
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>All transfer products are configured and ready to be created in Stripe. Use the bulk creation payload below.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {stripeProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                      <span className="text-2xl font-bold text-brand-emerald-600">
                        FJD {product.price}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Route:</span>
                        <span className="font-medium">{product.routeName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Capacity:</span>
                        <span className="font-medium">{product.capacity.maxPassengers} passengers</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Luggage:</span>
                        <span className="font-medium">{product.capacity.maxLuggage} pieces</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {product.isWifiIncluded && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          Wi-Fi
                        </span>
                      )}
                      {product.isMeetAndGreet && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Meet & Greet
                        </span>
                      )}
                      {product.isLeiGreeting && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                          Lei Greeting
                        </span>
                      )}
                      {product.isBottledWater && (
                        <span className="px-2 py-1 bg-cyan-100 text-cyan-800 text-xs rounded-full">
                          Bottled Water
                        </span>
                      )}
                      {product.isChildSeatAvailable && (
                        <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                          Child Seats
                        </span>
                      )}
                      {product.isAccessible && (
                        <span className="px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded-full">
                          Accessible
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bulk Creation Payload */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Bulk Creation Payload</h3>
                <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-800">
                    {JSON.stringify(bulkProducts, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
