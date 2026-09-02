'use client';

import dynamic from 'next/dynamic';
import { HeroStudioMockup } from '@/components/ui/HeroStudioMockup';
import { Badge } from '@/components/ui/Badge';
import { FloatingOrb } from '@/components/HeroAnimations';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { trackButtonClick } from '@/lib/ga';
import { useLanguage } from '@/context/LanguageContext';

// R3F needs the browser (WebGL context), so it's loaded client-only and
// never blocks the LCP text/CTA — the Hero reads perfectly without it.
const HeroScene3D = dynamic(
  () => import('@/components/HeroScene3D').then((mod) => mod.HeroScene3D),
  { ssr: false }
);

export const Hero = () => {
  const { t } = useLanguage();

  return (
    <section
      id="top"
      className="relative overflow-hidden max-w-full w-full bg-obsidian-900 pt-28 md:pt-44 pb-28 px-5 sm:px-8"
    >
      <div className="absolute -top-10 -left-10 opacity-60">
        <FloatingOrb color="blush" />
      </div>
      <div className="absolute bottom-0 right-0 opacity-40">
        <FloatingOrb color="pearl" delay={2} />
      </div>

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="min-w-0">
          <Badge variant="primary" className="mb-6">
            {t.hero.badge}
          </Badge>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.2] break-words text-balance text-[#FAF7F2] mb-6">
            {t.hero.headlinePrefix}{' '}
            <span className="font-normal text-[#FAF7F2] bg-gradient-to-r from-[#FAF7F2] via-[#EFE8DE] to-[#D8C2B8] bg-clip-text text-transparent">
              {t.hero.headlineHighlight}
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#9CA3AF] leading-relaxed mt-4 max-w-xl mb-8">
            {t.hero.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-8 w-full sm:w-auto">
            <a
              href={getWhatsAppLink(t.hero.waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick('diagnostico_whatsapp', 'hero')}
              className="inline-flex items-center w-full sm:w-auto text-center justify-center py-4 px-6 rounded-full bg-[#FAF7F2] text-[#0B0A0E] text-sm font-semibold shadow-md"
            >
              {t.hero.ctaPrimary}
            </a>
            <a
              href="#nichos"
              className="inline-flex items-center w-full sm:w-auto text-center justify-center py-4 px-6 rounded-full border border-white/20 bg-white/5 text-[#FAF7F2] text-sm font-medium"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        <div className="relative min-w-0">
          <HeroScene3D />
          <HeroStudioMockup />
        </div>
      </div>
    </section>
  );
};
