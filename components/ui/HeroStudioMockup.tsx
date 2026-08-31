'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const TAB_IMAGES = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
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

      <div className="bg-[#121019]/90 border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/90">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <div className="flex gap-1.5 flex-shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-pearl-200/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-pearl-200/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-pearl-200/50" />
          </div>
          <div className="flex gap-1.5 overflow-x-auto">
            {tabs.map((tab, idx) => (
              <button
                key={tab.label}
                type="button"
                onClick={() => setActive(idx)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
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
              <Image
                src={TAB_IMAGES[active]}
                alt={activeTab.label}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/90 via-obsidian-900/20 to-transparent" />

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
