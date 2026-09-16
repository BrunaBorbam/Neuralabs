'use client';

/**
 * NOX — E-commerce de Fragrância de Luxo
 * Demonstração Interativa • NEURALABS Studio
 *
 * Arquétipo: E. Minimal Produto-Led (Evoluído para Cinematic Full-Bleed)
 * Identidade: "Quiet Luxury Escuro". Fundo cinematográfico, luz volumétrica.
 * Tipografia: Bodoni Moda (editorial/luxo) + Plus Jakarta 'use client';

import { useEffect, useState, useRef, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
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

// ─── EFEITOS SOTD ───

/** Fluid Text Reveal (Mask/Clip-path style) */
function FluidTextReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-flex mr-[0.25em] pb-1">
          <motion.span
            initial={{ y: "110%", rotate: 2 }}
            whileInView={{ y: "0%", rotate: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, delay: delay + i * 0.04, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="inline-block origin-bottom-left"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Magnetic Button Physics */
function MagneticButton({ children, className, onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

export default function EcommerceDemo() {
  const [mounted, setMounted] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const PRICE = 1850;

  // Parallax SOTD Setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  // Hero Deep Zoom & Fade
  const heroScale = useTransform(smoothProgress, [0, 0.4], [1, 1.4]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  const heroTextY = useTransform(smoothProgress, [0, 0.3], ['0%', '-60%']);
  const heroBlur = useTransform(smoothProgress, [0, 0.4], ['blur(0px)', 'blur(20px)']);

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
      <div className="fixed top-0 z-50 flex w-full items-center justify-between gap-4 border-b border-white/5 bg-[#050505]/80 px-5 py-2 text-[10px] tracking-widest text-white/50 uppercase backdrop-blur-xl">
        <span>
          <span className="text-white/80">✦</span> Demonstração por{' '}
          <span className="text-white">NEURALABS Studio</span>
        </span>
        <Link href="/" className="hover:text-white transition-colors">
          Sair do E-commerce
        </Link>
      </div>

      {/* Navbar Transparente */}
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

      {/* ─── 1. HERO 100% IMERSIVO (SOTD DEEP PARALLAX) ─── */}
      <section className="relative h-[120vh] w-full flex flex-col items-center justify-center">
        {/* Fundo Parallax (Imagem Cinematográfica) - Fixa durante o scroll e dá zoom */}
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          <motion.div 
            className="absolute inset-0 z-0 h-full w-full origin-center"
            style={{ scale: heroScale, filter: heroBlur, opacity: heroOpacity }}
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
            className="pointer-events-none absolute inset-0 z-[1] flex flex-col items-center justify-center mix-blend-overlay"
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
            className="absolute bottom-32 left-0 right-0 z-[2] flex flex-col items-center text-center"
            style={{ opacity: heroOpacity }}
          >
            <h2 className="text-sm uppercase tracking-[0.4em] text-white/70 mb-4 overflow-hidden">
              <FluidTextReveal text="Extrait de Parfum" delay={0.2} />
            </h2>
            <p className="text-3xl sm:text-5xl font-light tracking-wide mb-8 max-w-2xl px-4" style={{ fontFamily: 'var(--font-nox-serif)' }}>
              <FluidTextReveal text="A essência do silêncio." delay={0.4} />
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-[1px] h-12 bg-white/30" />
              <span className="text-[9px] uppercase tracking-widest text-white/50">Descubra</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── 2. SEÇÃO STICKY EDITORIAL (SPLIT SCREEN) ─── */}
      <section className="relative w-full bg-[#050505] z-10 -mt-[20vh]">
        {/* Layout Sticky em Desktop */}
        <div className="flex flex-col lg:flex-row min-h-[150vh]">
          
          {/* Lado Esquerdo - Imagem Fixa (Revela pelo Scroll) */}
          <div className="lg:w-1/2 lg:sticky lg:top-0 lg:h-screen p-6 sm:p-12 lg:p-20 flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1 }}
              className="relative w-full aspect-[4/5] overflow-hidden rounded-md border border-white/5 bg-white/[0.01]"
            >
              <Image 
                src={HERO_BOTTLE_CINEMATIC}
                alt="NOIR ÔMBRE detail"
                fill
                className="object-cover"
                style={{ filter: 'brightness(0.6) contrast(1.2)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#050505]/80 via-transparent to-transparent" />
              
              {/* Play Video CTA */}
              <div className="absolute inset-0 flex items-center justify-center">
                <MagneticButton 
                  onClick={() => setVideoOpen(true)}
                  className="flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-xl transition-colors hover:bg-white/10 group"
                >
                  <Play className="h-6 w-6 ml-1 text-white/80 group-hover:text-white transition-colors" />
                </MagneticButton>
              </div>
            </motion.div>
          </div>

          {/* Lado Direito - Scroll Text & Buy Box */}
          <div className="lg:w-1/2 p-6 sm:p-12 lg:p-20 lg:py-32 flex flex-col gap-32">
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl sm:text-5xl leading-snug mb-8" style={{ fontFamily: 'var(--font-nox-serif)' }}>
                Criado para desaparecer na escuridão e ser lembrado até o amanhecer.
              </h3>
              <p className="text-[15px] text-white/60 leading-relaxed mb-10 max-w-md font-light">
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
                    <div className="flex gap-4 items-start group">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/5 bg-white/[0.03] text-white/50 group-hover:bg-white/10 group-hover:text-white transition-all">
                        <note.icon className="h-4 w-4" />
                      </span>
                      <div>
                        <h4 className="text-xs uppercase tracking-widest text-white/80 mb-1">{note.label}</h4>
                        <p className="text-[13px] text-white/50 font-light">{note.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </motion.div>

            {/* ─── 3. MICRO-INTERAÇÕES DE LUXO (Glassmorphism Cart) ─── */}
            <ScrollReveal>
              <div className="relative rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-3xl shadow-[0_30px_80px_-20px_rgba(0,0,0,1)] lg:mt-20">
                <div className="absolute -top-px left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                <h4 className="text-3xl mb-2" style={{ fontFamily: 'var(--font-nox-serif)' }}>NOIR ÔMBRE</h4>
                <p className="text-xs text-white/50 tracking-widest uppercase mb-10">Parfum • 100ml / 3.4 oz</p>
                
                <div className="flex items-end justify-between mb-8 border-b border-white/10 pb-8">
                  <span className="text-4xl font-light tracking-tight text-white">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(PRICE)}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-white/40">Frete Cortesia Mundial</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  {/* Qty Control */}
                  <div className="flex h-14 w-full sm:w-32 items-center justify-between rounded-full border border-white/10 bg-white/[0.03] px-4 shrink-0">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-white/50 hover:text-white p-2 transition-colors"><Minus className="h-4 w-4"/></button>
                    <span className="text-sm font-medium">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="text-white/50 hover:text-white p-2 transition-colors"><Plus className="h-4 w-4"/></button>
                  </div>
                  
                  {/* Magnetic CTA */}
                  <MagneticButton 
                    onClick={handleAddToCart}
                    className={`flex-1 flex items-center justify-center gap-2 rounded-full h-14 text-xs font-semibold uppercase tracking-widest transition-colors ${
                      added ? 'bg-white/10 border border-white/20 text-white' : 'bg-[#EFEFEF] text-[#050505]'
                    }`}
                  >
                    {added ? 'Adicionado à Sacola' : 'Adicionar à Sacola'}
                  </MagneticButton>
                </div>

                <p className="text-[10px] text-center text-white/30 uppercase tracking-widest mt-6 font-light">
                  Edição numerada. 500 frascos disponíveis.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── 4. FOOTER DE LUXO (NOX PARIS) ─── */}
      <footer className="relative w-full bg-[#050505] pt-32 pb-12 px-6 sm:px-12 border-t border-white/5 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
            
            <div className="lg:col-span-1">
              <h4 className="text-2xl mb-6" style={{ fontFamily: 'var(--font-nox-serif)' }}>NOX</h4>
              <p className="text-xs text-white/50 leading-loose max-w-xs font-light">
                Maison de Haute Parfumerie.
                <br />Criado em Paris, destilado em Grasse.
              </p>
            </div>

            <div>
              <h5 className="text-[9px] tracking-[0.2em] uppercase text-white/40 mb-6">Coleções</h5>
              <ul className="space-y-4 text-[13px] text-white/70 font-light">
                <li><Link href="#" className="hover:text-white transition-colors">Extrait de Parfum</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Velas Botânicas</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Cuidados Corporais</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Edições Limitadas</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="text-[9px] tracking-[0.2em] uppercase text-white/40 mb-6">A Maison</h5>
              <ul className="space-y-4 text-[13px] text-white/70 font-light">
                <li><Link href="#" className="hover:text-white transition-colors">Nossa História</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Os Perfumistas</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">O Manifesto</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Boutiques</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="text-[9px] tracking-[0.2em] uppercase text-white/40 mb-6">Serviços Privados</h5>
              <ul className="space-y-4 text-[13px] text-white/70 font-light">
                <li><Link href="#" className="hover:text-white transition-colors">Concierge</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Agendar Degustação Olfativa</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Presentes Corporativos</Link></li>
              </ul>
            </div>
            
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-8 text-[10px] tracking-widest text-white/40 uppercase">
            <p>© {new Date().getFullYear()} NOX PARIS. Todos os direitos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-white transition-colors">Termos</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacidade</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── Video Modal ─── */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#050505]/90 backdrop-blur-xl"
          >
            <button 
              onClick={() => setVideoOpen(false)}
              className="absolute top-8 right-8 text-white/50 hover:text-white text-[10px] uppercase tracking-widest transition-colors z-[61]"
            >
              Fechar ✕
            </button>
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="relative w-[90%] max-w-5xl aspect-video bg-[#050505] rounded-xl overflow-hidden border border-white/5 flex items-center justify-center shadow-2xl"
            >
              <video 
                src="/videos/ardosia-hero-placeholder.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: 'grayscale(100%) contrast(1.2)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-80" />
              
              <div className="relative z-10 text-center pointer-events-none">
                <h3 className="text-3xl md:text-5xl mb-4 text-white" style={{ fontFamily: 'var(--font-nox-serif)' }}>O Silêncio Tem Uma Assinatura</h3>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">Curta-metragem • NOX Paris</p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 mx-auto flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-[10px] uppercase tracking-widest text-white backdrop-blur-md hover:bg-white/20 transition-colors"
                >
                  <Play className="h-4 w-4" /> Reproduzir Filme
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Slide-in Cart Panel (Premium Glassmorphism) ─── */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-50 bg-[#050505]/80 backdrop-blur-md cursor-pointer"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[440px] border-l border-white/10 bg-black/60 backdrop-blur-3xl shadow-2xl p-6 sm:p-8 flex flex-col"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-8">
                <h2 className="text-xs uppercase tracking-widest text-white/70">Sua Sacola</h2>
                <button onClick={() => setCartOpen(false)} className="text-white/50 hover:text-white text-[10px] uppercase tracking-widest transition-colors">
                  Fechar ✕
                </button>
              </div>
              
              <div className="flex-1 overflow-auto">
                <div className="flex gap-6">
                  <div className="relative w-24 h-32 rounded-md bg-black border border-white/5 flex items-center justify-center overflow-hidden">
                    <Image src={HERO_BOTTLE_CINEMATIC} alt="Frasco NOIR ÔMBRE" fill className="object-cover opacity-80" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="text-xl text-white" style={{ fontFamily: 'var(--font-nox-serif)' }}>NOIR ÔMBRE</h3>
                      <p className="text-[10px] text-white/50 uppercase tracking-widest mt-2">100ml / 3.4 oz</p>
                    </div>
                    <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-4">
                      <span className="text-xs text-white/70 tracking-widest">QTD: {quantity}</span>
                      <span className="text-sm font-medium text-white">
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
                  <span className="text-white">Cortesia</span>
                </div>
                <div className="flex justify-between text-xl font-light mb-8 pt-6 border-t border-white/10 text-white">
                  <span style={{ fontFamily: 'var(--font-nox-serif)' }}>Total</span>
                  <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(PRICE * quantity)}</span>
                </div>
                
                <MagneticButton className="w-full bg-[#EFEFEF] text-[#050505] h-16 rounded-full text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2">
                  Finalizar Pedido <ArrowRight className="w-4 h-4" />
                </MagneticButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Back Button */}
      <Link
        href="/"
        className="fixed bottom-6 left-6 z-40 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-[11px] font-medium uppercase tracking-widest text-white backdrop-blur-xl transition-colors hover:bg-white hover:text-black"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Link>
    </main>
  );
}
