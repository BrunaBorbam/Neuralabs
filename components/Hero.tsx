'use client';

import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { HeroStudioMockup } from '@/components/ui/HeroStudioMockup';
import { FloatingOrb } from '@/components/HeroAnimations';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { trackButtonClick } from '@/lib/ga';
import { useLanguage } from '@/context/LanguageContext';

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

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div>
          <Badge variant="primary" className="mb-6">
            {t.hero.badge}
          </Badge>

          <h1 className="font-sans font-light tracking-tight text-4xl md:text-5xl lg:text-6xl text-pearl-100 leading-[1.15] text-balance mb-6">
            {t.hero.headlinePrefix}{' '}
            <span className="font-normal text-[#FAF7F2] bg-gradient-to-r from-[#FAF7F2] via-[#EFE8DE] to-[#D8C2B8] bg-clip-text text-transparent">
              {t.hero.headlineHighlight}
            </span>
          </h1>

          <p className="text-[#9CA3AF] max-w-xl text-base md:text-lg leading-relaxed mt-5 mb-10">
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

        <HeroStudioMockup />
      </div>
    </section>
  );
};
