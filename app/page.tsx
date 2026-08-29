'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronDown, Menu, X, Brain, Zap, BarChart3, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EcommerceMockup, SaasMockup } from '@/components/PortfolioMockup';

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
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        radius: Math.random() * 2 + 1.5,
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

const Counter = ({ end, suffix }: { end: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const timer = setInterval(() => {
      start += end / 80;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 25);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-black font-serif text-orange-500">
        {count}
        {suffix}
      </div>
    </div>
  );
};

const LeadForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '', consent: false });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.consent) {
      setError('Por favor, aceite o termo de privacidade para continuar.');
      return;
    }

    try {
      await fetch(process.env.NEXT_PUBLIC_DISCORD_WEBHOOK || '', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🧠 Novo lead: ${formData.name} | ${formData.email} | ${formData.company} | ${formData.phone}`,
        }),
      }).catch(() => {});

      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'lead_form_submit', { name: formData.name });
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', company: '', phone: '', consent: false });
      setError('');
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error:', error);
      setError('Houve um erro ao enviar. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-white mb-2">Nome completo</label>
        <input
          type="text"
          placeholder="Seu nome"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-lg focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-white placeholder-white/40 transition-all"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-white mb-2">Email</label>
        <input
          type="email"
          placeholder="seu@email.com"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-lg focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-white placeholder-white/40 transition-all"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-white mb-2">Empresa (opcional)</label>
        <input
          type="text"
          placeholder="Sua empresa"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-lg focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-white placeholder-white/40 transition-all"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-white mb-2">WhatsApp</label>
        <input
          type="tel"
          placeholder="(11) 9xxxx-xxxx"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-lg focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-white placeholder-white/40 transition-all"
        />
      </div>

      <label className="flex items-start gap-3 p-4 bg-orange-500/10 rounded-lg border border-orange-500/30 cursor-pointer hover:border-orange-500/60 hover:bg-orange-500/15 transition-all">
        <input
          type="checkbox"
          required
          checked={formData.consent}
          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
          className="mt-1 w-5 h-5 accent-orange-500 cursor-pointer"
        />
        <span className="text-sm text-slate-200 leading-relaxed">
          Concordo em receber o diagnóstico gratuito e entendo que meus dados serão protegidos conforme a <a href="/privacy" target="_blank" rel="noopener" className="text-orange-400 hover:text-orange-300 font-semibold underline">Lei Geral de Proteção de Dados (LGPD)</a>.
        </span>
      </label>

      {error && <motion.p className="text-red-400 text-sm font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.p>}

      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={!formData.consent || !formData.name || !formData.email}>
        {submitted ? '✓ Diagnóstico chegando em 24h' : 'Receber Diagnóstico Grátis'}
      </Button>
    </form>
  );
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-slate-850 text-white overflow-x-hidden">
      {/* HEADER */}
      <motion.header className="fixed top-0 z-50 w-full border-b border-border-light backdrop-blur-xl bg-slate-850/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-black font-serif">NEURALABS</div>
          <nav className="hidden md:flex gap-8">
            {['Método', 'Portfólio', 'Preços', 'Processo', 'FAQ'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm hover:text-orange-500 transition">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex gap-4 items-center">
            <Button variant="primary" size="sm" className="hidden sm:flex">
              Demo
            </Button>
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

        <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <Badge variant="primary">✨ Ciência aplicada a conversão</Badge>
            </motion.div>

            <motion.h1
              className="text-7xl md:text-8xl font-black font-serif mb-8 leading-tight mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Neurociência<br />
              <span className="text-orange-500">+ IA</span><br />
              <span className="text-slate-400">+ Design</span>
            </motion.h1>

            <motion.p
              className="text-xl text-slate-300 mb-12 max-w-xl leading-relaxed font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              95% das decisões são inconscientes. Ativamos os gatilhos mentais certos com design, 3D e IA.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button variant="primary" size="lg" className="group">
                Diagnóstico Grátis <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">Como funciona</Button>
            </motion.div>

            <motion.p
              className="text-sm text-orange-400 font-bold tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              🚀 Somos novos. Mais ágeis. Menos caros.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* PROBLEMA */}
      <section id="metodo" className="max-w-7xl mx-auto px-6 py-40">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h2 className="text-6xl md:text-7xl font-black font-serif mb-8 leading-tight">Por que seus clientes não compram?</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">Sem entender a psicologia deles, é só chute.</p>
          </motion.div>
        </motion.div>

        <motion.div className="grid md:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {[
            { title: 'Sem ciência', desc: 'Layout bonito não vende se não ativa emoção.' },
            { title: 'Abandono alto', desc: 'O visitante sai porque não ativou os gatilhos mentais.' },
            { title: 'Concorrente adiantado', desc: 'Quem aplica neuromarketing já tira conversão.' },
          ].map((p, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card variant="gradient">
                <h3 className="text-2xl font-bold text-orange-400 mb-4">{p.title}</h3>
                <p className="text-slate-300">{p.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SOLUÇÃO */}
      <section className="max-w-7xl mx-auto px-6 py-40 bg-gradient-to-b from-orange-500/5 to-transparent">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h2 className="text-6xl md:text-7xl font-black font-serif mb-8 leading-tight">Como funciona Neuralabs</h2>
            <p className="text-xl text-slate-400 font-light">Neurociência + IA + Design Premium</p>
          </motion.div>
        </motion.div>

        <motion.div className="grid md:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {[
            { title: 'Análise Neuro com IA', desc: 'Claude IA analisa psicologia do seu público real.' },
            { title: 'Design Científico', desc: 'Cada elemento ativa gatilhos mentais comprovados.' },
            { title: 'Otimização com Dados', desc: 'A/B tests, heatmaps, métricas reais.' },
          ].map((p, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card variant="surface">
                <div className="text-4xl font-black text-orange-500 mb-4">{i + 1}</div>
                <h3 className="text-2xl font-bold mb-3 font-serif">{p.title}</h3>
                <p className="text-slate-300">{p.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* PORTFÓLIO */}
      <section id="portfolio" className="max-w-7xl mx-auto px-6 py-40 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h2 className="text-6xl md:text-7xl font-black font-serif mb-8 leading-tight">Exemplos de Design Neuromarketing</h2>
            <p className="text-xl text-slate-400 font-light">Dois tipos de negócios. Psicologia científica aplicada.</p>
          </motion.div>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 gap-16 items-center" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold font-serif mb-6 text-orange-400">E-commerce: Cosméticos Naturais</h3>
            <div className="space-y-4 mb-8">
              <div>
                <p className="text-sm text-slate-400 uppercase tracking-wide mb-2">Gatilhos Aplicados</p>
                <ul className="space-y-2 text-slate-300">
                  <li>✓ <span className="text-orange-400">Escassez:</span> "Apenas 3 em estoque"</li>
                  <li>✓ <span className="text-orange-400">Urgência:</span> Countdown 24h</li>
                  <li>✓ <span className="text-orange-400">Prova Social:</span> "42 pessoas hoje"</li>
                  <li>✓ <span className="text-orange-400">Autoridade:</span> Certificações</li>
                </ul>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 mt-6">
                <p className="text-sm text-slate-300">
                  <span className="text-orange-400 font-bold">Resultado esperado:</span> +25-35% conversão vs design genérico
                </p>
              </div>
            </div>
            <Badge variant="primary">Modelo STARTER</Badge>
          </motion.div>

          <motion.div variants={itemVariants}>
            <EcommerceMockup />
          </motion.div>
        </motion.div>

        {/* SaaS */}
        <motion.div className="grid md:grid-cols-2 gap-16 items-center mt-32" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={itemVariants} className="md:order-2">
            <h3 className="text-3xl font-bold font-serif mb-6 text-orange-400">SaaS: Plataforma de BI</h3>
            <div className="space-y-4 mb-8">
              <div>
                <p className="text-sm text-slate-400 uppercase tracking-wide mb-2">Gatilhos Aplicados</p>
                <ul className="space-y-2 text-slate-300">
                  <li>✓ <span className="text-orange-400">FOMO:</span> "500+ empresas usam"</li>
                  <li>✓ <span className="text-orange-400">Reciprocidade:</span> "Trial 30 dias"</li>
                  <li>✓ <span className="text-orange-400">Autoridade:</span> Logos clientes</li>
                  <li>✓ <span className="text-orange-400">Urgência:</span> "Limite 10 trials"</li>
                </ul>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 mt-6">
                <p className="text-sm text-slate-300">
                  <span className="text-orange-400 font-bold">Resultado esperado:</span> +40-50% lead quality vs genérico
                </p>
              </div>
            </div>
            <Badge variant="primary">Modelo PROFESSIONAL</Badge>
          </motion.div>

          <motion.div variants={itemVariants} className="md:order-1">
            <SaasMockup />
          </motion.div>
        </motion.div>
      </section>

      {/* PREÇOS */}
      <section id="precos" className="max-w-7xl mx-auto px-6 py-40">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h2 className="text-6xl md:text-7xl font-black font-serif mb-8 leading-tight">Preços Realistas</h2>
            <p className="text-xl text-slate-400 font-light">Sem enganação. Você recebe valor REAL.</p>
          </motion.div>
        </motion.div>

        <motion.div className="grid md:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {[
            { name: 'STARTER', price: '9.990', items: ['Landing + análise neuro', 'Design base + 3D', '30 dias suporte', 'Análise com IA'] },
            { name: 'PROFESSIONAL', price: '19.990', items: ['5 páginas completas', 'Análise neuro profunda', '3D animações', '60 dias suporte'], highlight: true },
            { name: 'ENTERPRISE', price: '35k+', items: ['Multipage + e-commerce', 'Análise completa + workshops', 'Integrações custom', 'Suporte continuado'] },
          ].map((plan, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card variant={plan.highlight ? 'accent' : 'glass'}>
                <h3 className="text-2xl font-bold font-serif mb-2">{plan.name}</h3>
                <div className="text-4xl font-black text-orange-500 mb-6">R$ {plan.price}</div>
                <ul className="space-y-3 mb-8">
                  {plan.items.map((item, j) => (
                    <li key={j} className="flex gap-2 text-sm">
                      <span className="text-orange-500">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button variant={plan.highlight ? 'primary' : 'outline'} size="lg" className="w-full">
                  {plan.highlight ? 'Começar Agora' : 'Saiba Mais'}
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* PROCESSO */}
      <section id="processo" className="max-w-7xl mx-auto px-6 py-40">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h2 className="text-6xl md:text-7xl font-black font-serif mb-8 leading-tight">Processo: 21 dias</h2>
            <p className="text-xl text-slate-400 font-light">Do briefing ao deploy em produção</p>
          </motion.div>
        </motion.div>

        <motion.div className="grid md:grid-cols-4 gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {[
            { step: 'Análise Neuro', days: 'Dia 1-3', icon: Brain },
            { step: 'Mapeamento', days: 'Dia 4-7', icon: Zap },
            { step: 'Design', days: 'Dia 8-18', icon: BarChart3 },
            { step: 'Deploy', days: 'Dia 19-21', icon: Lock },
          ].map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={i} variants={itemVariants}>
                <Card variant="glass">
                  <Icon className="w-8 h-8 text-orange-500 mb-4" />
                  <h3 className="font-bold mb-2 font-serif">{p.step}</h3>
                  <p className="text-orange-400 text-sm">{p.days}</p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* NEUROCIÊNCIA EM AÇÃO */}
      <section className="max-w-7xl mx-auto px-6 py-40">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h2 className="text-6xl md:text-7xl font-black font-serif mb-8 leading-tight">Neurociência em Ação</h2>
            <p className="text-xl text-slate-400 font-light">Veja como os gatilhos mentais funcionam em tempo real</p>
          </motion.div>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 gap-12" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {[
            {
              title: 'GATILHO: Escassez',
              desc: 'Quando algo é limitado, ativa urgência no cérebro.',
              example: '"Apenas 2 spots disponíveis este mês"',
              effect: 'Conversão +18-25%',
            },
            {
              title: 'GATILHO: Prova Social',
              desc: 'Vemos que outros confiam, nós também confiamos.',
              example: '"500+ empresas já usam"',
              effect: 'Conversão +15-20%',
            },
            {
              title: 'GATILHO: Urgência',
              desc: 'Prazo curto força decisão rápida (sem análise paralisa).',
              example: 'Countdown 24h para aplicar',
              effect: 'Conversão +12-18%',
            },
            {
              title: 'GATILHO: Autoridade',
              desc: 'Certificações e prova de expertise aumentam confiança.',
              example: 'Badges, depoimentos, certificados',
              effect: 'Conversão +10-15%',
            },
          ].map((item, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card variant="glass">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold font-serif text-orange-400 mb-2">{item.title}</h3>
                  <p className="text-slate-300">{item.desc}</p>
                </div>

                <motion.div
                  className="bg-slate-900/50 border border-orange-500/30 rounded-lg p-4 my-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <p className="text-sm text-slate-300 italic">"{item.example}"</p>
                </motion.div>

                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <p className="text-sm font-bold text-green-400">{item.effect}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            <span className="text-orange-400 font-bold">Combine esses 4 gatilhos</span> e você tem um site que <span className="text-orange-400 font-bold">vende de verdade</span>.
          </p>
          <p className="text-slate-400">Neurociência não é magia. É ciência aplicada. Funciona porque é assim que o cérebro humano REALMENTE funciona.</p>
        </motion.div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-4xl mx-auto px-6 py-40">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h2 className="text-6xl md:text-7xl font-black font-serif leading-tight">Perguntas Frequentes</h2>
          </motion.div>
        </motion.div>

        <motion.div className="space-y-3" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {[
            { q: 'Como vocês usam IA?', a: 'Claude IA analisa psicologia do seu público. Identificamos gatilhos mentais e criamos estratégia customizada.' },
            { q: 'Quanto é o investimento?', a: 'STARTER R$ 9.990 | PROFESSIONAL R$ 19.990 | ENTERPRISE custom. Sem surpresas.' },
            { q: 'Qual é o prazo?', a: '21 dias do briefing até deploy. Você aprova em 3 checkpoints.' },
            { q: 'Vocês garantem +20-40%?', a: 'Ninguém garante. MAS: estudos mostram que neuromarketing leva a +20-40%. Nós implementamos a ciência.' },
            { q: 'Como é o suporte?', a: '30-60 dias de email/WhatsApp. Depois é seu site, você mantém. Sem assinatura mensal.' },
            { q: 'Somos nova empresa, vale?', a: 'Vale MUITO. Novo = sem vícios. Sem "sempre fizemos assim". Ágeis. Aplicamos ciência atual.' },
          ].map((faq, i) => (
            <motion.div key={i} className="border border-white/10 rounded-xl overflow-hidden bg-white/5 hover:bg-white/10 hover:border-orange-500/30 transition-all" variants={itemVariants}>
              <button
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                className="w-full p-6 flex justify-between items-center text-left font-semibold hover:text-orange-400 transition-colors"
              >
                <span className="text-lg">{faq.q}</span>
                <motion.div animate={{ rotate: openFAQ === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{ height: openFAQ === i ? 'auto' : 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 border-t border-white/10 text-slate-300">
                  {faq.a}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA FINAL */}
      <section className="max-w-4xl mx-auto px-6 py-40">
        <motion.div className="bg-gradient-to-br from-orange-500/15 via-orange-500/5 to-transparent border-2 border-orange-500/40 rounded-3xl p-16 text-center backdrop-blur-xl hover:border-orange-500/60 hover:from-orange-500/20 transition-all" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-5xl md:text-6xl font-black font-serif mb-6 leading-tight">Quer saber a verdade?</h2>
          <p className="text-xl text-slate-300 mb-16 font-light">Seu site está perdendo conversão por FALTA DE NEUROCIÊNCIA. Deixe-nos fazer o diagnóstico gratuito.</p>
          <LeadForm />
          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm mb-3">Preferir conversar direto?</p>
            <a href="https://wa.me/55119xxxx" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold transition-colors">
              💬 Iniciar conversa no WhatsApp
            </a>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border-light px-6 py-16 text-center text-slate-500">
        <div className="max-w-7xl mx-auto mb-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-bold text-white mb-4 font-serif">Neuralabs</h3>
              <p className="text-sm">Neurociência + IA + Design = Conversão</p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#metodo" className="hover:text-orange-400">Método</a></li>
                <li><a href="#precos" className="hover:text-orange-400">Preços</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/privacy" className="hover:text-orange-400">Política de Privacidade</a></li>
                <li><a href="mailto:ola@neuralabs.online" className="hover:text-orange-400">Contato</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Contato</h3>
              <p className="text-sm">ola@neuralabs.online</p>
              <p className="text-sm">+55 11 9xxxx</p>
            </div>
          </div>
        </div>
        <div className="border-t border-border-light pt-8">
          <p className="text-xs">© 2026 Neuralabs. Neurociência + IA + Design.</p>
        </div>
      </footer>
    </div>
  );
}
