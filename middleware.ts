import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_ORIGINS = [
  'https://neuralabs.online',
  'https://www.neuralabs.online',
];

export function middleware(request: NextRequest) {
  // Only apply to API routes
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Allow GET requests (no CORS check needed)
  if (request.method === 'GET') {
    return NextResponse.next();
  }

  // For POST/PUT/DELETE, validate origin
  const origin = request.headers.get('origin');

  // In development or if no origin header, allow it (localhost is treated as same-origin)
  if (process.env.NODE_ENV === 'development' || !origin) {
    return NextResponse.next();
  }

  // In production, validate origin
  if (!ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
