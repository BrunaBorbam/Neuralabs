'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { useLanguage } from '@/context/LanguageContext';

export const SocialProof = () => {
  const { t } = useLanguage();

  return (
    <section id="depoimentos" className="py-24 px-6 bg-obsidian-900 border-t border-pearl-100/5">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="secondary" className="mb-4">
            A Prova
          </Badge>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-pearl-100 mb-6">
            O resultado de quem aplicou
          </h2>
          <p className="text-pearl-300/70 max-w-2xl mx-auto leading-relaxed mb-16">
            Não acredite apenas na teoria. Veja o impacto real de focar em neuromarketing e design de conversão no faturamento.
          </p>
        </motion.div>

        {/* SENJA.IO EMBED PLACEHOLDER */}
        <div className="relative rounded-2xl border border-pearl-100/10 bg-obsidian-800/50 backdrop-blur-md p-10 min-h-[400px] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-gold-500 font-serif text-2xl">”</span>
            </div>
            <p className="text-pearl-300/60 mb-2 max-w-md mx-auto">
              [ Cole aqui o iframe do Senja.io ou Testimonial.to ]
            </p>
            <p className="text-xs text-pearl-300/40">
              Isso substituirá este card estático por um mural dinâmico de vídeos dos seus clientes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
