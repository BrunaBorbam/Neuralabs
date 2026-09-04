'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, type Variants } from 'framer-motion';
import { HeroStudioMockup } from '@/components/ui/HeroStudioMockup';
import { TiltCard } from '@/components/ui/TiltCard';
import { Badge } from '@/components/ui/Badge';
import { NeuralMesh } from '@/components/ui/NeuralMesh';
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

// The sphere is a purely decorative rim-light (aria-hidden, no informational
// role) whose only interaction — drifting toward the pointer — doesn't even
// apply on touch. Below md it sits mounted anyway, pulling in the
// react-three-fiber/three.js bundle and running a 60fps WebGL render loop
// from the moment the Hero is on screen — real CPU/battery/bandwidth cost,
// paid on exactly the throttled mobile CPU PageSpeed measures, for an effect
// nobody on a phone can even nudge. Gate the whole import behind a
// min-width match so mobile never fetches or runs it at all.
const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return isDesktop;
};

// Text column reveals as one small choreographed beat on load — badge,
// headline, subheadline and CTAs each step in a touch after the last —
// rather than the whole block appearing at once. Kept quick (0.5s total)
// so it reads as polish, not a loading delay.
const textColumn: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const textItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export const Hero = () => {
  const { t } = useLanguage();
  const isDesktop = useIsDesktop();

  return (
    <section
      id="top"
      className="relative overflow-hidden max-w-full w-full bg-obsidian-900 pt-28 md:pt-44 pb-28 px-5 sm:px-8"
    >
      {/* Warm ambient glow wash — the reference site stays just as dark at
          its base as we already were, but reads as alive rather than flat
          black-and-white because of a broad, low-opacity color wash behind
          the content, not just a pinprick accent. Gold carries it now,
          since gold is the primary accent going forward. */}
      <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -top-10 -left-10 opacity-60">
        <FloatingOrb color="gold" />
      </div>
      <div className="absolute bottom-0 right-0 opacity-40">
        <FloatingOrb color="pearl" delay={2} />
      </div>
      {/* Literal (but very quiet) echo of "neurociência" — a faint synapse
          mesh behind the text column only, never behind the mockup panel. */}
      <NeuralMesh className="absolute top-0 left-0 w-[600px] h-[500px] opacity-10" />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div className="min-w-0" variants={textColumn} initial="hidden" animate="show">
          <motion.div variants={textItem}>
            <Badge variant="primary" className="mb-6">
              {t.hero.badge}
            </Badge>
          </motion.div>

          <motion.h1
            variants={textItem}
            className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.2] break-words text-balance text-[#FAF7F2] mb-6"
          >
            {t.hero.headlinePrefix}{' '}
            <span className="font-normal text-[#FAF7F2] bg-gradient-to-r from-[#FAF7F2] via-[#EFE8DE] to-[#D8C2B8] bg-clip-text text-transparent">
              {t.hero.headlineHighlight}
            </span>
          </motion.h1>

          <motion.p
            variants={textItem}
            className="text-sm sm:text-base md:text-lg text-[#9CA3AF] leading-relaxed mt-4 max-w-xl mb-8"
          >
            {t.hero.subheadline}
          </motion.p>

          <motion.div
            variants={textItem}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-8 w-full sm:w-auto"
          >
            <a
              href={getWhatsAppLink(t.hero.waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick('diagnostico_whatsapp', 'hero')}
              className="inline-flex items-center w-full sm:w-auto text-center justify-center py-4 px-6 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 text-obsidian-900 text-sm font-semibold shadow-lg shadow-gold-500/25 transition-all duration-200 hover:scale-[1.03] hover:shadow-gold-500/45 active:scale-[0.98]"
            >
              {t.hero.ctaPrimary}
            </a>
            <a
              href="#nichos"
              className="inline-flex items-center w-full sm:w-auto text-center justify-center py-4 px-6 rounded-full border border-white/20 bg-white/5 text-[#FAF7F2] text-sm font-medium transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              {t.hero.ctaSecondary}
            </a>
          </motion.div>
        </motion.div>

        <div className="relative min-w-0">
          {/* Sized larger than the mockup panel and inset negatively, behind
              it in stacking order, so the glass sphere reads as a soft halo
              bleeding out around the panel's rounded edges — not a flat
              disc sitting on top of the villa photo. */}
          <div className="absolute -inset-10 sm:-inset-16 -z-10">
            {isDesktop && <HeroScene3D />}
          </div>
          {/* Subtle pointer-driven tilt on the panel itself, so the whole
              hero feels responsive to the cursor, not just the sphere. */}
          <TiltCard>
            <HeroStudioMockup />
          </TiltCard>
        </div>
      </div>
    </section>
  );
};
