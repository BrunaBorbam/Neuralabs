'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { MessageCircle, Send, ShieldCheck } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { trackFormSubmit } from '@/lib/ga';

type Status = 'idle' | 'loading' | 'success' | 'error';

const inputClass =
  'w-full rounded-sm border border-[#2A2C22]/15 bg-white px-4 py-3 text-[13.5px] text-[#2A2C22] placeholder:text-[#2A2C22]/35 transition-colors focus:border-[#6B7A4E]/60 focus:outline-none';

export const CerneContactForm = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    website: '', // honeypot
    consent: false,
  });

  const handleChange =
    (field: 'name' | 'email' | 'phone' | 'message' | 'website') =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.consent) {
      setStatus('error');
      return;
    }
    setStatus('loading');

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'cerne' }),
      });

      if (!res.ok) throw new Error('Falha no envio');

      trackFormSubmit('cerne_contact_form');
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '', website: '', consent: false });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3.5">
        {/* Honeypot anti-bot: real visitors never see this field (hidden
            off-screen, out of tab order and autofill), but a bot filling
            every input blindly will populate it — the API rejects silently
            whenever it arrives non-empty, so a bot gets no signal to adapt. */}
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={handleChange('website')}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-px w-px opacity-0"
        />
        <input
          type="text"
          required
          placeholder="Seu nome"
          value={form.name}
          onChange={handleChange('name')}
          className={inputClass}
        />
        <input
          type="email"
          required
          placeholder="Seu e-mail"
          value={form.email}
          onChange={handleChange('email')}
          className={inputClass}
        />
        <input
          type="tel"
          placeholder="Telefone / WhatsApp (opcional)"
          value={form.phone}
          onChange={handleChange('phone')}
          className={inputClass}
        />
        <textarea
          placeholder="Conte um pouco sobre o espaço e a ideia (opcional)"
          value={form.message}
          onChange={handleChange('message')}
          rows={3}
          className={`${inputClass} resize-none`}
        />

        <label className="flex items-start gap-2.5 py-1 text-[11.5px] leading-relaxed text-[#55584A]">
          <input
            type="checkbox"
            required
            checked={form.consent}
            onChange={(e) => setForm((prev) => ({ ...prev, consent: e.target.checked }))}
            className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 accent-[#6B7A4E]"
          />
          <span>
            Concordo com o uso dos meus dados para retorno de contato, conforme a{' '}
            <Link href="/privacy" target="_blank" className="underline hover:text-[#6B7A4E]">
              Política de Privacidade
            </Link>
            .
          </span>
        </label>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="mt-1 inline-flex items-center justify-center gap-2 rounded-sm bg-[#2A2C22] px-8 py-4 text-[12px] font-medium uppercase tracking-[0.15em] text-[#F5F4EE] transition-colors hover:bg-[#6B7A4E] disabled:opacity-60"
        >
          <Send className="h-4 w-4" />
          {status === 'loading' ? 'Enviando…' : 'Enviar mensagem'}
        </button>

        <p className="flex items-start gap-1.5 pt-0.5 text-[10.5px] leading-relaxed text-[#576141]/80">
          <ShieldCheck className="h-3.5 w-3.5 flex-shrink-0" />
          Seus dados trafegam criptografados (HTTPS) e não são compartilhados com terceiros.
        </p>

        {status === 'success' && (
          <p className="text-[12.5px] text-[#6B7A4E]">
            Mensagem enviada — respondemos pessoalmente em até um dia útil.
          </p>
        )}
        {status === 'error' && (
          <p className="text-[12.5px] text-red-700/80">
            {form.consent
              ? 'Não foi possível enviar agora. Tente novamente em instantes.'
              : 'É preciso concordar com a Política de Privacidade para enviar.'}
          </p>
        )}
      </form>

      <div className="flex w-full flex-col items-start gap-3 border-t border-[#2A2C22]/10 pt-6 sm:w-auto sm:max-w-[220px] sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#6B7A4E]/25 bg-[#6B7A4E]/10">
          <MessageCircle className="h-4.5 w-4.5 text-[#576141]" />
        </span>
        <p className="text-[12.5px] leading-relaxed text-[#55584A]">
          Prefere conversar direto? Chame no WhatsApp.
        </p>
        <a
          href={getWhatsAppLink(
            'Olá! Vi o portfólio da CERNE e gostaria de conversar sobre um projeto de marcenaria.'
          )}
          target="_blank"
          rel="noopener noreferrer"
          data-magnetic
          className="inline-flex items-center gap-2 rounded-sm border border-[#2A2C22]/20 px-5 py-3 text-[11.5px] font-medium uppercase tracking-[0.14em] text-[#2A2C22] transition-colors hover:border-[#6B7A4E]/50 hover:text-[#6B7A4E]"
        >
          <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
        </a>
      </div>
    </div>
  );
};
