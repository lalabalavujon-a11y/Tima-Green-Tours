'use client';

import { useState, useEffect } from 'react';

interface ShuttleRoute {
  id: string;
  name: string;
  fromZone: string;
  toZone: string;
  currentBookings: number;
  capacity: number;
  nextDeparture: string;
  demandLevel: 'low' | 'medium' | 'high';
  threshold: number;
  isActive: boolean;
}

interface DispatchRule {
  routeId: string;
  threshold: number;
  action: 'add-departure' | 'upgrade-vehicle' | 'split-route';
  priority: 'high' | 'medium' | 'low';
}

const mockRoutes: ShuttleRoute[] = [
  {
    id: 'nadi-denarau-shared',
    name: 'Nadi Airport → Denarau',
    fromZone: 'Nadi Airport',
    toZone: 'Denarau',
    currentBookings: 28,
    capacity: 40,
    nextDeparture: '14:30',
    demandLevel: 'high',
    threshold: 30,
    isActive: true
  },
  {
    id: 'nadi-coral-coast-shared',
    name: 'Nadi Airport → Coral Coast',
    fromZone: 'Nadi Airport',
    toZone: 'Coral Coast',
    currentBookings: 12,
    capacity: 40,
    nextDeparture: '15:00',
    demandLevel: 'low',
    threshold: 25,
    isActive: true
  },
  {
    id: 'nadi-lautoka-shared',
    name: 'Nadi Airport → Lautoka',
    fromZone: 'Nadi Airport',
    toZone: 'Lautoka',
    currentBookings: 18,
    capacity: 40,
    nextDeparture: '14:45',
    demandLevel: 'medium',
    threshold: 20,
    isActive: true
  }
];

const dispatchRules: DispatchRule[] = [
  {
    routeId: 'nadi-denarau-shared',
    threshold: 30,
    action: 'add-departure',
    priority: 'high'
  },
  {
    routeId: 'nadi-coral-coast-shared',
    threshold: 25,
    action: 'add-departure',
    priority: 'medium'
  },
  {
    routeId: 'nadi-lautoka-shared',
    threshold: 20,
    action: 'add-departure',
    priority: 'medium'
  }
];

interface DynamicShuttleDispatchProps {
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export default function DynamicShuttleDispatch({ 
  autoRefresh = true, 
  refreshInterval = 30000 
}: DynamicShuttleDispatchProps) {
  const [routes, setRoutes] = useState<ShuttleRoute[]>(mockRoutes);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const checkDispatchRules = () => {
    const newAlerts: any[] = [];
    
    routes.forEach(route => {
      const rule = dispatchRules.find(r => r.routeId === route.id);
      if (rule && route.currentBookings >= rule.threshold) {
        newAlerts.push({
          id: `${route.id}-${Date.now()}`,
          routeId: route.id,
          routeName: route.name,
          action: rule.action,
          priority: rule.priority,
          currentBookings: route.currentBookings,
          threshold: rule.threshold,
          timestamp: new Date(),
          status: 'pending'
        });
      }
    });
    
    setAlerts(prev => [...newAlerts, ...prev].slice(0, 10)); // Keep last 10 alerts
  };

  const handleDispatchAction = async (alertId: string, action: 'approve' | 'dismiss') => {
    setLoading(true);
    
    try {
      // In real implementation, this would call the dispatch API
      console.log(`Dispatching action: ${action} for alert: ${alertId}`);
      
      // Update alert status
      setAlerts(prev => prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: action === 'approve' ? 'approved' : 'dismissed' }
          : alert
      ));
      
      // If approved, update route data
      if (action === 'approve') {
        const alert = alerts.find(a => a.id === alertId);
        if (alert) {
          setRoutes(prev => prev.map(route => 
            route.id === alert.routeId
              ? { ...route, currentBookings: Math.max(0, route.currentBookings - 20) }
              : route
          ));
        }
      }
    } catch (error) {
      console.error('Error handling dispatch action:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        checkDispatchRules();
        setLastUpdate(new Date());
      }, refreshInterval);

      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  const getDemandColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getActionText = (action: string) => {
    switch (action) {
      case 'add-departure': return 'Add Extra Departure';
      case 'upgrade-vehicle': return 'Upgrade to Larger Vehicle';
      case 'split-route': return 'Split Route';
      default: return action;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Dynamic Shuttle Dispatch</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={checkDispatchRules}
            className="bg-brand-emerald text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-emerald-700 transition-colors"
          >
            Check Rules
          </button>
          <span className="text-sm text-gray-500">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Route Status */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Route Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {routes.map((route) => (
            <div key={route.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{route.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDemandColor(route.demandLevel)}`}>
                  {route.demandLevel}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Bookings:</span>
                  <span className="font-medium">{route.currentBookings}/{route.capacity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Next Departure:</span>
                  <span className="font-medium">{route.nextDeparture}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Threshold:</span>
                  <span className="font-medium">{route.threshold}</span>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      route.currentBookings >= route.threshold ? 'bg-red-500' : 
                      route.currentBookings >= route.threshold * 0.8 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${(route.currentBookings / route.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dispatch Alerts */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Dispatch Alerts</h3>
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No dispatch alerts at this time.</p>
            <p className="text-sm">All routes are operating within normal capacity.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(alert.priority)}`}>
                      {alert.priority} priority
                    </span>
                    <h4 className="font-medium text-gray-900">{alert.routeName}</h4>
                  </div>
                  <span className="text-sm text-gray-500">
                    {alert.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Action:</span> {getActionText(alert.action)}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Reason:</span> {alert.currentBookings} bookings (threshold: {alert.threshold})
                  </p>
                </div>
                
                {alert.status === 'pending' && (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleDispatchAction(alert.id, 'approve')}
                      disabled={loading}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 disabled:bg-gray-400 transition-colors"
                    >
                      Approve Dispatch
                    </button>
                    <button
                      onClick={() => handleDispatchAction(alert.id, 'dismiss')}
                      disabled={loading}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-600 disabled:bg-gray-400 transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                )}
                
                {alert.status === 'approved' && (
                  <div className="flex items-center text-green-600">
                    <span className="mr-2">✅</span>
                    <span className="text-sm font-medium">Dispatch approved and executed</span>
                  </div>
                )}
                
                {alert.status === 'dismissed' && (
                  <div className="flex items-center text-gray-500">
                    <span className="mr-2">❌</span>
                    <span className="text-sm font-medium">Alert dismissed</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dispatch Rules */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Dispatch Rules</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="space-y-3">
            {dispatchRules.map((rule) => (
              <div key={rule.routeId} className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-gray-900">
                    {routes.find(r => r.id === rule.routeId)?.name}
                  </span>
                  <span className="text-sm text-gray-600 ml-2">
                    ({getActionText(rule.action)})
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Threshold: {rule.threshold}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(rule.priority)}`}>
                    {rule.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Auto-refresh indicator */}
      {autoRefresh && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Auto-checking every {refreshInterval / 1000}s
          </div>
        </div>
      )}
    </div>
  );
}
