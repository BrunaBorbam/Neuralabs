'use client';

import Navbar from '@/components/Navbar';
import Button from '@/components/Button';

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center overflow-hidden pt-20">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Badge */}
          <div className="inline-block">
            <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm">
              🧠 Neurociência + Design + Conversão
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight">
            Sites que entendem o cérebro do seu cliente
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Combinamos neurociência, design, SEO e análise comportamental para criar websites que vendem. 30 dias de suporte incluído.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button size="lg" className="md:text-lg">
              Começar Consulta Gratuita
            </Button>
            <Button size="lg" variant="secondary" className="md:text-lg">
              Ver Portfolio
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-12 border-t border-gray-200">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600">+15%</div>
              <div className="text-sm md:text-base text-slate-600">Aumento em Conversões</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600">30 dias</div>
              <div className="text-sm md:text-base text-slate-600">Suporte Completo</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600">100%</div>
              <div className="text-sm md:text-base text-slate-600">LGPD Compliant</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-20 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Nossos Diferenciais</h2>
            <p className="text-xl text-slate-600">Tudo que uma PME precisa para ter presença digital profissional</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🧠', title: 'Neurociência', description: 'Análise profunda do comportamento do seu cliente consumidor' },
              { icon: '🎨', title: 'Design Premium', description: 'Interfaces modernas com animações e efeitos profissionais' },
              { icon: '📈', title: 'SEO + Conversão', description: 'Otimizado para Google e para vender de verdade' },
              { icon: '🔒', title: 'LGPD Compliant', description: 'Segurança e conformidade legal garantidas' },
              { icon: '⚡', title: 'Performance', description: 'Rápido em qualquer dispositivo e conexão' },
              { icon: '🎯', title: '30 Dias de Suporte', description: 'Revisões, análises e melhorias incluídas' },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl border border-gray-200 hover:shadow-xl hover:border-blue-500 transition-all group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 md:py-32 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Pronto para transformar seu site?</h2>
          <p className="text-xl mb-8 opacity-90">Vamos fazer uma análise profunda do seu cliente e criar a solução perfeita</p>
          <Button size="lg" variant="secondary">Agendar Consulta Gratuita</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-bold text-lg mb-4">Neuralabs</h3>
              <p className="text-gray-400">Websites que entendem o cérebro do seu cliente</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Serviços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Portfolio</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LGPD</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Neuralabs. Feito com 🧠 por Bruna Borba</p>
          </div>
        </div>
      </footer>
    </>
  );
}
