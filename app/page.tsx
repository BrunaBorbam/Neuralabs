'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { motion, useScroll, useInView } from 'framer-motion';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';

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
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
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

          if (dist < 200) {
            ctx.strokeStyle = `rgba(255, 140, 0, ${0.4 * (1 - dist / 200)})`;
            ctx.lineWidth = 1;
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
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

const Counter = ({ end, suffix }: { end: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const timer = setInterval(() => {
      start += end / 100;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-black text-orange-500">
        {count}
        {suffix}
      </div>
    </div>
  );
};

const LeadForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Discord webhook
      await fetch(process.env.NEXT_PUBLIC_DISCORD_WEBHOOK || '', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🔥 Novo lead: ${formData.name} | ${formData.email} | ${formData.company} | ${formData.phone}`,
        }),
      }).catch(() => {});

      // Google Analytics event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'lead_form_submit', { name: formData.name });
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', company: '', phone: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
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
        {submitted ? 'Recebido! Falamos em 24h.' : 'Agendar Demo Grátis'}
      </motion.button>
    </form>
  );
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const { scrollY } = useScroll();

  const problems = [
    { title: 'Sem Website Estratégico', desc: 'Você está invisível no mercado. Concorrentes vendem enquanto você perde leads.' },
    { title: 'Conversão Fraca', desc: 'Visitantes chegam mas não compram. Abandono é alto. ROI negativo em tráfego pago.' },
    { title: 'Sem Psicologia do Consumidor', desc: 'Layout genérico. Sem entender como o cérebro decide. Apenas esperança na conversão.' },
  ];

  const faqs = [
    { q: 'Quanto tempo leva?', a: '21 dias do briefing até o deploy em produção. 3 checkpoints você aprova.' },
    { q: 'Qual é o suporte?', a: '30 dias inclusos (email/WhatsApp 24h). Depois é seu — sem lock-in, sem assinatura mensal.' },
    { q: 'Qual é o ROI?', a: 'Média +20-40% conversão. Payback em 30 dias. E você fica com o site pra sempre.' },
    { q: 'Posso pedir mudanças?', a: 'Sim. Até 3 rounds de revisão estão inclusos no pacote.' },
    { q: 'Vocês fazem SEO?', a: 'Sim. SEO técnico, schema markup, e otimização de Core Web Vitals (LCP, CLS, FID).' },
    { q: 'Qual é o contrato?', a: '30 dias de suporte. Depois é seu site. Sem cláusulas de lock-in ou renovação automática.' },
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
      {/* Header */}
      <motion.header className="fixed top-0 z-50 w-full border-b border-orange-500/10 backdrop-blur-xl bg-[#0A0E27]/80" style={{ opacity: 1 }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-black">NEURALABS</div>
          <nav className="hidden md:flex gap-8">
            {['Sobre', 'Casos', 'Processo', 'FAQ', 'Contato'].map((item) => (
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
        {menuOpen && (
          <div className="md:hidden border-t border-orange-500/10 p-4 space-y-3">
            {['Sobre', 'Casos', 'Processo', 'FAQ', 'Contato'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="block text-sm hover:text-orange-400">
                {item}
              </a>
            ))}
          </div>
        )}
      </motion.header>

      {/* SEÇÃO 1: HERO */}
      <section className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <NeuralNetwork />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <motion.div className="inline-block px-4 py-2 bg-orange-500/20 border border-orange-500/50 rounded-full mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <span className="text-orange-400 text-sm font-bold">Apenas 2 spots disponíveis este mês</span>
            </motion.div>

            <motion.h1 className="text-7xl md:text-8xl font-black mb-6 leading-tight" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
              Onde Neurociência<br />
              <span className="text-orange-500">Vira Conversão</span>
            </motion.h1>

            <motion.p className="text-xl text-slate-300 mb-12 max-w-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              Websites que aumentam conversão em 20-40% usando 3D, neuromarketing e IA. Seu concorrente já está fazendo isso.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <a href="#demo" className="px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-lg font-bold transition transform hover:scale-105 text-center">
                Começar Demo
              </a>
              <a href="#casos" className="px-8 py-4 border-2 border-orange-500 hover:bg-orange-500/10 rounded-lg font-bold transition text-center">
                Ver Casos
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SEÇÃO 2: PROBLEMA */}
      <section id="problema" className="max-w-7xl mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6">Por que seus clientes não estão comprando?</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            A maioria das empresas trata conversão como problema de design ou tráfego. Na verdade, é neurociência aplicada.
          </p>
        </motion.div>

        <motion.div className="grid md:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {problems.map((p, i) => (
            <motion.div
              key={i}
              className="p-8 bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-xl hover:border-orange-500/50 transition backdrop-blur-sm"
              variants={itemVariants}
              whileHover={{ scale: 1.05, borderColor: 'rgba(255, 140, 0, 0.5)' }}
            >
              <h3 className="text-2xl font-bold text-orange-400 mb-4">{p.title}</h3>
              <p className="text-slate-300 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SEÇÃO 3: SOLUÇÃO */}
      <section className="max-w-7xl mx-auto px-4 py-24 bg-gradient-to-b from-orange-500/5 to-transparent">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6">Neuralabs resolve com 3 pilares</h2>
          <p className="text-xl text-slate-400">Design interativo + neuromarketing científico + SEO ponta</p>
        </motion.div>

        <motion.div className="grid md:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {[
            { title: '3D & Animações', desc: 'Design interativo que prende atenção e comunica autoridade.' },
            { title: 'Neuromarketing', desc: 'Psicologia científica da decisão de compra. Cada elemento tem propósito.' },
            { title: 'SEO & Performance', desc: 'Rápido, seguro, ranking Google. LCP < 2.5s. Lighthouse 90+.' },
          ].map((p, i) => (
            <motion.div key={i} className="p-8 bg-gradient-to-br from-slate-900/50 to-transparent border border-orange-500/20 rounded-xl" variants={itemVariants}>
              <div className="text-4xl font-black text-orange-500 mb-4">{i + 1}</div>
              <h3 className="text-2xl font-bold mb-3">{p.title}</h3>
              <p className="text-slate-300">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SEÇÃO 4: RESULTADOS */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6">Resultados que falam</h2>
        </motion.div>

        <motion.div className="grid md:grid-cols-4 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={itemVariants}>
            <Counter end={120} suffix="+" />
            <p className="text-slate-400 text-center mt-4">Sites implementados</p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Counter end={92} suffix="%" />
            <p className="text-slate-400 text-center mt-4">Taxa de retenção</p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Counter end={180} suffix="K" />
            <p className="text-slate-400 text-center mt-4">MRR clientes</p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <div className="text-5xl md:text-6xl font-black text-orange-500">-2.5s</div>
            <p className="text-slate-400 text-center mt-4">Tempo de carregamento</p>
          </motion.div>
        </motion.div>
      </section>

      {/* SEÇÃO 5: CASOS */}
      <section id="casos" className="max-w-7xl mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6">Estudos de caso reais</h2>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 gap-12" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {[
            { client: 'StylioShop', type: 'E-commerce', before: '1.2%', after: '3.8%', roi: '+R$ 39.000/mês', quote: 'O aumento em conversão pagou o site em 30 dias. Agora é puro lucro.' },
            { client: 'DataVault', type: 'SaaS', before: '0.8%', after: '2.5%', roi: '+R$ 75.000/mês', quote: 'Nosso funil melhorou drasticamente. O design 3D é profissional e credibilidade subiu.' },
          ].map((c, i) => (
            <motion.div
              key={i}
              className="p-8 bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-xl hover:border-orange-500/50 transition"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl font-bold mb-2">{c.client}</h3>
              <p className="text-orange-400 text-sm mb-6">{c.type}</p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-slate-400 text-xs">Antes</p>
                  <p className="text-xl font-bold">{c.before}</p>
                </div>
                <div className="text-center">
                  <ArrowRight className="w-6 h-6 mx-auto text-orange-500" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Depois</p>
                  <p className="text-xl font-bold text-orange-400">{c.after}</p>
                </div>
              </div>
              <p className="text-lg font-bold text-orange-500 mb-4">{c.roi}</p>
              <p className="text-slate-300 italic">"{c.quote}"</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SEÇÃO 6: PROCESSO */}
      <section id="processo" className="max-w-7xl mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6">Processo simples em 21 dias</h2>
        </motion.div>

        <motion.div className="grid md:grid-cols-4 gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {[
            { step: 'Kick-off', days: 'Dia 1-3', desc: 'Briefing + aprovação estratégia' },
            { step: 'Design', days: 'Dia 4-14', desc: '3 checkpoints, você aprova cada' },
            { step: 'Deploy', days: 'Dia 15-21', desc: 'Testes + produção + SEO' },
            { step: 'Suporte 30d', days: 'Dia 22-30', desc: 'Email/WhatsApp 24h ajustes' },
          ].map((p, i) => (
            <motion.div key={i} className="relative" variants={itemVariants}>
              {i < 3 && <div className="hidden md:block absolute top-12 -right-4 w-8 h-px bg-orange-500" />}
              <div className="p-6 bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-xl">
                <div className="text-3xl font-black text-orange-500 mb-3">{i + 1}</div>
                <h3 className="font-bold mb-2">{p.step}</h3>
                <p className="text-orange-400 text-sm mb-2">{p.days}</p>
                <p className="text-slate-300 text-sm">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SEÇÃO 7: DIFERENCIAL */}
      <section className="max-w-7xl mx-auto px-4 py-24 bg-gradient-to-b from-orange-500/5 to-transparent">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-16">Por que Neuralabs?</h2>

          <motion.div className="grid md:grid-cols-2 gap-8 mb-12" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              '40% mais barato que agências tradicionais',
              '3D nativo (não template)',
              'Neuromarketing = ciência, não gut feeling',
              'Suporte 30 dias = não é abandono',
              '21 dias = agências levam 60',
              'Seu site pra sempre = sem lock-in',
            ].map((item, i) => (
              <motion.div key={i} className="text-left p-6 bg-gradient-to-r from-orange-500/10 to-transparent border border-orange-500/20 rounded-lg" variants={itemVariants}>
                <p className="font-bold text-lg">{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* SEÇÃO 8: FAQ */}
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

      {/* SEÇÃO 9: CTA FINAL */}
      <section id="demo" className="max-w-4xl mx-auto px-4 py-24">
        <motion.div className="bg-gradient-to-br from-orange-500/20 to-transparent border-2 border-orange-500 rounded-2xl p-12 text-center backdrop-blur-sm" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-5xl font-black mb-6">Pronto para aumentar conversão?</h2>
          <p className="text-xl text-slate-300 mb-12">Vamos conversar sobre seu projeto. Sem compromisso. Resposta em 24h.</p>

          <LeadForm />

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <a href="https://wa.me/55119xxxx" className="px-6 py-3 text-orange-400 hover:text-orange-300 transition">
              Ou mande um WhatsApp
            </a>
          </div>
        </motion.div>
      </section>

      {/* SEÇÃO 10: FOOTER */}
      <footer className="border-t border-orange-500/10 px-4 py-12 text-center text-slate-500">
        <div className="max-w-7xl mx-auto mb-8">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-white mb-4">Neuralabs</h3>
              <p className="text-sm">Neurociência comportamental aplicada a produtos digitais.</p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Sobre</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-400 transition">Método</a></li>
                <li><a href="#" className="hover:text-orange-400 transition">Casos</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Blog</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-400 transition">Neurociência</a></li>
                <li><a href="#" className="hover:text-orange-400 transition">Design</a></li>
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
          <p className="text-xs">© 2026 Neuralabs. Neurociência comportamental aplicada a produtos digitais.</p>
        </div>
      </footer>
    </div>
  );
}
