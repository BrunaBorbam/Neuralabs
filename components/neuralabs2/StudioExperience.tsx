'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronRight,
  CircleDot, Globe2, Menu, ShieldCheck, X,
} from 'lucide-react';

type Page = 'home' | 'services' | 'work' | 'contact' | 'orlando';
type Lang = 'pt' | 'en';

const routes: Record<Page, string> = {
  home: '/neuralabs-2',
  services: '/neuralabs-2/servicos',
  work: '/neuralabs-2/portfolio',
  contact: '/neuralabs-2/contato',
  orlando: '/neuralabs-2/orlando',
};

const dictionary = {
  pt: {
    nav: { home: 'Início', services: 'O que fazemos', work: 'Projetos', contact: 'Seu projeto', orlando: 'Orlando' },
    utility: 'Protótipo privado · Neuralabs 2.0',
    studio: 'Estúdio digital independente',
    inquiry: 'Iniciar um projeto',
    heroEyebrow: 'Estratégia comportamental × design de alta precisão',
    heroLine1: 'O digital pode',
    heroLine2: 'ser sentido.',
    heroText: 'Criamos experiências digitais autorais onde design, comportamento humano e tecnologia trabalham juntos para tornar decisões mais simples — e marcas mais memoráveis.',
    heroPrimary: 'Conheça nosso trabalho',
    heroSecondary: 'O que criamos',
    heroNote: 'Estratégia antes da estética. Clareza antes dos efeitos.',
    shiftEyebrow: 'A essência',
    shiftTitle: 'Além da aparência, uma experiência que faz sentido.',
    shiftBody: 'Não existe fórmula mágica de conversão. Existe observação, hipótese, boa arquitetura de informação, engenharia e experimentação. Cada decisão de interface deve servir às pessoas e ao negócio.',
    shiftItems: ['Comportamento do consumidor', 'SEO e descoberta orgânica', 'Arquitetura de informação', 'Performance e segurança'],
    projectsEyebrow: '01 / Trabalho selecionado',
    projectsTitle: 'Dois universos. Uma intenção: transformar a forma de interagir.',
    projectsCopy: 'Projetos de conceito desenvolvidos para demonstrar decisões de experiência e direção criativa. Não são trabalhos contratados nem provas de resultados comerciais.',
    seeStudy: 'Explorar estudo de caso',
    cerneDesc: 'Marcenaria autoral · identidade editorial e percepção de valor',
    villaDesc: 'Hospitalidade premium · narrativa e jornada de reserva',
    capabilityEyebrow: '02 / Capacidades',
    capabilityTitle: 'Uma prática integrada.',
    capabilityCopy: 'Da primeira hipótese ao último detalhe responsivo.',
    capabilityItems: [
      { n: '01', name: 'Estratégia & comportamento', desc: 'Pesquisa, proposta de valor, arquitetura da decisão e hipóteses que podem ser testadas.' },
      { n: '02', name: 'Experiências digitais', desc: 'Websites autorais, identidade de interface, movimento intencional e design responsivo.' },
      { n: '03', name: 'Engenharia & descoberta', desc: 'SEO técnico, acessibilidade, performance, segurança e instrumentação de dados.' },
    ],
    philosophyEyebrow: 'O método Neuralabs',
    philosophyTitle: 'A forma segue a intenção.',
    philosophyCopy: 'A estética atrai. A clareza orienta. A confiança sustenta a decisão. Construímos a partir dessa sequência, sem promessas impossíveis nem números fabricados.',
    bottomTitle: 'Seu próximo capítulo começa por uma conversa bem feita.',
    bottomCopy: 'Compartilhe o contexto. Nós ajudamos a dar forma ao desafio.',
    footerNote: 'Protótipo em desenvolvimento. As interações comerciais não estão habilitadas.',
    portfolioEyebrow: 'Selected work / 2026',
    portfolioTitle: 'Explorações de linguagem, interação e intenção.',
    portfolioIntro: 'Estudos de caso conceituais — cada experiência foi criada para demonstrar possibilidades, não para sugerir clientes ou resultados inexistentes.',
    caseContext: 'O desafio proposto',
    caseThinking: 'A hipótese de design',
    caseDecision: 'A solução explorada',
    demo: 'Abrir demonstração interativa',
    concept: 'Projeto conceitual · marca e dados ilustrativos',
    cerneChallenge: 'Como comunicar precisão e exclusividade em um mercado onde muitos fornecedores parecem iguais?',
    cerneHypothesis: 'Uma identidade editorial e um portfólio com hierarquia clara podem facilitar a avaliação do valor percebido.',
    cerneDesign: 'Fotografia de materiais, tipografia de caráter, narrativa de processo e uma apresentação de projetos orientada ao detalhe.',
    villaChallenge: 'Como reduzir incertezas antes de uma reserva de hospedagem premium?',
    villaHypothesis: 'Fotografia contextual, explicação de benefícios e comparação transparente podem orientar melhor a decisão.',
    villaDesign: 'Tour visual, simulação de economia e fluxo de seleção de datas — todos demonstrativos e sem operação comercial real.',
    servicesEyebrow: 'What we do',
    servicesTitle: 'Do primeiro insight ao produto que funciona.',
    servicesIntro: 'Projetamos experiências digitais com expressão visual própria, apoiadas em pesquisa, clareza de uso e engenharia responsável.',
    processEyebrow: 'Nosso processo',
    processTitle: 'Um processo claro. Sem caixa-preta.',
    process: [
      { n: '01', title: 'Entender', desc: 'Objetivos, público, concorrência e comportamento em contexto.' },
      { n: '02', title: 'Estruturar', desc: 'Conteúdo, navegação, jornadas e critérios de sucesso.' },
      { n: '03', title: 'Criar', desc: 'Direção visual, protótipos e desenvolvimento responsivo.' },
      { n: '04', title: 'Validar', desc: 'Qualidade, acessibilidade, segurança, velocidade e mensuração.' },
    ],
    scopeEyebrow: 'Princípios do trabalho',
    scopeTitle: 'Detalhes que não são opcionais.',
    scope: ['Arquitetura acessível', 'Experiência mobile-first', 'Segurança desde o desenho', 'SEO preparado para descoberta', 'Carregamento responsável', 'Medição sem métricas fictícias'],
    contactEyebrow: 'Project inquiry',
    contactTitle: 'Conte-nos o desafio. A estratégia começa aqui.',
    contactIntro: 'Este é um fluxo interativo de demonstração. Nenhum dado pessoal será coletado ou enviado nesta etapa.',
    question: 'Pergunta',
    of: 'de',
    next: 'Continuar',
    back: 'Voltar',
    stepLabels: ['Objetivo', 'Segmento', 'Momento'],
    objective: 'O que você gostaria de melhorar?',
    objectives: ['Gerar oportunidades comerciais', 'Reposicionar a marca', 'Lançar uma nova experiência', 'Melhorar um site existente'],
    industry: 'Qual segmento descreve melhor seu negócio?',
    industries: ['Serviços locais', 'Hospitalidade', 'Arquitetura & design', 'E-commerce', 'Outro segmento'],
    timeline: 'Em qual momento seu projeto está?',
    timelines: ['Explorando possibilidades', 'Planejando próximos 3 meses', 'Preciso começar logo'],
    finished: 'O próximo passo seria uma análise de aderência.',
    finishedBody: 'Em uma versão publicada e segura, pediríamos apenas os dados de contato necessários, apresentaríamos os próximos passos e só confirmaríamos o envio após o registro do lead.',
    reset: 'Recomeçar a simulação',
    noSubmission: 'Simulação local. Não solicitamos nome, e-mail ou telefone e não há envio de dados.',
    contactAsideEyebrow: 'Sem fricção, sem promessa vazia',
    contactAsideTitle: 'Menos perguntas. Mais contexto.',
    contactAsideCopy: 'Uma jornada curta nos ajuda a compreender a intenção, sem transformar uma primeira conversa em um questionário interminável.',
    orlandoEyebrow: 'Neuralabs × Orlando',
    orlandoTitle: 'Seu negócio merece mais que uma página de contato.',
    orlandoIntro: 'Uma proposta inicial para empresas brasileiras de serviços em Orlando: presença digital clara, profissional e preparada para receber oportunidades.',
    orlandoNote: 'Oferta piloto em definição · valores e prazos ainda não publicados',
    orlandoOfferTitle: 'O essencial, muito bem executado.',
    orlandoOfferCopy: 'Escopo preliminar para validação comercial. Não é uma oferta contratual.',
    orlandoBullets: ['Página de apresentação responsiva', 'Descrição clara dos serviços e áreas atendidas', 'Caminho direto para contato e orçamento', 'Fundamentos de SEO local e velocidade', 'Preparação para mensuração básica'],
    orlandoExclusion: 'Campanhas pagas, produção fotográfica, integrações externas e manutenção continuada dependem de escopo separado.',
    orlandoCTA: 'Simular meu briefing',
    marketEyebrow: 'Ponto de partida',
    marketTitle: 'Cleaning services primeiro. Potencial para crescer.',
    marketCopy: 'Começamos com uma comunicação específica para negócios de limpeza em Orlando, sem limitar a marca Neuralabs a esse setor.',
  },
  en: {
    nav: { home: 'Home', services: 'What we do', work: 'Work', contact: 'Your project', orlando: 'Orlando' },
    utility: 'Private prototype · Neuralabs 2.0',
    studio: 'Independent digital studio',
    inquiry: 'Start a project',
    heroEyebrow: 'Behavioral strategy × high-precision design',
    heroLine1: 'Digital should',
    heroLine2: 'be felt.',
    heroText: 'We create distinctive digital experiences where design, human behavior and technology work together to make decisions simpler — and brands more memorable.',
    heroPrimary: 'Explore our work',
    heroSecondary: 'What we create',
    heroNote: 'Strategy before aesthetics. Clarity before effects.',
    shiftEyebrow: 'The essence',
    shiftTitle: 'Beyond appearances, an experience that makes sense.',
    shiftBody: 'There is no magic conversion formula. There is observation, hypothesis, sound information architecture, engineering and experimentation. Every interface decision should serve people and business.',
    shiftItems: ['Consumer behavior', 'SEO and organic discovery', 'Information architecture', 'Performance and security'],
    projectsEyebrow: '01 / Selected work',
    projectsTitle: 'Two worlds. One intention: change the way people interact.',
    projectsCopy: 'Concept projects created to demonstrate experience decisions and creative direction. They are not commissioned work or evidence of business results.',
    seeStudy: 'Explore the case study',
    cerneDesc: 'Bespoke woodworking · editorial identity and perceived value',
    villaDesc: 'Premium hospitality · storytelling and booking journey',
    capabilityEyebrow: '02 / Capabilities',
    capabilityTitle: 'One integrated practice.',
    capabilityCopy: 'From the first hypothesis to the final responsive detail.',
    capabilityItems: [
      { n: '01', name: 'Strategy & behavior', desc: 'Research, value proposition, decision architecture and testable hypotheses.' },
      { n: '02', name: 'Digital experiences', desc: 'Distinctive websites, interface identities, intentional motion and responsive design.' },
      { n: '03', name: 'Engineering & discovery', desc: 'Technical SEO, accessibility, performance, security and data instrumentation.' },
    ],
    philosophyEyebrow: 'The Neuralabs method',
    philosophyTitle: 'Form follows intention.',
    philosophyCopy: 'Aesthetics attract. Clarity guides. Trust supports decisions. We build on that sequence, without impossible promises or fabricated figures.',
    bottomTitle: 'Your next chapter starts with a thoughtful conversation.',
    bottomCopy: 'Share your context. We can help shape the challenge.',
    footerNote: 'Prototype in development. Commercial interactions are not enabled.',
    portfolioEyebrow: 'Selected work / 2026',
    portfolioTitle: 'Explorations in language, interaction and intention.',
    portfolioIntro: 'Conceptual case studies — each experience demonstrates possibilities without implying real clients or outcomes.',
    caseContext: 'The proposed challenge',
    caseThinking: 'The design hypothesis',
    caseDecision: 'The explored solution',
    demo: 'Open interactive demo',
    concept: 'Concept project · brand and data are illustrative',
    cerneChallenge: 'How can precision and exclusivity be communicated in a market where suppliers often look alike?',
    cerneHypothesis: 'An editorial identity and a clearly structured portfolio may help visitors evaluate perceived value.',
    cerneDesign: 'Material photography, characterful typography, process storytelling and detail-oriented project presentation.',
    villaChallenge: 'How can uncertainty be reduced before booking a premium stay?',
    villaHypothesis: 'Contextual photography, benefits and transparent comparison may help guide decisions.',
    villaDesign: 'Visual tour, savings simulation and date-selection journey — demonstrations only, with no real booking operation.',
    servicesEyebrow: 'What we do',
    servicesTitle: 'From first insight to an experience that works.',
    servicesIntro: 'We craft digital experiences with distinct visual character, grounded in research, ease of use and responsible engineering.',
    processEyebrow: 'Our process',
    processTitle: 'A clear process. No black box.',
    process: [
      { n: '01', title: 'Understand', desc: 'Goals, audience, competitive context and real behavior.' },
      { n: '02', title: 'Structure', desc: 'Content, navigation, journeys and success criteria.' },
      { n: '03', title: 'Create', desc: 'Art direction, prototypes and responsive development.' },
      { n: '04', title: 'Validate', desc: 'Quality, accessibility, security, speed and measurement.' },
    ],
    scopeEyebrow: 'Working principles',
    scopeTitle: 'Details that are never optional.',
    scope: ['Accessible architecture', 'Mobile-first experience', 'Security by design', 'SEO for discovery', 'Responsible load times', 'Measurement without invented metrics'],
    contactEyebrow: 'Project inquiry',
    contactTitle: 'Tell us the challenge. Strategy starts here.',
    contactIntro: 'This is an interactive demonstration only. No personal information is collected or submitted at this stage.',
    question: 'Question',
    of: 'of',
    next: 'Continue',
    back: 'Back',
    stepLabels: ['Goal', 'Industry', 'Timeline'],
    objective: 'What would you like to improve?',
    objectives: ['Generate business opportunities', 'Reposition the brand', 'Launch a new experience', 'Improve an existing website'],
    industry: 'Which category best fits your business?',
    industries: ['Local services', 'Hospitality', 'Architecture & design', 'E-commerce', 'Other industry'],
    timeline: 'Where are you in the process?',
    timelines: ['Exploring possibilities', 'Planning for the next 3 months', 'Ready to start soon'],
    finished: 'The next step would be a project-fit review.',
    finishedBody: 'In a secure, published version, we would ask only for necessary contact information, explain the next steps and confirm submission only after the lead is stored.',
    reset: 'Restart simulation',
    noSubmission: 'Local simulation only. No name, email or phone is requested or transmitted.',
    contactAsideEyebrow: 'Less friction, more relevance',
    contactAsideTitle: 'Fewer questions. Better context.',
    contactAsideCopy: 'A short journey helps us understand intent without turning an initial conversation into an exhausting questionnaire.',
    orlandoEyebrow: 'Neuralabs × Orlando',
    orlandoTitle: 'Your business deserves more than a contact page.',
    orlandoIntro: 'An initial proposal for Brazilian-owned service businesses in Orlando: a clear, professional digital presence prepared to receive new inquiries.',
    orlandoNote: 'Pilot offer under review · prices and timelines not published yet',
    orlandoOfferTitle: 'The essentials, exceptionally done.',
    orlandoOfferCopy: 'Preliminary scope for commercial validation. Not a contractual offer.',
    orlandoBullets: ['Responsive business presentation page', 'Clear services and service-area information', 'Direct path to contact and quotes', 'Local SEO and speed fundamentals', 'Basic measurement readiness'],
    orlandoExclusion: 'Paid campaigns, photography, external integrations and ongoing maintenance require separate scoping.',
    orlandoCTA: 'Try the project brief',
    marketEyebrow: 'Starting point',
    marketTitle: 'Cleaning services first. Room to grow.',
    marketCopy: 'We begin with tailored messaging for cleaning businesses in Orlando without limiting Neuralabs to that industry.',
  },
};

function Symbol({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" role="img" aria-label="Neuralabs symbol">
      <path d="M9 49L26 10L38 53L55 15" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
      <circle cx="9" cy="49" r="3" fill="currentColor"/>
      <circle cx="26" cy="10" r="3" fill="currentColor"/>
      <circle cx="38" cy="53" r="3" fill="currentColor"/>
      <circle cx="55" cy="15" r="3" fill="currentColor"/>
      <path d="M10 22C24 36 33 26 52 43" stroke="currentColor" strokeOpacity=".42" strokeWidth="1"/>
    </svg>
  );
}

function SignalSculpture() {
  return (
    <div className="n2-sculpture" aria-hidden="true">
      <div className="n2-sculpture-grid" />
      <div className="n2-aura" />
      <div className="n2-ray n2-ray-a" />
      <div className="n2-ray n2-ray-b" />
      <div className="n2-ray n2-ray-c" />
      <div className="n2-prism">
        <svg viewBox="0 0 420 420" className="n2-prism-svg">
          <defs>
            <linearGradient id="n2g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#F0EAE1" stopOpacity=".95"/>
              <stop offset=".45" stopColor="#B98CA8" stopOpacity=".48"/>
              <stop offset="1" stopColor="#B7BFC6" stopOpacity=".87"/>
            </linearGradient>
            <linearGradient id="n2g2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#B98CA8" stopOpacity=".55"/>
              <stop offset="1" stopColor="#B98CA8" stopOpacity=".04"/>
            </linearGradient>
          </defs>
          <path d="M210 27L356 112L356 280L210 365L64 280L64 112Z" fill="url(#n2g2)" stroke="url(#n2g)" strokeWidth="1.3"/>
          <path d="M210 27V197M356 112L210 197L64 112M210 197V365" stroke="url(#n2g)" strokeOpacity=".82" strokeWidth="1.4" fill="none"/>
          <path d="M64 280L210 197L356 280M64 112L210 365L356 112" fill="none" stroke="#E3C3D2" strokeOpacity=".18"/>
          <path d="M210 27C108 90 116 310 210 365C302 320 302 77 210 27Z" stroke="#F0EAE1" strokeOpacity=".36" fill="none"/>
          <circle cx="210" cy="197" r="8" fill="#F0EAE1"/>
          <circle cx="64" cy="112" r="4" fill="#B98CA8"/>
          <circle cx="356" cy="280" r="4" fill="#B7BFC6"/>
          <circle cx="210" cy="27" r="4" fill="#E3C3D2"/>
        </svg>
      </div>
      <div className="n2-signal-label n2-signal-one">N / 001 — observe</div>
      <div className="n2-signal-label n2-signal-two">N / 002 — respond</div>
    </div>
  );
}

function SectionTop({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <div className="n2-section-top">
    <span className="n2-eyebrow">{eyebrow}</span>
    <h2 className="n2-h2">{title}</h2>
    {copy && <p className="n2-lead">{copy}</p>}
  </div>;
}

function CaseCard({ name, type, image, href, anchor, demo, view, lang }: {
  name: string; type: string; image: string; href: string; anchor: string; demo: string; view: string; lang: Lang;
}) {
  return <article className="n2-case-card">
    <Link href={href + (lang === 'en' ? '?lang=en' : '') + '#' + anchor} className="n2-case-img-link">
      <Image src={image} width={1024} height={780} alt={name + ' — ' + type} className="n2-case-image" sizes="(max-width: 760px) 100vw, 50vw" />
      <span className="n2-case-image-overlay">VIEW CASE <ArrowUpRight size={17}/></span>
    </Link>
    <div className="n2-case-detail">
      <div><span className="n2-case-caption">{demo}</span><h3>{name}</h3><p>{type}</p></div>
      <Link href={href + (lang === 'en' ? '?lang=en' : '')} aria-label={view + ': ' + name} className="n2-round-link"><ArrowUpRight size={20}/></Link>
    </div>
  </article>;
}

function Home({ t, lang }: { t: typeof dictionary.pt; lang: Lang }) {
  const link = (to: Page) => routes[to] + (lang === 'en' ? '?lang=en' : '');
  return <>
    <section className="n2-hero n2-container" id="top">
      <div className="n2-hero-copy">
        <span className="n2-eyebrow"><span className="n2-tiny-diamond"/> {t.heroEyebrow}</span>
        <h1 className="n2-hero-title">{t.heroLine1}<br/><em>{t.heroLine2}</em></h1>
        <p className="n2-hero-text">{t.heroText}</p>
        <div className="n2-buttons">
          <Link className="n2-button n2-button-primary" href={link('work')}>{t.heroPrimary}<ArrowUpRight size={18}/></Link>
          <Link className="n2-button n2-button-outline" href={link('services')}>{t.heroSecondary}<ArrowRight size={18}/></Link>
        </div>
        <p className="n2-hero-footnote"><CircleDot size={14}/>{t.heroNote}</p>
      </div>
      <SignalSculpture/>
      <div className="n2-hero-counter">N° 002 / EXPERIENCE DESIGN</div>
    </section>
    <div className="n2-ticker"><div className="n2-ticker-content"><span>NEUROSCIENCE</span><b>✳</b><span>INTERACTION</span><b>✳</b><span>ENGINEERING</span><b>✳</b><span>EXPERIMENTATION</span><b>✳</b><span>BEHAVIOR</span></div></div>
    <section className="n2-section n2-container n2-positioning">
      <SectionTop eyebrow={t.shiftEyebrow} title={t.shiftTitle} copy={t.shiftBody}/>
      <div className="n2-capability-tags">{t.shiftItems.map(item=><span key={item}><Check size={15}/>{item}</span>)}</div>
    </section>
    <section className="n2-section n2-work-section">
      <div className="n2-container">
        <SectionTop eyebrow={t.projectsEyebrow} title={t.projectsTitle} copy={t.projectsCopy}/>
        <div className="n2-case-grid">
          <CaseCard name="CERNE" type={t.cerneDesc} image="/images/cerne/hero.jpg" href={routes.work+'#cerne'} demo={t.concept} view={t.seeStudy} lang={lang} />
          <CaseCard name="Villa Serena" type={t.villaDesc} image="/images/villa-serena/hero.jpg" href={routes.work} anchor="cerne" demo={t.concept} view={t.seeStudy} lang={lang} />
        </div>
      </div>
    </section>
    <section className="n2-section n2-container">
      <SectionTop eyebrow={t.capabilityEyebrow} title={t.capabilityTitle} copy={t.capabilityCopy}/>
      <div className="n2-service-grid">
        {t.capabilityItems.map(item=><article className="n2-service" key={item.n}><span>{item.n} / N</span><h3>{item.name}</h3><p>{item.desc}</p><ArrowDownRight size={24}/></article>)}
      </div>
    </section>
    <section className="n2-philosophy n2-container">
      <div className="n2-philosophy-mark"><Symbol size={110}/></div>
      <div><span className="n2-eyebrow">{t.philosophyEyebrow}</span><h2 className="n2-quote">{t.philosophyTitle}</h2><p className="n2-lead">{t.philosophyCopy}</p></div>
    </section>
    <FinalCTA t={t} lang={lang}/>
  </>;
}

function FinalCTA({ t, lang }: { t: typeof dictionary.pt; lang: Lang }) {
  return <section className="n2-final">
    <div className="n2-container n2-final-inner">
      <div><span className="n2-eyebrow">NEXT / NEURALABS</span><h2 className="n2-h2">{t.bottomTitle}</h2><p>{t.bottomCopy}</p></div>
      <Link className="n2-round-large" href={routes.contact+(lang==='en'?'?lang=en':'')} aria-label={t.inquiry}><ArrowUpRight size={29}/></Link>
    </div>
  </section>;
}

function Services({ t, lang }: { t: typeof dictionary.pt; lang: Lang }) {
  return <>
    <div className="n2-pagehero n2-container">
      <span className="n2-eyebrow">{t.servicesEyebrow}</span>
      <h1 className="n2-page-title">{t.servicesTitle}</h1>
      <p className="n2-lead">{t.servicesIntro}</p>
      <div className="n2-page-rule"><span>DISCOVER / DESIGN / DEVELOP / VALIDATE</span><ArrowDownRight size={20}/></div>
    </div>
    <section className="n2-section n2-container">
      <SectionTop eyebrow="01 / EXPERTISE" title={t.capabilityTitle} copy={t.capabilityCopy}/>
      <div className="n2-service-grid">{t.capabilityItems.map(i=><article className="n2-service" key={i.n}><span>{i.n} / N</span><h3>{i.name}</h3><p>{i.desc}</p><ArrowDownRight size={24}/></article>)}</div>
    </section>
    <section className="n2-section n2-work-section">
      <div className="n2-container">
        <SectionTop eyebrow={t.processEyebrow} title={t.processTitle}/>
        <div className="n2-process">{t.process.map(i=><article key={i.n}><span className="n2-process-index">{i.n}</span><div><h3>{i.title}</h3><p>{i.desc}</p></div><ChevronRight size={20}/></article>)}</div>
      </div>
    </section>
    <section className="n2-section n2-container">
      <SectionTop eyebrow={t.scopeEyebrow} title={t.scopeTitle}/>
      <div className="n2-check-grid">{t.scope.map(i=><div key={i}><ShieldCheck size={20}/><span>{i}</span></div>)}</div>
    </section>
    <FinalCTA t={t} lang={lang}/>
  </>;
}

function Work({ t, lang }: { t: typeof dictionary.pt; lang: Lang }) {
  return <>
    <div className="n2-pagehero n2-container">
      <span className="n2-eyebrow">{t.portfolioEyebrow}</span>
      <h1 className="n2-page-title">{t.portfolioTitle}</h1>
      <p className="n2-lead">{t.portfolioIntro}</p>
      <div className="n2-page-rule"><span>002 / CONCEPTUAL PROJECTS</span><ArrowDownRight size={20}/></div>
    </div>
    {[
      {id:'cerne',name:'CERNE',descriptor:t.cerneDesc,img:'/images/cerne/hero.jpg',challenge:t.cerneChallenge,hypothesis:t.cerneHypothesis,design:t.cerneDesign,link:'/demo/marcenaria'},
      {id:'villa',name:'Villa Serena',descriptor:t.villaDesc,img:'/images/villa-serena/hero.jpg',challenge:t.villaChallenge,hypothesis:t.villaHypothesis,design:t.villaDesign,link:'/demo/airbnb'},
    ].map((c,i)=><section id={c.id} className={'n2-case-study '+(i%2?'n2-case-study-alt':'')} key={c.id}>
      <div className="n2-container">
        <div className="n2-case-study-top"><span className="n2-eyebrow">{String(i+1).padStart(2,'0')} / CASE STUDY</span><span>{t.concept}</span></div>
        <h2 className="n2-case-title">{c.name}</h2>
        <p className="n2-lead">{c.descriptor}</p>
        <div className="n2-case-hero-image"><Image src={c.img} width={1500} height={840} alt={c.name+' — '+c.descriptor} sizes="(max-width: 900px) 100vw, 1200px"/></div>
        <div className="n2-case-analysis">
          <div><span>01</span><h3>{t.caseContext}</h3><p>{c.challenge}</p></div>
          <div><span>02</span><h3>{t.caseThinking}</h3><p>{c.hypothesis}</p></div>
          <div><span>03</span><h3>{t.caseDecision}</h3><p>{c.design}</p></div>
        </div>
        <a className="n2-button n2-button-primary" href={c.link+(lang==='en'?'?lang=en':'')} target="_blank" rel="noopener noreferrer">{t.demo}<ArrowUpRight size={18}/></a>
      </div>
    </section>)}
    <FinalCTA t={t} lang={lang}/>
  </>;
}

function Contact({ t, lang }: { t: typeof dictionary.pt; lang: Lang }) {
  const [step,setStep]=useState(0);
  const [answers,setAnswers]=useState(['','','']);
  const selections=[t.objectives,t.industries,t.timelines];
  const headings=[t.objective,t.industry,t.timeline];
  const update=(value:string)=>setAnswers(prev=>prev.map((a,i)=>i===step?value:a));
  const done=step===3;
  return <>
    <div className="n2-pagehero n2-container">
      <span className="n2-eyebrow">{t.contactEyebrow}</span>
      <h1 className="n2-page-title">{t.contactTitle}</h1>
      <p className="n2-lead">{t.contactIntro}</p>
    </div>
    <section className="n2-container n2-contact-layout">
      <div className="n2-wizard">
        <div className="n2-wizard-progress"><span>{done?'03':String(step+1).padStart(2,'0')} / 03</span><span>{done?'COMPLETE':t.stepLabels[step]}</span></div>
        <div className="n2-progress-track"><div style={{width:((done?3:step+1)/3*100)+'%'}}/></div>
        {done?<div className="n2-wizard-result" role="status">
          <span className="n2-wizard-check"><Check size={28}/></span>
          <h2>{t.finished}</h2>
          <p>{t.finishedBody}</p>
          <button type="button" className="n2-button n2-button-outline" onClick={()=>{setStep(0);setAnswers(['','','']);}}>{t.reset}<ArrowRight size={16}/></button>
        </div>:<div className="n2-wizard-question">
          <span className="n2-eyebrow">{t.question} {step+1} {t.of} 3</span>
          <h2>{headings[step]}</h2>
          <div className="n2-options" role="group" aria-label={headings[step]}>
            {selections[step].map(option=><button type="button" key={option} aria-pressed={answers[step]===option} className={'n2-option'+(answers[step]===option?' n2-option-selected':'')} onClick={()=>update(option)}><span>{option}</span><CircleDot size={18}/></button>)}
          </div>
          <div className="n2-wizard-controls">
            <button type="button" className="n2-button n2-button-outline" disabled={step===0} onClick={()=>setStep(s=>s-1)}>{t.back}</button>
            <button type="button" className="n2-button n2-button-primary" disabled={!answers[step]} onClick={()=>setStep(s=>s+1)}>{t.next}<ArrowRight size={17}/></button>
          </div>
          <p className="n2-prototype-note"><ShieldCheck size={15}/>{t.noSubmission}</p>
        </div>}
      </div>
      <aside className="n2-contact-aside"><span className="n2-eyebrow">{t.contactAsideEyebrow}</span><h2>{t.contactAsideTitle}</h2><p>{t.contactAsideCopy}</p><SignalMini/><span>THINK / DESIGN / TEST</span></aside>
    </section>
  </>;
}

function SignalMini(){
 return <div className="n2-mini-signal" aria-hidden="true"><div/><div/><div/><i/><i/></div>;
}

function Orlando({ t, lang }: { t: typeof dictionary.pt; lang: Lang }) {
 return <>
   <div className="n2-pagehero n2-orlando-header n2-container">
     <span className="n2-eyebrow"><Globe2 size={15}/>{t.orlandoEyebrow}</span>
     <h1 className="n2-page-title">{t.orlandoTitle}</h1>
     <p className="n2-lead">{t.orlandoIntro}</p>
     <span className="n2-pilot-note">{t.orlandoNote}</span>
   </div>
   <section className="n2-section n2-container n2-orlando-offer">
     <div className="n2-orlando-type"><span>FLORIDA / USA</span><strong>ORL</strong><div className="n2-orlando-lines"/><span>28.5383° N · 81.3792° W</span></div>
     <div className="n2-orlando-summary">
       <span className="n2-eyebrow">PILOT / 01</span>
       <h2 className="n2-h2">{t.orlandoOfferTitle}</h2><p className="n2-lead">{t.orlandoOfferCopy}</p>
       <ul>{t.orlandoBullets.map(b=><li key={b}><Check size={17}/>{b}</li>)}</ul>
       <p className="n2-scope-note">{t.orlandoExclusion}</p>
       <Link href={routes.contact+(lang==='en'?'?lang=en':'')} className="n2-button n2-button-primary">{t.orlandoCTA}<ArrowUpRight size={18}/></Link>
     </div>
   </section>
   <section className="n2-section n2-work-section"><div className="n2-container"><SectionTop eyebrow={t.marketEyebrow} title={t.marketTitle} copy={t.marketCopy}/></div></section>
   <FinalCTA t={t} lang={lang}/>
 </>;
}

export default function StudioExperience({page}: {page:Page}){
  const [lang,setLang]=useState<Lang>('pt');
  const [menuOpen,setMenuOpen]=useState(false);
  useEffect(()=>{
    const q=new URLSearchParams(window.location.search);
    if(q.get('lang')==='en')setLang('en');
  },[]);
  const changeLang=(value:Lang)=>{
    setLang(value);
    const url=new URL(window.location.href);
    if(value==='en') url.searchParams.set('lang','en'); else url.searchParams.delete('lang');
    window.history.replaceState(null,'',url.pathname+url.search+url.hash);
  };
  const t=dictionary[lang];
  const navOrder:Page[]=['home','services','work','orlando'];
  const href=(to:Page)=>routes[to]+(lang==='en'?'?lang=en':'');
  return <div className="n2-root" lang={lang}>
    <div className="n2-utility"><div className="n2-container"><span><span className="n2-utility-dot"/>{t.utility}</span><span>2026 — DESIGN IN PROGRESS</span></div></div>
    <header className="n2-header">
      <div className="n2-container n2-header-inner">
        <Link href={href('home')} className="n2-brand" aria-label="Neuralabs — Home"><Symbol size={33}/><span><strong>NEURALABS</strong><small>{t.studio}</small></span></Link>
        <nav className={'n2-nav'+(menuOpen?' n2-nav-open':'')} aria-label={lang==='pt'?'Navegação principal':'Main navigation'}>
          {navOrder.map(to=><Link key={to} href={href(to)} className={page===to?'n2-nav-current':''} aria-current={page===to?'page':undefined} onClick={()=>setMenuOpen(false)}>{t.nav[to]}</Link>)}
          <Link href={href('contact')} className="n2-nav-mobile-cta" onClick={()=>setMenuOpen(false)}>{t.inquiry}</Link>
        </nav>
        <div className="n2-header-actions">
          <div className="n2-language" aria-label="Language">
            <button type="button" onClick={()=>changeLang('pt')} aria-pressed={lang==='pt'}>PT</button>
            <span>/</span>
            <button type="button" onClick={()=>changeLang('en')} aria-pressed={lang==='en'}>EN</button>
          </div>
          <Link href={href('contact')} className="n2-header-cta">{t.inquiry}<ArrowUpRight size={15}/></Link>
          <button className="n2-menu-button" type="button" onClick={()=>setMenuOpen(v=>!v)} aria-label={menuOpen?'Close menu':'Open menu'} aria-expanded={menuOpen}>{menuOpen?<X size={23}/>:<Menu size={23}/>}</button>
        </div>
      </div>
    </header>
    <main id="main" className="n2-main">
      {page==='home'&&<Home t={t} lang={lang}/>}
      {page==='services'&&<Services t={t} lang={lang}/>}
      {page==='work'&&<Work t={t} lang={lang}/>}
      {page==='contact'&&<Contact t={t} lang={lang}/>}
      {page==='orlando'&&<Orlando t={t} lang={lang}/>}
    </main>
    <footer className="n2-footer"><div className="n2-container">
      <div className="n2-footer-top"><Link className="n2-brand" href={href('home')}><Symbol size={38}/><span><strong>NEURALABS</strong><small>{t.studio}</small></span></Link><div><Link href={href('services')}>{t.nav.services}</Link><Link href={href('work')}>{t.nav.work}</Link><Link href={href('orlando')}>{t.nav.orlando}</Link><Link href={href('contact')}>{t.nav.contact}</Link></div></div>
      <div className="n2-footer-bottom"><span>© 2026 NEURALABS — INDEPENDENT DIGITAL STUDIO</span><span>{t.footerNote}</span></div>
    </div></footer>
  </div>;
}
