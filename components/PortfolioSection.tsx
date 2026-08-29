'use client';

import { useState } from 'react';

export const PortfolioSection = () => {
  const [selectedCase, setSelectedCase] = useState(0);

  const cases = [
    {
      id: 1,
      name: "Cosméticos Natural",
      industry: "E-commerce",
      emoji: "✨",
      problem: "Site lento, conversão baixa, design genérico",
      solution: "Redesign completo + neuromarketing + animações otimizadas",
      metrics: [
        { label: "Aumento de Conversão", value: "+32%", color: "#FF6B35" },
        { label: "Redução de Bounce Rate", value: "-28%", color: "#F4A261" },
        { label: "Tempo Carregamento", value: "-45%", color: "#2D3142" }
      ],
      highlights: [
        "Psicologia das cores aplicada",
        "Social proof estratégico",
        "Urgência visual (estoque limitado)",
        "Mobile-first responsivo"
      ]
    },
    {
      id: 2,
      name: "SaaS Analytics Pro",
      industry: "Software",
      emoji: "📊",
      problem: "Churn alto, usuários não engajados, UX confusa",
      solution: "Dashboard intuitivo + onboarding IA + tracking comportamental",
      metrics: [
        { label: "Redução de Churn", value: "-23%", color: "#FF6B35" },
        { label: "Aumento de Engagement", value: "+45%", color: "#F4A261" },
        { label: "Ticket Médio", value: "+18%", color: "#2D3142" }
      ],
      highlights: [
        "IA predizendo comportamento",
        "Onboarding gamificado",
        "Relatórios em tempo real",
        "Integração com 50+ ferramentas"
      ]
    },
    {
      id: 3,
      name: "Consultoria Financeira",
      industry: "Serviços",
      emoji: "💰",
      problem: "Leads de baixa qualidade, desconfiança online",
      solution: "Site de autoridade + SEO + lead magnet com IA",
      metrics: [
        { label: "Leads Qualificados", value: "+156%", color: "#FF6B35" },
        { label: "Taxa de Fechamento", value: "+34%", color: "#F4A261" },
        { label: "Custo por Lead", value: "-52%", color: "#2D3142" }
      ],
      highlights: [
        "Conteúdo SEO estratégico",
        "Social proof com casos reais",
        "Lead magnet automatizado",
        "Email nurturing com IA"
      ]
    }
  ];

  const current = cases[selectedCase];

  return (
    <section id="portfolio" style={{
      padding: 'var(--spacing-2xl) var(--spacing-lg)',
      background: 'linear-gradient(135deg, #F5F3F0 0%, #F9F7F4 100%)',
      borderTop: '1px solid var(--color-border)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text)',
            marginBottom: 'var(--spacing-md)',
            fontWeight: '700'
          }}>
            Casos de Sucesso
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Resultado comprovado: websites que vendem mais. Bruna Borba criou cada projeto com estratégia de design + neuromarketing.
          </p>
        </div>

        {/* Case Selector Tabs */}
        <div style={{
          display: 'flex',
          gap: 'var(--spacing-md)',
          marginBottom: 'var(--spacing-2xl)',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {cases.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => setSelectedCase(idx)}
              style={{
                padding: 'var(--spacing-md) var(--spacing-lg)',
                border: selectedCase === idx ? '2px solid var(--color-primary)' : '2px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                background: selectedCase === idx ? 'white' : 'transparent',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                fontWeight: selectedCase === idx ? '600' : '500',
                color: selectedCase === idx ? 'var(--color-primary)' : 'var(--color-text)',
                transition: 'all 0.3s ease',
                boxShadow: selectedCase === idx ? '0 4px 12px rgba(255, 107, 53, 0.1)' : 'none'
              }}
            >
              <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>{c.emoji}</span>
              {c.name}
            </button>
          ))}
        </div>

        {/* Case Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--spacing-2xl)',
          alignItems: 'start',
          marginBottom: 'var(--spacing-2xl)'
        }}>
          {/* Left: Problem & Solution */}
          <div>
            <div style={{
              background: 'white',
              padding: 'var(--spacing-lg)',
              borderRadius: 'var(--radius-lg)',
              marginBottom: 'var(--spacing-lg)',
              borderLeft: '4px solid #EF4444'
            }}>
              <h3 style={{
                color: '#EF4444',
                fontSize: '0.85rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: 'var(--spacing-sm)',
                margin: '0 0 var(--spacing-sm) 0'
              }}>
                🔴 O Problema
              </h3>
              <p style={{
                fontSize: '1rem',
                color: 'var(--color-text)',
                margin: '0',
                lineHeight: '1.6'
              }}>
                {current.problem}
              </p>
            </div>

            <div style={{
              background: 'white',
              padding: 'var(--spacing-lg)',
              borderRadius: 'var(--radius-lg)',
              borderLeft: '4px solid var(--color-primary)'
            }}>
              <h3 style={{
                color: 'var(--color-primary)',
                fontSize: '0.85rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: 'var(--spacing-sm)',
                margin: '0 0 var(--spacing-sm) 0'
              }}>
                ✅ A Solução
              </h3>
              <p style={{
                fontSize: '1rem',
                color: 'var(--color-text)',
                margin: '0',
                lineHeight: '1.6'
              }}>
                {current.solution}
              </p>
            </div>
          </div>

          {/* Right: Metrics */}
          <div>
            <div style={{
              background: 'white',
              padding: 'var(--spacing-lg)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
            }}>
              <h3 style={{
                fontSize: '0.85rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#666',
                marginBottom: 'var(--spacing-lg)',
                margin: '0 0 var(--spacing-lg) 0'
              }}>
                📈 Resultados
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                {current.metrics.map((metric, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{
                        fontSize: '0.85rem',
                        color: '#666',
                        margin: '0 0 var(--spacing-xs) 0',
                        fontWeight: '500'
                      }}>
                        {metric.label}
                      </p>
                      <p style={{
                        fontSize: '2rem',
                        fontWeight: '700',
                        color: metric.color,
                        margin: '0'
                      }}>
                        {metric.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div style={{
          background: 'white',
          padding: 'var(--spacing-2xl)',
          borderRadius: 'var(--radius-lg)',
          marginBottom: 'var(--spacing-2xl)',
          borderTop: `4px solid var(--color-primary)`
        }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: '700',
            color: 'var(--color-text)',
            marginBottom: 'var(--spacing-lg)',
            margin: '0 0 var(--spacing-lg) 0'
          }}>
            Como Bruna Borba fez a diferença:
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'var(--spacing-md)'
          }}>
            {current.highlights.map((highlight, idx) => (
              <div key={idx} style={{
                display: 'flex',
                gap: 'var(--spacing-md)',
                alignItems: 'flex-start'
              }}>
                <span style={{
                  color: 'var(--color-primary)',
                  fontSize: '1.5rem',
                  flexShrink: 0
                }}>
                  ⭐
                </span>
                <p style={{
                  fontSize: '0.95rem',
                  color: 'var(--color-text)',
                  margin: '0',
                  lineHeight: '1.5'
                }}>
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bruna Highlight Card */}
        <div style={{
          background: 'linear-gradient(135deg, var(--color-primary) 0%, #FF8C5A 100%)',
          padding: 'var(--spacing-2xl)',
          borderRadius: 'var(--radius-lg)',
          color: 'white',
          textAlign: 'center',
          marginBottom: 'var(--spacing-2xl)'
        }}>
          <p style={{
            fontSize: '1.2rem',
            fontWeight: '700',
            margin: '0 0 var(--spacing-md) 0',
            fontFamily: 'var(--font-display)'
          }}>
            Bruna Borba - Design Expert
          </p>
          <p style={{
            fontSize: '1rem',
            margin: '0',
            lineHeight: '1.6',
            opacity: '0.95'
          }}>
            Todos esses projetos foram criados e otimizados por Bruna Borba. Designer especialista em neuromarketing, psicologia do consumidor e websites que vendem.
          </p>
        </div>

        {/* CTA */}
        <div style={{
          textAlign: 'center',
          padding: 'var(--spacing-lg) 0'
        }}>
          <a
            href="#preco"
            style={{
              display: 'inline-block',
              background: 'var(--color-primary)',
              color: 'white',
              padding: 'var(--spacing-md) var(--spacing-2xl)',
              borderRadius: 'var(--radius-md)',
              fontWeight: '700',
              fontSize: '1rem',
              textDecoration: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = '#FF5520';
              (e.target as HTMLElement).style.boxShadow = '0 6px 20px rgba(255, 107, 53, 0.4)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = 'var(--color-primary)';
              (e.target as HTMLElement).style.boxShadow = '0 4px 12px rgba(255, 107, 53, 0.3)';
            }}
          >
            Vamos criar seu case de sucesso
          </a>
        </div>

        {/* Mobile Responsive Note */}
        <style>{`
          @media (max-width: 768px) {
            #portfolio {
              padding: var(--spacing-xl) var(--spacing-md);
            }

            #portfolio h2 {
              font-size: 1.8rem !important;
            }

            #portfolio > div > div:nth-child(3) {
              grid-template-columns: 1fr !important;
            }

            #portfolio [style*="grid-template-columns: repeat(2"] {
              grid-template-columns: 1fr !important;
            }

            #portfolio button {
              font-size: 0.9rem !important;
              padding: var(--spacing-sm) var(--spacing-md) !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
};
