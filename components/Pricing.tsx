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
      <div className="max-w-2xl mx-auto">
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

        <ScrollReveal>
          <Card variant="accent" className="flex flex-col text-center items-center">
            <h3 className="text-lg font-bold text-pearl-100 mb-1">{t.pricing.planName}</h3>
            <p className="text-sm text-pearl-300/60 mb-6">{t.pricing.planSubtitle}</p>

            <div className="mb-2">
              <span className="text-3xl md:text-4xl font-serif font-black text-pearl-100">
                {t.pricing.price}
              </span>
            </div>
            <p className="text-xs text-pearl-300/50 mb-8">{t.pricing.priceNote}</p>

            <ul className="flex flex-col gap-3 mb-8 text-left w-full max-w-md">
              {t.pricing.deliverables.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-pearl-300/80">
                  <Check className="w-4 h-4 text-blush-400 flex-shrink-0 mt-0.5" />
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href={getWhatsAppLink(t.pricing.waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick('pricing_cta', 'Website Premium')}
              className="w-full"
            >
              <Button variant="primary" className="w-full">
                {t.pricing.cta}
              </Button>
            </a>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
};
