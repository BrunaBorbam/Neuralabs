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
 * Gatilhos de neuromarketing (voltados a quem contrataria a marcenaria —
 * proprietário de residência/escritório de alto padrão, geralmente via
 * arquiteto): prova social pelo portfólio de projetos nomeados e com
 * materiais explícitos (nunca fotos de banco genéricas sem contexto),
 * ancoragem de exclusividade (projetos por encomenda, agenda limitada),
 * redução de fricção pré-consulta (processo em 4 etapas explicado antes do
 * CTA) e depoimento de arquiteto (credibilidade entre pares, não apenas
 * cliente final).
 *
 * Sem camada de portfólio dentro da demo: a única menção à NEURALABS é a
 * barra discreta de atribuição no topo + o disclaimer no rodapé.
 *
 * NOTA DE PRODUÇÃO: a geração de imagem por IA (Higgsfield) segue
 * indisponível nesta conta (o preflight de custo responde, mas o envio real
 * do job retorna "Requires basic plan or higher") — as fotos abaixo são
 * placeholders reais do Unsplash (mesmo padrão de fallback já usado no
 * restante do projeto), genéricos de interiores com tom de madeira, não
 * fotografia real de marcenaria. Vídeo por IA está sob a mesma restrição de
 * plano; o "vídeo" do Hero é um Ken Burns em CSS sobre a foto estática, não
 * um clipe gerado. Trocar por fotografia/vídeo real de projeto ou por
 * ativos gerados por IA assim que o plano permitir, antes de usar esta demo
 * em prospecção com um lead real.
 *
 * 3D: dois anéis concêntricos (CerneScene3D) remetendo aos anéis de
 * crescimento da madeira — "cerne" é o núcleo da árvore. Só monta em
 * desktop, atrás do mesmo hook useIsDesktop usado no restante do site.
 */

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Fraunces, Jost } from 'next/font/google';
import { ArrowLeft, ArrowUpRight, MessageCircle } from 'lucide-react';
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

const HERO_IMAGE = img('photo-1585128792020-803d29415281', 1800, 2200);
const OFICIO_IMAGE = img('photo-1609081144289-eacc3108cd03', 1200, 1500);

const PROJETOS = [
  {
    idx: '01',
    nome: 'Biblioteca em Nogueira',
    local: 'Residência Privada · Porto Alegre',
    materiais: 'Nogueira maciça · Latão escovado',
    img: img('photo-1724582586529-62622e50c0b3', 1400, 1750),
  },
  {
    idx: '02',
    nome: 'Cozinha em Carvalho Fumê',
    local: 'Cobertura · Florianópolis',
    materiais: 'Carvalho fumê · Mármore Calacatta',
    img: img('photo-1605774337664-7a846e9cdf17', 1400, 1750),
  },
  {
    idx: '03',
    nome: 'Escritório Executivo',
    local: 'Sede Corporativa · Curitiba',
    materiais: 'Freijó · Vidro fosco',
    img: img('photo-1583847268964-b28dc8f51f92', 1400, 1750),
  },
  {
    idx: '04',
    nome: 'Closet Boutique',
    local: 'Residência Privada · Gramado',
    materiais: 'Cedro · Latão escovado',
    img: img('photo-1705321963943-de94bb3f0dd3', 1400, 1750),
  },
] as const;

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

/** Parallax sutil no hero — só desktop, só sem prefers-reduced-motion */
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

export default function MarcenariaDemo() {
  const isDesktop = useIsDesktop();
  const reducedMotion = usePrefersReducedMotion();
  const heroParallaxRef = useParallax(0.08, isDesktop && !reducedMotion);
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

      {/* Hero — split editorial, foto à direita */}
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
          <a
            href="#portfolio"
            className="inline-flex w-fit items-center gap-2 border-b border-[#6B7A4E] pb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#2A2C22] hover:text-[#6B7A4E]"
          >
            Ver Portfólio <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="relative -mx-5 aspect-[4/5] overflow-hidden sm:mx-0 sm:rounded-sm md:aspect-auto md:h-[86vh] md:min-h-[560px]">
          <div ref={heroParallaxRef} className="absolute inset-0 -top-[6%] h-[112%] w-full">
            {/* Ken Burns: substitui vídeo de hero (geração de vídeo por IA
                indisponível nesta conta) — zoom/pan lento sobre a foto,
                desligado com prefers-reduced-motion. */}
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
          </div>
          {/* Anéis de crescimento em 3D — desktop only, atrás da mesma
              gate de useIsDesktop usada no site principal */}
          {isDesktop && !reducedMotion && <CerneScene3D />}
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F4EE]/20 via-transparent to-transparent md:bg-gradient-to-l md:from-transparent md:via-transparent md:to-[#F5F4EE]/10" />
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

      {/* O Ofício */}
      <section id="oficio" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
        <div className="grid gap-14 md:grid-cols-2 md:gap-20">
          <ScrollReveal>
            <div className="relative aspect-[4/5] overflow-hidden sm:rounded-sm">
              <Image
                src={OFICIO_IMAGE}
                alt="Detalhe de marcenaria em madeira nobre"
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="flex h-full flex-col justify-center">
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

      {/* Portfólio */}
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

          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2">
            {PROJETOS.map((p) => (
              <ScrollReveal key={p.idx}>
                <div className="group">
                  <div className="relative mb-5 aspect-[4/5] overflow-hidden sm:rounded-sm">
                    <Image
                      src={p.img}
                      alt={p.nome}
                      fill
                      sizes="(min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
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
                      <p className="mt-1.5 text-[11.5px] text-[#5C5147]">{p.local}</p>
                      <p className="text-[11.5px] text-[#5C5147]/70">{p.materiais}</p>
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
          {ETAPAS.map((e) => (
            <ScrollReveal key={e.n}>
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
          <div className="flex justify-center">
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
          </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2A2C22]/10 px-5 py-10 text-center sm:px-8">
        <p className="text-[11px] text-[#2A2C22]/45">
          Projeto fictício de demonstração criado por{' '}
          <Link href="/" className="underline hover:text-[#6B7A4E]">
            NEURALABS
          </Link>
          . Marca, fotos e depoimentos são ilustrativos.
        </p>
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
