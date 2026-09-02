'use client';

import { Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/HeroAnimations';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { trackButtonClick } from '@/lib/ga';
import { useLanguage } from '@/context/LanguageContext';

export const Pricing = () => {
  const { t } = useLanguage();

  return (
    <section id="precos" className="py-24 px-6 bg-obsidian-900">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <Badge variant="primary" className="mb-4">
              {t.pricing.badge}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-pearl-100 mb-4">
              {t.pricing.heading}
            </h2>
            <p className="text-pearl-300/70 max-w-2xl mx-auto leading-relaxed">
              {t.pricing.subheading}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {t.pricing.plans.map((plan, idx) => {
            const highlight = idx === 1;
            return (
              <ScrollReveal key={plan.name}>
                <Card
                  variant={highlight ? 'accent' : 'surface'}
                  className={`relative h-full flex flex-col text-center items-center transition-shadow duration-500 ${
                    highlight ? 'ring-2 ring-blush-500/50 shadow-blush-glow-lg hover:animate-glow' : ''
                  }`}
                >
                  {plan.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-blush-500 text-obsidian-900 text-xs font-bold tracking-wide uppercase whitespace-nowrap">
                      {plan.badge}
                    </span>
                  )}

                  <h3 className="text-lg font-bold text-pearl-100 mb-1 mt-2">{plan.name}</h3>
                  <p className="text-sm text-pearl-300/60 mb-6">{plan.subtitle}</p>

                  <div className="mb-1">
                    <span className="text-3xl md:text-4xl font-serif font-black text-pearl-100">
                      {plan.price}
                    </span>
                  </div>
                  <p className="text-xs text-pearl-300/50 mb-8">{plan.priceNote}</p>

                  <ul className="flex flex-col gap-3 mb-8 text-left w-full max-w-sm flex-1">
                    {plan.deliverables.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-pearl-300/80">
                        <Check className="w-4 h-4 text-blush-400 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={getWhatsAppLink(plan.waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackButtonClick('pricing_cta', plan.name)}
                    className="w-full"
                  >
                    <Button
                      variant={highlight ? 'primary' : 'outline'}
                      className={`w-full ${
                        highlight
                          ? '!bg-gradient-to-r !from-pearl-100 !to-pearl-300 !text-obsidian-900 !shadow-[0_0_24px_rgba(250,247,242,0.35)]'
                          : ''
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </a>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
