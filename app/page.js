'use client';

import { useState } from 'react';
import { ChevronDown, Brain, ArrowRight, Menu, X } from 'lucide-react';

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
      name: 'Órbita',
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
    <div className="bg-slate-950 text-white min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-900 bg-slate-950/95 backdrop-blur">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-black">Neuralabs</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#solucao" className="text-sm hover:text-blue-400 transition">Solução</a>
            <a href="#diferenciais" className="text-sm hover:text-blue-400 transition">Diferenciais</a>
            <a href="#trabalhos" className="text-sm hover:text-blue-400 transition">Trabalhos</a>
            <a href="#processo" className="text-sm hover:text-blue-400 transition">Processo</a>
            <a href="#faq" className="text-sm hover:text-blue-400 transition">FAQ</a>
            <a href="#cta" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold transition">
              Solicitar diagnóstico
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-900 px-4 py-4 space-y-3">
            <a href="#solucao" className="block text-sm py-2 hover:text-blue-400">Solução</a>
            <a href="#diferenciais" className="block text-sm py-2 hover:text-blue-400">Diferenciais</a>
            <a href="#trabalhos" className="block text-sm py-2 hover:text-blue-400">Trabalhos</a>
            <a href="#processo" className="block text-sm py-2 hover:text-blue-400">Processo</a>
            <a href="#faq" className="block text-sm py-2 hover:text-blue-400">FAQ</a>
            <a href="#cta" className="block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold text-center">
              Solicitar diagnóstico
            </a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="top" className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <p className="text-blue-400 font-semibold mb-4">NEUROCIÊNCIA APLICADA A PERFORMANCE</p>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Onde Neurociência<br /><span className="text-blue-400">Vira Conversão</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              95% das decisões de compra são inconscientes. A Neuralabs decodifica o cérebro do seu usuário e transforma comportamento em receita.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="#cta" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition transform hover:scale-105">
                Solicitar diagnóstico gratuito
              </a>
              <a href="#solucao" className="px-8 py-4 border-2 border-blue-600 hover:bg-blue-600/10 rounded-lg font-bold transition">
                Ver como funciona
              </a>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-16 border-t border-slate-800 pt-8">
              <div>
                <p className="text-3xl font-black text-blue-400">100%</p>
                <p className="text-sm text-slate-400 mt-2">método baseado em neurociência</p>
              </div>
              <div>
                <p className="text-3xl font-black text-blue-400">30 dias</p>
                <p className="text-sm text-slate-400 mt-2">de suporte incluso</p>
              </div>
              <div>
                <p className="text-3xl font-black text-blue-400">24h</p>
                <p className="text-sm text-slate-400 mt-2">tempo médio de resposta</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problema" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-4 text-center">Otimizar sem entender o cérebro é jogar dinheiro fora</h2>
        <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
          A maioria das empresas trata conversão como um problema de design ou de tráfego — quando, na verdade, é um problema de neurociência.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, i) => (
            <div key={i} className="p-8 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-blue-600/50 transition">
              <h3 className="text-xl font-bold mb-3 text-blue-400">{problem.title}</h3>
              <p className="text-slate-300 leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Solution Section */}
      <section id="solucao" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-4 text-center">O Método Neuralabs</h2>
        <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
          Combinamos neurociência comportamental, dados quantitativos e inteligência artificial em um método prova de resultado.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {solutions.map((solution, i) => (
            <div key={i} className="p-8 bg-slate-900/50 border border-slate-800 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-blue-400">{solution.title}</h3>
              <p className="text-slate-300">{solution.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="#processo" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold">
            Ver o processo completo <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Audiences */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h3 className="text-center text-slate-400 text-sm mb-8">Feito para quem vende online</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {audiences.map((audience, i) => (
            <div key={i} className="text-center py-4 px-3 bg-slate-900/50 rounded-lg border border-slate-800">
              <p className="text-sm font-medium">{audience}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio */}
      <section id="trabalhos" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-4 text-center">Trabalhos</h2>
        <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
          Conceitos que mostram o método na prática. Como somos uma agência nova, estes são projetos de demonstração — não clientes reais.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {portfolio.map((work, i) => (
            <a key={i} href={`/trabalhos/${work.name.toLowerCase()}`} className="group">
              <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800 hover:border-blue-600 transition">
                <div className="bg-gradient-to-br from-blue-600/20 to-slate-900 h-48 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold">{work.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-blue-400 text-sm font-semibold mb-2">{work.category}</p>
                  <h4 className="text-lg font-bold mb-2">{work.name}</h4>
                  <p className="text-slate-300">{work.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Diferenciais */}
      <section id="diferenciais" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-4 text-center">Direto ao ponto, rigoroso no método</h2>

        <div className="grid md:grid-cols-2 gap-12 mb-12 mt-12">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="text-3xl font-black text-blue-400">4</div>
              <div>
                <p className="font-semibold">pilares no Método Neuralabs</p>
                <p className="text-slate-400 text-sm">Diagnóstico, mapeamento, design e suporte</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-3xl font-black text-blue-400">30</div>
              <div>
                <p className="font-semibold">dias de suporte incluso em cada entrega</p>
                <p className="text-slate-400 text-sm">Ajustes, refinamentos e treinamento</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-3xl font-black text-blue-400">24h</div>
              <div>
                <p className="font-semibold">tempo médio de primeira resposta</p>
                <p className="text-slate-400 text-sm">Comunicação rápida e assíncrona</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8">
            <p className="text-slate-300 mb-4">
              Somos uma agência nova — e isso trabalha a seu favor. Sem fila de espera, sem conta gerenciada por junior.
            </p>
            <p className="text-slate-300">
              <span className="font-bold text-blue-400">Turma de fundação</span> com condição especial e vagas limitadas por mês.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="processo" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-4 text-center">Um processo claro, do diagnóstico à entrega</h2>
        <p className="text-center text-slate-400 mb-12">Como funciona</p>

        <div className="grid md:grid-cols-4 gap-6">
          {process.map((step, i) => (
            <div key={i} className="relative">
              {i < process.length - 1 && (
                <div className="hidden md:block absolute top-12 right-0 w-full h-px bg-gradient-to-r from-blue-600 to-transparent" style={{left: '100%', width: 'calc(100% + 1.5rem)'}}></div>
              )}
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 relative z-10">
                <div className="text-3xl font-black text-blue-400 mb-2">{i + 1}</div>
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-slate-300">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
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
                <span className="font-semibold text-base">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-blue-400 transition flex-shrink-0 ${openFAQ === i ? 'rotate-180' : ''}`} />
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
        <div className="bg-gradient-to-br from-blue-900/30 to-slate-900 border-2 border-blue-600 rounded-lg p-8">
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
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:border-blue-600 focus:outline-none text-white"
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
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:border-blue-600 focus:outline-none text-white"
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
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:border-blue-600 focus:outline-none text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Conte rapidamente sobre seu negócio (opcional)</label>
              <textarea
                placeholder="Ex: tenho uma loja de suplementos e quero aumentar a conversão do checkout"
                value={formData.business}
                onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:border-blue-600 focus:outline-none text-white resize-none"
                rows="3"
              ></textarea>
            </div>

            <label className="flex items-start gap-3">
              <input type="checkbox" required className="mt-1" />
              <span className="text-sm text-slate-300">
                Concordo com o uso dos meus dados para contato, conforme a <a href="/politica-de-privacidade" className="text-blue-400 hover:underline">Política de Privacidade</a>
              </span>
            </label>

            <button
              type="submit"
              className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold text-lg transition transform hover:scale-105"
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
              <h3 className="font-bold mb-4">Neuralabs</h3>
              <p className="text-slate-400 text-sm">Neurociência comportamental aplicada a produtos digitais. Diagnóstico, gatilhos cognitivos e design que converte.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#solucao" className="text-slate-400 hover:text-blue-400 transition">Solução</a></li>
                <li><a href="#diferenciais" className="text-slate-400 hover:text-blue-400 transition">Diferenciais</a></li>
                <li><a href="#processo" className="text-slate-400 hover:text-blue-400 transition">Processo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#faq" className="text-slate-400 hover:text-blue-400 transition">FAQ</a></li>
                <li><a href="#cta" className="text-slate-400 hover:text-blue-400 transition">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/politica-de-privacidade" className="text-slate-400 hover:text-blue-400 transition">Política de Privacidade</a></li>
                <li><a href="/termos-de-uso" className="text-slate-400 hover:text-blue-400 transition">Termos de Uso</a></li>
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
