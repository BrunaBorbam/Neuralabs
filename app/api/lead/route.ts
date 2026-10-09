import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { enforceFormRateLimit } from '@/lib/rate-limit';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const limited = await enforceFormRateLimit(req, 'lead');
  if (limited) return limited;
  try {
    const body: unknown = await req.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    const input = body as Record<string, unknown>;
    const email = typeof input.email === 'string' ? input.email.trim().toLowerCase() : '';
    const visitors = Number(input.visitors);
    const conversionRate = Number(input.conversionRate);
    const ticket = Number(input.ticket);

    if (
      email.length > 254 || !emailPattern.test(email) ||
      !Number.isInteger(visitors) || visitors < 0 || visitors > 10000000 ||
      !Number.isFinite(conversionRate) || conversionRate < 0 || conversionRate > 100 ||
      !Number.isFinite(ticket) || ticket < 0 || ticket > 100000000
    ) {
      return NextResponse.json({ error: 'Invalid form values' }, { status: 400 });
    }

    // Do not trust a financial estimate supplied by the browser.
    const annualLoss = visitors * Math.max(0, 4.5 - conversionRate) / 100 * ticket * 12;
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from('diagnosticos').insert({
      email,
      visitors,
      conversion_rate: conversionRate,
      ticket,
      annual_loss: annualLoss,
    });

    if (error) {
      return NextResponse.json({ error: 'Could not save request' }, { status: 503 });
    }
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }
}
