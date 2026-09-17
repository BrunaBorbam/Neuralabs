'use client';

/**
 * NOX — E-commerce de Fragrância de Luxo
 * Demonstração Interativa • NEURALABS Studio
 *
 * Arquétipo: E. Minimal Produto-Led (Evoluído para Cinematic Full-Bleed)
 * Identidade: "Quiet Luxury Escuro". Fundo cinematográfico, luz volumétrica.
 * Tipografia: Bodoni Moda (editorial/luxo) + Plus Jakarta
 */

import { useEffect, useState, useRef, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { Bodoni_Moda, Plus_Jakarta_Sans } from 'next/font/google';
import { ArrowLeft, ShoppingBag, Droplets, Wind, Leaf, Plus, Minus, ArrowRight, Play } from 'lucide-react';
import { ScrollReveal } from '@/components/HeroAnimations';
import CustomCursor from '@/components/CustomCursor';

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

const HERO_BOTTLE_CINEMATIC = '/images/ecommerce/hero-perfume-branded.jpg';
const PARALLAX_BOTTLE = '/images/nox/hero-bottle-black.jpg';
const PARALLAX_BERGAMOT = '/images/nox/ingredient-bergamot.jpg';
const PARALLAX_PEPPER = '/images/nox/ingredient-pepper.jpg';
const PARALLAX_AMBER = '/images/nox/ingredient-amber.jpg';

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

/** Cinematic Abstract Video Effect (CSS/Framer Motion) */
function CinematicSmoke() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050505]">
      {/* Deep Shadow Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#020202] via-[#050505] to-[#0a0a0a]" />

      {/* Smoke Orb 1 */}
      <motion.div
        animate={{ 
          x: ['-10%', '10%', '-10%'], 
          y: ['-20%', '10%', '-20%'],
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-[20%] -left-[10%] w-[80%] h-[120%] bg-white/5 rounded-[100%] blur-[120px] mix-blend-screen"
      />
      
      {/* Smoke Orb 2 */}
      <motion.div
        animate={{ 
          x: ['10%', '-20%', '10%'], 
          y: ['10%', '-10%', '10%'],
          scale: [1.2, 0.9, 1.2],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[10%] -right-[20%] w-[90%] h-[110%] bg-white/[0.03] rounded-[100%] blur-[140px] mix-blend-screen"
      />

      {/* Volumetric Light Beam */}
      <motion.div
        animate={{ 
          rotate: [-5, 5, -5],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-[50%] left-[20%] w-[40%] h-[200%] bg-gradient-to-b from-white/10 to-transparent blur-[80px] transform -rotate-12 origin-top"
      />

      {/* Film Grain Noise */}
      <div 
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />
    </div>
  );
}

export default function EcommerceDemo() {
  const [mounted, setMounted] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  // ─── EFEITOS INTERATIVOS DO HERO (Spotlight & 3D Tilt) ───
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  useEffect(() => {
    setMounted(true);
    
    // Otimização Mobile (Giroscópio para Tilt 3D)
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;
      
      // Normalize values. 
      // beta (front/back): natural hold is ~45deg. Range 20 to 70 mapped to 0-1
      // gamma (left/right): range -30 to 30 mapped to 0-1
      const normalizedY = Math.max(0, Math.min(1, (e.beta - 20) / 50));
      const normalizedX = Math.max(0, Math.min(1, (e.gamma + 30) / 60));
      
      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [mouseX, mouseY]);

  const PRICE = 1850;

  // Parallax SOTD Setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left) / width);
    mouseY.set((clientY - top) / height);
  };

  const handleHeroMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const springConfig = { stiffness: 100, damping: 30, mass: 0.5 };
  
  // Rotação suave (Tilt 3D)
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [3, -3]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-3, 3]), springConfig);
  
  // Posição do Spotlight em porcentagem
  const spotlightX = useSpring(useTransform(mouseX, [0, 1], ['0%', '100%']), springConfig);
  const spotlightY = useSpring(useTransform(mouseY, [0, 1], ['0%', '100%']), springConfig);
  
  // Parallax reverso para a tipografia gigante
  const textRotateX = useSpring(useTransform(mouseY, [0, 1], [-5, 5]), springConfig);
  const textRotateY = useSpring(useTransform(mouseX, [0, 1], [5, -5]), springConfig);

  // Hero Deep Zoom & Fade
  const heroScale = useTransform(smoothProgress, [0, 0.4], [1, 1.4]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  const heroTextY = useTransform(smoothProgress, [0, 0.3], ['0%', '-60%']);
  const heroBlur = useTransform(smoothProgress, [0, 0.4], ['blur(0px)', 'blur(20px)']);

  // Parallax SOTD - Frasco
  const bottleScale = useTransform(smoothProgress, [0, 0.4], [1.1, 0.85]);
  const bottleRotateY = useTransform(smoothProgress, [0, 0.4], [0, -10]);

  const handleAddToCart = () => {
    setAdded(true);
    setCartOpen(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Horizontal Scroll Setup (Storytelling)
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: horizontalProgress } = useScroll({
    target: horizontalScrollRef,
  });
  const horizontalX = useTransform(horizontalProgress, [0, 1], ["10%", "-65%"]);

  return (
    <main
      ref={containerRef}
      className={`relative w-full bg-[#050505] text-[#EFEFEF] ${serif.variable} ${sans.variable} selection:bg-[#EFEFEF] selection:text-[#050505]`}
      style={{ fontFamily: 'var(--font-nox-sans)' }}
    >
      <CustomCursor />
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

      {/* ─── 1. HERO 100% IMERSIVO (SOTD DEEP PARALLAX + EFEITOS INTERATIVOS) ─── */}
      <section 
        className="relative h-[120vh] w-full flex flex-col items-center justify-center"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        style={{ perspective: 1200 }}
      >
        {/* Fundo Parallax (Imagem Cinematográfica) - Fixa durante o scroll e dá zoom */}
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          
          {/* Spotlight Interativo que segue o mouse */}
          <motion.div 
            className="pointer-events-none absolute inset-0 z-[1] opacity-50 mix-blend-screen"
            style={{ 
              background: 'radial-gradient(1000px circle at var(--x) var(--y), rgba(255,255,255,0.25), transparent 40%)',
              // @ts-ignore (hack for Framer Motion CSS variables)
              '--x': spotlightX,
              '--y': spotlightY
            }} 
          />

          {/* Background com Tilt e Fumaça */}
          <motion.div 
            className="absolute inset-0 z-0 h-full w-full origin-center"
            style={{ 
              scale: useTransform(smoothProgress, [0, 0.4], [1.05, 1.4]),
              opacity: heroOpacity,
              rotateX, 
              rotateY 
            }}
          >
            <CinematicSmoke />
            
            {/* Parallax Container: Apenas o Frasco */}
            <div className="absolute inset-0 flex items-center justify-center">
              
              {/* Frasco Principal */}
              <motion.div
                className="relative z-10 w-[800px] h-[800px] mix-blend-screen pointer-events-none"
                style={{
                  scale: bottleScale,
                  rotateY: bottleRotateY,
                  filter: 'brightness(1.1) contrast(1.1)'
                }}
              >
                <Image src={PARALLAX_BOTTLE} alt="NOIR ÔMBRE by NOX Paris" fill className="object-contain" priority />
              </motion.div>

            </div>

            {/* Dark Overlay Gradient para leitura de texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80 pointer-events-none" />
          </motion.div>

          {/* Tipografia Gigante Parallax com Efeito Magnético Reverso */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-[1] flex flex-col items-center justify-center mix-blend-overlay"
            style={{ 
              y: heroTextY, 
              opacity: heroOpacity,
              rotateX: textRotateX,
              rotateY: textRotateY
            }}
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
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 lg:sticky lg:top-0 lg:h-screen p-6 sm:p-12 lg:p-20 flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative w-full aspect-[4/5] overflow-hidden rounded-md border border-white/5 bg-white/[0.01]"
              style={{ willChange: 'transform' }}
            >
              <Image 
                src={HERO_BOTTLE_CINEMATIC}
                alt="NOIR ÔMBRE detail"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-[#050505]/40 to-transparent" />
              
              {/* Play Video CTA with Rotating Text Ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex items-center justify-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute w-40 h-40"
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full text-white/30 overflow-visible">
                      <path id="circlePath" d="M 50, 50 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0" fill="none" />
                      <text className="text-[10.5px] uppercase tracking-[0.2em] font-light" fill="currentColor">
                        <textPath href="#circlePath" startOffset="0%">
                          NOX PARIS • EXTRAIT DE PARFUM • NOIR ÔMBRE • 
                        </textPath>
                      </text>
                    </svg>
                  </motion.div>
                  
                  <MagneticButton 
                    onClick={() => setVideoOpen(true)}
                    className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-xl transition-colors hover:bg-white/10 hover:border-white/40 group z-10"
                  >
                    <Play className="h-6 w-6 ml-1 text-white/90 group-hover:text-white transition-colors" />
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 p-6 sm:p-12 lg:p-20 lg:py-32 flex flex-col gap-32">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
              <div className="relative w-full">
                {/* NEW EDITORIAL ASSET: Preenchendo o vazio à esquerda do Cart */}
                <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-[110%] w-[90%] aspect-square rounded-full overflow-hidden border border-white/5 shadow-2xl mix-blend-lighten">
                  <Image 
                    src="/images/ecommerce/ingredients-macro.jpg" 
                    alt="Raw Botanical Ingredients" 
                    fill 
                    className="object-cover opacity-90 scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent" />
                </div>

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
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── NEW: CINEMATIC HORIZONTAL SCROLL (STORYTELLING) ─── */}
      <section ref={horizontalScrollRef} className="relative w-full h-[300vh] bg-[#020202]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
          
          {/* Background Text / Mood */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none whitespace-nowrap">
            <h2 className="text-[15vw]" style={{ fontFamily: 'var(--font-nox-serif)' }}>L'ARTISANAT</h2>
          </div>

          <motion.div 
            className="flex gap-12 px-[10vw] sm:px-[20vw] relative z-10"
            style={{ x: horizontalX }}
          >
            {/* Card 1 */}
            <div className="w-[85vw] sm:w-[60vw] lg:w-[45vw] aspect-[4/3] shrink-0 relative rounded-xl overflow-hidden shadow-2xl group">
              <Image src="/images/ecommerce/story-1.jpg" alt="Colheita em Grasse" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <span className="text-[10px] tracking-widest text-white/50 uppercase mb-3 block">01 / A Colheita</span>
                <h3 className="text-3xl text-white mb-2" style={{ fontFamily: 'var(--font-nox-serif)' }}>Jasmim de Grasse</h3>
                <p className="text-xs text-white/60 font-light leading-relaxed max-w-sm">Colhido artesanalmente nas primeiras horas da madrugada, quando a flor exala seu absoluto máximo de fragrância.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="w-[85vw] sm:w-[60vw] lg:w-[45vw] aspect-[4/3] shrink-0 relative rounded-xl overflow-hidden shadow-2xl group">
              <Image src="/images/ecommerce/story-2.jpg" alt="Extração Botânica" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <span className="text-[10px] tracking-widest text-white/50 uppercase mb-3 block">02 / A Extração</span>
                <h3 className="text-3xl text-white mb-2" style={{ fontFamily: 'var(--font-nox-serif)' }}>Alquimia Pura</h3>
                <p className="text-xs text-white/60 font-light leading-relaxed max-w-sm">Alembic de cobre vintage e destilação a frio garantem que as moléculas mais voláteis e raras sejam preservadas intactas.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="w-[85vw] sm:w-[60vw] lg:w-[45vw] aspect-[4/3] shrink-0 relative rounded-xl overflow-hidden shadow-2xl group">
              <Image src="/images/ecommerce/story-3.jpg" alt="Envasamento" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <span className="text-[10px] tracking-widest text-white/50 uppercase mb-3 block">03 / A Obra</span>
                <h3 className="text-3xl text-white mb-2" style={{ fontFamily: 'var(--font-nox-serif)' }}>Obsidiana Escura</h3>
                <p className="text-xs text-white/60 font-light leading-relaxed max-w-sm">Líquido de ouro envolto em pedra vulcânica, bloqueando espectros de luz e envelhecendo o Extrait como um bom vinho.</p>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* ─── 3. OUTROS PRODUTOS (Preenchendo o Vazio) ─── */}
      <section className="relative w-full bg-[#050505] py-24 px-6 sm:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-3xl sm:text-4xl" style={{ fontFamily: 'var(--font-nox-serif)' }}>Mais da Coleção</h2>
              <p className="text-[11px] uppercase tracking-widest text-white/50 mt-4">Complete o Ritual</p>
            </div>
            <button className="hidden sm:flex text-[10px] uppercase tracking-widest text-white/70 hover:text-white transition-colors items-center gap-2">
              Ver Todos <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Produto 1 */}
            <div className="group cursor-pointer">
              <div className="relative w-full aspect-[4/5] bg-[#050505] border border-white/5 overflow-hidden mb-6 rounded-sm">
                <Image src="/images/ecommerce/vela-real-v4.jpg" alt="Vela Botânica" fill className="object-cover group-hover:scale-105 transition-all duration-700" />
              </div>
              <h3 className="text-xl mb-1" style={{ fontFamily: 'var(--font-nox-serif)' }}>Bougie Noire</h3>
              <p className="text-[10px] uppercase tracking-widest text-white/50 mb-3">Vela Botânica • 250g</p>
              <p className="text-sm font-light text-white">R$ 540</p>
            </div>

            {/* Produto 2 */}
            <div className="group cursor-pointer">
              <div className="relative w-full aspect-[4/5] bg-[#050505] border border-white/5 overflow-hidden mb-6 rounded-sm">
                <Image src="/images/ecommerce/perfume-real-v4.jpg" alt="Extrait 50ml" fill className="object-cover group-hover:scale-105 transition-all duration-700" />
              </div>
              <h3 className="text-xl mb-1" style={{ fontFamily: 'var(--font-nox-serif)' }}>Noir Ômbre</h3>
              <p className="text-[10px] uppercase tracking-widest text-white/50 mb-3">Extrait de Parfum • 50ml</p>
              <p className="text-sm font-light text-white">R$ 1.150</p>
            </div>

            {/* Produto 3 */}
            <div className="group cursor-pointer sm:hidden lg:block">
              <div className="relative w-full aspect-[4/5] bg-[#050505] border border-white/5 overflow-hidden mb-6 rounded-sm">
                <Image src="/images/ecommerce/sabonete-real-v4.jpg" alt="Sabonete Líquido" fill className="object-cover group-hover:scale-105 transition-all duration-700" />
              </div>
              <h3 className="text-xl mb-1" style={{ fontFamily: 'var(--font-nox-serif)' }}>L'Eau Noire</h3>
              <p className="text-[10px] uppercase tracking-widest text-white/50 mb-3">Gel de Banho • 200ml</p>
              <p className="text-sm font-light text-white">R$ 380</p>
            </div>
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
              className="relative w-[90%] max-w-5xl aspect-video bg-[#050505] rounded-xl overflow-hidden border border-white/5 shadow-2xl"
            >
              {/* LOCAL VIDEO PLAYER */}
              <video 
                src="/videos/verticals/ecommerce.mp4"
                autoPlay 
                controls
                className="absolute inset-0 w-full h-full object-cover"
              />
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
