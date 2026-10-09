import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthorized } from '@/lib/admin-auth';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  if (!isAdminAuthorized(req.headers.get('authorization'))) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="Neuralabs CRM"', 'Cache-Control': 'no-store' } },
    );
  }
  try {
    const { data, error } = await getSupabaseAdmin()
      .from('diagnosticos')
      .select('id,email,visitors,conversion_rate,ticket,annual_loss,created_at')
      .order('created_at', { ascending: false })
      .limit(100);
    if (error) return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
    return NextResponse.json({ data }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }
}
