'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { ScrollReveal } from '@/components/HeroAnimations';
import { useLanguage } from '@/context/LanguageContext';

// Sits between Preços and Contato on purpose: this is exactly the moment a
// serious buyer has the practical questions ("o que acontece depois do
// suporte?", "o domínio é meu?") that a landing page pitch never answers —
// today those only got resolved by messaging on WhatsApp, which is friction
// this section removes before the final CTA.
export const FAQ = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-6 bg-obsidian-800/40">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <Badge variant="primary" className="mb-4">
              {t.faq.badge}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-pearl-100 mb-4">{t.faq.heading}</h2>
            <p className="text-pearl-300/70 max-w-2xl mx-auto leading-relaxed">{t.faq.subheading}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-col gap-3">
            {t.faq.items.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={item.question}
                  className="rounded-xl border border-pearl-100/10 bg-obsidian-900/40 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 text-pearl-100 font-semibold text-sm md:text-base"
                  >
                    {item.question}
                    <ChevronDown
                      className={`w-4 h-4 flex-shrink-0 text-gold-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm text-pearl-300/70 leading-relaxed">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
