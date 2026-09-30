'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';

const copy = {
  pt: {
    title: 'Respeito à sua privacidade',
    bodyBefore:
      'Usamos cookies e ferramentas de análise para melhorar sua experiência e entender como o site é usado. Seus dados pessoais são protegidos conforme a LGPD. Veja nossa ',
    bodyLink: 'política de privacidade',
    bodyAfter: '.',
    close: 'Fechar aviso de cookies',
    accept: 'Aceitar cookies',
    reject: 'Rejeitar',
  },
  en: {
    title: 'Respecting your privacy',
    bodyBefore:
      'We use cookies and analytics tools to improve your experience and understand how the site is used. Your personal data is protected under data-protection law. See our ',
    bodyLink: 'privacy policy',
    bodyAfter: '.',
    close: 'Close cookie notice',
    accept: 'Accept cookies',
    reject: 'Reject',
  },
} as const;

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();
  const c = copy[language];

  useEffect(() => {
    const hasConsent = localStorage.getItem('cookie-consent');
    if (!hasConsent) {
      setIsVisible(true);
    } else {
      // Se tem consentimento, ativa analytics
      activateAnalytics();
    }
  }, []);

  const activateAnalytics = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'default', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
      });
    }
  };

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    activateAnalytics();
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-slate-900/95 border border-slate-700 rounded-lg backdrop-blur-xl p-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <h3 className="font-bold text-white mb-2">{c.title}</h3>
            <p className="text-sm text-slate-300 mb-4">
              {c.bodyBefore}
              <a href="/privacy" className="text-blush-400 hover:text-blush-300 underline">{c.bodyLink}</a>
              {c.bodyAfter}
            </p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            aria-label={c.close}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex gap-4 flex-col sm:flex-row">
          <Button variant="primary" size="sm" onClick={handleAccept} className="flex-1">
            {c.accept}
          </Button>
          <Button variant="outline" size="sm" onClick={handleReject} className="flex-1">
            {c.reject}
          </Button>
        </div>
      </div>
    </div>
  );
}
