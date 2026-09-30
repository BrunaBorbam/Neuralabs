'use client';

/**
 * VILLA SERENA — Boutique Retreat & Private Beach House (bilíngue PT/EN)
 * Demonstração Interativa • NEURALABS Studio
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
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
import { DemoLangToggle } from '@/components/DemoLangToggle';
import { useLanguage } from '@/context/LanguageContext';
import CoastalCanvas from './CoastalCanvas';

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

const AMBIENTE_ICONS = [Sparkles, Flame, ChefHat];
const AMBIENTE_IMAGES = [SUITE_IMAGE, DECK_IMAGE, GOURMET_IMAGE];
const RESERVADOS = new Set([4, 5, 18, 19, 25]);

const fmtFor = (locale: string) => (v: number) =>
  new Intl.NumberFormat(locale, { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(v);

const CONTENT = {
  pt: {
    locale: 'pt-BR',
    attrBy: 'Demonstração desenvolvida por ',
    back: '← Voltar',
    nav: { villa: 'A Villa', exp: 'Experiências', rates: 'Tarifas', location: 'Localização' },
    ctaHeader: 'Garantir Tarifa Direta',
    rating: '5,0',
    reviews: '· 212 avaliações',
    verifiedHost: 'Anfitrião Verificado',
    fastReply: 'Resposta em minutos',
    heroTitle1: 'O pôr do sol de Trancoso,',
    heroTitleEm: 'sem intermediários.',
    heroText:
      'Casa de praia com quatro suítes, piscina de borda infinita e acesso privativo à areia. Reserve direto com o anfitrião e fique com o valor que as plataformas cobram de taxa.',
    statSuites: 'suítes',
    statGuests: 'hóspedes',
    statSand: 'até a areia',
    checkAvail: 'Verificar disponibilidade',
    knowVilla: 'Conhecer a villa',
    scarcityBefore: 'Apenas ',
    weekendsWord: 'fins de semana',
    scarcityAfter: ' livres na alta temporada',
    avgSavings: 'Economia média por estadia',
    savingsSub: 'reservando direto vs. plataforma',
    marquee: [
      'Sem taxa de plataforma',
      'Cancelamento flexível até 14 dias',
      'Concierge por WhatsApp',
      'Limpeza diária',
      'Superhost desde 2019',
      'Pagamento seguro Pix/cartão',
    ],
    tourKicker: 'A villa',
    tourTitle1: 'Três horas do dia,',
    tourTitle2: 'três lugares para viver.',
    tourAside1: 'Arquitetura que se move',
    tourAside2: 'com o sol de Trancoso.',
    ambientes: [
      { kicker: '01 — Suíte master · Tarde', title: 'A suíte que emoldura o pôr do sol', body: '48 m², cama king, linho de 400 fios e portas que abrem inteiras para o mar. Às quatro da tarde a luz entra dourada e fica.', tag: 'Vista frontal · Varanda privativa' },
      { kicker: '02 — Deck privativo · Anoitecer', title: 'Deck privativo com fogo de chão', body: 'Sofás baixos, lanternas e uma fogueira de pedra a poucos passos da areia. O vinho já está gelado quando o sol toca a água.', tag: 'Lounge externo · Adega' },
      { kicker: '03 — Espaço gourmet · Noite', title: 'Espaço gourmet com parrilla e adega', body: 'Parrilla argentina a lenha e uma adega climatizada com rótulos da Serra Gaúcha e do Vale do Maipo. A mesa de dez lugares fica de frente para o mar.', tag: 'Parrilla a lenha · Mesa para 10' },
    ],
    locWhere: 'Onde fica',
    locTitle1: 'No coração de Trancoso, ',
    locTitleEm: 'longe de tudo que atrapalha',
    locText:
      'Perto o suficiente pra tudo, isolada o bastante pra ninguém te encontrar sem avisar antes. O endereço exato é enviado depois da confirmação da reserva.',
    distancias: [
      { valor: '40 m', desc: 'até a areia' },
      { valor: '12 min', desc: 'a pé até o Quadrado de Trancoso' },
      { valor: '45 min', desc: 'de carro até o Aeroporto de Porto Seguro' },
      { valor: '25 min', desc: 'de barco até Caraíva' },
    ],
    regionCaption: 'Imagem ilustrativa da região',
    ecoKicker: 'Compare antes de reservar',
    ecoTitle1: 'A mesma casa. As mesmas noites.',
    ecoTitle2: 'Um preço diferente.',
    ecoText:
      'Plataformas somam cerca de 20% em taxas de serviço. Ajuste a estadia e veja quanto fica com você.',
    ecoNightly: 'Diária',
    ecoNights: 'Noites',
    nightsWord: 'noites',
    nightWord: 'noite',
    ecoViaPlatform: 'Pela plataforma',
    ecoFees: (fee: string, pct: number) => `+ ${fee} em taxas (${pct}%)`,
    ecoDirect: 'Reservando direto na Villa Serena',
    ecoNoMiddleman: 'sem intermediários',
    ecoYouKeep: 'Você fica com',
    ecoSaveBtn: (v: string) => `Quero economizar ${v}`,
    depKicker: 'Quem já ficou',
    depTitle: '212 avaliações, nota 5,0.',
    depoimentos: [
      { q: 'Reservamos direto pelo WhatsApp e a Marina respondeu em oito minutos. Chegamos e tinha frutas, café e um bilhete escrito à mão.', n: 'Camila R.', c: 'São Paulo · Réveillon 2025' },
      { q: 'Economizamos mais de mil reais em relação ao que tínhamos visto na plataforma. Usamos em um passeio de barco até Caraíva.', n: 'Rodrigo & Ana', c: 'Belo Horizonte · Julho 2025' },
      { q: 'O deck às 17h40 é o motivo pelo qual voltamos pelo terceiro ano seguido. Nada em Trancoso se compara.', n: 'Família Duarte', c: 'Rio de Janeiro · Hóspedes recorrentes' },
    ],
    bookKicker: 'Reserva Direta',
    bookTitle1: 'Escolha as datas.',
    bookTitle2: 'A gente cuida do resto.',
    bookText:
      'Confirmação pelo WhatsApp em minutos, pagamento por Pix ou cartão em até 6x, e um concierge disponível do check-in ao check-out.',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    selectDates: 'Selecione',
    bookBtn: (n: number) => `Reservar ${n} noites pelo WhatsApp`,
    talkWhatsapp: 'Falar no WhatsApp',
    bookNote: (rate: string) => `Resposta em minutos • Diárias a partir de ${rate}`,
    prevMonth: 'Mês anterior',
    nextMonth: 'Próximo mês',
    legendAvailable: 'Disponível',
    legendYourStay: 'Sua estadia',
    legendReserved: 'Reservado',
    meses: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    diasSemana: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    faqKicker: 'Antes de reservar',
    faqTitle1: 'Reservar direto é tão seguro quanto pela plataforma ',
    faqTitleEm: '— só que sem a taxa',
    faq: [
      { q: 'E se eu precisar cancelar?', a: 'Cancelamento flexível: reembolso integral até 14 dias antes do check-in, via Pix ou estorno no cartão. Depois disso, 50% até 7 dias antes. A confirmação do cancelamento é feita por escrito, no mesmo WhatsApp da reserva.' },
      { q: 'O pagamento é seguro sem passar pela plataforma?', a: 'Sim — pagamento por Pix ou cartão em até 6x, processado por link de cobrança seguro. Você recebe um contrato simples de locação por temporada por e-mail antes de pagar qualquer valor.' },
      { q: 'Existe caução ou alguma taxa escondida?', a: 'Uma caução reembolsável é retida na reserva e devolvida em até 48h após o check-out, sem descontos além de danos comprovados. Sem taxa de limpeza extra, sem taxa de serviço — o valor que você vê é o valor final.' },
      { q: 'Como funciona o check-in?', a: 'Check-in a partir das 15h, com a anfitriã recebendo pessoalmente ou deixando tudo pronto para autoatendimento, como preferir. O endereço e as instruções de acesso chegam por WhatsApp 48h antes da chegada.' },
    ],
    conciergeKicker: 'Perguntas rápidas',
    conciergeTitle: 'Respostas na hora, sem esperar',
    conciergeText:
      'Toque numa pergunta comum e veja a resposta na hora. Qualquer outra coisa, o WhatsApp da anfitriã responde em minutos.',
    conciergePlaceholder: 'Toque numa pergunta acima para ver a resposta aqui.',
    conciergeCta: 'Outra dúvida? Fale com a anfitriã',
    concierge: [
      { q: 'O check-in pode ser depois das 20h?', a: 'Claro! Na Villa Serena o check-in é flexível até a meia-noite, sem custo extra.' },
      { q: 'Tem vaga de estacionamento?', a: 'Sim — vaga coberta pra até 2 carros dentro do próprio terreno, sem custo adicional.' },
      { q: 'Vocês aceitam pets?', a: 'Aceitamos, com aviso prévio na reserva — há uma taxa extra de limpeza pra estadias com pet.' },
      { q: 'Dá pra chegar antes das 15h?', a: 'Se a limpeza já tiver terminado, sim. Confirmamos pelo WhatsApp no próprio dia, geralmente pela manhã.' },
    ],
    footerBefore: 'Projeto fictício de demonstração criado por ',
    footerAfter: '. Marca, fotos e depoimentos são ilustrativos.',
    backFull: 'Voltar para NEURALABS Studio',
    backShort: 'NEURALABS',
  },
  en: {
    locale: 'en-US',
    attrBy: 'Demo developed by ',
    back: '← Back',
    nav: { villa: 'The Villa', exp: 'Experiences', rates: 'Rates', location: 'Location' },
    ctaHeader: 'Lock the Direct Rate',
    rating: '5.0',
    reviews: '· 212 reviews',
    verifiedHost: 'Verified Host',
    fastReply: 'Responds in minutes',
    heroTitle1: "Trancoso's sunset,",
    heroTitleEm: 'without the middleman.',
    heroText:
      'A beach house with four suites, an infinity pool, and private access to the sand. Book directly with the host and keep what the platforms charge in fees.',
    statSuites: 'suites',
    statGuests: 'guests',
    statSand: 'to the sand',
    checkAvail: 'Check availability',
    knowVilla: 'Explore the villa',
    scarcityBefore: 'Only ',
    weekendsWord: 'weekends',
    scarcityAfter: ' left in high season',
    avgSavings: 'Average savings per stay',
    savingsSub: 'booking direct vs. platform',
    marquee: [
      'No platform fee',
      'Flexible cancellation up to 14 days',
      'WhatsApp concierge',
      'Daily cleaning',
      'Superhost since 2019',
      'Secure Pix/card payment',
    ],
    tourKicker: 'The villa',
    tourTitle1: 'Three hours of the day,',
    tourTitle2: 'three places to live.',
    tourAside1: 'Architecture that moves',
    tourAside2: "with Trancoso's sun.",
    ambientes: [
      { kicker: '01 — Master suite · Afternoon', title: 'The suite that frames the sunset', body: '48 m², king bed, 400-thread-count linen, and doors that open fully to the sea. At four in the afternoon the light turns golden and stays.', tag: 'Front view · Private balcony' },
      { kicker: '02 — Private deck · Dusk', title: 'Private deck with a stone fire pit', body: 'Low sofas, lanterns, and a stone fire pit a few steps from the sand. The wine is already chilled when the sun touches the water.', tag: 'Outdoor lounge · Wine cellar' },
      { kicker: '03 — Gourmet space · Night', title: 'Gourmet space with parrilla and cellar', body: 'A wood-fired Argentine parrilla and a climate-controlled cellar with labels from Serra Gaúcha and the Maipo Valley. The ten-seat table faces the sea.', tag: 'Wood-fired parrilla · Table for 10' },
    ],
    locWhere: 'Where it is',
    locTitle1: 'In the heart of Trancoso, ',
    locTitleEm: 'far from everything that gets in the way',
    locText:
      "Close enough to everything, secluded enough that no one finds you without warning first. The exact address is sent after your booking is confirmed.",
    distancias: [
      { valor: '40 m', desc: 'to the sand' },
      { valor: '12 min', desc: "walk to Trancoso's Quadrado" },
      { valor: '45 min', desc: 'drive to Porto Seguro Airport' },
      { valor: '25 min', desc: 'by boat to Caraíva' },
    ],
    regionCaption: 'Illustrative image of the region',
    ecoKicker: 'Compare before you book',
    ecoTitle1: 'The same house. The same nights.',
    ecoTitle2: 'A different price.',
    ecoText:
      'Platforms add around 20% in service fees. Adjust the stay and see how much stays with you.',
    ecoNightly: 'Nightly rate',
    ecoNights: 'Nights',
    nightsWord: 'nights',
    nightWord: 'night',
    ecoViaPlatform: 'Through the platform',
    ecoFees: (fee: string, pct: number) => `+ ${fee} in fees (${pct}%)`,
    ecoDirect: 'Booking direct at Villa Serena',
    ecoNoMiddleman: 'no middleman',
    ecoYouKeep: 'You keep',
    ecoSaveBtn: (v: string) => `I want to save ${v}`,
    depKicker: "Guests who've stayed",
    depTitle: '212 reviews, rated 5.0.',
    depoimentos: [
      { q: 'We booked straight through WhatsApp and Marina replied in eight minutes. We arrived to fruit, coffee, and a handwritten note.', n: 'Camila R.', c: "São Paulo · New Year's 2025" },
      { q: "We saved over a thousand reais compared to what we'd seen on the platform. We put it toward a boat trip to Caraíva.", n: 'Rodrigo & Ana', c: 'Belo Horizonte · July 2025' },
      { q: 'The deck at 5:40pm is why we come back for the third year running. Nothing in Trancoso compares.', n: 'The Duarte Family', c: 'Rio de Janeiro · Returning guests' },
    ],
    bookKicker: 'Direct Booking',
    bookTitle1: 'Pick your dates.',
    bookTitle2: 'We handle the rest.',
    bookText:
      'WhatsApp confirmation in minutes, payment by Pix or card in up to 6 installments, and a concierge available from check-in to check-out.',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    selectDates: 'Select',
    bookBtn: (n: number) => `Book ${n} nights on WhatsApp`,
    talkWhatsapp: 'Message on WhatsApp',
    bookNote: (rate: string) => `Responds in minutes • Nightly from ${rate}`,
    prevMonth: 'Previous month',
    nextMonth: 'Next month',
    legendAvailable: 'Available',
    legendYourStay: 'Your stay',
    legendReserved: 'Reserved',
    meses: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    diasSemana: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    faqKicker: 'Before you book',
    faqTitle1: 'Booking direct is just as safe as through the platform ',
    faqTitleEm: '— only without the fee',
    faq: [
      { q: 'What if I need to cancel?', a: 'Flexible cancellation: full refund up to 14 days before check-in, via Pix or card reversal. After that, 50% up to 7 days before. Cancellation is confirmed in writing, on the same WhatsApp as the booking.' },
      { q: 'Is payment secure without going through the platform?', a: 'Yes — payment by Pix or card in up to 6 installments, processed through a secure payment link. You receive a simple short-term rental contract by email before paying anything.' },
      { q: 'Is there a deposit or any hidden fee?', a: 'A refundable deposit is held at booking and returned within 48h of check-out, with no deductions beyond proven damages. No extra cleaning fee, no service fee — the price you see is the final price.' },
      { q: 'How does check-in work?', a: 'Check-in from 3pm, with the host welcoming you in person or leaving everything ready for self check-in, as you prefer. The address and access instructions arrive by WhatsApp 48h before arrival.' },
    ],
    conciergeKicker: 'Quick questions',
    conciergeTitle: 'Instant answers, no waiting',
    conciergeText:
      'Tap a common question and see the answer instantly. For anything else, the host replies on WhatsApp within minutes.',
    conciergePlaceholder: 'Tap a question above to see the answer here.',
    conciergeCta: 'Another question? Message the host',
    concierge: [
      { q: 'Can check-in be after 8pm?', a: 'Of course! At Villa Serena check-in is flexible until midnight, at no extra cost.' },
      { q: 'Is there parking?', a: 'Yes — covered parking for up to 2 cars on the property itself, at no additional cost.' },
      { q: 'Do you accept pets?', a: "We do, with advance notice at booking — there's an extra cleaning fee for stays with a pet." },
      { q: 'Can I arrive before 3pm?', a: 'If cleaning is already done, yes. We confirm by WhatsApp on the day itself, usually in the morning.' },
    ],
    footerBefore: 'Fictional demo project created by ',
    footerAfter: '. Brand, photos, and testimonials are illustrative.',
    backFull: 'Back to NEURALABS Studio',
    backShort: 'NEURALABS',
  },
} as const;

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

const FINS_DE_SEMANA_LIVRES = [2, 3, 4] as const;

function useFinsDeSemanaLivres(fallback: number) {
  const [fds, setFds] = useState(fallback);
  useEffect(() => {
    const inicioDoAno = new Date(new Date().getFullYear(), 0, 1).getTime();
    const semana = Math.floor((Date.now() - inicioDoAno) / (7 * 24 * 60 * 60 * 1000));
    setFds(FINS_DE_SEMANA_LIVRES[semana % 3]);
  }, []);
  return fds;
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
  const { language } = useLanguage();
  const t = CONTENT[language];
  const fmt = fmtFor(t.locale);
  const rootRef = useMagnetic();
  const isDesktop = useIsDesktop();
  const reducedMotion = usePrefersReducedMotion();
  const showHeroVideo = isDesktop && !reducedMotion;
  const heroParallaxRef = useParallax<HTMLDivElement>(0.18, 60, isDesktop && !reducedMotion);
  const finsDeSemanaLivres = useFinsDeSemanaLivres(3);

  return (
    <main
      ref={rootRef}
      className={`relative min-h-screen w-full max-w-full overflow-x-hidden bg-[#0D0F12] text-[#F5EFE6] ${serif.variable} ${sans.variable}`}
      style={{ fontFamily: 'var(--font-villa-sans)' }}
    >
      <CoastalCanvas />
      <DemoLangToggle />

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-[10vw] -top-[14vw] h-[46vw] w-[46vw] rounded-full bg-[radial-gradient(circle,rgba(212,163,115,.5),transparent_70%)] blur-[90px] animate-drift-slow" />
        <div className="absolute -right-[10vw] top-[6vw] h-[40vw] w-[40vw] rounded-full bg-[radial-gradient(circle,rgba(138,154,91,.32),transparent_70%)] blur-[90px] animate-drift-slow [animation-delay:-8s]" />
      </div>

      <div className="relative z-10">
        {/* Selo NEURALABS */}
        <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-black/40 px-5 py-2 text-[11px] tracking-wide text-[#F5EFE6]/70 backdrop-blur-sm sm:px-8">
          <span>
            <span className="text-[#D4A373]">✦</span> {t.attrBy}
            <span className="font-semibold text-[#F5EFE6]">NEURALABS Studio</span>
          </span>
          <Link href="/" className="whitespace-nowrap font-medium hover:text-[#D4A373]">
            {t.back}
          </Link>
        </div>

        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0D0F12]/70 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4 sm:px-8">
            <span className="text-sm uppercase tracking-[0.25em] sm:text-lg" style={{ fontFamily: 'var(--font-villa-serif)' }}>
              VILLA <em className="text-[#D4A373] not-italic">Serena</em>
            </span>
            <nav className="hidden items-center gap-7 text-[13px] font-medium tracking-wide text-[#F5EFE6]/85 md:flex">
              <a href="#tour" className="hover:text-[#D4A373]">{t.nav.villa}</a>
              <a href="#tour" className="hover:text-[#D4A373]">{t.nav.exp}</a>
              <a href="#economia" className="hover:text-[#D4A373]">{t.nav.rates}</a>
              <a href="#localizacao" className="hover:text-[#D4A373]">{t.nav.location}</a>
            </nav>
            <a
              href="#reserva"
              data-magnetic
              className="inline-flex flex-shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-gradient-to-r from-[#e9c9a3] to-[#D4A373] px-4 py-2.5 text-xs font-bold text-[#20160f] shadow-lg shadow-[#D4A373]/20 transition-shadow hover:shadow-[#D4A373]/40 sm:px-6 sm:py-3 sm:text-sm"
            >
              {t.ctaHeader}
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="relative flex min-h-[92vh] items-center overflow-hidden">
          <div ref={heroParallaxRef} className="absolute inset-0 -top-[8%] h-[118%] w-full">
            {showHeroVideo ? (
              <video autoPlay muted loop playsInline poster={HERO_IMAGE} className="h-full w-full object-cover">
                <source src={HERO_VIDEO} type="video/mp4" />
              </video>
            ) : (
              <Image src={HERO_IMAGE} alt="Villa Serena" fill priority sizes="100vw" className="object-cover" />
            )}
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(224,140,60,.28),rgba(212,163,115,.1)_45%,rgba(13,15,18,.08))] mix-blend-soft-light" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F12] via-[#0D0F12]/55 to-[#0D0F12]/15" />

          <svg className="pointer-events-none absolute bottom-[-10%] right-[-4%] z-[1] hidden h-[380px] w-[380px] opacity-[0.16] motion-reduce:hidden md:block" viewBox="0 0 600 600">
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
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </span>
                <span className="font-semibold">{t.rating}</span>
                <span className="text-[#F5EFE6]/55">{t.reviews}</span>
                <span className="h-3 w-px bg-white/15" />
                <span className="flex items-center gap-1.5">
                  <BadgeCheck className="h-4 w-4 text-[#D4A373]" /> {t.verifiedHost}
                </span>
                <span className="h-3 w-px bg-white/15" />
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#7bd389] shadow-[0_0_8px_#7bd389]" /> {t.fastReply}
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <h1 className="max-w-3xl text-balance text-4xl leading-[1.08] sm:text-6xl md:text-7xl" style={{ fontFamily: 'var(--font-villa-serif)' }}>
                {t.heroTitle1}
                <br />
                <em className="text-[#D4A373] not-italic">{t.heroTitleEm}</em>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.16}>
              <p className="mb-6 mt-6 max-w-xl text-sm leading-relaxed text-[#F5EFE6]/80 sm:text-base md:text-lg">
                {t.heroText}
              </p>

              <div className="mb-6 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-5 text-sm">
                <div>
                  <span className="block text-2xl" style={{ fontFamily: 'var(--font-villa-serif)' }}>4</span>
                  <span className="text-[11px] uppercase tracking-wide text-[#F5EFE6]/55">{t.statSuites}</span>
                </div>
                <div>
                  <span className="block text-2xl" style={{ fontFamily: 'var(--font-villa-serif)' }}>10</span>
                  <span className="text-[11px] uppercase tracking-wide text-[#F5EFE6]/55">{t.statGuests}</span>
                </div>
                <div>
                  <span className="block text-2xl" style={{ fontFamily: 'var(--font-villa-serif)' }}>40 m</span>
                  <span className="text-[11px] uppercase tracking-wide text-[#F5EFE6]/55">{t.statSand}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a href="#reserva" data-magnetic className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full bg-gradient-to-r from-[#e9c9a3] to-[#D4A373] px-8 py-4 text-sm font-bold text-[#20160f] shadow-lg shadow-[#D4A373]/25 transition-shadow hover:shadow-[#D4A373]/45 sm:w-auto">
                  {t.checkAvail}
                </a>
                <a href="#tour" data-magnetic className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-[#F5EFE6] backdrop-blur-sm transition-colors hover:border-[#D4A373]/60 hover:text-[#D4A373] sm:w-auto">
                  {t.knowVilla}
                </a>
              </div>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#e08c3c]/30 bg-[#e08c3c]/10 px-3.5 py-2 text-xs text-[#f0cba0]">
                <span className="h-2 w-2 rounded-full bg-[#e08c3c] animate-ring" />
                {t.scarcityBefore}<b className="text-white">{finsDeSemanaLivres} {t.weekendsWord}</b>{t.scarcityAfter}
              </div>
            </ScrollReveal>
          </div>

          {/* Glass card */}
          <div className="absolute bottom-[10vh] right-[6vw] z-10 hidden w-[300px] md:block" style={{ perspective: 1000 }}>
            <motion.div
              whileHover={{ rotateX: 5, rotateY: -10, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-2xl"
              style={{ boxShadow: '0 30px 70px -30px rgba(0,0,0,.8), inset 0 1px 0 rgba(255,255,255,.15)' }}
            >
              <div className="pointer-events-none absolute -top-px left-[12%] right-[12%] h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg,transparent,#e9c9a3,#D4A373,transparent)', boxShadow: '0 0 18px 2px rgba(212,163,115,.7)' }} />
              <span className="block text-[11px] uppercase tracking-[0.18em] text-[#F5EFE6]/70">{t.avgSavings}</span>
              <span className="my-1 flex items-baseline gap-1" style={{ fontFamily: 'var(--font-villa-serif)' }}>
                <span className="text-lg text-[#D4A373]/85">R$</span>
                <span className="text-5xl font-medium text-[#D4A373]">1.640</span>
              </span>
              <span className="block text-xs text-[#F5EFE6]/55">{t.savingsSub}</span>
              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
                <span className="text-[#F5EFE6]/50 line-through">{fmt(9840)}</span>
                <span className="font-semibold text-[#D4A373]">{fmt(8200)}</span>
              </div>
            </motion.div>
            <div className="h-14 rounded-2xl bg-white/[0.05] blur-[3px]" style={{ transform: 'scaleY(-1)', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,.35), transparent)', maskImage: 'linear-gradient(to bottom, rgba(0,0,0,.35), transparent)' }} />
          </div>
        </section>

        {/* Marquee */}
        <div className="overflow-hidden border-y border-white/10 bg-black/40 py-3">
          <div className="flex w-max animate-marquee gap-10">
            {[...t.marquee, ...t.marquee].map((item, i) => (
              <span key={i} className="flex items-center gap-2 whitespace-nowrap text-xs uppercase tracking-[0.16em] text-[#F5EFE6]/65">
                <span className="text-[#D4A373]">✦</span> {item}
              </span>
            ))}
          </div>
        </div>

        {/* Tour */}
        <section id="tour" className="relative mx-auto max-w-[1400px] px-5 py-32 sm:px-12">
          <ScrollReveal>
            <div className="mb-24 flex flex-col md:flex-row md:items-end md:justify-between border-b border-white/10 pb-8">
              <div>
                <span className="mb-4 block text-[10px] uppercase tracking-[0.3em] text-[#D4A373]">{t.tourKicker}</span>
                <h2 className="text-4xl sm:text-6xl md:text-7xl leading-none" style={{ fontFamily: 'var(--font-villa-serif)' }}>
                  {t.tourTitle1}<br />{t.tourTitle2}
                </h2>
              </div>
              <p className="max-w-xs text-xs uppercase tracking-widest text-[#F5EFE6]/50 mt-8 md:mt-0 text-right hidden md:block">
                {t.tourAside1}<br />{t.tourAside2}
              </p>
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-32">
            {t.ambientes.map((a, i) => {
              const Icon = AMBIENTE_ICONS[i];
              return (
                <div key={a.title} className="relative flex flex-col md:flex-row items-stretch gap-12 lg:gap-24 group">
                  <div className={`w-full md:w-1/2 ${i % 2 === 1 ? 'md:order-last' : ''}`}>
                    <div className="md:sticky md:top-32 w-full aspect-[4/5] overflow-hidden border border-white/5 bg-white/[0.02] relative">
                      <Image src={AMBIENTE_IMAGES[i]} alt={a.title} fill loading="lazy" sizes="(min-width: 768px) 50vw, 100vw" className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s] ease-out" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <span className="absolute bottom-6 left-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-[#F5EFE6]/90 backdrop-blur-md">
                        <Icon className="h-3.5 w-3.5 text-[#D4A373]" /> {a.tag}
                      </span>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 flex flex-col justify-center py-12 md:py-32">
                    <span className="mb-4 block text-[10px] uppercase tracking-[0.25em] text-[#D4A373]">{a.kicker}</span>
                    <h3 className="mb-8 text-4xl sm:text-5xl lg:text-6xl leading-[1.1]" style={{ fontFamily: 'var(--font-villa-serif)' }}>
                      {a.title}
                    </h3>
                    <p className="max-w-md text-base leading-relaxed text-[#F5EFE6]/60 font-light border-l border-[#D4A373]/30 pl-6 ml-2">{a.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Localização */}
        <section id="localizacao" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <ScrollReveal>
              <span className="mb-3 block text-xs uppercase tracking-[0.24em] text-[#D4A373]">{t.locWhere}</span>
              <h2 className="mb-5 max-w-lg text-3xl sm:text-4xl" style={{ fontFamily: 'var(--font-villa-serif)' }}>
                {t.locTitle1}<em className="text-[#D4A373] not-italic">{t.locTitleEm}</em>.
              </h2>
              <p className="mb-7 max-w-md text-sm leading-relaxed text-[#F5EFE6]/75 sm:text-base">
                {t.locText}
              </p>
              <div className="flex flex-col gap-3.5">
                {t.distancias.map((d) => (
                  <div key={d.desc} className="flex items-baseline gap-3.5">
                    <span className="inline-block w-[62px] shrink-0 text-lg text-[#D4A373]" style={{ fontFamily: 'var(--font-villa-serif)' }}>
                      {d.valor}
                    </span>
                    <span className="text-sm text-[#F5EFE6]/70">{d.desc}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="relative h-[320px] overflow-hidden rounded-2xl border border-white/15 sm:h-[420px]">
                <Image src={REGIAO_IMAGE} alt="" fill loading="lazy" sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F12]/70 via-[#0D0F12]/5 to-transparent" />
                <span className="absolute bottom-5 left-5 text-[10px] uppercase tracking-[0.14em] text-[#F5EFE6]/65">
                  {t.regionCaption}
                </span>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <EconomySection />

        {/* Depoimentos */}
        <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <span className="mb-3 block text-xs uppercase tracking-[0.24em] text-[#D4A373]">{t.depKicker}</span>
              <h2 className="text-3xl sm:text-4xl" style={{ fontFamily: 'var(--font-villa-serif)' }}>
                {t.depTitle}
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid gap-5 sm:grid-cols-3">
            {t.depoimentos.map((d) => (
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

        <BookingSection />

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
          <ScrollReveal>
            <div className="mb-10">
              <span className="mb-3 block text-xs uppercase tracking-[0.24em] text-[#D4A373]">{t.faqKicker}</span>
              <h2 className="text-3xl sm:text-4xl" style={{ fontFamily: 'var(--font-villa-serif)' }}>
                {t.faqTitle1}
                <em className="text-[#D4A373] not-italic">{t.faqTitleEm}</em>.
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <div className="flex flex-col">
              {t.faq.map((item, i) => (
                <details key={item.q} open={i === 0} className="group border-t border-white/10 py-5 last:border-b">
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

        <ConciergeSection />

        {/* Footer */}
        <footer className="border-t border-white/10 px-5 py-10 text-center sm:px-8">
          <p className="text-xs text-[#F5EFE6]/40">
            {t.footerBefore}
            <Link href="/" className="underline hover:text-[#D4A373]">
              NEURALABS
            </Link>
            {t.footerAfter}
          </p>
        </footer>
      </div>

      {/* Botão flutuante de voltar */}
      <Link href="/" className="fixed bottom-6 left-6 z-50 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#0D0F12]/90 px-4 py-3 text-xs font-semibold text-[#F5EFE6] shadow-lg backdrop-blur-md transition-colors hover:bg-[#0D0F12] sm:px-5 sm:text-sm">
        <ArrowLeft className="h-4 w-4 flex-shrink-0" />
        <span className="hidden sm:inline">{t.backFull}</span>
        <span className="sm:hidden">{t.backShort}</span>
      </Link>
    </main>
  );
}

/* ================= CONCIERGE ================= */
function ConciergeSection() {
  const { language } = useLanguage();
  const t = CONTENT[language];
  const [abertaIdx, setAbertaIdx] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
      <ScrollReveal>
        <div className="mb-12 text-center">
          <span className="mb-3 block text-xs uppercase tracking-[0.24em] text-[#D4A373]">{t.conciergeKicker}</span>
          <h2 className="text-3xl sm:text-4xl" style={{ fontFamily: 'var(--font-villa-serif)' }}>
            {t.conciergeTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#F5EFE6]/65 sm:text-base">
            {t.conciergeText}
          </p>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className="mb-5 flex flex-wrap gap-2.5">
            {t.concierge.map((item, i) => (
              <button
                key={item.q}
                type="button"
                onClick={() => setAbertaIdx(i === abertaIdx ? null : i)}
                className={`rounded-full border px-4 py-2 text-left text-[13px] leading-snug transition-colors ${
                  i === abertaIdx
                    ? 'border-[#D4A373]/50 bg-[#D4A373]/15 text-[#F5EFE6]'
                    : 'border-white/15 bg-white/[0.03] text-[#F5EFE6]/80 hover:border-[#D4A373]/40 hover:text-[#F5EFE6]'
                }`}
              >
                {item.q}
              </button>
            ))}
          </div>
          <div className="min-h-[68px] rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-sm leading-relaxed text-[#F5EFE6]/90">
            {abertaIdx === null ? (
              <span className="text-[#F5EFE6]/45">{t.conciergePlaceholder}</span>
            ) : (
              t.concierge[abertaIdx].a
            )}
          </div>
          <a
            href={getWhatsAppLink(language === 'pt' ? 'Olá! Tenho uma dúvida sobre a Villa Serena.' : 'Hi! I have a question about Villa Serena.')}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-medium text-[#F5EFE6] transition-colors hover:bg-white/10 sm:w-auto"
          >
            <MessageCircle className="h-4 w-4" /> {t.conciergeCta}
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}

/* ================= ECONOMY ================= */
function EconomySection() {
  const { language } = useLanguage();
  const t = CONTENT[language];
  const fmt = fmtFor(t.locale);
  const [diaria, setDiaria] = useState(NIGHTLY_RATE);
  const [noites, setNoites] = useState(5);

  const total = diaria * noites;
  const economia = Math.round(total * AIRBNB_FEE_PCT);
  const totalAirbnb = total + economia;
  const pct = Math.round((economia / totalAirbnb) * 100);

  const waMsg =
    language === 'pt'
      ? `Olá! Simulei ${noites} noites na Villa Serena (diária ${fmt(diaria)}) e quero garantir a tarifa direta, economizando ${fmt(economia)}. 🌅`
      : `Hi! I ran ${noites} nights at Villa Serena (nightly ${fmt(diaria)}) and want to lock the direct rate, saving ${fmt(economia)}. 🌅`;

  return (
    <section id="economia" className="border-y border-white/10 bg-black/20 px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-20">
        <ScrollReveal>
          <span className="mb-3 block text-xs uppercase tracking-[0.24em] text-[#D4A373]">{t.ecoKicker}</span>
          <h2 className="mb-5 text-3xl sm:text-4xl" style={{ fontFamily: 'var(--font-villa-serif)' }}>
            {t.ecoTitle1}
            <br />
            {t.ecoTitle2}
          </h2>
          <p className="mb-8 max-w-md text-sm leading-relaxed text-[#F5EFE6]/75 sm:text-base">
            {t.ecoText}
          </p>

          <div className="mb-6">
            <div className="mb-2 flex items-baseline justify-between text-sm text-[#F5EFE6]/70">
              <span>{t.ecoNightly}</span>
              <b className="text-lg" style={{ fontFamily: 'var(--font-villa-serif)' }}>{fmt(diaria)}</b>
            </div>
            <input type="range" min={900} max={2500} step={20} value={diaria} onChange={(e) => setDiaria(Number(e.target.value))} aria-label={t.ecoNightly} className="w-full accent-[#D4A373]" />
          </div>
          <div>
            <div className="mb-2 flex items-baseline justify-between text-sm text-[#F5EFE6]/70">
              <span>{t.ecoNights}</span>
              <b className="text-lg" style={{ fontFamily: 'var(--font-villa-serif)' }}>
                {noites} {noites > 1 ? t.nightsWord : t.nightWord}
              </b>
            </div>
            <input type="range" min={2} max={14} step={1} value={noites} onChange={(e) => setNoites(Number(e.target.value))} aria-label={t.ecoNights} className="w-full accent-[#D4A373]" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-7 backdrop-blur-sm sm:p-9">
            <div className="mb-5">
              <span className="mb-1 block text-sm text-[#F5EFE6]/65">{t.ecoViaPlatform}</span>
              <span className="block text-2xl" style={{ fontFamily: 'var(--font-villa-serif)' }}>{fmt(totalAirbnb)}</span>
              <span className="text-xs text-[#F5EFE6]/50">{t.ecoFees(fmt(economia), pct)}</span>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[#5a4038]" style={{ width: '100%' }} />
              </div>
            </div>
            <div className="mb-5">
              <span className="mb-1 block text-sm text-[#F5EFE6]/65">{t.ecoDirect}</span>
              <span className="block text-2xl text-[#D4A373]" style={{ fontFamily: 'var(--font-villa-serif)' }}>{fmt(total)}</span>
              <span className="text-xs text-[#F5EFE6]/50">{t.ecoNoMiddleman}</span>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-[#e9c9a3] to-[#D4A373] transition-all duration-500" style={{ width: `${(total / totalAirbnb) * 100}%` }} />
              </div>
            </div>
            <div className="mb-6 flex items-center justify-between border-y border-dashed border-white/15 py-4">
              <span className="text-xs uppercase tracking-[0.14em] text-[#F5EFE6]/70">{t.ecoYouKeep}</span>
              <strong className="bg-gradient-to-r from-[#D4A373] via-[#fff6ea] to-[#D4A373] bg-clip-text text-3xl text-transparent" style={{ fontFamily: 'var(--font-villa-serif)', backgroundSize: '220% 100%' }}>
                {fmt(economia)}
              </strong>
            </div>
            <a href={getWhatsAppLink(waMsg)} target="_blank" rel="noopener noreferrer" data-magnetic className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#e9c9a3] to-[#D4A373] px-6 py-4 text-sm font-bold text-[#20160f] shadow-lg shadow-[#D4A373]/25 transition-shadow hover:shadow-[#D4A373]/45">
              {t.ecoSaveBtn(fmt(economia))}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ================= BOOKING ================= */
function BookingSection() {
  const { language } = useLanguage();
  const t = CONTENT[language];
  const fmt = fmtFor(t.locale);
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
      ? language === 'pt'
        ? `Olá! Quero reservar a Villa Serena de ${label(checkIn)} a ${label(checkOut)} (${nights} noites • ${fmt(total)}) com a tarifa direta. 🌅`
        : `Hi! I'd like to book Villa Serena from ${label(checkIn)} to ${label(checkOut)} (${nights} nights • ${fmt(total)}) at the direct rate. 🌅`
      : language === 'pt'
        ? 'Olá! Gostaria de verificar disponibilidade e a tarifa direta da Villa Serena. 🌅'
        : "Hi! I'd like to check availability and the direct rate for Villa Serena. 🌅";

  return (
    <section id="reserva" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
        <ScrollReveal>
          <span className="mb-3 block text-xs uppercase tracking-[0.24em] text-[#D4A373]">{t.bookKicker}</span>
          <h2 className="mb-5 text-3xl sm:text-4xl" style={{ fontFamily: 'var(--font-villa-serif)' }}>
            {t.bookTitle1}
            <br />
            {t.bookTitle2}
          </h2>
          <p className="mb-7 max-w-md text-sm leading-relaxed text-[#F5EFE6]/75 sm:text-base">
            {t.bookText}
          </p>

          <div className="mb-6 flex flex-wrap items-end gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div>
              <small className="block text-[11px] uppercase tracking-wide text-[#F5EFE6]/55">{t.checkIn}</small>
              <b className="text-xl" style={{ fontFamily: 'var(--font-villa-serif)' }}>{label(checkIn)}</b>
            </div>
            <ArrowRight className="mb-1.5 h-4 w-4 text-[#D4A373]" />
            <div>
              <small className="block text-[11px] uppercase tracking-wide text-[#F5EFE6]/55">{t.checkOut}</small>
              <b className="text-xl" style={{ fontFamily: 'var(--font-villa-serif)' }}>{label(checkOut)}</b>
            </div>
            <div className="ml-auto text-right">
              <small className="block text-[11px] uppercase tracking-wide text-[#F5EFE6]/55">
                {nights > 0 ? `${nights} ${t.nightsWord}` : t.selectDates}
              </small>
              <b className="text-xl text-[#D4A373]" style={{ fontFamily: 'var(--font-villa-serif)' }}>
                {nights > 0 ? fmt(total) : '—'}
              </b>
            </div>
          </div>

          <a href={getWhatsAppLink(waMessage)} target="_blank" rel="noopener noreferrer" data-magnetic className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#e9c9a3] to-[#D4A373] px-6 py-4 text-sm font-bold text-[#20160f] shadow-lg shadow-[#D4A373]/25 transition-shadow hover:shadow-[#D4A373]/45">
            {nights > 0 ? t.bookBtn(nights) : t.talkWhatsapp}
          </a>
          <p className="mt-3 text-center text-xs text-[#F5EFE6]/50">
            {t.bookNote(fmt(NIGHTLY_RATE))}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-7">
            <div className="mb-4 flex items-center justify-between">
              <button onClick={() => move(-1)} aria-label={t.prevMonth} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-[#D4A373] hover:text-[#D4A373]">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span style={{ fontFamily: 'var(--font-villa-serif)' }} className="text-lg">
                {t.meses[cursor.m]} {cursor.y}
              </span>
              <button onClick={() => move(1)} aria-label={t.nextMonth} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-[#D4A373] hover:text-[#D4A373]">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="mb-1.5 grid grid-cols-7 gap-1">
              {t.diasSemana.map((d, i) => (
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
                    aria-label={`${d}`}
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
                <i className="inline-block h-3 w-3 rounded bg-white/15" /> {t.legendAvailable}
              </span>
              <span className="flex items-center gap-1.5">
                <i className="inline-block h-3 w-3 rounded bg-[#D4A373]" /> {t.legendYourStay}
              </span>
              <span className="flex items-center gap-1.5">
                <i className="inline-block h-3 w-3 rounded border border-white/30" /> {t.legendReserved}
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
