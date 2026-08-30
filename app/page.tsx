'use client';

import Navbar from '@/components/Navbar';
import Button from '@/components/Button';

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section - ÉPICO */}
      <section id="home" className="relative min-h-screen bg-gradient-to-br from-slate-950 via-blue-900 to-purple-900 flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}} />
          <div className="absolute -bottom-20 left-32 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Badge com Glassmorphism */}
          <div className="inline-block backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-6 py-2 hover:bg-white/20 transition-all duration-300">
            <span className="text-white font-semibold text-sm">🧠 Neurociência + Design + Conversão</span>
          </div>

          {/* Epic Heading */}
          <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent leading-tight drop-shadow-2xl">
            Sites que entendem o cérebro do seu cliente
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light">
            Combinamos <span className="font-bold text-white">neurociência</span>, <span className="font-bold text-white">design</span>, <span className="font-bold text-white">SEO</span> e <span className="font-bold text-white">análise comportamental</span> para criar websites que <span className="font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">vendem de verdade</span>. 30 dias de suporte incluído.
          </p>

          {/* CTA Buttons - Epic */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button size="lg" className="md:text-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold shadow-xl hover:shadow-2xl">
              🚀 Começar Consulta Gratuita
            </Button>
            <Button size="lg" variant="secondary" className="md:text-lg backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold">
              📁 Ver Portfolio
            </Button>
          </div>

          {/* Stats - Glassmorphism */}
          <div className="grid grid-cols-3 gap-4 pt-16 backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">+15%</div>
              <div className="text-sm md:text-base text-blue-200 font-medium">Aumento em Conversões</div>
            </div>
            <div className="space-y-2 border-l border-r border-white/10">
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">30 dias</div>
              <div className="text-sm md:text-base text-blue-200 font-medium">Suporte Completo</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">100%</div>
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

      {/* Features Section - PREMIUM */}
      <section id="services" className="py-20 md:py-40 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Nossos Diferenciais</h2>
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
                className="group relative backdrop-blur-md bg-white/5 border border-white/10 hover:border-blue-400/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
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

      {/* CTA Section - FINAL BOSS */}
      <section id="contact" className="py-20 md:py-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-screen filter blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10">
          <h2 className="text-5xl md:text-6xl font-black mb-6">Pronto para transformar seu site?</h2>
          <p className="text-xl mb-10 opacity-95 font-light">Vamos fazer uma análise profunda do seu cliente e criar a solução perfeita</p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 font-bold shadow-2xl">
            ✨ Agendar Consulta Gratuita
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-300 py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
