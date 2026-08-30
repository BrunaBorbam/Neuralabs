'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('leads');

  return (
    <div className="p-6 md:p-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Dashboard Neuralabs</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie seus leads, projetos e clientes em um único lugar
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { label: 'Leads Totais', value: '0', icon: '👥' },
            { label: 'Projetos Ativos', value: '0', icon: '📋' },
            { label: 'Receita Mês', value: 'R$ 0', icon: '💰' },
            { label: 'Taxa Conversão', value: '0%', icon: '📈' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-slate-700"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex gap-4 border-b border-gray-200 dark:border-slate-700">
            {[
              { id: 'leads', label: 'Leads' },
              { id: 'projects', label: 'Projetos' },
              { id: 'clients', label: 'Clientes' },
              { id: 'support', label: 'Suporte' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-brand-600 text-brand-600'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-8"
        >
          {activeTab === 'leads' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📨</div>
              <h2 className="text-2xl font-bold mb-2">Nenhum lead ainda</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Quando alguém preencher o formulário do site, aparecerá aqui
              </p>
              <button className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors">
                Simulador de Lead (DEV)
              </button>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎨</div>
              <h2 className="text-2xl font-bold mb-2">Nenhum projeto ativo</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Seus projetos aparecerão aqui após conversão de leads
              </p>
            </div>
          )}

          {activeTab === 'clients' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🤝</div>
              <h2 className="text-2xl font-bold mb-2">Nenhum cliente ainda</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Seus clientes serão listados aqui
              </p>
            </div>
          )}

          {activeTab === 'support' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛟</div>
              <h2 className="text-2xl font-bold mb-2">Suporte ativo</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Aqui você acompanha o suporte de 30 dias de cada cliente
              </p>
            </div>
          )}
        </motion.div>

        {/* Coming Soon Section */}
        <motion.div
          variants={itemVariants}
          className="mt-12 p-8 bg-gradient-to-r from-brand-100 to-purple-100 dark:from-brand-900/30 dark:to-purple-900/30 rounded-lg border border-brand-200 dark:border-brand-800"
        >
          <h3 className="text-xl font-bold mb-2">🚀 Em Desenvolvimento</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Agentes de IA estão sendo treinados para:
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>✅ Responder leads 24/7 automaticamente</li>
            <li>✅ Qualificar leads por comportamento</li>
            <li>✅ Gerar propostas automáticas</li>
            <li>✅ Integração com Google Ads e SEO</li>
            <li>✅ Chat em tempo real com clientes</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}
