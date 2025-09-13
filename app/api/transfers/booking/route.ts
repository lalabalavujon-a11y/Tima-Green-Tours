import { NextRequest, NextResponse } from 'next/server';
import { validateBookingData, generateBookingReference } from '@/lib/transfers';
import { calculateTransferQuote, isPublicHoliday } from '@/lib/transfers';
import type { TransferBooking } from '@/lib/types/transfer';
import Stripe from 'stripe';

const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-08-27.basil',
  });
};

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const bookingData: Partial<TransferBooking> = body;

    // Validate booking data
    const validationErrors = validateBookingData(bookingData);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    // Generate booking reference
    const bookingReference = generateBookingReference();

    // Calculate final pricing
    const quote = calculateTransferQuote(
      bookingData.transfer!.routeId,
      bookingData.transfer!.serviceId.split('-').pop() as 'private' | 'shared' | 'premium',
      bookingData.transfer!.passengers,
      bookingData.transfer!.children || 0,
      bookingData.transfer!.infants || 0,
      bookingData.transfer!.luggage || 0,
      bookingData.transfer!.childSeats || 0,
      bookingData.transfer!.date,
      bookingData.transfer!.time,
      isPublicHoliday(bookingData.transfer!.date)
    );

    if (!quote) {
      return NextResponse.json(
        { error: 'Unable to calculate pricing for this booking' },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: quote.currency.toLowerCase(),
            product_data: {
              name: `Transfer Booking - ${bookingReference}`,
              description: `Transfer from ${bookingData.transfer!.routeId} on ${bookingData.transfer!.date} at ${bookingData.transfer!.time}`,
            },
            unit_amount: Math.round(quote.totalPrice * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.nextUrl.origin}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/booking/cancelled`,
      metadata: {
        bookingReference,
        routeId: bookingData.transfer!.routeId,
        serviceId: bookingData.transfer!.serviceId,
        date: bookingData.transfer!.date,
        time: bookingData.transfer!.time,
        passengers: bookingData.transfer!.passengers.toString(),
        children: (bookingData.transfer!.children || 0).toString(),
        infants: (bookingData.transfer!.infants || 0).toString(),
        luggage: (bookingData.transfer!.luggage || 0).toString(),
        childSeats: (bookingData.transfer!.childSeats || 0).toString(),
        customerName: bookingData.customer!.name,
        customerEmail: bookingData.customer!.email,
        customerPhone: bookingData.customer!.phone,
        totalPrice: quote.totalPrice.toString(),
        currency: quote.currency
      },
      customer_email: bookingData.customer!.email,
    });

    // Create booking object (in a real app, save to database)
    const booking: TransferBooking = {
      id: bookingReference,
      bookingReference,
      customer: bookingData.customer!,
      transfer: bookingData.transfer!,
      pricing: {
        basePrice: quote.basePrice,
        surcharges: quote.surcharges,
        discounts: quote.discounts,
        totalPrice: quote.totalPrice,
        currency: quote.currency
      },
      status: 'pending',
      payment: {
        method: 'stripe',
        status: 'pending',
        stripeSessionId: session.id
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: bookingData.notes
    };

    return NextResponse.json({
      success: true,
      booking,
      checkoutUrl: session.url,
      sessionId: session.id
    });

  } catch (error) {
    console.error('Transfer booking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
