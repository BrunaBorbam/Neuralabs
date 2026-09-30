'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { useLanguage } from '@/context/LanguageContext';

const copy = {
  pt: {
    badge: 'A Ciência',
    titleLine1: 'A ciência do',
    titleHighlight: 'Web Design de Conversão',
    intro:
      'O neuromarketing não é "achismo" estético. É biologia humana aplicada aos negócios. Veja o que os maiores centros de pesquisa do mundo dizem sobre o impacto do design na conversão.',
    sourceLabel: 'Fonte: ',
    cards: [
      {
        stat: '94%',
        title: 'Das primeiras impressões são baseadas no design',
        body: 'Quando um usuário entra no seu site, ele não lê o seu texto antes de julgar a sua empresa. O julgamento é puramente visual e ocorre no subconsciente.',
        source: 'Stanford University',
      },
      {
        stat: '50ms',
        title: 'Para formar uma opinião',
        body: 'Em apenas 0.05 segundos, o cérebro humano decide se fica na sua página ou se volta para o Google para procurar o seu concorrente.',
        source: 'Nature / Gitte Lindgaard',
      },
      {
        stat: '88%',
        title: 'Menos chance de retorno',
        body: 'Dos consumidores online são menos propensos a retornar a um site depois de uma experiência ruim de interface (fricção cognitiva alta).',
        source: 'Amazon Web Services',
      },
    ],
  },
  en: {
    badge: 'The Science',
    titleLine1: 'The science of',
    titleHighlight: 'Conversion Web Design',
    intro:
      'Neuromarketing isn\'t aesthetic guesswork. It\'s human biology applied to business. See what the world\'s leading research centers say about the impact of design on conversion.',
    sourceLabel: 'Source: ',
    cards: [
      {
        stat: '94%',
        title: 'Of first impressions are based on design',
        body: 'When a user lands on your site, they don\'t read your copy before judging your company. The judgment is purely visual and happens subconsciously.',
        source: 'Stanford University',
      },
      {
        stat: '50ms',
        title: 'To form an opinion',
        body: 'In just 0.05 seconds, the human brain decides whether to stay on your page or go back to Google to find your competitor.',
        source: 'Nature / Gitte Lindgaard',
      },
      {
        stat: '88%',
        title: 'Less likely to return',
        body: 'Of online consumers are less likely to return to a site after a poor interface experience (high cognitive friction).',
        source: 'Amazon Web Services',
      },
    ],
  },
} as const;

export const SocialProof = () => {
  const { language } = useLanguage();
  const c = copy[language];

  return (
    <section id="depoimentos" className="py-24 px-6 bg-obsidian-900 border-t border-pearl-100/5">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="primary" className="mb-4">
            {c.badge}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-pearl-100 mb-6">
            {c.titleLine1} <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blush-400 to-gold-500">
              {c.titleHighlight}
            </span>
          </h2>
          <p className="text-pearl-300/70 max-w-2xl mx-auto leading-relaxed mb-16">
            {c.intro}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {c.cards.map((card, i) => (
            <div key={i} className="relative rounded-2xl border border-pearl-100/10 bg-obsidian-800/50 backdrop-blur-md p-8 text-left transition-all hover:bg-obsidian-800/80">
              <div className="text-gold-500 font-serif text-5xl font-black mb-4">{card.stat}</div>
              <h3 className="text-pearl-100 font-bold mb-3 text-lg">{card.title}</h3>
              <p className="text-pearl-300/60 text-sm mb-6">
                {card.body}
              </p>
              <div className="text-xs text-pearl-300/40 uppercase tracking-widest font-semibold">{c.sourceLabel}{card.source}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
