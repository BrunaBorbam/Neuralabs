'use client';

import Navbar from '@/components/Navbar';
import Button from '@/components/Button';

export default function Home() {
  return (
    <>
      <Navbar />

      {/* HERO SECTION - ÉPICO */}
      <section
        id="home"
        className="relative min-h-screen overflow-hidden pt-20"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 25%, #581c87 50%, #7c2d12 75%, #1e1b4b 100%)',
        }}
      >
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-20 left-10 w-96 h-96 rounded-full filter blur-3xl opacity-20"
            style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }}
          />
          <div
            className="absolute top-40 right-10 w-96 h-96 rounded-full filter blur-3xl opacity-20"
            style={{ background: 'radial-gradient(circle, #a855f7, transparent)', animationDelay: '1s' }}
          />
          <div
            className="absolute -bottom-20 left-32 w-96 h-96 rounded-full filter blur-3xl opacity-20"
            style={{ background: 'radial-gradient(circle, #ec4899, transparent)', animationDelay: '2s' }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 py-20">
          {/* Badge */}
          <div
            className="inline-block px-6 py-2 rounded-full backdrop-blur-md border"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
            }}
          >
            <span className="text-white font-semibold text-sm">🧠 Neurociência + Design + Conversão</span>
          </div>

          {/* Epic Heading */}
          <h1
            className="text-6xl md:text-8xl font-black leading-tight"
            style={{
              background: 'linear-gradient(to right, #60a5fa, #c084fc, #f472b6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Sites que entendem o cérebro do seu cliente
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light">
            Combinamos <span className="font-bold text-white">neurociência</span>, <span className="font-bold text-white">design</span>, <span className="font-bold text-white">SEO</span> e <span className="font-bold text-white">análise comportamental</span> para criar websites que <span className="font-bold">vendem de verdade</span>. 30 dias de suporte incluído.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button
              className="px-8 py-3 rounded-lg font-bold text-lg text-white transition-all duration-300 hover:shadow-2xl"
              style={{
                background: 'linear-gradient(to right, #3b82f6, #2563eb)',
              }}
            >
              🚀 Começar Consulta Gratuita
            </button>
            <button
              className="px-8 py-3 rounded-lg font-bold text-lg text-white transition-all duration-300 backdrop-blur-md border"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              📁 Ver Portfolio
            </button>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-4 pt-16 rounded-3xl p-8 backdrop-blur-md border"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <div className="space-y-2">
              <div
                className="text-4xl md:text-5xl font-black"
                style={{
                  background: 'linear-gradient(to right, #4ade80, #10b981)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                +15%
              </div>
              <div className="text-sm md:text-base text-blue-200 font-medium">Aumento em Conversões</div>
            </div>
            <div className="space-y-2 border-l border-r border-white/10">
              <div
                className="text-4xl md:text-5xl font-black"
                style={{
                  background: 'linear-gradient(to right, #facc15, #f59e0b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                30 dias
              </div>
              <div className="text-sm md:text-base text-blue-200 font-medium">Suporte Completo</div>
            </div>
            <div className="space-y-2">
              <div
                className="text-4xl md:text-5xl font-black"
                style={{
                  background: 'linear-gradient(to right, #c084fc, #f472b6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                100%
              </div>
              <div className="text-sm md:text-base text-blue-200 font-medium">LGPD Compliant</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="services" className="py-20 md:py-40 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2
              className="text-5xl md:text-7xl font-black mb-6"
              style={{
                background: 'linear-gradient(to right, #60a5fa, #c084fc, #f472b6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Nossos Diferenciais
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">Tudo que uma PME precisa para dominar seu mercado digital</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🧠', title: 'Neurociência', description: 'Análise profunda do comportamento do seu cliente' },
              { icon: '🎨', title: 'Design Premium', description: 'Interfaces que conversam com o cérebro' },
              { icon: '📈', title: 'SEO + Conversão', description: 'Otimizado para vender, não só aparecer' },
              { icon: '🔒', title: 'LGPD Compliant', description: 'Segurança e conformidade 100%' },
              { icon: '⚡', title: 'Performance', description: 'Rápido em qualquer dispositivo' },
              { icon: '🎯', title: '30 Dias Suporte', description: 'Revisões e melhorias incluídas' },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative rounded-2xl p-8 transition-all duration-300 backdrop-blur-md border hover:shadow-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className="relative z-10 space-y-4">
                  <div className="text-5xl group-hover:scale-125 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="contact" className="py-20 md:py-32 overflow-hidden relative">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, #2563eb, #7c3aed, #db2777)',
          }}
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Pronto para transformar seu site?</h2>
          <p className="text-lg mb-10 opacity-95 font-light">Vamos fazer uma análise profunda do seu cliente e criar a solução perfeita</p>
          <button
            className="px-8 py-3 rounded-lg font-bold text-lg text-blue-600 transition-all duration-300 hover:shadow-2xl"
            style={{
              background: 'white',
            }}
          >
            ✨ Agendar Consulta Gratuita
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-300 py-12 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-bold text-lg text-white mb-4">Neuralabs</h3>
              <p className="text-slate-400">Websites que entendem o cérebro do seu cliente 🧠</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Produto</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Serviços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Portfolio</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Empresa</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LGPD</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-slate-500">
            <p>&copy; 2026 Neuralabs. Feito com 🧠 por Bruna Borba</p>
          </div>
        </div>
      </footer>
    </>
  );
}
