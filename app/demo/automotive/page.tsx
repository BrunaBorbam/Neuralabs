'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight, Zap, Battery, ShieldCheck } from 'lucide-react';
import { Plus_Jakarta_Sans } from 'next/font/google';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
});

function TextReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(' ');
  return (
    <span className="inline-block">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: '100%' }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.05,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function AutomotiveDemo() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Framer Motion Scroll Setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Hero Parallax Effects
  const carScale = useTransform(smoothProgress, [0, 0.3], [1.1, 1]);
  const carY = useTransform(smoothProgress, [0, 0.3], ['0%', '20%']);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const heroTextY = useTransform(smoothProgress, [0, 0.2], ['0%', '-50%']);

  // Tech Specs Section Effects
  const specsY = useTransform(smoothProgress, [0.2, 0.5], ['20%', '0%']);
  const specsOpacity = useTransform(smoothProgress, [0.2, 0.4], [0, 1]);

  if (!mounted) return null;

  return (
    <main
      ref={containerRef}
      className={`relative min-h-[200vh] w-full bg-[#080808] text-[#F5F5F5] selection:bg-[#F5F5F5] selection:text-[#080808] ${sans.variable} font-sans`}
    >
      {/* Attribution Bar */}
      <div className="fixed top-0 z-50 flex w-full items-center justify-between gap-4 border-b border-white/10 bg-black/50 px-5 py-3 text-[10px] tracking-[0.2em] text-white/50 uppercase backdrop-blur-lg">
        <span>
          <span className="text-blue-500">✦</span> AETHER MOTORS BY{' '}
          <span className="text-white">NEURALABS</span>
        </span>
        <Link href="/" className="hover:text-white transition-colors">
          Sair
        </Link>
      </div>

      {/* Header */}
      <header className="fixed top-12 z-40 w-full px-6 py-4 flex justify-between items-center pointer-events-none mix-blend-difference">
        <div className="pointer-events-auto">
          <span className="text-2xl font-bold tracking-[0.3em] uppercase">
            AETHER
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="pointer-events-auto rounded-full bg-white px-6 py-2 text-xs font-semibold text-black tracking-widest uppercase hover:bg-gray-200 transition-colors"
        >
          Pre-Order
        </motion.button>
      </header>

      {/* 1. HERO SECTION (SCROLL-DRIVEN 3D FEEL) */}
      <section className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Car Image with Scale & Y Parallax */}
        <motion.div
          className="absolute inset-0 z-0 h-[110%] w-[110%] -left-[5%] -top-[5%]"
          style={{ scale: carScale, y: carY }}
        >
          <Image
            src="/images/automotive/hero-car.jpg"
            alt="AETHER Hypercar"
            fill
            className="object-cover"
            priority
          />
          {/* Overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/50 via-transparent to-transparent" />
        </motion.div>

        {/* Hero Typography */}
        <motion.div
          className="relative z-10 flex flex-col items-center mt-32 mix-blend-screen"
          style={{ y: heroTextY, opacity: heroOpacity }}
        >
          <h1 className="text-[12vw] font-bold leading-none tracking-tighter uppercase">
            <TextReveal text="AETHER V1" />
          </h1>
          <p className="mt-2 text-sm sm:text-base tracking-[0.4em] text-blue-400 uppercase font-medium">
            <TextReveal text="A Era da Eletricidade Pura" delay={0.5} />
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 z-10 flex flex-col items-center gap-2"
          style={{ opacity: heroOpacity }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">
            Descubra
          </span>
          <div className="h-12 w-px bg-gradient-to-b from-blue-500 to-transparent" />
        </motion.div>
      </section>

      {/* 2. TECH SPECS (BENTO GRID GLASSMORPHISM) */}
      <section className="relative z-20 bg-[#080808] w-full min-h-screen px-6 py-32 flex flex-col items-center">
        <motion.div
          style={{ y: specsY, opacity: specsOpacity }}
          className="max-w-6xl w-full"
        >
          <div className="mb-20 text-center">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
              <TextReveal text="Engenharia do Futuro." />
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-sm sm:text-base">
              Desenvolvido em túneis de vento aeroespaciais. Cada curva corta o ar,
              cada milímetro de fibra de carbono reduz o peso. O AETHER não é
              apenas um carro, é um manifesto da física.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Spec 1 */}
            <div className="group relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/5 p-8 backdrop-blur-sm transition-colors hover:bg-white/[0.05]">
              <Zap className="h-8 w-8 text-blue-500 mb-6" />
              <div className="text-4xl font-bold mb-2 tracking-tighter">
                1.9<span className="text-xl text-white/50 ml-1">s</span>
              </div>
              <div className="text-xs uppercase tracking-widest text-white/50">
                0 a 100 km/h
              </div>
            </div>

            {/* Spec 2 */}
            <div className="group relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/5 p-8 backdrop-blur-sm transition-colors hover:bg-white/[0.05]">
              <Battery className="h-8 w-8 text-blue-500 mb-6" />
              <div className="text-4xl font-bold mb-2 tracking-tighter">
                850<span className="text-xl text-white/50 ml-1">km</span>
              </div>
              <div className="text-xs uppercase tracking-widest text-white/50">
                Autonomia WLTP
              </div>
            </div>

            {/* Spec 3 */}
            <div className="group relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/5 p-8 backdrop-blur-sm transition-colors hover:bg-white/[0.05]">
              <ShieldCheck className="h-8 w-8 text-blue-500 mb-6" />
              <div className="text-4xl font-bold mb-2 tracking-tighter">
                1950<span className="text-xl text-white/50 ml-1">cv</span>
              </div>
              <div className="text-xs uppercase tracking-widest text-white/50">
                Potência Combinada
              </div>
            </div>

            {/* Large Bento Box */}
            <div className="md:col-span-3 relative overflow-hidden rounded-3xl bg-white/[0.02] border border-white/5 p-12 mt-6 flex flex-col md:flex-row items-center justify-between group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="relative z-10 max-w-lg mb-8 md:mb-0">
                <h3 className="text-2xl font-bold mb-4">Chassi Monocoque</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Construído inteiramente em fibra de carbono de grau balístico,
                  garantindo rigidez torcional extrema e segurança inigualável. O
                  centro de gravidade mais baixo da categoria.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 flex items-center justify-center gap-3 rounded-full bg-blue-600 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white hover:bg-blue-500 transition-colors"
              >
                Configurar o seu <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Floating Back Button */}
      <Link
        href="/"
        className="fixed bottom-6 left-6 z-40 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-3 text-[11px] font-medium uppercase tracking-widest text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Link>
    </main>
  );
}
