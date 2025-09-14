'use client';
import React from 'react';
import { createOrder } from '@/lib/api';

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
  offer: {
    id: string;
    price: {
      amount: number;
      currency: string;
    };
  };
  paymentProvider?: 'duffel' | 'stripe';
}

export function OrderModal({ open, onClose, offer, paymentProvider = 'duffel' }: OrderModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl p-4 shadow-xl">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Travellers, Seats & Baggage</h2>
          <button onClick={onClose} className="text-sm underline">Close</button>
        </div>
        <OrderForm onClose={onClose} offer={offer} paymentProvider={paymentProvider} />
      </div>
    </div>
  );
}

function useProfiles() {
  const [profiles, setProfiles] = React.useState<any[]>(() => {
    const raw = typeof window !== 'undefined' ? localStorage.getItem('tgt_profiles') : null;
    return raw ? JSON.parse(raw) : [];
  });
  const saveAll = (p: any[]) => { setProfiles(p); if (typeof window !== 'undefined') localStorage.setItem('tgt_profiles', JSON.stringify(p)); };
  return { profiles, saveAll };
}

function OrderForm({ onClose, offer, paymentProvider }: { onClose: () => void; offer: any; paymentProvider: 'duffel'|'stripe' }) {
  const { profiles, saveAll } = useProfiles();
  const [travellers, setTravellers] = React.useState<any[]>(profiles.length ? profiles : [{ given_name: '', family_name: '', born_on: '', type: 'adult', seat: 'any', bags: 1 }]);
  const [contact, setContact] = React.useState<any>({ email: '', phone: '' });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string|undefined>();

  const totalBags = travellers.reduce((n, t) => n + Number(t.bags || 0), 0);
  const baggageFee = 0; // set to a fee if you price bags locally; otherwise bags priced by carrier
  const grand = Number(offer?.price?.amount ?? 0) + totalBags * baggageFee;

  function addTraveller() { setTravellers(t => [...t, { given_name: '', family_name: '', born_on: '', type: 'adult', seat: 'any', bags: 0 }]); }
  function removeTraveller(idx: number) { setTravellers(t => t.filter((_, i) => i !== idx)); }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault(); setError(undefined);
    // Validate
    if (!contact.email || !contact.phone) return setError('Contact email and phone are required');
    for (const t of travellers) {
      if (!t.given_name || !t.family_name || !t.born_on) return setError('All traveller fields are required');
    }

    setLoading(true);
    try {
      // If using Stripe (fallback), insert your previous Elements flow here.
      // Duffel Pay path would normally collect payment via Duffel's UI/SDK; for MVP, proceed to order and handle payment per your Duffel account setup.
      const pax = travellers.map((t, i) => ({ id: `pax_${i+1}`, given_name: t.given_name, family_name: t.family_name, born_on: t.born_on, type: t.type }));
      const seats = travellers.map((t, i) => ({ paxId: `pax_${i+1}`, preference: t.seat }));
      const baggage = travellers.map((t, i) => ({ paxId: `pax_${i+1}`, pieces: Number(t.bags || 0), weightKg: 23 }));

      const orderRes = await createOrder({ offerId: offer.id, contact, passengers: pax });
      saveAll(travellers);
      alert(orderRes?.data ? 'Order created. Next: complete payment per instructions.' : 'Order failed');
      onClose();
    } catch (e: any) {
      setError(e?.message || 'Something went wrong');
    } finally { setLoading(false); }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && <p className="text-sm text-red-600">{error}</p>}
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium">Contact</legend>
        <div className="grid md:grid-cols-2 gap-2">
          <input className="border rounded-xl px-3 py-2" placeholder="Email" type="email" value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} />
          <input className="border rounded-xl px-3 py-2" placeholder="Phone" value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} />
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium flex items-center justify-between">Travellers
          <button type="button" onClick={addTraveller} className="text-xs underline">Add traveller</button>
        </legend>
        {travellers.map((t, idx) => (
          <div key={idx} className="grid md:grid-cols-6 gap-2 items-end border rounded-xl p-3">
            <input className="border rounded-xl px-3 py-2 md:col-span-2" placeholder="Given name" value={t.given_name} onChange={e => setTravellers(v => v.map((x,i)=> i===idx?{...x, given_name: e.target.value}:x))} />
            <input className="border rounded-xl px-3 py-2 md:col-span-2" placeholder="Family name" value={t.family_name} onChange={e => setTravellers(v => v.map((x,i)=> i===idx?{...x, family_name: e.target.value}:x))} />
            <input type="date" className="border rounded-xl px-3 py-2" value={t.born_on} onChange={e => setTravellers(v => v.map((x,i)=> i===idx?{...x, born_on: e.target.value}:x))} />
            <select className="border rounded-xl px-3 py-2" value={t.type} onChange={e => setTravellers(v => v.map((x,i)=> i===idx?{...x, type: e.target.value}:x))}>
              <option value="adult">Adult</option>
              <option value="child">Child</option>
              <option value="infant">Infant</option>
            </select>
            <div className="md:col-span-2">
              <label className="text-xs">Seat preference</label>
              <select className="border rounded-xl px-3 py-2 w-full" value={t.seat} onChange={e => setTravellers(v => v.map((x,i)=> i===idx?{...x, seat: e.target.value}:x))}>
                <option value="any">Any</option>
                <option value="aisle">Aisle</option>
                <option value="window">Window</option>
                <option value="extra_legroom">Extra legroom</option>
              </select>
            </div>
            <div>
              <label className="text-xs">Baggage (pcs)</label>
              <input type="number" min={0} max={2} className="border rounded-xl px-3 py-2 w-full" value={t.bags} onChange={e => setTravellers(v => v.map((x,i)=> i===idx?{...x, bags: Number(e.target.value)}:x))} />
            </div>
            <button type="button" className="text-xs underline" onClick={() => removeTraveller(idx)}>Remove</button>
          </div>
        ))}
      </fieldset>

      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600">Baggage fee est.: {totalBags} × $ {baggageFee} (if applicable)</div>
        <div className="font-semibold">Estimated total: {Intl.NumberFormat(undefined, { style: 'currency', currency: offer?.price?.currency ?? 'USD' }).format(grand)}</div>
      </div>

      <div className="flex justify-end gap-2">
        <button type="button" className="px-4 py-2 border rounded-xl" onClick={onClose}>Cancel</button>
        <button type="submit" disabled={loading} className="px-4 py-2 border rounded-xl bg-black text-white">{loading ? 'Processing…' : (paymentProvider==='duffel' ? 'Create Order' : 'Pay & Create Order')}</button>
      </div>
    </form>
  );
}