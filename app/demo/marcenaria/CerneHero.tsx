'use client';

/**
 * Hero CERNE 2.0 — closet como cena principal.
 *
 * Desktop: palco escuro, closet num "portal" que abre como duas portas de
 * marcenaria (nogueira + puxador metálico), dolly-in leve no scroll e luz
 * cênica que acompanha o cursor. Mobile: imagem primeiro, texto e amostras
 * de material abaixo, sem portas, sem luz no cursor e sem transform no scroll.
 * prefers-reduced-motion: MotionConfig desliga transforms; portas e luz somem
 * via CSS (motion-reduce) para não depender do estado pós-hidratação.
 */

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { MotionConfig, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

// PENDENTE: foto contém marca de terceiros (Louis Vuitton). Não aprovada para uso
// comercial; substituir por imagem original. Ver docs/cerne-2-hero-pendencias.md.
const CLOSET_IMAGE = '/images/cerne/closet-boutique.png';
const WALNUT_IMAGE = '/images/cerne/oficio-detalhe.jpg';
// Texturas originais geradas para o projeto (procedurais), não fotografias.
const STONE_IMAGE = '/images/cerne/material-pedra.jpg';
const METAL_IMAGE = '/images/cerne/material-metal.jpg';

const EASE_DOOR = [0.76, 0, 0.24, 1] as const;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const DOOR_DELAY = 0.35;
const DOOR_DURATION = 1.7;

export type CerneHeroCopy = {
  heroEyebrow: string;
  heroTitle1: string;
  heroTitleEm: string;
  heroText: string;
  heroSeePortfolio: string;
  ctaConsult: string;
  heroAlt: string;
  heroCaption: string;
  heroMaterialsLabel: string;
  heroSwatches: readonly [string, string, string];
};

function useDesktopPointer() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px) and (hover: hover)');
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return enabled;
}

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE_OUT },
});

const lineReveal = (delay: number) => ({
  initial: { y: '105%' },
  animate: { y: '0%' },
  transition: { duration: 1.1, delay, ease: EASE_OUT },
});

export function CerneHero({ t }: { t: CerneHeroCopy }) {
  const reduced = useReducedMotion() ?? false;
  const desktop = useDesktopPointer();
  const cinematic = desktop && !reduced;

  const sectionRef = useRef<HTMLElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const [doorsDone, setDoorsDone] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const dollyScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const dollyY = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = portalRef.current;
    if (!el || !cinematic) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--lx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--ly', `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const swatches = [
    { label: t.heroSwatches[0], img: WALNUT_IMAGE, zoom: 1.6, origin: '22% 42%' },
    { label: t.heroSwatches[1], img: STONE_IMAGE, zoom: 1, origin: '50% 50%' },
    { label: t.heroSwatches[2], img: METAL_IMAGE, zoom: 1, origin: '50% 50%' },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        aria-labelledby="cerne-hero-title"
        className="relative overflow-hidden bg-[#14110E] text-[#EDE6DA]"
      >
        {/* Luz ambiente: halo quente vindo do alto, como sanca iluminada */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 70% at 70% -10%, rgba(184,153,106,0.16), transparent 60%), radial-gradient(80% 60% at 0% 100%, rgba(58,42,31,0.55), transparent 70%)',
          }}
        />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-7 px-5 pb-12 pt-0 sm:px-8 sm:pt-6 md:min-h-[calc(100svh-7.5rem)] md:grid-cols-12 md:items-center md:gap-8 md:py-10 lg:gap-12">
          {/* Texto — no mobile vem depois da imagem */}
          <motion.div
            className="order-2 flex flex-col md:order-1 md:col-span-5 md:block"
            style={cinematic ? { y: copyY, opacity: copyOpacity } : undefined}
          >
            <motion.div className="mb-4 flex items-center gap-3 md:mb-6" {...reveal(0.15)}>
              <span className="h-px w-9 bg-[#B8996A]" />
              <span className="text-[10.5px] uppercase tracking-[0.28em] text-[#C9B48E]">{t.heroEyebrow}</span>
            </motion.div>

            <h1
              id="cerne-hero-title"
              className="mb-4 text-[38px] leading-[1.06] sm:text-[50px] md:mb-6 lg:text-[56px] xl:text-[60px]"
              style={{ fontFamily: 'var(--font-cerne-serif)', fontWeight: 400 }}
            >
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span className="block" {...lineReveal(0.25)}>
                  {t.heroTitle1}
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.12em]">
                <motion.em className="block text-[#C9A877]" style={{ fontStyle: 'italic' }} {...lineReveal(0.4)}>
                  {t.heroTitleEm}
                </motion.em>
              </span>
            </h1>

            <motion.p className="order-2 max-w-[420px] text-[14px] leading-[1.75] text-[#B4AA9B] md:mb-8 md:leading-[1.85]" {...reveal(0.6)}>
              {t.heroText}
            </motion.p>

            <motion.div className="order-1 mb-6 flex flex-wrap items-center gap-x-7 gap-y-4 md:mb-0" {...reveal(0.75)}>
              <a
                href="#contato"
                data-magnetic
                className="inline-flex items-center gap-2 rounded-sm bg-[#EDE6DA] px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-[#14110E] transition-colors hover:bg-[#C9A877] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A877]"
              >
                {t.ctaConsult}
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 border-b border-[#B8996A]/70 pb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#EDE6DA] transition-colors hover:text-[#C9A877] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A877]"
              >
                {t.heroSeePortfolio} <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </motion.div>

            {/* Materiais — recortes das próprias fotos do projeto */}
            <motion.div className="order-3 mt-9 md:mt-10" {...reveal(0.9)}>
              <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-[#8F8577]">{t.heroMaterialsLabel}</p>
              <ul className="grid grid-cols-3 gap-3 sm:max-w-[360px]">
                {swatches.map((s) => (
                  <li key={s.label} className="group">
                    <div className="relative aspect-square overflow-hidden rounded-[2px] ring-1 ring-[#EDE6DA]/10">
                      <div className="absolute inset-0" style={{ transform: `scale(${s.zoom})`, transformOrigin: s.origin }}>
                        <Image
                          src={s.img}
                          alt=""
                          fill
                          sizes="(min-width: 768px) 360px, 60vw"
                          className="object-cover transition-transform duration-[1.4s] ease-out motion-reduce:transition-none md:group-hover:scale-110"
                        />
                      </div>
                    </div>
                    <span className="mt-2 block text-[10px] uppercase leading-snug tracking-[0.16em] text-[#B4AA9B]">
                      {s.label}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Cena: closet */}
          <div className="order-1 md:order-2 md:col-span-7">
            <div
              ref={portalRef}
              onPointerMove={onPointerMove}
              className="relative -mx-5 h-[clamp(210px,36svh,360px)] overflow-hidden bg-[#1E1813] sm:mx-0 sm:h-[clamp(320px,52svh,520px)] sm:rounded-[2px] md:h-[min(calc(100svh-12.5rem),820px)] md:min-h-[520px]"
              style={{ ['--lx' as string]: '62%', ['--ly' as string]: '28%' }}
            >
              <motion.div className="absolute inset-0" style={cinematic ? { scale: dollyScale, y: dollyY } : undefined}>
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.12 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    opacity: { duration: 0.8, ease: EASE_OUT },
                    scale: { duration: 2.4, delay: DOOR_DELAY, ease: EASE_OUT },
                  }}
                >
                  <Image
                    src={CLOSET_IMAGE}
                    alt={t.heroAlt}
                    fill
                    preload
                    sizes="(min-width: 768px) 58vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: '50% 58%' }}
                  />
                </motion.div>
              </motion.div>

              {/* Grade de cor: integra a foto ao palco escuro */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(20,17,14,0.3) 0%, rgba(20,17,14,0) 28%, rgba(20,17,14,0) 64%, rgba(20,17,14,0.65) 100%)',
                }}
              />

              {/* Luz cênica que acompanha o cursor (desktop com mouse) */}
              {cinematic && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-90 mix-blend-soft-light"
                  style={{
                    background:
                      'radial-gradient(38% 32% at var(--lx) var(--ly), rgba(255,232,196,0.55), transparent 70%)',
                  }}
                />
              )}

              {/* Portas de marcenaria que se abrem uma vez (só desktop) */}
              {!doorsDone && (
                <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden md:block motion-reduce:hidden">
                  {(['left', 'right'] as const).map((side) => (
                    <motion.div
                      key={side}
                      className={`absolute inset-y-0 w-1/2 overflow-hidden ${side === 'left' ? 'left-0' : 'right-0'}`}
                      initial={{ x: '0%' }}
                      animate={{ x: side === 'left' ? '-101%' : '101%' }}
                      transition={{ duration: DOOR_DURATION, delay: DOOR_DELAY, ease: EASE_DOOR }}
                      onAnimationComplete={side === 'right' ? () => setDoorsDone(true) : undefined}
                      style={{
                        boxShadow:
                          side === 'left'
                            ? 'inset -24px 0 40px -20px rgba(0,0,0,0.6)'
                            : 'inset 24px 0 40px -20px rgba(0,0,0,0.6)',
                      }}
                    >
                      <Image
                        src={WALNUT_IMAGE}
                        alt=""
                        fill
                        sizes="30vw"
                        className="object-cover brightness-[0.62]"
                        style={side === 'right' ? { transform: 'scaleX(-1)' } : undefined}
                      />
                      <span
                        className={`absolute top-1/2 h-[26%] w-[3px] -translate-y-1/2 rounded-full ${side === 'left' ? 'right-5' : 'left-5'}`}
                        style={{
                          background: 'linear-gradient(180deg,#8E8A84 0%,#D9D4CB 45%,#7A766F 100%)',
                          boxShadow: '0 0 0 1px rgba(0,0,0,0.25), 2px 0 6px rgba(0,0,0,0.35)',
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Legenda honesta da cena */}
              <motion.div
                className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 sm:bottom-7 sm:left-7 sm:right-7"
                {...reveal(1.2)}
              >
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#EDE6DA]/85">{t.heroCaption}</span>
                <span className="hidden h-px w-16 bg-[#EDE6DA]/40 sm:block" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
