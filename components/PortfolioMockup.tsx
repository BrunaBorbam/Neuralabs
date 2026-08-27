import React from 'react';
import { motion } from 'framer-motion';

export const EcommerceMockup = () => {
  return (
    <motion.div
      className="relative w-full max-w-md mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Browser Frame */}
      <div className="bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800">
        {/* Browser Header */}
        <div className="bg-slate-800 px-6 py-4 flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="text-xs text-slate-400 ml-auto">cosmeticosnatural.com</div>
        </div>

        {/* Website Content */}
        <div className="bg-gradient-to-b from-slate-950 to-slate-900 p-8 aspect-video flex flex-col justify-center items-center text-center">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-4xl">
              ✨
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white mb-3">Sua Pele aos 30</h1>
          <p className="text-slate-300 text-sm mb-6 max-w-xs">Cosméticos 100% naturais com garantia de resultado</p>

          {/* CTA Button */}
          <motion.button
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Comprar Agora
          </motion.button>

          {/* Social Proof */}
          <div className="mt-8 text-xs text-slate-400">
            <p>⭐⭐⭐⭐⭐ 892 clientes satisfeitos</p>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute -top-4 -right-4 w-20 h-20 bg-orange-500/20 rounded-full blur-xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-4 -left-4 w-16 h-16 bg-violet-500/20 rounded-full blur-xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </motion.div>
  );
};

export const SaasMockup = () => {
  return (
    <motion.div
      className="relative w-full max-w-md mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      {/* Browser Frame */}
      <div className="bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800">
        {/* Browser Header */}
        <div className="bg-slate-800 px-6 py-4 flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="text-xs text-slate-400 ml-auto">datavault.app</div>
        </div>

        {/* Website Content */}
        <div className="bg-gradient-to-b from-slate-950 to-slate-900 p-8 aspect-video flex flex-col justify-center items-center text-center">
          <div className="mb-6 grid grid-cols-2 gap-3 w-full">
            <motion.div
              className="bg-gradient-to-br from-blue-500/30 to-cyan-500/30 p-4 rounded-lg"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <p className="text-xs text-slate-300">Revenue</p>
              <p className="text-xl font-bold text-blue-400">R$ 240k</p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-green-500/30 to-emerald-500/30 p-4 rounded-lg"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, delay: 0.3, repeat: Infinity }}
            >
              <p className="text-xs text-slate-300">Growth</p>
              <p className="text-xl font-bold text-green-400">+32%</p>
            </motion.div>
          </div>

          <h1 className="text-2xl font-bold text-white mb-3">Decisões em Minutos</h1>
          <p className="text-slate-300 text-sm mb-6">Análise de dados em tempo real</p>

          {/* CTA Button */}
          <motion.button
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Começar Trial
          </motion.button>

          {/* Badge */}
          <div className="mt-6 inline-block bg-orange-500/20 border border-orange-500/50 px-4 py-2 rounded-full">
            <p className="text-xs text-orange-400 font-bold">500+ empresas usam</p>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-500/20 rounded-full blur-xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </motion.div>
  );
};
