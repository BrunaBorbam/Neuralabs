import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, visitors, conversionRate, ticket, annualLoss } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // TODO: Connect this to ActiveCampaign, RD Station, or another CRM.
    // For now, you can send an email via Resend or a webhook to Zapier.
    // Example CRM webhook structure:
    // await fetch(process.env.CRM_WEBHOOK_URL, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, visitors, conversionRate, ticket, annualLoss }),
    // });

    // Debug: only log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('New Lead Captured');
    }

    return NextResponse.json({ success: true, message: 'Lead captured successfully' });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Lead capture error:', error);
    }
    return NextResponse.json({ error: 'Failed to capture lead' }, { status: 500 });
  }
}
