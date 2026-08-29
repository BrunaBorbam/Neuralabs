'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { trackFormSubmit, trackButtonClick, trackEvent, initScrollTracking, trackPageDuration } from '@/lib/ga';
import { PortfolioSection } from '@/components/PortfolioSection';

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const whatsappNumber = '5551981234567';

  useEffect(() => {
    initScrollTracking();
    trackPageDuration();
  }, []);

  return (
    <>
      <style>{`
        :root {
          --color-primary: #FF6B35;
          --color-secondary: #2D3142;
          --color-accent: #F4A261;
          --color-neutral: #F5F3F0;
          --color-dark: #1A1D2E;
          --color-light: #FFFFFF;
          --color-text: #2D2D2D;
          --color-border: #E8E6E1;

          --font-display: 'Playfair Display', serif;
          --font-body: 'Inter', sans-serif;
          --font-mono: 'JetBrains Mono', monospace;

          --spacing-xs: 0.5rem;
          --spacing-sm: 1rem;
          --spacing-md: 1.5rem;
          --spacing-lg: 2rem;
          --spacing-xl: 3rem;
          --spacing-2xl: 4rem;

          --radius-sm: 8px;
          --radius-md: 12px;
          --radius-lg: 16px;
        }

        @media (prefers-color-scheme: dark) {
          :root:not([data-theme="light"]) {
            --color-neutral: #1A1D2E;
            --color-dark: #F5F3F0;
            --color-light: #2D3142;
            --color-text: #E8E6E1;
            --color-border: #3D4052;
          }
        }

        :root[data-theme="dark"] {
          --color-neutral: #1A1D2E;
          --color-dark: #F5F3F0;
          --color-light: #2D3142;
          --color-text: #E8E6E1;
          --color-border: #3D4052;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: auto;
        }

        body {
          font-family: var(--font-body);
          background: var(--color-neutral);
          color: var(--color-text);
          line-height: 1.6;
        }

        /* HEADER */
        header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: var(--color-neutral);
          border-bottom: 1px solid var(--color-border);
          backdrop-filter: blur(10px);
          padding: var(--spacing-md) var(--spacing-lg);
        }

        nav {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-primary);
          text-decoration: none;
        }

        .nav-links {
          display: flex;
          gap: var(--spacing-lg);
          list-style: none;
        }

        .nav-links a {
          text-decoration: none;
          color: var(--color-text);
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .nav-links a:hover {
          color: var(--color-primary);
        }

        .cta-header {
          background: var(--color-primary);
          color: var(--color-light);
          padding: var(--spacing-sm) var(--spacing-lg);
          border-radius: var(--radius-md);
          text-decoration: none;
          font-weight: 600;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: inline-block;
        }

        .cta-header:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(255, 107, 53, 0.3);
        }

        /* HERO */
        .hero {
          background: var(--color-light);
          padding: var(--spacing-2xl) var(--spacing-lg);
          max-width: 100%;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-2xl);
          align-items: center;
        }

        .hero-content {
          max-width: 600px;
        }

        .urgency-badge {
          display: inline-block;
          background: #FFE5D9;
          color: var(--color-primary);
          padding: var(--spacing-sm) var(--spacing-lg);
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: var(--spacing-lg);
        }

        .hero-content h1 {
          font-family: var(--font-display);
          font-size: 3.5rem;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: var(--spacing-lg);
          color: var(--color-text);
        }

        .hero-content h1 .highlight {
          color: var(--color-primary);
        }

        .hero-content p {
          font-size: 1.1rem;
          color: var(--color-text);
          margin-bottom: var(--spacing-md);
          line-height: 1.8;
        }

        .hero-cta {
          display: flex;
          gap: var(--spacing-md);
          margin-top: var(--spacing-xl);
        }

        .btn-primary, .btn-secondary {
          padding: var(--spacing-md) var(--spacing-xl);
          border-radius: var(--radius-md);
          text-decoration: none;
          font-weight: 700;
          font-size: 1rem;
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-sm);
          transition: background-color 0.2s ease, color 0.2s ease;
          border: none;
          cursor: pointer;
        }

        .btn-primary {
          background: var(--color-primary);
          color: var(--color-light);
        }

        .btn-primary:hover {
          background: #E55A27;
        }

        .btn-secondary {
          background: var(--color-light);
          color: var(--color-primary);
          border: 2px solid var(--color-primary);
        }

        .btn-secondary:hover {
          background: var(--color-primary);
          color: var(--color-light);
        }

        .hero-image {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .profile-circle {
          width: 350px;
          height: 350px;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border: 3px solid var(--color-primary);
        }

        .profile-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          background: linear-gradient(135deg, #FF6B35, #F4A261);
        }

        /* SECTIONS */
        .section {
          padding: var(--spacing-2xl) var(--spacing-lg);
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-title {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--color-text);
          margin-bottom: var(--spacing-xl);
          text-align: center;
        }

        .about {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-2xl);
        }

        .about-content h3 {
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--color-text);
          margin-bottom: var(--spacing-md);
          margin-top: var(--spacing-lg);
        }

        .about-content p {
          margin-bottom: var(--spacing-md);
          line-height: 1.8;
        }

        .expertise-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-lg);
          margin-top: var(--spacing-xl);
        }

        .expertise-item {
          padding: var(--spacing-lg);
          background: #F5F3F0;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
        }

        .expertise-item h4 {
          font-size: 1.2rem;
          margin-bottom: var(--spacing-sm);
          color: var(--color-text);
        }

        .expertise-item p {
          font-size: 0.95rem;
          color: #666;
          margin: 0;
        }

        /* METHODOLOGY */
        .methodology {
          background: var(--color-secondary);
          color: var(--color-light);
          padding: var(--spacing-2xl) var(--spacing-lg);
        }

        .methodology .section-title {
          color: var(--color-light);
        }

        .method-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-lg);
          max-width: 1200px;
          margin: 0 auto;
        }

        .method-card {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: var(--spacing-xl);
          border-radius: var(--radius-lg);
          text-align: center;
          transition: background-color 0.2s ease, border-color 0.2s ease;
        }

        .method-card:hover {
          background: rgba(255, 107, 53, 0.1);
          border-color: var(--color-primary);
        }

        .method-icon {
          font-size: 3rem;
          margin-bottom: var(--spacing-lg);
        }

        .method-card h3 {
          font-size: 1.5rem;
          margin-bottom: var(--spacing-md);
          color: var(--color-light);
        }

        .method-card p {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.8;
        }

        /* PRICING */
        .pricing {
          background: var(--color-light);
          padding: var(--spacing-2xl) var(--spacing-lg);
        }

        .pricing-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-2xl);
          max-width: 1200px;
          margin: 0 auto;
        }

        .price-box {
          background: var(--color-light);
          border: 2px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: var(--spacing-xl);
          transition: all 0.3s ease;
        }

        .price-box:hover {
          border-color: var(--color-primary);
          box-shadow: 0 15px 40px rgba(255, 107, 53, 0.15);
        }

        .price-box h3 {
          font-family: var(--font-display);
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--color-primary);
          margin-bottom: var(--spacing-md);
        }

        .price-box ul {
          list-style: none;
          margin-bottom: var(--spacing-lg);
        }

        .price-box li {
          padding: var(--spacing-sm) 0;
          border-bottom: 1px solid var(--color-border);
          font-size: 0.95rem;
          color: var(--color-text);
        }

        .price-box li:last-child {
          border-bottom: none;
        }

        .vagas-info {
          text-align: left;
        }

        .vagas-info h3 {
          font-size: 1.5rem;
          margin-bottom: var(--spacing-lg);
          color: var(--color-secondary);
        }

        .vaga-item {
          margin-bottom: var(--spacing-lg);
        }

        .vaga-item strong {
          color: var(--color-primary);
          font-size: 1.1rem;
        }

        .vaga-item p {
          color: var(--color-text);
          margin-top: var(--spacing-sm);
        }

        /* DASHBOARD */
        .dashboard {
          background: var(--color-light);
          padding: var(--spacing-2xl) var(--spacing-lg);
          text-align: center;
        }

        .dashboard .section-title {
          margin-bottom: var(--spacing-xl);
        }

        .dashboard-mockup {
          background: linear-gradient(135deg, var(--color-secondary), #3D4052);
          border-radius: var(--radius-lg);
          padding: var(--spacing-lg);
          color: var(--color-light);
          max-width: 900px;
          margin: 0 auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
        }

        .dashboard-header {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-xl);
          padding-bottom: var(--spacing-lg);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .dashboard-stat {
          text-align: center;
        }

        .dashboard-stat-number {
          font-family: var(--font-mono);
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-primary);
        }

        .dashboard-stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          margin-top: var(--spacing-sm);
        }

        .dashboard-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-lg);
          text-align: left;
        }

        .dashboard-feature {
          background: rgba(255, 107, 53, 0.1);
          padding: var(--spacing-lg);
          border-radius: var(--radius-md);
          border-left: 4px solid var(--color-primary);
        }

        .dashboard-feature h4 {
          font-weight: 600;
          margin-bottom: var(--spacing-sm);
          color: var(--color-primary);
        }

        .dashboard-feature p {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }

        /* PORTFOLIO */
        .portfolio {
          background: var(--color-light);
          padding: var(--spacing-2xl) var(--spacing-lg);
        }

        .portfolio .section-title {
          margin-bottom: var(--spacing-xl);
        }

        .portfolio-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-2xl);
          max-width: 1200px;
          margin: 0 auto;
          align-items: center;
        }

        .portfolio-text h3 {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-text);
          margin-bottom: var(--spacing-lg);
        }

        .portfolio-text p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--color-text);
          margin-bottom: var(--spacing-md);
        }

        .portfolio-text strong {
          color: var(--color-primary);
        }

        .mockups-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--spacing-2xl);
        }

        /* CTA FINAL */
        .final-cta {
          background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
          color: var(--color-light);
          padding: var(--spacing-2xl) var(--spacing-lg);
          text-align: center;
        }

        .final-cta h2 {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: var(--spacing-lg);
        }

        .final-cta p {
          font-size: 1.1rem;
          margin-bottom: var(--spacing-xl);
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .whatsapp-btn {
          background: var(--color-light);
          color: var(--color-primary);
          padding: var(--spacing-md) var(--spacing-xl);
          border-radius: var(--radius-md);
          text-decoration: none;
          font-weight: 700;
          font-size: 1.1rem;
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-md);
          transition: background-color 0.2s ease;
          border: none;
          cursor: pointer;
        }

        .whatsapp-btn:hover {
          background: #F0F0F0;
        }

        /* FOOTER */
        footer {
          background: var(--color-secondary);
          color: var(--color-light);
          padding: var(--spacing-lg);
          text-align: center;
          font-size: 0.9rem;
        }

        footer a {
          color: var(--color-primary);
          text-decoration: none;
        }

        footer a:hover {
          text-decoration: underline;
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .hero, .about, .pricing-content, .method-grid {
            grid-template-columns: 1fr;
          }

          .hero-content h1 {
            font-size: 2rem;
          }

          .nav-links {
            display: none;
          }

          .dashboard-features {
            grid-template-columns: 1fr;
          }

          .expertise-grid {
            grid-template-columns: 1fr;
          }

          .profile-circle {
            width: 250px;
            height: 250px;
          }

          .cta-header {
            font-size: 0.9rem;
            padding: var(--spacing-sm) var(--spacing-md);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <div className="min-h-screen">
        {/* TEST BANNER - Remove after testing */}
        <div style={{ background: '#FF6B35', color: 'white', padding: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
          🔧 TESTE VERCEL - Se vê isso, o deploy funcionou! (29/08 17:50)
        </div>

        {/* HEADER */}
        <header>
          <nav>
            <a href="#" className="logo">⚡ Neuralabs</a>
            <ul className="nav-links">
              <li><a href="#sobre">Sobre</a></li>
              <li><a href="#metodologia">Metodologia</a></li>
              <li><a href="#portfolio">Portfólio</a></li>
              <li><a href="#preco">Preço</a></li>
              <li><a href="#dashboard">Dashboard</a></li>
            </ul>
            <a href={`https://wa.me/${whatsappNumber}`} className="cta-header" onClick={() => trackButtonClick('whatsapp_header')}>Conversar no WhatsApp</a>
          </nav>
        </header>

        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <div className="urgency-badge">🧠 Neuromarketing com Garantia de Resultado</div>
            <h1>Seu site não vende porque <span className="highlight">ignora o cérebro</span> do cliente</h1>
            <p>Eu sou Bruna Borba. Descobri que 95% das decisões de compra são inconscientes. A maioria dos sites? Ignora isso completamente.</p>
            <p>Com <strong>Neuromarketing Científico + Design Premium + IA Agents</strong>, garanto aumento de 10-20% em conversão. <strong>Ou devolvo 50% do valor.</strong></p>

            <div className="hero-cta">
              <a href={`https://wa.me/${whatsappNumber}`} className="btn-primary" onClick={() => trackButtonClick('whatsapp_hero_primary')}>
                💬 Agendar Consulta Grátis
              </a>
              <a href="#sobre" className="btn-secondary" onClick={() => trackButtonClick('hero_methodology_link')}>Conhecer Metodologia</a>
            </div>
          </div>

          <div className="hero-image">
            <div className="profile-circle">
              <div className="profile-image" style={{ background: '#FF6B35', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '3rem', fontWeight: 'bold' }}>
                B
              </div>
            </div>
          </div>
        </section>

        {/* SOBRE */}
        <section id="sobre" className="section">
          <div className="about">
            <div className="about-content">
              <h2 className="section-title">Quem é Bruna Borba?</h2>
              <h3>Mais que uma designer. Uma psicóloga do consumidor.</h3>
              <p>Tenho 32 anos, sou de Xangri-Lá (RS) e sou obcecada por entender por que as pessoas REALMENTE compram. Minha formação é tão variada quanto meu conhecimento:</p>

              <div className="expertise-grid">
                <div className="expertise-item">
                  <h4>📊 Marketing Digital</h4>
                  <p>Formada em Marketing Digital + Pós-graduada em Neuromarketing</p>
                </div>
                <div className="expertise-item">
                  <h4>🎨 Design de Interiores</h4>
                  <p>Expertise em psicologia das cores, espaço e composição visual</p>
                </div>
                <div className="expertise-item">
                  <h4>🧠 Neurociência</h4>
                  <p>Profunda compreensão do comportamento humano e gatilhos mentais</p>
                </div>
                <div className="expertise-item">
                  <h4>🤖 IA & Tech</h4>
                  <p>Estudante de Engenharia Civil com foco em automação e otimização</p>
                </div>
              </div>

              <p style={{ marginTop: 'var(--spacing-lg)', fontWeight: '600', color: 'var(--color-primary)' }}>Criei Neuralabs porque cansava de ver bons negócios fracassarem online por falta de estratégia. Meu foco é único: seu site vender.</p>
            </div>

            <div style={{ background: 'var(--color-light)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--color-primary)' }}>
              <h3 style={{ color: 'var(--color-primary)', marginBottom: 'var(--spacing-md)' }}>Por que Neuralabs é diferente?</h3>
              <ul style={{ listStyle: 'none' }}>
                <li style={{ marginBottom: 'var(--spacing-md)' }}><strong style={{ color: 'var(--color-primary)' }}>✓ Sem video calls</strong> - Tudo via WhatsApp e Email</li>
                <li style={{ marginBottom: 'var(--spacing-md)' }}><strong style={{ color: 'var(--color-primary)' }}>✓ Dashboard próprio</strong> - Você controla tudo</li>
                <li style={{ marginBottom: 'var(--spacing-md)' }}><strong style={{ color: 'var(--color-primary)' }}>✓ 30 dias de suporte</strong> - Após entrega, estou aqui</li>
                <li style={{ marginBottom: 'var(--spacing-md)' }}><strong style={{ color: 'var(--color-primary)' }}>✓ Metodologia comprovada</strong> - Neuro + Design + IA</li>
                <li><strong style={{ color: 'var(--color-primary)' }}>✓ Pragmática</strong> - Foco em resultado, não em trends</li>
              </ul>
            </div>
          </div>
        </section>

        {/* METODOLOGIA */}
        <section id="metodologia" className="methodology">
          <h2 className="section-title">A Fórmula: Neuro + Design + IA</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: 'var(--spacing-xl)', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>Não é mágica. É ciência aplicada. Cada decisão no seu site é baseada em como o cérebro humano realmente processa informações e toma decisões.</p>

          <div className="method-grid">
            <div className="method-card">
              <div className="method-icon">🧠</div>
              <h3>Neuromarketing</h3>
              <p>Cores, tipografia, hierarquia visual, urgência — tudo calculado para ativar os gatilhos mentais certos e levar seu cliente à conversão.</p>
            </div>
            <div className="method-card">
              <div className="method-icon">🎨</div>
              <h3>Design Premium</h3>
              <p>Cada pixel tem propósito. Design que não apenas é bonito, mas que vende. Interface intuitiva, UX focado em conversão.</p>
            </div>
            <div className="method-card">
              <div className="method-icon">🤖</div>
              <h3>IA Customizada</h3>
              <p>Agentes de IA automatizando busca de leads, suporte ao cliente, análise de dados. Você cresce sem dobrar o trabalho.</p>
            </div>
          </div>
        </section>

        <PortfolioSection />

        {/* PREÇO */}
        <section id="preco" className="pricing">
          <h2 className="section-title">Investimento com Garantia</h2>

          <div className="pricing-content">
            <div className="price-box" style={{ borderColor: 'var(--color-primary)', borderWidth: '3px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
                <h3 style={{ margin: '0' }}>R$ 8-15k</h3>
                <span style={{ background: 'var(--color-primary)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', fontWeight: '700' }}>ÚNICO MODELO</span>
              </div>
              <p style={{ color: 'var(--color-text)', marginBottom: 'var(--spacing-lg)' }}><strong>/mês</strong> - Neuromarketing + Otimização Contínua + Garantia</p>
              <div style={{ background: '#FFF4E6', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-lg)', borderLeft: '4px solid var(--color-primary)' }}>
                <p style={{ color: '#D97706', margin: '0', fontWeight: '700' }}>✅ Garanto 10-20% aumento de conversão ou devolvo 50% do valor</p>
              </div>
              <ul>
                <li>Website com Neuromarketing científico</li>
                <li>Design premium + psicologia das cores</li>
                <li>Dashboard próprio (você controla tudo)</li>
                <li>A/B testing e otimização mensal</li>
                <li>IA agents buscando leads 24/7</li>
                <li>Chat integrado no dashboard</li>
                <li>Relatórios mensais com métricas reais</li>
                <li>Suporte via WhatsApp (incluso)</li>
              </ul>
              <a href={`https://wa.me/${whatsappNumber}`} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 'var(--spacing-lg)' }} onClick={() => trackButtonClick('whatsapp_pricing')}>Conversar com Bruna</a>
            </div>

            <div className="vagas-info">
              <h3>⏰ Vagas Limitadas (Meses Próximos)</h3>

              <div className="vaga-item">
                <strong>Setembro 2026: 1 vaga</strong>
                <p>Prioridade: e-commerce e SaaS</p>
              </div>

              <div className="vaga-item">
                <strong>Outubro 2026: 3 vagas</strong>
                <p>Qualquer segmento (e-commerce, SaaS, serviços, B2B)</p>
              </div>

              <div className="vaga-item">
                <strong>Especialidades da Neuralabs</strong>
                <p>E-commerce • SaaS B2B • Negócios de Serviços • Local Services</p>
              </div>

              <div style={{ background: '#FFF4E6', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-md)', marginTop: 'var(--spacing-lg)' }}>
                <p style={{ color: '#D97706', margin: '0' }}><strong>💡 Por que só R$8-15k/mês?</strong> Queremos clientes que realmente querem crescer. Ninguém que não acredita em ciência. Logo você vai entender por que funciona.</p>
              </div>
            </div>
          </div>
        </section>

        {/* DASHBOARD */}
        <section id="dashboard" className="dashboard">
          <h2 className="section-title">Seu Dashboard Personalizado</h2>
          <p style={{ marginBottom: 'var(--spacing-xl)', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', color: 'var(--color-text)' }}>Você terá acesso a um dashboard privado onde pode: conversar com clientes, acompanhar leads em tempo real, controlar IA agents e ver métricas. Tudo em um só lugar.</p>

          <div className="dashboard-mockup">
            <div className="dashboard-header">
              <div className="dashboard-stat">
                <div className="dashboard-stat-number">247</div>
                <div className="dashboard-stat-label">Leads este mês</div>
              </div>
              <div className="dashboard-stat">
                <div className="dashboard-stat-number">34%</div>
                <div className="dashboard-stat-label">Taxa de conversão</div>
              </div>
              <div className="dashboard-stat">
                <div className="dashboard-stat-number">R$ 45k</div>
                <div className="dashboard-stat-label">Receita estimada</div>
              </div>
            </div>

            <div className="dashboard-features">
              <div className="dashboard-feature">
                <h4>💬 Chat em Tempo Real</h4>
                <p>Converse com cada lead dentro do dashboard. Sem deixar a plataforma.</p>
              </div>
              <div className="dashboard-feature">
                <h4>🤖 IA Agents Trabalhando</h4>
                <p>Agentes buscando leads qualificados 24/7. Você só aprova ou nega.</p>
              </div>
              <div className="dashboard-feature">
                <h4>📊 Métricas em Tempo Real</h4>
                <p>Veja conversões, cliques, scroll depth, duração média. Tudo que importa.</p>
              </div>
              <div className="dashboard-feature">
                <h4>✉️ Email Automático</h4>
                <p>Sequências automáticas de follow-up. Nuture seus leads 24/7.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="final-cta">
          <h2>Sua Vaga Está Esperando</h2>
          <p>Não espere seu concorrente tomar a vaga. Conversamos por WhatsApp, sem comprometimento. Só uma conversa sobre como levar seu negócio online ao próximo nível.</p>
          <a href={`https://wa.me/${whatsappNumber}`} className="whatsapp-btn" onClick={() => trackButtonClick('whatsapp_final_cta')}>
            💬 Agendar Conversa no WhatsApp
          </a>
          <p style={{ marginTop: 'var(--spacing-lg)', fontSize: '0.9rem', opacity: '0.9' }}>Bruna Borba • Xangri-Lá, RS • Respondo em até 2 horas</p>
        </section>

        {/* FOOTER */}
        <footer>
          <p>&copy; 2026 Neuralabs. Websites que vendem com neuromarketing. | <a href="/privacy">Privacidade</a> • <a href="mailto:bruna.m.borbaa@gmail.com">Contato</a></p>
        </footer>
      </div>
    </>
  );
}
