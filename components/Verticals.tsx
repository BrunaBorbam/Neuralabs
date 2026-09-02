'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Home, Ruler, UtensilsCrossed, ShoppingBag, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { TiltCard } from '@/components/ui/TiltCard';
import { ScrollReveal } from '@/components/HeroAnimations';
import { useLanguage } from '@/context/LanguageContext';

const VERTICAL_MEDIA = [
  {
    icon: Home,
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    demoHref: '/demo/airbnb',
  },
  {
    icon: Ruler,
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    demoHref: undefined,
  },
  {
    icon: UtensilsCrossed,
    image:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    demoHref: undefined,
  },
  {
    icon: ShoppingBag,
    image:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    demoHref: undefined,
  },
];

export const Verticals = () => {
  const { t } = useLanguage();

  return (
    <section id="nichos" className="py-24 px-6 bg-obsidian-800/40">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-4">
              {t.verticals.badge}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-pearl-100 mb-4">
              {t.verticals.heading}
            </h2>
            <p className="text-pearl-300/70 max-w-2xl mx-auto leading-relaxed">
              {t.verticals.subheading}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {t.verticals.items.map((vertical, idx) => {
            const media = VERTICAL_MEDIA[idx];
            const Icon = media.icon;
            return (
              <ScrollReveal key={vertical.name}>
                <TiltCard>
                  <div className="rounded-2xl overflow-hidden border border-pearl-100/10 bg-obsidian-800/60 h-full flex flex-col transition-[border-color,box-shadow] duration-300 group-hover/tilt:border-blush-500/40 group-hover/tilt:shadow-[0_20px_60px_-15px_rgba(216,194,184,0.25)]">
                    <div className="group relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={media.image}
                        alt={vertical.name}
                        fill
                        loading="lazy"
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A0E]/60 via-[#0B0A0E]/10 to-transparent" />
                      <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-obsidian-900/70 border border-blush-500/30 flex items-center justify-center backdrop-blur-sm">
                        <Icon className="w-6 h-6 text-blush-300" />
                      </div>
                      <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-obsidian-900/70 border border-pearl-100/15 backdrop-blur-sm text-[10px] font-semibold uppercase tracking-wide text-pearl-300/80">
                        {t.verticals.conceptTag}
                      </span>
                    </div>

                    <div className="p-8 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-pearl-100 mb-3">{vertical.name}</h3>
                      <p className="text-pearl-300/70 leading-relaxed mb-6 flex-1">
                        {vertical.proposal}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {vertical.tags.map((tag) => (
                          <Badge key={tag} variant="primary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      {media.demoHref && (
                        <Link
                          href={media.demoHref}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blush-300 hover:text-blush-200 transition-colors mt-4 w-fit"
                        >
                          Ver Demo Interativa
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
