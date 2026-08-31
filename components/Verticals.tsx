'use client';

import Image from 'next/image';
import { Home, Ruler, UtensilsCrossed, ShoppingBag } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { ScrollReveal } from '@/components/HeroAnimations';

interface Vertical {
  icon: React.ReactNode;
  image: string;
  name: string;
  proposal: string;
  tags: string[];
}

const verticals: Vertical[] = [
  {
    icon: <Home className="w-6 h-6 text-blush-300" />,
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    name: 'Hospitalidade & Airbnb',
    proposal:
      'Páginas que vendem a estadia antes da reserva: prova social, disponibilidade em tempo real e gatilhos de escassez para hóspedes de alto padrão.',
    tags: ['Reservas Diretas', 'Prova Social'],
  },
  {
    icon: <Ruler className="w-6 h-6 text-blush-300" />,
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    name: 'Marcenaria de Luxo & Arquitetura',
    proposal:
      'Portfólios que comunicam exclusividade: apresentação editorial de projetos e ancoragem de valor para clientes de altíssimo ticket.',
    tags: ['Ancoragem de Valor', 'Portfólio Editorial'],
  },
  {
    icon: <UtensilsCrossed className="w-6 h-6 text-blush-300" />,
    image:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    name: 'Gastronomia',
    proposal:
      'Cardápios e experiências que despertam apetite e urgência: reservas facilitadas e storytelling sensorial que converte visitantes em mesas ocupadas.',
    tags: ['Reservas Facilitadas', 'Storytelling Sensorial'],
  },
  {
    icon: <ShoppingBag className="w-6 h-6 text-blush-300" />,
    image:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    name: 'E-commerce',
    proposal:
      'Jornadas de compra sem fricção: arquitetura de decisão aplicada a vitrines, checkout e recuperação de carrinho para maximizar o ticket médio.',
    tags: ['Redução de Fricção', 'Ticket Médio'],
  },
];

export const Verticals = () => {
  return (
    <section id="nichos" className="py-24 px-6 bg-obsidian-800/40">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-4">
              Nichos Estratégicos
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-pearl-100 mb-4">
              Especialistas em quatro mercados de alto ticket
            </h2>
            <p className="text-pearl-300/70 max-w-2xl mx-auto leading-relaxed">
              Cada nicho tem sua própria psicologia de compra. Desenhamos cada site para o
              comportamento específico do seu cliente.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {verticals.map((vertical) => (
            <ScrollReveal key={vertical.name}>
              <div className="rounded-2xl overflow-hidden border border-pearl-100/10 bg-obsidian-800/60 h-full flex flex-col">
                <div className="group relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={vertical.image}
                    alt={vertical.name}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A0E]/60 via-[#0B0A0E]/10 to-transparent" />
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-obsidian-900/70 border border-blush-500/30 flex items-center justify-center backdrop-blur-sm">
                    {vertical.icon}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-pearl-100 mb-3">{vertical.name}</h3>
                  <p className="text-pearl-300/70 leading-relaxed mb-6 flex-1">
                    {vertical.proposal}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {vertical.tags.map((tag) => (
                      <Badge key={tag} variant="primary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
