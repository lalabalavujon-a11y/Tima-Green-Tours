'use client';

import { useState } from 'react';

interface IslandConnectorProps {
  onSelectConnector: (connector: IslandConnectorOption) => void;
  selectedConnector?: IslandConnectorOption;
}

interface IslandConnectorOption {
  id: string;
  name: string;
  fromZone: string;
  toZone: string;
  price: number;
  duration: number;
  ferryOperator: string;
  ferryDeparture: string;
  features: string[];
}

const islandConnectors: IslandConnectorOption[] = [
  {
    id: 'coral-coast-mamanuca',
    name: 'Coral Coast → Mamanuca Islands',
    fromZone: 'Coral Coast',
    toZone: 'Mamanuca Islands',
    price: 45,
    duration: 70,
    ferryOperator: 'South Sea Cruises',
    ferryDeparture: '09:30, 11:30, 14:30',
    features: ['Timed to ferry departures', 'Luggage assistance', 'Through-ticketing available']
  },
  {
    id: 'pacific-harbour-yasawa',
    name: 'Pacific Harbour → Yasawa Islands',
    fromZone: 'Pacific Harbour',
    toZone: 'Yasawa Islands',
    price: 65,
    duration: 90,
    ferryOperator: 'South Sea Cruises',
    ferryDeparture: '08:30, 10:30, 13:30',
    features: ['Scenic coastal route', 'Ferry connection', 'Island resort access']
  },
  {
    id: 'suva-mamanuca',
    name: 'Suva → Mamanuca Islands',
    fromZone: 'Suva',
    toZone: 'Mamanuca Islands',
    price: 85,
    duration: 120,
    ferryOperator: 'South Sea Cruises',
    ferryDeparture: '07:30, 09:30, 12:30',
    features: ['Capital to islands', 'Early morning departures', 'Business class available']
  }
];

export default function IslandConnector({ onSelectConnector, selectedConnector }: IslandConnectorProps) {
  const [selectedId, setSelectedId] = useState<string | null>(selectedConnector?.id || null);

  const handleSelect = (connector: IslandConnectorOption) => {
    setSelectedId(connector.id);
    onSelectConnector(connector);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          🏝️ Island Connector Add-on
        </h3>
        <p className="text-sm text-gray-600">
          Add a coach transfer to Port Denarau for seamless island connections
        </p>
      </div>

      <div className="space-y-4">
        {islandConnectors.map((connector) => (
          <div
            key={connector.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedId === connector.id
                ? 'border-brand-emerald bg-brand-emerald-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleSelect(connector)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="island-connector"
                    checked={selectedId === connector.id}
                    onChange={() => handleSelect(connector)}
                    className="mr-3 text-brand-emerald focus:ring-brand-emerald"
                  />
                  <h4 className="font-medium text-gray-900">{connector.name}</h4>
                </div>
                
                <div className="ml-6 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-20">Route:</span>
                    <span>{connector.fromZone} → {connector.toZone}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-20">Duration:</span>
                    <span>{connector.duration} minutes</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-20">Ferry:</span>
                    <span>{connector.ferryOperator} ({connector.ferryDeparture})</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {connector.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="text-right ml-4">
                <div className="text-lg font-bold text-brand-emerald">
                  FJD {connector.price}
                </div>
                <div className="text-sm text-gray-500">per person</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedConnector && (
        <div className="mt-6 p-4 bg-brand-emerald-50 border border-brand-emerald-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-brand-emerald-900">
                Selected: {selectedConnector.name}
              </h4>
              <p className="text-sm text-brand-emerald-700">
                Coach transfer + {selectedConnector.ferryOperator} ferry connection
              </p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-brand-emerald-900">
                FJD {selectedConnector.price}
              </div>
              <div className="text-sm text-brand-emerald-700">per person</div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500">
        <p>• Coach transfers are timed to match ferry departures</p>
        <p>• Through-ticketing available for seamless island connections</p>
        <p>• Luggage assistance included for ferry connections</p>
      </div>
    </div>
  );
}
