'use client';

import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { trackButtonClick } from '@/lib/ga';
import { useLanguage } from '@/context/LanguageContext';

export const FloatingWhatsApp = () => {
  const { t } = useLanguage();

  return (
    <a
      href={getWhatsAppLink(t.hero.waMessage)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackButtonClick('diagnostico_whatsapp', 'floating_button')}
      aria-label={t.nav.cta}
      className="fixed bottom-6 right-6 z-50 md:hidden flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 border-2 border-gold-300/50 shadow-[0_0_20px_rgba(197,140,59,0.55)] active:scale-95 transition-transform"
    >
      <MessageCircle className="w-7 h-7 text-obsidian-900" />
    </a>
  );
};
