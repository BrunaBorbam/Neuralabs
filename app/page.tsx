'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';

const NeuralNetwork3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const canvas = document.createElement('canvas');
    containerRef.current.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = containerRef.current.clientWidth;
    canvas.height = containerRef.current.clientHeight;

    const particles: any[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    const animate = () => {
      ctx.fillStyle = '#0A0E27';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.fillStyle = '#FF8C00';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.strokeStyle = `rgba(255, 140, 0, ${0.3 * (1 - dist / 150)})`;
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
      canvas.width = containerRef.current?.clientWidth || 0;
      canvas.height = containerRef.current?.clientHeight || 0;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.remove();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0" />;
};

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / 100;
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  const problems = [
    { title: 'Testes no Escuro', desc: 'Otimizações sem base em neurociência real.' },
    { title: 'Copy Desconectada', desc: 'Mensagens racionais ignoram a decisão emocional.' },
    { title: 'CRO Genérico', desc: 'Frameworks copiados sem entender seu público.' },
  ];

  const solutions = [
    { title: 'Mapas de Atenção', desc: 'Onde o usuário realmente olha e hesita.' },
    { title: 'Gatilhos Cognitivos', desc: 'Aplicamos vieses de decisão validados.' },
    { title: 'IA + Dados Reais', desc: 'Comportamento real cruza com padrões de fricção.' },
    { title: 'Arquitetura de Decisão', desc: 'Fluxos redesenhados para reduzir carga cognitiva.' },
  ];

  const faqs = [
    { q: 'Como vocês aplicam neurociência?', a: 'Heatmaps, gravações reais, entrevistas — não é teoria, é prática validada.' },
    { q: 'Quanto tempo leva?', a: 'Diagnóstico: 1-2 semanas. Desenvolvimento com princípios já aplicados: 4 semanas.' },
    { q: 'Qual é o diferencial?', a: 'CRO tradicional testa variações. Nós partimos do comportamento real do cérebro.' },
    { q: 'Funciona para qualquer negócio?', a: 'Melhor para quem já vende online e tem dados de tráfego.' },
    { q: 'Qual é o contrato?', a: 'Projeto único: diagnóstico + desenvolvimento + 30 dias de suporte. Sem vínculos pós-delivery.' },
    { q: 'Vocês atendem internacional?', a: 'Sim, brasileiros e internacionais. Hora PT/CT/ET para comunicação.' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-[#0A0E27] text-white overflow-x-hidden">
      {/* Header */}
      <motion.header style={{ opacity }} className="fixed top-0 z-50 w-full border-b border-orange-500/10 backdrop-blur-xl bg-[#0A0E27]/80">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-black">NEURALABS</div>
          <nav className="hidden md:flex gap-8">
            {['Solução', 'Método', 'Resultados', 'Processo', 'FAQ'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm hover:text-orange-400 transition">
                {item}
              </a>
            ))}
          </nav>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-orange-500/10 p-4 space-y-3">
            {['Solução', 'Método', 'Resultados', 'Processo', 'FAQ'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="block text-sm hover:text-orange-400">
                {item}
              </a>
            ))}
          </div>
        )}
      </motion.header>

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
        <NeuralNetwork3D />
        <motion.div className="relative z-10 max-w-5xl mx-auto px-4 text-center" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <motion.p className="text-orange-400 font-bold mb-6 tracking-widest" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            NEUROCIÊNCIA APLICADA
          </motion.p>
          <motion.h1 className="text-7xl md:text-8xl font-black mb-6 leading-tight" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
            Onde Neurociência<br />
            <span className="text-orange-500">Vira Conversão</span>
          </motion.h1>
          <motion.p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            95% das decisões de compra são inconscientes. Decodificamos o cérebro do seu cliente e transformamos comportamento em receita.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-lg font-bold transition transform hover:scale-105">
              Iniciar Diagnóstico
            </button>
            <button className="px-8 py-4 border-2 border-orange-500 hover:bg-orange-500/10 rounded-lg font-bold transition">
              Ver Casos
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Problem Section */}
      <section id="problema" className="max-w-7xl mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6">Otimizar sem entender o cérebro é jogar dinheiro fora</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            A maioria das empresas trata conversão como problema de design ou tráfego. Na verdade, é neurociência.
          </p>
        </motion.div>

        <motion.div className="grid md:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {problems.map((p, i) => (
            <motion.div key={i} className="p-8 bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-xl hover:border-orange-500/50 transition" variants={itemVariants} whileHover={{ scale: 1.05 }}>
              <h3 className="text-2xl font-bold text-orange-400 mb-4">{p.title}</h3>
              <p className="text-slate-300">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Solution Section */}
      <section id="solucao" className="max-w-7xl mx-auto px-4 py-24 bg-gradient-to-b from-orange-500/5 to-transparent">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6">O Método Neuralabs</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Neurociência comportamental + dados quantitativos + IA = método prova de resultado.
          </p>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {solutions.map((s, i) => (
            <motion.div key={i} className="p-8 bg-gradient-to-br from-slate-900/50 to-transparent border border-orange-500/20 rounded-xl" variants={itemVariants} whileHover={{ scale: 1.02 }}>
              <div className="text-4xl font-black text-orange-500 mb-4">{i + 1}</div>
              <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
              <p className="text-slate-300">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Results */}
      <section id="resultados" className="max-w-7xl mx-auto px-4 py-24">
        <motion.div className="grid md:grid-cols-4 gap-8 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          {[
            { value: 340, suffix: '%', label: 'Aumento médio de conversão' },
            { value: 1200, suffix: '+', label: 'Visitantes mês' },
            { value: 30, suffix: 'd', label: 'Tempo médio ROI' },
            { value: 5, suffix: 'a', label: 'Experiência em conversão' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
              <div className="text-5xl font-black text-orange-500 mb-2">
                <Counter value={item.value} suffix={item.suffix} />
              </div>
              <p className="text-slate-400">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Process */}
      <section id="processo" className="max-w-7xl mx-auto px-4 py-24">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-5xl md:text-6xl font-black text-center mb-16">
          Processo Claro e Transparente
        </motion.h2>

        <motion.div className="grid md:grid-cols-4 gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {[
            { title: 'Diagnóstico', desc: 'Auditoria completa com dados reais' },
            { title: 'Mapeamento', desc: 'Identificamos vieses cognitivos' },
            { title: 'Desenvolvimento', desc: 'Design aplicando neurociência' },
            { title: 'Suporte 30d', desc: 'Ajustes e otimizações contínuas' },
          ].map((s, i) => (
            <motion.div key={i} className="relative" variants={itemVariants}>
              {i < 3 && <div className="hidden md:block absolute top-12 -right-4 w-8 h-px bg-orange-500" />}
              <div className="p-6 bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-xl">
                <div className="text-3xl font-black text-orange-500 mb-3">{i + 1}</div>
                <h3 className="font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-slate-400">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-4xl mx-auto px-4 py-24">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-5xl md:text-6xl font-black text-center mb-16">
          Perguntas Frequentes
        </motion.h2>

        <motion.div className="space-y-4" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {faqs.map((faq, i) => (
            <motion.div key={i} className="border border-orange-500/20 rounded-lg overflow-hidden" variants={itemVariants}>
              <button
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                className="w-full p-6 bg-gradient-to-r from-orange-500/5 to-transparent hover:from-orange-500/10 flex justify-between items-center transition"
              >
                <span className="font-bold text-left">{faq.q}</span>
                <ChevronDown className={`transition ${openFAQ === i ? 'rotate-180' : ''}`} />
              </button>
              {openFAQ === i && (
                <motion.div className="p-6 bg-slate-950 border-t border-orange-500/20" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                  <p className="text-slate-300">{faq.a}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-24">
        <motion.div className="bg-gradient-to-br from-orange-500/20 to-transparent border-2 border-orange-500 rounded-xl p-12 text-center" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl font-black mb-6">Pronto para Transformar Comportamento em Receita?</h2>
          <p className="text-lg text-slate-300 mb-8">
            Diagnóstico gratuito. Sem compromisso. Resposta em 24h.
          </p>
          <motion.button className="px-10 py-4 bg-orange-500 hover:bg-orange-600 rounded-lg font-bold text-lg transition transform hover:scale-105" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Solicitar Diagnóstico
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-orange-500/10 px-4 py-12 text-center text-slate-500 text-sm">
        <p>© 2026 Neuralabs. Neurociência comportamental aplicada a produtos digitais.</p>
        <p className="mt-2">Diagnóstico, gatilhos cognitivos e design que converte.</p>
      </footer>
    </div>
  );
}
