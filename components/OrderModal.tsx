'use client';
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent, createOrder, type FlightOffer, type OrderCreateRequest } from '@/lib/api';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
  offer: FlightOffer | null;
}

export function OrderModal({ open, onClose, offer }: OrderModalProps) {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl p-4 shadow-xl">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Passenger & Payment</h2>
          <button 
            onClick={onClose} 
            className="text-sm underline hover:text-gray-600"
          >
            Close
          </button>
        </div>
        <Elements stripe={stripePromise}>
          <OrderForm onClose={onClose} offer={offer} />
        </Elements>
      </div>
    </div>
  );
}

function useSavedProfile() {
  const [profile, setProfile] = React.useState<any>(() => {
    if (typeof window === 'undefined') {
      return { email: '', phone: '', given_name: '', family_name: '', born_on: '' };
    }
    const raw = localStorage.getItem('tgt_profile');
    return raw ? JSON.parse(raw) : { email: '', phone: '', given_name: '', family_name: '', born_on: '' };
  });
  
  const save = (p: any) => { 
    setProfile(p); 
    if (typeof window !== 'undefined') {
      localStorage.setItem('tgt_profile', JSON.stringify(p));
    }
  };
  
  return { profile, save };
}

interface OrderFormProps {
  onClose: () => void;
  offer: FlightOffer | null;
}

function OrderForm({ onClose, offer }: OrderFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { profile, save } = useSavedProfile();
  const [form, setForm] = React.useState<any>(profile);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(undefined);
    
    if (!stripe || !elements) return;
    
    if (!form.email || !form.phone || !form.given_name || !form.family_name || !form.born_on) { 
      setError('All fields are required'); 
      return; 
    }
    
    if (!offer) {
      setError('No offer selected');
      return;
    }
    
    setLoading(true);
    
    try {
      // 1) Create PaymentIntent (idempotent)
      const idem = crypto.randomUUID();
      const piRes = await createPaymentIntent(
        { 
          amount: offer?.price?.amount ?? 0, 
          currency: offer?.price?.currency ?? 'USD', 
          metadata: { offerId: offer?.id } 
        },
        idem
      );
      
      if (!piRes?.clientSecret) {
        throw new Error('Payment initialization failed');
      }

      // 2) Confirm card payment
      const result = await stripe.confirmCardPayment(piRes.clientSecret, { 
        payment_method: { 
          card: elements.getElement(CardElement)! 
        } 
      });
      
      if (result.error) {
        throw result.error;
      }
      
      if (result.paymentIntent?.status !== 'succeeded' && result.paymentIntent?.status !== 'requires_capture') {
        throw new Error('Payment not completed');
      }

      // 3) Create order
      const passengers = [{ 
        given_name: form.given_name, 
        family_name: form.family_name, 
        born_on: form.born_on, 
        type: 'adult' as const
      }];
      
      const orderRes = await createOrder({
        offerId: offer.id,
        contact: { 
          email: form.email, 
          phone: form.phone 
        },
        passengers
      }, idem);
      
      save(form);
      
      if (orderRes?.success) {
        alert('Order created successfully!');
        onClose();
      } else {
        throw new Error(orderRes?.message || 'Order creation failed');
      }
    } catch (e: any) {
      setError(e?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-2">
        <input 
          className="border rounded-xl px-3 py-2 text-sm" 
          placeholder="Given name" 
          value={form.given_name} 
          onChange={e => setForm({ ...form, given_name: e.target.value })} 
        />
        <input 
          className="border rounded-xl px-3 py-2 text-sm" 
          placeholder="Family name" 
          value={form.family_name} 
          onChange={e => setForm({ ...form, family_name: e.target.value })} 
        />
        <input 
          className="border rounded-xl px-3 py-2 text-sm" 
          type="date" 
          placeholder="YYYY-MM-DD" 
          value={form.born_on} 
          onChange={e => setForm({ ...form, born_on: e.target.value })} 
        />
        <input 
          className="border rounded-xl px-3 py-2 text-sm" 
          placeholder="Email" 
          type="email" 
          value={form.email} 
          onChange={e => setForm({ ...form, email: e.target.value })} 
        />
        <input 
          className="border rounded-xl px-3 py-2 text-sm col-span-2" 
          placeholder="Phone" 
          value={form.phone} 
          onChange={e => setForm({ ...form, phone: e.target.value })} 
        />
      </div>
      
      <div className="border rounded-xl p-3">
        <CardElement 
          options={{ 
            hidePostalCode: true,
            style: {
              base: {
                fontSize: '14px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
            },
          }} 
        />
      </div>
      
      <div className="flex justify-end gap-2">
        <button 
          type="button" 
          className="px-4 py-2 border rounded-xl text-sm hover:bg-gray-50" 
          onClick={onClose}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={loading || !stripe} 
          className="px-4 py-2 border rounded-xl bg-black text-white text-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing…' : 'Pay & Create Order'}
        </button>
      </div>
    </form>
  );
}
