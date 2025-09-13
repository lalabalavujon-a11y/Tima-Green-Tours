import { NextRequest, NextResponse } from 'next/server';
import { searchTransfers, getTransferZones, getTransferRoutes } from '@/lib/transfers';
import type { TransferSearchFilters } from '@/lib/types/transfer';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Parse search filters
    const filters: TransferSearchFilters = {
      fromZone: searchParams.get('fromZone') || undefined,
      toZone: searchParams.get('toZone') || undefined,
      date: searchParams.get('date') || undefined,
      time: searchParams.get('time') || undefined,
      passengers: searchParams.get('passengers') ? parseInt(searchParams.get('passengers')!) : undefined,
      children: searchParams.get('children') ? parseInt(searchParams.get('children')!) : undefined,
      infants: searchParams.get('infants') ? parseInt(searchParams.get('infants')!) : undefined,
      luggage: searchParams.get('luggage') ? parseInt(searchParams.get('luggage')!) : undefined,
      serviceType: searchParams.get('serviceType') as 'private' | 'shared' | 'premium' || undefined,
      amenities: searchParams.get('amenities')?.split(',') || undefined,
      maxPrice: searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined,
      currency: searchParams.get('currency') || 'FJD'
    };

    // Search transfers based on filters
    const results = searchTransfers(filters);

    return NextResponse.json({
      success: true,
      results,
      filters,
      total: results.length
    });

  } catch (error) {
    console.error('Transfer search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const filters: TransferSearchFilters = body;

    // Search transfers based on filters
    const results = searchTransfers(filters);

    return NextResponse.json({
      success: true,
      results,
      filters,
      total: results.length
    });

  } catch (error) {
    console.error('Transfer search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
