import 'server-only';
import { createHash, timingSafeEqual } from 'node:crypto';

const constantTimeEquals = (a: string, b: string) => {
  const first = createHash('sha256').update(a).digest();
  const second = createHash('sha256').update(b).digest();
  return timingSafeEqual(first, second);
};

export function isAdminAuthorized(authorization: string | null): boolean {
  const user = process.env.CRM_ADMIN_USER;
  const password = process.env.CRM_ADMIN_PASSWORD;

  // Fail closed: no default credentials and no weak/empty password.
  if (!user || !password || password.length < 16 || !authorization) return false;

  const [scheme, encoded, extra] = authorization.split(' ');
  if (scheme?.toLowerCase() !== 'basic' || !encoded || extra) return false;

  try {
    const decoded = Buffer.from(encoded, 'base64').toString('utf8');
    const separator = decoded.indexOf(':');
    if (separator <= 0) return false;
    const providedUser = decoded.slice(0, separator);
    const providedPassword = decoded.slice(separator + 1);
    return constantTimeEquals(providedUser, user) &&
      constantTimeEquals(providedPassword, password);
  } catch {
    return false;
  }
}
