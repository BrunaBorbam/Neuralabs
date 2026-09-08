'use client';

/**
 * VILLA SERENA — Boutique Retreat & Private Beach House
 * Demonstração Interativa • NEURALABS Studio
 *
 * Identidade autônoma "Coastal Sunset Luxury" (distinta da identidade do
 * site-mãe): Obsidiana #0D0F12, Terracota-Ouro #D4A373, Linho-Marfim #F5EFE6,
 * Teca #2D241E. Tipografia: Bodoni Moda (serifada editorial) + Plus Jakarta
 * Sans (corpo/UI).
 *
 * Gatilhos de neuromarketing (voltados ao hóspede — quem decide reservar,
 * não quem contrataria a NEURALABS): prova social e âncora de status no
 * Hero, aversão à perda (comparador em tempo real vs. plataforma), escassez
 * de datas, redução de fricção na reserva (calendário → WhatsApp) e nas
 * objeções pré-reserva (localização + política de cancelamento explícitas).
 *
 * Sem camada de portfólio dentro da demo: a única menção à NEURALABS é a
 * barra discreta de atribuição no topo + o disclaimer no rodapé — a
 * narrativa de venda para donos de imóvel mora na página de Portfólio do
 * site principal, não aqui.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bodoni_Moda, Plus_Jakarta_Sans } from 'next/font/google';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  Flame,
  MessageCircle,
  Plus,
  Sparkles,
  Star,
} from 'lucide-react';
import { ScrollReveal } from '@/components/HeroAnimations';
import { getWhatsAppLink } from '@/lib/whatsapp';

const serif = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-villa-serif',
  display: 'swap',
});
const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-villa-sans',
  display: 'swap',
});

const HERO_IMAGE = '/images/villa-serena/hero.jpg';
const HERO_VIDEO = '/videos/villa-serena/hero.mp4';
const SUITE_IMAGE = '/images/villa-serena/suite.jpg';
const DECK_IMAGE = '/images/villa-serena/deck.jpg';
const GOURMET_IMAGE = '/images/villa-serena/gourmet.jpg';
const REGIAO_IMAGE = '/images/villa-serena/regiao.jpg';

const NIGHTLY_RATE = 1640;
const AIRBNB_FEE_PCT = 0.2;

const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
});

const AMBIENTES = [
  {
    kicker: '01 — Suíte master · Tarde',
    title: 'A suíte que emoldura o pôr do sol',
    body: '48 m², cama king, linho de 400 fios e portas que abrem inteiras para o mar. Às quatro da tarde a luz entra dourada e fica.',
    img: SUITE_IMAGE,
    icon: Sparkles,
    tag: 'Vista frontal · Varanda privativa',
  },
  {
    kicker: '02 — Deck privativo · Anoitecer',
    title: 'Deck privativo com fogo de chão',
    body: 'Sofás baixos, lanternas e uma fogueira de pedra a poucos passos da areia. O vinho já está gelado quando o sol toca a água.',
    img: DECK_IMAGE,
    icon: Flame,
    tag: 'Lounge externo · Adega',
  },
  {
    kicker: '03 — Espaço gourmet · Noite',
    title: 'Espaço gourmet com parrilla e adega',
    body: 'Parrilla argentina a lenha e uma adega climatizada com rótulos da Serra Gaúcha e do Vale do Maipo. A mesa de dez lugares fica de frente para o mar.',
    img: GOURMET_IMAGE,
    icon: ChefHat,
    tag: 'Parrilla a lenha · Mesa para 10',
  },
] as const;

const DEPOIMENTOS = [
  {
    q: 'Reservamos direto pelo WhatsApp e a Marina respondeu em oito minutos. Chegamos e tinha frutas, café e um bilhete escrito à mão.',
    n: 'Camila R.',
    c: 'São Paulo · Réveillon 2025',
  },
  {
    q: 'Economizamos mais de mil reais em relação ao que tínhamos visto na plataforma. Usamos em um passeio de barco até Caraíva.',
    n: 'Rodrigo & Ana',
    c: 'Belo Horizonte · Julho 2025',
  },
  {
    q: 'O deck às 17h40 é o motivo pelo qual voltamos pelo terceiro ano seguido. Nada em Trancoso se compara.',
    n: 'Família Duarte',
    c: 'Rio de Janeiro · Hóspedes recorrentes',
  },
];

const MARQUEE_ITEMS = [
  'Sem taxa de plataforma',
  'Cancelamento flexível até 14 dias',
  'Concierge por WhatsApp',
  'Limpeza diária',
  'Superhost desde 2019',
  'Pagamento seguro Pix/cartão',
];

const DISTANCIAS = [
  { valor: '40 m', desc: 'até a areia' },
  { valor: '12 min', desc: 'a pé até o Quadrado de Trancoso' },
  { valor: '45 min', desc: 'de carro até o Aeroporto de Porto Seguro' },
  { valor: '25 min', desc: 'de barco até Caraíva' },
];

const FAQ_ITEMS = [
  {
    q: 'E se eu precisar cancelar?',
    a: 'Cancelamento flexível: reembolso integral até 14 dias antes do check-in, via Pix ou estorno no cartão. Depois disso, 50% até 7 dias antes. A confirmação do cancelamento é feita por escrito, no mesmo WhatsApp da reserva.',
  },
  {
    q: 'O pagamento é seguro sem passar pela plataforma?',
    a: 'Sim — pagamento por Pix ou cartão em até 6x, processado por link de cobrança seguro. Você recebe um contrato simples de locação por temporada por e-mail antes de pagar qualquer valor.',
  },
  {
    q: 'Existe caução ou alguma taxa escondida?',
    a: 'Uma caução reembolsável é retida na reserva e devolvida em até 48h após o check-out, sem descontos além de danos comprovados. Sem taxa de limpeza extra, sem taxa de serviço — o valor que você vê é o valor final.',
  },
  {
    q: 'Como funciona o check-in?',
    a: 'Check-in a partir das 15h, com a anfitriã recebendo pessoalmente ou deixando tudo pronto para autoatendimento, como preferir. O endereço e as instruções de acesso chegam por WhatsApp 48h antes da chegada.',
  },
];

const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];
const DIAS_SEMANA = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const RESERVADOS = new Set([4, 5, 18, 19, 25]);

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return isDesktop;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}

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

/** Subtle pointer-tilt on the floating savings card — desktop, fine-pointer only. */
function useTilt<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia('(hover: hover)').matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg)`;
    };
    const leave = () => (el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)');
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, []);
  return ref;
}

/** Gentle vertical parallax, desktop + non-reduced-motion only, clamped so the layer never leaves its frame. */
function useParallax<T extends HTMLElement>(strength: number, maxPx: number, enabled: boolean) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const parent = el.parentElement;
      if (!parent) return;
      const box = parent.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const centre = box.top + box.height / 2 - vh / 2;
      let v = centre * -strength;
      if (v > maxPx) v = maxPx;
      if (v < -maxPx) v = -maxPx;
      el.style.transform = `translate3d(0, ${v.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(tick);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    tick();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength, maxPx, enabled]);
  return ref;
}

export default function VillaSerenaDemo() {
  const rootRef = useMagnetic();
  const isDesktop = useIsDesktop();
  const reducedMotion = usePrefersReducedMotion();
  const showHeroVideo = isDesktop && !reducedMotion;
  const heroParallaxRef = useParallax<HTMLDivElement>(0.18, 60, isDesktop && !reducedMotion);
  const cardTiltRef = useTilt<HTMLDivElement>();

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
        {/* Selo NEURALABS — única menção à marca dentro da demo */}
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
            <nav className="hidden items-center gap-7 text-[13px] font-medium tracking-wide text-[#F5EFE6]/85 md:flex">
              <a href="#tour" className="hover:text-[#D4A373]">A Villa</a>
              <a href="#tour" className="hover:text-[#D4A373]">Experiências</a>
              <a href="#economia" className="hover:text-[#D4A373]">Tarifas</a>
              <a href="#localizacao" className="hover:text-[#D4A373]">Localização</a>
            </nav>
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
          <div ref={heroParallaxRef} className="absolute inset-0 -top-[8%] h-[118%] w-full">
            {showHeroVideo ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={HERO_IMAGE}
                className="h-full w-full object-cover"
              >
                <source src={HERO_VIDEO} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={HERO_IMAGE}
                alt="Villa Serena — piscina de borda infinita ao entardecer, à beira-mar"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            )}
          </div>
          {/* Golden-hour: aquece a foto para casar com a promessa "pôr do sol" */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(224,140,60,.28),rgba(212,163,115,.1)_45%,rgba(13,15,18,.08))] mix-blend-soft-light" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F12] via-[#0D0F12]/55 to-[#0D0F12]/15" />

          {/* Ondulação d'água — elemento-assinatura de motion da marca, desktop only */}
          <svg
            className="pointer-events-none absolute bottom-[-10%] right-[-4%] z-[1] hidden h-[380px] w-[380px] opacity-[0.16] motion-reduce:hidden md:block"
            viewBox="0 0 600 600"
          >
            {[0, 1.75, 3.5, 5.25].map((delay) => (
              <circle key={delay} cx="300" cy="300" r="40" fill="none" stroke="#E9C9A3" strokeWidth="0.8">
                <animate attributeName="r" values="30;290" dur="7s" begin={`${delay}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0" dur="7s" begin={`${delay}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </svg>

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
                <span className="font-semibold">5,0</span>
                <span className="text-[#F5EFE6]/55">· 212 avaliações</span>
                <span className="h-3 w-px bg-white/15" />
                <span className="flex items-center gap-1.5">
                  <BadgeCheck className="h-4 w-4 text-[#D4A373]" /> Anfitrião Verificado
                </span>
                <span className="h-3 w-px bg-white/15" />
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#7bd389] shadow-[0_0_8px_#7bd389]" /> Resposta em minutos
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <h1
                className="max-w-3xl text-balance text-4xl leading-[1.08] sm:text-6xl md:text-7xl"
                style={{ fontFamily: 'var(--font-villa-serif)' }}
              >
                O pôr do sol de Trancoso,
                <br />
                <em className="text-[#D4A373] not-italic">sem intermediários.</em>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.16}>
              <p className="mb-6 mt-6 max-w-xl text-sm leading-relaxed text-[#F5EFE6]/80 sm:text-base md:text-lg">
                Casa de praia com quatro suítes, piscina de borda infinita e acesso privativo à
                areia. Reserve direto com o anfitrião e fique com o valor que as plataformas
                cobram de taxa.
              </p>

              <div className="mb-6 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-5 text-sm">
                <div>
                  <span className="block text-2xl" style={{ fontFamily: 'var(--font-villa-serif)' }}>4</span>
                  <span className="text-[11px] uppercase tracking-wide text-[#F5EFE6]/55">suítes</span>
                </div>
                <div>
                  <span className="block text-2xl" style={{ fontFamily: 'var(--font-villa-serif)' }}>10</span>
                  <span className="text-[11px] uppercase tracking-wide text-[#F5EFE6]/55">hóspedes</span>
                </div>
                <div>
                  <span className="block text-2xl" style={{ fontFamily: 'var(--font-villa-serif)' }}>40 m</span>
                  <span className="text-[11px] uppercase tracking-wide text-[#F5EFE6]/55">até a areia</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#reserva"
                  data-magnetic
                  className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full bg-gradient-to-r from-[#e9c9a3] to-[#D4A373] px-8 py-4 text-sm font-bold text-[#20160f] shadow-lg shadow-[#D4A373]/25 transition-shadow hover:shadow-[#D4A373]/45 sm:w-auto"
                >
                  Verificar disponibilidade
                </a>
                <a
                  href="#tour"
                  data-magnetic
                  className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-[#F5EFE6] backdrop-blur-sm transition-colors hover:border-[#D4A373]/60 hover:text-[#D4A373] sm:w-auto"
                >
                  Conhecer a villa
                </a>
              </div>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#e08c3c]/30 bg-[#e08c3c]/10 px-3.5 py-2 text-xs text-[#f0cba0]">
                <span className="h-2 w-2 rounded-full bg-[#e08c3c] animate-ring" />
                Apenas <b className="text-white">3 fins de semana</b> livres na alta temporada
              </div>
            </ScrollReveal>
          </div>

          {/* Placa de vidro edge-lit + reflexo (elemento-assinatura da marca) */}
          <div className="absolute bottom-[10vh] right-[6vw] z-10 hidden w-[300px] md:block">
            <div
              ref={cardTiltRef}
              className="relative rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-xl transition-transform duration-300"
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
                <span className="text-5xl font-medium text-[#D4A373]">1.640</span>
              </span>
              <span className="block text-xs text-[#F5EFE6]/55">reservando direto vs. plataforma</span>
              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
                <span className="text-[#F5EFE6]/50 line-through">{currency.format(9840)}</span>
                <span className="font-semibold text-[#D4A373]">{currency.format(8200)}</span>
              </div>
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
              <span className="mb-3 block text-xs uppercase tracking-[0.24em] text-[#D4A373]">A villa</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl" style={{ fontFamily: 'var(--font-villa-serif)' }}>
                Três horas do dia, três lugares para viver.
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

        {/* Localização — reduz a incerteza de reservar direto num lugar desconhecido */}
        <section id="localizacao" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <ScrollReveal>
              <span className="mb-3 block text-xs uppercase tracking-[0.24em] text-[#D4A373]">Onde fica</span>
              <h2 className="mb-5 max-w-lg text-3xl sm:text-4xl" style={{ fontFamily: 'var(--font-villa-serif)' }}>
                No coração de Trancoso, <em className="text-[#D4A373] not-italic">longe de tudo que atrapalha</em>.
              </h2>
              <p className="mb-7 max-w-md text-sm leading-relaxed text-[#F5EFE6]/75 sm:text-base">
                Perto o suficiente pra tudo, isolada o bastante pra ninguém te encontrar sem
                avisar antes. O endereço exato é enviado depois da confirmação da reserva.
              </p>
              <div className="flex flex-col gap-3.5">
                {DISTANCIAS.map((d) => (
                  <div key={d.desc} className="flex items-baseline gap-3.5">
                    <span
                      className="inline-block w-[62px] shrink-0 text-lg text-[#D4A373]"
                      style={{ fontFamily: 'var(--font-villa-serif)' }}
                    >
                      {d.valor}
                    </span>
                    <span className="text-sm text-[#F5EFE6]/70">{d.desc}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="relative h-[320px] overflow-hidden rounded-2xl border border-white/15 sm:h-[420px]">
                <Image
                  src={REGIAO_IMAGE}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F12]/70 via-[#0D0F12]/5 to-transparent" />
                <span className="absolute bottom-5 left-5 text-[10px] uppercase tracking-[0.14em] text-[#F5EFE6]/65">
                  Imagem ilustrativa da região
                </span>
              </div>
            </ScrollReveal>
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
                212 avaliações, nota 5,0.
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
                  <p className="mb-4 text-[15px] leading-relaxed italic" style={{ fontFamily: 'var(--font-villa-serif)' }}>
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

        {/* Perguntas antes de reservar — resolve a objeção de reservar direto, sem a "garantia" da plataforma */}
        <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
          <ScrollReveal>
            <div className="mb-10">
              <span className="mb-3 block text-xs uppercase tracking-[0.24em] text-[#D4A373]">Antes de reservar</span>
              <h2 className="text-3xl sm:text-4xl" style={{ fontFamily: 'var(--font-villa-serif)' }}>
                Reservar direto é tão seguro quanto pela plataforma{' '}
                <em className="text-[#D4A373] not-italic">— só que sem a taxa</em>.
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <div className="flex flex-col">
              {FAQ_ITEMS.map((item, i) => (
                <details
                  key={item.q}
                  open={i === 0}
                  className="group border-t border-white/10 py-5 last:border-b"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-medium text-[#F5EFE6] marker:content-none">
                    {item.q}
                    <Plus className="h-4 w-4 flex-shrink-0 text-[#D4A373] transition-transform duration-300 group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#F5EFE6]/65">{item.a}</p>
                </details>
              ))}
            </div>
          </ScrollReveal>
        </section>

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
            Projeto fictício de demonstração criado por{' '}
            <Link href="/" className="underline hover:text-[#D4A373]">
              NEURALABS
            </Link>
            . Marca, fotos e depoimentos são ilustrativos.
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
  const [noites, setNoites] = useState(5);

  const total = diaria * noites;
  const economia = Math.round(total * AIRBNB_FEE_PCT);
  const totalAirbnb = total + economia;
  const pct = Math.round((economia / totalAirbnb) * 100);

  return (
    <section id="economia" className="border-y border-white/10 bg-black/20 px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-20">
        <ScrollReveal>
          <span className="mb-3 block text-xs uppercase tracking-[0.24em] text-[#D4A373]">Compare antes de reservar</span>
          <h2 className="mb-5 text-3xl sm:text-4xl" style={{ fontFamily: 'var(--font-villa-serif)' }}>
            A mesma casa. As mesmas noites.
            <br />
            Um preço diferente.
          </h2>
          <p className="mb-8 max-w-md text-sm leading-relaxed text-[#F5EFE6]/75 sm:text-base">
            Plataformas somam cerca de 20% em taxas de serviço. Ajuste a estadia e veja quanto
            fica com você.
          </p>

          <div className="mb-6">
            <div className="mb-2 flex items-baseline justify-between text-sm text-[#F5EFE6]/70">
              <span>Diária</span>
              <b className="text-lg" style={{ fontFamily: 'var(--font-villa-serif)' }}>{currency.format(diaria)}</b>
            </div>
            <input
              type="range"
              min={900}
              max={2500}
              step={20}
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
              max={14}
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
              <span className="mb-1 block text-sm text-[#F5EFE6]/65">Pela plataforma</span>
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
              <span className="text-xs uppercase tracking-[0.14em] text-[#F5EFE6]/70">Você fica com</span>
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
  const [checkIn, setCheckIn] = useState<number | null>(12);
  const [checkOut, setCheckOut] = useState<number | null>(17);

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
            Escolha as datas.
            <br />
            A gente cuida do resto.
          </h2>
          <p className="mb-7 max-w-md text-sm leading-relaxed text-[#F5EFE6]/75 sm:text-base">
            Confirmação pelo WhatsApp em minutos, pagamento por Pix ou cartão em até 6x, e um
            concierge disponível do check-in ao check-out.
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
            {nights > 0 ? `Reservar ${nights} noites pelo WhatsApp` : 'Falar no WhatsApp'}
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
