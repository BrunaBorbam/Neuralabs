'use client';

import { Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/HeroAnimations';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { trackButtonClick } from '@/lib/ga';

interface Plan {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlight?: boolean;
}

const plans: Plan[] = [
  {
    name: 'Website Premium',
    price: 'R$ 5.000 – R$ 8.000',
    description: 'Projeto único: da estratégia de conversão ao lançamento.',
    features: [
      'Design exclusivo na psicologia do seu nicho',
      'SEO de intenção de compra + GEO para IAs',
      'Copywriting com gatilhos de neuromarketing',
      'Performance: 0.7s de carregamento, Score 99',
      'Integração direta com WhatsApp',
    ],
    highlight: true,
  },
  {
    name: 'Gestão Contínua',
    price: 'R$ 800 – R$ 1.200',
    period: '/mês',
    description: 'Otimização, conteúdo e evolução constante após o lançamento.',
    features: [
      'Monitoramento de conversão e Core Web Vitals',
      'Atualizações de conteúdo e SEO recorrentes',
      'Testes de novos gatilhos de decisão',
      'Relatório mensal de performance',
      'Suporte prioritário via WhatsApp',
    ],
  },
];

export const Pricing = () => {
  return (
    <section id="precos" className="py-24 px-6 bg-obsidian-900">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <Badge variant="primary" className="mb-4">
              Investimento Transparente
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-pearl-100 mb-4">
              Sem letras miúdas, sem surpresas
            </h2>
            <p className="text-pearl-300/70 max-w-2xl mx-auto leading-relaxed">
              Um projeto sob medida e, se fizer sentido, gestão contínua para manter a
              conversão evoluindo.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <ScrollReveal key={plan.name}>
              <Card
                variant={plan.highlight ? 'accent' : 'surface'}
                className="h-full flex flex-col"
              >
                <h3 className="text-lg font-bold text-pearl-100 mb-1">{plan.name}</h3>
                <p className="text-sm text-pearl-300/60 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-2xl md:text-3xl font-serif font-black text-pearl-100">
                    {plan.price}
                  </span>
                  {plan.period && <span className="text-pearl-300/60">{plan.period}</span>}
                </div>

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-pearl-300/80">
                      <Check className="w-4 h-4 text-blush-400 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={getWhatsAppLink(`Olá! Tenho interesse no plano ${plan.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackButtonClick('pricing_cta', plan.name)}
                >
                  <Button variant={plan.highlight ? 'primary' : 'outline'} className="w-full">
                    Falar no WhatsApp
                  </Button>
                </a>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
