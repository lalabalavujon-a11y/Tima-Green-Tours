'use client';

import { useState, useEffect } from 'react';

interface KPIMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  change: number;
}

interface KPIDashboardProps {
  dateRange?: 'today' | 'week' | 'month';
}

export default function KPIDashboard({ dateRange = 'today' }: KPIDashboardProps) {
  const [metrics, setMetrics] = useState<KPIMetric[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - in real implementation, this would come from API
  useEffect(() => {
    const mockMetrics: KPIMetric[] = [
      {
        id: 'on-time-pct',
        name: 'On-Time Pickup %',
        value: 96.2,
        target: 95,
        unit: '%',
        status: 'good',
        trend: 'up',
        change: 2.1
      },
      {
        id: 'nps-private',
        name: 'NPS (Private)',
        value: 4.8,
        target: 4.7,
        unit: '/5',
        status: 'good',
        trend: 'up',
        change: 0.1
      },
      {
        id: 'nps-shared',
        name: 'NPS (Shared)',
        value: 4.6,
        target: 4.5,
        unit: '/5',
        status: 'good',
        trend: 'stable',
        change: 0.0
      },
      {
        id: 'incident-rate',
        name: 'Incident Rate',
        value: 1.2,
        target: 2.0,
        unit: '/1000',
        status: 'good',
        trend: 'down',
        change: -0.3
      },
      {
        id: 'rebooking-rate',
        name: 'Re-booking Rate',
        value: 22.5,
        target: 20,
        unit: '%',
        status: 'good',
        trend: 'up',
        change: 2.5
      },
      {
        id: 'refund-rate',
        name: 'Refund Rate',
        value: 1.1,
        target: 1.5,
        unit: '%',
        status: 'good',
        trend: 'down',
        change: -0.2
      }
    ];

    setTimeout(() => {
      setMetrics(mockMetrics);
      setLoading(false);
    }, 1000);
  }, [dateRange]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      case 'stable': return '→';
      default: return '→';
    }
  };

  const getTrendColor = (trend: string, change: number) => {
    if (trend === 'up') return change > 0 ? 'text-green-600' : 'text-red-600';
    if (trend === 'down') return change < 0 ? 'text-green-600' : 'text-red-600';
    return 'text-gray-600';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Operations KPI Dashboard</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Last updated:</span>
          <span className="text-sm font-medium text-gray-900">
            {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Alert Panel */}
      <div className="mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-green-400">✅</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                All systems operational
              </h3>
              <p className="text-sm text-green-700">
                All KPIs are within target ranges. No immediate action required.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <div key={metric.id} className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">{metric.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                {metric.status}
              </span>
            </div>
            
            <div className="flex items-baseline mb-2">
              <span className="text-3xl font-bold text-gray-900">
                {metric.value}
              </span>
              <span className="text-lg text-gray-500 ml-1">
                {metric.unit}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Target: {metric.target}{metric.unit}
              </span>
              <span className={`text-sm font-medium ${getTrendColor(metric.trend, metric.change)}`}>
                {getTrendIcon(metric.trend)} {Math.abs(metric.change)}{metric.unit}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Metrics */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Punctuality Heatmap */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Punctuality by Hour</h3>
          <div className="grid grid-cols-6 gap-2">
            {[...Array(24)].map((_, hour) => {
              const onTimeRate = 85 + Math.random() * 15; // Mock data
              const color = onTimeRate >= 95 ? 'bg-green-500' : 
                           onTimeRate >= 90 ? 'bg-yellow-500' : 'bg-red-500';
              return (
                <div key={hour} className="text-center">
                  <div className={`h-8 rounded ${color} mb-1`}></div>
                  <span className="text-xs text-gray-500">{hour.toString().padStart(2, '0')}</span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
            <span>Poor</span>
            <span>Good</span>
          </div>
        </div>

        {/* Corridor Performance */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Corridor Performance</h3>
          <div className="space-y-3">
            {[
              { route: 'Nadi → Denarau', nps: 4.8, volume: 45 },
              { route: 'Nadi → Coral Coast', nps: 4.6, volume: 23 },
              { route: 'Nadi → Pacific Harbour', nps: 4.7, volume: 12 },
              { route: 'Nadi → Suva', nps: 4.5, volume: 8 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{item.route}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">NPS: {item.nps}</span>
                  <span className="text-sm text-gray-500">Vol: {item.volume}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Action Items</h3>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <span className="text-yellow-400">⚠️</span>
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-yellow-800">
                Driver Training Required
              </h4>
              <p className="text-sm text-yellow-700">
                Review driver feedback for Nadi → Suva route. NPS slightly below target.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
