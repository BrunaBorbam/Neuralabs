'use client';

import { useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/Logo';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { trackButtonClick } from '@/lib/ga';
import { useLanguage } from '@/context/LanguageContext';

const LanguageSwitcher = ({ className = '' }: { className?: string }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`inline-flex items-center gap-0.5 sm:gap-1 rounded-full border border-pearl-100/15 bg-pearl-100/5 p-1 text-xs font-bold tracking-wide flex-shrink-0 ${className}`}
    >
      {(['pt', 'en'] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          aria-pressed={language === lang}
          className={`px-2 sm:px-3 py-1.5 rounded-full transition-colors ${
            language === lang
              ? 'bg-pearl-100 text-obsidian-900'
              : 'text-pearl-300/60 hover:text-pearl-100'
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const handleCtaClick = () => {
    trackButtonClick('diagnostico_whatsapp', 'navbar');
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-obsidian-900/85 backdrop-blur-lg border-b border-pearl-100/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
        <Logo tagline={t.nav.tagline} />

        <div className="hidden md:flex items-center gap-8">
          {t.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-pearl-300/80 hover:text-blush-300 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <a
            href={getWhatsAppLink(t.hero.waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCtaClick}
          >
            <Button variant="primary" size="sm">
              {t.nav.cta}
            </Button>
          </a>
        </div>

        <div className="flex md:hidden items-center gap-2 flex-shrink-0">
          <LanguageSwitcher />
          <a
            href={getWhatsAppLink(t.hero.waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCtaClick}
            aria-label={t.nav.cta}
            className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-blush-500 text-obsidian-900"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
          <button
            className="text-pearl-100 flex-shrink-0"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4 border-t border-pearl-100/10 pt-4">
          {t.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-sm text-pearl-300/80 hover:text-blush-300 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={getWhatsAppLink(t.hero.waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCtaClick}
          >
            <Button variant="primary" size="sm" className="w-full">
              {t.nav.cta}
            </Button>
          </a>
        </div>
      )}
    </header>
  );
};
