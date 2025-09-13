import { NextRequest, NextResponse } from 'next/server';
import { getAvailableTimeSlots, isServiceAvailable } from '@/lib/transfers';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const routeId = searchParams.get('routeId');
    const serviceId = searchParams.get('serviceId');
    const date = searchParams.get('date');

    // Validate required parameters
    if (!routeId || !serviceId || !date) {
      return NextResponse.json(
        { error: 'Missing required parameters: routeId, serviceId, date' },
        { status: 400 }
      );
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return NextResponse.json(
        { error: 'Invalid date format. Use YYYY-MM-DD' },
        { status: 400 }
      );
    }

    // Check if service is available for the route
    const isAvailable = isServiceAvailable(routeId, serviceId, date, '12:00'); // Check with a default time
    if (!isAvailable) {
      return NextResponse.json({
        success: true,
        available: false,
        message: 'Service not available for this route and date'
      });
    }

    // Get available time slots
    const timeSlots = getAvailableTimeSlots(routeId, serviceId, date);

    return NextResponse.json({
      success: true,
      available: true,
      date,
      routeId,
      serviceId,
      timeSlots
    });

  } catch (error) {
    console.error('Transfer availability error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
