'use client';

import { Zap, TrendingUp, Brain } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FloatingOrb, GlowingText } from '@/components/HeroAnimations';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden py-24 px-6 bg-[#0A0E27]">
      <div className="absolute top-10 left-10">
        <FloatingOrb color="orange" />
      </div>
      <div className="absolute bottom-10 right-10">
        <FloatingOrb color="violet" delay={2} />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
          Websites que aumentam conversão usando{' '}
          <GlowingText text="Neuromarketing & IA" />
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Criamos websites premium que vendem. Combinamos SEO de intenção de compra, psicologia
          do consumidor e design de alta performance para transformar visitantes em clientes.
        </p>

        <div className="flex justify-center gap-4 mb-14">
          <Button variant="primary" size="lg">
            Falar no WhatsApp
          </Button>
          <Button variant="secondary" size="lg">
            Ver Portfólio
          </Button>
        </div>

        <Card variant="glass" className="inline-flex flex-wrap justify-center gap-3 !p-4 md:!p-5">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 text-sm font-semibold text-orange-300">
            <Zap className="w-4 h-4" />
            0.7s • Score 99 Google SEO &amp; Core Web Vitals
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 text-sm font-semibold text-violet-300">
            <Brain className="w-4 h-4" />
            Neuromarketing Aplicado
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-semibold text-slate-300">
            <TrendingUp className="w-4 h-4" />
            SEO de Intenção de Compra
          </span>
        </Card>
      </div>
    </section>
  );
};
