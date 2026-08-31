'use client';

import { useRef, useState } from 'react';
import { GripVertical } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { ScrollReveal } from '@/components/HeroAnimations';

export const InteractiveComparison = () => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    containerRef.current?.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <section id="comparativo" className="py-24 px-6 bg-obsidian-900">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <Badge variant="primary" className="mb-4">
              Antes & Depois
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-pearl-100 mb-4">
              Arraste e veja a diferença de uma decisão de design
            </h2>
            <p className="text-pearl-300/70 max-w-2xl mx-auto leading-relaxed">
              Do site genérico à experiência desenhada para conversão — a mesma empresa,
              dois resultados completamente diferentes.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="relative w-full aspect-video rounded-2xl overflow-hidden border border-pearl-100/10 select-none cursor-ew-resize touch-none"
          >
            {/* DEPOIS — base layer, content anchored right so it stays visible past the handle */}
            <div className="absolute inset-0 bg-gradient-to-br from-obsidian-800 to-obsidian-900 flex flex-col justify-center items-end text-right p-10">
              <span className="text-xs tracking-widest uppercase text-blush-300 mb-3">Neuralabs</span>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-pearl-100 mb-3 max-w-xs ml-auto">
                Elegância que conduz à decisão
              </h3>
              <p className="text-sm text-pearl-300/60 max-w-xs ml-auto mb-6">
                Hierarquia visual clara, prova social estratégica e um único caminho até o WhatsApp.
              </p>
              <span className="px-5 py-2.5 rounded-lg bg-blush-500 text-obsidian-900 text-sm font-bold">
                Falar Agora
              </span>
            </div>

            {/* ANTES — clipped overlay */}
            <div
              className="absolute inset-0 bg-white flex flex-col justify-center items-start p-10 pointer-events-none"
              style={{ clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)` }}
            >
              <span className="text-xs uppercase text-slate-400 mb-3">site-generico.com</span>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-700 mb-3">
                Bem-vindo ao nosso site
              </h3>
              <p className="text-sm text-slate-500 max-w-xs mb-6">
                Lorem ipsum dolor sit amet, texto genérico sem hierarquia nem direção clara de ação.
              </p>
              <span className="px-5 py-2.5 rounded bg-slate-300 text-slate-600 text-sm font-semibold">
                Saiba Mais
              </span>
            </div>

            <span className="absolute top-4 left-4 pointer-events-none inline-block px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase bg-slate-200/80 border border-slate-400/40 text-slate-600">
              Antes
            </span>
            <Badge variant="info" className="absolute top-4 right-4 pointer-events-none !bg-obsidian-900/70">
              Depois
            </Badge>

            {/* Handle */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-pearl-100/80"
              style={{ left: `${position}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-blush-500 border-2 border-pearl-100 flex items-center justify-center shadow-blush-glow">
                <GripVertical className="w-5 h-5 text-obsidian-900" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
