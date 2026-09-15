'use client';

/**
 * NOX — E-commerce de Fragrância de Luxo
 * Demonstração Interativa • NEURALABS Studio
 *
 * Arquétipo: E. Minimal Produto-Led (Evoluído para Cinematic Full-Bleed)
 * Identidade: "Quiet Luxury Escuro". Fundo cinematográfico, luz volumétrica.
 * Tipografia: Bodoni Moda (editorial/luxo) + Plus Jakarta Sans.
 */

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { Bodoni_Moda, Plus_Jakarta_Sans } from 'next/font/google';
import { ArrowLeft, ShoppingBag, Droplets, Wind, Leaf, Plus, Minus, ArrowRight, Play } from 'lucide-react';
import { ScrollReveal } from '@/components/HeroAnimations';

const serif = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-nox-serif',
  display: 'swap',
});

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-nox-sans',
  display: 'swap',
});

const HERO_BOTTLE_CINEMATIC = '/images/ecommerce/hero-perfume-cinematic.jpg';

function TextReveal({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: i * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function EcommerceDemo() {
  const [mounted, setMounted] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const PRICE = 1850;

  // Parallax setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const heroBgY = useTransform(smoothProgress, [0, 1], ['0%', '30%']);
  const heroTextY = useTransform(smoothProgress, [0, 1], ['0%', '80%']);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  
  // Sticky Section transforms
  const stickyBgOpacity = useTransform(smoothProgress, [0.1, 0.3], [0, 1]);
  const stickyContentY = useTransform(smoothProgress, [0.1, 0.3], [100, 0]);

  const handleAddToCart = () => {
    setAdded(true);
    setCartOpen(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!mounted) return null;

  return (
    <main
      ref={containerRef}
      className={`relative w-full overflow-x-hidden bg-[#050505] text-[#EFEFEF] ${serif.variable} ${sans.variable} selection:bg-[#EFEFEF] selection:text-[#050505]`}
      style={{ fontFamily: 'var(--font-nox-sans)' }}
    >
      {/* Attribution Bar */}
      <div className="fixed top-0 z-50 flex w-full items-center justify-between gap-4 border-b border-white/5 bg-black/60 px-5 py-2 text-[10px] tracking-widest text-white/50 uppercase backdrop-blur-md">
        <span>
          <span className="text-white/80">✦</span> Demonstração por{' '}
          <span className="text-white">NEURALABS Studio</span>
        </span>
        <Link href="/" className="hover:text-white transition-colors">
          Sair do E-commerce
        </Link>
      </div>

      {/* Navbar Transparente (Glassmorphism) */}
      <header className="fixed top-[32px] z-40 w-full px-6 py-6 sm:px-12 flex justify-between items-center mix-blend-difference pointer-events-none">
        <div className="pointer-events-auto">
          <span className="text-xl tracking-[0.3em] uppercase" style={{ fontFamily: 'var(--font-nox-serif)' }}>
            NOX Paris
          </span>
        </div>
        <button 
          onClick={() => setCartOpen(true)}
          className="pointer-events-auto relative group flex items-center gap-2"
        >
          <span className="text-[11px] uppercase tracking-widest group-hover:text-white/70 transition-colors">Cart</span>
          <div className="relative">
            <ShoppingBag className="w-5 h-5 font-light" strokeWidth={1.5} />
            {quantity > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white text-[8px] font-bold text-black">
                {quantity}
              </span>
            )}
          </div>
        </button>
      </header>

      {/* ─── 1. HERO 100% IMERSIVO (FULL-BLEED) ─── */}
      <section className="relative h-[110vh] w-full overflow-hidden flex items-center justify-center">
        {/* Fundo Parallax (Imagem Cinematográfica) */}
        <motion.div 
          className="absolute inset-0 z-0 h-[120%]"
          style={{ y: heroBgY }}
        >
          <Image 
            src={HERO_BOTTLE_CINEMATIC}
            alt="NOIR ÔMBRE by NOX Paris"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay Gradient para leitura de texto */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-transparent" />
        </motion.div>

        {/* Tipografia Gigante Parallax */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[1] flex flex-col items-center justify-center overflow-hidden mix-blend-overlay"
          style={{ y: heroTextY, opacity: heroOpacity }}
        >
          <h1 
            className="text-[15vw] leading-[0.8] tracking-widest uppercase text-white/40"
            style={{ fontFamily: 'var(--font-nox-serif)' }}
          >
            NOIR
          </h1>
          <h1 
            className="text-[15vw] leading-[0.8] tracking-widest uppercase text-white/40 ml-32"
            style={{ fontFamily: 'var(--font-nox-serif)' }}
          >
            ÔMBRE
          </h1>
        </motion.div>

        {/* Content Overlay */}
        <motion.div 
          className="relative z-[2] mt-auto pb-32 flex flex-col items-center text-center"
          style={{ opacity: heroOpacity }}
        >
          <h2 className="text-sm uppercase tracking-[0.4em] text-white/70 mb-4">
            Extrait de Parfum
          </h2>
          <p className="text-3xl sm:text-5xl font-light tracking-wide mb-8 max-w-2xl px-4" style={{ fontFamily: 'var(--font-nox-serif)' }}>
            <TextReveal text="A essência do silêncio." />
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-[1px] h-12 bg-white/30" />
            <span className="text-[9px] uppercase tracking-widest text-white/50">Descubra</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── 2. SEÇÃO STICKY EDITORIAL (SPLIT SCREEN) ─── */}
      <section className="relative w-full bg-[#050505]">
        {/* Layout Sticky em Desktop */}
        <div className="flex flex-col lg:flex-row min-h-[150vh]">
          
          {/* Lado Esquerdo - Imagem Fixa */}
          <div className="lg:w-1/2 lg:sticky lg:top-0 lg:h-screen p-6 sm:p-12 lg:p-20 flex flex-col justify-center">
            <motion.div 
              className="relative w-full aspect-[4/5] overflow-hidden rounded-sm"
              style={{ opacity: stickyBgOpacity }}
            >
              <Image 
                src={HERO_BOTTLE_CINEMATIC}
                alt="NOIR ÔMBRE detail"
                fill
                className="object-cover"
                style={{ filter: 'brightness(0.6) contrast(1.2)' }}
              />
              <div className="absolute inset-0 border border-white/10" />
              
              {/* Play Video CTA (Visual) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md transition-transform hover:scale-110">
                  <Play className="h-6 w-6 ml-1 text-white" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Lado Direito - Scroll Text & Buy Box */}
          <div className="lg:w-1/2 p-6 sm:p-12 lg:p-20 lg:py-32 flex flex-col gap-32">
            
            <motion.div style={{ y: stickyContentY }}>
              <h3 className="text-3xl sm:text-5xl leading-snug mb-8" style={{ fontFamily: 'var(--font-nox-serif)' }}>
                Criado para desaparecer na escuridão e ser lembrado até o amanhecer.
              </h3>
              <p className="text-[15px] text-white/60 leading-relaxed mb-10 max-w-md">
                Formulado com absolutos botânicos raros extraídos a frio na região de Grasse. 
                Sem sintéticos, sem atalhos. O frasco de obsidiana fundida protege os óleos 
                essenciais da degradação luminosa.
              </p>
              
              <div className="space-y-8 border-l border-white/10 pl-8 max-w-md">
                {[
                  { icon: Wind, label: 'Notas de Topo', desc: 'Bergamota esfumaçada, Pimenta Negra' },
                  { icon: Leaf, label: 'Coração', desc: 'Ládano, Vetiver escuro, Íris' },
                  { icon: Droplets, label: 'Base', desc: 'Âmbar gris ético, Oud envelhecido' }
                ].map((note, i) => (
                  <ScrollReveal key={i} delay={i * 0.1}>
                    <div className="flex gap-4 items-start">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-white">
                        <note.icon className="h-4 w-4" />
                      </span>
                      <div>
                        <h4 className="text-xs uppercase tracking-widest text-white/80 mb-1">{note.label}</h4>
                        <p className="text-[13px] text-white/50">{note.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </motion.div>

            {/* ─── 3. MICRO-INTERAÇÕES DE LUXO (Glassmorphism Cart) ─── */}
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-3xl shadow-[0_30px_80px_-20px_rgba(0,0,0,1)] lg:mt-32">
              <div className="absolute -top-px left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              
              <h4 className="text-3xl mb-2" style={{ fontFamily: 'var(--font-nox-serif)' }}>NOIR ÔMBRE</h4>
              <p className="text-xs text-white/50 tracking-widest uppercase mb-10">Parfum • 100ml / 3.4 oz</p>
              
              <div className="flex items-end justify-between mb-8 border-b border-white/10 pb-8">
                <span className="text-4xl font-light tracking-tight">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(PRICE)}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-white/40">Frete Cortesia Mundial</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                {/* Qty Control */}
                <div className="flex h-14 w-full sm:w-32 items-center justify-between rounded-full border border-white/20 bg-white/5 px-4 shrink-0">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-white/50 hover:text-white p-2 transition-colors"><Minus className="h-4 w-4"/></button>
                  <span className="text-sm font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="text-white/50 hover:text-white p-2 transition-colors"><Plus className="h-4 w-4"/></button>
                </div>
                
                {/* Magnetic CTA */}
                <motion.button 
                  onClick={handleAddToCart}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-full h-14 text-xs font-semibold uppercase tracking-widest transition-colors ${
                    added ? 'bg-white/10 border border-white/20 text-white' : 'bg-white text-black hover:bg-white/90'
                  }`}
                >
                  {added ? 'Adicionado à Sacola' : 'Adicionar à Sacola'}
                </motion.button>
              </div>

              <p className="text-[10px] text-center text-white/30 uppercase tracking-widest mt-6">
                Edição numerada. 500 frascos disponíveis.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Slide-in Cart Panel ─── */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md cursor-pointer"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[440px] border-l border-white/10 bg-[#0A0A0A] shadow-2xl p-6 sm:p-8 flex flex-col"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-8">
                <h2 className="text-xs uppercase tracking-widest">Sua Sacola</h2>
                <button onClick={() => setCartOpen(false)} className="text-white/50 hover:text-white text-xs uppercase tracking-widest transition-colors">
                  Fechar ✕
                </button>
              </div>
              
              <div className="flex-1 overflow-auto">
                <div className="flex gap-6">
                  <div className="relative w-24 h-32 rounded bg-black border border-white/10 flex items-center justify-center overflow-hidden">
                    <Image src={HERO_BOTTLE_CINEMATIC} alt="Frasco NOIR ÔMBRE" fill className="object-cover opacity-80" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="text-xl" style={{ fontFamily: 'var(--font-nox-serif)' }}>NOIR ÔMBRE</h3>
                      <p className="text-[10px] text-white/50 uppercase tracking-widest mt-2">100ml / 3.4 oz</p>
                    </div>
                    <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-4">
                      <span className="text-xs text-white/70 tracking-widest">QTD: {quantity}</span>
                      <span className="text-sm font-medium">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(PRICE * quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-8 mt-8">
                <div className="flex justify-between text-xs tracking-widest mb-4 text-white/60">
                  <span>Subtotal</span>
                  <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(PRICE * quantity)}</span>
                </div>
                <div className="flex justify-between text-xs tracking-widest mb-8 text-white/60">
                  <span>Frete Expresso</span>
                  <span className="text-white">Cortesia Mundial</span>
                </div>
                <div className="flex justify-between text-xl font-light mb-8 pt-6 border-t border-white/10">
                  <span style={{ fontFamily: 'var(--font-nox-serif)' }}>Total</span>
                  <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(PRICE * quantity)}</span>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white text-black h-16 rounded-full text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  Finalizar Pedido <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Back Button */}
      <Link
        href="/"
        className="fixed bottom-6 left-6 z-40 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-4 py-3 text-[11px] font-medium uppercase tracking-widest text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar à NEURALABS
      </Link>
    </main>
  );
}
