'use client';

import { Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/HeroAnimations';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { trackButtonClick } from '@/lib/ga';

const DELIVERABLES = [
  'Projeto exclusivo e sob medida (sem templates prontos)',
  'Arquitetura de Neuromarketing & Psicologia de Compra',
  'SEO de Intenção no Google & Otimização para IAs (ChatGPT/Gemini)',
  '30 dias de suporte dedicado e revisões ilimitadas inclusas',
  'Processo 100% assíncrono e direto por WhatsApp e E-mail (sem reuniões longas)',
  '100% responsivo para celular e conformidade total com a LGPD',
];

export const Pricing = () => {
  return (
    <section id="precos" className="py-24 px-6 bg-obsidian-900">
      <div className="max-w-2xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <Badge variant="primary" className="mb-4">
              Investimento Transparente
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-pearl-100 mb-4">
              Sem letras miúdas, sem surpresas
            </h2>
            <p className="text-pearl-300/70 max-w-2xl mx-auto leading-relaxed">
              Um único projeto sob medida, sem mensalidades — pensado para converter desde o
              primeiro dia no ar.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <Card variant="accent" className="flex flex-col text-center items-center">
            <h3 className="text-lg font-bold text-pearl-100 mb-1">
              Website Premium (Projeto Completo Sob Medida)
            </h3>
            <p className="text-sm text-pearl-300/60 mb-6">
              Investimento único • Entrega ágil em 7 a 10 dias úteis
            </p>

            <div className="mb-2">
              <span className="text-3xl md:text-4xl font-serif font-black text-pearl-100">
                R$ 5.000 – R$ 8.000
              </span>
            </div>
            <p className="text-xs text-pearl-300/50 mb-8">
              ou $1,500 – $2,500 USD para clientes internacionais
            </p>

            <ul className="flex flex-col gap-3 mb-8 text-left w-full max-w-md">
              {DELIVERABLES.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-pearl-300/80">
                  <Check className="w-4 h-4 text-blush-400 flex-shrink-0 mt-0.5" />
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href={getWhatsAppLink('Olá! Quero solicitar um diagnóstico e proposta para o Website Premium.')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick('pricing_cta', 'Website Premium')}
              className="w-full"
            >
              <Button variant="primary" className="w-full">
                Solicitar Diagnóstico e Proposta no WhatsApp →
              </Button>
            </a>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
};
