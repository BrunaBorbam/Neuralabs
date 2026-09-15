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
// Arquétipo D: Assimétrico / Colagem
// ============================================================================
export const DemoArdosia = () => {
  return (
    <div className="relative w-full h-full bg-[#1A1A1A] overflow-hidden">
      {/* Efeito: Brush Stroke SVG revelando */}
      <motion.svg 
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <motion.path 
          d="M0,50 Q25,30 50,50 T100,50" 
          stroke="#C84B31" 
          strokeWidth="20" 
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </motion.svg>

      <div className="absolute inset-0 p-8">
        {/* Título gigante assimétrico */}
        <h2 className="text-5xl md:text-7xl text-[#E8DCC4] mb-2 leading-[0.8]" style={{ fontFamily: 'Instrument Serif, serif' }}>
          Sabor
        </h2>
        <h2 className="text-4xl md:text-5xl text-[#C84B31] italic ml-12 leading-[0.8]" style={{ fontFamily: 'Instrument Serif, serif' }}>
          Bruto.
        </h2>

        {/* Colagem de imagens */}
        <motion.div 
          className="absolute top-1/3 right-8 w-32 h-40 bg-zinc-800 rounded-sm shadow-xl overflow-hidden rotate-6 border border-zinc-700/50"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="absolute inset-0 bg-[url('/images/hero-studio/gastronomia.jpg')] bg-cover bg-center opacity-80" />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-6 left-12 w-24 h-24 bg-[#E0A96D] rounded-full shadow-lg flex items-center justify-center border-4 border-[#1A1A1A] z-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: 'spring' }}
        >
          <span className="text-[10px] font-bold text-[#1A1A1A] uppercase tracking-widest text-center leading-tight">
            Menu<br/>Auth
          </span>
        </motion.div>

        {/* Textos pequenos font-sans */}
        <p className="absolute bottom-8 right-8 max-w-[120px] text-[9px] text-[#E8DCC4]/60 text-right font-sans" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Fogo, fumaça e ingredientes ancestrais.
        </p>
      </div>
    </div>
  );
};

// ============================================================================
// DEMO 4: E-COMMERCE
// Arquétipo C: Grid Brutalista
// ============================================================================
export const DemoEcommerce = () => {
  return (
    <div className="relative w-full h-full bg-[#F4F4F0] overflow-hidden flex flex-col border-[6px] border-black">
      {/* Marquee Superior Brutalista */}
      <div className="w-full bg-black text-[#F4F4F0] py-1 overflow-hidden whitespace-nowrap flex items-center border-b-[4px] border-black">
        <motion.div 
          className="text-[10px] font-black uppercase tracking-widest"
          animate={{ x: [0, -500] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        >
          FREE SHIPPING ON ALL ORDERS &bull; 24H DELIVERY &bull; FREE SHIPPING ON ALL ORDERS &bull; 24H DELIVERY
        </motion.div>
      </div>

      <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-0 relative">
        {/* Célula 1: Título Gigante */}
        <div className="col-span-2 row-span-1 border-b-[4px] border-black bg-[#FF3B00] flex flex-col items-center justify-center p-4">
          <h2 className="text-4xl md:text-6xl font-black text-black tracking-tighter uppercase leading-none">
            New Drop
          </h2>
          <span className="text-black font-bold text-xs border-2 border-black rounded-full px-3 py-1 mt-2 bg-[#F4F4F0]">
            VOL. 04
          </span>
        </div>

        {/* Célula 2: Imagem do Produto (Preto e Branco alto contraste) */}
        <div className="border-r-[4px] border-black bg-white flex items-center justify-center overflow-hidden group">
          <motion.div 
            className="w-full h-full bg-[url('/images/hero-studio/ecommerce.jpg')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500"
            whileHover={{ scale: 1.1 }}
          />
        </div>

        {/* Célula 3: Preço e CTA Brutalista */}
        <div className="bg-[#D4FF00] flex flex-col items-center justify-center p-4">
          <p className="text-[10px] uppercase font-bold text-black mb-1">Sneaker X</p>
          <p className="text-3xl font-black text-black mb-3 tracking-tighter">$249</p>
          <button className="w-full py-2 bg-black text-white text-xs font-bold uppercase hover:bg-white hover:text-black hover:border-black border-2 border-black transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
