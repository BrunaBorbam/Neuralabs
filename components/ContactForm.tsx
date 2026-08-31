'use client';

import { useState, FormEvent } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/HeroAnimations';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { trackButtonClick, trackFormSubmit } from '@/lib/ga';

type Status = 'idle' | 'loading' | 'success' | 'error';

export const ContactForm = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '' });

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Falha no envio');

      trackFormSubmit('contact_form', { company: form.company });
      setStatus('success');
      setForm({ name: '', email: '', company: '', phone: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contato" className="py-24 px-6 bg-obsidian-800/40">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <Badge variant="primary" className="mb-4">
              Vamos Conversar
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-pearl-100 mb-4">
              Peça seu diagnóstico de conversão
            </h2>
            <p className="text-pearl-300/70 max-w-2xl mx-auto leading-relaxed">
              Conte um pouco sobre seu negócio e retornamos com uma análise em até 24 horas —
              ou fale agora mesmo pelo WhatsApp.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <Card variant="glass" className="grid md:grid-cols-[1.2fr,1fr] gap-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                required
                placeholder="Seu nome"
                value={form.name}
                onChange={handleChange('name')}
                className="bg-obsidian-900/60 border border-pearl-100/15 rounded-lg px-4 py-3 text-pearl-100 placeholder:text-pearl-300/40 focus:outline-none focus:border-blush-500/60"
              />
              <input
                type="email"
                required
                placeholder="Seu e-mail"
                value={form.email}
                onChange={handleChange('email')}
                className="bg-obsidian-900/60 border border-pearl-100/15 rounded-lg px-4 py-3 text-pearl-100 placeholder:text-pearl-300/40 focus:outline-none focus:border-blush-500/60"
              />
              <input
                type="text"
                placeholder="Empresa (opcional)"
                value={form.company}
                onChange={handleChange('company')}
                className="bg-obsidian-900/60 border border-pearl-100/15 rounded-lg px-4 py-3 text-pearl-100 placeholder:text-pearl-300/40 focus:outline-none focus:border-blush-500/60"
              />
              <input
                type="tel"
                placeholder="WhatsApp (opcional)"
                value={form.phone}
                onChange={handleChange('phone')}
                className="bg-obsidian-900/60 border border-pearl-100/15 rounded-lg px-4 py-3 text-pearl-100 placeholder:text-pearl-300/40 focus:outline-none focus:border-blush-500/60"
              />

              <Button
                type="submit"
                variant="primary"
                icon={<Send className="w-4 h-4" />}
                loading={status === 'loading'}
                disabled={status === 'loading'}
              >
                Enviar diagnóstico
              </Button>

              {status === 'success' && (
                <p className="text-sm text-blush-300">Recebemos sua mensagem! Em breve entramos em contato.</p>
              )}
              {status === 'error' && (
                <p className="text-sm text-red-400">Não foi possível enviar agora. Tente novamente ou use o WhatsApp.</p>
              )}
            </form>

            <div className="flex flex-col justify-center items-start gap-4 border-t md:border-t-0 md:border-l border-pearl-100/10 pt-8 md:pt-0 md:pl-10">
              <span className="w-12 h-12 rounded-full bg-blush-500/10 border border-blush-500/30 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-blush-300" />
              </span>
              <p className="text-pearl-300/70 leading-relaxed">
                Prefere resposta imediata? Fale direto com a gente pelo WhatsApp.
              </p>
              <a
                href={getWhatsAppLink('Olá! Quero solicitar um diagnóstico de conversão do meu site.')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackButtonClick('diagnostico_whatsapp', 'contact_form')}
              >
                <Button variant="secondary">Diagnóstico no WhatsApp</Button>
              </a>
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
};
