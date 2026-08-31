'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { trackButtonClick } from '@/lib/ga';

const NAV_LINKS = [
  { label: 'Pilares', href: '#pilares' },
  { label: 'Nichos', href: '#nichos' },
  { label: 'Antes & Depois', href: '#comparativo' },
  { label: 'Preços', href: '#precos' },
  { label: 'Contato', href: '#contato' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCtaClick = () => {
    trackButtonClick('diagnostico_whatsapp', 'navbar');
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-obsidian-900/85 backdrop-blur-lg border-b border-pearl-100/10">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#top" className="text-xl font-serif font-bold tracking-[0.15em] text-pearl-100">
          NEURALABS
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-pearl-300/80 hover:text-blush-300 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href={getWhatsAppLink('Olá! Quero solicitar um diagnóstico de conversão do meu site.')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCtaClick}
          >
            <Button variant="primary" size="sm">
              Diagnóstico no WhatsApp
            </Button>
          </a>
        </div>

        <button
          className="md:hidden text-pearl-100"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4 border-t border-pearl-100/10 pt-4">
          {NAV_LINKS.map((link) => (
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
            href={getWhatsAppLink('Olá! Quero solicitar um diagnóstico de conversão do meu site.')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCtaClick}
          >
            <Button variant="primary" size="sm" className="w-full">
              Diagnóstico no WhatsApp
            </Button>
          </a>
        </div>
      )}
    </header>
  );
};
