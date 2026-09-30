'use client';

/**
 * ARDÓSIA — Bistrô de Bairro (bilíngue PT/EN)
 * Demonstração Interativa • NEURALABS Studio
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { Instrument_Serif, Space_Grotesk } from 'next/font/google';
import {
  ArrowLeft,
  ArrowUpRight,
  Minus,
  Plus,
  Croissant,
  Flame,
  Cherry,
  Wine,
  UtensilsCrossed,
  Quote,
  Star,
  Clock,
  Sparkles,
} from 'lucide-react';
import { ScrollReveal } from '@/components/HeroAnimations';
import { ArdosiaReservaForm } from '@/components/ArdosiaReservaForm';
import { ArdosiaInkStroke, ArdosiaSectionDrip, ArdosiaContinuousThread } from '@/components/ArdosiaInkStroke';
import { DemoLangToggle } from '@/components/DemoLangToggle';
import { useLanguage } from '@/context/LanguageContext';

const display = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-ardosia-serif',
  display: 'swap',
});
const sans = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ardosia-sans',
  display: 'swap',
});

type Prato = {
  idx: string;
  nome: string;
  categoria: string;
  preco: string;
  descricao?: string;
  img: string;
  destaque?: boolean;
};

// Estrutura fixa (não traduzida): categoria (chave p/ ícone), preço, imagem.
const PRATOS_BASE = [
  { idx: '01', categoria: 'Entrada', preco: 'R$ 24', img: '/images/ardosia/pao-fermentacao.png' },
  { idx: '02', categoria: 'Entrada', preco: 'R$ 42', img: '/images/gastronomia/burrata-tomate.jpg' },
  { idx: '03', categoria: 'Principal', preco: 'R$ 68', img: '/images/gastronomia/risoto-cogumelos.jpg' },
  { idx: '04', categoria: 'Principal', preco: 'R$ 76', img: '/images/gastronomia/peixe-do-dia.jpg', destaque: true },
  { idx: '05', categoria: 'Principal', preco: 'R$ 62', img: '/images/ardosia/tagliatelle-ragu.png' },
  { idx: '06', categoria: 'Sobremesa', preco: 'R$ 28', img: '/images/ardosia/pave-doce-leite.png' },
  { idx: '07', categoria: 'Sobremesa', preco: 'R$ 24', img: '/images/ardosia/sorbet-frutas.png' },
  { idx: '08', categoria: 'Bebida', preco: 'R$ 32', img: '/images/gastronomia/vinho-natural.jpg' },
] as const;

const ETAPA_IMAGES = ['/images/gastronomia/a-feira.jpg', '/images/ardosia/menu-quadro.png', '/images/ardosia/mise-en-place.png', '/images/gastronomia/a-mesa.jpg'];

const CONTENT = {
  pt: {
    attrBy: 'Demonstração desenvolvida por ',
    back: '← Voltar',
    nav: { menu: 'Cardápio', how: 'Como Funciona', faq: 'Perguntas' },
    ctaBook: 'Reservar Mesa',
    heroEyebrow: 'Bistrô de Bairro · Cidade Baixa',
    heroT1: 'O cardápio ',
    heroT2: ' muda.',
    heroT3: 'O capricho, não.',
    heroText:
      'Sem cardápio engessado. Compramos o que tá bom na feira de terça e escrevemos no quadro — se o tomate não tava bom hoje, ele não entra no prato.',
    seeMenu: 'Ver cardápio de hoje',
    statLabels: ['Pratos do dia', 'Mesas hoje', 'Desde'],
    discover: 'Descubra',
    chalk: { tonight: 'Hoje à noite', tables: '6 mesas', available: 'disponíveis' },
    chips: [
      { label: 'Avaliação', value: '4.9 ★ (1.2k)' },
      { label: 'Tempo médio', value: '45 min' },
      { label: 'Receita', value: 'Autoral' },
    ],
    valores: ['PRODUTO DA ESTAÇÃO', 'FEIRA DE TERÇA', 'SEM CONGELADOS', 'PÃO DO DIA', 'VINHO NATURAL', 'PRODUTOR LOCAL', 'CARDÁPIO QUE MUDA', 'FEITO NA HORA'],
    histEyebrow: 'Desde 2019 · Cidade Baixa',
    histLead: 'A Ardósia começou porque a Mari cansou de cardápio que promete tudo e entrega congelado.',
    histP1:
      'Ela pegou uma lousa de verdade — a mesma do fundo da sala da escola onde deu aula por oito anos — pregou na parede da entrada e escreveu, a giz, o que tinha comprado naquela manhã na feira da Voluntários da Pátria.',
    histP2:
      'Sete anos depois o quadro ainda é apagado e reescrito seis vezes por semana, à mão. Não é estética de revista: é só o jeito mais honesto que a casa encontrou de dizer o que tem hoje, sem prometer o que não vai ter amanhã.',
    histTonight: 'Hoje à noite',
    tablesAvailable: 'mesas disponíveis',
    menuEyebrow: 'Cardápio',
    menuTitle1: 'O quadro de ',
    menuTitleEm: 'hoje',
    menuText: 'Abaixo, as criações disponíveis na cozinha neste exato momento. Deslize para explorar.',
    chefDish: 'Prato do chef',
    catLabels: { Entrada: 'Entrada', Principal: 'Principal', Sobremesa: 'Sobremesa', Bebida: 'Bebida' } as Record<string, string>,
    pratosText: [
      { nome: 'Pão de Fermentação Natural', descricao: 'Manteiga de ervas da horta, flor de sal.' },
      { nome: 'Burrata com Tomate da Estação', descricao: 'Manjericão, azeite novo, pão tostado.' },
      { nome: 'Risoto de Cogumelos da Serra', descricao: 'Parmesão de 24 meses, manteiga noisette.' },
      { nome: 'Peixe do Dia na Brasa', descricao: 'Legumes da feira, beurre blanc de limão-siciliano.' },
      { nome: 'Tagliatelle ao Ragù de 6 Horas', descricao: 'Massa fresca do dia, pecorino.' },
      { nome: 'Pavê de Doce de Leite da Vó', descricao: undefined as string | undefined },
      { nome: 'Sorbet da Fruta da Estação', descricao: undefined as string | undefined },
      { nome: 'Taça de Vinho Natural', descricao: 'Curadoria da casa, rótulo muda toda semana.' },
    ],
    processoEyebrow: 'Como Funciona',
    processoTitle: 'Da feira à mesa',
    etapas: [
      { hora: '05h', title: 'A Feira', body: 'Compra é feita cedo, direto na feira — não no distribuidor. Se não tá bom, não entra no prato.' },
      { hora: '10h', title: 'O Quadro', body: 'O cardápio do dia é decidido na cozinha e escrito à mão no quadro de ardósia da entrada.' },
      { hora: '12h', title: 'A Mise en Place', body: 'Cada prato é montado do zero, na hora do pedido — nada fica pronto esperando no balcão.' },
      { hora: '20h', title: 'A Mesa', body: 'Salão pequeno, ritmo de bairro — a gente costuma lembrar do seu nome já na segunda visita.' },
    ],
    depTitle: 'Avaliações Reais',
    depoimentos: [
      { quote: 'Ardósia é meu lugar de quinta-feira. Nunca sei exatamente o que vou comer, e isso é ótimo.', autor: 'Marina T.', tag: 'Cliente desde 2024' },
      { quote: 'Reservei pra 6 pessoas em cima da hora e o time resolveu numa boa. Comida sempre impecável.', autor: 'Diego R.', tag: 'Cliente desde 2023' },
      { quote: 'O risoto de cogumelo mudou minha semana. Já voltei três vezes só pra comer ele de novo.', autor: 'Camila S.', tag: 'Cliente desde 2025' },
    ],
    faqEyebrow: 'Perguntas Rápidas',
    faqTitle: 'Antes de reservar',
    faq: [
      { q: 'Preciso reservar ou dá pra chegar sem hora marcada?', a: 'Recomendamos reservar, principalmente sexta e sábado — o salão é pequeno (28 lugares) e enche rápido.' },
      { q: 'O cardápio muda mesmo toda semana?', a: 'Sim — decidimos com base no que chega fresco da feira, então alguns pratos somem e voltam conforme a estação.' },
      { q: 'Tem opção vegetariana?', a: 'Sempre pelo menos duas opções no cardápio do dia, marcadas no quadro. Avise na reserva se precisar de algo específico.' },
      { q: 'Aceitam grupos grandes?', a: 'Até 10 pessoas sem problema, direto pelo formulário. Acima disso, chama no WhatsApp que a gente organiza um menu fechado.' },
    ],
    contatoEyebrow: 'Reserva',
    contatoTitle: 'Bora marcar mesa?',
    contatoText: 'Terça a sábado, 19h às 23h30. Salão pequeno — confirmamos cada reserva pessoalmente, por telefone ou e-mail.',
    contatoLoc: 'Cidade Baixa · Porto Alegre',
    footerBefore: 'Projeto fictício de demonstração criado por ',
    footerAfter: '. Marca, cardápio e depoimentos são ilustrativos.',
    backFull: 'Voltar para NEURALABS Studio',
    backShort: 'NEURALABS',
  },
  en: {
    attrBy: 'Demo developed by ',
    back: '← Back',
    nav: { menu: 'Menu', how: 'How It Works', faq: 'FAQ' },
    ctaBook: 'Book a Table',
    heroEyebrow: 'Neighborhood Bistro · Cidade Baixa',
    heroT1: 'The menu ',
    heroT2: ' changes.',
    heroT3: 'The care never does.',
    heroText:
      "No rigid menu. We buy whatever's good at Tuesday's market and write it on the board — if the tomato wasn't good today, it doesn't make it onto the plate.",
    seeMenu: "See today's menu",
    statLabels: ['Dishes of the day', 'Tables today', 'Since'],
    discover: 'Discover',
    chalk: { tonight: 'Tonight', tables: '6 tables', available: 'available' },
    chips: [
      { label: 'Rating', value: '4.9 ★ (1.2k)' },
      { label: 'Avg. time', value: '45 min' },
      { label: 'Recipe', value: 'Signature' },
    ],
    valores: ['SEASONAL PRODUCE', 'TUESDAY MARKET', 'NO FROZEN FOOD', 'BREAD OF THE DAY', 'NATURAL WINE', 'LOCAL PRODUCER', 'MENU THAT CHANGES', 'MADE TO ORDER'],
    histEyebrow: 'Since 2019 · Cidade Baixa',
    histLead: 'Ardósia started because Mari got tired of menus that promise everything and deliver frozen food.',
    histP1:
      "She took a real chalkboard — the same one from the back of the classroom where she taught for eight years — nailed it to the entrance wall, and wrote, in chalk, what she'd bought that morning at the Voluntários da Pátria market.",
    histP2:
      "Seven years later the board is still wiped clean and rewritten six times a week, by hand. It's not magazine aesthetics: it's just the most honest way the house found to say what it has today, without promising what it won't have tomorrow.",
    histTonight: 'Tonight',
    tablesAvailable: 'tables available',
    menuEyebrow: 'Menu',
    menuTitle1: "Today's ",
    menuTitleEm: 'board',
    menuText: 'Below, the creations available in the kitchen right now. Scroll to explore.',
    chefDish: "Chef's dish",
    catLabels: { Entrada: 'Starter', Principal: 'Main', Sobremesa: 'Dessert', Bebida: 'Drink' } as Record<string, string>,
    pratosText: [
      { nome: 'Naturally Leavened Sourdough', descricao: 'Garden-herb butter, flaky sea salt.' },
      { nome: 'Burrata with Seasonal Tomato', descricao: 'Basil, new olive oil, toasted bread.' },
      { nome: 'Highland Mushroom Risotto', descricao: '24-month parmesan, brown butter.' },
      { nome: 'Grilled Catch of the Day', descricao: 'Market vegetables, Sicilian-lemon beurre blanc.' },
      { nome: 'Tagliatelle with 6-Hour Ragù', descricao: 'Fresh daily pasta, pecorino.' },
      { nome: "Grandma's Dulce de Leite Pavê", descricao: undefined as string | undefined },
      { nome: 'Seasonal Fruit Sorbet', descricao: undefined as string | undefined },
      { nome: 'Glass of Natural Wine', descricao: 'House selection, label changes weekly.' },
    ],
    processoEyebrow: 'How It Works',
    processoTitle: 'From market to table',
    etapas: [
      { hora: '5am', title: 'The Market', body: "Shopping is done early, straight at the market — not from a distributor. If it isn't good, it doesn't make the plate." },
      { hora: '10am', title: 'The Board', body: "The day's menu is decided in the kitchen and written by hand on the slate board at the entrance." },
      { hora: '12pm', title: 'The Mise en Place', body: 'Every dish is built from scratch when you order — nothing sits ready on the counter.' },
      { hora: '8pm', title: 'The Table', body: 'A small room, neighborhood pace — we usually remember your name by your second visit.' },
    ],
    depTitle: 'Real Reviews',
    depoimentos: [
      { quote: "Ardósia is my Thursday spot. I never know exactly what I'll eat, and that's great.", autor: 'Marina T.', tag: 'Customer since 2024' },
      { quote: 'I booked for 6 people last minute and the team handled it easily. Food always flawless.', autor: 'Diego R.', tag: 'Customer since 2023' },
      { quote: "The mushroom risotto made my week. I've already been back three times just to have it again.", autor: 'Camila S.', tag: 'Customer since 2025' },
    ],
    faqEyebrow: 'Quick Questions',
    faqTitle: 'Before you book',
    faq: [
      { q: 'Do I need to book or can I just show up?', a: 'We recommend booking, especially Friday and Saturday — the room is small (28 seats) and fills up fast.' },
      { q: 'Does the menu really change every week?', a: 'Yes — we decide based on what arrives fresh from the market, so some dishes come and go with the season.' },
      { q: 'Is there a vegetarian option?', a: 'Always at least two options on the daily menu, marked on the board. Let us know at booking if you need something specific.' },
      { q: 'Do you take large groups?', a: "Up to 10 people no problem, straight through the form. Above that, message us on WhatsApp and we'll arrange a set menu." },
    ],
    contatoEyebrow: 'Reservation',
    contatoTitle: 'Shall we book a table?',
    contatoText: 'Tuesday to Saturday, 7pm to 11:30pm. Small dining room — we confirm every reservation personally, by phone or email.',
    contatoLoc: 'Cidade Baixa · Porto Alegre',
    footerBefore: 'Fictional demo project created by ',
    footerAfter: '. Brand, menu, and testimonials are illustrative.',
    backFull: 'Back to NEURALABS Studio',
    backShort: 'NEURALABS',
  },
} as const;

function categoryIcon(categoria: string) {
  switch (categoria) {
    case 'Entrada':
      return Croissant;
    case 'Principal':
      return Flame;
    case 'Sobremesa':
      return Cherry;
    case 'Bebida':
      return Wine;
    default:
      return UtensilsCrossed;
  }
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

const MESAS_POR_DIA = [7, 8, 8, 7, 5, 3, 4] as const;

function useMesasDisponiveis(fallback: number) {
  const [mesas, setMesas] = useState(fallback);
  useEffect(() => {
    setMesas(MESAS_POR_DIA[new Date().getDay()]);
  }, []);
  return mesas;
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

function MagneticButton({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.25, y: middleY * 0.25 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

function TextReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, delay: i * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function DustParticles() {
  const particles = Array.from({ length: 12 });
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#F3EDE1]"
          style={{ width: Math.random() * 2 + 1 + 'px', height: Math.random() * 2 + 1 + 'px', left: Math.random() * 100 + '%', top: Math.random() * 100 + '%', opacity: Math.random() * 0.15 + 0.05, filter: 'blur(1px)' }}
          animate={{ y: [0, -Math.random() * 60 - 30], x: [0, Math.random() * 30 - 15], opacity: [0, Math.random() * 0.15 + 0.05, 0] }}
          transition={{ duration: Math.random() * 15 + 15, repeat: Infinity, ease: 'linear', delay: Math.random() * 5 }}
        />
      ))}
    </div>
  );
}

function FloatingChip({ icon: Icon, label, value, x, y, delay, mouseX, mouseY, speed = 1 }: {
  icon: typeof Star; label: string; value: string; x: string; y: string; delay: number;
  mouseX: MotionValue<number>; mouseY: MotionValue<number>; speed?: number;
}) {
  const springConfig = { stiffness: 80, damping: 25, mass: 0.5 };
  const moveX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15 * speed, 15 * speed]), springConfig);
  const moveY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-12 * speed, 12 * speed]), springConfig);

  return (
    <motion.div
      className="absolute z-20 hidden md:flex"
      style={{ left: x, top: y, x: moveX, y: moveY }}
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2 + delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5 + delay, repeat: Infinity, ease: 'easeInOut' }}
        className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-2.5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D9A441]/20">
          <Icon className="h-4 w-4 text-[#D9A441]" />
        </span>
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-[0.14em] text-[#B6AF9E]">{label}</span>
          <span className="text-[13px] font-semibold text-[#F3EDE1]">{value}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ChalkTag({ mouseX, mouseY }: { mouseX: MotionValue<number>; mouseY: MotionValue<number> }) {
  const { language } = useLanguage();
  const t = CONTENT[language].chalk;
  const springConfig = { stiffness: 60, damping: 20, mass: 0.6 };
  const moveX = useSpring(useTransform(mouseX, [-0.5, 0.5], [10, -10]), springConfig);
  const moveY = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);

  return (
    <motion.div
      className="absolute z-30 hidden md:block"
      style={{ right: '5%', bottom: '25%', x: moveX, y: moveY }}
      initial={{ opacity: 0, scale: 0.5, rotate: -6 }}
      animate={{ opacity: 1, scale: 1, rotate: -3 }}
      transition={{ delay: 1.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [-3, -1, -3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="flex flex-col items-center justify-center gap-0.5 rounded-sm border border-dashed border-[#F3EDE1]/30 bg-[#2A2722]/90 px-5 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-sm"
      >
        <span className="text-[9px] uppercase tracking-[0.18em] text-[#D9A441]">{t.tonight}</span>
        <span className="text-[18px] italic text-[#F3EDE1]" style={{ fontFamily: 'var(--font-ardosia-serif)' }}>
          {t.tables}
        </span>
        <span className="text-[8px] uppercase tracking-wider text-[#8A8478]">{t.available}</span>
      </motion.div>
    </motion.div>
  );
}

function FaqItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#F3EDE1]/12 py-6">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between gap-6 text-left">
        <span className="text-[14.5px] font-medium text-[#F3EDE1] sm:text-[15.5px]">{q}</span>
        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[#F3EDE1]/20 text-[#D9A441] transition-colors">
          {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
        </span>
      </button>
      <div className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
        <div className="overflow-hidden">
          <p className="max-w-xl pt-4 text-[13px] leading-[1.85] text-[#B6AF9E]">{a}</p>
        </div>
      </div>
    </div>
  );
}

function DishCard({ prato, index = 0 }: { prato: Prato; index?: number }) {
  const { language } = useLanguage();
  const t = CONTENT[language];
  const Icon = categoryIcon(prato.categoria);
  const catLabel = t.catLabels[prato.categoria] || prato.categoria;
  const hasPhoto = Boolean(prato.img);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      className={`group relative flex w-[240px] h-full flex-shrink-0 flex-col justify-between overflow-hidden rounded-sm border sm:w-[270px] ${
        prato.destaque ? 'border-[#C1552C]/50 bg-[#2E2B25]' : 'border-[#F3EDE1]/10 bg-[#2A2722]'
      }`}
      style={hasPhoto ? undefined : { backgroundImage: 'radial-gradient(circle at 90% 10%, rgba(217,164,65,0.06), transparent 55%)' }}
    >
      {prato.destaque && (
        <span className="absolute left-5 top-3 z-10 rounded-full bg-[#C1552C] px-3 py-1 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-[#F3EDE1]">
          {t.chefDish}
        </span>
      )}

      {hasPhoto && (
        <div className="relative h-[150px] w-full overflow-hidden sm:h-[170px]">
          <motion.div className="w-full h-full origin-center" whileHover={{ scale: 1.08 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
            <Image src={prato.img} alt={prato.nome} fill sizes="(min-width: 640px) 270px, 240px" className="object-cover" />
            <motion.div className="absolute inset-0 bg-black/0" initial={{ opacity: 0 }} whileHover={{ opacity: 0.3 }} transition={{ duration: 0.3 }} />
          </motion.div>
          <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#F3EDE1]/25 bg-[#191712]/70 text-[#D9A441] backdrop-blur-sm z-10">
            <Icon className="h-3.5 w-3.5" />
          </span>
        </div>
      )}

      <div className={`flex flex-1 flex-col justify-between p-5 ${hasPhoto ? 'pt-4' : ''}`}>
        <div>
          {!hasPhoto && (
            <div className="mb-4 flex items-center justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#F3EDE1]/15 text-[#D9A441]">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#8A8478]">{catLabel}</span>
            </div>
          )}
          {hasPhoto && <span className="mb-2 block text-[10px] uppercase tracking-[0.16em] text-[#8A8478]">{catLabel}</span>}
          <h3 className="relative mb-2 text-[19px] leading-tight text-[#F3EDE1]" style={{ fontFamily: 'var(--font-ardosia-serif)', fontStyle: 'italic', fontWeight: 400 }}>
            {prato.nome}
            {prato.destaque && (
              <ArdosiaInkStroke variant="circle" color="#C1552C" className="pointer-events-none absolute -left-[10%] -top-[35%] h-[170%] w-[120%]" delay={0.3} />
            )}
          </h3>
          {prato.descricao && <p className="text-[12px] leading-[1.7] text-[#B6AF9E]">{prato.descricao}</p>}
        </div>
        <span className="mt-5 text-[15px] text-[#D9A441]" style={{ fontFamily: 'var(--font-ardosia-serif)', fontStyle: 'italic', fontWeight: 400 }}>
          {prato.preco}
        </span>
      </div>
    </motion.div>
  );
}

export default function GastronomiaDemo() {
  const { language } = useLanguage();
  const t = CONTENT[language];
  const isDesktop = useIsDesktop();
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = useMagnetic();
  const mesasDisponiveis = useMesasDisponiveis(6);

  const heroMouseX = useMotionValue(0);
  const heroMouseY = useMotionValue(0);

  const handleHeroMouse = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    heroMouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    heroMouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [reducedMotion, heroMouseX, heroMouseY]);

  const handleHeroLeave = useCallback(() => {
    heroMouseX.set(0);
    heroMouseY.set(0);
  }, [heroMouseX, heroMouseY]);

  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroTextY = useTransform(heroProgress, [0, 1], [0, -60]);
  const heroBgScale = useTransform(heroProgress, [0, 1], [1, 1.15]);
  const heroBgOpacity = useTransform(heroProgress, [0, 0.8], [0.35, 0]);

  const contatoRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: contatoProgress } = useScroll({ target: contatoRef, offset: ['start end', 'end start'] });
  const wordmarkParallaxX = useTransform(contatoProgress, [0, 1], [-50, 30]);

  const [notionPratos, setNotionPratos] = useState<Prato[] | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetch('/api/ardosia-pratos')
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data?.configured && Array.isArray(data.pratos) && data.pratos.length > 0) {
          setNotionPratos(data.pratos);
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const pratos: Prato[] = notionPratos ?? PRATOS_BASE.map((b, i) => ({ ...b, ...t.pratosText[i] }));

  return (
    <main
      ref={rootRef}
      className={`relative min-h-screen w-full overflow-x-hidden bg-[#26241F] text-[#F3EDE1] selection:bg-[#C1552C] selection:text-[#F3EDE1] ${display.variable} ${sans.variable}`}
      style={{ fontFamily: 'var(--font-ardosia-sans)' }}
    >
      <DemoLangToggle />
      <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.035] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E")' }} />
      <ArdosiaContinuousThread />

      {/* Selo NEURALABS */}
      <div className="flex items-center justify-between gap-4 border-b border-[#F3EDE1]/10 bg-[#201E19] px-5 py-2 text-[11px] tracking-wide text-[#F3EDE1]/60 sm:px-8">
        <span>
          <span className="text-[#D9A441]">✦</span> {t.attrBy}
          <span className="font-semibold text-[#F3EDE1]">NEURALABS Studio</span>
        </span>
        <Link href="/" className="whitespace-nowrap font-medium hover:text-[#D9A441]">
          {t.back}
        </Link>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[#F3EDE1]/10 bg-[#26241F]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-5 sm:px-8">
          <span className="text-sm uppercase tracking-[0.3em] sm:text-base" style={{ fontFamily: 'var(--font-ardosia-serif)' }}>
            Ardósia
          </span>
          <nav className="hidden items-center gap-8 text-[12.5px] font-medium tracking-wide text-[#F3EDE1]/70 md:flex">
            <a href="#cardapio" className="hover:text-[#D9A441]">{t.nav.menu}</a>
            <a href="#processo" className="hover:text-[#D9A441]">{t.nav.how}</a>
            <a href="#faq" className="hover:text-[#D9A441]">{t.nav.faq}</a>
          </nav>
          <a href="#contato" data-magnetic className="inline-flex flex-shrink-0 items-center justify-center whitespace-nowrap rounded-sm bg-[#C1552C] px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.15em] text-[#F3EDE1] transition-colors hover:bg-[#a84523] sm:px-6 sm:py-3">
            {t.ctaBook}
          </a>
        </div>
      </header>

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden"
        onMouseMove={isDesktop ? handleHeroMouse : undefined}
        onMouseLeave={isDesktop ? handleHeroLeave : undefined}
      >
        <motion.div className="absolute inset-0 z-0" style={{ scale: heroBgScale, opacity: heroBgOpacity }}>
          <Image src="/images/gastronomia/hero-quadro.jpg" alt="" fill priority className="object-cover" style={{ filter: 'blur(3px) brightness(0.3)' }} />
        </motion.div>

        <div className="absolute inset-0 z-[1]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#26241F] via-transparent to-[#26241F]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#26241F]/80 via-transparent to-[#26241F]/80" />
          <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40" style={{ background: 'radial-gradient(circle, rgba(217,164,65,0.12) 0%, rgba(193,85,44,0.06) 40%, transparent 70%)' }} />
        </div>

        <motion.div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center overflow-hidden select-none" style={{ y: isDesktop && !reducedMotion ? heroTextY : 0 }}>
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1.5, ease: 'easeOut' }}
            className="whitespace-nowrap text-[120px] font-normal uppercase leading-none tracking-[0.2em] text-[#F3EDE1]/[0.03] sm:text-[180px] md:text-[220px] lg:text-[280px]"
            style={{ fontFamily: 'var(--font-ardosia-serif)' }}
          >
            ARDÓSIA
          </motion.span>
        </motion.div>

        <DustParticles />

        <FloatingChip icon={Star} label={t.chips[0].label} value={t.chips[0].value} x="3%" y="38%" delay={0} mouseX={heroMouseX} mouseY={heroMouseY} speed={0.7} />
        <FloatingChip icon={Clock} label={t.chips[1].label} value={t.chips[1].value} x="82%" y="40%" delay={0.2} mouseX={heroMouseX} mouseY={heroMouseY} speed={1.1} />
        <FloatingChip icon={Sparkles} label={t.chips[2].label} value={t.chips[2].value} x="6%" y="72%" delay={0.4} mouseX={heroMouseX} mouseY={heroMouseY} speed={0.9} />

        <ChalkTag mouseX={heroMouseX} mouseY={heroMouseY} />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-5 py-32 sm:px-8 lg:flex-row lg:items-center lg:gap-16">
          <motion.div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:flex-1" style={{ y: isDesktop && !reducedMotion ? heroTextY : 0 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="mb-6 flex items-center gap-3">
              <span className="h-px w-9 bg-[#C1552C]" />
              <span className="text-[10.5px] uppercase tracking-[0.28em] text-[#D9A441]">{t.heroEyebrow}</span>
              <span className="h-px w-9 bg-[#C1552C]" />
            </motion.div>

            <h1 className="mb-6 w-full max-w-6xl text-[44px] leading-[0.98] sm:text-[64px] md:text-[72px] lg:text-[80px]" style={{ fontFamily: 'var(--font-ardosia-serif)', fontWeight: 400 }}>
              <TextReveal text={t.heroT1} className="inline" />
              <span className="inline-block w-[1.3em] h-[0.7em] align-middle rounded-full bg-cover bg-center mx-1 sm:mx-2 overflow-hidden border-2 border-[#D9A441]/20 shadow-[0_8px_16px_rgba(0,0,0,0.6)] relative top-[-4px]">
                <Image src="/images/gastronomia/hero-plate.jpg" alt="" fill className="object-cover" />
              </span>
              <TextReveal text={t.heroT2} className="inline" /><br />
              <TextReveal text={t.heroT3} className="inline italic text-[#D9A441]" />
            </h1>

            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mb-8 max-w-[460px] text-[14.5px] leading-[1.9] text-[#B6AF9E]">
              {t.heroText}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }} className="flex flex-col items-center gap-5 sm:flex-row lg:items-start">
              <MagneticButton
                onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#C1552C] px-8 py-4.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#F3EDE1] transition-colors hover:bg-[#A34320] shadow-[0_8px_30px_rgba(193,85,44,0.4)]"
              >
                {t.ctaBook}
              </MagneticButton>
              <button
                onClick={() => document.getElementById('cardapio')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-2 border-b border-[#D9A441]/30 pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F3EDE1] transition-colors hover:border-[#D9A441]"
              >
                {t.seeMenu}
                <ArrowUpRight className="h-3.5 w-3.5 text-[#D9A441] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.8 }} className="mt-10 flex items-center gap-6 border-t border-[#F3EDE1]/10 pt-6">
              {[
                { label: t.statLabels[0], value: '8+' },
                { label: t.statLabels[1], value: String(mesasDisponiveis) },
                { label: t.statLabels[2], value: '2019' },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center lg:items-start">
                  <span className="text-[22px] leading-none text-[#D9A441]" style={{ fontFamily: 'var(--font-ardosia-serif)', fontWeight: 400 }}>
                    {stat.value}
                  </span>
                  <span className="mt-1 text-[9px] uppercase tracking-[0.14em] text-[#8A8478]">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <div className="relative mt-12 lg:mt-0 lg:flex-1 flex items-center justify-center">
            <motion.div
              className="relative z-10 w-full h-[500px] flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ perspective: 1200 }}
            >
              <motion.div className="relative w-full max-w-[450px] aspect-square flex items-center justify-center">
                <motion.div className="absolute inset-0 rounded-full" style={{ rotate: useTransform(heroProgress, [0, 1], [0, 180]) }}>
                  <Image src="/images/gastronomia/hero-plate.jpg" alt="" fill className="object-cover rounded-full" style={{ mixBlendMode: 'screen' }} />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="flex flex-col items-center gap-2">
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#8A8478]">{t.discover}</span>
            <div className="h-8 w-px bg-gradient-to-b from-[#D9A441] to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* Faixa de valores */}
      <div className="overflow-hidden border-y border-[#a84523]/40 bg-[#C1552C] py-3.5">
        <div className="flex w-max animate-marquee items-center gap-10 motion-reduce:animate-none">
          {[...t.valores, ...t.valores].map((v, i) => (
            <span key={`${v}-${i}`} className="flex items-center gap-10 text-[11px] font-medium uppercase tracking-[0.2em] text-[#F3EDE1]">
              {v}
              <span className="text-[#26241F]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* História */}
      <section className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-12 md:grid-cols-2 md:items-start lg:gap-20">
          <div className="sticky top-32 hidden aspect-[4/5] w-full overflow-hidden rounded-sm border border-[#F3EDE1]/10 md:block">
            <Image src="/images/gastronomia/a-feira.jpg" alt="" fill className="object-cover" />
            <div className="absolute inset-0 bg-[#26241F]/20 mix-blend-multiply" />
          </div>

          <div className="flex flex-col justify-center">
            <ScrollReveal>
              <div className="mb-8 flex items-center gap-3">
                <span className="h-px w-9 bg-[#C1552C]" />
                <span className="text-[10.5px] uppercase tracking-[0.28em] text-[#D9A441]">{t.histEyebrow}</span>
              </div>
              <p className="max-w-[38ch] text-[24px] leading-[1.6] text-[#F3EDE1] sm:text-[28px]" style={{ fontFamily: 'var(--font-ardosia-serif)', fontWeight: 400 }}>
                {t.histLead}
              </p>
              <p className="mt-8 max-w-[42ch] text-[15px] leading-[1.9] text-[#B6AF9E]">{t.histP1}</p>
              <p className="mt-6 max-w-[42ch] text-[15px] leading-[1.9] text-[#B6AF9E]">{t.histP2}</p>

              <div className="mt-10 inline-flex max-w-[260px] flex-col gap-1 rounded-sm border border-[#F3EDE1]/12 bg-[#2A2722] px-5 py-4">
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#D9A441]">{t.histTonight}</span>
                <span className="text-[20px] leading-none text-[#F3EDE1]" style={{ fontFamily: 'var(--font-ardosia-serif)', fontStyle: 'italic', fontWeight: 400 }}>
                  {mesasDisponiveis} {t.tablesAvailable}
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Cardápio */}
      <section id="cardapio" className="relative w-full border-t border-[#F3EDE1]/10 bg-[#26241F]">
        <div className="mx-auto flex max-w-7xl flex-col md:flex-row">
          <div className="w-full md:w-[40%] px-5 py-20 sm:px-8 md:sticky md:top-0 md:h-screen md:flex md:flex-col md:justify-center">
            <ScrollReveal>
              <div className="max-w-md">
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px w-9 bg-[#C1552C]" />
                  <span className="text-[10.5px] uppercase tracking-[0.28em] text-[#D9A441]">{t.menuEyebrow}</span>
                </div>
                <h2 className="text-[40px] leading-[1.1] sm:text-[50px] mb-6" style={{ fontFamily: 'var(--font-ardosia-serif)', fontWeight: 400 }}>
                  {t.menuTitle1}<em className="text-[#C1552C] italic">{t.menuTitleEm}</em>
                </h2>
                <p className="text-[14px] leading-[1.8] text-[#B6AF9E]">{t.menuText}</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="w-full md:w-[60%] px-5 pb-20 md:py-32 sm:px-8 md:border-l border-[#F3EDE1]/10">
            <div className="grid gap-6 sm:grid-cols-2">
              {pratos.map((prato, i) => (
                <DishCard key={prato.idx} prato={prato} index={i} />
              ))}
            </div>
          </div>
        </div>
        <ArdosiaSectionDrip />
      </section>

      {/* Processo */}
      <section id="processo" className="relative bg-[#201E19] px-5 py-32 sm:px-8 md:py-48 border-t border-[#F3EDE1]/10">
        <div className="mx-auto max-w-4xl relative">
          <div className="mb-24 text-center">
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-9 bg-[#C1552C]" />
              <span className="text-[10.5px] uppercase tracking-[0.28em] text-[#D9A441]">{t.processoEyebrow}</span>
              <span className="h-px w-9 bg-[#C1552C]" />
            </div>
            <h2 className="text-[40px] leading-[1.1] sm:text-[56px]" style={{ fontFamily: 'var(--font-ardosia-serif)', fontWeight: 400 }}>
              {t.processoTitle}
            </h2>
          </div>

          <motion.div
            className="relative space-y-24"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.08 } } }}
          >
            {t.etapas.map((e, i) => (
              <motion.div key={e.hora} className="w-full" variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } } }}>
                <motion.div
                  className="relative overflow-hidden rounded-xl border border-[#F3EDE1]/20 bg-[#2A2722] p-8 md:p-12 shadow-[0_-20px_50px_rgba(32,30,25,0.8)]"
                  whileHover={{ boxShadow: '0_-25px_60px_rgba(193,85,44,0.3)', y: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="relative h-[200px] w-full md:w-[250px] overflow-hidden rounded-sm border border-[#F3EDE1]/10 shrink-0">
                      <Image src={ETAPA_IMAGES[i]} alt={e.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <span className="mb-4 block text-[40px] leading-none text-[#D9A441]" style={{ fontFamily: 'var(--font-ardosia-serif)', fontStyle: 'italic', fontWeight: 400 }}>
                        {e.hora}
                      </span>
                      <h3 className="mb-4 text-[24px] font-medium text-[#F3EDE1] tracking-wide">{e.title}</h3>
                      <p className="text-[15px] leading-[1.9] text-[#B6AF9E]">{e.body}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="relative mx-auto max-w-7xl px-5 py-32 sm:px-8 md:py-48">
        <motion.div className="mb-20 text-center" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}>
          <motion.h2 className="text-[40px] leading-[1.1] sm:text-[56px]" style={{ fontFamily: 'var(--font-ardosia-serif)', fontWeight: 400 }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.8, delay: 0.1 }}>
            {t.depTitle}
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-[auto] gap-0 border border-[#F3EDE1]/15 overflow-hidden rounded-sm bg-[#26241F]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
        >
          <div className="md:col-span-2 lg:col-span-2 p-10 border border-[#F3EDE1]/15 bg-[#2A2722] flex flex-col justify-between group">
            <Quote className="mb-8 h-8 w-8 text-[#C1552C]" />
            <p className="text-[24px] sm:text-[30px] leading-[1.4] mb-12 text-[#F3EDE1]" style={{ fontFamily: 'var(--font-ardosia-serif)', fontStyle: 'italic' }}>
              &ldquo;{t.depoimentos[0].quote}&rdquo;
            </p>
            <div>
              <p className="text-[12px] font-bold tracking-[0.15em] text-[#D9A441] uppercase">{t.depoimentos[0].autor}</p>
              <p className="text-[11px] text-[#B6AF9E] uppercase">{t.depoimentos[0].tag}</p>
            </div>
          </div>

          <div className="md:col-span-1 lg:col-span-1 border border-[#F3EDE1]/15 relative min-h-[300px] overflow-hidden group">
            <Image src="/images/gastronomia/vinho-natural.jpg" alt="" fill className="object-cover transition-transform duration-[2s] group-hover:scale-110" />
          </div>

          <div className="md:col-span-1 lg:col-span-1 p-8 border border-[#F3EDE1]/15 bg-[#201E19] flex flex-col justify-between group">
            <Quote className="mb-6 h-6 w-6 text-[#C1552C]" />
            <p className="text-[18px] leading-[1.5] mb-8 text-[#F3EDE1]" style={{ fontFamily: 'var(--font-ardosia-serif)', fontStyle: 'italic' }}>
              &ldquo;{t.depoimentos[1].quote}&rdquo;
            </p>
            <div>
              <p className="text-[10px] font-bold tracking-[0.15em] text-[#D9A441] uppercase">{t.depoimentos[1].autor}</p>
              <p className="text-[9px] text-[#B6AF9E] uppercase">{t.depoimentos[1].tag}</p>
            </div>
          </div>

          <div className="md:col-span-2 lg:col-span-2 p-8 border border-[#F3EDE1]/15 bg-[#26241F] flex flex-col justify-between group">
            <Quote className="mb-6 h-6 w-6 text-[#C1552C]" />
            <p className="text-[20px] leading-[1.5] mb-8 text-[#F3EDE1]" style={{ fontFamily: 'var(--font-ardosia-serif)', fontStyle: 'italic' }}>
              &ldquo;{t.depoimentos[2].quote}&rdquo;
            </p>
            <div>
              <p className="text-[10px] font-bold tracking-[0.15em] text-[#D9A441] uppercase">{t.depoimentos[2].autor}</p>
              <p className="text-[9px] text-[#B6AF9E] uppercase">{t.depoimentos[2].tag}</p>
            </div>
          </div>

          <div className="md:col-span-1 lg:col-span-2 border border-[#F3EDE1]/15 relative min-h-[300px] overflow-hidden group">
            <Image src="/images/gastronomia/a-mesa.jpg" alt="" fill className="object-cover transition-transform duration-[2s] group-hover:scale-110" />
          </div>
        </motion.div>
        <ArdosiaSectionDrip />
      </section>

      {/* FAQ */}
      <section id="faq" className="relative overflow-hidden border-t border-[#F3EDE1]/10 bg-[#201E19] px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="mb-12 max-w-lg">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-9 bg-[#C1552C]" />
                <span className="text-[10.5px] uppercase tracking-[0.28em] text-[#D9A441]">{t.faqEyebrow}</span>
              </div>
              <h2 className="text-[30px] leading-[1.15] sm:text-[36px]" style={{ fontFamily: 'var(--font-ardosia-serif)', fontWeight: 400 }}>
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
        </div>
      </section>

      {/* Contato */}
      <section id="contato" ref={contatoRef} className="relative mx-auto max-w-6xl overflow-hidden px-5 py-20 sm:px-8 sm:py-24">
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -left-4 top-0 select-none text-[120px] font-normal italic leading-none text-[#F3EDE1]/[0.04] sm:text-[220px]"
          style={{ fontFamily: 'var(--font-ardosia-serif)', x: isDesktop && !reducedMotion ? wordmarkParallaxX : 0 }}
        >
          Ardósia
        </motion.span>

        <div className="relative grid gap-14 md:grid-cols-[0.85fr_1.15fr] md:gap-10">
          <ScrollReveal>
            <div>
              <span className="mb-4 block text-[10.5px] uppercase tracking-[0.28em] text-[#D9A441]">{t.contatoEyebrow}</span>
              <h2 className="mb-5 text-[32px] leading-[1.15] sm:text-[40px]" style={{ fontFamily: 'var(--font-ardosia-serif)', fontWeight: 400 }}>
                {t.contatoTitle}
              </h2>
              <p className="max-w-sm text-[13.5px] leading-[1.9] text-[#B6AF9E]">{t.contatoText}</p>
              <p className="mt-6 text-[11px] uppercase tracking-[0.16em] text-[#8A8478]">{t.contatoLoc}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <ArdosiaReservaForm />
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#F3EDE1]/10 px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11.5px] font-medium tracking-wide text-[#F3EDE1]/60">
            <a href="#cardapio" className="hover:text-[#D9A441]">{t.nav.menu}</a>
            <a href="#processo" className="hover:text-[#D9A441]">{t.nav.how}</a>
            <a href="#faq" className="hover:text-[#D9A441]">{t.nav.faq}</a>
          </nav>
          <p className="text-[11px] text-[#F3EDE1]/35">
            {t.footerBefore}
            <Link href="/" className="underline hover:text-[#D9A441]">
              NEURALABS
            </Link>
            {t.footerAfter}
          </p>
        </div>
      </footer>

      {/* Botão flutuante de voltar */}
      <Link href="/" className="fixed bottom-6 left-6 z-50 inline-flex items-center gap-2 rounded-full border border-[#F3EDE1]/15 bg-[#26241F]/95 px-4 py-3 text-xs font-semibold text-[#F3EDE1] shadow-lg backdrop-blur-md transition-colors hover:bg-[#2E2B25] sm:px-5 sm:text-sm">
        <ArrowLeft className="h-4 w-4 flex-shrink-0" />
        <span className="hidden sm:inline">{t.backFull}</span>
        <span className="sm:hidden">{t.backShort}</span>
      </Link>
    </main>
  );
}
