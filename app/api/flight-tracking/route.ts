import { NextRequest, NextResponse } from 'next/server';

interface FlightInfo {
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  scheduledArrival: string;
  estimatedArrival: string;
  status: 'on-time' | 'delayed' | 'early' | 'cancelled';
  delayMinutes: number;
}

interface BookingWithFlight {
  bookingId: string;
  customerPhone: string;
  customerName: string;
  flightNumber: string;
  pickupTime: string;
  transferDate: string;
  routeId: string;
}

// Mock flight data - in real implementation, this would integrate with flight APIs
const mockFlightData: Record<string, FlightInfo> = {
  'FJ910': {
    flightNumber: 'FJ910',
    airline: 'Fiji Airways',
    origin: 'Sydney',
    destination: 'Nadi',
    scheduledArrival: '2024-01-15T14:30:00Z',
    estimatedArrival: '2024-01-15T14:45:00Z',
    status: 'delayed',
    delayMinutes: 15
  },
  'FJ811': {
    flightNumber: 'FJ811',
    airline: 'Fiji Airways',
    origin: 'Los Angeles',
    destination: 'Nadi',
    scheduledArrival: '2024-01-15T06:15:00Z',
    estimatedArrival: '2024-01-15T06:15:00Z',
    status: 'on-time',
    delayMinutes: 0
  },
  'QF101': {
    flightNumber: 'QF101',
    airline: 'Qantas',
    origin: 'Melbourne',
    destination: 'Nadi',
    scheduledArrival: '2024-01-15T12:00:00Z',
    estimatedArrival: '2024-01-15T11:45:00Z',
    status: 'early',
    delayMinutes: -15
  }
};

// Mock bookings with flight info
const mockBookings: BookingWithFlight[] = [
  {
    bookingId: 'TGT-ABC123',
    customerPhone: '+6791234567',
    customerName: 'John Smith',
    flightNumber: 'FJ910',
    pickupTime: '15:00',
    transferDate: '2024-01-15',
    routeId: 'nadi-airport-denarau'
  },
  {
    bookingId: 'TGT-DEF456',
    customerPhone: '+6799876543',
    customerName: 'Sarah Johnson',
    flightNumber: 'FJ811',
    pickupTime: '07:00',
    transferDate: '2024-01-15',
    routeId: 'nadi-airport-coral-coast'
  }
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const flightNumber = searchParams.get('flight');
    const bookingId = searchParams.get('booking');

    if (flightNumber) {
      const flightInfo = mockFlightData[flightNumber];
      if (!flightInfo) {
        return NextResponse.json(
          { error: 'Flight not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, flight: flightInfo });
    }

    if (bookingId) {
      const booking = mockBookings.find(b => b.bookingId === bookingId);
      if (!booking) {
        return NextResponse.json(
          { error: 'Booking not found' },
          { status: 404 }
        );
      }

      const flightInfo = mockFlightData[booking.flightNumber];
      if (!flightInfo) {
        return NextResponse.json(
          { error: 'Flight information not available' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        booking,
        flight: flightInfo
      });
    }

    return NextResponse.json(
      { error: 'Flight number or booking ID required' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Flight tracking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, bookingId, flightNumber } = body;

    if (action === 'check-delays') {
      // Check for delays and send notifications
      const bookingsToCheck = bookingId 
        ? mockBookings.filter(b => b.bookingId === bookingId)
        : mockBookings;

      const notifications = [];

      for (const booking of bookingsToCheck) {
        const flightInfo = mockFlightData[booking.flightNumber];
        if (flightInfo && flightInfo.status === 'delayed' && flightInfo.delayMinutes > 0) {
          const newPickupTime = calculateNewPickupTime(
            booking.pickupTime,
            flightInfo.delayMinutes
          );

          notifications.push({
            bookingId: booking.bookingId,
            customerName: booking.customerName,
            customerPhone: booking.customerPhone,
            flightNumber: booking.flightNumber,
            delayMinutes: flightInfo.delayMinutes,
            originalPickupTime: booking.pickupTime,
            newPickupTime,
            message: generateDelayMessage(booking, flightInfo, newPickupTime)
          });
        }
      }

      // In real implementation, send SMS notifications here
      console.log('SMS Notifications to send:', notifications);

      return NextResponse.json({
        success: true,
        notificationsSent: notifications.length,
        notifications
      });
    }

    if (action === 'send-update') {
      const { message, phone } = body;
      
      // In real implementation, integrate with SMS service (Twilio, etc.)
      console.log(`SMS to ${phone}: ${message}`);
      
      return NextResponse.json({
        success: true,
        message: 'SMS sent successfully'
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Flight tracking POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function calculateNewPickupTime(originalTime: string, delayMinutes: number): string {
  const [hours, minutes] = originalTime.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + delayMinutes;
  const newHours = Math.floor(totalMinutes / 60);
  const newMinutes = totalMinutes % 60;
  return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
}

function generateDelayMessage(booking: BookingWithFlight, flight: FlightInfo, newPickupTime: string): string {
  return `Bula ${booking.customerName}! Your flight ${flight.flightNumber} is delayed by ${flight.delayMinutes} minutes. Your pickup time has been updated to ${newPickupTime}. We'll monitor your flight and keep you updated. Vinaka! - Tima Green Tours`;
}
