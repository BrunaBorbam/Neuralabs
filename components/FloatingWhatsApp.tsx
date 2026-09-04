'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { trackButtonClick } from '@/lib/ga';
import { useLanguage } from '@/context/LanguageContext';

export const FloatingWhatsApp = () => {
  const { t } = useLanguage();
  // The fixed FAB sits on top of page content by design, but on mobile it
  // ends up parked directly over the contact form's fields (and its own
  // "Falar Agora" CTA) — a redundant WhatsApp entry point blocking the one
  // the user is trying to tap. Hide it while #contato is in view instead of
  // reworking the form layout around a corner button.
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const contactSection = document.getElementById('contato');
    if (!contactSection) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(contactSection);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={getWhatsAppLink(t.hero.waMessage)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackButtonClick('diagnostico_whatsapp', 'floating_button')}
      aria-label={t.nav.cta}
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
      className={`fixed bottom-6 right-6 z-50 md:hidden flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 border-2 border-gold-300/50 shadow-[0_0_20px_rgba(197,140,59,0.55)] active:scale-95 transition-all duration-300 ${
        hidden ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100'
      }`}
    >
      <MessageCircle className="w-7 h-7 text-obsidian-900" />
    </a>
  );
};
