# TGT Monorepo — Duffel Pay Integration v4

## 🎯 **Implementation Summary**

Successfully implemented **Duffel Pay** payment mode with **multi-passenger modal** featuring validation, seat preferences, and baggage selectors. This builds on the existing Stripe integration without breaking it.

---

## ✅ **Completed Components**

### **1. Environment & Configuration**
- **`.env.example`**: Added Duffel Pay configuration variables
- **`apps/api/src/config.ts`**: Added payment provider configuration object
- **Payment Provider Switch**: `PAYMENT_PROVIDER=duffel|stripe`

### **2. API Backend Extensions**

#### **Provider Interface (`apps/api/src/providers/provider.types.ts`)**
- Added `PaymentSession` interface for Duffel Pay
- Extended `Provider` interface with `createPaymentSession` method

#### **Duffel Provider (`apps/api/src/providers/duffel.provider.ts`)**
- Enhanced `createOrder` method with Duffel Pay support
- Added `createPaymentSession` method (placeholder for actual Duffel Pay endpoints)
- Support for seats and baggage in order creation

#### **Payment Controller (`apps/api/src/controllers/payments.controller.ts`)**
- Added `createDuffelPaySession` controller function
- Proper error handling and logging
- Integration with provider factory

#### **API Routes (`apps/api/src/routes/payments.route.ts`)**
- Added `/v1/payments/duffel/session` endpoint
- Validation schema for Duffel Pay session requests
- Idempotency support

#### **OpenAPI Documentation (`apps/api/src/docs/openapi-simple.yaml`)**
- Complete API documentation for Duffel Pay session endpoint
- Request/response schemas
- Error handling documentation

### **3. Frontend Components**

#### **Multi-Passenger Modal (`components/OrderModal.tsx`)**
- **Multi-traveller support**: Add/remove passengers dynamically
- **Seat preferences**: Aisle, window, extra legroom, any
- **Baggage selection**: Per-passenger baggage quantity (0-2 pieces)
- **Contact information**: Email and phone validation
- **Local storage**: Saves traveller profiles for future use
- **Payment provider switching**: Supports both Duffel Pay and Stripe
- **Validation**: Comprehensive form validation with error messages
- **Responsive design**: Works on desktop and mobile

#### **API Helper (`lib/api.ts`)**
- Added `createDuffelPaySession` function
- Enhanced `createOrder` with optional idempotency key
- TypeScript interfaces for Duffel Pay requests/responses

#### **Demo Page (`app/flights/demo/page.tsx`)**
- Interactive demonstration of the booking flow
- Mock flight offer data
- Feature checklist display

---

## 🔧 **Key Features**

### **Multi-Passenger Booking**
- ✅ Dynamic passenger addition/removal
- ✅ Individual seat preferences per passenger
- ✅ Per-passenger baggage selection
- ✅ Contact information collection
- ✅ Form validation and error handling

### **Payment Integration**
- ✅ Duffel Pay session creation
- ✅ Payment provider switching via environment variables
- ✅ Stripe fallback support
- ✅ Idempotency key support

### **User Experience**
- ✅ Local storage for traveller profiles
- ✅ Responsive modal design
- ✅ Real-time total calculation
- ✅ Clear error messages
- ✅ Loading states

---

## 🚀 **Usage Instructions**

### **1. Environment Setup**
```bash
# Set payment provider to Duffel
PAYMENT_PROVIDER=duffel
DUFFEL_PAY_ENABLED=true
DUFFEL_PAY_CALLBACK_URL=https://app.timagreentours.com/payments/duffel/callback

# Optional: Keep Stripe as fallback
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

### **2. API Usage**
```typescript
// Create Duffel Pay session
const session = await createDuffelPaySession({
  amount: 450.00,
  currency: 'USD',
  offerId: 'off_0000A3tQM8R4W98LtH5Z0k'
});

// Create order with Duffel Pay
const order = await createOrder({
  offerId: 'off_0000A3tQM8R4W98LtH5Z0k',
  contact: { email: 'user@example.com', phone: '+1234567890' },
  passengers: [
    {
      id: 'pax_1',
      given_name: 'John',
      family_name: 'Doe',
      born_on: '1990-01-01',
      type: 'adult'
    }
  ]
});
```

### **3. Component Usage**
```tsx
import { OrderModal } from '@/components/OrderModal';

<OrderModal
  open={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  offer={flightOffer}
  paymentProvider="duffel"
/>
```

---

## 🔄 **Integration Notes**

### **Duffel Pay Placeholders**
The current implementation includes placeholder calls for Duffel Pay endpoints. To complete the integration:

1. **Replace placeholder in `duffel.provider.ts`**:
   ```typescript
   // Replace this placeholder:
   return { provider: 'duffel', clientToken: undefined, redirectUrl: undefined };
   
   // With actual Duffel Pay API call:
   const r = await client.post('/payments/intents', {
     amount: params.amount,
     currency: params.currency,
     metadata: { offer_id: params.offerId },
     return_url: params.returnUrl
   });
   return { provider: 'duffel', clientToken: r.data?.client_token, redirectUrl: r.data?.redirect_url };
   ```

2. **Update order payment structure**:
   ```typescript
   // Replace placeholder payments array with actual Duffel Pay format
   orderRequest.payments = [
     { type: 'balance', amount: '450.00', currency: 'USD' }
     // OR use Duffel Pay token reference
   ];
   ```

### **Testing**
- Visit `/flights/demo` to test the multi-passenger modal
- Use browser dev tools to inspect API calls
- Check local storage for saved traveller profiles

---

## 🎯 **Next Steps**

1. **Replace Duffel Pay placeholders** with actual API endpoints
2. **Add webhook handling** for payment status updates
3. **Implement seat map integration** when Duffel provides seat data
4. **Add baggage allowance fetching** from Duffel API
5. **Add comprehensive error handling** for payment failures
6. **Implement payment retry logic**

---

## 📁 **Files Modified/Created**

### **Modified Files:**
- `env.example` - Added Duffel Pay configuration
- `apps/api/src/config.ts` - Payment provider configuration
- `apps/api/src/providers/provider.types.ts` - Extended interfaces
- `apps/api/src/providers/duffel.provider.ts` - Added payment methods
- `apps/api/src/controllers/payments.controller.ts` - Duffel Pay controller
- `apps/api/src/routes/payments.route.ts` - API routes
- `apps/api/src/docs/openapi-simple.yaml` - API documentation
- `lib/api.ts` - Client-side API helpers

### **New Files:**
- `components/OrderModal.tsx` - Multi-passenger booking modal
- `app/flights/demo/page.tsx` - Demo page
- `DUFFEL_PAY_INTEGRATION_SUMMARY.md` - This documentation

---

## ✅ **Status: Ready for Duffel Pay Integration**

The foundation is complete. Replace the placeholder Duffel Pay API calls with actual endpoints from your Duffel merchant account documentation to complete the integration.

