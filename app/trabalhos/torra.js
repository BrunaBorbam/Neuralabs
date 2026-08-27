'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Torra() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-slate-900 bg-slate-950/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black hover:text-amber-600 transition">Neuralabs</Link>
          <Link href="/#trabalhos" className="text-sm text-slate-400 hover:text-white transition">← Voltar</Link>
        </div>
      </header>

      {/* Hero com Video Background */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/40 via-slate-950 to-slate-950"></div>

        {/* Parallax Effect */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=1200&h=1200&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
          <div className="mb-6 inline-block animate-bounce">
            <span className="text-6xl">☕</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
            <span className="text-amber-600">Torra</span><br />Experiência em cada xícara
          </h1>

          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Site de marca com foco em atmosfera, ritmo e experiência sensorial. Aplicamos neuromarketing visual para converter visitantes em clientes fiéis.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="px-8 py-4 bg-amber-600 hover:bg-amber-700 rounded-lg font-bold transition transform hover:scale-105 shadow-lg shadow-amber-600/30 animate-pulse">
              Reservar Mesa
            </button>
            <button className="px-8 py-4 border-2 border-amber-600 hover:bg-amber-600/10 rounded-lg font-bold transition">
              Ver Cardápio
            </button>
          </div>

          <div className="inline-block">
            <ChevronDown className="w-6 h-6 text-amber-600 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-3 gap-8 text-center">
        <div className="transform transition hover:scale-110 hover:text-amber-600">
          <Clock className="w-8 h-8 mx-auto mb-3 text-amber-600" />
          <p className="text-3xl font-black">08:00 - 22:00</p>
          <p className="text-slate-400">Aberto todos os dias</p>
        </div>
        <div className="transform transition hover:scale-110 hover:text-amber-600">
          <MapPin className="w-8 h-8 mx-auto mb-3 text-amber-600" />
          <p className="text-3xl font-black">São Paulo</p>
          <p className="text-slate-400">Rua Coffee, 123</p>
        </div>
        <div className="transform transition hover:scale-110 hover:text-amber-600">
          <Users className="w-8 h-8 mx-auto mb-3 text-amber-600" />
          <p className="text-3xl font-black">+2.5K</p>
          <p className="text-slate-400">Clientes felizes/mês</p>
        </div>
      </section>

      {/* Método Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">Método Neuralabs Aplicado</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-amber-600 transition transform hover:scale-105">
              <h3 className="text-xl font-bold text-amber-600 mb-2">1. Mapas de Atenção</h3>
              <p className="text-slate-300">Hero com imagem de café (trigger emocional). Layout orienta olho para CTA via cor quente (âmbar).</p>
            </div>
            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-amber-600 transition transform hover:scale-105">
              <h3 className="text-xl font-bold text-amber-600 mb-2">2. Urgência & Escassez</h3>
              <p className="text-slate-300">Botão "Reservar Mesa" com animação pulse. Stats mostram popularidade (2.5K clientes).</p>
            </div>
          </div>

          <div
            className="relative h-96 rounded-lg overflow-hidden border-2 border-amber-600 shadow-2xl shadow-amber-600/20"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&h=600&fit=crop")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className="relative h-96 rounded-lg overflow-hidden border-2 border-amber-600 shadow-2xl shadow-amber-600/20"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=600&fit=crop")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-amber-600 transition transform hover:scale-105">
              <h3 className="text-xl font-bold text-amber-600 mb-2">3. Gatilhos Sensoriais</h3>
              <p className="text-slate-300">Cores quentes (âmbar, marrom) ativam âncoras sensoriais de café. Tipografia bold reforça confiança.</p>
            </div>
            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-amber-600 transition transform hover:scale-105">
              <h3 className="text-xl font-bold text-amber-600 mb-2">4. Prova Social</h3>
              <p className="text-slate-300">"2.5K clientes" cria ancoragem social. Aberto 7 dias reduz fricção de decisão.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">Ambiente & Experiência</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1514432324607-2e467ad259e6?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
          ].map((img, i) => (
            <div
              key={i}
              className="relative h-64 rounded-lg overflow-hidden border border-slate-800 hover:border-amber-600 transition transform hover:scale-105 cursor-pointer group"
              style={{
                backgroundImage: `url("${img}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Menu Preview */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">Cardápio Destacado</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            { name: 'Espresso Premium', desc: 'Grãos selecionados, torra especial', price: 'R$ 8' },
            { name: 'Cappuccino Clássico', desc: 'Leite vaporizado, arte latte', price: 'R$ 12' },
            { name: 'Cold Brew', desc: 'Extração fria, 12h de repouso', price: 'R$ 14' },
            { name: 'Affogato', desc: 'Sorvete de baunilha + espresso quente', price: 'R$ 16' }
          ].map((item, i) => (
            <div key={i} className="p-6 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-amber-600 transition transform hover:translate-x-2">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-amber-600">{item.name}</h3>
                <span className="text-amber-600 font-bold">{item.price}</span>
              </div>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-amber-900/30 to-slate-900 border-2 border-amber-600 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para a experiência?</h2>
          <p className="text-slate-300 mb-8">Venha tomar o melhor café da cidade. Estamos esperando.</p>
          <button className="px-8 py-4 bg-amber-600 hover:bg-amber-700 rounded-lg font-bold transition transform hover:scale-105 inline-flex items-center gap-2">
            Reservar Agora <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-4 py-8 text-center text-slate-500 text-sm">
        <p>© 2026 Torra. Café que vende experiência, não só bebida.</p>
        <p className="mt-2 text-xs">Case study Neuralabs - Aplicação de neuromarketing em atmosfera de marca</p>
      </footer>
    </div>
  );
}
