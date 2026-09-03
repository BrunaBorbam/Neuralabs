'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

// Same AI-generated editorial set used in Nichos (public/images/verticals),
// copied here rather than hotlinked from Unsplash: one less third-party
// origin on the page's LCP image, and a consistent visual identity between
// the Hero mockup and the Nichos cards instead of two unrelated stock-photo
// styles.
const TAB_IMAGES = [
  '/images/hero-studio/airbnb.jpg',
  '/images/hero-studio/marcenaria.jpg',
  '/images/hero-studio/gastronomia.jpg',
  '/images/hero-studio/ecommerce.jpg',
];

export const HeroStudioMockup = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const tabs = t.heroStudio.tabs;
  const activeTab = tabs[active];

  return (
    <div className="relative min-w-0">
      <motion.div
        className="hidden sm:flex absolute -top-5 left-8 z-20 items-center gap-2 px-4 py-2 rounded-full bg-obsidian-800/90 border border-pearl-100/15 backdrop-blur-md text-xs font-semibold text-pearl-100 shadow-lg whitespace-nowrap"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {t.heroStudio.badgeSpeed}
      </motion.div>

      <motion.div
        className="hidden sm:flex absolute -bottom-5 right-8 z-20 items-center gap-2 px-4 py-2 rounded-full bg-obsidian-800/90 border border-blush-500/25 backdrop-blur-md text-xs font-semibold text-blush-200 shadow-lg whitespace-nowrap"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        {t.heroStudio.badgeNeuro}
      </motion.div>

      <div className="w-full max-w-full bg-[#121019]/90 border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/90">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <div className="flex gap-1.5 flex-shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-pearl-200/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-pearl-200/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-pearl-200/50" />
          </div>
          <div className="flex flex-nowrap gap-1.5 overflow-x-auto scrollbar-none py-1">
            {tabs.map((tab, idx) => (
              <button
                key={tab.label}
                type="button"
                onClick={() => setActive(idx)}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  idx === active
                    ? 'bg-blush-500/15 border border-blush-500/40 text-pearl-100'
                    : 'border border-transparent text-pearl-300/50 hover:text-pearl-200'
                }`}
              >
                <span>{tab.emoji}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative aspect-[4/3] sm:aspect-video overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              {/* Slow continuous zoom (Ken Burns) instead of a static
                  screenshot — the panel is meant to hint at the motion/3D
                  craft the agency actually builds (see the Nichos hover
                  cards and the Hero's own glass sphere), not read as a flat
                  tab-switcher template. */}
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 6, ease: 'easeOut' }}
              >
                <Image
                  src={TAB_IMAGES[active]}
                  alt={activeTab.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/90 via-obsidian-900/20 to-transparent" />

              {/* Same honesty standard as the Nichos cards: this mockup and
                  its metrics are an illustrative concept, not a real client
                  result, so it carries the same disclosure they do. */}
              <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-obsidian-900/70 border border-pearl-100/15 backdrop-blur-sm text-[10px] font-semibold uppercase tracking-wide text-pearl-300/80">
                {t.verticals.conceptTag}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm md:text-base font-semibold text-pearl-100 mb-3 max-w-[220px] leading-snug">
                    {activeTab.headline}
                  </p>
                  <span className="inline-block px-4 py-2 rounded-lg bg-blush-500 text-obsidian-900 text-xs font-bold">
                    {activeTab.cta}
                  </span>
                </div>

                <div className="rounded-lg bg-obsidian-900/70 border border-pearl-100/10 backdrop-blur-md px-3 py-2 text-right flex-shrink-0">
                  <p className="text-[10px] uppercase tracking-wide text-pearl-300/60 mb-0.5 whitespace-nowrap">
                    {activeTab.metricLabel}
                  </p>
                  <p className="text-sm font-bold text-blush-300">{activeTab.metricValue}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
