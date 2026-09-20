'use client';

import { Palette, Stamp, Type, BookOpenText } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ScrollReveal } from '@/components/HeroAnimations';
import { useLanguage } from '@/context/LanguageContext';

const ITEM_ICONS = [Palette, Stamp, Type, BookOpenText];

export const BrandIdentity = () => {
  const { t } = useLanguage();

  return (
    <section id="identidade-visual" className="py-24 px-6 bg-obsidian-900">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <Badge variant="primary" className="mb-4">
              {t.brandIdentity.badge}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-pearl-100 mb-4">
              {t.brandIdentity.heading}
            </h2>
            <p className="text-pearl-300/70 max-w-2xl mx-auto leading-relaxed">
              {t.brandIdentity.subheading}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-6">
          {t.brandIdentity.items.map((item, idx) => {
            const Icon = ITEM_ICONS[idx];
            return (
              <ScrollReveal key={item.title}>
                <Card variant="glass" className="h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-graphite-500/10 border border-graphite-500/30 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-graphite-300" />
                  </div>
                  <h3 className="text-base font-bold text-pearl-100 mb-2">{item.title}</h3>
                  <p className="text-pearl-300/70 leading-relaxed text-sm flex-1">{item.description}</p>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
