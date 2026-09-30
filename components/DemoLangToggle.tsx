'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Floating PT/EN switch for the standalone demo pages.
 * - Reuses the site-wide LanguageContext (so it shares the same `language`).
 * - On mount, reads ?lang=en|pt (or #en / #pt) from the URL so a demo can be
 *   shared pre-set to a language, e.g. /demo/cerne?lang=en for a foreign client.
 * - Fixed top-right, high z-index, works on any demo background.
 */
export const DemoLangToggle = ({ className = '' }: { className?: string }) => {
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const fromQuery = params.get('lang');
      const fromHash = window.location.hash.replace('#', '');
      const wanted = (fromQuery || fromHash || '').toLowerCase();
      if (wanted === 'en' || wanted === 'pt') {
        setLanguage(wanted);
      }
    } catch {
      // no-op
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`fixed top-4 right-4 z-[9999] flex items-center gap-1 rounded-full border border-white/20 bg-black/50 p-1 backdrop-blur-md ${className}`}
    >
      {(['pt', 'en'] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          aria-pressed={language === lang}
          className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full transition-colors ${
            language === lang
              ? 'bg-white text-black'
              : 'text-white/70 hover:text-white'
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};
