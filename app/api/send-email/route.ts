import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 503 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, company, phone } = await req.json();

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send email to user
    const userEmailResult = await resend.emails.send({
      from: 'Neuralabs <onboarding@resend.dev>',
      to: email,
      subject: '🧠 Seu diagnóstico de conversão chegou!',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #FF8C00; font-size: 24px; margin-bottom: 20px;">Obrigado, ${name}!</h1>

          <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Recebemos sua solicitação de diagnóstico de conversão 🎯
          </p>

          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #FF8C00; margin-top: 0;">Dados recebidos:</h2>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${company ? `<p><strong>Empresa:</strong> ${company}</p>` : ''}
            ${phone ? `<p><strong>WhatsApp:</strong> ${phone}</p>` : ''}
          </div>

          <p style="color: #666; font-size: 14px; line-height: 1.6;">
            Nosso time vai analisar seu site e enviar um diagnóstico completo em até 24 horas.
            <br><br>
            Enquanto isso, confira nossos estudos de caso sobre como aumentamos conversão em 20-40% com neuromarketing e design 3D.
          </p>

          <div style="background: #0A0E27; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <p style="margin: 0; font-size: 14px;">
              💡 <strong>Dica:</strong> Prepare-se para novas estratégias de conversão!
            </p>
          </div>

          <p style="color: #999; font-size: 12px; text-align: center; margin-top: 40px;">
            © 2026 Neuralabs. Onde Neurociência Vira Conversão.
          </p>
        </div>
      `,
    });

    if (userEmailResult.error) {
      console.error('Error sending user email:', userEmailResult.error);
      return NextResponse.json(
        { error: 'Failed to send confirmation email' },
        { status: 500 }
      );
    }

    // Send notification to admin
    try {
      await resend.emails.send({
        from: 'Neuralabs <onboarding@resend.dev>',
        to: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'admin@neuralabs.online',
        subject: `🧠 Novo Lead: ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif;">
            <h2>Novo Lead Recebido</h2>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${company ? `<p><strong>Empresa:</strong> ${company}</p>` : ''}
            ${phone ? `<p><strong>WhatsApp:</strong> ${phone}</p>` : ''}
            <hr>
            <p style="color: #999; font-size: 12px;">Enviado em: ${new Date().toLocaleString('pt-BR')}</p>
          </div>
        `,
      });
    } catch (error) {
      console.error('Error sending admin notification:', error);
      // Don't fail the request if admin email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully',
        messageId: userEmailResult.data?.id
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
