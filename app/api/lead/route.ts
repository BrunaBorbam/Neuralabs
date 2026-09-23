import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const { email, visitors, conversionRate, ticket, annualLoss } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Lead (Supabase not configured):', email);
      }
      return NextResponse.json({
        success: true,
        message: 'Lead captured (database not yet configured)',
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from('diagnosticos')
      .insert([
        {
          email,
          visitors,
          conversionRate,
          ticket,
          annualLoss,
          created_at: new Date().toISOString(),
          whatsapp_sent: false,
        },
      ])
      .select();

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Supabase insert error:', error);
      }
      return NextResponse.json(
        { error: 'Failed to save lead' },
        { status: 500 }
      );
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('Lead saved to Neuralabs CRM:', email);
    }

    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
      data,
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Lead capture error:', error);
    }
    return NextResponse.json({ error: 'Failed to capture lead' }, { status: 500 });
  }
}
