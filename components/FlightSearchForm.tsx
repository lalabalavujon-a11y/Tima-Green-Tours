'use client';
import React from 'react';
import AirportCombobox from './AirportCombobox';
import { Button, Card, Input, Label, Select } from './ui';
import { searchFlights, type FlightSearchBody } from '@/lib/api';

export default function FlightSearchForm({ preset }: { preset?: Partial<FlightSearchBody> }) {
  const [form, setForm] = React.useState<FlightSearchBody>({ 
    origin: preset?.origin ?? '', 
    destination: preset?.destination ?? '', 
    departDate: preset?.departDate ?? '', 
    returnDate: preset?.returnDate, 
    adults: preset?.adults ?? 1, 
    cabin: 'economy' 
  });
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState<any[] | null>(null);
  const [filters, setFilters] = React.useState({ maxPrice: '', refundable: false });
  const [sort, setSort] = React.useState<'price-asc'|'price-desc'>('price-asc');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault(); 
    setLoading(true); 
    setResults(null);
    try { 
      const data = await searchFlights(form); 
      setResults(data); 
    } finally { 
      setLoading(false); 
    }
  }

  const filtered = React.useMemo(() => {
    let arr = results ?? [];
    if (filters.maxPrice) arr = arr.filter((r: any) => Number(r.price?.amount ?? 0) <= Number(filters.maxPrice));
    if (filters.refundable) arr = arr.filter((r: any) => r.refundable);
    arr = [...arr].sort((a: any, b: any) => (sort === 'price-asc' ? a.price.amount - b.price.amount : b.price.amount - a.price.amount));
    return arr;
  }, [results, filters, sort]);

  return (
    <Card>
      <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4">
        <AirportCombobox 
          label="From" 
          value={form.origin} 
          onChange={(iata) => setForm({ ...form, origin: iata })} 
        />
        <AirportCombobox 
          label="To" 
          value={form.destination} 
          onChange={(iata) => setForm({ ...form, destination: iata })} 
        />
        <div>
          <Label>Depart</Label>
          <Input 
            type="date" 
            value={form.departDate} 
            onChange={e => setForm({ ...form, departDate: e.target.value })} 
          />
        </div>
        <div>
          <Label>Return (optional)</Label>
          <Input 
            type="date" 
            value={form.returnDate ?? ''} 
            onChange={e => setForm({ ...form, returnDate: e.target.value || undefined })} 
          />
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <Label>Adults</Label>
            <Input 
              type="number" 
              min={1} 
              max={9} 
              value={form.adults} 
              onChange={e => setForm({ ...form, adults: Number(e.target.value) })} 
            />
          </div>
          <div className="flex-1">
            <Label>Cabin</Label>
            <Select 
              value={form.cabin} 
              onChange={e => setForm({ ...form, cabin: e.target.value as any })}
            >
              <option value="economy">Economy</option>
              <option value="premium_economy">Premium Economy</option>
              <option value="business">Business</option>
              <option value="first">First</option>
            </Select>
          </div>
        </div>
        <div className="md:col-span-2 flex justify-between items-end gap-3">
          <div className="flex gap-3 items-end flex-wrap">
            <div>
              <Label>Max price</Label>
              <Input 
                type="number" 
                min={0} 
                placeholder="e.g. 600" 
                value={filters.maxPrice} 
                onChange={e => setFilters(f => ({ ...f, maxPrice: e.target.value }))} 
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input 
                type="checkbox" 
                checked={filters.refundable} 
                onChange={e => setFilters(f => ({ ...f, refundable: e.target.checked }))} 
              />
              Refundable only
            </label>
            <div>
              <Label>Sort</Label>
              <Select 
                value={sort} 
                onChange={e => setSort(e.target.value as any)}
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </Select>
            </div>
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Searching…' : 'Search flights'}
          </Button>
        </div>
      </form>

      {/* Results */}
      <div className="mt-6">
        {loading && <ResultsSkeleton />}
        {!loading && results && <FlightResults results={filtered} />}
      </div>
    </Card>
  );
}

function ResultsSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-xl border p-3 flex items-center justify-between">
          <div className="h-4 w-40 bg-slate-200 rounded" />
          <div className="h-4 w-20 bg-slate-200 rounded" />
        </div>
      ))}
    </div>
  );
}

function FlightResults({ results }: { results: any[] }) {
  if (!results?.length) return <p className="mt-4 text-sm">No results found.</p>;
  return (
    <div className="space-y-3">
      {results.map((r, i) => (
        <div key={r.id ?? i} className="rounded-xl border p-3 flex items-center justify-between gap-4 flex-col sm:flex-row">
          <div className="w-full sm:w-auto">
            <div className="font-medium">{r.carrier}</div>
            <div className="text-sm text-slate-600">{r.segments?.[0]?.from} → {r.segments?.[0]?.to}</div>
          </div>
          <div className="w-full sm:w-auto text-right">
            <div className="font-semibold">
              {Intl.NumberFormat(undefined, { style: 'currency', currency: r.price?.currency ?? 'USD' }).format(r.price?.amount ?? 0)}
            </div>
            {r.deepLink && (
              <a className="text-sm underline" href={r.deepLink} target="_blank" rel="noreferrer">
                Book
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
