'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const AnimatedNumber = ({ value, suffix = '' }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <>{count}{suffix}</>;
};

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', whatsapp: '', email: '', business: '' });

  const problems = [
    {
      title: 'Testes no escuro',
      description: 'Times otimizam por achismo e tendência, rodam A/B tests sem hipótese neurocognitiva e queimam tráfego.'
    },
    {
      title: 'Copy que não conecta',
      description: 'Mensagens excessivamente racionais ignoram que a decisão de compra é emocional primeiro e justificada depois.'
    },
    {
      title: 'CRO genérico e raso',
      description: 'Frameworks copiados de blog em blog, aplicados sem entender os vieses cognitivos reais do seu público.'
    }
  ];

  const solutions = [
    {
      title: 'Mapas de atenção',
      description: 'Mapeamos onde o usuário clica, rola e hesita com heatmaps e gravações reais — e redesenhamos a hierarquia visual.'
    },
    {
      title: 'Gatilhos cognitivos',
      description: 'Aplicamos os vieses de decisão mais relevantes para o seu produto, calibrados por segmento e momento da jornada.'
    },
    {
      title: 'IA aplicada ao diagnóstico',
      description: 'Cruzamos dados reais de comportamento (heatmaps, gravações, entrevistas) com padrões de fricção validados.'
    },
    {
      title: 'Arquitetura de decisão',
      description: 'Redesenhamos fluxos inteiros — não apenas telas — para reduzir carga cognitiva e acelerar o caminho para conversão.'
    }
  ];

  const audiences = ['Coaches', 'Consultores', 'Marcas de E-commerce', 'Agências Digitais', 'Criadores de Cursos', 'Prestadores de Serviço'];

  const portfolio = [
    {
      name: 'Torra',
      category: 'Cafeteria',
      description: 'Site de marca com foco em atmosfera e experiência de produto.'
    },
    {
      name: 'Orbita',
      category: 'E-commerce / DTC',
      description: 'Loja enxuta, três produtos, foco total em decisão rápida.'
    }
  ];

  const process = [
    {
      title: 'Diagnóstico neurocognitivo',
      description: 'Auditoria completa da jornada com heatmaps, gravações de sessão e entrevistas reais para mapear fricções.'
    },
    {
      title: 'Mapeamento de gatilhos',
      description: 'Identificamos quais vieses cognitivos e emoções dominam a decisão do seu público em cada etapa do funil.'
    },
    {
      title: 'Design & desenvolvimento',
      description: 'Aplicamos o que foi mapeado direto na estrutura, na copy e no design do site — decisão por decisão, validada.'
    },
    {
      title: 'Entrega & suporte',
      description: 'Colocamos o site no ar e damos suporte direto por 30 dias para ajustes e refinamentos — sem letra miúda.'
    }
  ];

  const faqs = [
    {
      q: 'Neurociência aplicada a conversão não é só marketing disfarçado?',
      a: 'Não. Usamos metodologias validadas em pesquisa comportamental — heatmaps, gravações de sessão, entrevistas, testes de usabilidade. Não é teoria, é prática fundamentada em dados.'
    },
    {
      q: 'Em quanto tempo eu vejo resultado?',
      a: 'O diagnóstico leva de 1 a 2 semanas. A partir daí, o site é desenvolvido já aplicando os princípios que mapeamos. Você sai da entrega com um site pronto para gerar tráfego qualificado.'
    },
    {
      q: 'Funciona para qualquer tipo de negócio digital?',
      a: 'Funciona melhor para quem já vende online — e-commerce, infoprodutos, serviços ou assinaturas — e que tem histórico de tráfego para nos dar dados.'
    },
    {
      q: 'Qual a diferença para uma agência de CRO tradicional?',
      a: 'CRO tradicional parte de testar variações de layout por tentativa e erro. Nós partimos do porquê: mapeamos o comportamento real, entendemos a fricção, e aí sim desenhamos a solução.'
    },
    {
      q: 'Como funciona o modelo de contrato?',
      a: 'É um projeto único: diagnóstico, aplicação do método no design e desenvolvimento, e entrega do site com 30 dias de suporte incluso. Sem mensalidades, sem vínculos posteriores.'
    },
    {
      q: 'Vocês atendem clientes fora do Brasil?',
      a: 'Sim. Trabalhamos com clientes brasileiros e internacionais, incluindo empresas sediadas no exterior.'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Perfeito! Seu diagnóstico foi solicitado. Você receberá contato em até 24h!');
    setFormData({ name: '', whatsapp: '', email: '', business: '' });
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen overflow-hidden">
      {/* Neural Network Background Animation */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <svg className="w-full h-full" viewBox="0 0 1200 1200">
          <defs>
            <style>{`
              @keyframes pulse-dot {
                0%, 100% { r: 3; opacity: 0.8; }
                50% { r: 6; opacity: 0.4; }
              }
              .neural-dot {
                fill: #f59e0b;
                animation: pulse-dot 3s infinite;
              }
              .neural-line {
                stroke: #f59e0b;
                stroke-width: 1;
                opacity: 0.3;
              }
            `}</style>
          </defs>

          {/* Lines */}
          <line x1="100" y1="100" x2="600" y2="400" className="neural-line" />
          <line x1="600" y1="400" x2="900" y2="200" className="neural-line" />
          <line x1="900" y1="200" x2="1000" y2="600" className="neural-line" />
          <line x1="600" y1="400" x2="400" y2="800" className="neural-line" />
          <line x1="400" y1="800" x2="800" y2="900" className="neural-line" />

          {/* Dots */}
          <circle cx="100" cy="100" className="neural-dot" style={{ animationDelay: '0s' }} />
          <circle cx="600" cy="400" className="neural-dot" style={{ animationDelay: '0.5s' }} />
          <circle cx="900" cy="200" className="neural-dot" style={{ animationDelay: '1s' }} />
          <circle cx="1000" cy="600" className="neural-dot" style={{ animationDelay: '1.5s' }} />
          <circle cx="400" cy="800" className="neural-dot" style={{ animationDelay: '2s' }} />
          <circle cx="800" cy="900" className="neural-dot" style={{ animationDelay: '2.5s' }} />
        </svg>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-900 bg-slate-950/95 backdrop-blur">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <div className="text-xl font-black">NEURALABS</div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#problema" className="text-sm hover:text-orange-500 transition">Problema</a>
            <a href="#solucao" className="text-sm hover:text-orange-500 transition">Solução</a>
            <a href="#precos" className="text-sm hover:text-orange-500 transition">Preços</a>
            <a href="#resultados" className="text-sm hover:text-orange-500 transition">Resultados</a>
            <a href="#processo" className="text-sm hover:text-orange-500 transition">Processo</a>
            <a href="#faq" className="text-sm hover:text-orange-500 transition">FAQ</a>
            <a href="#cta" className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-full text-sm font-bold transition transform hover:scale-105">
              Vamos Começar
            </a>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-900 px-4 py-4 space-y-3">
            <a href="#problema" className="block text-sm py-2 hover:text-orange-500">Problema</a>
            <a href="#solucao" className="block text-sm py-2 hover:text-orange-500">Solução</a>
            <a href="#faq" className="block text-sm py-2 hover:text-orange-500">FAQ</a>
            <a href="#cta" className="block px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-full text-sm font-bold text-center">
              Vamos Começar
            </a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div className="max-w-4xl mx-auto text-center relative z-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.p className="text-orange-500 font-bold mb-6 text-sm tracking-widest" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>NEUROCIÊNCIA APLICADA</motion.p>

          <motion.h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
            Onde Neurociência<br />Vira <span className="text-orange-500">Conversão</span>
          </motion.h1>

          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            A Neuralabs cria sites prototados em torno de como o cérebro do seu cliente realmente decide — não o que parece bonito.
          </p>

          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <motion.a href="#cta" className="px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-full font-bold text-lg transition transform hover:scale-105 shadow-lg shadow-orange-600/40" whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(249, 115, 22, 0.6)' }} whileTap={{ scale: 0.95 }}>
              Fale Comigo →
            </motion.a>
            <motion.a href="#precos" className="px-8 py-4 border-2 border-white/30 hover:border-white rounded-full font-bold text-lg transition" whileHover={{ scale: 1.05, borderColor: 'white' }} whileTap={{ scale: 0.95 }}>
              Ver Preços
            </motion.a>
          </motion.div>

          <p className="text-sm text-slate-400">
            95% das decisões de compra são inconscientes. Decodificamos isso.
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problema" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-4 text-center">Otimizar sem entender o cérebro é jogar dinheiro fora</h2>
        <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
          A maioria das empresas trata conversão como um problema de design ou de tráfego — quando, na verdade, é um problema de neurociência.
        </p>

        <motion.div className="grid md:grid-cols-3 gap-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          {problems.map((problem, i) => (
            <motion.div key={i} className="p-8 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-orange-500/50 transition transform hover:scale-105" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }} viewport={{ once: true }} whileHover={{ scale: 1.05 }}>
              <h3 className="text-xl font-bold mb-3 text-orange-500">{problem.title}</h3>
              <p className="text-slate-300 leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Solution Section */}
      <section id="solucao" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-4 text-center">O Método Neuralabs</h2>
        <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
          Combinamos neurociência comportamental, dados quantitativos e inteligência artificial em um método prova de resultado.
        </p>

        <motion.div className="grid md:grid-cols-2 gap-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          {solutions.map((solution, i) => (
            <motion.div key={i} className="p-8 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-orange-500/50 transition transform hover:scale-105" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }} viewport={{ once: true }} whileHover={{ scale: 1.05 }}>
              <h3 className="text-xl font-bold mb-3 text-orange-500">{solution.title}</h3>
              <p className="text-slate-300">{solution.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Audiences */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h3 className="text-center text-slate-400 text-sm mb-8">Feito para quem vende online</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {audiences.map((audience, i) => (
            <div key={i} className="text-center py-4 px-3 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-orange-500/50 transition">
              <p className="text-sm font-medium">{audience}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio */}
      <section id="resultados" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-4 text-center">Trabalhos</h2>
        <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
          Conceitos que mostram o método na prática. Como somos uma agência nova, estes são projetos de demonstração.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {portfolio.map((work, i) => (
            <Link key={i} href={`/trabalhos/${work.name.toLowerCase()}`}>
              <div className="group bg-slate-900 rounded-lg overflow-hidden border border-slate-800 hover:border-orange-500 transition cursor-pointer transform hover:scale-105">
                <div className="bg-gradient-to-br from-orange-600/20 to-slate-900 h-48 flex items-center justify-center">
                  <h3 className="text-3xl font-bold text-orange-500">{work.name}</h3>
                </div>
                <div className="p-6">
                  <p className="text-orange-500 text-sm font-semibold mb-2">{work.category}</p>
                  <h4 className="text-lg font-bold mb-2">{work.name}</h4>
                  <p className="text-slate-300">{work.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Process */}
      <section id="processo" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-4 text-center">Um processo claro, do diagnóstico à entrega</h2>
        <p className="text-center text-slate-400 mb-12">Como funciona</p>

        <motion.div className="grid md:grid-cols-4 gap-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          {process.map((step, i) => (
            <motion.div key={i} className="relative" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15, duration: 0.5 }} viewport={{ once: true }}>
              {i < process.length - 1 && (
                <motion.div className="hidden md:block absolute top-12 -right-4 w-8 h-px bg-gradient-to-r from-orange-600 to-transparent" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ delay: i * 0.15 + 0.3, duration: 0.6 }} viewport={{ once: true }}></motion.div>
              )}
              <motion.div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-orange-500/50 transition" whileHover={{ scale: 1.05, borderColor: '#f97316' }}>
                <div className="text-3xl font-black text-orange-500 mb-3">{i + 1}</div>
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-slate-300">{step.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">Tudo que você precisa saber</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-slate-800 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                className="w-full p-6 bg-slate-900 hover:bg-slate-800/50 flex justify-between items-center transition text-left"
              >
                <span className="font-semibold">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-orange-500 transition ${openFAQ === i ? 'rotate-180' : ''}`} />
              </button>
              {openFAQ === i && (
                <div className="p-6 bg-slate-950 border-t border-slate-800">
                  <p className="text-slate-300 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Form */}
      <section id="cta" className="max-w-2xl mx-auto px-4 py-20">
        <div className="bg-gradient-to-br from-orange-600/20 to-slate-900 border-2 border-orange-600 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-2">Pronto para transformar comportamento em receita?</h2>
          <p className="text-slate-300 mb-8">
            Preencha os campos abaixo e nosso time entra em contato pelo WhatsApp ou e-mail com seu diagnóstico neurocognitivo.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome</label>
              <input
                type="text"
                placeholder="Seu nome"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:border-orange-600 focus:outline-none text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">WhatsApp</label>
              <input
                type="tel"
                placeholder="(11) 91234-5678"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:border-orange-600 focus:outline-none text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">E-mail</label>
              <input
                type="email"
                placeholder="voce@empresa.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:border-orange-600 focus:outline-none text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Conte rapidamente sobre seu negócio (opcional)</label>
              <textarea
                placeholder="Ex: tenho uma loja de suplementos e quero aumentar a conversão do checkout"
                value={formData.business}
                onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:border-orange-600 focus:outline-none text-white resize-none"
                rows="3"
              ></textarea>
            </div>

            <label className="flex items-start gap-3">
              <input type="checkbox" required className="mt-1" />
              <span className="text-sm text-slate-300">
                Concordo com o uso dos meus dados para contato, conforme a <a href="/politica-de-privacidade" className="text-orange-500 hover:underline">Política de Privacidade</a>
              </span>
            </label>

            <button
              type="submit"
              className="w-full px-6 py-4 bg-orange-600 hover:bg-orange-700 rounded-lg font-bold text-lg transition transform hover:scale-105"
            >
              Solicitar diagnóstico gratuito
            </button>
          </form>

          <p className="text-center text-slate-400 text-xs mt-4">
            Sem compromisso · resposta em até 24h
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4 flex items-center gap-2"><div className="w-2 h-2 bg-orange-500 rounded-full"></div>Neuralabs</h3>
              <p className="text-slate-400 text-sm">Neurociência comportamental aplicada a produtos digitais. Diagnóstico, gatilhos cognitivos e design que converte.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#solucao" className="text-slate-400 hover:text-orange-500 transition">Solução</a></li>
                <li><a href="#processo" className="text-slate-400 hover:text-orange-500 transition">Processo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#faq" className="text-slate-400 hover:text-orange-500 transition">FAQ</a></li>
                <li><a href="#cta" className="text-slate-400 hover:text-orange-500 transition">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/politica-de-privacidade" className="text-slate-400 hover:text-orange-500 transition">Política de Privacidade</a></li>
                <li><a href="/termos-de-uso" className="text-slate-400 hover:text-orange-500 transition">Termos de Uso</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
            <p>© 2026 Neuralabs. Todos os direitos reservados.</p>
            <p className="mt-2">Feito com ciência, dados e um pouco de obsessão.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
