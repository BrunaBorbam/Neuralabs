'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import {
  Waves,
  Flame,
  BedDouble,
  ChefHat,
  Minus,
  Plus,
  MessageCircle,
  Sparkles,
  ArrowLeft,
  BadgeCheck,
} from 'lucide-react';
import { ScrollReveal } from '@/components/HeroAnimations';
import { getWhatsAppLink } from '@/lib/whatsapp';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85';

const NIGHTLY_RATE = 1850;
const AIRBNB_FEE_SAVINGS = 2400;

const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
});

const AMENITIES = [
  {
    icon: Waves,
    title: 'Piscina Aquecida com Borda Infinita',
  },
  {
    icon: Flame,
    title: 'Living Integrado com Lareira Ecológica',
  },
  {
    icon: BedDouble,
    title: 'Suíte Master com Vista Panorâmica',
  },
  {
    icon: ChefHat,
    title: 'Espaço Gourmet com Parrilla',
  },
];

const CONCIERGE_EXCHANGE = [
  { from: 'guest', text: 'Oi! O check-in pode ser depois das 20h?' },
  { from: 'ai', text: 'Claro! Na Villa Serena o check-in é flexível até a meia-noite, sem custo extra. Posso confirmar sua chegada às 20h?' },
];

export default function VillaSerenaDemo() {
  const [nights, setNights] = useState(4);

  const total = useMemo(() => nights * NIGHTLY_RATE, [nights]);

  const bookingMessage = `Olá! Vim pela demo Villa Serena da NEURALABS e gostaria de simular uma reserva de ${nights} ${nights === 1 ? 'noite' : 'noites'} (${currency.format(total)}).`;
  const conciergeMessage = 'Olá! Tenho uma dúvida sobre a Villa Serena.';

  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#14110D] text-[#F5F1E8] font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#14110D]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between gap-3">
          <span className="font-serif tracking-[0.25em] text-sm sm:text-lg uppercase text-[#F5F1E8]">
            Villa Serena
          </span>
          <a
            href="#reserva"
            className="flex-shrink-0 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-300 to-amber-500 text-[#14110D] text-xs sm:text-sm font-bold px-4 sm:px-6 py-2.5 sm:py-3 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-shadow whitespace-nowrap"
          >
            Reservar com Taxa 0%
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt="Villa Serena — vista da piscina de borda infinita ao entardecer"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14110D] via-[#14110D]/50 to-[#14110D]/10" />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pb-16 sm:pb-24 pt-40 w-full">
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.2em] text-amber-300 mb-5">
            <Sparkles className="w-4 h-4" />
            Luxury Beach House &amp; Boutique Suites
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl leading-[1.15] max-w-3xl text-balance break-words mb-6">
            Viva a exclusividade à beira-mar sem intermediários.
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#F5F1E8]/70 max-w-xl leading-relaxed mb-8">
            Villa Serena é sua casa de praia particular. Reserve direto com os proprietários —
            sem taxas de plataforma, sem intermediários, com atendimento dedicado do primeiro
            contato ao check-out.
          </p>
          <a
            href="#reserva"
            className="inline-flex items-center justify-center w-full sm:w-auto text-center rounded-full bg-[#F5F1E8] text-[#14110D] text-sm font-semibold px-8 py-4 shadow-md hover:shadow-lg transition-shadow"
          >
            Reservar Estadia Direta
          </a>
        </div>
      </section>

      {/* Amenities — edge-lit glass */}
      <section className="py-20 sm:py-28 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-xs uppercase tracking-[0.2em] text-amber-300">Comodidades</span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mt-3 text-balance">
                Cada detalhe pensado para o seu descanso
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AMENITIES.map((item) => (
              <ScrollReveal key={item.title}>
                <div
                  className="h-full rounded-2xl bg-white/[0.04] border border-amber-200/20 p-6 flex flex-col items-start gap-4"
                  style={{
                    boxShadow:
                      'inset 0 0 24px rgba(251,191,36,0.12), 0 0 30px rgba(251,191,36,0.06)',
                  }}
                >
                  <span className="w-11 h-11 rounded-full bg-amber-400/10 border border-amber-300/30 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-amber-300" />
                  </span>
                  <p className="text-sm sm:text-base font-medium leading-snug text-[#F5F1E8]">
                    {item.title}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Booking simulator */}
      <section id="reserva" className="py-20 sm:py-28 px-5 sm:px-8 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-amber-300">Reserva Direta</span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mt-3 text-balance">
                Simule sua estadia e veja quanto você economiza
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 sm:p-10 grid md:grid-cols-2 gap-10 items-center">
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-sm text-[#F5F1E8]/60 mb-3">Número de noites</p>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setNights((n) => Math.max(1, n - 1))}
                      className="w-11 h-11 flex-shrink-0 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                      aria-label="Diminuir noites"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-3xl font-serif w-12 text-center">{nights}</span>
                    <button
                      type="button"
                      onClick={() => setNights((n) => Math.min(30, n + 1))}
                      className="w-11 h-11 flex-shrink-0 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                      aria-label="Aumentar noites"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-[#F5F1E8]/50">
                  Diária base: {currency.format(NIGHTLY_RATE)} • sem taxa de serviço, sem taxa de
                  limpeza adicional
                </p>
              </div>

              <div className="rounded-xl bg-[#14110D] border border-amber-300/20 p-6 sm:p-8 text-center">
                <p className="text-xs uppercase tracking-wide text-[#F5F1E8]/50 mb-2">
                  Valor total da estadia
                </p>
                <p className="font-serif text-3xl sm:text-4xl text-[#F5F1E8] mb-4">
                  {currency.format(total)}
                </p>
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/10 border border-amber-300/30 px-4 py-2 text-xs sm:text-sm text-amber-300 font-semibold">
                  <BadgeCheck className="w-4 h-4 flex-shrink-0" />
                  Economia de {currency.format(AIRBNB_FEE_SAVINGS)} em taxas vs. Airbnb
                </div>

                <a
                  href={getWhatsAppLink(bookingMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center w-full text-center rounded-full bg-gradient-to-r from-amber-300 to-amber-500 text-[#14110D] text-sm font-bold px-6 py-4 shadow-md"
                >
                  Confirmar Reserva Direta
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Concierge IA */}
      <section className="py-20 sm:py-28 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-amber-300">Concierge IA 24/7</span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mt-3 text-balance">
                Respostas instantâneas, a qualquer hora
              </h2>
              <p className="text-sm sm:text-base text-[#F5F1E8]/60 max-w-xl mx-auto mt-4 leading-relaxed">
                Um assistente treinado para a Villa Serena tira dúvidas de hóspedes em segundos,
                direto no WhatsApp.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 sm:p-8">
              <div className="flex flex-col gap-4 mb-6">
                {CONCIERGE_EXCHANGE.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`max-w-[85%] sm:max-w-sm rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.from === 'guest'
                        ? 'self-end bg-amber-400/15 border border-amber-300/25 text-[#F5F1E8]'
                        : 'self-start bg-white/[0.06] border border-white/10 text-[#F5F1E8]/90'
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              <a
                href={getWhatsAppLink(conciergeMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 justify-center w-full sm:w-auto text-center rounded-full border border-white/20 bg-white/5 text-[#F5F1E8] text-sm font-medium px-6 py-3.5 hover:bg-white/10 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Falar com o Concierge
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <footer className="py-10 px-5 sm:px-8 border-t border-white/10 text-center">
        <p className="text-xs text-[#F5F1E8]/40">
          Villa Serena é um projeto de demonstração fictício, criado por{' '}
          <a href="/" className="underline hover:text-amber-300 transition-colors">
            NEURALABS
          </a>
          .
        </p>
      </footer>

      {/* Floating back button — positioned left to avoid the global WhatsApp FAB on the right */}
      <a
        href="/"
        className="fixed bottom-6 left-6 z-50 inline-flex items-center gap-2 rounded-full bg-[#14110D]/90 border border-white/15 backdrop-blur-md text-[#F5F1E8] text-xs sm:text-sm font-semibold px-4 sm:px-5 py-3 shadow-lg hover:bg-[#14110D] transition-colors"
      >
        <ArrowLeft className="w-4 h-4 flex-shrink-0" />
        <span className="hidden sm:inline">Voltar para NEURALABS Studio</span>
        <span className="sm:hidden">NEURALABS</span>
      </a>
    </main>
  );
}
