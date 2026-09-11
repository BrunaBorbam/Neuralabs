'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { MessageCircle, Send, ShieldCheck } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { trackFormSubmit } from '@/lib/ga';

type Status = 'idle' | 'loading' | 'success' | 'error';

const inputClass =
  'w-full rounded-sm border border-[#F3EDE1]/15 bg-[#322F28] px-4 py-3 text-[13.5px] text-[#F3EDE1] placeholder:text-[#F3EDE1]/35 transition-colors focus:border-[#C1552C]/60 focus:outline-none';

// Formulário real de reserva — mesma infraestrutura da CERNE
// (app/api/send-email/route.ts, source: 'ardosia'): honeypot anti-bot,
// rate limit por IP, checkbox de consentimento LGPD obrigatório. Campos
// extras (pessoas/data/horário) só existem pro contexto de reserva; a
// rota já sabe formatá-los no e-mail (ver reservaLine na API).
export const ArdosiaReservaForm = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    people: '2',
    date: '',
    time: '',
    message: '',
    website: '', // honeypot
    consent: false,
  });

  const handleChange =
    (field: 'name' | 'email' | 'phone' | 'people' | 'date' | 'time' | 'message' | 'website') =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        body: JSON.stringify({ ...form, source: 'ardosia' }),
      });

      if (!res.ok) throw new Error('Falha no envio');

      trackFormSubmit('ardosia_reserva_form');
      setStatus('success');
      setForm({
        name: '',
        email: '',
        phone: '',
        people: '2',
        date: '',
        time: '',
        message: '',
        website: '',
        consent: false,
      });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3.5">
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
        <div className="grid grid-cols-2 gap-3.5">
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
            placeholder="Telefone / WhatsApp"
            value={form.phone}
            onChange={handleChange('phone')}
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-3 gap-3.5">
          <select value={form.people} onChange={handleChange('people')} className={inputClass}>
            {['1', '2', '3', '4', '5', '6', '7', '8+'].map((n) => (
              <option key={n} value={n} className="bg-[#322F28]">
                {n} {n === '1' ? 'pessoa' : 'pessoas'}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={form.date}
            onChange={handleChange('date')}
            className={`${inputClass} [color-scheme:dark]`}
          />
          <input
            type="time"
            value={form.time}
            onChange={handleChange('time')}
            className={`${inputClass} [color-scheme:dark]`}
          />
        </div>
        <textarea
          placeholder="Alguma observação? (aniversário, restrição alimentar...)"
          value={form.message}
          onChange={handleChange('message')}
          rows={3}
          className={`${inputClass} resize-none`}
        />

        <label className="flex items-start gap-2.5 py-1 text-[11.5px] leading-relaxed text-[#D9D2C4]">
          <input
            type="checkbox"
            required
            checked={form.consent}
            onChange={(e) => setForm((prev) => ({ ...prev, consent: e.target.checked }))}
            className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 accent-[#C1552C]"
          />
          <span>
            Concordo com o uso dos meus dados para confirmação da reserva, conforme a{' '}
            <Link href="/privacy" target="_blank" className="underline hover:text-[#C1552C]">
              Política de Privacidade
            </Link>
            .
          </span>
        </label>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="mt-1 inline-flex items-center justify-center gap-2 rounded-sm bg-[#C1552C] px-8 py-4 text-[12px] font-medium uppercase tracking-[0.15em] text-[#F3EDE1] transition-colors hover:bg-[#a84523] disabled:opacity-60"
        >
          <Send className="h-4 w-4" />
          {status === 'loading' ? 'Enviando…' : 'Pedir reserva'}
        </button>

        <p className="flex items-start gap-1.5 pt-0.5 text-[10.5px] leading-relaxed text-[#D9A441]/90">
          <ShieldCheck className="h-3.5 w-3.5 flex-shrink-0" />
          Seus dados trafegam criptografados (HTTPS) e não são compartilhados com terceiros.
        </p>

        {status === 'success' && (
          <p className="text-[12.5px] text-[#D9A441]">
            Pedido recebido — confirmamos sua mesa por telefone ou e-mail em breve.
          </p>
        )}
        {status === 'error' && (
          <p className="text-[12.5px] text-red-400/90">
            {form.consent
              ? 'Não foi possível enviar agora. Tente novamente em instantes.'
              : 'É preciso concordar com a Política de Privacidade para enviar.'}
          </p>
        )}
      </form>

      <div className="flex w-full flex-col items-start gap-3 border-t border-[#F3EDE1]/10 pt-6 sm:w-auto sm:max-w-[220px] sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C1552C]/30 bg-[#C1552C]/10">
          <MessageCircle className="h-4.5 w-4.5 text-[#D9A441]" />
        </span>
        <p className="text-[12.5px] leading-relaxed text-[#D9D2C4]">
          Prefere conversar direto? Chame no WhatsApp.
        </p>
        <a
          href={getWhatsAppLink('Olá! Gostaria de reservar uma mesa na Ardósia.')}
          target="_blank"
          rel="noopener noreferrer"
          data-magnetic
          className="inline-flex items-center gap-2 rounded-sm border border-[#F3EDE1]/20 px-5 py-3 text-[11.5px] font-medium uppercase tracking-[0.14em] text-[#F3EDE1] transition-colors hover:border-[#C1552C]/60 hover:text-[#D9A441]"
        >
          <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
        </a>
      </div>
    </div>
  );
};
