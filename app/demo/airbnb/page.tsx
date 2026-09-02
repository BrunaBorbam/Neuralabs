'use client';

/**
 * VILLA SERENA — Boutique Retreat & Private Beach House
 * Demonstração Interativa • NEURALABS Studio
 *
 * Identidade autônoma "Coastal Sunset Luxury" (distinta da Delicate Luxury do
 * site-mãe): Obsidiana #0D0F12, Ouro Terracota #D4A373, Linho Marfim #F5EFE6,
 * Teca #2D241E — conforme o Guia Master de Inspirações da NEURALABS.
 *
 * Gatilhos de neuromarketing: prova social e âncora de preço no Hero,
 * aversão à perda (comparador em tempo real vs. Airbnb), escassez de datas,
 * reserva sem fricção (calendário simulado → WhatsApp).
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  Flame,
  MessageCircle,
  Sparkles,
  Star,
  Waves,
} from 'lucide-react';
import { ScrollReveal } from '@/components/HeroAnimations';
import { getWhatsAppLink } from '@/lib/whatsapp';

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-villa-serif',
  display: 'swap',
});
const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-villa-sans',
  display: 'swap',
});

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85';
const NIGHTLY_RATE = 1450;
const AIRBNB_FEE_PCT = 0.2;

const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
});

const AMBIENTES = [
  {
    kicker: '01 — O Descanso',
    title: 'Suíte Master com Linho Puro',
    body: 'Roupa de cama em linho belga, brisa filtrada e a luz âmbar do amanhecer entrando pelas cortinas de voil. O silêncio aqui é curado.',
    img: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=80',
    icon: Sparkles,
    tag: 'Ala Poente',
  },
  {
    kicker: '02 — O Encontro',
    title: 'Deck Privativo com Fogo de Chão',
    body: 'A borda infinita encontra o horizonte. Ao entardecer, o fogo de chão acende e o mar vira trilha sonora.',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
    icon: Flame,
    tag: 'Infinity Deck',
  },
  {
    kicker: '03 — O Ritual',
    title: 'Espaço Gourmet com Parrilla',
    body: 'Parrilla argentina, adega climatizada e bancada de teca maciça. Onde os jantares se estendem até a última estrela aparecer.',
    img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1600&q=80',
    icon: ChefHat,
    tag: 'Cozinha de Chef',
  },
] as const;

const DEPOIMENTOS = [
  {
    q: 'Reservamos direto e economizamos quase R$3 mil na semana. O deck ao pôr do sol é surreal.',
    n: 'Marina C.',
    c: 'São Paulo · Réveillon',
  },
  {
    q: 'Atendimento no WhatsApp impecável, respondiam em minutos. Sem taxa escondida, sem burocracia.',
    n: 'Rafael & Bia',
    c: 'Curitiba · Lua de mel',
  },
  {
    q: 'A parrilla e a adega fizeram nossos jantares. Sensação de casa própria à beira-mar.',
    n: 'Eduardo M.',
    c: 'Porto Alegre · Família',
  },
];

const MARQUEE_ITEMS = [
  'Reserva direta em minutos',
  'Sem taxa de 20% do Airbnb',
  'Anfitrião verificado',
  'Piscina de borda infinita',
  'Vista para o pôr do sol',
  'Suporte no WhatsApp',
];

const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];
const DIAS_SEMANA = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const RESERVADOS = new Set([4, 5, 12, 18, 19, 25]);

function useMagnetic() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || !window.matchMedia('(hover: hover)').matches) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-magnetic]'));
    const cleanups: (() => void)[] = [];
    els.forEach((el) => {
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
      };
      const leave = () => (el.style.transform = 'translate(0,0)');
      el.addEventListener('mousemove', move);
      el.addEventListener('mouseleave', leave);
      cleanups.push(() => {
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseleave', leave);
      });
    });
    return () => cleanups.forEach((c) => c());
  }, []);
  return ref;
}

export default function VillaSerenaDemo() {
  const rootRef = useMagnetic();

  return (
    <main
      ref={rootRef}
      className={`relative min-h-screen w-full max-w-full overflow-x-hidden bg-[#0D0F12] text-[#F5EFE6] ${serif.variable} ${sans.variable}`}
      style={{ fontFamily: 'var(--font-villa-sans)' }}
    >
      {/* Aurora ambiente */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-[10vw] -top-[14vw] h-[46vw] w-[46vw] rounded-full bg-[radial-gradient(circle,rgba(212,163,115,.5),transparent_70%)] blur-[90px] animate-drift-slow" />
        <div className="absolute -right-[10vw] top-[6vw] h-[40vw] w-[40vw] rounded-full bg-[radial-gradient(circle,rgba(138,154,91,.32),transparent_70%)] blur-[90px] animate-drift-slow [animation-delay:-8s]" />
      </div>

      <div className="relative z-10">
        {/* Selo NEURALABS */}
        <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-black/40 px-5 py-2 text-[11px] tracking-wide text-[#F5EFE6]/70 backdrop-blur-sm sm:px-8">
          <span>
            <span className="text-[#D4A373]">✦</span> Demonstração desenvolvida por{' '}
            <span className="font-semibold text-[#F5EFE6]">NEURALABS Studio</span>
          </span>
          <Link href="/" className="whitespace-nowrap font-medium hover:text-[#D4A373]">
            ← Voltar
          </Link>
        </div>

        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0D0F12]/70 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4 sm:px-8">
            <span
              className="text-sm uppercase tracking-[0.25em] sm:text-lg"
              style={{ fontFamily: 'var(--font-villa-serif)' }}
            >
              VILLA <em className="text-[#D4A373] not-italic">Serena</em>
            </span>
            <a
              href="#reserva"
              data-magnetic
              className="inline-flex flex-shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-gradient-to-r from-[#e9c9a3] to-[#D4A373] px-4 py-2.5 text-xs font-bold text-[#20160f] shadow-lg shadow-[#D4A373]/20 transition-shadow hover:shadow-[#D4A373]/40 sm:px-6 sm:py-3 sm:text-sm"
            >
              Garantir Tarifa Direta
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="relative flex min-h-[92vh] items-center overflow-hidden">
          <Image
            src={HERO_IMAGE}
            alt="Villa Serena — piscina de borda infinita ao entardecer, à beira-mar"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Golden-hour: aquece a foto para casar com a promessa "pôr do sol" */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(224,140,60,.4),rgba(212,163,115,.16)_45%,rgba(13,15,18,.08))] mix-blend-soft-light" />
          <div className="absolute inset-0 bg-[radial-gradient(38%_45%_at_72%_62%,rgba(233,170,95,.5),rgba(224,140,60,.12)_55%,transparent_72%)] mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F12] via-[#0D0F12]/55 to-[#0D0F12]/15" />

          <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-32 sm:px-8 sm:pb-20">
            <ScrollReveal>
              <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#F5EFE6]/85 sm:text-sm">
                <span className="flex items-center gap-1 text-[#D4A373]">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <Star className="h-3.5 w-3.5 fill-current" />
                </span>
                <span className="font-semibold">4,9</span>
                <span className="text-[#F5EFE6]/55">· 128 hóspedes</span>
                <span className="h-3 w-px bg-white/15" />
                <span className="flex items-center gap-1.5">
                  <BadgeCheck className="h-4 w-4 text-[#D4A373]" /> Anfitrião Verificado
                </span>
                <span className="h-3 w-px bg-white/15" />
                <span>Resposta em minutos</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <span className="mb-4 block text-xs uppercase tracking-[0.28em] text-[#D4A373] sm:text-sm">
                Boutique Retreat &amp; Private Beach House
              </span>
              <h1
                className="max-w-3xl text-balance text-4xl leading-[1.08] sm:text-6xl md:text-7xl"
                style={{ fontFamily: 'var(--font-villa-serif)' }}
              >
                O pôr do sol é seu.
                <br />
                <em className="text-[#D4A373] not-italic">A tarifa também.</em>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.16}>
              <p className="mb-8 mt-6 max-w-xl text-sm leading-relaxed text-[#F5EFE6]/80 sm:text-base md:text-lg">
                Uma casa de praia autoral à beira-mar. Reserve direto com os anfitriões — sem
                intermediários, sem taxas de 20%.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#reserva"
                  data-magnetic
                  className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full bg-gradient-to-r from-[#e9c9a3] to-[#D4A373] px-8 py-4 text-sm font-bold text-[#20160f] shadow-lg shadow-[#D4A373]/25 transition-shadow hover:shadow-[#D4A373]/45 sm:w-auto"
                >
                  Garantir Tarifa Direta
                </a>
                <a
                  href="#tour"
                  data-magnetic
                  className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-[#F5EFE6] backdrop-blur-sm transition-colors hover:border-[#D4A373]/60 hover:text-[#D4A373] sm:w-auto"
                >
                  Conhecer a casa
                </a>
              </div>

              <p className="mt-4 text-xs text-[#F5EFE6]/60 sm:text-sm">
                A partir de <b className="font-semibold text-[#F5EFE6]">{currency.format(NIGHTLY_RATE)}</b>
                /noite — sem taxa de serviço, sem cartão para consultar.
              </p>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#e08c3c]/30 bg-[#e08c3c]/10 px-3.5 py-2 text-xs text-[#f0cba0]">
                <span className="h-2 w-2 rounded-full bg-[#e08c3c] animate-ring" />
                Apenas <b className="text-white">3 fins de semana</b> livres na alta temporada
              </div>
            </ScrollReveal>
          </div>

          {/* Placa de vidro edge-lit + reflexo (elemento-assinatura da marca) */}
          <div className="absolute bottom-[10vh] right-[6vw] z-10 hidden w-[300px] md:block">
            <div
              className="relative rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-xl"
              style={{ boxShadow: '0 30px 70px -30px rgba(0,0,0,.8), inset 0 1px 0 rgba(255,255,255,.15)' }}
            >
              <div
                className="pointer-events-none absolute -top-px left-[12%] right-[12%] h-0.5 rounded-full"
                style={{
                  background: 'linear-gradient(90deg,transparent,#e9c9a3,#D4A373,transparent)',
                  boxShadow: '0 0 18px 2px rgba(212,163,115,.7)',
                }}
              />
              <span className="block text-[11px] uppercase tracking-[0.18em] text-[#F5EFE6]/70">
                Economia média por estadia
              </span>
              <span className="my-1 flex items-baseline gap-1" style={{ fontFamily: 'var(--font-villa-serif)' }}>
                <span className="text-lg text-[#D4A373]/85">R$</span>
                <span className="text-5xl font-medium text-[#D4A373]">2.900</span>
              </span>
              <span className="block text-xs text-[#F5EFE6]/55">reservando direto vs. Airbnb</span>
              <span className="mt-3 flex gap-2 border-t border-white/10 pt-3 text-xs text-[#F5EFE6]/75">
                ✓ <b className="text-[#D4A373]">0% de taxa</b> de serviço
              </span>
            </div>
            <div
              className="h-14 rounded-2xl bg-white/[0.05] blur-[3px]"
              style={{
                transform: 'scaleY(-1)',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,.35), transparent)',
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,.35), transparent)',
              }}
            />
          </div>
        </section>

        {/* Marquee */}
        <div className="overflow-hidden border-y border-white/10 bg-black/40 py-3">
          <div className="flex w-max animate-marquee gap-10">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((t, i) => (
              <span key={i} className="flex items-center gap-2 whitespace-nowrap text-xs uppercase tracking-[0.16em] text-[#F5EFE6]/65">
                <span className="text-[#D4A373]">✦</span> {t}
              </span>
            ))}
          </div>
        </div>

        {/* Tour scrollytelling */}
        <section id="tour" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <span className="mb-3 block text-xs uppercase tracking-[0.24em] text-[#D4A373]">O Tour</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl" style={{ fontFamily: 'var(--font-villa-serif)' }}>
                Três ambientes, um único horizonte.
              </h2>
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-20">
            {AMBIENTES.map((a, i) => (
              <ScrollReveal key={a.title}>
                <div className={`grid items-center gap-8 md:grid-cols-2 md:gap-16 ${i % 2 === 1 ? 'md:[direction:rtl]' : ''}`}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/15 [direction:ltr]">
                    <Image
                      src={a.img}
                      alt={a.title}
                      fill
                      loading="lazy"
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-[11px] uppercase tracking-wide text-[#F5EFE6]/85 backdrop-blur-sm">
                      <a.icon className="h-3.5 w-3.5 text-[#D4A373]" /> {a.tag}
                    </span>
                  </div>
                  <div className="[direction:ltr]">
                    <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-[#D4A373]">{a.kicker}</span>
                    <h3 className="mb-4 text-2xl sm:text-3xl" style={{ fontFamily: 'var(--font-villa-serif)' }}>
                      {a.title}
                    </h3>
                    <p className="max-w-md text-sm leading-relaxed text-[#F5EFE6]/75 sm:text-base">{a.body}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Comparador de economia em tempo real */}
        <EconomySection />

        {/* Depoimentos — prova social */}
        <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <span className="mb-3 block text-xs uppercase tracking-[0.24em] text-[#D4A373]">Quem já ficou</span>
              <h2 className="text-3xl sm:text-4xl" style={{ fontFamily: 'var(--font-villa-serif)' }}>
                A experiência que os hóspedes levam pra vida.
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid gap-5 sm:grid-cols-3">
            {DEPOIMENTOS.map((d) => (
              <ScrollReveal key={d.n}>
                <div className="h-full rounded-2xl border border-white/15 bg-white/[0.04] p-6">
                  <div className="mb-3 flex gap-0.5 text-[#D4A373]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="mb-4 text-[15px] leading-relaxed" style={{ fontFamily: 'var(--font-villa-serif)' }}>
                    “{d.q}”
                  </p>
                  <p className="text-sm font-semibold">{d.n}</p>
                  <p className="text-xs text-[#F5EFE6]/55">{d.c}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Motor de reserva */}
        <BookingSection />

        {/* Concierge IA */}
        <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <span className="mb-3 block text-xs uppercase tracking-[0.24em] text-[#D4A373]">Concierge IA 24/7</span>
              <h2 className="text-3xl sm:text-4xl" style={{ fontFamily: 'var(--font-villa-serif)' }}>
                Respostas instantâneas, a qualquer hora
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#F5EFE6]/65 sm:text-base">
                Um assistente treinado para a Villa Serena tira dúvidas de hóspedes em segundos, direto no WhatsApp.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
              <div className="mb-6 flex flex-col gap-4">
                <div className="max-w-[85%] self-end rounded-2xl border border-[#D4A373]/25 bg-[#D4A373]/15 px-4 py-3 text-sm leading-relaxed text-[#F5EFE6] sm:max-w-sm">
                  Oi! O check-in pode ser depois das 20h?
                </div>
                <div className="max-w-[85%] self-start rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm leading-relaxed text-[#F5EFE6]/90 sm:max-w-sm">
                  Claro! Na Villa Serena o check-in é flexível até a meia-noite, sem custo extra. Posso confirmar sua chegada às 20h?
                </div>
              </div>
              <a
                href={getWhatsAppLink('Olá! Tenho uma dúvida sobre a Villa Serena.')}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-medium text-[#F5EFE6] transition-colors hover:bg-white/10 sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" /> Falar com o Concierge
              </a>
            </div>
          </ScrollReveal>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 px-5 py-10 text-center sm:px-8">
          <p className="text-xs text-[#F5EFE6]/40">
            Villa Serena é um projeto de demonstração fictício, criado por{' '}
            <Link href="/" className="underline hover:text-[#D4A373]">
              NEURALABS
            </Link>
            .
          </p>
        </footer>
      </div>

      {/* Botão flutuante de voltar (posicionado à esquerda p/ não colidir com o FAB global de WhatsApp) */}
      <Link
        href="/"
        className="fixed bottom-6 left-6 z-50 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#0D0F12]/90 px-4 py-3 text-xs font-semibold text-[#F5EFE6] shadow-lg backdrop-blur-md transition-colors hover:bg-[#0D0F12] sm:px-5 sm:text-sm"
      >
        <ArrowLeft className="h-4 w-4 flex-shrink-0" />
        <span className="hidden sm:inline">Voltar para NEURALABS Studio</span>
        <span className="sm:hidden">NEURALABS</span>
      </Link>
    </main>
  );
}

/* ================================================================== */
/*  COMPARADOR DE ECONOMIA — aversão à perda                           */
/* ================================================================== */
function EconomySection() {
  const [diaria, setDiaria] = useState(NIGHTLY_RATE);
  const [noites, setNoites] = useState(10);

  const total = diaria * noites;
  const economia = Math.round(total * AIRBNB_FEE_PCT);
  const totalAirbnb = total + economia;
  const pct = Math.round((economia / totalAirbnb) * 100);

  return (
    <section id="economia" className="border-y border-white/10 bg-black/20 px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-20">
        <ScrollReveal>
          <span className="mb-3 block text-xs uppercase tracking-[0.24em] text-[#D4A373]">Aversão à Perda</span>
          <h2 className="mb-5 text-3xl sm:text-4xl" style={{ fontFamily: 'var(--font-villa-serif)' }}>
            Cada reserva pelo app
            <br />
            deixa dinheiro na mesa.
          </h2>
          <p className="mb-8 max-w-md text-sm leading-relaxed text-[#F5EFE6]/75 sm:text-base">
            Ajuste a sua estadia e veja em tempo real quanto a comissão do Airbnb consome — e
            quanto volta pro seu bolso reservando direto.
          </p>

          <div className="mb-6">
            <div className="mb-2 flex items-baseline justify-between text-sm text-[#F5EFE6]/70">
              <span>Diária</span>
              <b className="text-lg" style={{ fontFamily: 'var(--font-villa-serif)' }}>{currency.format(diaria)}</b>
            </div>
            <input
              type="range"
              min={500}
              max={4000}
              step={50}
              value={diaria}
              onChange={(e) => setDiaria(Number(e.target.value))}
              aria-label="Valor da diária"
              className="w-full accent-[#D4A373]"
            />
          </div>
          <div>
            <div className="mb-2 flex items-baseline justify-between text-sm text-[#F5EFE6]/70">
              <span>Noites</span>
              <b className="text-lg" style={{ fontFamily: 'var(--font-villa-serif)' }}>
                {noites} {noites > 1 ? 'noites' : 'noite'}
              </b>
            </div>
            <input
              type="range"
              min={2}
              max={30}
              step={1}
              value={noites}
              onChange={(e) => setNoites(Number(e.target.value))}
              aria-label="Número de noites"
              className="w-full accent-[#D4A373]"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-7 backdrop-blur-sm sm:p-9">
            <div className="mb-5">
              <span className="mb-1 block text-sm text-[#F5EFE6]/65">Reservando pelo Airbnb</span>
              <span className="block text-2xl" style={{ fontFamily: 'var(--font-villa-serif)' }}>
                {currency.format(totalAirbnb)}
              </span>
              <span className="text-xs text-[#F5EFE6]/50">+ {currency.format(economia)} em taxas ({pct}%)</span>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[#5a4038]" style={{ width: '100%' }} />
              </div>
            </div>
            <div className="mb-5">
              <span className="mb-1 block text-sm text-[#F5EFE6]/65">Reservando direto na Villa Serena</span>
              <span className="block text-2xl text-[#D4A373]" style={{ fontFamily: 'var(--font-villa-serif)' }}>
                {currency.format(total)}
              </span>
              <span className="text-xs text-[#F5EFE6]/50">sem intermediários</span>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#e9c9a3] to-[#D4A373] transition-all duration-500"
                  style={{ width: `${(total / totalAirbnb) * 100}%` }}
                />
              </div>
            </div>
            <div className="mb-6 flex items-center justify-between border-y border-dashed border-white/15 py-4">
              <span className="text-xs uppercase tracking-[0.14em] text-[#F5EFE6]/70">Você economiza</span>
              <strong
                className="bg-gradient-to-r from-[#D4A373] via-[#fff6ea] to-[#D4A373] bg-clip-text text-3xl text-transparent"
                style={{ fontFamily: 'var(--font-villa-serif)', backgroundSize: '220% 100%' }}
              >
                {currency.format(economia)}
              </strong>
            </div>
            <a
              href={getWhatsAppLink(
                `Olá! Simulei ${noites} noites na Villa Serena (diária ${currency.format(diaria)}) e quero garantir a tarifa direta, economizando ${currency.format(economia)}. 🌅`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#e9c9a3] to-[#D4A373] px-6 py-4 text-sm font-bold text-[#20160f] shadow-lg shadow-[#D4A373]/25 transition-shadow hover:shadow-[#D4A373]/45"
            >
              Quero economizar {currency.format(economia)}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  MOTOR DE RESERVA — calendário simulado                             */
/* ================================================================== */
function BookingSection() {
  const today = useMemo(() => new Date(), []);
  const [cursor, setCursor] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [checkIn, setCheckIn] = useState<number | null>(11);
  const [checkOut, setCheckOut] = useState<number | null>(16);

  const firstDay = new Date(cursor.y, cursor.m, 1).getDay();
  const daysInMonth = new Date(cursor.y, cursor.m + 1, 0).getDate();

  const isPast = (d: number) =>
    cursor.y === today.getFullYear() && cursor.m === today.getMonth() && d < today.getDate();

  const selectDay = (d: number) => {
    if (RESERVADOS.has(d) || isPast(d)) return;
    if (checkIn === null || (checkIn !== null && checkOut !== null)) {
      setCheckIn(d);
      setCheckOut(null);
    } else if (d <= checkIn) {
      setCheckIn(d);
      setCheckOut(null);
    } else {
      setCheckOut(d);
    }
  };

  const inRange = (d: number) => checkIn !== null && checkOut !== null && d > checkIn && d < checkOut;
  const nights = checkIn !== null && checkOut !== null ? checkOut - checkIn : 0;
  const total = nights * NIGHTLY_RATE;

  const move = (dir: number) => {
    setCursor((c) => {
      const m = c.m + dir;
      if (m < 0) return { y: c.y - 1, m: 11 };
      if (m > 11) return { y: c.y + 1, m: 0 };
      return { y: c.y, m };
    });
    setCheckIn(null);
    setCheckOut(null);
  };

  const label = (d: number | null) =>
    d ? `${String(d).padStart(2, '0')}/${String(cursor.m + 1).padStart(2, '0')}` : '—';

  const waMessage =
    nights > 0
      ? `Olá! Quero reservar a Villa Serena de ${label(checkIn)} a ${label(checkOut)} (${nights} noites • ${currency.format(total)}) com a tarifa direta. 🌅`
      : 'Olá! Gostaria de verificar disponibilidade e a tarifa direta da Villa Serena. 🌅';

  return (
    <section id="reserva" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
        <ScrollReveal>
          <span className="mb-3 block text-xs uppercase tracking-[0.24em] text-[#D4A373]">Reserva Direta</span>
          <h2 className="mb-5 text-3xl sm:text-4xl" style={{ fontFamily: 'var(--font-villa-serif)' }}>
            Escolha suas datas.
            <br />
            Feche pelo WhatsApp.
          </h2>
          <p className="mb-7 max-w-md text-sm leading-relaxed text-[#F5EFE6]/75 sm:text-base">
            Sem cadastro, sem burocracia, sem taxa de serviço. Selecione o período e confirme
            direto com os anfitriões.
          </p>

          <div className="mb-6 flex flex-wrap items-end gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div>
              <small className="block text-[11px] uppercase tracking-wide text-[#F5EFE6]/55">Check-in</small>
              <b className="text-xl" style={{ fontFamily: 'var(--font-villa-serif)' }}>{label(checkIn)}</b>
            </div>
            <ArrowRight className="mb-1.5 h-4 w-4 text-[#D4A373]" />
            <div>
              <small className="block text-[11px] uppercase tracking-wide text-[#F5EFE6]/55">Check-out</small>
              <b className="text-xl" style={{ fontFamily: 'var(--font-villa-serif)' }}>{label(checkOut)}</b>
            </div>
            <div className="ml-auto text-right">
              <small className="block text-[11px] uppercase tracking-wide text-[#F5EFE6]/55">
                {nights > 0 ? `${nights} noites` : 'Selecione'}
              </small>
              <b className="text-xl text-[#D4A373]" style={{ fontFamily: 'var(--font-villa-serif)' }}>
                {nights > 0 ? currency.format(total) : '—'}
              </b>
            </div>
          </div>

          <a
            href={getWhatsAppLink(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#e9c9a3] to-[#D4A373] px-6 py-4 text-sm font-bold text-[#20160f] shadow-lg shadow-[#D4A373]/25 transition-shadow hover:shadow-[#D4A373]/45"
          >
            {nights > 0 ? `Reservar ${nights} noites no WhatsApp` : 'Falar no WhatsApp'}
          </a>
          <p className="mt-3 text-center text-xs text-[#F5EFE6]/50">
            Resposta em minutos • Diárias a partir de {currency.format(NIGHTLY_RATE)}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-7">
            <div className="mb-4 flex items-center justify-between">
              <button
                onClick={() => move(-1)}
                aria-label="Mês anterior"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-[#D4A373] hover:text-[#D4A373]"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span style={{ fontFamily: 'var(--font-villa-serif)' }} className="text-lg">
                {MESES[cursor.m]} {cursor.y}
              </span>
              <button
                onClick={() => move(1)}
                aria-label="Próximo mês"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-[#D4A373] hover:text-[#D4A373]"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="mb-1.5 grid grid-cols-7 gap-1">
              {DIAS_SEMANA.map((d, i) => (
                <span key={i} className="py-1 text-center text-xs text-[#F5EFE6]/45">
                  {d}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDay }).map((_, i) => (
                <span key={`e${i}`} className="aspect-square" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const d = i + 1;
                const reserved = RESERVADOS.has(d) || isPast(d);
                const pin = checkIn === d || checkOut === d;
                const between = inRange(d);
                return (
                  <button
                    key={d}
                    disabled={reserved}
                    onClick={() => selectDay(d)}
                    aria-label={`Dia ${d}${reserved ? ' indisponível' : ''}`}
                    className={[
                      'aspect-square rounded-lg text-sm transition-colors',
                      reserved
                        ? 'cursor-not-allowed text-[#F5EFE6]/25 line-through'
                        : pin
                          ? 'bg-gradient-to-br from-[#e9c9a3] to-[#D4A373] font-bold text-[#20160f]'
                          : between
                            ? 'bg-[#D4A373]/15 text-[#F5EFE6]'
                            : 'bg-white/[0.04] text-[#F5EFE6] hover:bg-[#D4A373]/15',
                    ].join(' ')}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
            <div className="mt-5 flex flex-wrap gap-4 text-xs text-[#F5EFE6]/60">
              <span className="flex items-center gap-1.5">
                <i className="inline-block h-3 w-3 rounded bg-white/15" /> Disponível
              </span>
              <span className="flex items-center gap-1.5">
                <i className="inline-block h-3 w-3 rounded bg-[#D4A373]" /> Sua estadia
              </span>
              <span className="flex items-center gap-1.5">
                <i className="inline-block h-3 w-3 rounded border border-white/30" /> Reservado
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
