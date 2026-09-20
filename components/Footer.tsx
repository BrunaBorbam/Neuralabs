'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Logo } from '@/components/Logo';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-obsidian-900 border-t border-pearl-100/10 px-6 py-14">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        <div>
          <Logo />
          <p className="text-sm text-pearl-300/60 mt-3 leading-relaxed max-w-xs">
            {t.footer.tagline}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-widest text-pearl-300/50 mb-2">
            {t.footer.navHeading}
          </span>
          {t.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-pearl-300/70 hover:text-blush-300 transition-colors w-fit"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-widest text-pearl-300/50 mb-2">
            {t.footer.legalHeading}
          </span>
          <a href="/privacy" className="text-sm text-pearl-300/70 hover:text-blush-300 transition-colors w-fit">
            {t.footer.privacyLink}
          </a>
          <p className="text-sm text-pearl-300/50 mt-2 leading-relaxed">{t.footer.lgpdText}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-pearl-100/10 mt-10 pt-6 text-center">
        <p className="text-xs text-pearl-300/40">
          © {new Date().getFullYear()} {t.footer.copyrightSuffix}
        </p>
      </div>
    </footer>
  );
};
