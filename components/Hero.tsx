'use client';

import { Zap, TrendingUp, MousePointerClick, Activity } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FloatingOrb, GlowingText } from '@/components/HeroAnimations';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { trackButtonClick } from '@/lib/ga';
import { useLanguage } from '@/context/LanguageContext';

const METRIC_ICONS = [Zap, TrendingUp, MousePointerClick, Activity];

export const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id="top" className="relative overflow-hidden bg-obsidian-900 pt-20 pb-28 px-6">
      <div className="absolute -top-10 -left-10 opacity-60">
        <FloatingOrb color="blush" />
      </div>
      <div className="absolute bottom-0 right-0 opacity-40">
        <FloatingOrb color="pearl" delay={2} />
      </div>

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <Badge variant="primary" className="mb-6">
            {t.hero.badge}
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-pearl-100 leading-[1.1] mb-6">
            {t.hero.headlinePrefix}{' '}
            <GlowingText text={t.hero.headlineHighlight} />
          </h1>

          <p className="text-lg text-pearl-300/70 max-w-xl mb-10 leading-relaxed">
            {t.hero.subheadline}
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href={getWhatsAppLink(t.hero.waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick('diagnostico_whatsapp', 'hero')}
            >
              <Button variant="primary" size="lg">
                {t.hero.ctaPrimary}
              </Button>
            </a>
            <a href="#nichos">
              <Button variant="secondary" size="lg">
                {t.hero.ctaSecondary}
              </Button>
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-2xl border border-pearl-100/10 bg-obsidian-800/60 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-pearl-100/10">
              <span className="text-xs font-semibold tracking-widest uppercase text-pearl-300/60">
                {t.hero.panelTitle}
              </span>
              <span className="flex items-center gap-2 text-xs text-blush-300">
                <span className="w-2 h-2 rounded-full bg-blush-400 animate-pulse-soft" />
                {t.hero.panelLive}
              </span>
            </div>

            <div className="p-6 flex flex-col gap-5">
              {t.hero.metrics.map((metric, idx) => {
                const Icon = METRIC_ICONS[idx];
                return (
                  <div
                    key={metric.label}
                    className="flex items-center justify-between gap-4 rounded-xl bg-pearl-100/[0.03] border border-pearl-100/5 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-lg bg-blush-500/10 border border-blush-500/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-blush-300" />
                      </span>
                      <span className="text-sm text-pearl-300/70">{metric.label}</span>
                    </div>
                    <span className="text-sm font-bold text-pearl-100 whitespace-nowrap">
                      {metric.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
