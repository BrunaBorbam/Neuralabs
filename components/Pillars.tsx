'use client';

import { Search, Brain, Plus } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ScrollReveal } from '@/components/HeroAnimations';

interface Pillar {
  icon: React.ReactNode;
  title: string;
  description: string;
  badges: string[];
}

const pillars: Pillar[] = [
  {
    icon: <Search className="w-7 h-7 text-blush-300" />,
    title: 'SEO de Intenção & Otimização para IAs (GEO)',
    description:
      'Esqueça tráfego vazio. Posicionamos sua empresa exatamente nas buscas de quem já tem orçamento e está pronto para comprar no Google, ChatGPT e Gemini.',
    badges: ['Buscas de Alto Valor', 'Ranqueamento no Google', 'Recomendação em IAs'],
  },
  {
    icon: <Brain className="w-7 h-7 text-blush-300" />,
    title: 'Arquitetura de Decisão & Neuromarketing',
    description:
      'Mapeamos a psicologia de compra do seu público: eliminação de fricção cognitiva, gatilhos de alto valor percebido e condução fluida até o WhatsApp.',
    badges: ['Decisão em 0.8s', 'Ancoragem de Status', 'Aversão à Perda'],
  },
];

export const Pillars = () => {
  return (
    <section id="pilares" className="py-24 px-6 bg-obsidian-900">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="info" className="mb-4">
              Os Dois Pilares Neuralabs
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-pearl-100 mb-4">
              Quem chega pronto pra comprar, decide sem fricção
            </h2>
            <p className="text-pearl-300/70 max-w-2xl mx-auto leading-relaxed">
              SEO de intenção traz a audiência certa até você. Neuromarketing conduz essa
              audiência, sem atrito, até a decisão de compra.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-stretch relative">
          {pillars.map((pillar) => (
            <ScrollReveal key={pillar.title}>
              <Card variant="accent" className="h-full flex flex-col">
                <div className="w-14 h-14 rounded-xl bg-pearl-100/5 border border-pearl-100/10 flex items-center justify-center mb-6">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-pearl-100 mb-3">{pillar.title}</h3>
                <p className="text-pearl-300/70 leading-relaxed mb-6 flex-1">{pillar.description}</p>
                <div className="flex flex-wrap gap-2">
                  {pillar.badges.map((badge) => (
                    <Badge key={badge} variant="primary">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </Card>
            </ScrollReveal>
          ))}

          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-obsidian-900 border border-blush-500/40 items-center justify-center shadow-lg shadow-blush-500/20">
            <Plus className="w-5 h-5 text-blush-300" />
          </div>
        </div>
      </div>
    </section>
  );
};
