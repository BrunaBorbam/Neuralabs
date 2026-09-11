'use client';

/**
 * ARDÓSIA — Bistrô de Bairro
 * Demonstração Interativa • NEURALABS Studio
 *
 * Quarto projeto de portfólio (depois do site NEURALABS, Villa Serena e
 * CERNE) — ver docs/IDENTIDADES-E-EFEITOS.md antes de mexer aqui. Esse
 * documento existe justamente porque os três primeiros repetiam demais a
 * mesma estrutura (Hero cinematográfico/split + cartão de vidro + anéis
 * concêntricos). A Ardósia usa, de propósito, um arquétipo, uma paleta,
 * uma tipografia e uma assinatura de motion que NENHUM projeto anterior
 * usou — ver registro no fim daquele documento.
 *
 * Arquétipo: D — Assimétrico/Colagem Editorial (primeiro uso). Hero
 * tipográfico gigante SEM fotografia grande (ao contrário de CERNE e Villa
 * Serena, que são foto-centrados) — elementos "doodle" de ingredientes
 * flutuando em ângulos, cartões rotacionados na seção de processo.
 *
 * NOTA DE PRODUÇÃO — fotografia real integrada (set/2026): as ferramentas
 * de imagem/3D equipadas nesta sessão (Higgsfield, Adobe) seguiram
 * bloqueadas por crédito/plano em toda tentativa — a saída foi a Bruna
 * gerar as fotos ela mesma via Gemini, usando os prompts prontos em
 * docs/ardosia-prompts-gemini.md. As imagens ficam em
 * public/images/gastronomia/ e entram: nos 4 cards do cardápio com foto
 * (Burrata, Risoto, Peixe do Dia — prato em destaque — e Taça de Vinho,
 * ver campo `img` em PRATOS_PADRAO/DishCard), como foto pequena rotacionada
 * no Hero (o quadro de ardósia sendo escrito à mão — mantém o Arquétipo D,
 * que pede "hero tipográfico, sem foto ou foto pequena", nunca full-bleed)
 * e como fotos "pinadas" no canto dos cards de #processo ("A Feira" e "A
 * Mesa" — reforça a leitura de colagem editorial do arquétipo). Os pratos
 * sem foto ainda (Pão, Tagliatelle, Pavê, Sorbet) e as duas etapas do meio
 * (O Quadro, A Mise en Place) seguem no fallback de ícone/tipografia —
 * troca automática assim que a Bruna gerar o resto via o mesmo documento
 * de prompts.
 *
 * Identidade "Quadro de Ardósia" — nome e conceito vêm do quadro-negro de
 * giz onde bistrôs de bairro escrevem o cardápio do dia à mão. Paleta:
 * Ardósia (carvão quente) #26241F, Giz #F3EDE1, Terracota #C1552C,
 * Mostarda #D9A441. Tipografia: Instrument Serif (display, itálico com
 * personalidade de caligrafia) + Space Grotesk (sans/UI contemporânea) —
 * nenhuma das duas usada nos três projetos anteriores (Playfair+Inter,
 * Bodoni Moda+Plus Jakarta Sans, Fraunces+Jost).
 *
 * Assinatura de motion: traço de tinta/giz se revelando sob títulos e
 * ao redor da palavra-chave do prato em destaque (components/
 * ArdosiaInkStroke.tsx, via framer-motion `pathLength`) — item do catálogo
 * de efeitos ainda não usado por nenhum projeto. Nada de anéis
 * concêntricos, nada de wireframe 3D (já usados 3x e 1x respectivamente).
 * A mesma técnica também conecta seções (variante "drip", componente
 * ArdosiaSectionDrip) — um fio de giz "escorrendo" na emenda entre
 * #cardapio→#processo e depoimentos→#faq, dando sensação de continuidade
 * no scroll (referência trazida pela Bruna: mel escorrendo entre blocos
 * num site de apicultura — aqui reinterpretado só na técnica, com o
 * material/cor da própria identidade Ardósia, nunca a cor de mel).
 * Os mesmos ingredientes do emblema orbital do Hero também reaparecem,
 * discretos e flutuando (`FloatingDoodle`, reusa a keyframe `animate-float`
 * já existente em tailwind.config.ts), em #processo, depoimentos e
 * #contato — o "fio visual" que amarra a página inteira, pedido pela
 * Bruna depois de ver um site de café que espalha grãos por quase toda
 * seção.
 *
 * Parallax (pedido pela Bruna como forma de dar profundidade sem
 * depender de foto real, enquanto ela não gera as imagens via
 * docs/ardosia-prompts-gemini.md): via framer-motion `useScroll` +
 * `useTransform`, sem lib nova. O emblema orbital do Hero se desloca
 * mais devagar que o texto ao rolar a página; a palavra gigante
 * "Ardósia" no fundo da seção de contato desliza na direção oposta ao
 * formulário. Desktop-only, respeita prefers-reduced-motion.
 *
 * Gatilhos de neuromarketing (duas camadas — quem janta e quem contrataria
 * a NEURALABS pra um restaurante real costumam ser a mesma pessoa aqui, o
 * dono, então os dois se somam): escassez diária real ("6 mesas hoje à
 * noite", não uma agenda anual abstrata — mais crível pro contexto de
 * bistrô), transparência de cardápio antes da decisão (ver os pratos e
 * preços do dia sem precisar entrar), prova social casual (depoimentos de
 * clientes recorrentes pelo primeiro nome, tom de bairro — não autoridade
 * formal como o depoimento de arquiteto da CERNE), redução de fricção
 * pré-reserva (FAQ curto) e a narrativa "cardápio muda toda semana", que
 * vira ao mesmo tempo gatilho de frescor E o argumento natural de venda
 * pro CMS via Notion (o dono atualiza o quadro sem pedir deploy).
 *
 * Reserva — formulário real (mesmo endpoint /api/send-email, Resend, já
 * configurado): envia com source: 'ardosia', que troca a cópia do e-mail
 * pro tom da casa e inclui campos de reserva (pessoas/data/horário) que a
 * CERNE não tinha — ver ArdosiaReservaForm.tsx e a branch isArdosia em
 * app/api/send-email/route.ts. Honeypot, rate limit e consentimento LGPD
 * seguem o mesmo padrão já estabelecido.
 *
 * Cardápio editável sem código — mesmo CMS leve via Notion da CERNE
 * (lib/notion.ts: fetchArdosiaPratos, database separada via
 * NOTION_DATABASE_ID_ARDOSIA, mesma NOTION_API_KEY), provando que o padrão
 * é replicável pra qualquer cliente novo — aqui aplicado ao cardápio do
 * dia em vez de um portfólio de projetos. Sem a variável configurada, usa
 * PRATOS_PADRAO abaixo normalmente.
 */

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Instrument_Serif, Space_Grotesk } from 'next/font/google';
import {
  ArrowLeft,
  ArrowUpRight,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Wheat,
  Grape,
  Fish,
  Croissant,
  Flame,
  Cherry,
  Wine,
  UtensilsCrossed,
  Quote,
} from 'lucide-react';
import { ScrollReveal } from '@/components/HeroAnimations';
import { ArdosiaReservaForm } from '@/components/ArdosiaReservaForm';
import { ArdosiaInkStroke, ArdosiaSectionDrip } from '@/components/ArdosiaInkStroke';

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

// Conteúdo estático de referência — usado enquanto nenhum CMS está ligado,
// e como fallback se a busca no Notion falhar. Ver useEffect mais abaixo,
// com fetch em /api/ardosia-pratos.
const PRATOS_PADRAO: Prato[] = [
  {
    idx: '01',
    nome: 'Pão de Fermentação Natural',
    categoria: 'Entrada',
    preco: 'R$ 24',
    descricao: 'Manteiga de ervas da horta, flor de sal.',
    img: '',
  },
  {
    idx: '02',
    nome: 'Burrata com Tomate da Estação',
    categoria: 'Entrada',
    preco: 'R$ 42',
    descricao: 'Manjericão, azeite novo, pão tostado.',
    img: '/images/gastronomia/burrata-tomate.jpg',
  },
  {
    idx: '03',
    nome: 'Risoto de Cogumelos da Serra',
    categoria: 'Principal',
    preco: 'R$ 68',
    descricao: 'Parmesão de 24 meses, manteiga noisette.',
    img: '/images/gastronomia/risoto-cogumelos.jpg',
  },
  {
    idx: '04',
    nome: 'Peixe do Dia na Brasa',
    categoria: 'Principal',
    preco: 'R$ 76',
    descricao: 'Legumes da feira, beurre blanc de limão-siciliano.',
    img: '/images/gastronomia/peixe-do-dia.jpg',
    destaque: true,
  },
  {
    idx: '05',
    nome: 'Tagliatelle ao Ragù de 6 Horas',
    categoria: 'Principal',
    preco: 'R$ 62',
    descricao: 'Massa fresca do dia, pecorino.',
    img: '',
  },
  {
    idx: '06',
    nome: 'Pavê de Doce de Leite da Vó',
    categoria: 'Sobremesa',
    preco: 'R$ 28',
    img: '',
  },
  {
    idx: '07',
    nome: 'Sorbet da Fruta da Estação',
    categoria: 'Sobremesa',
    preco: 'R$ 24',
    img: '',
  },
  {
    idx: '08',
    nome: 'Taça de Vinho Natural',
    categoria: 'Bebida',
    preco: 'R$ 32',
    descricao: 'Curadoria da casa, rótulo muda toda semana.',
    img: '/images/gastronomia/vinho-natural.jpg',
  },
];

// Palavra cíclica no Hero — device inspirado na referência internacional
// pesquisada a pedido da Bruna (Qissa — A Tale of Food usa "Origin ✦ Spice
// ✦ Aroma" trocando sozinho no Hero). Aqui, palavras que resumem o próprio
// conceito da Ardósia em vez de copiadas da referência — reforça o "muda
// todo dia" sem custar nenhum asset novo (só motion, framer-motion já é
// dependência do projeto).
const TAGLINE_WORDS = ['Estação', 'Fogo', 'Feira', 'Giz'];

function RotatingTagline({ words, active }: { words: string[]; active: boolean }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, [active, words.length]);
  return (
    <span className="relative inline-flex h-[1.4em] w-[92px] items-baseline overflow-hidden align-baseline sm:w-[104px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[idx]}
          initial={{ y: active ? 14 : 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: active ? -14 : 0, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
          className="absolute left-0 whitespace-nowrap"
          style={{ color: '#D9A441', letterSpacing: '0.04em' }}
        >
          {words[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const VALORES = [
  'PRODUTO DA ESTAÇÃO',
  'FEIRA DE TERÇA',
  'SEM CONGELADOS',
  'PÃO DO DIA',
  'VINHO NATURAL',
  'PRODUTOR LOCAL',
  'CARDÁPIO QUE MUDA',
  'FEITO NA HORA',
];

const ETAPAS = [
  {
    hora: '05h',
    title: 'A Feira',
    body: 'Compra é feita cedo, direto na feira — não no distribuidor. Se não tá bom, não entra no prato.',
    rotate: '-2deg',
    img: '/images/gastronomia/a-feira.jpg',
  },
  {
    hora: '10h',
    title: 'O Quadro',
    body: 'O cardápio do dia é decidido na cozinha e escrito à mão no quadro de ardósia da entrada.',
    rotate: '1.5deg',
    img: '',
  },
  {
    hora: '12h',
    title: 'A Mise en Place',
    body: 'Cada prato é montado do zero, na hora do pedido — nada fica pronto esperando no balcão.',
    rotate: '-1deg',
    img: '',
  },
  {
    hora: '20h',
    title: 'A Mesa',
    body: 'Salão pequeno, ritmo de bairro — a gente costuma lembrar do seu nome já na segunda visita.',
    rotate: '2deg',
    img: '/images/gastronomia/a-mesa.jpg',
  },
] as const;

const DEPOIMENTOS = [
  {
    quote: 'Ardósia é meu lugar de quinta-feira. Nunca sei exatamente o que vou comer, e isso é ótimo.',
    autor: 'Marina T.',
    tag: 'Cliente desde 2024',
  },
  {
    quote: 'Reservei pra 6 pessoas em cima da hora e o time resolveu numa boa. Comida sempre impecável.',
    autor: 'Diego R.',
    tag: 'Cliente desde 2023',
  },
  {
    quote: 'O risoto de cogumelo mudou minha semana. Já voltei três vezes só pra comer ele de novo.',
    autor: 'Camila S.',
    tag: 'Cliente desde 2025',
  },
] as const;

const FAQ = [
  {
    q: 'Preciso reservar ou dá pra chegar sem hora marcada?',
    a: 'Recomendamos reservar, principalmente sexta e sábado — o salão é pequeno (28 lugares) e enche rápido.',
  },
  {
    q: 'O cardápio muda mesmo toda semana?',
    a: 'Sim — decidimos com base no que chega fresco da feira, então alguns pratos somem e voltam conforme a estação.',
  },
  {
    q: 'Tem opção vegetariana?',
    a: 'Sempre pelo menos duas opções no cardápio do dia, marcadas no quadro. Avise na reserva se precisar de algo específico.',
  },
  {
    q: 'Aceitam grupos grandes?',
    a: 'Até 10 pessoas sem problema, direto pelo formulário. Acima disso, chama no WhatsApp que a gente organiza um menu fechado.',
  },
] as const;

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

/** Mesma assinatura de motion (atração magnética discreta) da CERNE/Villa
 * Serena — reaproveitada como recurso comum, não como diferenciador. */
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

function FaqItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#F3EDE1]/12 py-6">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 text-left"
      >
        <span className="text-[14.5px] font-medium text-[#F3EDE1] sm:text-[15.5px]">{q}</span>
        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[#F3EDE1]/20 text-[#D9A441] transition-colors">
          {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="max-w-xl pt-4 text-[13px] leading-[1.85] text-[#B6AF9E]">{a}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Emblema orbital do Hero — ingredientes flutuando em órbita lenta ao
 * redor de um emblema central. Substitui os doodles estáticos antigos
 * (folha/trigo/uva/peixe parados em ângulos fixos) e dá ao Hero o
 * "momento visual" que faltava, sem depender de foto real nenhuma.
 *
 * Referência trazida pela Bruna: um vídeo de feed do Pinterest mostrando
 * um mockup de celular com objetos 3D flutuando ao redor da tela
 * ("Flawless design. Frictionless sales.", Ouma Digital). Aqui a técnica
 * é reaproduzida em CSS/framer-motion puro (sem WebGL/3D real — mantém a
 * regra da Ardósia de nunca reusar wireframe 3D nem anéis concêntricos
 * reagindo ao mouse): cada ingrediente vive num wrapper que gira ao
 * redor do centro, com um segundo wrapper interno girando na direção
 * oposta na mesma velocidade, then o ícone nunca fica de cabeça pra
 * baixo — só translada em órbita.
 */
/**
 * Foto do Hero "viva" — a Bruna pediu mais movimento/vídeo na foto do
 * quadro (ela não gerou vídeo, só foto, e as ferramentas de geração de
 * vídeo desta sessão seguem bloqueadas por plano/crédito). Solução: dois
 * efeitos dos catálogos que ela mandou pra salvar como referência —
 * docs/referencia-31-efeitos-animacao.md e
 * docs/references/50-efeitos-imagem-css.md.
 *
 * 1) Zoom lento contínuo (item 31 do catálogo de 50, "Zoom image with
 *    scale" — Omar Dsooky / técnica Ken Burns): a foto respira devagar
 *    (scale 1 → 1.07 → 1) num loop de 16s, sem nunca cortar a borda —
 *    lê como filmagem sutil, não como foto parada, sem precisar de vídeo
 *    de verdade.
 * 2) Tilt de perspectiva ao passar o mouse (item 26 do catálogo de 50,
 *    "Perspective tilty images" — Henry Desroches): a foto inclina em 3D
 *    seguindo o cursor, reagindo como um objeto físico apoiado na mesa —
 *    só desktop, só com o mouse sobre a foto.
 * Ambos cortados em prefers-reduced-motion (o zoom não anima; o tilt
 * simplesmente não liga o listener).
 */
function HeroPhoto({ active }: { active: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [9, -9]), {
    stiffness: 160,
    damping: 16,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-9, 9]), {
    stiffness: 160,
    damping: 16,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div
      className="absolute right-[3%] top-[34%] hidden sm:block"
      style={{ perspective: 900 }}
    >
      <motion.div
        onMouseMove={active ? handleMouseMove : undefined}
        onMouseLeave={active ? handleMouseLeave : undefined}
        style={{
          rotate: -3,
          rotateX: active ? rotateX : 0,
          rotateY: active ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        className="w-[170px] border-4 border-[#F3EDE1] bg-[#F3EDE1] shadow-[0_24px_48px_-20px_rgba(0,0,0,0.6)] lg:w-[190px]"
      >
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <motion.div
            className="absolute inset-0"
            animate={active ? { scale: [1, 1.07, 1] } : undefined}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image
              src="/images/gastronomia/hero-quadro.jpg"
              alt="Quadro de ardósia sendo escrito à mão com o prato do dia"
              fill
              sizes="190px"
              className="object-cover"
            />
          </motion.div>
          {/* Vinheta sutil — reforça a leitura de "still de filme" em vez
              de foto de banco, coerente com a direção de fotografia da
              identidade (ver docs/ardosia-identidade-visual.md, seção 5). */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ boxShadow: 'inset 0 0 28px 8px rgba(0,0,0,0.4)' }}
          />
        </div>
      </motion.div>
    </div>
  );
}

const ORBIT_ITEMS = [
  { Icon: Leaf, color: '#6B7A4E', angle: 0, size: 26 },
  { Icon: Wheat, color: '#D9A441', angle: 90, size: 32 },
  { Icon: Grape, color: '#8A8478', angle: 180, size: 22 },
  { Icon: Fish, color: '#C1552C', angle: 270, size: 28 },
] as const;

function IngredientOrbit() {
  const duration = 46;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative h-[280px] w-[280px]"
    >
      {/* Emblema central — o "selo" do quadro de ardósia */}
      <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#F3EDE1]/15 bg-[#2A2722]/90 backdrop-blur-sm">
        <UtensilsCrossed className="h-6 w-6 text-[#D9A441]/75" />
        <ArdosiaInkStroke
          variant="circle"
          color="#C1552C"
          className="pointer-events-none absolute -inset-3 opacity-70"
        />
      </div>

      {ORBIT_ITEMS.map(({ Icon, color, angle, size }, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{ originX: 0.5, originY: 0.5 }}
          initial={{ rotate: angle }}
          animate={{ rotate: angle + 360 }}
          transition={{ duration, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute left-1/2 top-0 -translate-x-1/2">
            <motion.div
              initial={{ rotate: -angle }}
              animate={{ rotate: -angle - 360 }}
              transition={{ duration, repeat: Infinity, ease: 'linear' }}
            >
              <Icon style={{ width: size, height: size, color, opacity: 0.55 }} />
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Ícone decorativo flutuando, reaproveitado em várias seções além do
 * Hero — o "fio visual" que amarra a página inteira, pedido pela Bruna
 * depois de ver uma referência (site de café que espalha grãos/respingos
 * de café em quase toda seção). Aqui: os mesmos ícones de ingrediente já
 * usados no emblema orbital do Hero, bem discretos (opacidade baixa),
 * com a animação `animate-float` que já existe em tailwind.config.ts
 * (usada em outros projetos NEURALABS) — sem criar nenhum efeito novo,
 * só repetindo o vocabulário visual da Ardósia pelo scroll inteiro.
 * Desktop-only, como todo decorativo do projeto.
 */
function FloatingDoodle({
  Icon,
  color,
  className,
  size = 26,
  delay = 0,
}: {
  Icon: typeof Leaf;
  color: string;
  className: string;
  size?: number;
  delay?: number;
}) {
  return (
    <Icon
      aria-hidden="true"
      className={`pointer-events-none absolute hidden animate-float opacity-[0.16] motion-reduce:animate-none md:block ${className}`}
      style={{ width: size, height: size, color, animationDelay: `${delay}s` }}
    />
  );
}

function DishCard({ prato }: { prato: Prato }) {
  const Icon = categoryIcon(prato.categoria);
  const hasPhoto = Boolean(prato.img);
  return (
    <div
      className={`relative flex w-[240px] flex-shrink-0 flex-col justify-between overflow-hidden rounded-sm border sm:w-[270px] ${
        prato.destaque
          ? 'border-[#C1552C]/50 bg-[#2E2B25]'
          : 'border-[#F3EDE1]/10 bg-[#2A2722]'
      }`}
      style={
        hasPhoto
          ? undefined
          : {
              backgroundImage:
                'radial-gradient(circle at 90% 10%, rgba(217,164,65,0.06), transparent 55%)',
            }
      }
    >
      {prato.destaque && (
        <span className="absolute left-5 top-3 z-10 rounded-full bg-[#C1552C] px-3 py-1 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-[#F3EDE1]">
          Prato do chef
        </span>
      )}

      {hasPhoto && (
        <div className="relative h-[150px] w-full overflow-hidden sm:h-[170px]">
          <Image
            src={prato.img}
            alt={prato.nome}
            fill
            sizes="(min-width: 640px) 270px, 240px"
            className="object-cover"
          />
          <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#F3EDE1]/25 bg-[#191712]/70 text-[#D9A441] backdrop-blur-sm">
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
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#8A8478]">{prato.categoria}</span>
            </div>
          )}
          {hasPhoto && (
            <span className="mb-2 block text-[10px] uppercase tracking-[0.16em] text-[#8A8478]">
              {prato.categoria}
            </span>
          )}
          <h3
            className="relative mb-2 text-[19px] leading-tight text-[#F3EDE1]"
            style={{ fontFamily: 'var(--font-ardosia-serif)', fontStyle: 'italic', fontWeight: 400 }}
          >
            {prato.nome}
            {prato.destaque && !hasPhoto && (
              <ArdosiaInkStroke
                variant="circle"
                color="#C1552C"
                className="pointer-events-none absolute -left-[10%] -top-[35%] h-[170%] w-[120%]"
                delay={0.3}
              />
            )}
          </h3>
          {prato.descricao && (
            <p className="text-[12px] leading-[1.7] text-[#B6AF9E]">{prato.descricao}</p>
          )}
        </div>
        <span
          className="mt-5 text-[15px] text-[#D9A441]"
          style={{ fontFamily: 'var(--font-ardosia-serif)', fontStyle: 'italic', fontWeight: 400 }}
        >
          {prato.preco}
        </span>
      </div>
    </div>
  );
}

export default function GastronomiaDemo() {
  const isDesktop = useIsDesktop();
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = useMagnetic();
  const [depoimentoIdx, setDepoimentoIdx] = useState(0);

  // Parallax — pedido pela Bruna como saída pra dar profundidade visual
  // sem depender de foto real: camadas que já existem (emblema orbital
  // do Hero, palavra-fundo "Ardósia" no contato) se deslocam em
  // velocidades diferentes do resto do conteúdo conforme o scroll, via
  // framer-motion `useScroll`/`useTransform` (leve, sem lib nova).
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const orbitParallaxY = useTransform(heroProgress, [0, 1], [0, 90]);

  const contatoRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: contatoProgress } = useScroll({
    target: contatoRef,
    offset: ['start end', 'end start'],
  });
  const wordmarkParallaxX = useTransform(contatoProgress, [0, 1], [-50, 30]);

  // Cardápio editável via Notion (CMS leve — mesmo padrão da CERNE, ver
  // lib/notion.ts). Sem NOTION_DATABASE_ID_ARDOSIA configurada, ou se a
  // busca falhar, fica no fallback estático — a seção nunca fica vazia.
  const [pratos, setPratos] = useState<Prato[]>(PRATOS_PADRAO);
  useEffect(() => {
    let cancelled = false;
    fetch('/api/ardosia-pratos')
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data?.configured && Array.isArray(data.pratos) && data.pratos.length > 0) {
          setPratos(data.pratos);
        }
      })
      .catch(() => {
        // silencioso: fica no fallback estático
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main
      ref={rootRef}
      className={`relative min-h-screen w-full max-w-full overflow-x-hidden bg-[#26241F] text-[#F3EDE1] ${display.variable} ${sans.variable}`}
      style={{ fontFamily: 'var(--font-ardosia-sans)' }}
    >
      {/* Selo NEURALABS — única menção à marca dentro da demo */}
      <div className="flex items-center justify-between gap-4 border-b border-[#F3EDE1]/10 bg-[#201E19] px-5 py-2 text-[11px] tracking-wide text-[#F3EDE1]/60 sm:px-8">
        <span>
          <span className="text-[#D9A441]">✦</span> Demonstração desenvolvida por{' '}
          <span className="font-semibold text-[#F3EDE1]">NEURALABS Studio</span>
        </span>
        <Link href="/" className="whitespace-nowrap font-medium hover:text-[#D9A441]">
          ← Voltar
        </Link>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[#F3EDE1]/10 bg-[#26241F]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-5 sm:px-8">
          <span
            className="text-sm uppercase tracking-[0.3em] sm:text-base"
            style={{ fontFamily: 'var(--font-ardosia-serif)' }}
          >
            Ardósia
          </span>
          <nav className="hidden items-center gap-8 text-[12.5px] font-medium tracking-wide text-[#F3EDE1]/70 md:flex">
            <a href="#cardapio" className="hover:text-[#D9A441]">Cardápio</a>
            <a href="#processo" className="hover:text-[#D9A441]">Como Funciona</a>
            <a href="#faq" className="hover:text-[#D9A441]">Perguntas</a>
          </nav>
          <a
            href="#contato"
            data-magnetic
            className="inline-flex flex-shrink-0 items-center justify-center whitespace-nowrap rounded-sm bg-[#C1552C] px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.15em] text-[#F3EDE1] transition-colors hover:bg-[#a84523] sm:px-6 sm:py-3"
          >
            Reservar Mesa
          </a>
        </div>
      </header>

      {/* Hero — tipográfico gigante, sem foto (Arquétipo D). Emblema
          orbital de ingredientes (ver IngredientOrbit acima — órbita
          lenta em CSS/framer-motion, inspirada num efeito de objetos
          flutuando que a Bruna trouxe de referência) + cartão de
          escassez diária flutuante, em vez do "cartão de vidro sobre
          foto" já usado 3x. */}
      <section
        ref={heroRef}
        className="relative mx-auto max-w-6xl overflow-hidden px-5 pb-20 pt-16 sm:px-8 sm:pt-24"
      >
        {isDesktop && !reducedMotion && (
          <motion.div
            className="pointer-events-none absolute right-[2%] top-[2%]"
            style={{ y: orbitParallaxY }}
          >
            <IngredientOrbit />
          </motion.div>
        )}

        {/* Foto real do Hero — o quadro de ardósia sendo escrito à mão,
            gerada pela Bruna a partir de docs/ardosia-prompts-gemini.md.
            Cartão de foto levemente rotacionado (moldura clara, sombra),
            lendo como uma polaroide pinada — não full-bleed, porque o
            Arquétipo D pede "hero tipográfico, sem foto ou foto pequena"
            (ver docs/IDENTIDADES-E-EFEITOS.md). Zoom lento + tilt de
            mouse via HeroPhoto (ver comentário no componente acima). */}
        {isDesktop && <HeroPhoto active={!reducedMotion} />}

        <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2">
          <div className="flex items-center gap-3">
            <span className="h-px w-9 bg-[#C1552C]" />
            <span className="text-[10.5px] uppercase tracking-[0.28em] text-[#D9A441]">
              Bistrô de Bairro · Cidade Baixa
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.28em] text-[#8A8478]">
            <span>Hoje tem</span>
            <RotatingTagline words={TAGLINE_WORDS} active={!reducedMotion} />
          </div>
        </div>

        <h1
          className="relative mb-8 max-w-[820px] text-[46px] leading-[1.05] sm:text-[68px] md:text-[84px]"
          style={{ fontFamily: 'var(--font-ardosia-serif)', fontWeight: 400 }}
        >
          O cardápio muda.
          <br />
          <span className="relative inline-block">
            <em style={{ fontStyle: 'italic', color: '#D9A441' }}>O capricho, não.</em>
            <ArdosiaInkStroke
              variant="underline"
              color="#C1552C"
              className="pointer-events-none absolute -bottom-2 left-0 h-3 w-full sm:h-4"
              delay={0.5}
            />
          </span>
        </h1>

        <p className="mb-10 max-w-[440px] text-[14px] leading-[1.9] text-[#B6AF9E]">
          Sem cardápio engessado. Compramos o que tá bom na feira de terça e escrevemos no
          quadro — se o tomate não tava bom hoje, ele não entra no prato.
        </p>

        <div className="flex flex-wrap items-center gap-6">
          <a
            href="#contato"
            data-magnetic
            className="inline-flex w-fit items-center gap-2 rounded-sm bg-[#C1552C] px-7 py-3.5 text-[11.5px] font-medium uppercase tracking-[0.15em] text-[#F3EDE1] transition-colors hover:bg-[#a84523]"
          >
            Reservar Mesa
          </a>
          <a
            href="#cardapio"
            className="inline-flex w-fit items-center gap-2 border-b border-[#D9A441] pb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#F3EDE1] hover:text-[#D9A441]"
          >
            Ver Cardápio de Hoje <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Cartão de escassez diária — versão bistrô do "cartão de vidro
            com escassez" (recurso comum aos três projetos anteriores):
            aqui rotacionado, sem blur/vidro, pra ler como um recado de
            quadro-negro afixado, não como widget de UI. */}
        <div
          className="relative mt-14 inline-flex max-w-[260px] flex-col gap-1 rounded-sm border border-[#F3EDE1]/12 bg-[#2E2B25] px-5 py-4 sm:mt-16"
          style={{ transform: isDesktop ? 'rotate(-2deg)' : undefined, boxShadow: '0 20px 40px -20px rgba(0,0,0,.5)' }}
        >
          <span className="text-[10px] uppercase tracking-[0.16em] text-[#D9A441]">Hoje à noite</span>
          <span
            className="text-[20px] leading-none text-[#F3EDE1]"
            style={{ fontFamily: 'var(--font-ardosia-serif)', fontStyle: 'italic', fontWeight: 400 }}
          >
            6 mesas disponíveis
          </span>
        </div>
      </section>

      {/* Faixa de valores — marquee contínuo (recurso comum, mesma
          animação CSS já usada em CERNE/Villa Serena) */}
      <div className="overflow-hidden border-y border-[#F3EDE1]/10 bg-[#201E19] py-3.5">
        <div className="flex w-max animate-marquee items-center gap-10 motion-reduce:animate-none">
          {[...VALORES, ...VALORES].map((v, i) => (
            <span
              key={`${v}-${i}`}
              className="flex items-center gap-10 text-[11px] uppercase tracking-[0.2em] text-[#B6AF9E]"
            >
              {v}
              <span className="text-[#C1552C]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Cardápio de hoje — trilho de scroll horizontal (Arquétipo D) em
          vez de grid tradicional. Puxa do Notion quando configurado. */}
      <section id="cardapio" className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <ScrollReveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-lg">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-9 bg-[#C1552C]" />
                <span className="text-[10.5px] uppercase tracking-[0.28em] text-[#D9A441]">Cardápio</span>
              </div>
              <h2
                className="text-[30px] leading-[1.15] sm:text-[36px]"
                style={{ fontFamily: 'var(--font-ardosia-serif)', fontWeight: 400 }}
              >
                O quadro de hoje
              </h2>
            </div>
            <span className="hidden text-[11px] uppercase tracking-[0.14em] text-[#8A8478] sm:inline-flex items-center gap-1.5">
              Arraste para o lado <ArrowUpRight className="h-3 w-3 rotate-90" />
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="scrollbar-none -mx-5 flex gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8">
            {pratos.map((p) => (
              <DishCard key={p.idx} prato={p} />
            ))}
          </div>
        </ScrollReveal>

        {/* Conector de seção — o "escorrer" que amarra o scroll (ver
            components/ArdosiaInkStroke.tsx, variante "drip"), inspirado
            num efeito de continuidade que a Bruna trouxe de referência
            (mel escorrendo entre seções) — aqui reinterpretado com o
            traço de giz/tinta que já é a assinatura da Ardósia. */}
        <ArdosiaSectionDrip />
      </section>

      {/* Da feira à mesa — colagem tipográfica em cartões rotacionados
          (Arquétipo D), sem fotografia */}
      <section id="processo" className="relative overflow-hidden border-t border-[#F3EDE1]/10 bg-[#201E19] px-5 py-20 sm:px-8 sm:py-24">
        <FloatingDoodle Icon={Cherry} color="#C1552C" className="right-[8%] top-[10%]" size={30} />
        <FloatingDoodle Icon={Wheat} color="#D9A441" className="bottom-[14%] left-[4%]" size={24} delay={1.2} />
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="mb-16 max-w-lg">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-9 bg-[#C1552C]" />
                <span className="text-[10.5px] uppercase tracking-[0.28em] text-[#D9A441]">Como Funciona</span>
              </div>
              <h2
                className="text-[30px] leading-[1.15] sm:text-[36px]"
                style={{ fontFamily: 'var(--font-ardosia-serif)', fontWeight: 400 }}
              >
                Da feira à mesa
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {ETAPAS.map((e, i) => (
              <ScrollReveal key={e.hora} delay={i * 0.08}>
                <div
                  className="relative h-full rounded-sm border border-[#F3EDE1]/10 bg-[#2A2722] p-6"
                  style={{ transform: isDesktop ? `rotate(${e.rotate})` : undefined }}
                >
                  {e.img && (
                    <div
                      className="pointer-events-none absolute -right-3 -top-4 h-14 w-14 overflow-hidden border-2 border-[#F3EDE1] shadow-[0_10px_22px_-10px_rgba(0,0,0,0.55)]"
                      style={{ transform: `rotate(${i % 2 === 0 ? '6deg' : '-6deg'})` }}
                    >
                      <Image
                        src={e.img}
                        alt={e.title}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <span
                    className="mb-4 block text-[26px] leading-none text-[#D9A441]"
                    style={{ fontFamily: 'var(--font-ardosia-serif)', fontStyle: 'italic', fontWeight: 400 }}
                  >
                    {e.hora}
                  </span>
                  <h3 className="mb-3 text-[14.5px] font-medium text-[#F3EDE1]">{e.title}</h3>
                  <p className="text-[12.5px] leading-[1.8] text-[#B6AF9E]">{e.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos — carrossel manual (Arquétipo D), tom de bairro em
          vez de credencial formal (diferente do depoimento de arquiteto
          da CERNE) */}
      <section className="relative mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-24">
        <ScrollReveal>
          <Quote className="mx-auto mb-6 h-7 w-7 text-[#C1552C]" />
          <p
            className="mb-6 min-h-[110px] text-[20px] leading-[1.55] sm:text-[24px]"
            style={{ fontFamily: 'var(--font-ardosia-serif)', fontStyle: 'italic', fontWeight: 400 }}
          >
            &ldquo;{DEPOIMENTOS[depoimentoIdx].quote}&rdquo;
          </p>
          <p className="mb-8 text-[11.5px] uppercase tracking-[0.18em] text-[#D9A441]">
            {DEPOIMENTOS[depoimentoIdx].autor} — {DEPOIMENTOS[depoimentoIdx].tag}
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              aria-label="Depoimento anterior"
              onClick={() =>
                setDepoimentoIdx((i) => (i - 1 + DEPOIMENTOS.length) % DEPOIMENTOS.length)
              }
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#F3EDE1]/15 text-[#F3EDE1]/70 transition-colors hover:border-[#D9A441]/50 hover:text-[#D9A441]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-1.5">
              {DEPOIMENTOS.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Ver depoimento ${i + 1}`}
                  onClick={() => setDepoimentoIdx(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === depoimentoIdx ? 'w-5 bg-[#D9A441]' : 'w-1.5 bg-[#F3EDE1]/20'
                  }`}
                />
              ))}
            </div>
            <button
              aria-label="Próximo depoimento"
              onClick={() => setDepoimentoIdx((i) => (i + 1) % DEPOIMENTOS.length)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#F3EDE1]/15 text-[#F3EDE1]/70 transition-colors hover:border-[#D9A441]/50 hover:text-[#D9A441]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </ScrollReveal>

        <ArdosiaSectionDrip />
      </section>

      {/* FAQ — redução de fricção antes do CTA final */}
      <section id="faq" className="relative overflow-hidden border-t border-[#F3EDE1]/10 bg-[#201E19] px-5 py-20 sm:px-8 sm:py-24">
        <FloatingDoodle Icon={Croissant} color="#D9A441" className="left-[6%] top-[8%]" size={26} delay={0.6} />
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="mb-12 max-w-lg">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-9 bg-[#C1552C]" />
                <span className="text-[10.5px] uppercase tracking-[0.28em] text-[#D9A441]">Perguntas Rápidas</span>
              </div>
              <h2
                className="text-[30px] leading-[1.15] sm:text-[36px]"
                style={{ fontFamily: 'var(--font-ardosia-serif)', fontWeight: 400 }}
              >
                Antes de reservar
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
        </div>
      </section>

      {/* Contato / Reserva — CTA assimétrico (Arquétipo D): palavra gigante
          de fundo + formulário real ao lado, em vez do formulário
          centralizado da CERNE */}
      <section
        id="contato"
        ref={contatoRef}
        className="relative mx-auto max-w-6xl overflow-hidden px-5 py-20 sm:px-8 sm:py-24"
      >
        <FloatingDoodle Icon={Grape} color="#8A8478" className="right-[10%] top-[6%]" size={26} delay={1.8} />
        <FloatingDoodle Icon={Wine} color="#C1552C" className="bottom-[12%] left-[3%]" size={24} delay={0.3} />
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -left-4 top-0 select-none text-[120px] font-normal italic leading-none text-[#F3EDE1]/[0.04] sm:text-[220px]"
          style={{
            fontFamily: 'var(--font-ardosia-serif)',
            x: isDesktop && !reducedMotion ? wordmarkParallaxX : 0,
          }}
        >
          Ardósia
        </motion.span>

        <div className="relative grid gap-14 md:grid-cols-[0.85fr_1.15fr] md:gap-10">
          <ScrollReveal>
            <div>
              <span className="mb-4 block text-[10.5px] uppercase tracking-[0.28em] text-[#D9A441]">
                Reserva
              </span>
              <h2
                className="mb-5 text-[32px] leading-[1.15] sm:text-[40px]"
                style={{ fontFamily: 'var(--font-ardosia-serif)', fontWeight: 400 }}
              >
                Bora marcar mesa?
              </h2>
              <p className="max-w-sm text-[13.5px] leading-[1.9] text-[#B6AF9E]">
                Terça a sábado, 19h às 23h30. Salão pequeno — confirmamos cada reserva
                pessoalmente, por telefone ou e-mail.
              </p>
              <p className="mt-6 text-[11px] uppercase tracking-[0.16em] text-[#8A8478]">
                Cidade Baixa · Porto Alegre
              </p>
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
            <a href="#cardapio" className="hover:text-[#D9A441]">Cardápio</a>
            <a href="#processo" className="hover:text-[#D9A441]">Como Funciona</a>
            <a href="#faq" className="hover:text-[#D9A441]">Perguntas</a>
          </nav>
          <p className="text-[11px] text-[#F3EDE1]/35">
            Projeto fictício de demonstração criado por{' '}
            <Link href="/" className="underline hover:text-[#D9A441]">
              NEURALABS
            </Link>
            . Marca, cardápio e depoimentos são ilustrativos.
          </p>
        </div>
      </footer>

      {/* Botão flutuante de voltar */}
      <Link
        href="/"
        className="fixed bottom-6 left-6 z-50 inline-flex items-center gap-2 rounded-full border border-[#F3EDE1]/15 bg-[#26241F]/95 px-4 py-3 text-xs font-semibold text-[#F3EDE1] shadow-lg backdrop-blur-md transition-colors hover:bg-[#2E2B25] sm:px-5 sm:text-sm"
      >
        <ArrowLeft className="h-4 w-4 flex-shrink-0" />
        <span className="hidden sm:inline">Voltar para NEURALABS Studio</span>
        <span className="sm:hidden">NEURALABS</span>
      </Link>
    </main>
  );
}
