import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  if (url.pathname.startsWith('/staff')) {
    const key = req.headers.get('x-staff-key') || url.searchParams.get('key');
    if (!process.env.NEXT_PUBLIC_STAFF_KEY || key !== process.env.NEXT_PUBLIC_STAFF_KEY) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ['/staff/:path*'] };
