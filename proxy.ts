/**
 * Neuralabs 2.0 branch-only Preview guard.
 *
 * /neuralabs-2 always requires Basic Auth (fail closed).
 * The two linked conceptual demos are also Basic Auth-protected in the
 * Neuralabs 2.0 Preview branch, but are NOT changed on Production or
 * other preview branches. The legacy demo mail endpoint is blocked
 * only for this Preview branch to avoid accidentally sending real leads.
 *
 * Credentials live only in branch-scoped Vercel Preview environment
 * variables. No credentials or tokens are committed to Git.
 */
import { NextResponse, type NextRequest } from 'next/server';
import { timingSafeEqual } from 'node:crypto';

const reviewBranch = 'feat/neuralabs-2-prototipo-20261013';
const privateHeaders = {
  'Cache-Control': 'private, no-store, max-age=0',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
};

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const user = process.env.NEURALABS_PREVIEW_USER;
  const password = process.env.NEURALABS_PREVIEW_PASSWORD;
  const isPreview = process.env.VERCEL_ENV === 'preview';
  const branchIdentified = process.env.VERCEL_GIT_COMMIT_REF === reviewBranch;
  const isNeuralabs2Preview =
    isPreview && (branchIdentified || Boolean(user) || Boolean(password));

  // No API access is needed for the prototype. Prevent demo forms from
  // emailing or persisting personal data in this branch's Preview.
  if (path === '/api/send-email') {
    if (isNeuralabs2Preview) {
      return new NextResponse('Preview forms are disabled. No information was submitted.', {
        status: 403,
        headers: privateHeaders,
      });
    }
    return NextResponse.next();
  }

  const prototypePath = path === '/neuralabs-2' || path.startsWith('/neuralabs-2/');
  const legacyDemoPath = path.startsWith('/demo/airbnb') || path.startsWith('/demo/marcenaria');
  if (!prototypePath && !(legacyDemoPath && isNeuralabs2Preview)) {
    return NextResponse.next();
  }

  if (!user || !password) {
    return new NextResponse('Neuralabs 2.0 private preview is locked until its credentials are configured.', {
      status: 503,
      headers: privateHeaders,
    });
  }

  const supplied = Buffer.from(request.headers.get('authorization') ?? '', 'utf8');
  const expected = Buffer.from(
    'Basic ' + Buffer.from(user + ':' + password, 'utf8').toString('base64'),
    'utf8',
  );
  const isAuthorized = supplied.byteLength === expected.byteLength &&
    timingSafeEqual(supplied, expected);

  if (!isAuthorized) {
    return new NextResponse('Authentication required for the Neuralabs 2.0 private preview.', {
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
  matcher: [
    '/neuralabs-2/:path*',
    '/demo/airbnb/:path*',
    '/demo/marcenaria/:path*',
    '/api/send-email',
  ],
};
