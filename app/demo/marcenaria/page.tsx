'use client';

/**
 * CERNE — Marcenaria & Arquitetura de Interiores
 * Demonstração Interativa • NEURALABS Studio
 *
 * Identidade autônoma "Luxo Silencioso" (distinta da identidade da própria
 * NEURALABS e da Villa Serena): pesquisamos ateliers reais de marcenaria de
 * alto padrão (Shape London, Make Bespoke Studio) antes de desenhar — o
 * padrão do setor não é dark mode, é claro, minimalista e editorial, com a
 * fotografia (não a UI) carregando o peso visual. Linho #F5F4EE, Musgo
 * #6B7A4E, Carvão-texto #2A2C22. Tipografia: Fraunces (serifada editorial,
 * itálico para ênfase) + Jost (sans/UI, leve).
 *
 * REVISÃO — versão 2: a primeira versão ficou rasa demais pro padrão
 * NEURALABS (poucas seções, pouca profundidade de craft). Esta revisão traz
 * o mesmo nível de camadas da Villa Serena, mas com a assinatura de motion
 * própria da CERNE (nunca copiando 1:1 o vocabulário visual de outro
 * projeto): cartão de vidro editorial flutuante no Hero com gatilho de
 * escassez, barra de números com contagem ao scroll, mosaico de duas fotos
 * + selo "desde" na seção do Ofício, quebra panorâmica com citação de
 * princípio de projeto, portfólio com case em destaque + overlay de hover
 * nos demais, FAQ em acordeão (redução de fricção pré-CTA) e rodapé com
 * navegação própria.
 *
 * Gatilhos de neuromarketing (voltados a quem contrataria a marcenaria —
 * proprietário de residência/escritório de alto padrão, geralmente via
 * arquiteto): prova social pelo portfólio de projetos nomeados e com
 * materiais explícitos (nunca fotos de banco genéricas sem contexto),
 * ancoragem de exclusividade + escassez (agenda 2026 com vagas contadas),
 * autoridade por número (anos de ofício, projetos entregues), redução de
 * fricção pré-consulta (processo em 4 etapas + FAQ antes do CTA) e
 * depoimento de arquiteto (credibilidade entre pares, não apenas cliente
 * final).
 *
 * Sem camada de portfólio dentro da demo: a única menção à NEURALABS é a
 * barra discreta de atribuição no topo + o disclaimer no rodapé.
 *
 * NOTA DE PRODUÇÃO — atualizada: Higgsfield seguia indisponível nesta conta
 * (plano não permite geração real), mas a Bruna gera imagem/vídeo pelo
 * Gemini/Google Flow do lado dela — resolvendo o gap. 8 dos 9 slots de foto
 * abaixo já usam imagens reais geradas assim (hero, banner panorâmico,
 * ofício + detalhe, biblioteca em destaque + detalhe, cozinha, escritório),
 * servidas localmente de /public/images/cerne/. Só o Closet Boutique (grid
 * de portfólio, projeto 04) segue com placeholder do Unsplash — pendente
 * de gerar a foto correspondente (prompt 9 do documento
 * docs/cerne-prompts-gemini.md).
 * Vídeo por IA — atualizado: o Hero agora usa um clipe real gerado no
 * Google Flow (apara de madeira se desprendendo da plaina em câmera lenta,
 * imagem-pra-vídeo a partir do HERO_IMAGE) em vez do Ken Burns em CSS —
 * só em desktop (ver useIsDesktop), por custo de banda. Mobile e
 * prefers-reduced-motion continuam no Ken Burns sobre a foto estática.
 *
 * 3D — v2: uma cadeira de encomenda em wireframe (CerneScene3D), girando
 * devagar como "peça no torno". Trocamos os anéis concêntricos da v1
 * porque esse motivo já tinha sido usado no site da NEURALABS (esfera +
 * anel) e na Villa Serena (ondulação em SVG) — ver
 * docs/IDENTIDADES-E-EFEITOS.md. Um objeto real do ofício da marcenaria é
 * mais coerente com a marca do que uma forma abstrata, e reforça a
 * mensagem de "projeto técnico antes do corte" da seção Processo. Só
 * monta em desktop, atrás do mesmo hook useIsDesktop usado no restante do
 * site.
 */

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Fraunces, Jost } from 'next/font/google';
import { ArrowLeft, ArrowUpRight, MessageCircle, Minus, Plus, Ruler } from 'lucide-react';
import { ScrollReveal } from '@/components/HeroAnimations';
import { CerneScene3D } from '@/components/CerneScene3D';
import { getWhatsAppLink } from '@/lib/whatsapp';

const serif = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cerne-serif',
  display: 'swap',
});
const sans = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cerne-sans',
  display: 'swap',
});

const img = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&q=80&auto=format&fit=crop`;

// Fotos reais geradas pela Bruna no Gemini — ver nota de produção acima.
const HERO_IMAGE = '/images/cerne/hero.jpg';
const HERO_BANNER_IMAGE = '/images/cerne/banner.jpg';
const OFICIO_IMAGE = '/images/cerne/oficio.jpg';
const OFICIO_DETAIL_IMAGE = '/images/cerne/oficio-detalhe.jpg';
const FEATURED_SECONDARY_IMAGE = '/images/cerne/biblioteca-detalhe.jpg';

type Projeto = {
  idx: string;
  nome: string;
  local: string;
  ano: string;
  materiais: string[];
  img: string;
  descricao?: string;
  featured?: boolean;
};

const PROJETOS: Projeto[] = [
  {
    idx: '01',
    nome: 'Biblioteca em Nogueira',
    local: 'Residência Privada · Porto Alegre',
    ano: '2025',
    materiais: ['Nogueira maciça', 'Latão escovado'],
    descricao:
      'Biblioteca de pé-direito duplo com escada suspensa e estante corrida em nogueira maciça — desenhada em conjunto com o arquiteto do projeto desde a planta baixa, não como reforma posterior.',
    img: '/images/cerne/biblioteca.jpg',
    featured: true,
  },
  {
    idx: '02',
    nome: 'Cozinha em Carvalho Fumê',
    local: 'Cobertura · Florianópolis',
    ano: '2024',
    materiais: ['Carvalho fumê', 'Mármore Calacatta'],
    img: '/images/cerne/cozinha.jpg',
  },
  {
    idx: '03',
    nome: 'Escritório Executivo',
    local: 'Sede Corporativa · Curitiba',
    ano: '2024',
    materiais: ['Freijó', 'Vidro fosco'],
    img: '/images/cerne/escritorio.jpg',
  },
  {
    idx: '04',
    nome: 'Closet Boutique',
    local: 'Residência Privada · Gramado',
    ano: '2023',
    materiais: ['Cedro', 'Latão escovado'],
    img: img('photo-1705321963943-de94bb3f0dd3', 1400, 1750),
  },
];

const ETAPAS = [
  {
    n: '01',
    title: 'Consulta & Briefing',
    body: 'Visita técnica ao espaço (ou ao projeto arquitetônico) para entender uso, fluxo e a intenção estética antes de qualquer desenho.',
  },
  {
    n: '02',
    title: 'Projeto Técnico',
    body: 'Desenho detalhado com especificação de madeira, ferragem e acabamento — aprovado com você antes de qualquer corte.',
  },
  {
    n: '03',
    title: 'Produção Artesanal',
    body: 'Cada peça é executada no ateliê, com acompanhamento fotográfico das etapas — nunca produção terceirizada em série.',
  },
  {
    n: '04',
    title: 'Instalação & Entrega',
    body: 'Instalação por nossa própria equipe, com ajuste fino no local. O projeto só está pronto quando encaixa perfeitamente.',
  },
] as const;

const MATERIAIS = [
  'Nogueira Maciça',
  'Carvalho Fumê',
  'Freijó',
  'Cedro',
  'Latão Escovado',
  'Mármore Calacatta',
  'Vidro Fosco',
] as const;

const STATS = [
  { value: 14, suffix: '', label: 'Anos de ofício' },
  { value: 180, suffix: '+', label: 'Projetos entregues' },
  { value: 100, suffix: '%', label: 'Sob encomenda' },
  { value: 3, suffix: '', label: 'Estados atendidos' },
] as const;

const FAQ = [
  {
    q: 'Vocês atendem fora do Rio Grande do Sul?',
    a: 'Sim. Já executamos projetos em Santa Catarina e Paraná — o acompanhamento técnico é feito à distância entre visitas, com presença garantida nos marcos principais do projeto (briefing, aprovação técnica e instalação).',
  },
  {
    q: 'Qual o prazo médio de um projeto?',
    a: 'Entre 8 e 14 semanas da aprovação do projeto técnico até a instalação, dependendo da complexidade e da disponibilidade dos materiais especificados.',
  },
  {
    q: 'Vocês fazem só móveis avulsos ou também elementos arquitetônicos?',
    a: 'Trabalhamos com marcenaria integrada à arquitetura — portas de grandes vãos, painéis, boiseries, escadas — não só peças de mobiliário isoladas.',
  },
  {
    q: 'Como funciona o orçamento?',
    a: 'Após a visita técnica e o briefing, enviamos uma proposta com escopo, materiais e prazo definidos por escrito — sem reabertura de valor no meio do projeto.',
  },
] as const;

/** Botões com leve atração magnética ao cursor — mesma assinatura de motion
 * usada na Villa Serena, aqui em intensidade mais discreta pra combinar com
 * o registro editorial (nada "brincalhão"). Desktop com mouse fino apenas. */
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
        el.style.transform = `translate(${x * 0.15}px, ${y * 0.2}px)`;
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

/** Parallax sutil — só desktop, só sem prefers-reduced-motion */
function useParallax(strength: number, enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 900) * strength;
        el.style.transform = `translateY(${y}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [strength, enabled]);
  return ref;
}

/** Número que sobe de 0 até `value` quando entra em viewport — reforça o
 * gatilho de autoridade (anos/projetos/estados) no momento em que o
 * visitante repara nele, em vez de já chegar estático na tela. */
function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const duration = 1100;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(value * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="text-center sm:text-left">
      <span
        ref={ref}
        className="block text-[36px] leading-none text-[#2A2C22] sm:text-[42px]"
        style={{ fontFamily: 'var(--font-cerne-serif)', fontWeight: 400 }}
      >
        {display}
        <span className="text-[#6B7A4E]">{suffix}</span>
      </span>
      <span className="mt-2 block text-[11px] uppercase tracking-[0.16em] text-[#55584A]">{label}</span>
    </div>
  );
}

function FaqItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#2A2C22]/12 py-6">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 text-left"
      >
        <span className="text-[14.5px] font-medium text-[#2A2C22] sm:text-[15.5px]">{q}</span>
        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[#2A2C22]/20 text-[#6B7A4E] transition-colors">
          {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="max-w-xl pt-4 text-[13px] leading-[1.85] text-[#55584A]">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function MarcenariaDemo() {
  const isDesktop = useIsDesktop();
  const reducedMotion = usePrefersReducedMotion();
  const heroParallaxRef = useParallax(0.08, isDesktop && !reducedMotion);
  const bannerParallaxRef = useParallax(0.05, isDesktop && !reducedMotion);
  const rootRef = useMagnetic();

  return (
    <main
      ref={rootRef}
      className={`relative min-h-screen w-full max-w-full overflow-x-hidden bg-[#F5F4EE] text-[#2A2C22] ${serif.variable} ${sans.variable}`}
      style={{ fontFamily: 'var(--font-cerne-sans)' }}
    >
      {/* Selo NEURALABS — única menção à marca dentro da demo */}
      <div className="flex items-center justify-between gap-4 border-b border-[#2A2C22]/10 bg-[#EDECE3] px-5 py-2 text-[11px] tracking-wide text-[#2A2C22]/70 sm:px-8">
        <span>
          <span className="text-[#6B7A4E]">✦</span> Demonstração desenvolvida por{' '}
          <span className="font-semibold text-[#2A2C22]">NEURALABS Studio</span>
        </span>
        <Link href="/" className="whitespace-nowrap font-medium hover:text-[#6B7A4E]">
          ← Voltar
        </Link>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[#2A2C22]/10 bg-[#F5F4EE]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-5 sm:px-8">
          <span
            className="text-sm uppercase tracking-[0.3em] sm:text-base"
            style={{ fontFamily: 'var(--font-cerne-serif)' }}
          >
            CERNE
          </span>
          <nav className="hidden items-center gap-8 text-[12.5px] font-medium tracking-wide text-[#2A2C22]/75 md:flex">
            <a href="#oficio" className="hover:text-[#6B7A4E]">O Ofício</a>
            <a href="#portfolio" className="hover:text-[#6B7A4E]">Portfólio</a>
            <a href="#processo" className="hover:text-[#6B7A4E]">Processo</a>
            <a href="#faq" className="hover:text-[#6B7A4E]">Perguntas</a>
          </nav>
          <a
            href="#contato"
            data-magnetic
            className="inline-flex flex-shrink-0 items-center justify-center whitespace-nowrap rounded-sm border border-[#2A2C22] px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.15em] text-[#2A2C22] transition-colors hover:bg-[#2A2C22] hover:text-[#F5F4EE] sm:px-6 sm:py-3"
          >
            Solicitar Consulta
          </a>
        </div>
      </header>

      {/* Hero — split editorial, foto à direita + cartão de vidro com escassez */}
      <section className="relative mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-14 sm:px-8 sm:pt-20 md:grid-cols-[1.05fr,1fr] md:gap-6 md:pb-0">
        <div className="flex flex-col justify-center py-6 md:py-20">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-9 bg-[#6B7A4E]" />
            <span className="text-[10.5px] uppercase tracking-[0.28em] text-[#576141]">
              Marcenaria &amp; Arquitetura de Interiores
            </span>
          </div>
          <h1
            className="mb-7 text-[42px] leading-[1.08] sm:text-[54px] md:text-[58px]"
            style={{ fontFamily: 'var(--font-cerne-serif)', fontWeight: 400 }}
          >
            Onde arquitetura<br />
            <em className="text-[#6B7A4E]" style={{ fontStyle: 'italic' }}>
              vira marcenaria.
            </em>
          </h1>
          <p className="mb-9 max-w-[380px] text-[13.5px] leading-[1.9] text-[#55584A]">
            Projetos autorais em madeira e metal para quem trata cada ambiente como peça de
            arquitetura, não decoração. Do desenho técnico ao acabamento manual, uma equipe só
            para o seu projeto.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="#portfolio"
              className="inline-flex w-fit items-center gap-2 border-b border-[#6B7A4E] pb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#2A2C22] hover:text-[#6B7A4E]"
            >
              Ver Portfólio <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href="#contato"
              data-magnetic
              className="inline-flex w-fit items-center gap-2 rounded-sm bg-[#2A2C22] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.15em] text-[#F5F4EE] transition-colors hover:bg-[#6B7A4E]"
            >
              Solicitar Consulta
            </a>
          </div>
        </div>

        <div className="relative -mx-5 aspect-[4/5] overflow-hidden sm:mx-0 sm:rounded-sm md:aspect-auto md:h-[86vh] md:min-h-[560px]">
          <div ref={heroParallaxRef} className="absolute inset-0 -top-[6%] h-[112%] w-full">
            {isDesktop && !reducedMotion ? (
              // Vídeo real (gerado no Google Flow, imagem-pra-vídeo a partir
              // do próprio HERO_IMAGE): apara de madeira se desprendendo da
              // plaina em câmera lenta — assinatura sensorial do craft,
              // trocando o Ken Burns em CSS. Só desktop: custo de banda de
              // vídeo não compensa em mobile, mantém o Ken Burns lá (ver
              // ramo abaixo). Mudo, sem controles, loop contínuo.
              <video
                key="hero-video"
                autoPlay
                muted
                loop
                playsInline
                poster={HERO_IMAGE}
                className="h-full w-full object-cover"
              >
                <source src="/videos/cerne/hero-shaving.webm" type="video/webm" />
                <source src="/videos/cerne/hero-shaving.mp4" type="video/mp4" />
              </video>
            ) : (
              // Fallback mobile e prefers-reduced-motion: Ken Burns em CSS
              // sobre a foto estática — mesma lógica de antes.
              <div className={reducedMotion ? '' : 'h-full w-full animate-ken-burns'}>
                <Image
                  src={HERO_IMAGE}
                  alt="Ambiente com marcenaria sob medida em tons de madeira, luz natural"
                  fill
                  priority
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            )}
          </div>
          {/* Cadeira em wireframe 3D — desktop only, atrás da mesma
              gate de useIsDesktop usada no site principal */}
          {isDesktop && !reducedMotion && <CerneScene3D />}
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F4EE]/20 via-transparent to-transparent md:bg-gradient-to-l md:from-transparent md:via-transparent md:to-[#F5F4EE]/10" />

          {/* Cartão de vidro editorial — assinatura de motion da CERNE,
              equivalente ao card flutuante da Villa Serena, adaptado ao
              registro claro/linho: escassez de agenda em vez de preço. */}
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-auto sm:w-[260px]">
            <div
              className="relative rounded-sm border border-[#2A2C22]/10 bg-[#F5F4EE]/90 p-5 backdrop-blur-xl"
              style={{ boxShadow: '0 24px 50px -24px rgba(42,44,34,.35)' }}
            >
              <div
                className="pointer-events-none absolute -top-px left-[10%] right-[10%] h-px"
                style={{ background: 'linear-gradient(90deg,transparent,#6B7A4E,transparent)' }}
              />
              <span className="mb-2 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-[#576141]">
                <Ruler className="h-3 w-3" /> Agenda 2026
              </span>
              <p className="text-[12.5px] leading-[1.6] text-[#2A2C22]">
                Apenas <b>3 vagas</b> restantes para novos projetos neste trimestre.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Faixa de materiais — assinatura de motion da CERNE (marquee contínuo) */}
      <div className="overflow-hidden border-y border-[#2A2C22]/10 bg-[#EDECE3] py-3.5">
        <div className="flex w-max animate-marquee items-center gap-10 motion-reduce:animate-none">
          {[...MATERIAIS, ...MATERIAIS].map((m, i) => (
            <span
              key={`${m}-${i}`}
              className="flex items-center gap-10 text-[10.5px] uppercase tracking-[0.2em] text-[#576141]"
            >
              {m}
              <span className="text-[#6B7A4E]/50">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Números — gatilho de autoridade, contam ao entrar na viewport */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:gap-6">
          {STATS.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 0.08}>
              <StatCounter value={s.value} suffix={s.suffix} label={s.label} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* O Ofício — mosaico de duas fotos + selo "desde" */}
      <section id="oficio" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-14 md:grid-cols-2 md:gap-20">
          <ScrollReveal>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden sm:rounded-sm">
                <Image
                  src={OFICIO_IMAGE}
                  alt="Detalhe de marcenaria em madeira nobre"
                  fill
                  sizes="(min-width: 768px) 35vw, 80vw"
                  className="object-cover"
                />
              </div>
              {/* Segunda foto sobreposta — mosaico editorial (mesmo device
                  visual da Villa Serena para dar profundidade de camada,
                  em composição própria da CERNE) */}
              <div className="absolute -bottom-8 -right-6 hidden w-[46%] overflow-hidden rounded-sm border-4 border-[#F5F4EE] shadow-xl sm:block">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={OFICIO_DETAIL_IMAGE}
                    alt="Textura e veios de madeira nobre em close"
                    fill
                    sizes="20vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute -top-5 -left-5 hidden rounded-sm border border-[#2A2C22]/10 bg-[#F5F4EE] px-4 py-3 sm:block">
                <span
                  className="block text-[22px] leading-none text-[#6B7A4E]"
                  style={{ fontFamily: 'var(--font-cerne-serif)', fontStyle: 'italic' }}
                >
                  Desde 2011
                </span>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="flex h-full flex-col justify-center pt-8 sm:pt-0">
              <div className="mb-7 flex items-center gap-3">
                <span className="h-px w-9 bg-[#6B7A4E]" />
                <span className="text-[10.5px] uppercase tracking-[0.28em] text-[#576141]">O Ofício</span>
              </div>
              <h2
                className="mb-6 text-[30px] leading-[1.18] sm:text-[36px]"
                style={{ fontFamily: 'var(--font-cerne-serif)', fontWeight: 400 }}
              >
                Cada peça, <em style={{ fontStyle: 'italic', color: '#6B7A4E' }}>um projeto.</em><br />
                Nunca uma prateleira.
              </h2>
              <p className="mb-5 max-w-md text-[13.5px] leading-[1.9] text-[#55584A]">
                Não trabalhamos com catálogo. Cada encomenda começa de uma folha em branco — o
                desenho nasce do espaço, não o contrário. A CERNE atende um número limitado de
                projetos por ano, o suficiente para que cada um receba atenção de atelier, não de
                fábrica.
              </p>
              <p className="max-w-md text-[13.5px] leading-[1.9] text-[#55584A]">
                Trabalhamos lado a lado com arquitetos e designers de interiores — o projeto de
                marcenaria nasce junto com o projeto arquitetônico, não depois dele.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quebra panorâmica — respiro editorial entre Ofício e Portfólio,
          com citação de princípio de projeto sobre a foto (parallax). */}
      <section className="relative h-[52vh] min-h-[340px] overflow-hidden sm:h-[60vh]">
        <div ref={bannerParallaxRef} className="absolute inset-0 -top-[10%] h-[130%] w-full">
          <Image
            src={HERO_BANNER_IMAGE}
            alt="Painel panorâmico de marcenaria em madeira, luz lateral"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A2C22]/75 via-[#2A2C22]/25 to-[#2A2C22]/10" />
        <div className="relative flex h-full items-end px-5 pb-10 sm:items-center sm:justify-center sm:px-8 sm:pb-0">
          <ScrollReveal>
            <p
              className="max-w-2xl text-[22px] leading-[1.4] text-[#F5F4EE] sm:text-center sm:text-[30px]"
              style={{ fontFamily: 'var(--font-cerne-serif)', fontStyle: 'italic', fontWeight: 400 }}
            >
              &ldquo;Arquitetura não termina na planta baixa — termina na textura que a mão
              sente.&rdquo;
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Portfólio — case em destaque + grid dos demais com overlay de hover */}
      <section id="portfolio" className="border-t border-[#2A2C22]/10 bg-[#EDECE3] px-5 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="mb-16 max-w-lg">
              <div className="mb-7 flex items-center gap-3">
                <span className="h-px w-9 bg-[#6B7A4E]" />
                <span className="text-[10.5px] uppercase tracking-[0.28em] text-[#576141]">Portfólio</span>
              </div>
              <h2
                className="text-[30px] leading-[1.18] sm:text-[36px]"
                style={{ fontFamily: 'var(--font-cerne-serif)', fontWeight: 400 }}
              >
                Projetos recentes
              </h2>
            </div>
          </ScrollReveal>

          {/* Case em destaque */}
          {PROJETOS.filter((p) => p.featured).map((p) => (
            <ScrollReveal key={p.idx}>
              <div className="mb-20 grid gap-10 md:grid-cols-2 md:gap-4">
                <div className="group relative aspect-[4/5] overflow-hidden sm:rounded-sm md:aspect-auto">
                  <Image
                    src={p.img}
                    alt={p.nome}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A2C22]/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute bottom-4 left-4 translate-y-2 text-[10.5px] uppercase tracking-[0.2em] text-[#F5F4EE] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    Projeto em destaque
                  </span>
                </div>
                <div className="relative flex flex-col justify-center py-4">
                  <div className="relative -mt-10 hidden aspect-[4/3] w-[62%] self-end overflow-hidden rounded-sm border-4 border-[#EDECE3] shadow-lg md:block">
                    <Image
                      src={FEATURED_SECONDARY_IMAGE}
                      alt={`${p.nome} — detalhe`}
                      fill
                      sizes="30vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-6 flex items-baseline gap-3 md:mt-10">
                    <span className="text-[11px] text-[#6B7A4E]">{p.idx} — {p.ano}</span>
                  </div>
                  <h3
                    className="mb-3 mt-2 text-[24px] leading-tight sm:text-[28px]"
                    style={{ fontFamily: 'var(--font-cerne-serif)', fontStyle: 'italic', fontWeight: 400 }}
                  >
                    {p.nome}
                  </h3>
                  <p className="mb-4 text-[12px] text-[#5C5147]">{p.local}</p>
                  <p className="mb-5 max-w-md text-[13px] leading-[1.85] text-[#55584A]">{p.descricao}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.materiais.map((m) => (
                      <span
                        key={m}
                        className="rounded-full border border-[#2A2C22]/15 px-3 py-1 text-[10.5px] uppercase tracking-[0.12em] text-[#576141]"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}

          {/* Grid dos demais projetos */}
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-3">
            {PROJETOS.filter((p) => !p.featured).map((p, i) => (
              <ScrollReveal key={p.idx} delay={i * 0.06}>
                <div className="group">
                  <div className="relative mb-5 aspect-[4/5] overflow-hidden sm:rounded-sm">
                    <Image
                      src={p.img}
                      alt={p.nome}
                      fill
                      sizes="(min-width: 640px) 30vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2A2C22]/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="absolute bottom-4 left-4 flex translate-y-2 items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-[#F5F4EE] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      Ver projeto <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-[11px] text-[#6B7A4E]">{p.idx}</span>
                    <div>
                      <h3
                        className="text-[19px] leading-tight"
                        style={{ fontFamily: 'var(--font-cerne-serif)', fontStyle: 'italic', fontWeight: 400 }}
                      >
                        {p.nome}
                      </h3>
                      <p className="mt-1.5 text-[11.5px] text-[#5C5147]">{p.local} · {p.ano}</p>
                      <p className="text-[11.5px] text-[#5C5147]/70">{p.materiais.join(' · ')}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Processo */}
      <section id="processo" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
        <ScrollReveal>
          <div className="mb-16 max-w-lg">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-9 bg-[#6B7A4E]" />
              <span className="text-[10.5px] uppercase tracking-[0.28em] text-[#576141]">Como Funciona</span>
            </div>
            <h2
              className="text-[30px] leading-[1.18] sm:text-[36px]"
              style={{ fontFamily: 'var(--font-cerne-serif)', fontWeight: 400 }}
            >
              Do desenho à instalação
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {ETAPAS.map((e, i) => (
            <ScrollReveal key={e.n} delay={i * 0.07}>
              <div className="border-t border-[#2A2C22]/15 pt-6">
                <span
                  className="mb-4 block text-[26px] text-[#6B7A4E]"
                  style={{ fontFamily: 'var(--font-cerne-serif)', fontStyle: 'italic' }}
                >
                  {e.n}
                </span>
                <h3 className="mb-3 text-[14.5px] font-medium text-[#2A2C22]">{e.title}</h3>
                <p className="text-[12.5px] leading-[1.8] text-[#55584A]">{e.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Depoimento — credibilidade entre pares (arquiteto) */}
      <section className="border-t border-[#2A2C22]/10 bg-[#EDECE3] px-5 py-24 sm:px-8 sm:py-28">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <p
              className="mb-8 text-[22px] leading-[1.5] sm:text-[26px]"
              style={{ fontFamily: 'var(--font-cerne-serif)', fontStyle: 'italic', fontWeight: 400 }}
            >
              &ldquo;A CERNE é a única marcenaria que indico sem ressalva para projetos
              autorais. Eles desenham junto, não só executam — o resultado final sempre bate
              exatamente com o que foi especificado em projeto.&rdquo;
            </p>
            <p className="text-[11.5px] uppercase tracking-[0.2em] text-[#576141]">
              Renata Xavier — Arquiteta, RX Arquitetura
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* FAQ — redução de fricção antes do CTA final */}
      <section id="faq" className="mx-auto max-w-3xl px-5 py-24 sm:px-8 sm:py-28">
        <ScrollReveal>
          <div className="mb-12 max-w-lg">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-9 bg-[#6B7A4E]" />
              <span className="text-[10.5px] uppercase tracking-[0.28em] text-[#576141]">Perguntas Frequentes</span>
            </div>
            <h2
              className="text-[30px] leading-[1.18] sm:text-[36px]"
              style={{ fontFamily: 'var(--font-cerne-serif)', fontWeight: 400 }}
            >
              Antes de conversarmos
            </h2>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div>
            {FAQ.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Contato */}
      <section id="contato" className="mx-auto max-w-3xl px-5 py-24 sm:px-8 sm:py-28">
        <ScrollReveal>
          <div className="mb-10 text-center">
            <span className="mb-4 block text-[10.5px] uppercase tracking-[0.28em] text-[#576141]">
              Agenda Limitada
            </span>
            <h2
              className="mb-5 text-[30px] leading-[1.18] sm:text-[36px]"
              style={{ fontFamily: 'var(--font-cerne-serif)', fontWeight: 400 }}
            >
              Vamos conversar sobre o seu projeto
            </h2>
            <p className="mx-auto max-w-md text-[13.5px] leading-[1.9] text-[#55584A]">
              Atendemos um número limitado de projetos por trimestre. Conte um pouco sobre o
              espaço e a ideia — respondemos pessoalmente em até um dia útil.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="flex flex-col items-center gap-4">
            <a
              href={getWhatsAppLink(
                'Olá! Vi o portfólio da CERNE e gostaria de conversar sobre um projeto de marcenaria.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className="inline-flex items-center gap-2 rounded-sm bg-[#2A2C22] px-8 py-4 text-[12px] font-medium uppercase tracking-[0.15em] text-[#F5F4EE] transition-colors hover:bg-[#6B7A4E]"
            >
              <MessageCircle className="h-4 w-4" /> Solicitar Consulta
            </a>
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#576141]/80">
              Atendemos Rio Grande do Sul · Santa Catarina · Paraná
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2A2C22]/10 px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11.5px] font-medium tracking-wide text-[#2A2C22]/70">
            <a href="#oficio" className="hover:text-[#6B7A4E]">O Ofício</a>
            <a href="#portfolio" className="hover:text-[#6B7A4E]">Portfólio</a>
            <a href="#processo" className="hover:text-[#6B7A4E]">Processo</a>
            <a href="#faq" className="hover:text-[#6B7A4E]">Perguntas</a>
          </nav>
          <p className="text-[11px] text-[#2A2C22]/45">
            Projeto fictício de demonstração criado por{' '}
            <Link href="/" className="underline hover:text-[#6B7A4E]">
              NEURALABS
            </Link>
            . Marca, fotos e depoimentos são ilustrativos.
          </p>
        </div>
      </footer>

      {/* Botão flutuante de voltar */}
      <Link
        href="/"
        className="fixed bottom-6 left-6 z-50 inline-flex items-center gap-2 rounded-full border border-[#2A2C22]/15 bg-[#F5F4EE]/95 px-4 py-3 text-xs font-semibold text-[#2A2C22] shadow-lg backdrop-blur-md transition-colors hover:bg-[#F5F4EE] sm:px-5 sm:text-sm"
      >
        <ArrowLeft className="h-4 w-4 flex-shrink-0" />
        <span className="hidden sm:inline">Voltar para NEURALABS Studio</span>
        <span className="sm:hidden">NEURALABS</span>
      </Link>
    </main>
  );
}
