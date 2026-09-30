'use client';

/**
 * CERNE — Marcenaria & Arquitetura de Interiores
 * Demonstração Interativa • NEURALABS Studio
 *
 * Bilíngue (PT/EN) via LanguageContext + DemoLangToggle: todo o texto vem do
 * objeto CONTENT abaixo, escolhido por idioma; o seletor flutuante lê ?lang=en
 * da URL para permitir compartilhar o demo já em inglês com cliente no exterior.
 */

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Fraunces, Jost } from 'next/font/google';
import { ArrowLeft, ArrowUpRight, Minus, Plus, Ruler } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/HeroAnimations';
import { CerneContactForm } from '@/components/CerneContactForm';
import { DemoLangToggle } from '@/components/DemoLangToggle';
import { useLanguage } from '@/context/LanguageContext';
import WoodGrainCanvas from './WoodGrainCanvas';

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

// Fotos reais geradas pela Bruna no Gemini — ver histórico do projeto.
const HERO_IMAGE = '/images/cerne/hero.jpg';
const HERO_BANNER_IMAGE = '/images/cerne/banner.jpg';
const OFICIO_IMAGE = '/images/cerne/oficio.jpg';

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

// Números (estrutura fixa) — os rótulos vêm de CONTENT por idioma.
const STATS_BASE = [
  { value: 14, suffix: '' },
  { value: 180, suffix: '+' },
  { value: 100, suffix: '%' },
  { value: 3, suffix: '' },
] as const;

const CONTENT = {
  pt: {
    attributionBefore: 'Demonstração desenvolvida por ',
    attributionStudio: 'NEURALABS Studio',
    back: '← Voltar',
    nav: { oficio: 'O Ofício', portfolio: 'Portfólio', processo: 'Processo', faq: 'Perguntas' },
    ctaConsult: 'Solicitar Consulta',
    heroEyebrow: 'Marcenaria & Arquitetura de Interiores',
    heroTitle1: 'Onde arquitetura',
    heroTitleEm: 'vira marcenaria.',
    heroText:
      'Projetos autorais em madeira e metal para quem trata cada ambiente como peça de arquitetura, não decoração. Do desenho técnico ao acabamento manual, uma equipe só para o seu projeto.',
    heroSeePortfolio: 'Ver Portfólio',
    agendaLabel: 'Agenda 2026',
    scarcityBefore: 'Apenas ',
    spotsWord: 'vagas',
    scarcityAfter: ' restantes para novos projetos neste trimestre.',
    oficioEyebrow: 'O Ofício',
    oficioTitle1: 'Cada peça, ',
    oficioTitleEm: 'um projeto.',
    oficioP1:
      'Não trabalhamos com catálogo. Cada encomenda começa de uma folha em branco — o desenho nasce do espaço, não o contrário.',
    oficioP2:
      'A CERNE atende um número limitado de projetos por ano, o suficiente para que cada um receba atenção de atelier, não de fábrica.',
    foundedLabel: 'Ano de Fundação',
    craftLine1: 'Artesanato',
    craftLine2: 'e Precisão',
    quote: '“Arquitetura não termina na planta baixa — termina na textura que a mão sente.”',
    portfolioEyebrow: 'Portfólio',
    portfolioTitle1: 'Galeria de ',
    portfolioTitleEm: 'Obras',
    verFicha: 'Ver Ficha Técnica',
    processoEyebrow: 'Como Funciona',
    processoTitle: 'Do desenho à instalação',
    testimonialQuote:
      '“A CERNE é a única marcenaria que indico sem ressalva para projetos autorais. Eles desenham junto, não só executam — o resultado final sempre bate exatamente com o que foi especificado em projeto.”',
    testimonialAuthor: 'Renata Xavier — Arquiteta, RX Arquitetura',
    faqEyebrow: 'Perguntas Frequentes',
    faqTitle: 'Antes de conversarmos',
    contatoEyebrow: 'Agenda Limitada',
    contatoTitle: 'Vamos conversar sobre o seu projeto',
    contatoText:
      'Atendemos um número limitado de projetos por trimestre. Conte um pouco sobre o espaço e a ideia — respondemos pessoalmente em até um dia útil.',
    contatoRegions: 'Atendemos Rio Grande do Sul · Santa Catarina · Paraná',
    footerDisclaimerBefore: 'Projeto fictício de demonstração criado por ',
    footerDisclaimerAfter: '. Marca, fotos e depoimentos são ilustrativos.',
    backFull: 'Voltar para NEURALABS Studio',
    backShort: 'NEURALABS',
    close: 'Fechar',
    statsLabels: ['Anos de ofício', 'Projetos entregues', 'Sob encomenda', 'Estados atendidos'],
    materiais: ['Nogueira Maciça', 'Carvalho Fumê', 'Freijó', 'Cedro', 'Latão Escovado', 'Mármore Calacatta', 'Vidro Fosco'],
    etapas: [
      { n: '01', title: 'Consulta & Briefing', body: 'Visita técnica ao espaço (ou ao projeto arquitetônico) para entender uso, fluxo e a intenção estética antes de qualquer desenho.' },
      { n: '02', title: 'Projeto Técnico', body: 'Desenho detalhado com especificação de madeira, ferragem e acabamento — aprovado com você antes de qualquer corte.' },
      { n: '03', title: 'Produção Artesanal', body: 'Cada peça é executada no ateliê, com acompanhamento fotográfico das etapas — nunca produção terceirizada em série.' },
      { n: '04', title: 'Instalação & Entrega', body: 'Instalação por nossa própria equipe, com ajuste fino no local. O projeto só está pronto quando encaixa perfeitamente.' },
    ],
    faq: [
      { q: 'Vocês atendem fora do Rio Grande do Sul?', a: 'Sim. Já executamos projetos em Santa Catarina e Paraná — o acompanhamento técnico é feito à distância entre visitas, com presença garantida nos marcos principais do projeto (briefing, aprovação técnica e instalação).' },
      { q: 'Qual o prazo médio de um projeto?', a: 'Entre 8 e 14 semanas da aprovação do projeto técnico até a instalação, dependendo da complexidade e da disponibilidade dos materiais especificados.' },
      { q: 'Vocês fazem só móveis avulsos ou também elementos arquitetônicos?', a: 'Trabalhamos com marcenaria integrada à arquitetura — portas de grandes vãos, painéis, boiseries, escadas — não só peças de mobiliário isoladas.' },
      { q: 'Como funciona o orçamento?', a: 'Após a visita técnica e o briefing, enviamos uma proposta com escopo, materiais e prazo definidos por escrito — sem reabertura de valor no meio do projeto.' },
    ],
    projetos: [
      { idx: '01', nome: 'Biblioteca em Nogueira', local: 'Residência Privada · Porto Alegre', ano: '2025', materiais: ['Nogueira maciça', 'Latão escovado'], descricao: 'Biblioteca de pé-direito duplo com escada suspensa e estante corrida em nogueira maciça — desenhada em conjunto com o arquiteto do projeto desde a planta baixa, não como reforma posterior.', img: '/images/cerne/biblioteca.jpg', featured: true },
      { idx: '02', nome: 'Cozinha em Carvalho Fumê', local: 'Cobertura · Florianópolis', ano: '2024', materiais: ['Carvalho fumê', 'Mármore Calacatta'], descricao: 'Cozinha integrada à sala de uma cobertura de frente pro mar — marcenaria em carvalho fumê contrastando com bancada de mármore Calacatta, desenhada pra abrir totalmente durante recepções e fechar em painéis discretos no dia a dia.', img: '/images/cerne/cozinha.jpg' },
      { idx: '03', nome: 'Escritório Executivo', local: 'Sede Corporativa · Curitiba', ano: '2024', materiais: ['Freijó', 'Vidro fosco'], descricao: 'Sala de diretoria e recepção executiva em freijó e vidro fosco — painéis de marcenaria fazem a divisória acústica entre os ambientes sem recorrer a drywall, mantendo a mesma linguagem do desenho arquitetônico original.', img: '/images/cerne/escritorio.jpg' },
      { idx: '04', nome: 'Closet Boutique', local: 'Residência Privada · Gramado', ano: '2023', materiais: ['Cedro', 'Latão escovado'], descricao: 'Closet planejado como uma pequena boutique particular — armários em cedro com puxadores de latão escovado, ilha central para acessórios e iluminação embutida desenhada peça a peça com a proprietária.', img: '/images/cerne/closet-boutique.png' },
    ] as Projeto[],
  },
  en: {
    attributionBefore: 'Demo developed by ',
    attributionStudio: 'NEURALABS Studio',
    back: '← Back',
    nav: { oficio: 'The Craft', portfolio: 'Portfolio', processo: 'Process', faq: 'FAQ' },
    ctaConsult: 'Request a Consultation',
    heroEyebrow: 'Cabinetry & Interior Architecture',
    heroTitle1: 'Where architecture',
    heroTitleEm: 'becomes cabinetry.',
    heroText:
      'Bespoke projects in wood and metal for those who treat every space as a piece of architecture, not decoration. From technical drawing to hand finishing, a team dedicated to your project alone.',
    heroSeePortfolio: 'View Portfolio',
    agendaLabel: '2026 Schedule',
    scarcityBefore: 'Only ',
    spotsWord: 'spots',
    scarcityAfter: ' left for new projects this quarter.',
    oficioEyebrow: 'The Craft',
    oficioTitle1: 'Every piece, ',
    oficioTitleEm: 'a project.',
    oficioP1:
      "We don't work from a catalog. Every commission starts from a blank sheet — the design is born from the space, not the other way around.",
    oficioP2:
      'CERNE takes on a limited number of projects each year — enough for each one to receive atelier attention, not factory attention.',
    foundedLabel: 'Year Founded',
    craftLine1: 'Craft',
    craftLine2: '& Precision',
    quote: '“Architecture doesn’t end at the floor plan — it ends in the texture the hand feels.”',
    portfolioEyebrow: 'Portfolio',
    portfolioTitle1: 'Gallery of ',
    portfolioTitleEm: 'Work',
    verFicha: 'View Details',
    processoEyebrow: 'How It Works',
    processoTitle: 'From drawing to installation',
    testimonialQuote:
      '“CERNE is the only cabinetry studio I recommend without reservation for bespoke projects. They design with you, not just execute — the final result always matches exactly what was specified.”',
    testimonialAuthor: 'Renata Xavier — Architect, RX Arquitetura',
    faqEyebrow: 'Frequently Asked Questions',
    faqTitle: 'Before we talk',
    contatoEyebrow: 'Limited Availability',
    contatoTitle: "Let's talk about your project",
    contatoText:
      'We take on a limited number of projects per quarter. Tell us a bit about the space and the idea — we reply personally within one business day.',
    contatoRegions: 'Serving Rio Grande do Sul · Santa Catarina · Paraná',
    footerDisclaimerBefore: 'Fictional demo project created by ',
    footerDisclaimerAfter: '. Brand, photos, and testimonials are illustrative.',
    backFull: 'Back to NEURALABS Studio',
    backShort: 'NEURALABS',
    close: 'Close',
    statsLabels: ['Years of craft', 'Projects delivered', 'Fully bespoke', 'States served'],
    materiais: ['Solid Walnut', 'Smoked Oak', 'Freijó', 'Cedar', 'Brushed Brass', 'Calacatta Marble', 'Frosted Glass'],
    etapas: [
      { n: '01', title: 'Consultation & Briefing', body: 'A technical visit to the space (or to the architectural project) to understand use, flow, and aesthetic intent before any drawing.' },
      { n: '02', title: 'Technical Design', body: 'Detailed drawings specifying wood, hardware, and finish — approved with you before any cut is made.' },
      { n: '03', title: 'Handcrafted Production', body: 'Each piece is made in the atelier, with photographic follow-up of every stage — never outsourced mass production.' },
      { n: '04', title: 'Installation & Delivery', body: 'Installation by our own team, with fine adjustment on site. The project is only finished when it fits perfectly.' },
    ],
    faq: [
      { q: 'Do you take on projects outside Rio Grande do Sul?', a: "Yes. We've delivered projects in Santa Catarina and Paraná — technical follow-up is done remotely between visits, with guaranteed presence at the project's key milestones (briefing, technical approval, and installation)." },
      { q: "What's the average timeline for a project?", a: 'Between 8 and 14 weeks from technical-design approval to installation, depending on complexity and the availability of the specified materials.' },
      { q: 'Do you only make standalone furniture, or architectural elements too?', a: 'We work with cabinetry integrated into the architecture — large-span doors, panels, boiserie, staircases — not just isolated furniture pieces.' },
      { q: 'How does the quote work?', a: 'After the technical visit and briefing, we send a proposal with scope, materials, and timeline defined in writing — with no price changes midway through the project.' },
    ],
    projetos: [
      { idx: '01', nome: 'Walnut Library', local: 'Private Residence · Porto Alegre', ano: '2025', materiais: ['Solid walnut', 'Brushed brass'], descricao: "A double-height library with a suspended ladder and a full-length shelf in solid walnut — designed together with the project's architect from the floor plan up, not as a later renovation.", img: '/images/cerne/biblioteca.jpg', featured: true },
      { idx: '02', nome: 'Smoked Oak Kitchen', local: 'Penthouse · Florianópolis', ano: '2024', materiais: ['Smoked oak', 'Calacatta marble'], descricao: 'A kitchen integrated into the living room of an oceanfront penthouse — smoked-oak cabinetry contrasting with a Calacatta marble countertop, designed to open fully during gatherings and close into discreet panels day to day.', img: '/images/cerne/cozinha.jpg' },
      { idx: '03', nome: 'Executive Office', local: 'Corporate HQ · Curitiba', ano: '2024', materiais: ['Freijó', 'Frosted glass'], descricao: 'A boardroom and executive reception in freijó and frosted glass — cabinetry panels form the acoustic partition between the spaces without resorting to drywall, keeping the language of the original architecture.', img: '/images/cerne/escritorio.jpg' },
      { idx: '04', nome: 'Boutique Closet', local: 'Private Residence · Gramado', ano: '2023', materiais: ['Cedar', 'Brushed brass'], descricao: 'A closet planned like a small private boutique — cedar wardrobes with brushed-brass handles, a central island for accessories, and built-in lighting designed piece by piece with the owner.', img: '/images/cerne/closet-boutique.png' },
    ] as Projeto[],
  },
} as const;

/** Botões com leve atração magnética ao cursor. Desktop com mouse fino apenas. */
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

const VAGAS_POR_MES_NO_TRIMESTRE = [4, 3, 2] as const;

function useVagasRestantes(fallback: number) {
  const [vagas, setVagas] = useState(fallback);
  useEffect(() => {
    setVagas(VAGAS_POR_MES_NO_TRIMESTRE[new Date().getMonth() % 3]);
  }, []);
  return vagas;
}

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
  const { language } = useLanguage();
  const t = CONTENT[language];
  const isDesktop = useIsDesktop();
  const reducedMotion = usePrefersReducedMotion();
  const heroParallaxRef = useParallax(0.08, isDesktop && !reducedMotion);
  const bannerParallaxRef = useParallax(0.05, isDesktop && !reducedMotion);
  const rootRef = useMagnetic();
  const vagasRestantes = useVagasRestantes(3);
  const [projetoAberto, setProjetoAberto] = useState<Projeto | null>(null);

  // Portfólio editável via Notion (CMS leve). Fica null a menos que o CMS
  // esteja configurado e retorne conteúdo; caso contrário usa o fallback
  // traduzido (t.projetos), que reage à troca de idioma.
  const [notionProjetos, setNotionProjetos] = useState<Projeto[] | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetch('/api/cerne-projects')
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data?.configured && Array.isArray(data.projetos) && data.projetos.length > 0) {
          setNotionProjetos(data.projetos);
        }
      })
      .catch(() => {
        // silencioso: fica no fallback traduzido
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const projetos = notionProjetos ?? t.projetos;

  return (
    <main
      ref={rootRef}
      className={`relative min-h-screen w-full max-w-full bg-[#F5F4EE] text-[#2A2C22] ${serif.variable} ${sans.variable}`}
      style={{ fontFamily: 'var(--font-cerne-sans)' }}
    >
      <DemoLangToggle />

      {/* Selo NEURALABS — única menção à marca dentro da demo */}
      <div className="flex items-center justify-between gap-4 border-b border-[#2A2C22]/10 bg-[#EDECE3] px-5 py-2 text-[11px] tracking-wide text-[#2A2C22]/70 sm:px-8">
        <span>
          <span className="text-[#6B7A4E]">✦</span> {t.attributionBefore}
          <span className="font-semibold text-[#2A2C22]">{t.attributionStudio}</span>
        </span>
        <Link href="/" className="whitespace-nowrap font-medium hover:text-[#6B7A4E]">
          {t.back}
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
            <a href="#oficio" className="hover:text-[#6B7A4E]">{t.nav.oficio}</a>
            <a href="#portfolio" className="hover:text-[#6B7A4E]">{t.nav.portfolio}</a>
            <a href="#processo" className="hover:text-[#6B7A4E]">{t.nav.processo}</a>
            <a href="#faq" className="hover:text-[#6B7A4E]">{t.nav.faq}</a>
          </nav>
          <a
            href="#contato"
            data-magnetic
            className="inline-flex flex-shrink-0 items-center justify-center whitespace-nowrap rounded-sm border border-[#2A2C22] px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.15em] text-[#2A2C22] transition-colors hover:bg-[#2A2C22] hover:text-[#F5F4EE] sm:px-6 sm:py-3"
          >
            {t.ctaConsult}
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-14 sm:px-8 sm:pt-20 md:grid-cols-[1.05fr_1fr] md:gap-6 md:pb-0">
        <div className="flex flex-col justify-center py-6 md:py-20">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-9 bg-[#6B7A4E]" />
            <span className="text-[10.5px] uppercase tracking-[0.28em] text-[#576141]">
              {t.heroEyebrow}
            </span>
          </div>
          <h1
            className="mb-7 max-w-[500px] text-[42px] leading-[1.08] sm:text-[52px] md:text-[56px]"
            style={{ fontFamily: 'var(--font-cerne-serif)', fontWeight: 400 }}
          >
            {t.heroTitle1}<br />
            <em className="text-[#6B7A4E]" style={{ fontStyle: 'italic' }}>
              {t.heroTitleEm}
            </em>
          </h1>
          <p className="mb-9 max-w-[380px] text-[13.5px] leading-[1.9] text-[#55584A]">
            {t.heroText}
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="#portfolio"
              className="inline-flex w-fit items-center gap-2 border-b border-[#6B7A4E] pb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#2A2C22] hover:text-[#6B7A4E]"
            >
              {t.heroSeePortfolio} <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href="#contato"
              data-magnetic
              className="inline-flex w-fit items-center gap-2 rounded-sm bg-[#2A2C22] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.15em] text-[#F5F4EE] transition-colors hover:bg-[#6B7A4E]"
            >
              {t.ctaConsult}
            </a>
          </div>
        </div>

        <div className="relative -mx-5 aspect-[4/5] overflow-hidden sm:mx-0 sm:rounded-sm md:aspect-auto md:h-[86vh] md:min-h-[560px]">
          <div ref={heroParallaxRef} className="absolute inset-0 -top-[6%] h-[112%] w-full">
            {isDesktop && !reducedMotion ? (
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
              <div className={reducedMotion ? '' : 'h-full w-full animate-ken-burns'}>
                <Image
                  src={HERO_IMAGE}
                  alt="Marcenaria sob medida em tons de madeira, luz natural"
                  fill
                  priority
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            )}
          </div>

          <WoodGrainCanvas />

          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F4EE]/20 via-transparent to-transparent md:bg-gradient-to-l md:from-transparent md:via-transparent md:to-[#F5F4EE]/10" />

          <motion.div
            className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-auto sm:w-[260px]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.div
              className="relative rounded-sm border border-[#2A2C22]/10 bg-[#F5F4EE]/85 p-5 backdrop-blur-2xl"
              style={{ boxShadow: '0 32px 64px -24px rgba(42,44,34,.25)' }}
              whileHover={{
                boxShadow: '0 40px 80px -16px rgba(42,44,34,.35)',
                backgroundColor: 'rgba(245,244,238,0.95)'
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <div
                className="pointer-events-none absolute -top-px left-[10%] right-[10%] h-px"
                style={{ background: 'linear-gradient(90deg,transparent,#6B7A4E,transparent)' }}
              />
              <span className="mb-2 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-[#576141]">
                <Ruler className="h-3 w-3" /> {t.agendaLabel}
              </span>
              <p className="text-[12.5px] leading-[1.6] text-[#2A2C22]">
                {t.scarcityBefore}<b>{vagasRestantes} {t.spotsWord}</b>{t.scarcityAfter}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Faixa de materiais */}
      <div className="overflow-hidden border-y border-[#2A2C22]/10 bg-[#EDECE3] py-3.5">
        <div className="flex w-max animate-marquee items-center gap-10 motion-reduce:animate-none">
          {[...t.materiais, ...t.materiais].map((m, i) => (
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

      {/* Números */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:gap-6">
          {STATS_BASE.map((s, i) => (
            <ScrollReveal key={t.statsLabels[i]} delay={i * 0.08}>
              <StatCounter value={s.value} suffix={s.suffix} label={t.statsLabels[i]} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* O Ofício */}
      <section id="oficio" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-px bg-[#2A2C22]/15 border border-[#2A2C22]/15 rounded-sm overflow-hidden"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
          }}
        >
          <motion.div
            className="md:col-span-2 lg:col-span-2 p-10 lg:p-14 bg-[#F5F4EE] flex flex-col justify-center h-full"
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } } }}
          >
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-9 bg-[#6B7A4E]" />
              <span className="text-[10.5px] uppercase tracking-[0.28em] text-[#576141]">{t.oficioEyebrow}</span>
            </div>
            <h2
              className="mb-6 text-[32px] leading-[1.18] sm:text-[40px]"
              style={{ fontFamily: 'var(--font-cerne-serif)', fontWeight: 400 }}
            >
              {t.oficioTitle1}<em style={{ fontStyle: 'italic', color: '#6B7A4E' }}>{t.oficioTitleEm}</em>
            </h2>
            <p className="max-w-md text-[13.5px] leading-[1.9] text-[#55584A] mb-5">
              {t.oficioP1}
            </p>
            <p className="max-w-md text-[13.5px] leading-[1.9] text-[#55584A]">
              {t.oficioP2}
            </p>
          </motion.div>

          <motion.div
            className="md:col-span-1 lg:col-span-1 relative min-h-[300px] bg-[#EDECE3] overflow-hidden group h-full"
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } } }}
          >
            <Image
              src={OFICIO_IMAGE}
              alt="Detalhe de marcenaria"
              fill
              className="object-cover transition-transform duration-[2s] group-hover:scale-105"
            />
          </motion.div>

          <motion.div
            className="md:col-span-1 lg:col-span-1 bg-[#2A2C22] p-10 flex flex-col justify-between text-[#F5F4EE] h-full"
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } } }}
          >
            <span
              className="block text-[48px] leading-none text-[#6B7A4E]"
              style={{ fontFamily: 'var(--font-cerne-serif)', fontStyle: 'italic' }}
            >
              2011
            </span>
            <p className="text-[11px] uppercase tracking-[0.2em] opacity-70">
              {t.foundedLabel}
            </p>
          </motion.div>

          <motion.div
            className="md:col-span-2 lg:col-span-3 relative min-h-[300px] bg-[#EDECE3] overflow-hidden group h-full"
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } } }}
          >
            <Image
              src={HERO_BANNER_IMAGE}
              alt="Painel panorâmico"
              fill
              className="object-cover transition-transform duration-[2s] group-hover:scale-105"
            />
          </motion.div>

          <motion.div
            className="md:col-span-1 lg:col-span-1 bg-[#EDECE3] p-10 flex items-center justify-center h-full"
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } } }}
          >
            <span className="text-[14px] uppercase tracking-[0.3em] font-semibold text-[#576141] text-center leading-[1.8]">
              {t.craftLine1}<br/>{t.craftLine2}
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* Quebra panorâmica */}
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
              {t.quote}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Portfólio */}
      <section id="portfolio" className="relative z-10 border-t border-[#D5D3C5] bg-[#EDECE3] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-16">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-9 bg-[#6B7A4E]" />
              <span className="text-[10.5px] uppercase tracking-[0.28em] text-[#576141]">{t.portfolioEyebrow}</span>
            </div>
            <h2
              className="text-[40px] leading-[1.1] sm:text-[50px]"
              style={{ fontFamily: 'var(--font-cerne-serif)', fontWeight: 400 }}
            >
              {t.portfolioTitle1}<em className="text-[#6B7A4E] italic">{t.portfolioTitleEm}</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {projetos.map((p, idx) => (
              <ScrollReveal key={p.idx} delay={idx * 0.08}>
                <div className="relative group h-full flex flex-col">
                  <div className="relative aspect-[4/5] overflow-hidden border border-[#2A2C22]/20 mb-6 rounded-sm">
                    <motion.div
                      className="absolute inset-0 origin-center"
                      whileHover={{ scale: 1.06 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                      <Image
                        src={p.img}
                        alt={p.nome}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 85vw"
                        className="object-cover"
                      />
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-[#2A2C22]/60 via-[#2A2C22]/20 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  <div className="flex-1 flex flex-col">
                    <div className="flex items-baseline gap-3 mb-3 border-b border-[#2A2C22]/10 pb-3">
                      <span className="text-[11px] font-bold text-[#6B7A4E]">{p.idx}</span>
                      <span className="text-[11px] text-[#55584A] uppercase tracking-widest">{p.ano}</span>
                    </div>

                    <h3
                      className="mb-2 text-[24px] leading-tight text-[#2A2C22]"
                      style={{ fontFamily: 'var(--font-cerne-serif)' }}
                    >
                      {p.nome}
                    </h3>
                    <p className="mb-6 text-[11px] uppercase tracking-widest text-[#5C5147]">{p.local}</p>

                    <motion.button
                      type="button"
                      onClick={() => setProjetoAberto(p)}
                      className="relative inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#2A2C22] group/btn"
                      whileHover="hover"
                      initial="rest"
                      variants={{ rest: { color: '#2A2C22' }, hover: { color: '#6B7A4E' } }}
                      transition={{ duration: 0.2 }}
                    >
                      {t.verFicha}
                      <motion.div
                        variants={{ rest: { x: 0 }, hover: { x: 3, y: -2 } }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </motion.div>
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-px bg-[#6B7A4E]"
                        initial={{ scaleX: 0, originX: 0 }}
                        variants={{ hover: { scaleX: 1 } }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      />
                    </motion.button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Processo */}
      <section id="processo" className="relative px-5 py-24 sm:px-8 md:py-32 bg-[#F5F4EE]">
        <div className="mx-auto max-w-4xl relative">
          <div className="mb-16 text-center">
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-9 bg-[#6B7A4E]" />
              <span className="text-[10.5px] uppercase tracking-[0.28em] text-[#576141]">{t.processoEyebrow}</span>
              <span className="h-px w-9 bg-[#6B7A4E]" />
            </div>
            <h2
              className="text-[40px] leading-[1.1] sm:text-[56px]"
              style={{ fontFamily: 'var(--font-cerne-serif)', fontWeight: 400 }}
            >
              {t.processoTitle}
            </h2>
          </div>

          <motion.div
            className="relative space-y-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }}
          >
            {t.etapas.map((e) => (
              <motion.div
                key={e.n}
                className="w-full"
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 350, damping: 28 } } }}
              >
                <motion.div
                  className="relative overflow-hidden rounded-sm border border-[#2A2C22]/15 bg-[#EDECE3] p-8 md:p-14 shadow-[0_2px_12px_rgba(42,44,34,0.1)]"
                  whileHover={{ boxShadow: '0_12px_32px_rgba(42,44,34,0.18)', y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                    <span
                      className="text-[80px] leading-none text-[#6B7A4E] shrink-0"
                      style={{ fontFamily: 'var(--font-cerne-serif)', fontStyle: 'italic', opacity: 0.4 }}
                    >
                      {e.n}
                    </span>
                    <div className="flex-1">
                      <h3 className="mb-4 text-[24px] font-medium text-[#2A2C22] tracking-wide">{e.title}</h3>
                      <p className="text-[15px] leading-[1.9] text-[#55584A]">{e.body}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Depoimento */}
      <section className="border-t border-[#2A2C22]/10 bg-[#EDECE3] px-5 py-24 sm:px-8 sm:py-28">
        <ScrollReveal>
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.p
              className="mb-8 text-[22px] leading-[1.5] sm:text-[26px]"
              style={{ fontFamily: 'var(--font-cerne-serif)', fontStyle: 'italic', fontWeight: 400 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {t.testimonialQuote}
            </motion.p>
            <motion.p
              className="text-[11.5px] uppercase tracking-[0.2em] text-[#576141]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t.testimonialAuthor}
            </motion.p>
          </motion.div>
        </ScrollReveal>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-5 py-24 sm:px-8 sm:py-28">
        <ScrollReveal>
          <div className="mb-12 max-w-lg">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-9 bg-[#6B7A4E]" />
              <span className="text-[10.5px] uppercase tracking-[0.28em] text-[#576141]">{t.faqEyebrow}</span>
            </div>
            <h2
              className="text-[30px] leading-[1.18] sm:text-[36px]"
              style={{ fontFamily: 'var(--font-cerne-serif)', fontWeight: 400 }}
            >
              {t.faqTitle}
            </h2>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div>
            {t.faq.map((f, i) => (
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
              {t.contatoEyebrow}
            </span>
            <h2
              className="mb-5 text-[30px] leading-[1.18] sm:text-[36px]"
              style={{ fontFamily: 'var(--font-cerne-serif)', fontWeight: 400 }}
            >
              {t.contatoTitle}
            </h2>
            <p className="mx-auto max-w-md text-[13.5px] leading-[1.9] text-[#55584A]">
              {t.contatoText}
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <CerneContactForm />
        </ScrollReveal>
        <ScrollReveal>
          <p className="mt-10 text-center text-[11px] uppercase tracking-[0.16em] text-[#576141]/80">
            {t.contatoRegions}
          </p>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2A2C22]/10 px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11.5px] font-medium tracking-wide text-[#2A2C22]/70">
            <a href="#oficio" className="hover:text-[#6B7A4E]">{t.nav.oficio}</a>
            <a href="#portfolio" className="hover:text-[#6B7A4E]">{t.nav.portfolio}</a>
            <a href="#processo" className="hover:text-[#6B7A4E]">{t.nav.processo}</a>
            <a href="#faq" className="hover:text-[#6B7A4E]">{t.nav.faq}</a>
          </nav>
          <p className="text-[11px] text-[#2A2C22]/45">
            {t.footerDisclaimerBefore}
            <Link href="/" className="underline hover:text-[#6B7A4E]">
              NEURALABS
            </Link>
            {t.footerDisclaimerAfter}
          </p>
        </div>
      </footer>

      {/* Botão flutuante de voltar */}
      <Link
        href="/"
        className="fixed bottom-6 left-6 z-50 inline-flex items-center gap-2 rounded-full border border-[#2A2C22]/15 bg-[#F5F4EE]/95 px-4 py-3 text-xs font-semibold text-[#2A2C22] shadow-lg backdrop-blur-md transition-colors hover:bg-[#F5F4EE] sm:px-5 sm:text-sm"
      >
        <ArrowLeft className="h-4 w-4 flex-shrink-0" />
        <span className="hidden sm:inline">{t.backFull}</span>
        <span className="sm:hidden">{t.backShort}</span>
      </Link>

      <ProjetoModal projeto={projetoAberto} onClose={() => setProjetoAberto(null)} closeLabel={t.close} />
    </main>
  );
}

function ProjetoModal({ projeto, onClose, closeLabel }: { projeto: Projeto | null; onClose: () => void; closeLabel: string }) {
  useEffect(() => {
    if (!projeto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [projeto, onClose]);

  if (!projeto) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={projeto.nome}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#2A2C22]/60 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative grid max-h-[88vh] w-full max-w-3xl grid-cols-1 overflow-y-auto rounded-sm bg-[#F5F4EE] sm:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F4EE]/90 text-[#2A2C22] shadow-md backdrop-blur-sm hover:bg-[#F5F4EE]"
        >
          <Minus className="h-4 w-4 rotate-45" />
        </button>
        <div className="relative aspect-[4/5] sm:aspect-auto">
          <Image src={projeto.img} alt={projeto.nome} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-col justify-center p-7 sm:p-9">
          <span className="text-[11px] text-[#6B7A4E]">{projeto.idx} — {projeto.ano}</span>
          <h3
            className="mb-3 mt-2 text-[26px] leading-tight"
            style={{ fontFamily: 'var(--font-cerne-serif)', fontStyle: 'italic', fontWeight: 400 }}
          >
            {projeto.nome}
          </h3>
          <p className="mb-4 text-[12.5px] text-[#5C5147]">{projeto.local}</p>
          {projeto.descricao && (
            <p className="mb-5 text-[13.5px] leading-[1.85] text-[#55584A]">{projeto.descricao}</p>
          )}
          <div className="flex flex-wrap gap-2">
            {projeto.materiais.map((m) => (
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
    </div>
  );
}
