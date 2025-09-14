'use client';
import { useState } from 'react';
import { OrderModal } from '@/components/OrderModal';

export default function FlightDemoPage() {
  const [modalOpen, setModalOpen] = useState(false);
  
  // Mock flight offer for demonstration
  const mockOffer = {
    id: 'off_0000A3tQM8R4W98LtH5Z0k',
    price: {
      amount: 450.00,
      currency: 'USD'
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Flight Booking Demo</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Sample Flight Offer</h2>
        <div className="space-y-2">
          <p><strong>Flight ID:</strong> {mockOffer.id}</p>
          <p><strong>Price:</strong> ${mockOffer.price.amount} {mockOffer.price.currency}</p>
          <p><strong>Route:</strong> NAN → LAX</p>
          <p><strong>Date:</strong> March 15, 2024</p>
        </div>
        
        <button
          onClick={() => setModalOpen(true)}
          className="mt-4 bg-brand-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-brand-emerald-700 transition-colors"
        >
          Book with Duffel Pay
        </button>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Features Demonstrated:</h3>
        <ul className="text-blue-800 space-y-1">
          <li>✅ Multi-passenger booking form</li>
          <li>✅ Seat preference selection</li>
          <li>✅ Baggage quantity selection</li>
          <li>✅ Contact information collection</li>
          <li>✅ Duffel Pay integration ready</li>
          <li>✅ Local storage for traveller profiles</li>
        </ul>
      </div>

      <OrderModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        offer={mockOffer}
        paymentProvider="duffel"
      />
    </div>
  );
}

