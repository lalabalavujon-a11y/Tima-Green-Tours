import { NextRequest, NextResponse } from 'next/server';
import { calculateTransferQuote, isPublicHoliday } from '@/lib/transfers';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      routeId,
      serviceType,
      passengers,
      children = 0,
      infants = 0,
      luggage = 0,
      childSeats = 0,
      date,
      time
    } = body;

    // Validate required fields
    if (!routeId || !serviceType || !passengers || !date || !time) {
      return NextResponse.json(
        { error: 'Missing required fields: routeId, serviceType, passengers, date, time' },
        { status: 400 }
      );
    }

    // Validate service type
    if (!['private', 'shared', 'premium'].includes(serviceType)) {
      return NextResponse.json(
        { error: 'Invalid service type. Must be private, shared, or premium' },
        { status: 400 }
      );
    }

    // Validate passengers
    if (passengers < 1 || passengers > 8) {
      return NextResponse.json(
        { error: 'Passengers must be between 1 and 8' },
        { status: 400 }
      );
    }

    // Check if it's a public holiday
    const isHoliday = isPublicHoliday(date);

    // Calculate quote
    const quote = calculateTransferQuote(
      routeId,
      serviceType,
      passengers,
      children,
      infants,
      luggage,
      childSeats,
      date,
      time,
      isHoliday
    );

    if (!quote) {
      return NextResponse.json(
        { error: 'Unable to generate quote for the specified route and service' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      quote,
      isPublicHoliday: isHoliday
    });

  } catch (error) {
    console.error('Transfer quote error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
