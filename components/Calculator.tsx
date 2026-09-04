'use client';

import { useMemo, useState } from 'react';
import { Calculator as CalculatorIcon, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { ScrollReveal } from '@/components/HeroAnimations';
import { useLanguage } from '@/context/LanguageContext';

const POTENTIAL_CONVERSION_RATE = 4.5; // % — média alcançável com site otimizado por neuromarketing

export const Calculator = () => {
  const { t } = useLanguage();
  const [visitors, setVisitors] = useState(3000);
  const [conversionRate, setConversionRate] = useState(1.2);
  const [ticket, setTicket] = useState(450);

  const currency = useMemo(
    () =>
      new Intl.NumberFormat(t.calculator.locale, {
        style: 'currency',
        currency: t.calculator.currency,
        maximumFractionDigits: 0,
      }),
    [t.calculator.locale, t.calculator.currency]
  );

  const { monthlyLoss, annualLoss } = useMemo(() => {
    const gap = Math.max(0, POTENTIAL_CONVERSION_RATE - conversionRate) / 100;
    const monthly = visitors * gap * ticket;
    return { monthlyLoss: monthly, annualLoss: monthly * 12 };
  }, [visitors, conversionRate, ticket]);

  return (
    <section id="calculadora" className="py-24 px-6 bg-obsidian-800/40">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <Badge variant="primary" className="mb-4">
              {t.calculator.badge}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-pearl-100 mb-4">
              {t.calculator.heading}
            </h2>
            <p className="text-pearl-300/70 max-w-2xl mx-auto leading-relaxed">
              {t.calculator.subheading}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <Card variant="glass" className="grid md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-6">
              <div>
                <label className="flex justify-between text-sm text-pearl-300/70 mb-2">
                  <span>{t.calculator.visitorsLabel}</span>
                  <span className="font-semibold text-pearl-100">{visitors.toLocaleString(t.calculator.locale)}</span>
                </label>
                <input
                  type="range"
                  min={100}
                  max={50000}
                  step={100}
                  value={visitors}
                  onChange={(e) => setVisitors(Number(e.target.value))}
                  className="w-full accent-blush-500"
                />
              </div>

              <div>
                <label className="flex justify-between text-sm text-pearl-300/70 mb-2">
                  <span>{t.calculator.conversionLabel}</span>
                  <span className="font-semibold text-pearl-100">{conversionRate.toFixed(1)}%</span>
                </label>
                <input
                  type="range"
                  min={0.1}
                  max={5}
                  step={0.1}
                  value={conversionRate}
                  onChange={(e) => setConversionRate(Number(e.target.value))}
                  className="w-full accent-blush-500"
                />
              </div>

              <div>
                <label className="flex justify-between text-sm text-pearl-300/70 mb-2">
                  <span>{t.calculator.ticketLabel}</span>
                  <span className="font-semibold text-pearl-100">{currency.format(ticket)}</span>
                </label>
                <input
                  type="range"
                  min={50}
                  max={20000}
                  step={50}
                  value={ticket}
                  onChange={(e) => setTicket(Number(e.target.value))}
                  className="w-full accent-blush-500"
                />
              </div>
            </div>

            <div className="rounded-xl bg-obsidian-900/60 border border-pearl-100/10 p-8 flex flex-col justify-center items-center text-center">
              <span className="w-12 h-12 rounded-full bg-blush-500/10 border border-blush-500/30 flex items-center justify-center mb-4">
                <TrendingDown className="w-6 h-6 text-blush-300" />
              </span>
              <p className="text-sm text-pearl-300/60 mb-2">{t.calculator.monthlyLossLabel}</p>
              {/* Same reasoning as Pricing: numbers stay in the sans, not
                  the display serif — a price/loss figure needs to register
                  instantly, and Playfair Display's ornate numerals fight
                  that. */}
              <p className="text-3xl md:text-4xl font-sans font-black text-pearl-100 mb-4 tabular-nums tracking-tight">
                <AnimatedNumber value={monthlyLoss} format={currency.format} />
              </p>
              <div className="flex items-center gap-2 text-sm text-pearl-300/60 tabular-nums">
                <CalculatorIcon className="w-4 h-4" />
                <span>
                  <AnimatedNumber value={annualLoss} format={currency.format} /> {t.calculator.annualLossSuffix}
                </span>
              </div>
              {/* Discloses the reference rate the estimate is measured
                  against — without this the number reads as a scare figure
                  with no visible method, which works against exactly the
                  analytical buyer this calculator is meant to convince. */}
              <p className="text-xs text-pearl-300/40 mt-4 leading-relaxed">{t.calculator.benchmarkNote}</p>
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
};
