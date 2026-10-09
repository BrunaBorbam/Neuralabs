import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { enforceFormRateLimit } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  const limited = await enforceFormRateLimit(req, 'contact');
  if (limited) return limited;
  try {
    const body: unknown = await req.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    const input = body as Record<string, unknown>;
    // Honeypot field: bots receive no information about storage.
    if (input.website) {
      return NextResponse.json({ success: true }, { status: 200 });
    }
    const name = typeof input.name === 'string' ? input.name.trim() : '';
    const email = typeof input.email === 'string' ? input.email.trim().toLowerCase() : '';
    const company = typeof input.company === 'string' ? input.company.trim() : '';
    const phone = typeof input.phone === 'string' ? input.phone.trim() : '';

    if (
      !name || name.length > 150 ||
      email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      company.length > 200 || phone.length > 50
    ) {
      return NextResponse.json({ error: 'Invalid form values' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from('contatos').insert({
      name, email,
      company: company || null,
      phone: phone || null,
      source: 'site',
    });

    if (error) {
      return NextResponse.json({ error: 'Could not save request' }, { status: 503 });
    }
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }
}
