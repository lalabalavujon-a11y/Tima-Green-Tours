'use client';
import React from 'react';

export default function CacheTools() {
  const [key, setKey] = React.useState('');
  const [msg, setMsg] = React.useState('');
  
  async function purge() {
    setMsg('');
    const r = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/admin/cache/purge`, {
      method: 'POST',
      headers: { 
        'content-type': 'application/json', 
        'x-staff-key': process.env.NEXT_PUBLIC_STAFF_KEY ?? '' 
      },
      body: JSON.stringify({ key })
    });
    setMsg(r.ok ? 'Purged' : 'Failed');
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Cache Tools</h1>
        <div className="flex gap-2">
          <input 
            className="border rounded px-3 py-2 flex-1" 
            placeholder="cache key (e.g., flights:los:nbo:2025-12-03)" 
            value={key} 
            onChange={e => setKey(e.target.value)} 
          />
          <button 
            className="px-4 py-2 rounded border bg-brand-emerald text-white hover:bg-brand-emerald-700" 
            onClick={purge}
          >
            Purge
          </button>
        </div>
        {msg && <p className="text-sm">{msg}</p>}
      </div>
    </div>
  );
}
