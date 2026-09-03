'use client';

import Link from 'next/link';
import { Home, Ruler, UtensilsCrossed, ShoppingBag, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { TiltCard } from '@/components/ui/TiltCard';
import { HoverRevealVideo } from '@/components/ui/HoverRevealVideo';
import { ScrollReveal } from '@/components/HeroAnimations';
import { useLanguage } from '@/context/LanguageContext';

// Imagens e vídeos gerados por IA (não são fotos de banco genéricas nem
// trabalho real de cliente) — daí o selo "Conceito Ilustrativo" no card.
// Guardados localmente em public/ para não depender de host externo e
// carregar rápido. O vídeo (um "reveal" de card 2D estourando em 3D) só
// carrega e toca no hover — a imagem é o que chega no primeiro load.
const VERTICAL_MEDIA = [
  {
    icon: Home,
    image: '/images/verticals/airbnb.jpg',
    video: '/videos/verticals/airbnb',
    demoHref: '/demo/airbnb',
  },
  {
    icon: Ruler,
    image: '/images/verticals/marcenaria.jpg',
    video: '/videos/verticals/marcenaria',
    demoHref: undefined,
  },
  {
    icon: UtensilsCrossed,
    image: '/images/verticals/gastronomia.jpg',
    video: '/videos/verticals/gastronomia',
    demoHref: undefined,
  },
  {
    icon: ShoppingBag,
    image: '/images/verticals/ecommerce.jpg',
    video: '/videos/verticals/ecommerce',
    demoHref: undefined,
  },
];

export const Verticals = () => {
  const { t } = useLanguage();

  return (
    <section id="nichos" className="py-20 px-6 bg-obsidian-800/40">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="primary" className="mb-4">
              {t.verticals.badge}
            </Badge>
            <h2 className="text-2xl md:text-3xl font-serif font-black text-pearl-100 mb-3">
              {t.verticals.heading}
            </h2>
            <p className="text-pearl-300/70 max-w-2xl mx-auto leading-relaxed text-sm">
              {t.verticals.subheading}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.verticals.items.map((vertical, idx) => {
            const media = VERTICAL_MEDIA[idx];
            const Icon = media.icon;
            return (
              <ScrollReveal key={vertical.name}>
                <TiltCard>
                  <div className="rounded-xl overflow-hidden border border-pearl-100/10 bg-obsidian-800/60 h-full flex flex-col transition-[border-color,box-shadow] duration-300 group-hover/tilt:border-blush-500/40 group-hover/tilt:shadow-[0_16px_40px_-15px_rgba(216,194,184,0.25)]">
                    <div className="group relative aspect-[4/3] overflow-hidden">
                      <HoverRevealVideo
                        image={media.image}
                        video={media.video}
                        alt={vertical.name}
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A0E]/60 via-[#0B0A0E]/10 to-transparent pointer-events-none" />
                      {/* pointer-events-none on these two decorative badges: they sit
                          on top of the hover-video's hit area but aren't interactive
                          themselves, so hovering directly over them should still count
                          as hovering the card and trigger the video. */}
                      <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-obsidian-900/70 border border-blush-500/30 flex items-center justify-center backdrop-blur-sm pointer-events-none">
                        <Icon className="w-4 h-4 text-blush-300" />
                      </div>
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-obsidian-900/70 border border-pearl-100/15 backdrop-blur-sm text-[9px] font-semibold uppercase tracking-wide text-pearl-300/80 pointer-events-none">
                        {t.verticals.conceptTag}
                      </span>
                    </div>

                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-sm font-bold text-pearl-100 mb-1.5">{vertical.name}</h3>
                      <p className="text-pearl-300/70 leading-relaxed mb-3 flex-1 text-xs">
                        {vertical.proposal}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-1">
                        {vertical.tags.map((tag) => (
                          <Badge key={tag} variant="primary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      {media.demoHref && (
                        <Link
                          href={media.demoHref}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-blush-300 hover:text-blush-200 transition-colors mt-3 w-fit"
                        >
                          Ver Demo Interativa
                          <ArrowRight className="w-3.5 h-3.5" />
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
