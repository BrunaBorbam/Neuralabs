'use client';

/**
 * NOX — E-commerce de Fragrância de Luxo
 * Demonstração Interativa • NEURALABS Studio
 *
 * Arquétipo: E. Minimal Produto-Led. 
 * Identidade: "Quiet Luxury Escuro". Fundo negro absoluto (#050505) contrastando 
 * com luz volumétrica e reflexos especulares. 
 * Tipografia: Bodoni Moda (editorial/luxo) + Plus Jakarta Sans (UI impecável).
 * 
 * Gatilhos de neuromarketing (E-commerce): 
 * Redução de fricção (Checkout flutuante sempre acessível), ancoragem de valor 
 * (storytelling sensorial das notas antes do preço), e prova de exclusividade 
 * (tiragem limitada).
 */

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Bodoni_Moda, Plus_Jakarta_Sans } from 'next/font/google';
import { ArrowLeft, ShoppingBag, Droplets, Wind, Leaf, Plus, Minus, ArrowRight } from 'lucide-react';
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

const HERO_BOTTLE = '/images/verticals/ecommerce.jpg';

export default function EcommerceDemo() {
  const [mounted, setMounted] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const PRICE = 1850;

  // Parallax effects
  const { scrollYProgress } = useScroll();
  const bottleY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const bottleScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const handleAddToCart = () => {
    setAdded(true);
    setCartOpen(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!mounted) return null;

  return (
    <main
      className={`relative min-h-screen w-full overflow-x-hidden bg-[#050505] text-[#EFEFEF] ${serif.variable} ${sans.variable} selection:bg-[#EFEFEF] selection:text-[#050505]`}
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

      {/* Navbar */}
      <header className="fixed top-[32px] z-40 w-full px-6 py-6 sm:px-12 mix-blend-difference flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          <span className="text-xl tracking-[0.3em] uppercase" style={{ fontFamily: 'var(--font-nox-serif)' }}>
            L'Obscur
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

      {/* Hero Section */}
      <section className="relative h-[100svh] flex flex-col items-center justify-center">
        {/* Spotlights */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute left-1/2 top-0 h-[70vh] w-[40vw] -translate-x-1/2 rounded-[100%] bg-white/5 blur-[120px]" />
          <div className="absolute bottom-0 left-1/2 h-[40vh] w-[60vw] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,transparent_70%)] blur-[80px]" />
        </div>

        <motion.div 
          className="z-10 relative mt-20"
          style={{ y: bottleY, scale: bottleScale }}
        >
          <div className="relative w-[300px] h-[400px] sm:w-[450px] sm:h-[600px]">
            <Image 
              src={HERO_BOTTLE}
              alt="Fragrância L'Obscur em frasco de vidro escuro"
              fill
              className="object-contain drop-shadow-[0_40px_80px_rgba(255,255,255,0.1)]"
              priority
            />
          </div>
        </motion.div>

        <motion.div 
          className="absolute bottom-20 flex flex-col items-center text-center z-20 pointer-events-none"
          style={{ opacity: textOpacity }}
        >
          <h1 className="text-5xl sm:text-7xl font-light tracking-wide mb-4" style={{ fontFamily: 'var(--font-nox-serif)' }}>
            Extrait de Nuit
          </h1>
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">
            A essência do silêncio
          </p>
        </motion.div>
      </section>

      {/* Storytelling & Sensory Details */}
      <section className="relative z-20 bg-[#050505] px-6 py-32 sm:px-12">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl leading-snug mb-8" style={{ fontFamily: 'var(--font-nox-serif)' }}>
              Criado para desaparecer na escuridão e ser lembrado até o amanhecer.
            </h2>
            <p className="text-sm text-white/60 leading-loose mb-10">
              Formulado com absolutos botânicos raros extraídos a frio na região de Grasse. 
              Sem sintéticos, sem atalhos. O frasco de obsidiana fundida protege os óleos 
              essenciais da degradação luminosa.
            </p>
            
            <div className="space-y-6 border-t border-white/10 pt-8">
              {[
                { icon: Wind, label: 'Notas de Topo', desc: 'Bergamota esfumaçada, Pimenta Negra' },
                { icon: Leaf, label: 'Coração', desc: 'Ládano, Vetiver escuro, Íris' },
                { icon: Droplets, label: 'Base', desc: 'Âmbar gris ético, Oud envelhecido' }
              ].map((note, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70">
                    <note.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-white/80 mb-1">{note.label}</h4>
                    <p className="text-[13px] text-white/50">{note.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            {/* Purchase Card (Glassmorphism) */}
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-2xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
              <div className="absolute -top-px left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              
              <h3 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-nox-serif)' }}>Extrait de Nuit</h3>
              <p className="text-xs text-white/50 tracking-wider uppercase mb-8">Parfum • 100ml / 3.4 oz</p>
              
              <div className="flex items-end justify-between mb-8 border-b border-white/10 pb-8">
                <span className="text-3xl font-light">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(PRICE)}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-white/40">Frete Cortesia</span>
              </div>

              <div className="flex gap-4 mb-6">
                {/* Qty Control */}
                <div className="flex h-12 w-32 items-center justify-between rounded-full border border-white/20 bg-white/5 px-4">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-white/50 hover:text-white"><Minus className="h-4 w-4"/></button>
                  <span className="text-sm font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="text-white/50 hover:text-white"><Plus className="h-4 w-4"/></button>
                </div>
                
                {/* CTA */}
                <motion.button 
                  onClick={handleAddToCart}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-full h-12 text-xs font-semibold uppercase tracking-widest transition-colors ${
                    added ? 'bg-green-900/40 border border-green-500/50 text-green-100' : 'bg-white text-black hover:bg-white/90'
                  }`}
                >
                  {added ? 'Adicionado' : 'Adicionar à Sacola'}
                </motion.button>
              </div>

              <p className="text-[10px] text-center text-white/30 uppercase tracking-wide">
                Edição numerada de 500 frascos.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Checkout Sidebar (Slide in) */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm cursor-pointer"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[400px] border-l border-white/10 bg-[#0A0A0A] shadow-2xl p-6 flex flex-col"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-6">
                <h2 className="text-sm uppercase tracking-widest">Sua Sacola</h2>
                <button onClick={() => setCartOpen(false)} className="text-white/50 hover:text-white transition-colors">
                  Fechar ✕
                </button>
              </div>
              
              <div className="flex-1 overflow-auto">
                <div className="flex gap-4">
                  <div className="relative w-20 h-24 rounded bg-white/5 border border-white/10 flex items-center justify-center p-2">
                    <Image src={HERO_BOTTLE} alt="Frasco" fill className="object-contain p-2" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="text-lg" style={{ fontFamily: 'var(--font-nox-serif)' }}>Extrait de Nuit</h3>
                      <p className="text-[10px] text-white/50 uppercase tracking-widest mt-1">100ml / 3.4 oz</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white/70">Qtd: {quantity}</span>
                      <span className="text-sm">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(PRICE * quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 mt-6">
                <div className="flex justify-between text-sm mb-2 text-white/60">
                  <span>Subtotal</span>
                  <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(PRICE * quantity)}</span>
                </div>
                <div className="flex justify-between text-sm mb-6 text-white/60">
                  <span>Frete Expresso</span>
                  <span className="text-white">Cortesia</span>
                </div>
                <div className="flex justify-between text-lg mb-8">
                  <span>Total</span>
                  <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(PRICE * quantity)}</span>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white text-black h-14 rounded-full text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2"
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
