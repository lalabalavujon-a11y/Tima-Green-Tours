'use client';
import React from 'react';
import { OrderModal } from './OrderModal';
import { type FlightOffer } from '@/lib/api';

interface FlightResultsProps {
  results: FlightOffer[];
}

export default function FlightResults({ results }: FlightResultsProps) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<FlightOffer | null>(null);

  if (!results?.length) {
    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">No results found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {results.map((result, i) => (
        <div 
          key={result.id ?? i} 
          className="rounded-xl border p-4 flex items-center justify-between gap-4 flex-col sm:flex-row hover:shadow-md transition-shadow"
        >
          <div className="w-full sm:w-auto">
            <div className="font-medium text-gray-900">{result.carrier}</div>
            <div className="text-sm text-gray-600">
              {result.segments?.[0]?.from} → {result.segments?.[0]?.to}
            </div>
            {result.segments && result.segments.length > 1 && (
              <div className="text-xs text-gray-500 mt-1">
                {result.segments.length - 1} stop{result.segments.length > 2 ? 's' : ''}
              </div>
            )}
          </div>
          
          <div className="w-full sm:w-auto text-right">
            <div className="font-semibold text-lg">
              {Intl.NumberFormat(undefined, { 
                style: 'currency', 
                currency: result.price?.currency ?? 'USD' 
              }).format(result.price?.amount ?? 0)}
            </div>
            
            {result.deepLink ? (
              <a 
                className="text-sm underline text-blue-600 hover:text-blue-800" 
                href={result.deepLink} 
                target="_blank" 
                rel="noreferrer"
              >
                Book External
              </a>
            ) : (
              <button 
                className="text-sm underline text-green-600 hover:text-green-800" 
                onClick={() => { 
                  setSelected(result); 
                  setOpen(true); 
                }}
              >
                Select & Continue
              </button>
            )}
          </div>
        </div>
      ))}
      
      {selected && (
        <OrderModal 
          open={open} 
          onClose={() => setOpen(false)} 
          offer={selected} 
        />
      )}
    </div>
  );
}
