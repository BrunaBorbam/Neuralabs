'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Language = 'pt' | 'en';

interface NavLink {
  label: string;
  href: string;
}

interface StudioTabCopy {
  emoji: string;
  label: string;
  headline: string;
  cta: string;
  metricLabel: string;
  metricValue: string;
}

interface PillarCopy {
  title: string;
  description: string;
  badges: string[];
}

interface VerticalCopy {
  name: string;
  proposal: string;
  tags: string[];
}

interface PricingPlanCopy {
  name: string;
  badge?: string;
  price: string;
  priceNote: string;
  subtitle: string;
  deliverables: string[];
  cta: string;
  waMessage: string;
}

export interface Dictionary {
  nav: {
    links: NavLink[];
    cta: string;
  };
  hero: {
    badge: string;
    headlinePrefix: string;
    headlineHighlight: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    waMessage: string;
  };
  heroStudio: {
    badgeSpeed: string;
    badgeNeuro: string;
    tabs: StudioTabCopy[];
  };
  pillars: {
    badge: string;
    heading: string;
    subheading: string;
    items: PillarCopy[];
  };
  verticals: {
    badge: string;
    heading: string;
    subheading: string;
    conceptTag: string;
    items: VerticalCopy[];
  };
  comparison: {
    badge: string;
    heading: string;
    subheading: string;
    afterBrand: string;
    afterHeadline: string;
    afterBody: string;
    afterCta: string;
    beforeSite: string;
    beforeHeadline: string;
    beforeBody: string;
    beforeCta: string;
    labelBefore: string;
    labelAfter: string;
  };
  calculator: {
    badge: string;
    heading: string;
    subheading: string;
    visitorsLabel: string;
    conversionLabel: string;
    ticketLabel: string;
    monthlyLossLabel: string;
    annualLossSuffix: string;
    locale: string;
    currency: string;
  };
  pricing: {
    badge: string;
    heading: string;
    subheading: string;
    plans: PricingPlanCopy[];
  };
  contact: {
    badge: string;
    heading: string;
    subheading: string;
    urgencyLine: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    companyPlaceholder: string;
    phonePlaceholder: string;
    submit: string;
    success: string;
    error: string;
    asideText: string;
    waButton: string;
    waMessage: string;
  };
  footer: {
    tagline: string;
    navHeading: string;
    legalHeading: string;
    privacyLink: string;
    lgpdText: string;
    copyrightSuffix: string;
  };
}

const pt: Dictionary = {
  nav: {
    links: [
      { label: 'Pilares', href: '#pilares' },
      { label: 'Nichos', href: '#nichos' },
      { label: 'Antes & Depois', href: '#comparativo' },
      { label: 'Preços', href: '#precos' },
      { label: 'Contato', href: '#contato' },
    ],
    cta: 'Diagnóstico no WhatsApp',
  },
  hero: {
    badge: 'Neurociência aplicada à conversão',
    headlinePrefix: 'Websites desenhados pela',
    headlineHighlight: 'neurociência da decisão humana.',
    subheadline:
      'Unimos SEO de intenção de compra e psicologia do consumidor para atrair quem já está pronto para comprar — e conduzi-lo, sem fricção, até o WhatsApp.',
    ctaPrimary: 'Diagnóstico no WhatsApp',
    ctaSecondary: 'Ver Nichos Atendidos',
    waMessage:
      'Olá! Vim pelo site da NEURALABS e gostaria de solicitar um diagnóstico visual para o site da minha empresa.',
  },
  heroStudio: {
    // Was '⚡ 0.7s • Core Web Vitals 99' — a specific, unverifiable
    // performance number sitting outside the mockup's "Conceito
    // Ilustrativo" disclosure. Replaced with a capability claim, same
    // register as badgeNeuro below, instead of an invented benchmark.
    badgeSpeed: '⚡ Design 3D & Alta Performance',
    badgeNeuro: '🧠 Neuromarketing & Alta Conversão',
    tabs: [
      {
        emoji: '🏨',
        label: 'Airbnb / Praia',
        headline: 'Reserve sua estadia dos sonhos',
        cta: 'Reservar Agora',
        metricLabel: 'Conversão de Reservas',
        metricValue: '+42%',
      },
      {
        emoji: '🪵',
        label: 'Marcenaria',
        headline: 'Projetos sob medida, feitos pra durar',
        cta: 'Solicitar Orçamento',
        metricLabel: 'Leads Qualificados',
        metricValue: '+58%',
      },
      {
        emoji: '🍽️',
        label: 'Gastronomia',
        headline: 'Sabores que enchem mesas',
        cta: 'Reservar Mesa',
        metricLabel: 'Reservas Online',
        metricValue: '+35%',
      },
      {
        emoji: '💎',
        label: 'E-commerce',
        headline: 'Da vitrine ao carrinho, sem fricção',
        cta: 'Comprar Agora',
        metricLabel: 'Ticket Médio',
        metricValue: '+27%',
      },
    ],
  },
  pillars: {
    badge: 'Os Dois Pilares Neuralabs',
    heading: 'Quem chega pronto pra comprar, decide sem fricção',
    subheading:
      'SEO de intenção traz a audiência certa até você. Neuromarketing conduz essa audiência, sem atrito, até a decisão de compra.',
    items: [
      {
        title: 'SEO de Intenção & Otimização para IAs (GEO)',
        description:
          'Esqueça tráfego vazio. Posicionamos sua empresa exatamente nas buscas de quem já tem orçamento e está pronto para comprar no Google, ChatGPT e Gemini.',
        badges: ['Buscas de Alto Valor', 'Ranqueamento no Google', 'Recomendação em IAs'],
      },
      {
        title: 'Arquitetura de Decisão & Neuromarketing',
        description:
          'Mapeamos a psicologia de compra do seu público: eliminação de fricção cognitiva, gatilhos de alto valor percebido e condução fluida até o WhatsApp.',
        badges: ['Decisão em 0.8s', 'Ancoragem de Status', 'Aversão à Perda'],
      },
    ],
  },
  verticals: {
    badge: 'Nichos Estratégicos',
    heading: 'Especialistas em quatro mercados de alto ticket',
    subheading:
      'Cada nicho tem sua própria psicologia de compra. Desenhamos cada site para o comportamento específico do seu cliente.',
    conceptTag: 'Conceito Ilustrativo',
    items: [
      {
        name: 'Hospitalidade & Airbnb',
        proposal:
          'Páginas que vendem a estadia antes da reserva: prova social, disponibilidade em tempo real e gatilhos de escassez para hóspedes de alto padrão.',
        tags: ['Reservas Diretas', 'Prova Social'],
      },
      {
        name: 'Marcenaria de Luxo & Arquitetura',
        proposal:
          'Portfólios que comunicam exclusividade: apresentação editorial de projetos e ancoragem de valor para clientes de altíssimo ticket.',
        tags: ['Ancoragem de Valor', 'Portfólio Editorial'],
      },
      {
        name: 'Gastronomia',
        proposal:
          'Cardápios e experiências que despertam apetite e urgência: reservas facilitadas e storytelling sensorial que converte visitantes em mesas ocupadas.',
        tags: ['Reservas Facilitadas', 'Storytelling Sensorial'],
      },
      {
        name: 'E-commerce',
        proposal:
          'Jornadas de compra sem fricção: arquitetura de decisão aplicada a vitrines, checkout e recuperação de carrinho para maximizar o ticket médio.',
        tags: ['Redução de Fricção', 'Ticket Médio'],
      },
    ],
  },
  comparison: {
    badge: 'Antes & Depois',
    heading: 'Arraste e veja a diferença de uma decisão de design',
    subheading:
      'Do site genérico à experiência desenhada para conversão — a mesma empresa, dois resultados completamente diferentes.',
    afterBrand: 'Padrão de Luxo',
    afterHeadline: 'Elegância que conduz à decisão',
    afterBody: 'Hierarquia visual clara, prova social estratégica e um único caminho até o WhatsApp.',
    afterCta: 'Falar Agora',
    beforeSite: 'Site Comum',
    beforeHeadline: 'Bem-vindo ao nosso site',
    beforeBody: 'Lorem ipsum dolor sit amet, texto genérico sem hierarquia nem direção clara de ação.',
    beforeCta: 'Saiba Mais',
    labelBefore: 'Sem Neuralabs',
    labelAfter: 'Com Neuralabs',
  },
  calculator: {
    badge: 'Diagnóstico Rápido',
    heading: 'Quanto seu déficit digital está custando?',
    subheading:
      'Estime a receita perdida por não converter no padrão de um site desenhado para decisão de compra.',
    visitorsLabel: 'Visitantes por mês',
    conversionLabel: 'Taxa de conversão atual',
    ticketLabel: 'Ticket médio',
    monthlyLossLabel: 'Perda mensal estimada',
    annualLossSuffix: 'perdidos por ano',
    locale: 'pt-BR',
    currency: 'BRL',
  },
  pricing: {
    badge: 'Investimento Transparente',
    heading: 'Sem letras miúdas, sem surpresas',
    subheading:
      'Dois formatos de projeto sob medida, sempre em investimento único — sem mensalidades.',
    plans: [
      {
        name: 'Landing Page de Alta Conversão',
        price: 'R$ 5.000',
        priceNote: 'ou $1,500 USD',
        subtitle: 'Investimento único • Entrega em 7 dias úteis',
        deliverables: [
          '1 Página de Alto Impacto com Neuromarketing',
          'Otimização para Mobile e WhatsApp',
          'Integração de Formulário Direto',
          '30 dias de suporte e revisões inclusas',
          'Conformidade com a LGPD',
        ],
        cta: 'Solicitar Proposta no WhatsApp →',
        waMessage:
          'Olá! Vim pelo site da NEURALABS e gostaria de solicitar um diagnóstico visual para o site da minha empresa.',
      },
      {
        name: 'Plataforma Web Premium',
        badge: 'MAIS ESCOLHIDO',
        price: 'R$ 8.000',
        priceNote: 'ou $2,500 USD',
        subtitle: 'Investimento único • Entrega em 10 dias úteis',
        deliverables: [
          'Projeto Completo e Exclusivo Sob Medida',
          'Arquitetura de Neuromarketing & Psicologia de Compra',
          'SEO de Intenção no Google & Otimização para IAs (GEO)',
          'Interações e Animações 3D de Alto Padrão',
          '30 dias de suporte dedicado e revisões ilimitadas',
          'Processo 100% assíncrono (sem reuniões longas)',
        ],
        cta: 'Solicitar Proposta no WhatsApp →',
        waMessage:
          'Olá! Vim pelo site da NEURALABS e gostaria de solicitar um diagnóstico visual para o site da minha empresa.',
      },
    ],
  },
  contact: {
    badge: 'Vamos Conversar',
    heading: 'Peça seu diagnóstico de conversão',
    subheading:
      'Conte um pouco sobre seu negócio e retornamos com uma análise em até 24 horas — ou fale agora mesmo pelo WhatsApp.',
    urgencyLine: 'Começando esta semana, seu site fica pronto em até 10 dias úteis.',
    namePlaceholder: 'Seu nome',
    emailPlaceholder: 'Seu e-mail',
    companyPlaceholder: 'Empresa (opcional)',
    phonePlaceholder: 'WhatsApp (opcional)',
    submit: 'Enviar diagnóstico',
    success: 'Recebemos sua mensagem! Em breve entramos em contato.',
    error: 'Não foi possível enviar agora. Tente novamente ou use o WhatsApp.',
    asideText: 'Prefere resposta imediata? Fale direto com a gente pelo WhatsApp.',
    waButton: 'Diagnóstico no WhatsApp',
    waMessage:
      'Olá! Vim pelo site da NEURALABS e gostaria de solicitar um diagnóstico visual para o site da minha empresa.',
  },
  footer: {
    tagline:
      'Websites desenhados pela neurociência da decisão humana. SEO de intenção de compra e neuromarketing a serviço da conversão.',
    navHeading: 'Navegação',
    legalHeading: 'Legal',
    privacyLink: 'Política de Privacidade (LGPD)',
    lgpdText:
      'Seus dados são tratados em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).',
    copyrightSuffix: 'Neuralabs — Onde Neurociência Vira Conversão.',
  },
};

const en: Dictionary = {
  nav: {
    links: [
      { label: 'Pillars', href: '#pilares' },
      { label: 'Niches', href: '#nichos' },
      { label: 'Before & After', href: '#comparativo' },
      { label: 'Pricing', href: '#precos' },
      { label: 'Contact', href: '#contato' },
    ],
    cta: 'WhatsApp Diagnosis',
  },
  hero: {
    badge: 'Neuroscience applied to conversion',
    headlinePrefix: 'Websites engineered by the',
    headlineHighlight: 'neuroscience of human decision.',
    subheadline:
      'We merge high-end visual aesthetics, behavioral psychology, and cutting-edge tech to turn visitors into high-ticket clients.',
    ctaPrimary: 'Get Diagnosis on WhatsApp',
    ctaSecondary: 'See Niches We Serve',
    waMessage:
      "Hi! I came from the NEURALABS website and would like to request a visual diagnosis for my company's website.",
  },
  heroStudio: {
    badgeSpeed: '⚡ 3D Design & High Performance',
    badgeNeuro: '🧠 Neuromarketing & High Conversion',
    tabs: [
      {
        emoji: '🏨',
        label: 'Airbnb / Beach',
        headline: 'Book your dream stay',
        cta: 'Book Now',
        metricLabel: 'Booking Conversion',
        metricValue: '+42%',
      },
      {
        emoji: '🪵',
        label: 'Woodwork',
        headline: 'Custom projects, built to last',
        cta: 'Request a Quote',
        metricLabel: 'Qualified Leads',
        metricValue: '+58%',
      },
      {
        emoji: '🍽️',
        label: 'Fine Dining',
        headline: 'Flavors that fill tables',
        cta: 'Reserve a Table',
        metricLabel: 'Online Reservations',
        metricValue: '+35%',
      },
      {
        emoji: '💎',
        label: 'E-commerce',
        headline: 'From showcase to cart, frictionless',
        cta: 'Buy Now',
        metricLabel: 'Average Order Value',
        metricValue: '+27%',
      },
    ],
  },
  pillars: {
    badge: 'The Two Neuralabs Pillars',
    heading: 'Ready-to-buy visitors decide without friction',
    subheading:
      "Intent SEO brings the right audience to you. Neuromarketing guides that audience, frictionlessly, to the buying decision.",
    items: [
      {
        title: 'Purchase-Intent SEO & AI Optimization (GEO)',
        description:
          "Forget empty traffic. We position your business exactly where people with budget, ready to buy, are searching — on Google, ChatGPT, and Gemini.",
        badges: ['High-Value Searches', 'Google Ranking', 'AI Recommendation'],
      },
      {
        title: 'Decision Architecture & Neuromarketing',
        description:
          "We map your audience's buying psychology: removing cognitive friction, deploying high-perceived-value triggers, and guiding them smoothly to WhatsApp.",
        badges: ['0.8s Decision', 'Status Anchoring', 'Loss Aversion'],
      },
    ],
  },
  verticals: {
    badge: 'Strategic Niches',
    heading: 'Specialists in four high-ticket markets',
    subheading:
      "Every niche has its own buying psychology. We design each site around your specific customer's behavior.",
    conceptTag: 'Concept Preview',
    items: [
      {
        name: 'Hospitality & Airbnb',
        proposal:
          'Pages that sell the stay before the booking: social proof, real-time availability, and scarcity triggers for high-end guests.',
        tags: ['Direct Bookings', 'Social Proof'],
      },
      {
        name: 'Luxury Woodwork & Architecture',
        proposal:
          'Portfolios that communicate exclusivity: editorial project presentation and value anchoring for the highest-ticket clients.',
        tags: ['Value Anchoring', 'Editorial Portfolio'],
      },
      {
        name: 'Fine Dining',
        proposal:
          'Menus and experiences that spark appetite and urgency: easy reservations and sensory storytelling that turns visitors into filled tables.',
        tags: ['Easy Reservations', 'Sensory Storytelling'],
      },
      {
        name: 'E-commerce',
        proposal:
          'Frictionless buying journeys: decision architecture applied to storefronts, checkout, and cart recovery to maximize average order value.',
        tags: ['Friction Reduction', 'Average Order Value'],
      },
    ],
  },
  comparison: {
    badge: 'Before & After',
    heading: 'Drag to see the difference a design decision makes',
    subheading:
      'From a generic site to a conversion-engineered experience — same company, two completely different results.',
    afterBrand: 'Luxury Standard',
    afterHeadline: 'Elegance that drives the decision',
    afterBody: 'Clear visual hierarchy, strategic social proof, and a single path to WhatsApp.',
    afterCta: 'Talk Now',
    beforeSite: 'Common Website',
    beforeHeadline: 'Welcome to our website',
    beforeBody: 'Lorem ipsum dolor sit amet, generic copy with no hierarchy or clear call to action.',
    beforeCta: 'Learn More',
    labelBefore: 'Without Neuralabs',
    labelAfter: 'With Neuralabs',
  },
  calculator: {
    badge: 'Quick Diagnosis',
    heading: 'How much is your digital gap costing you?',
    subheading:
      'Estimate the revenue lost by not converting at the standard of a site engineered for purchase decisions.',
    visitorsLabel: 'Monthly visitors',
    conversionLabel: 'Current conversion rate',
    ticketLabel: 'Average order value',
    monthlyLossLabel: 'Estimated monthly loss',
    annualLossSuffix: 'lost per year',
    locale: 'en-US',
    currency: 'USD',
  },
  pricing: {
    badge: 'Transparent Investment',
    heading: 'No fine print, no surprises',
    subheading: 'Two tailor-made project formats, always a one-time investment — no monthly fees.',
    plans: [
      {
        name: 'High-Conversion Landing Page',
        price: '$1,500 USD',
        priceNote: 'or R$ 5,000 BRL',
        subtitle: 'One-time investment • Delivered in 7 business days',
        deliverables: [
          '1 High-Impact Page with Neuromarketing',
          'Mobile & WhatsApp Optimization',
          'Direct Form Integration',
          '30 days of support and revisions included',
          'LGPD Compliance',
        ],
        cta: 'Request Proposal on WhatsApp →',
        waMessage:
          "Hi! I came from the NEURALABS website and would like to request a visual diagnosis for my company's website.",
      },
      {
        name: 'Premium Web Platform',
        badge: 'MOST CHOSEN',
        price: '$2,500 USD',
        priceNote: 'or R$ 8,000 BRL',
        subtitle: 'One-time investment • Delivered in 10 business days',
        deliverables: [
          'Complete, Exclusive Custom Project',
          'Neuromarketing & Purchase Psychology Architecture',
          'Google Intent SEO & AI Optimization (GEO)',
          'High-End 3D Interactions & Animations',
          '30 days of dedicated support and unlimited revisions',
          '100% Async Process (no long meetings)',
        ],
        cta: 'Request Proposal on WhatsApp →',
        waMessage:
          "Hi! I came from the NEURALABS website and would like to request a visual diagnosis for my company's website.",
      },
    ],
  },
  contact: {
    badge: "Let's Talk",
    heading: 'Request your conversion diagnosis',
    subheading:
      "Tell us a bit about your business and we'll get back within 24 hours — or chat right now on WhatsApp.",
    urgencyLine: 'Start this week and your site is ready in as little as 10 business days.',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'Your email',
    companyPlaceholder: 'Company (optional)',
    phonePlaceholder: 'WhatsApp (optional)',
    submit: 'Send diagnosis',
    success: "We've received your message! We'll be in touch soon.",
    error: 'Could not send right now. Please try again or use WhatsApp.',
    asideText: 'Prefer an immediate reply? Talk to us directly on WhatsApp.',
    waButton: 'WhatsApp Diagnosis',
    waMessage:
      "Hi! I came from the NEURALABS website and would like to request a visual diagnosis for my company's website.",
  },
  footer: {
    tagline:
      'Websites engineered by the neuroscience of human decision. Purchase-intent SEO and neuromarketing in service of conversion.',
    navHeading: 'Navigation',
    legalHeading: 'Legal',
    privacyLink: 'Privacy Policy (LGPD)',
    lgpdText:
      'Your data is handled in compliance with the Brazilian General Data Protection Law (Law No. 13.709/2018).',
    copyrightSuffix: 'Neuralabs — Where Neuroscience Becomes Conversion.',
  },
};

const dictionaries: Record<Language, Dictionary> = { pt, en };

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = 'neuralabs-language';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('pt');

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'pt' || stored === 'en') {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    window.localStorage.setItem(STORAGE_KEY, lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: dictionaries[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
