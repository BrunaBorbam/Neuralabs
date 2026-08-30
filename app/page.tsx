'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <Navbar />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .float { animation: float 3s ease-in-out infinite; }
        .pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .spin-slow { animation: spin-slow 20s linear infinite; }
        .shimmer {
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
        .hover-lift {
          transition: all 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(139, 92, 246, 0.3);
        }
      `}</style>

      {/* HERO SECTION - ÉPICO */}
      <section
        id="home"
        className="relative min-h-screen overflow-hidden pt-20"
        style={{
          background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 25%, #2d1b4e 50%, #3d2817 75%, #1a1833 100%)',
        }}
      >
        {/* Neural Network Background */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <svg className="absolute w-full h-full" style={{ background: 'transparent' }}>
            {[...Array(15)].map((_, i) => {
              const x = Math.random() * 100;
              const y = Math.random() * 100;
              return (
                <g key={i}>
                  <circle cx={`${x}%`} cy={`${y}%`} r="3" fill="#60a5fa" opacity="0.6" />
                  {i % 3 === 0 && (
                    <line
                      x1={`${x}%`}
                      y1={`${y}%`}
                      x2={`${(x + 15) % 100}%`}
                      y2={`${(y + 15) % 100}%`}
                      stroke="#8b5cf6"
                      strokeWidth="0.5"
                      opacity="0.4"
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-20 left-10 w-96 h-96 rounded-full filter blur-3xl opacity-30 float"
            style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }}
          />
          <div
            className="absolute top-40 right-10 w-96 h-96 rounded-full filter blur-3xl opacity-30"
            style={{
              background: 'radial-gradient(circle, #a855f7, transparent)',
              animation: 'float 4s ease-in-out infinite 1s',
            }}
          />
          <div
            className="absolute -bottom-20 left-32 w-96 h-96 rounded-full filter blur-3xl opacity-30"
            style={{
              background: 'radial-gradient(circle, #ec4899, transparent)',
              animation: 'float 5s ease-in-out infinite 2s',
            }}
          />
          <div
            className="absolute bottom-40 right-20 w-80 h-80 rounded-full filter blur-3xl opacity-25"
            style={{
              background: 'radial-gradient(circle, #f59e0b, transparent)',
              animation: 'float 6s ease-in-out infinite 3s',
            }}
          />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full pulse-glow"
              style={{
                background: ['#60a5fa', '#a855f7', '#ec4899', '#f59e0b'][i % 4],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 py-20">
          {/* Badge */}
          <div
            className="inline-block px-6 py-3 rounded-full backdrop-blur-md border float"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(139, 92, 246, 0.5)',
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)',
            }}
          >
            <span className="text-white font-bold text-sm">🧠 Neurociência + Design + IA</span>
          </div>

          {/* Epic Heading */}
          <h1
            className="text-5xl md:text-7xl font-black leading-tight"
            style={{
              background: 'linear-gradient(135deg, #60a5fa 0%, #a855f7 25%, #ec4899 50%, #f59e0b 75%, #60a5fa 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 3s infinite',
            }}
          >
            Sites que Dominam Mentes
          </h1>

          {/* Subheading with animation */}
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light">
            Combinamos <span className="font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">neurociência</span>, <span className="font-bold text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">design épico</span>, <span className="font-bold text-white bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">SEO inteligente</span> e <span className="font-bold text-white">IA</span> para criar websites que <span className="text-yellow-300 font-bold">vendem MUITO</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button
              className="px-8 py-4 rounded-xl font-bold text-lg text-white transition-all duration-300 hover-lift border border-blue-400/50"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)',
              }}
            >
              🚀 Começar Grátis Agora
            </button>
            <button
              className="px-8 py-4 rounded-xl font-bold text-lg text-white transition-all duration-300 hover-lift border"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                borderColor: 'rgba(168, 85, 247, 0.5)',
                backdropFilter: 'blur(10px)',
              }}
            >
              📊 Ver Resultados
            </button>
          </div>

          {/* Stats with animation */}
          <div
            className="grid grid-cols-3 gap-4 pt-16 rounded-2xl p-8 border"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              borderColor: 'rgba(139, 92, 246, 0.3)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="space-y-3 hover-lift">
              <div
                className="text-3xl md:text-4xl font-black"
                style={{
                  background: 'linear-gradient(to right, #4ade80, #10b981)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                +37%
              </div>
              <div className="text-xs md:text-sm text-green-300 font-medium">Conversões</div>
            </div>
            <div className="space-y-3 border-l border-r border-white/10 hover-lift">
              <div
                className="text-3xl md:text-4xl font-black"
                style={{
                  background: 'linear-gradient(to right, #facc15, #f59e0b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                30 dias
              </div>
              <div className="text-xs md:text-sm text-yellow-300 font-medium">Suporte 24/7</div>
            </div>
            <div className="space-y-3 hover-lift">
              <div
                className="text-3xl md:text-4xl font-black"
                style={{
                  background: 'linear-gradient(to right, #c084fc, #f472b6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                100%
              </div>
              <div className="text-xs md:text-sm text-pink-300 font-medium">LGPD OK</div>
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
      <section id="services" className="py-20 md:py-40 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #1a1833 0%, #0f172a 50%, #1a2847 100%)',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2
              className="text-4xl md:text-6xl font-black mb-6"
              style={{
                background: 'linear-gradient(135deg, #60a5fa, #a855f7, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              O Que Você Ganha
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">Recursos poderosos para dominar seu mercado</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🧠', title: 'Neurociência', description: 'Análise profunda do comportamento do cliente', color: '#3b82f6' },
              { icon: '🎨', title: 'Design Épico', description: 'Interfaces que convertem visitas em vendas', color: '#a855f7' },
              { icon: '📈', title: 'SEO + IA', description: 'Otimizado para vender, não só aparecer', color: '#ec4899' },
              { icon: '🔒', title: 'LGPD Compliant', description: 'Segurança de dados em primeiro lugar', color: '#f59e0b' },
              { icon: '⚡', title: 'Ultrarrápido', description: 'Carrega em menos de 2 segundos', color: '#10b981' },
              { icon: '🎯', title: '30 Dias Suporte', description: 'Ajustes ilimitados inclusos', color: '#06b6d4' },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative rounded-2xl p-6 transition-all duration-300 border hover-lift"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderColor: `rgba(${parseInt(feature.color.slice(1, 3), 16)}, ${parseInt(feature.color.slice(3, 5), 16)}, ${parseInt(feature.color.slice(5, 7), 16)}, 0.3)`,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at center, ${feature.color}15, transparent)`,
                  }}
                />
                <div className="relative z-10 space-y-3">
                  <div className="text-4xl group-hover:scale-125 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL - ÉPICO */}
      <section id="contact" className="py-20 md:py-32 overflow-hidden relative">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #be185d 100%)',
          }}
        />

        <div className="absolute inset-0 opacity-20">
          <div className="spin-slow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.1), transparent)' }} />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Transformar seu site é inevitável 🚀</h2>
          <p className="text-lg mb-10 opacity-90 font-light">A questão é: quando você vai começar?</p>
          <button
            className="px-10 py-4 rounded-xl font-bold text-lg text-blue-900 transition-all duration-300 hover-lift border-2 border-white/20"
            style={{
              background: 'linear-gradient(135deg, #ffffff, #f0f9ff)',
              boxShadow: '0 10px 40px rgba(255,255,255,0.3)',
            }}
          >
            ✨ Agendar Consulta Gratuita
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0f0f1e 0%, #1a1a2e 100%)' }}>
        <div className="absolute inset-0 opacity-20">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2), transparent)',
                width: '400px',
                height: '400px',
                left: `${i * 20}%`,
                top: `${i * 20}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/10">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-bold text-xl text-white mb-4">🧠 Neuralabs</h3>
              <p className="text-slate-400 text-sm">Sites que entendem o cérebro do seu cliente</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Produto</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Serviços</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Portfolio</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Preços</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Termos</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">LGPD</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-slate-500 text-sm">
            <p>&copy; 2026 Neuralabs. Feito com 💜 por Bruna Borba</p>
          </div>
        </div>
      </footer>
    </>
  );
}
