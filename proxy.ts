import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { isAdminAuthorized } from '@/lib/admin-auth';

// Next.js 16 proxy: blocks the CRM HTML before it is rendered.
export function proxy(request: NextRequest) {
  if (!isAdminAuthorized(request.headers.get('authorization'))) {
    return new NextResponse('Acesso restrito ao CRM Neuralabs', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Neuralabs CRM", charset="UTF-8"',
        'Cache-Control': 'private, no-store',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });
  }

  const response = NextResponse.next();
  response.headers.set('Cache-Control', 'private, no-store');
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
}

export const config = {
  matcher: ['/dashboard/diagnosticos/:path*'],
};
