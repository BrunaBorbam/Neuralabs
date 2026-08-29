'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstaller = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered:', registration);

          // Check for updates periodically
          setInterval(() => {
            registration.update();
          }, 60000); // Check every minute
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    }

    // Detect iOS
    const userAgent = navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream);

    // Listen for install prompt
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      // Show install prompt after user has interacted
      setTimeout(() => setShowPrompt(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (!showPrompt || (!deferredPrompt && !isIOS)) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 max-w-xs shadow-xl animate-pulse z-50">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-bold text-white mb-1">Instale o Neuralabs</h3>
          <p className="text-xs text-white/70 mb-3">
            {isIOS ? 'Acesse offline e mais rápido. Toque em Compartilhar → Adicionar à Tela de Início' : 'Acesso offline e mais rápido!'}
          </p>
          {deferredPrompt && !isIOS && (
            <button
              onClick={handleInstall}
              className="text-xs bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-full font-semibold transition-colors"
            >
              Instalar Agora
            </button>
          )}
        </div>
        <button
          onClick={() => setShowPrompt(false)}
          className="text-white/60 hover:text-white transition-colors"
          aria-label="Fechar"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};
