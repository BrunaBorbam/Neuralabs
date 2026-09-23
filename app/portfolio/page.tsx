'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/Badge';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { CerneScene3D } from '@/components/CerneScene3D';

// ============================================================================
// SHOWCASE 1: VILLA SERENA (LIQUID GLASS)
// ============================================================================
const ShowcaseVillaSerena = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <motion.section
      ref={ref}
      className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden mb-32"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      {/* Imagem de Fundo (Simulando Immersive 3D/Video) */}
      <div className="absolute inset-0 bg-[url('/images/hero-studio/airbnb.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-[#0A0A0A]/60" />

      {/* Conteúdo com Parallax */}
      <motion.div style={{ y }} className="relative z-10 w-full max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-12">
        <motion.div
          className="text-left text-amber-50"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.1 }}
        >
          <p className="text-amber-300 tracking-[0.3em] text-xs font-bold mb-4 uppercase">Arquétipo: Cinematic Full-Bleed</p>
          <h3 className="text-5xl md:text-7xl font-black mb-6" style={{ fontFamily: 'Bodoni Moda, serif' }}>Villa Serena</h3>
          <p className="max-w-md text-amber-100/70 text-lg">Hospitalidade reimaginada. Usamos profundidade imersiva para vender o destino antes da reserva.</p>
        </motion.div>

        {/* Liquid Glass Card */}
        <motion.a
          href="/demo/airbnb"
          whileHover={{ scale: 1.05, y: -8 }}
          whileTap={{ scale: 0.98 }}
          className="relative p-8 rounded-3xl w-full max-w-sm backdrop-blur-3xl bg-white/5 border border-white/20 shadow-2xl overflow-hidden group perspective-1000 cursor-pointer"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.5 }}
          />
          <h4 className="text-2xl text-white font-bold mb-8">Refúgio Exclusivo</h4>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Reserva Direta</p>
              <p className="text-3xl text-amber-300 font-bold">R$ 1.250</p>
            </div>
            <motion.div
              className="bg-amber-100 hover:bg-white text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              Visualizar
            </motion.div>
          </div>
        </motion.a>
      </motion.div>
    </motion.section>
  );
};

// ============================================================================
// SHOWCASE 2: CERNE (EDITORIAL & SPRING PHYSICS)
// ============================================================================
const ShowcaseCerne = () => {
  return (
    <motion.section
      className="relative w-full min-h-[80vh] flex flex-col md:flex-row bg-[#E8E6E1] mb-32 border-y border-[#576141]/20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.1 }}
      >
        <p className="text-[#576141] tracking-[0.3em] text-xs font-bold mb-6 uppercase">Arquétipo: Editorial Split</p>
        <h3 className="text-5xl md:text-8xl font-black text-[#2C3322] leading-[0.9] mb-8" style={{ fontFamily: 'Fraunces, serif' }}>CERNE<br/>Studio</h3>
        <p className="text-[#576141] text-lg max-w-md mb-12">Marcenaria de luxo exige apresentação escultural. Dividimos a tela para balancear storytelling editorial com produto técnico.</p>
        <motion.a
          href="/demo/marcenaria"
          className="w-fit text-sm uppercase tracking-widest font-bold text-[#2C3322] border-b-2 border-[#2C3322] pb-2 cursor-pointer"
          whileHover={{ scale: 1.05, x: 4 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          Ver Catálogo
        </motion.a>
      </motion.div>

      <motion.div
        className="w-full md:w-1/2 bg-[#3B432E] relative min-h-[50vh] flex items-center justify-center overflow-hidden cursor-crosshair"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.2 }}
      >
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.15 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        >
          <CerneScene3D />
        </motion.div>
        <div className="absolute bottom-8 right-8 text-right pointer-events-none">
          <p className="text-[10px] text-[#9CAE7A] font-mono tracking-widest uppercase">Objeto Técnico</p>
          <p className="text-sm text-[#E8E6E1] font-mono">Mod. 04 / OAK Wireframe</p>
        </div>
      </motion.div>
    </motion.section>
  );
};

// ============================================================================
// SHOWCASE 3: ARDÓSIA (SCROLL DRIVEN)
// ============================================================================
const ShowcaseArdosia = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const yOffset = useTransform(scrollYProgress, [0, 1], [150, 0]);

  return (
    <motion.section
      ref={ref}
      className="relative w-full h-[90vh] bg-[#1A1A1A] flex items-center justify-center overflow-hidden mb-32"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <motion.svg
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M-10,50 Q40,0 110,60"
          stroke="#C84B31"
          strokeWidth="15"
          fill="none"
          style={{ pathLength }}
        />
      </motion.svg>

      <motion.div style={{ y: yOffset }} className="relative z-10 w-full max-w-5xl px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.1 }}
        >
          <h3 className="text-6xl md:text-8xl text-[#E8DCC4] mb-2 leading-[0.8]" style={{ fontFamily: 'Instrument Serif, serif' }}>Ardósia</h3>
          <h3 className="text-5xl md:text-7xl text-[#C84B31] italic ml-12 leading-[0.8] mb-8" style={{ fontFamily: 'Instrument Serif, serif' }}>Fogo & Brasa.</h3>
          <p className="text-[#E8DCC4]/60 text-lg max-w-sm">Colagem assimétrica e fontes provocativas. Criamos um caos visual organizado para despertar desejo e fome instintiva.</p>
        </motion.div>
        <motion.a
          href="/demo/gastronomia"
          className="relative aspect-[3/4] md:rotate-3 hover:rotate-0 border border-[#C84B31]/30 cursor-pointer overflow-hidden group"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.2 }}
          whileHover={{ rotate: 0 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="absolute inset-0 bg-[url('/images/hero-studio/gastronomia.jpg')] bg-cover bg-center opacity-70 group-hover:opacity-100"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          />
        </motion.a>
      </motion.div>
    </motion.section>
  );
};

// ============================================================================
// SHOWCASE 4: E-COMMERCE (BRUTALISTA & REATIVO)
// ============================================================================
const ShowcaseEcommerce = () => {
  return (
    <motion.section
      className="relative w-full bg-[#F4F4F0] border-y-8 border-black mb-32"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      {/* Marquee Superior */}
      <div className="w-full bg-black py-4 overflow-hidden flex whitespace-nowrap border-b-4 border-black">
        <motion.div
          className="text-white font-black text-2xl uppercase tracking-widest"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          &bull; REDUCE FRICTION &bull; MAXIMIZE LTV &bull; NEUROMARKETING APPLIED TO CHECKOUT &bull; REDUCE FRICTION &bull; MAXIMIZE LTV &bull;
        </motion.div>
      </div>

      <div className="w-full grid md:grid-cols-2">
        <motion.div
          className="p-12 md:p-24 border-b-4 md:border-b-0 md:border-r-4 border-black bg-[#FF3B00] flex flex-col justify-center"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.1 }}
        >
          <p className="text-black font-bold uppercase tracking-widest mb-4">Arquétipo: Grid Brutalista</p>
          <h3 className="text-6xl md:text-8xl text-black font-black uppercase leading-none tracking-tighter mb-8">E-Com<br/>Xtreme</h3>
          <p className="text-black text-xl font-bold max-w-sm">Desenhado para vender sem distrações. Menos firula, mais bloco sólido e botões óbvios.</p>
        </motion.div>

        <motion.a
          href="/demo/nox-paris"
          className="flex flex-col relative group cursor-pointer"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="flex-1 bg-white relative overflow-hidden flex items-center justify-center p-12"
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
             <motion.div
              className="absolute inset-0 bg-[url('/images/hero-studio/ecommerce.jpg')] bg-cover bg-center grayscale group-hover:grayscale-0"
              whileHover={{ scale: 1.1, filter: "grayscale(0%)" }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            />
          </motion.div>
          <motion.div
            className="p-8 border-t-4 border-black bg-[#D4FF00] flex justify-between items-center group-hover:bg-black group-hover:text-[#D4FF00]"
            whileHover={{ backgroundColor: '#000000', color: '#D4FF00' }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div>
              <p className="font-bold uppercase tracking-widest text-xs">Produto</p>
              <p className="font-black text-4xl tracking-tighter">$249</p>
            </div>
            <motion.p
              className="font-black text-2xl uppercase border-2 border-current px-6 py-3 rounded-full"
              whileHover={{ scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              Ver
            </motion.p>
          </motion.div>
        </motion.a>
      </div>
    </motion.section>
  );
};


export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-obsidian-900 text-pearl-200 pt-32 pb-24 flex flex-col items-center">
        
        {/* HEADER DA PÁGINA */}
        <motion.div
          className="max-w-4xl mx-auto text-center px-6 w-full mb-32"
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
            className="text-lg text-pearl-300/70 max-w-2xl mx-auto"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } }
            }}
          >
            Nós não usamos templates. Utilizamos "Arquétipos de Decisão" — estruturas validadas pela neurociência para dominar o mercado High-Ticket. Role a página e interaja com nossas fundações.
          </motion.p>
        </motion.div>

        {/* GALERIA DOS 4 ARQUÉTIPOS */}
        <div className="w-full flex flex-col">
          <ShowcaseVillaSerena />
          <ShowcaseCerne />
          <ShowcaseArdosia />
          <ShowcaseEcommerce />
        </div>

        {/* CTA FINAL */}
        <motion.div
          className="px-6 w-full max-w-4xl mx-auto text-center mt-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.2 }}
        >
          <motion.div
            className="p-12 border border-pearl-100/10 rounded-2xl bg-obsidian-800/50 backdrop-blur-sm"
            whileHover={{
              borderColor: 'rgba(217, 178, 65, 0.3)',
              boxShadow: '0 0 40px rgba(217, 178, 65, 0.1)'
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <motion.h3
              className="text-3xl font-serif font-black text-pearl-100 mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 30 }}
            >
              Pronto para aplicar a ciência no seu negócio?
            </motion.h3>
            <motion.p
              className="text-pearl-300/60 mb-8 max-w-lg mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 30 }}
            >
              Seu novo site será desenhado a partir da psicologia do seu cliente ideal.
            </motion.p>
            <motion.a
              href={getWhatsAppLink('Olá, vim pela página do Laboratório e quero conversar sobre o arquétipo ideal para o meu site.')}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-8 py-4 rounded-full bg-gold-500 text-obsidian-900 font-bold"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              Iniciar meu projeto
            </motion.a>
          </motion.div>
        </motion.div>

      </main>
      <Footer />
    </>
  );
}
