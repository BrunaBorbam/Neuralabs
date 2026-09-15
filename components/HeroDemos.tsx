'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CerneScene3D } from './CerneScene3D';

// ============================================================================
// DEMO 1: VILLA SERENA (Airbnb / Hospitalidade)
// Arquétipo B: Cinematic Full-Bleed
// ============================================================================
export const DemoVillaSerena = () => {
  return (
    <div className="relative w-full h-full bg-slate-900 overflow-hidden font-serif">
      {/* Background (simulando um vídeo/foto full-bleed) */}
      <div 
        className="absolute inset-0 bg-[url('/images/hero-studio/airbnb.jpg')] bg-cover bg-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent" />
      
      {/* Efeito: Ripple (simulado com círculos animados sintonizados ao "Pôr do sol dourado") */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-amber-500/20"
        animate={{ scale: [1, 2], opacity: [0.5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-amber-400/30"
        animate={{ scale: [1, 3], opacity: [0.8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: 1 }}
      />

      {/* Conteúdo Imersivo */}
      <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center">
        <h2 className="text-3xl md:text-5xl text-amber-50 font-black mb-2 tracking-wide" style={{ fontFamily: 'Bodoni Moda, serif' }}>
          Oásis Urbano
        </h2>
        <p className="text-amber-100/70 text-xs tracking-[0.2em] uppercase mb-8 font-sans">
          Descubra o Refúgio
        </p>
        
        {/* Card de Vidro Flutuante */}
        <div className="w-full max-w-sm rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-4 flex justify-between items-center">
          <div className="text-left">
            <p className="text-[10px] text-amber-200/60 uppercase tracking-wider font-sans">Valor Diária</p>
            <p className="text-xl font-bold text-white font-sans">R$ 1.250</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="px-6 py-2 bg-amber-600 text-amber-50 text-xs font-bold rounded-full font-sans"
          >
            Reservar
          </motion.button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// DEMO 2: CERNE (Marcenaria)
// Arquétipo A: Editorial Split
// ============================================================================
export const DemoCerne = () => {
  return (
    <div className="relative w-full h-full flex bg-[#E8E6E1] overflow-hidden">
      {/* Esquerda: Editorial Linho */}
      <div className="w-1/2 h-full flex flex-col justify-center p-8 z-10">
        <div className="w-8 h-[2px] bg-[#576141] mb-6" />
        <h2 className="text-3xl md:text-5xl text-[#2C3322] font-black mb-4 leading-none" style={{ fontFamily: 'Fraunces, serif' }}>
          Matéria<br/>Prima
        </h2>
        <p className="text-[#576141] text-xs font-sans max-w-[200px] leading-relaxed">
          Design autoral moldado à mão para ambientes que exigem permanência.
        </p>
        <button className="mt-8 self-start text-[10px] uppercase tracking-widest font-bold text-[#2C3322] border-b border-[#2C3322] pb-1 font-sans">
          Ver Catálogo
        </button>
      </div>

      {/* Direita: Wireframe 3D em fundo Musgo */}
      <div className="w-1/2 h-full bg-[#3B432E] relative flex items-center justify-center">
        {/* A Cadeira 3D! */}
        <div className="absolute inset-0 transform scale-[0.85] md:scale-100">
          <CerneScene3D />
        </div>
        
        {/* Label técnico */}
        <div className="absolute top-4 right-4 text-right">
          <p className="text-[8px] text-[#9CAE7A] font-mono tracking-widest">EST. 1992</p>
          <p className="text-[10px] text-[#E8E6E1] font-mono">MOD. 04 / OAK</p>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// DEMO 3: ARDÓSIA (Gastronomia)
// Arquétipo D: Assimétrico / Colagem (Limpo)
// ============================================================================
export const DemoArdosia = () => {
  return (
    <div className="relative w-full h-full bg-[#26241F] overflow-hidden">
      {/* Fio de Giz contínuo */}
      <motion.svg 
        className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <motion.path 
          d="M10,0 C30,30 0,60 10,100" 
          stroke="#C1552C" 
          strokeWidth="1.5" 
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </motion.svg>

      <div className="absolute inset-0 p-8 flex flex-col justify-center">
        {/* Título gigante limpo */}
        <h2 className="text-4xl md:text-5xl text-[#F3EDE1] mb-1 leading-none" style={{ fontFamily: 'var(--font-ardosia-serif), serif' }}>
          O cardápio muda.
        </h2>
        <h2 className="text-3xl md:text-4xl text-[#D9A441] italic leading-none" style={{ fontFamily: 'var(--font-ardosia-serif), serif' }}>
          O capricho, não.
        </h2>

        {/* Foto reta alinhada */}
        <motion.div 
          className="absolute top-[15%] right-6 w-24 h-32 border-[3px] border-[#F3EDE1] shadow-xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="absolute inset-0 bg-[url('/images/gastronomia/hero-quadro.jpg')] bg-cover bg-center" />
        </motion.div>
        
        {/* Card limpo */}
        <motion.div 
          className="absolute bottom-8 left-8 bg-[#2E2B25] border border-[#F3EDE1]/12 p-3 shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-[8px] uppercase tracking-widest text-[#D9A441] mb-1">Hoje à noite</p>
          <p className="text-lg text-[#F3EDE1] italic leading-none" style={{ fontFamily: 'var(--font-ardosia-serif), serif' }}>
            6 mesas livres
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// ============================================================================
// DEMO 4: E-COMMERCE
// Arquétipo E: Minimal Produto-Led
// ============================================================================
export const DemoEcommerce = () => {
  return (
    <div className="relative w-full h-full bg-[#050505] overflow-hidden flex flex-col">
      {/* Film Grain */}
      <div 
        className="absolute inset-0 opacity-10 mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E")' }}
      />
      
      {/* Light Beams */}
      <div className="absolute left-[20%] top-[-10%] h-[150%] w-[1px] -rotate-12 bg-gradient-to-b from-transparent via-white/30 to-transparent blur-sm" />
      
      {/* NavBar simples */}
      <div className="absolute top-4 left-4 right-4 flex justify-between text-white/50 text-[8px] uppercase tracking-[0.2em] z-10">
        <span style={{ fontFamily: 'var(--font-nox-serif), serif' }} className="text-white text-[10px]">L'Obscur</span>
        <span>Cart (1)</span>
      </div>

      {/* Hero Bottle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="relative w-28 h-40 z-10"
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute inset-0 bg-[url('/images/verticals/ecommerce.jpg')] bg-contain bg-no-repeat bg-center drop-shadow-[0_20px_40px_rgba(255,255,255,0.1)]" />
        </motion.div>
        {/* Glow */}
        <div className="absolute w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      </div>

      <div className="absolute bottom-6 w-full text-center z-10">
        <h2 className="text-2xl text-white font-light tracking-widest mb-1" style={{ fontFamily: 'var(--font-nox-serif), serif' }}>
          Extrait de Nuit
        </h2>
        <p className="text-[7px] text-white/50 uppercase tracking-[0.3em]">A essência do silêncio</p>
      </div>
    </div>
  );
};
