'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/Badge';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// ============================================================================
// PORTFOLIO CARD COMPONENT
// ============================================================================
interface PortfolioCardProps {
  title: string;
  subtitle: string;
  archetype: string;
  description: string;
  strategy: string[];
  image: string;
  demoLink: string;
  delay: number;
}

const PortfolioCard = ({
  title,
  subtitle,
  archetype,
  description,
  strategy,
  image,
  demoLink,
  delay
}: PortfolioCardProps) => {
  return (
    <motion.div
      className="relative bg-gradient-to-br from-obsidian-800 to-obsidian-900 rounded-2xl overflow-hidden border border-pearl-200/10 group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, delay }}
      whileHover={{ borderColor: 'rgba(217, 178, 65, 0.3)', boxShadow: '0 20px 60px rgba(217, 178, 65, 0.1)' }}
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 opacity-20 group-hover:opacity-30"
        style={{
          backgroundImage: `url('${image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-obsidian-900/50 to-transparent" />

      {/* Content */}
      <div className="relative p-8 md:p-12 h-full flex flex-col justify-between min-h-[500px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.1, type: 'spring', stiffness: 300, damping: 30 }}
        >
          <p className="text-gold-400 text-xs font-bold uppercase tracking-[0.2em] mb-3">
            {archetype}
          </p>
          <h3 className="text-3xl md:text-4xl font-black text-pearl-100 mb-2">
            {title}
          </h3>
          <p className="text-gold-300 text-sm font-semibold mb-4">
            {subtitle}
          </p>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.15, type: 'spring', stiffness: 300, damping: 30 }}
          className="flex-1"
        >
          <p className="text-pearl-300/80 text-sm leading-relaxed mb-6">
            {description}
          </p>

          {/* Strategy Points */}
          <div className="space-y-2 mb-8">
            {strategy.map((point, idx) => (
              <motion.div
                key={idx}
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 0.2 + idx * 0.05, type: 'spring', stiffness: 300, damping: 30 }}
              >
                <span className="text-gold-400 font-bold mt-1 flex-shrink-0">•</span>
                <span className="text-pearl-300/70 text-xs">{point}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.a
          href={demoLink}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-obsidian-900 font-bold uppercase text-xs tracking-wider rounded-lg w-fit"
          whileHover={{ scale: 1.08, x: 4 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.25, type: 'spring', stiffness: 300, damping: 30 }}
        >
          Visualizar Demo
          <ArrowUpRight className="w-4 h-4" />
        </motion.a>
      </div>
    </motion.div>
  );
};

const portfolioItems = [
  {
    title: 'Villa Serena',
    subtitle: 'Imersão Cinética para Hospitalidade Luxury',
    archetype: 'Arquétipo: Cinematic Full-Bleed',
    description: 'Plataforma de reservas que vende o destino antes da estadia. Usando vídeo de alta produção com parallax scroll, criamos uma experiência imersiva que ancoriza expectativa de luxo e reduz fricção de decisão.',
    strategy: [
      'Parallax scroll com vídeo do destination hero',
      'Glassmorphism card com precio e CTA destacado',
      'Social proof integrado (reviews em scroll)',
      'Zero cliques até conversão'
    ],
    image: '/images/hero-studio/airbnb.jpg',
    demoLink: '/demo/airbnb',
    delay: 0
  },
  {
    title: 'CERNE Studio',
    subtitle: 'Split Editorial para Marcenaria Artesanal',
    archetype: 'Arquétipo: Editorial Split',
    description: 'Marcenaria de luxo pede apresentação escultural. Dividimos a tela entre storytelling editorial (esquerda) e showcasing técnico em 3D (direita). Comunica tradição + modernidade.',
    strategy: [
      'Wireframe 3D rotativo para produto técnico',
      'Copy editorial com tipografia serif elegante',
      'CTA minimalista mas clara (Ver Catálogo)',
      'Spring physics em todos os estados de hover',
      'Scroll reveal com stagger animations'
    ],
    image: '/images/hero-studio/marcenaria.jpg',
    demoLink: '/demo/marcenaria',
    delay: 0.1
  },
  {
    title: 'Ardósia',
    subtitle: 'Caos Visual Organizado para Gastronomia',
    archetype: 'Arquétipo: Editorial Assimétrico',
    description: 'Gastronomia de assinatura exige quebra de padrão. Fontes provocativas, colagem assimétrica e scroll-driven animations criam desejo visual e fome instintiva.',
    strategy: [
      'Tipografia display ousada + paleta quente',
      'Imagem rotacionável com hover reveal',
      'SVG path animado (scroll-driven)',
      'Micro-interações em card hover',
      'CTA integrada ao copy'
    ],
    image: '/images/hero-studio/gastronomia.jpg',
    demoLink: '/demo/gastronomia',
    delay: 0.2
  },
  {
    title: 'Nox-Paris',
    subtitle: 'Brutalismo & Fricção Zero para E-Commerce',
    archetype: 'Arquétipo: Grid Brutalista',
    description: 'E-commerce premium com identidade clara. Bordes pesados, cores sólidas, tipografia robusta. Zero distração — botões óbvios, imagens que comunicam, checkout direto.',
    strategy: [
      'Layout grid com bordas de 8px em preto',
      'Marquee animado com mensagem repetida',
      'Imagem em escala de cinza → cores no hover',
      'Preço e botão comprar em fundo fluorescente',
      'Product showcase com zoom suave'
    ],
    image: '/images/hero-studio/ecommerce.jpg',
    demoLink: '/demo/nox-paris',
    delay: 0.3
  }
];

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-obsidian-900 text-pearl-200 pt-32 pb-24">

        {/* HEADER */}
        <motion.div
          className="max-w-5xl mx-auto px-6 text-center mb-20"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
              }
            }
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } }
            }}
          >
            <Badge variant="primary" className="mb-6 mx-auto">
              O Laboratório
            </Badge>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-7xl font-serif font-black mb-8 leading-tight text-pearl-100"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } }
            }}
          >
            A anatomia da <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600">
              conversão perfeita
            </span>
          </motion.h1>
          <motion.p
            className="text-lg text-pearl-300/70 max-w-3xl mx-auto leading-relaxed"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } }
            }}
          >
            Nós não usamos templates. Utilizamos "Arquétipos de Decisão" — estruturas validadas pela neurociência que dominam o mercado High-Ticket. Cada projeto abaixo é uma demonstração viva de psicologia aplicada ao design.
          </motion.p>
        </motion.div>

        {/* PORTFOLIO GRID */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
          {portfolioItems.map((item, idx) => (
            <PortfolioCard key={idx} {...item} />
          ))}
        </div>

        {/* CTA SECTION */}
        <motion.div
          className="max-w-4xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.2 }}
        >
          <motion.div
            className="p-12 md:p-16 border border-pearl-100/10 rounded-2xl bg-gradient-to-br from-obsidian-800/80 to-obsidian-900 backdrop-blur-sm"
            whileHover={{
              borderColor: 'rgba(217, 178, 65, 0.3)',
              boxShadow: '0 0 40px rgba(217, 178, 65, 0.1)'
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-serif font-black text-pearl-100 mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 30 }}
            >
              Qual arquétipo faz sentido pro seu negócio?
            </motion.h2>
            <motion.p
              className="text-pearl-300/60 mb-8 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 30 }}
            >
              Seu site será desenhado a partir da psicologia do seu cliente ideal, não de templates genéricos. Conversamos sobre o seu negócio e recomendamos qual estratégia funciona melhor.
            </motion.p>
            <motion.a
              href={getWhatsAppLink('Oi! Vim pela página do Laboratório e quero saber qual arquétipo faz sentido pro meu negócio.')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gold-500 hover:bg-gold-400 text-obsidian-900 font-bold uppercase text-sm tracking-wider"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              Marcar diagnóstico
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </motion.div>

      </main>
      <Footer />
    </>
  );
}
