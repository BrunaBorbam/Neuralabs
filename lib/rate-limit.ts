import 'server-only';
import { createHmac } from 'node:crypto';
import { NextResponse } from 'next/server';

// One shared 60-minute limit + one 15-minute per-form limit, across instances.
// EVAL executes the read/check/increment/expiry atomically.
const LIMIT_SCRIPT = [
  'local shared = tonumber(redis.call("GET", KEYS[1]) or "0")',
  'local scoped = tonumber(redis.call("GET", KEYS[2]) or "0")',
  'if shared >= tonumber(ARGV[1]) or scoped >= tonumber(ARGV[2]) then',
  '  local retry = math.max(redis.call("TTL", KEYS[1]), redis.call("TTL", KEYS[2]))',
  '  return {0, math.max(1, retry)}',
  'end',
  'local total = redis.call("INCR", KEYS[1])',
  'if total == 1 then redis.call("EXPIRE", KEYS[1], tonumber(ARGV[3])) end',
  'local count = redis.call("INCR", KEYS[2])',
  'if count == 1 then redis.call("EXPIRE", KEYS[2], tonumber(ARGV[4])) end',
  'return {1, 0}',
].join('\n');

type PublicForm = 'contact' | 'lead' | 'email';
type RedisResult = { result?: unknown; error?: string };

const reject = (status: 429 | 503, retryAfter: number) =>
  NextResponse.json(
    { error: status === 429 ? 'Too many requests. Please try later.' : 'Form temporarily unavailable.' },
    { status, headers: { 'Retry-After': String(retryAfter), 'Cache-Control': 'no-store' } },
  );

export async function enforceFormRateLimit(
  req: Request,
  form: PublicForm,
): Promise<NextResponse | null> {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  // Do not silently disable protection if credentials are missing/broken.
  if (!url || !token) return reject(503, 60);

  const ip = req.headers.get('x-vercel-forwarded-for')
    || req.headers.get('x-forwarded-for');
  // Vercel overwrites forwarded IP; do not trust other, client-supplied IP headers.
  // A missing trusted IP in production must not turn everyone into one shared key.
  if (!ip && process.env.NODE_ENV !== 'development') return reject(503, 60);
  const clientIp = (ip || '127.0.0.1').split(',')[0].trim();
  if (!clientIp || clientIp.length > 80) return reject(503, 60);

  const hashedIp = createHmac('sha256', token).update(clientIp).digest('hex');
  const base = 'neuralabs:forms:v1:' + hashedIp;
  const scoped = base + ':' + form;

  try {
    const endpoint = new URL(url);
    if (endpoint.protocol !== 'https:') return reject(503, 60);

    const res = await fetch(endpoint.toString(), {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        'EVAL', LIMIT_SCRIPT, 2, base, scoped,
        10, 3, 3600, 900,
      ]),
      cache: 'no-store',
      signal: AbortSignal.timeout(3000),
    });

    if (!res.ok) return reject(503, 60);
    const data: RedisResult = await res.json();
    const result = data.result;

    if (data.error || !Array.isArray(result) || result.length !== 2) return reject(503, 60);
    if (result[0] === 1) return null;
    if (result[0] === 0 && Number.isFinite(Number(result[1]))) {
      return reject(429, Math.max(1, Math.ceil(Number(result[1]))));
    }
    return reject(503, 60);
  } catch {
    return reject(503, 60);
  }
}
