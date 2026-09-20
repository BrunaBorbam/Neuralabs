import React from 'react';
import { motion } from 'framer-motion';

export const EcommerceMockup = () => {
  return (
    <motion.div
      className="relative w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
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
          <div className="text-xs text-slate-400 ml-auto">belezanaturalco.com.br</div>
        </div>

        {/* Website Content - E-commerce Hero */}
        <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-8 aspect-video flex flex-col justify-between">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold">
              ⚡ Apenas 3 em estoque
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Sérum Anti-Idade Natural</h1>
            <p className="text-sm text-slate-700">Aprovado por dermatologistas • +1.200 clientes satisfeitos</p>
          </div>

          {/* Product Section */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-slate-900">R$ 89</span>
                <span className="text-sm line-through text-slate-500">R$ 149</span>
              </div>
              <div className="flex gap-1">
                <span className="text-yellow-500">★★★★★</span>
                <span className="text-xs text-slate-600">(892)</span>
              </div>
            </div>
            <motion.button
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg text-sm"
              whileHover={{ scale: 1.02 }}
            >
              Comprar
            </motion.button>
          </div>

          {/* Trust Badges */}
          <div className="flex gap-3 text-xs text-slate-700">
            <span>✓ Frete Grátis</span>
            <span>✓ Garantia 30d</span>
            <span>✓ Seguro</span>
          </div>
        </div>
      </div>

      {/* Case Label */}
      <div className="mt-4 text-center">
        <p className="text-xs text-slate-600">E-commerce: +28% conversão em 90 dias</p>
        <p className="text-xs text-orange-500 font-bold">Neuromarketing + Urgência + Prova Social</p>
      </div>
    </motion.div>
  );
};

export const SaasMockup = () => {
  return (
    <motion.div
      className="relative w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
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
          <div className="text-xs text-slate-400 ml-auto">analytics-pro.app</div>
        </div>

        {/* Website Content - SaaS */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8 aspect-video flex flex-col justify-between">
          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-4 rounded-lg border border-blue-500/30">
              <p className="text-xs text-blue-200">Conversões</p>
              <p className="text-2xl font-bold text-blue-300">+34%</p>
              <p className="text-xs text-blue-400 mt-2">vs. mês anterior</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 p-4 rounded-lg border border-emerald-500/30">
              <p className="text-xs text-emerald-200">ROI</p>
              <p className="text-2xl font-bold text-emerald-300">4.2x</p>
              <p className="text-xs text-emerald-400 mt-2">em 6 meses</p>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white">Decisões em Tempo Real</h2>
            <p className="text-sm text-slate-300">Dashboard inteligente com IA para otimizar sua conversão</p>
            <motion.button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg text-sm"
              whileHover={{ scale: 1.02 }}
            >
              Começar Trial 14 Dias
            </motion.button>
            <p className="text-xs text-slate-400 text-center">Sem cartão de crédito necessário</p>
          </div>
        </div>
      </div>

      {/* Case Label */}
      <div className="mt-4 text-center">
        <p className="text-xs text-slate-600">SaaS: +34% conversão com dashboard IA</p>
        <p className="text-xs text-blue-500 font-bold">Design Intuitivo + Psicologia Decisória</p>
      </div>
    </motion.div>
  );
};
