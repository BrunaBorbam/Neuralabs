'use client';

import { Brain } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/Badge';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { useLanguage } from '@/context/LanguageContext';

const copy = {
  pt: {
    badge: 'Nossa Metodologia',
    titleLine1: 'A Ciência por Trás da',
    titleHighlight: 'Conversão Humana',
    intro:
      'Por que um botão na cor errada destrói o seu lucro? Entenda o framework de neurociência e psicologia de decisão que aplicamos na criação de interfaces digitais.',
    cardTitle: 'Esta página está sendo escrita',
    cardBody:
      'Estamos preparando um documento completo para você entender o uso estratégico do Sistema 1 (emoção) e Sistema 2 (razão) aplicados à web.',
    cta: 'Discutir estratégia no WhatsApp',
    waMessage:
      'Olá, fiquei interessado na metodologia da Neuralabs e quero saber como ela se aplica ao meu negócio.',
  },
  en: {
    badge: 'Our Methodology',
    titleLine1: 'The Science Behind',
    titleHighlight: 'Human Conversion',
    intro:
      'Why does a button in the wrong color destroy your profit? Understand the neuroscience and decision-psychology framework we apply when creating digital interfaces.',
    cardTitle: 'This page is being written',
    cardBody:
      'We are preparing a complete document so you can understand the strategic use of System 1 (emotion) and System 2 (reason) applied to the web.',
    cta: 'Discuss strategy on WhatsApp',
    waMessage:
      "Hi, I'm interested in Neuralabs' methodology and would like to know how it applies to my business.",
  },
} as const;

export function MetodologiaContent() {
  const { language } = useLanguage();
  const c = copy[language];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-obsidian-900 text-pearl-200 pt-32 pb-24 px-6 flex flex-col items-center">
        <div className="max-w-4xl mx-auto text-center w-full">
          <Badge variant="primary" className="mb-6 mx-auto">
            {c.badge}
          </Badge>

          <h1 className="text-4xl md:text-6xl font-serif font-black mb-8 leading-tight text-pearl-100">
            {c.titleLine1} <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blush-400 via-blush-500 to-blush-600">
              {c.titleHighlight}
            </span>
          </h1>

          <p className="text-lg text-pearl-300/70 mb-16 max-w-2xl mx-auto">
            {c.intro}
          </p>

          <div className="p-12 border border-pearl-100/10 rounded-2xl bg-obsidian-800/50 backdrop-blur-sm max-w-3xl mx-auto">
            <Brain className="w-12 h-12 mb-6 text-graphite-500" aria-hidden="true" />
            <h3 className="text-2xl font-bold text-pearl-100 mb-4">{c.cardTitle}</h3>
            <p className="text-pearl-300/60 mb-8">
              {c.cardBody}
            </p>
            <a
              href={getWhatsAppLink(c.waMessage)}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-8 py-4 rounded-full bg-pearl-100 text-obsidian-900 font-bold hover:scale-105 transition-transform"
            >
              {c.cta}
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
