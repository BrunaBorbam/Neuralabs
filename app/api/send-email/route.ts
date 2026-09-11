import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

// Anything typed here is interpolated straight into the HTML email body
// below (both the copy sent to the visitor AND the internal lead
// notification), so it must never reach that template unescaped — an
// attacker filling "name" with markup could otherwise get arbitrary HTML
// (a fake link, a tracking pixel, a phishing pitch) delivered from our own
// verified sending domain, to whatever address they typed in "email".
// Escaping here is the single fix that closes that off.
const escapeHtml = (value: unknown) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Extremely small, dependency-free abuse guard for a public POST endpoint
// that has no auth and triggers a real, metered send on every call. Not a
// substitute for a proper WAF/rate-limiter, but it stops the trivial case
// (a script hammering this route) from burning through the Resend quota or
// flooding the lead inbox. State is per warm serverless instance — it
// resets on cold start / across regions, which is an accepted trade-off
// for "no extra infra" over "no protection at all".
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
};

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { name, email, company, phone, website, message, source } = body;

    // Honeypot: a field real visitors never see or fill (hidden off-screen
    // in ContactForm.tsx / CerneContactForm.tsx), but most bots fill every
    // input blindly. Silently report success instead of erroring, so a bot
    // gets no signal to adapt.
    if (website) {
      return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });
    }

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

    // Consent (LGPD): only enforced when the caller actually sends a
    // `consent` field — CerneContactForm always does (checkbox required),
    // while the original ContactForm.tsx predates this and never sends one,
    // so it's left untouched rather than silently broken.
    if (Object.prototype.hasOwnProperty.call(body, 'consent') && body.consent !== true) {
      return NextResponse.json(
        { error: 'Consent is required' },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = company ? escapeHtml(company) : '';
    const safePhone = phone ? escapeHtml(phone) : '';
    const safeMessage = message ? escapeHtml(message).replace(/\n/g, '<br>') : '';
    const isCerne = source === 'cerne';

    // Send email to user
    const userEmailResult = await resend.emails.send(
      isCerne
        ? {
            from: 'CERNE <onboarding@resend.dev>',
            to: email,
            subject: 'Recebemos sua mensagem — CERNE',
            html: `
              <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #F5F4EE; color: #2A2C22;">
                <h1 style="font-weight: 400; font-size: 24px; margin-bottom: 16px;">Obrigado, ${safeName}.</h1>
                <p style="font-size: 15px; line-height: 1.8; margin-bottom: 20px;">
                  Recebemos sua mensagem sobre o seu projeto. Atendemos um número limitado
                  de projetos por trimestre e respondemos pessoalmente — em até um dia útil.
                </p>
                <div style="background: #ffffff; padding: 20px; border-radius: 2px; margin-bottom: 20px; border: 1px solid rgba(42,44,34,0.1);">
                  <p style="margin: 0 0 8px;"><strong>Nome:</strong> ${safeName}</p>
                  <p style="margin: 0 0 8px;"><strong>Email:</strong> ${safeEmail}</p>
                  ${safePhone ? `<p style="margin: 0 0 8px;"><strong>Telefone:</strong> ${safePhone}</p>` : ''}
                  ${safeMessage ? `<p style="margin: 8px 0 0;"><strong>Mensagem:</strong><br>${safeMessage}</p>` : ''}
                </div>
                <p style="font-size: 12px; color: rgba(42,44,34,0.55); margin-top: 32px;">
                  Demonstração de portfólio desenvolvida por NEURALABS Studio.
                </p>
              </div>
            `,
          }
        : {
            from: 'Neuralabs <onboarding@resend.dev>',
            to: email,
            subject: '🧠 Recebemos sua solicitação de diagnóstico!',
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0B0A0E;">
                <h1 style="color: #B98CA8; font-size: 24px; margin-bottom: 20px;">Obrigado, ${safeName}!</h1>

                <p style="color: #FAF7F2; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                  Recebemos sua solicitação de diagnóstico de conversão 🎯
                </p>

                <div style="background: #1D1B24; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid rgba(250,247,242,0.1);">
                  <h2 style="color: #B98CA8; margin-top: 0;">Dados recebidos:</h2>
                  <p style="color: #FAF7F2;"><strong>Nome:</strong> ${safeName}</p>
                  <p style="color: #FAF7F2;"><strong>Email:</strong> ${safeEmail}</p>
                  ${safeCompany ? `<p style="color: #FAF7F2;"><strong>Empresa:</strong> ${safeCompany}</p>` : ''}
                  ${safePhone ? `<p style="color: #FAF7F2;"><strong>WhatsApp:</strong> ${safePhone}</p>` : ''}
                </div>

                <p style="color: #F0EAE1; font-size: 14px; line-height: 1.6;">
                  Nosso time vai analisar seu site e enviar um diagnóstico completo em até 24 horas.
                </p>

                <div style="background: linear-gradient(135deg, #C89DB5, #9E7089); color: #0B0A0E; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                  <p style="margin: 0; font-size: 14px; font-weight: 600;">
                    💡 Enquanto isso, qualquer dúvida é só chamar no WhatsApp — respondemos direto, sem robô.
                  </p>
                </div>

                <p style="color: #999; font-size: 12px; text-align: center; margin-top: 40px;">
                  © 2026 Neuralabs. Onde Neurociência Vira Conversão.
                </p>
              </div>
            `,
          }
    );

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
        from: isCerne ? 'CERNE Demo <onboarding@resend.dev>' : 'Neuralabs <onboarding@resend.dev>',
        to: process.env.CONTACT_EMAIL || 'admin@neuralabs.online',
        subject: isCerne ? `Novo contato via demo CERNE: ${safeName}` : `🧠 Novo Lead: ${safeName}`,
        html: `
          <div style="font-family: Arial, sans-serif;">
            <h2>${isCerne ? 'Novo contato (demo CERNE)' : 'Novo Lead Recebido'}</h2>
            <p><strong>Nome:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            ${safeCompany ? `<p><strong>Empresa:</strong> ${safeCompany}</p>` : ''}
            ${safePhone ? `<p><strong>WhatsApp:</strong> ${safePhone}</p>` : ''}
            ${safeMessage ? `<p><strong>Mensagem:</strong><br>${safeMessage}</p>` : ''}
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
