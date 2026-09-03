'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { GripVertical } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { ScrollReveal } from '@/components/HeroAnimations';
import { useLanguage } from '@/context/LanguageContext';

const COMPARISON_IMAGE =
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80';

export const InteractiveComparison = () => {
  const { t } = useLanguage();
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    containerRef.current?.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <section id="comparativo" className="py-24 px-6 bg-obsidian-900">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <Badge variant="primary" className="mb-4">
              {t.comparison.badge}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-pearl-100 mb-4">
              {t.comparison.heading}
            </h2>
            <p className="text-pearl-300/70 max-w-2xl mx-auto leading-relaxed">
              {t.comparison.subheading}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="relative w-full aspect-video rounded-2xl overflow-hidden border border-pearl-100/10 select-none cursor-ew-resize touch-none"
          >
            {/* COM NEURALABS — base layer, full-quality editorial image */}
            <div className="absolute inset-0">
              <Image
                src={COMPARISON_IMAGE}
                alt={t.comparison.afterHeadline}
                fill
                sizes="(min-width: 1024px) 960px, 100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-l from-obsidian-900/90 via-obsidian-900/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center items-end text-right p-10">
                <span className="text-xs tracking-widest uppercase text-blush-300 mb-3">
                  {t.comparison.afterBrand}
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-pearl-100 mb-3 max-w-xs ml-auto">
                  {t.comparison.afterHeadline}
                </h3>
                <p className="text-sm text-pearl-100/80 max-w-xs ml-auto mb-6">
                  {t.comparison.afterBody}
                </p>
                <span className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-gold-400 to-gold-600 text-obsidian-900 text-sm font-bold shadow-[0_0_24px_rgba(197,140,59,0.45)]">
                  {t.comparison.afterCta}
                </span>
              </div>
            </div>

            {/* SEM NEURALABS — clipped overlay, same photo desaturated and flattened */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)` }}
            >
              <Image
                src={COMPARISON_IMAGE}
                alt={t.comparison.beforeHeadline}
                fill
                sizes="(min-width: 1024px) 960px, 100vw"
                className="object-cover grayscale contrast-75 brightness-[0.45]"
              />
              <div className="absolute inset-0 bg-obsidian-900/50" />
              <div className="absolute inset-0 flex flex-col justify-center items-start p-10">
                <span className="text-xs uppercase text-slate-300/70 mb-3">{t.comparison.beforeSite}</span>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-100 mb-3">
                  {t.comparison.beforeHeadline}
                </h3>
                <p className="text-sm text-slate-300/70 max-w-xs mb-6">
                  {t.comparison.beforeBody}
                </p>
                <span className="px-5 py-2.5 rounded bg-slate-400 text-slate-700 text-sm font-semibold">
                  {t.comparison.beforeCta}
                </span>
              </div>
            </div>

            <span className="absolute top-4 left-4 pointer-events-none inline-block px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase bg-slate-200/80 border border-slate-400/40 text-slate-600">
              {t.comparison.labelBefore}
            </span>
            <Badge variant="info" className="absolute top-4 right-4 pointer-events-none !bg-obsidian-900/70">
              {t.comparison.labelAfter}
            </Badge>

            {/* Handle */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-pearl-100/80"
              style={{ left: `${position}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-blush-500 border-2 border-pearl-100 flex items-center justify-center shadow-blush-glow">
                <GripVertical className="w-5 h-5 text-obsidian-900" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
