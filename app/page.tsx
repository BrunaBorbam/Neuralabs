'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronDown, Menu, X, Brain, Zap, BarChart3, Lock } from 'lucide-react';

const NeuralNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: any[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 2.5 + 1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0A0E27';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.fillStyle = '#FF8C00';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            ctx.strokeStyle = `rgba(255, 140, 0, ${0.3 * (1 - dist / 180)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

const LeadForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch(process.env.NEXT_PUBLIC_DISCORD_WEBHOOK || '', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🧠 Novo lead neuro: ${formData.name} | ${formData.email} | ${formData.company} | ${formData.phone}`,
        }),
      }).catch(() => {});

      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'lead_form_submit', { name: formData.name });
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', company: '', phone: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Seu nome"
        required
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-orange-500 focus:outline-none text-white placeholder-white/50"
      />
      <input
        type="email"
        placeholder="seu@email.com"
        required
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-orange-500 focus:outline-none text-white placeholder-white/50"
      />
      <input
        type="text"
        placeholder="Sua empresa"
        value={formData.company}
        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-orange-500 focus:outline-none text-white placeholder-white/50"
      />
      <input
        type="tel"
        placeholder="(11) 9xxxx-xxxx"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-orange-500 focus:outline-none text-white placeholder-white/50"
      />
      <motion.button
        type="submit"
        className="w-full px-6 py-4 bg-orange-500 hover:bg-orange-600 rounded-lg font-bold transition"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {submitted ? 'Diagnóstico chegando em 24h' : 'Receber Diagnóstico Neuro Grátis'}
      </motion.button>
    </form>
  );
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const problems = [
    { title: 'Seu site não usa ciência', desc: 'Você coloca elementos "porque acha que funciona". Sem entender psicologia, é chute. Taxa de conversão = consequência.' },
    { title: 'Abandono é sintoma, não problema', desc: 'O visitante sai porque não ativou os gatilhos mentais certos. Layout bonito não vende se não ativa emoção.' },
    { title: 'Concorrente já está fazendo', desc: 'Quem aplica neuromarketing já tira conversão. Você está esperando o quê para começar?' },
  ];

  const solutions = [
    {
      title: 'Análise Neuro com IA',
      desc: 'Usamos Claude IA para analisar fundo o comportamento do seu público e psicologia de compra. Mapeamento real, não adivinhação.'
    },
    {
      title: 'Design Baseado em Ciência',
      desc: 'Cada cor, posição, palavra é escolhida por gatilhos mentais comprovados. Urgência, escassez, prova social, autoridade.'
    },
    {
      title: 'Otimização com Dados',
      desc: 'A/B testes, heatmaps, comportamento do usuário. Melhoramos cada semana baseado em números, não em opinião.'
    },
  ];

  const faqs = [
    { q: 'Como vocês usam IA para neuromarketing?', a: 'Usamos Claude IA para analisar fundo a psicologia do seu público, identificar gatilhos mentais e criar estratégia customizada. IA faz análise, nós implementamos no design.' },
    { q: 'Quanto é o investimento?', a: 'Starter R$ 9.990 (design base + análise neuro + 30 dias suporte). Pro R$ 14.990 (design premium + análise completa + 60 dias). Pague apenas se aprovado na demo.' },
    { q: 'Qual é o prazo?', a: '21 dias do briefing até deploy. 3 checkpoints você aprova. Depois é seu site, sem cláusulas de lock-in.' },
    { q: 'Vocês garantem +20-40% conversão?', a: 'Ninguém garante. MAS: estudos mostram que aplicar neuromarketing leva a +20-40%. Nós implementamos a ciência. Resultados dependem do seu produto, tráfego e público.' },
    { q: 'Como é o suporte?', a: '30 ou 60 dias de WhatsApp + email. Ajustes rápidos. Depois virou seu site, você mantém. Sem assinatura mensal eterna.' },
    { q: 'Somos nova empresa, vale a pena?', a: 'Vale MUITO. Novo significa sem vícios. Sem bagagem de 10 anos de "sempre fizemos assim". Somos ágeis, criativas, e aplicamos ciência atual.' },
  ];

  const process = [
    { step: 'Análise Neuro', days: 'Dia 1-3', icon: Brain, desc: 'Mapeamos psicologia do seu público com IA. Gatilhos, motivações, objeções.' },
    { step: 'Mapeamento Mental', days: 'Dia 4-7', icon: Zap, desc: 'Identificamos onde você perde visitantes. Por quê saem? Qual gatilho ativar?' },
    { step: 'Design Científico', days: 'Dia 8-18', icon: BarChart3, desc: '3D, layout, cores, copy. Tudo baseado em neurociência comprovada. 3 checkpoints você aprova.' },
    { step: 'Testes & Deploy', days: 'Dia 19-21', icon: Lock, desc: 'A/B testes, otimizações finais, deploy em produção. Monitoramento 30 dias.' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-[#0A0E27] text-white overflow-x-hidden">
      {/* HEADER */}
      <motion.header className="fixed top-0 z-50 w-full border-b border-orange-500/10 backdrop-blur-xl bg-[#0A0E27]/80">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-black">NEURALABS</div>
          <nav className="hidden md:flex gap-8">
            {['Método', 'Processo', 'FAQ', 'Contato'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm hover:text-orange-400 transition">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex gap-4 items-center">
            <a href="#demo" className="hidden sm:block px-6 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-bold text-sm transition">
              Demo
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <NeuralNetwork />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <motion.div className="inline-block px-4 py-2 bg-orange-500/20 border border-orange-500/50 rounded-full mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <span className="text-orange-400 text-sm font-bold">Ciência aplicada a conversão</span>
            </motion.div>

            <motion.h1 className="text-7xl md:text-8xl font-black mb-6 leading-tight" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
              Neurociência<br />
              <span className="text-orange-500">+ IA</span><br />
              <span className="text-slate-400">+ Design</span>
            </motion.h1>

            <motion.p className="text-xl text-slate-300 mb-12 max-w-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              Seus visitantes tomam 95% das decisões inconscientemente. Nós ativamos os gatilhos mentais certos com design, 3D e análise de IA.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <a href="#demo" className="px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-lg font-bold transition transform hover:scale-105 text-center">
                Diagnóstico Grátis
              </a>
              <a href="#metodo" className="px-8 py-4 border-2 border-orange-500 hover:bg-orange-500/10 rounded-lg font-bold transition text-center">
                Como funciona
              </a>
            </motion.div>

            <motion.p className="text-sm text-orange-400 mt-8 font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              Somos novos. Mais ágeis. Menos caros.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* PROBLEMA */}
      <section id="problema" className="max-w-7xl mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6">Por que seus clientes não compram?</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Você não entende a psicologia deles. Ninguém ensinou. Agora vamos.
          </p>
        </motion.div>

        <motion.div className="grid md:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {problems.map((p, i) => (
            <motion.div
              key={i}
              className="p-8 bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-xl hover:border-orange-500/50 transition backdrop-blur-sm"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-bold text-orange-400 mb-4">{p.title}</h3>
              <p className="text-slate-300 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SOLUÇÃO */}
      <section id="metodo" className="max-w-7xl mx-auto px-4 py-24 bg-gradient-to-b from-orange-500/5 to-transparent">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6">Como funciona Neuralabs</h2>
          <p className="text-xl text-slate-400">Neurociência + IA + Design Premium</p>
        </motion.div>

        <motion.div className="grid md:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {solutions.map((p, i) => (
            <motion.div key={i} className="p-8 bg-gradient-to-br from-slate-900/50 to-transparent border border-orange-500/20 rounded-xl" variants={itemVariants}>
              <div className="text-4xl font-black text-orange-500 mb-4">{i + 1}</div>
              <h3 className="text-2xl font-bold mb-3">{p.title}</h3>
              <p className="text-slate-300">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="mt-16 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed">
            Baseamos tudo em neurocientistas como Daniel Kahneman (nobel), Robert Cialdini (6 princípios de persuasão), e pesquisas modernas sobre decisão de compra.
            Não é magia. É ciência.
          </p>
        </motion.div>
      </section>

      {/* PROCESSO */}
      <section id="processo" className="max-w-7xl mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6">Processo: 21 dias</h2>
          <p className="text-xl text-slate-400">Do briefing ao seu site novo em produção</p>
        </motion.div>

        <motion.div className="grid md:grid-cols-4 gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {process.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={i} className="relative" variants={itemVariants}>
                {i < 3 && <div className="hidden md:block absolute top-12 -right-4 w-8 h-px bg-orange-500" />}
                <div className="p-6 bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-xl">
                  <Icon className="w-8 h-8 text-orange-500 mb-3" />
                  <h3 className="font-bold mb-2">{p.step}</h3>
                  <p className="text-orange-400 text-sm mb-3">{p.days}</p>
                  <p className="text-slate-300 text-sm">{p.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* DIFERENCIAL */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-16">Por que Neuralabs?</h2>

          <motion.div className="grid md:grid-cols-2 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              'Usamos IA (Claude) para análise real de comportamento',
              'Baseado em neurociência (Kahneman, Cialdini, pesquisa contemporânea)',
              'Design 3D nativo, não template',
              'Você aprova 3x durante o processo',
              'Suporte 30-60 dias. Depois é só seu',
              'R$ 9.990-14.990 vs agências 25k+',
            ].map((item, i) => (
              <motion.div key={i} className="text-left p-6 bg-gradient-to-r from-orange-500/10 to-transparent border border-orange-500/20 rounded-lg" variants={itemVariants}>
                <p className="font-bold text-lg">{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-4xl mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black">Perguntas Frequentes</h2>
        </motion.div>

        <motion.div className="space-y-4" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {faqs.map((faq, i) => (
            <motion.div key={i} className="border border-orange-500/20 rounded-lg overflow-hidden" variants={itemVariants}>
              <button
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                className="w-full p-6 bg-gradient-to-r from-orange-500/5 to-transparent hover:from-orange-500/10 flex justify-between items-center transition text-left"
              >
                <span className="font-bold text-lg">{faq.q}</span>
                <ChevronDown className={`transition ${openFAQ === i ? 'rotate-180' : ''}`} />
              </button>
              {openFAQ === i && (
                <motion.div className="p-6 bg-slate-950 border-t border-orange-500/20" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                  <p className="text-slate-300 leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA FINAL */}
      <section id="demo" className="max-w-4xl mx-auto px-4 py-24">
        <motion.div className="bg-gradient-to-br from-orange-500/20 to-transparent border-2 border-orange-500 rounded-2xl p-12 text-center backdrop-blur-sm" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-5xl font-black mb-4">Quer saber a verdade?</h2>
          <p className="text-xl text-slate-300 mb-4">Seu site está perdendo conversão POR FALTA DE NEUROCIÊNCIA</p>
          <p className="text-lg text-slate-400 mb-12">Vamos fazer um diagnóstico grátis. Você recebe uma análise honesta: quanto está perdendo e como recuperar.</p>

          <LeadForm />

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <a href="https://wa.me/55119xxxx" target="_blank" rel="noopener noreferrer" className="px-6 py-3 text-orange-400 hover:text-orange-300 transition">
              Ou mande um WhatsApp
            </a>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-orange-500/10 px-4 py-12 text-center text-slate-500">
        <div className="max-w-7xl mx-auto mb-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-white mb-4">Neuralabs</h3>
              <p className="text-sm">Neurociência + IA + Design. Conversão elevada ao científico.</p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#metodo" className="hover:text-orange-400 transition">Método</a></li>
                <li><a href="#processo" className="hover:text-orange-400 transition">Processo</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-400 transition">Privacy</a></li>
                <li><a href="#" className="hover:text-orange-400 transition">Terms</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Contato</h3>
              <p className="text-sm">ola@neuralabs.online</p>
              <p className="text-sm">WhatsApp: +55 11 9xxxx</p>
            </div>
          </div>
        </div>

        <div className="border-t border-orange-500/10 pt-8">
          <p className="text-xs">© 2026 Neuralabs. Neurociência + IA + Design = Conversão.</p>
        </div>
      </footer>
    </div>
  );
}
