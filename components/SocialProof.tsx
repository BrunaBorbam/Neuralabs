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
          <Badge variant="primary" className="mb-4">
            A Ciência
          </Badge>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-pearl-100 mb-6">
            A ciência do <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blush-400 to-gold-500">
              Web Design de Conversão
            </span>
          </h2>
          <p className="text-pearl-300/70 max-w-2xl mx-auto leading-relaxed mb-16">
            O neuromarketing não é "achismo" estético. É biologia humana aplicada aos negócios. Veja o que os maiores centros de pesquisa do mundo dizem sobre o impacto do design na conversão.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="relative rounded-2xl border border-pearl-100/10 bg-obsidian-800/50 backdrop-blur-md p-8 text-left transition-all hover:bg-obsidian-800/80">
            <div className="text-gold-500 font-serif text-5xl font-black mb-4">94%</div>
            <h3 className="text-pearl-100 font-bold mb-3 text-lg">Das primeiras impressões são baseadas no design</h3>
            <p className="text-pearl-300/60 text-sm mb-6">
              Quando um usuário entra no seu site, ele não lê o seu texto antes de julgar a sua empresa. O julgamento é puramente visual e ocorre no subconsciente.
            </p>
            <div className="text-xs text-pearl-300/40 uppercase tracking-widest font-semibold">Fonte: Stanford University</div>
          </div>

          {/* Card 2 */}
          <div className="relative rounded-2xl border border-pearl-100/10 bg-obsidian-800/50 backdrop-blur-md p-8 text-left transition-all hover:bg-obsidian-800/80">
            <div className="text-gold-500 font-serif text-5xl font-black mb-4">50ms</div>
            <h3 className="text-pearl-100 font-bold mb-3 text-lg">Para formar uma opinião</h3>
            <p className="text-pearl-300/60 text-sm mb-6">
              Em apenas 0.05 segundos, o cérebro humano decide se fica na sua página ou se volta para o Google para procurar o seu concorrente.
            </p>
            <div className="text-xs text-pearl-300/40 uppercase tracking-widest font-semibold">Fonte: Nature / Gitte Lindgaard</div>
          </div>

          {/* Card 3 */}
          <div className="relative rounded-2xl border border-pearl-100/10 bg-obsidian-800/50 backdrop-blur-md p-8 text-left transition-all hover:bg-obsidian-800/80">
            <div className="text-gold-500 font-serif text-5xl font-black mb-4">88%</div>
            <h3 className="text-pearl-100 font-bold mb-3 text-lg">Menos chance de retorno</h3>
            <p className="text-pearl-300/60 text-sm mb-6">
              Dos consumidores online são menos propensos a retornar a um site depois de uma experiência ruim de interface (fricção cognitiva alta).
            </p>
            <div className="text-xs text-pearl-300/40 uppercase tracking-widest font-semibold">Fonte: Amazon Web Services</div>
          </div>
        </div>
      </div>
    </section>
  );
};
