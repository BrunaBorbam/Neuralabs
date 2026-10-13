/**
 * Preview-only access gate for the isolated Neuralabs 2.0 prototype.
 * No real authentication credentials are committed to the repository.
 * This proxy is intentionally scoped to /neuralabs-2 and never runs on
 * the published Neuralabs routes or APIs.
 *
 * Set NEURALABS_PREVIEW_USER and NEURALABS_PREVIEW_PASSWORD in Vercel's
 * **Preview only** environment. If either is missing, fail closed.
 */
import { NextResponse, type NextRequest } from 'next/server';
import { timingSafeEqual } from 'node:crypto';

const privateHeaders = {
  'Cache-Control': 'private, no-store, max-age=0',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
};

export function proxy(request: NextRequest) {
  const user = process.env.NEURALABS_PREVIEW_USER;
  const password = process.env.NEURALABS_PREVIEW_PASSWORD;

  if (!user || !password) {
    return new NextResponse('Neuralabs 2.0 preview is locked until its Preview credentials are configured.', {
      status: 503,
      headers: privateHeaders,
    });
  }

  const supplied = Buffer.from(request.headers.get('authorization') ?? '', 'utf8');
  const expected = Buffer.from('Basic ' + Buffer.from(user + ':' + password, 'utf8').toString('base64'), 'utf8');
  const isAuthorized =
    supplied.byteLength === expected.byteLength && timingSafeEqual(supplied, expected);

  if (!isAuthorized) {
    return new NextResponse('Authentication required for the Neuralabs 2.0 preview.', {
      status: 401,
      headers: {
        ...privateHeaders,
        'WWW-Authenticate': 'Basic realm="Neuralabs 2.0 Private Preview", charset="UTF-8"',
      },
    });
  }

  const response = NextResponse.next();
  Object.entries(privateHeaders).forEach(([key, value]) => response.headers.set(key, value));
  return response;
}

export const config = {
  matcher: ['/neuralabs-2/:path*'],
};
