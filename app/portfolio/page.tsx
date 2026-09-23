'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/Badge';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { useState } from 'react';

// ============================================================================
// BRAND KIT MODAL
// ============================================================================
interface BrandKitModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandName: string;
  colors: { name: string; hex: string; rgb: string; psychology: string }[];
  typography: { display: string; body: string; hierarchy: string };
  voiceTone: string[];
  photography: string;
  justification: string;
}

const BrandKitModal = ({
  isOpen,
  onClose,
  brandName,
  colors,
  typography,
  voiceTone,
  photography,
  justification
}: BrandKitModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <motion.div
              className="bg-obsidian-900 rounded-2xl border border-pearl-200/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-obsidian-800/95 border-b border-pearl-200/10 p-6 flex justify-between items-center backdrop-blur">
                <h2 className="text-2xl font-black text-pearl-100">
                  Kit de Identidade Visual — {brandName}
                </h2>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-pearl-300/60 hover:text-pearl-100"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-8 space-y-12">
                {/* Justificativa Estratégica */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gold-500/10 border border-gold-500/20 rounded-lg p-6"
                >
                  <p className="text-gold-300 text-sm font-semibold mb-2">FUNDAMENTAÇÃO NEUROMARKETING</p>
                  <p className="text-pearl-300/80 text-sm leading-relaxed">{justification}</p>
                </motion.div>

                {/* Paleta de Cores */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <h3 className="text-lg font-bold text-pearl-100 mb-6">Paleta de Cores</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {colors.map((color, idx) => (
                      <div key={idx} className="border border-pearl-200/10 rounded-lg p-4">
                        <div className="flex items-start gap-4 mb-3">
                          <div
                            className="w-16 h-16 rounded border border-pearl-200/20 flex-shrink-0"
                            style={{ backgroundColor: color.hex }}
                          />
                          <div>
                            <p className="font-bold text-pearl-100">{color.name}</p>
                            <p className="text-xs text-pearl-300/60 font-mono">{color.hex}</p>
                            <p className="text-xs text-pearl-300/60 font-mono">{color.rgb}</p>
                          </div>
                        </div>
                        <p className="text-xs text-pearl-300/70 leading-relaxed border-t border-pearl-200/10 pt-3">
                          <span className="text-gold-300 font-semibold">Psicologia: </span>{color.psychology}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Tipografia */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-lg font-bold text-pearl-100 mb-6">Sistema Tipográfico</h3>
                  <div className="space-y-4">
                    <div className="border border-pearl-200/10 rounded-lg p-6">
                      <p className="text-sm text-pearl-300/60 uppercase tracking-widest mb-2">Display / Títulos</p>
                      <p className="text-4xl font-black mb-3" style={{ fontFamily: 'Fraunces, serif' }}>
                        {typography.display}
                      </p>
                      <p className="text-xs text-pearl-300/70">Elegância, autoridade, alto contraste visual</p>
                    </div>
                    <div className="border border-pearl-200/10 rounded-lg p-6">
                      <p className="text-sm text-pearl-300/60 uppercase tracking-widest mb-2">Corpo / UI</p>
                      <p className="text-base leading-relaxed mb-3">
                        {typography.body}
                      </p>
                      <p className="text-xs text-pearl-300/70">Legibilidade, humanidade, funcionalidade</p>
                    </div>
                    <div className="bg-gold-500/5 border border-gold-500/20 rounded-lg p-4">
                      <p className="text-xs text-pearl-300/70"><span className="text-gold-300 font-semibold">Hierarquia: </span>{typography.hierarchy}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Tom de Voz */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <h3 className="text-lg font-bold text-pearl-100 mb-6">Tom de Voz</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {voiceTone.map((tone, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-pearl-200/5 rounded-lg border border-pearl-200/10">
                        <span className="text-gold-400 font-bold">•</span>
                        <span className="text-pearl-300/80 text-sm">{tone}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Fotografia */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="border border-pearl-200/10 rounded-lg p-6 bg-pearl-200/5"
                >
                  <h4 className="font-bold text-pearl-100 mb-3">Diretriz de Fotografia & Imagem</h4>
                  <p className="text-pearl-300/80 text-sm leading-relaxed">{photography}</p>
                </motion.div>

                {/* CTA */}
                <motion.a
                  href={getWhatsAppLink('Oi! Gostei do kit de identidade visual. Quero saber mais sobre os planos e como funciona a entrega.')}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full py-4 bg-gold-500 hover:bg-gold-400 text-obsidian-900 font-bold uppercase text-center rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  Quero este kit para meu negócio
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

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
  brandKit: {
    colors: { name: string; hex: string; rgb: string; psychology: string }[];
    typography: { display: string; body: string; hierarchy: string };
    voiceTone: string[];
    photography: string;
    justification: string;
  };
}

const PortfolioCard = ({
  title,
  subtitle,
  archetype,
  description,
  strategy,
  image,
  demoLink,
  delay,
  brandKit
}: PortfolioCardProps) => {
  const [showBrandKit, setShowBrandKit] = useState(false);
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

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3 pt-4 border-t border-pearl-200/10">
          <motion.a
            href={demoLink}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-obsidian-900 font-bold uppercase text-xs tracking-wider rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.25, type: 'spring', stiffness: 300, damping: 30 }}
          >
            Visualizar Demo
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
          <motion.button
            onClick={() => setShowBrandKit(true)}
            className="inline-flex items-center justify-center gap-2 px-6 py-2 border border-gold-400/50 text-gold-300 hover:text-gold-200 font-semibold uppercase text-xs tracking-wider rounded-lg bg-gold-500/5 hover:bg-gold-500/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.3, type: 'spring', stiffness: 300, damping: 30 }}
          >
            Ver Kit de Identidade Visual
          </motion.button>
        </div>
      </div>

      {/* Brand Kit Modal */}
      <BrandKitModal
        isOpen={showBrandKit}
        onClose={() => setShowBrandKit(false)}
        brandName={title}
        colors={brandKit.colors}
        typography={brandKit.typography}
        voiceTone={brandKit.voiceTone}
        photography={brandKit.photography}
        justification={brandKit.justification}
      />
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
    delay: 0,
    brandKit: {
      colors: [
        {
          name: 'Amber Gold',
          hex: '#D4A574',
          rgb: 'rgb(212, 165, 116)',
          psychology: 'Conforto, luxo, aconchego natural. Âncora de preço premium e percepção de qualidade exclusiva.'
        },
        {
          name: 'Deep Navy',
          hex: '#0F1F2E',
          rgb: 'rgb(15, 31, 46)',
          psychology: 'Confiança, sofisticação. Reduz fricção de risco emocional na decisão de reserva.'
        },
        {
          name: 'Cream Ivory',
          hex: '#F5F1E8',
          rgb: 'rgb(245, 241, 232)',
          psychology: 'Pureza, serenidade. Comunica exclusividade e experiência limpa.'
        }
      ],
      typography: {
        display: 'Bodoni Moda',
        body: 'Inter',
        hierarchy: 'Display para hero/títulos (72px+); corpo para copy (16px); captions (12px)'
      },
      voiceTone: [
        'Aspiracional sem arrogância',
        'Acolhedor e convidativo',
        'Premium mas acessível',
        'Narrativo (venda o destino, não o quarto)'
      ],
      photography: 'Golden hour (pôr/nascer), natural lighting, lifestyle shots (hóspedes em momentos felizes, não vagas vazias). Saturação +15%, warmth +10%. Sem pessoas cenário - sempre interação genuína.',
      justification: 'Âmbar + Navy criam contraste que guia atenção. Âmbar ativa "reward processing" no cérebro (ancoriza expectativa de prazer). Navy reduz ansiedade pré-compra. Tipografia Bodoni comunica tradição + modernidade = confiança em marca nova.'
    }
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
    delay: 0.1,
    brandKit: {
      colors: [
        {
          name: 'Forest Green',
          hex: '#576141',
          rgb: 'rgb(87, 97, 65)',
          psychology: 'Natureza, sustentabilidade, maestria. Comunica craftmanship e materiais nobres.'
        },
        {
          name: 'Warm Cream',
          hex: '#F5F4EE',
          rgb: 'rgb(245, 244, 238)',
          psychology: 'Linho, naturalidade. Reduz fricção visual, aumenta legibilidade de conteúdo premium.'
        },
        {
          name: 'Oak Tan',
          hex: '#8B7355',
          rgb: 'rgb(139, 115, 85)',
          psychology: 'Madeira natural, autenticidade. Âncora de qualidade material e durabilidade.'
        }
      ],
      typography: {
        display: 'Fraunces',
        body: 'Inter',
        hierarchy: 'Display para títulos/seções (64px+); corpo (16px); técnico em mono para specs (12px)'
      },
      voiceTone: [
        'Artesanal e autêntico',
        'Técnico quando necessário',
        'Educador (explica processo)',
        'Respeitoso com o cliente'
      ],
      photography: 'Luz natural direta, texturas close-up de madeira, mãos em detalhe. Cores neutras com toques de verde. High detail, sharp focus. Mostrar processo de fabricação, não só resultado final.',
      justification: 'Verde + Creme ativam senso de "natural premium" (psicologia ambiental). Forest Green reduz tempo de decisão (menos opções percebidas = mais foco no produto). Fraunces comunica tradição artesanal. Técnica mono em specs constrói autoridade.'
    }
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
    delay: 0.2,
    brandKit: {
      colors: [
        {
          name: 'Burnt Orange',
          hex: '#C84B31',
          rgb: 'rgb(200, 75, 49)',
          psychology: 'Fogo, urgência, apetite. Ativa resposta visceral - fome emocional. Aumenta heart rate.'
        },
        {
          name: 'Cream Warm',
          hex: '#E8DCC4',
          rgb: 'rgb(232, 220, 196)',
          psychology: 'Conforto culinário, sofisticação. Acalma a urgência, mantém elegância.'
        },
        {
          name: 'Deep Charcoal',
          hex: '#1A1A1A',
          rgb: 'rgb(26, 26, 26)',
          psychology: 'Dramaticidade, sofisticação. Faz laranja "pular" (contraste máximo).'
        }
      ],
      typography: {
        display: 'Instrument Serif Italic',
        body: 'Poppins',
        hierarchy: 'Display italic bold (72px+) para dramaticidade; corpo sem serif (16px) para contraste'
      },
      voiceTone: [
        'Provocador e irreverente',
        'Apaixonado pelo detalhe',
        'Teatral (storytelling sensorial)',
        'Acessível apesar de premium'
      ],
      photography: 'Close-ups extremos de pratos, texturas, ingredientes. Golden hour com calor exagerado. Saturação +20%, contraste +15%. Sempre ação/movimento (mãos cortando, vapor). Sem plating tradicional - show comida como arte.',
      justification: 'Laranja queimada ativa "approach motivation" + fome (resposta evolutiva). Creme mantém sofisticação (não é fast food). Italic serif comunica quebra de padrão (não é restaurante tradicional). Poppins (sans) cria tensão com display serif = visual dissonância planejada.'
    }
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
    delay: 0.3,
    brandKit: {
      colors: [
        {
          name: 'Jet Black',
          hex: '#000000',
          rgb: 'rgb(0, 0, 0)',
          psychology: 'Autoridade absoluta, minimalismo. Reduz choice paralysis (menos cores = menos decisões).'
        },
        {
          name: 'Neon Lime',
          hex: '#D4FF00',
          rgb: 'rgb(212, 255, 0)',
          psychology: 'Urgência, rebeldia, youth energy. Força olho para botão de compra (atração atencional irresistível).'
        },
        {
          name: 'Pure White',
          hex: '#FFFFFF',
          rgb: 'rgb(255, 255, 255)',
          psychology: 'Clareza, confiança. Espaço negativo reduz cognitive load.'
        }
      ],
      typography: {
        display: 'IBM Plex Sans Bold',
        body: 'IBM Plex Sans',
        hierarchy: 'Display bold uppercase (56px+) para força; corpo regular (14px) para leitura'
      },
      voiceTone: [
        'Direto e sem filtro',
        'Confiante, não apologético',
        'Eficiente (poupador de tempo)',
        'Underground luxury vibe'
      ],
      photography: 'Topo plano (flat lay), ângulo 45º. Luz frontal dura (sombras marcadas). Preto/branco com um pop de neon. Produto sempre em foco, fundo minimamente distrativo. Brutalist composition (geometria clara).',
      justification: 'Preto reduz número de opções percebidas (brutalismo = menos é mais, psicologia de restrição aumenta valor percebido). Neon lime ativa "stop and stare" (resposta evolutiva a contraste extremo). IBM Plex comunica precision/engineering. Bordas pesadas = decisão óbvia, zero ambiguidade.'
    }
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
