'use client';

/**
 * Assinatura de motion da Ardósia — traço de tinta/giz se revelando (ver
 * docs/IDENTIDADES-E-EFEITOS.md, catálogo item "revelar tinta/brush stroke
 * SVG animado", ainda não usado por nenhum projeto até esta demo). A ideia
 * central da marca é "quadro-negro de bistrô": pratos do dia escritos à
 * mão num quadro de ardósia. Esse traço reaparece sob títulos como se
 * estivesse sendo desenhado com giz/pincel no momento em que entra na
 * viewport — em vez do "cartão de vidro" e dos "anéis concêntricos" já
 * usados nos três projetos anteriores.
 *
 * Implementado com um <motion.path> animando `pathLength` (framer-motion,
 * já é dependência do projeto) — leve, sem WebGL, funciona em mobile.
 *
 * Variante "drip" (adicionada depois, a pedido da Bruna, inspirada num
 * efeito de "continuidade entre seções" que ela trouxe de referência —
 * um site de mel onde o mel escorre do pote pro bloco seguinte, amarrando
 * o scroll): aqui é um fio de giz/tinta escorrendo na emenda entre duas
 * seções, terminando numa gotinha que "pinga" — mesma técnica (pathLength),
 * conteúdo 100% da identidade Ardósia (giz/tinta, não mel).
 */

import { motion } from 'framer-motion';

type Variant = 'underline' | 'circle' | 'drip';

const PATHS: Record<Variant, string> = {
  // Traço horizontal levemente irregular — não uma linha reta perfeita,
  // para ler como gesto manual, não como <hr>.
  underline: 'M2 8.5C22 4 48 3 78 6.5C108 10 148 9.5 178 5C208 1 228 3.5 238 7',
  // Círculo/elipse imperfeito ao redor de uma palavra-chave — efeito
  // "circulei isso no cardápio".
  circle:
    'M50 4C22 4 4 16 4 30C4 46 24 56 50 56C78 56 96 46 96 30C96 15 76 5 50 5',
  // Fio vertical levemente sinuoso, escorrendo de cima pra baixo.
  drip: 'M12 2C9 14 15 22 12 34C9 46 15 56 12 68C10 76 13 82 12 88',
};

const VIEWBOX: Record<Variant, string> = {
  underline: '0 0 240 14',
  circle: '0 0 100 60',
  drip: '0 0 24 104',
};

export const ArdosiaInkStroke = ({
  variant = 'underline',
  color = '#C1552C',
  className = '',
  strokeWidth = 3,
  delay = 0,
}: {
  variant?: Variant;
  color?: string;
  className?: string;
  strokeWidth?: number;
  delay?: number;
}) => (
  <svg
    viewBox={VIEWBOX[variant]}
    fill="none"
    aria-hidden="true"
    className={className}
    preserveAspectRatio="none"
  >
    <motion.path
      d={PATHS[variant]}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: variant === 'drip' ? 0.55 : 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: variant === 'drip' ? 1.4 : 0.9, delay, ease: [0.65, 0, 0.35, 1] }}
    />
    {variant === 'drip' && (
      <motion.circle
        cx="12"
        cy="94"
        r="3.2"
        fill={color}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 0.55, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.4, delay: delay + 1.15, ease: 'easeOut' }}
      />
    )}
  </svg>
);

/** Conector visual entre duas seções — o "escorrer" que amarra o scroll,
 * posicionado sobre a emenda (metade em cada seção). Uso: dentro de uma
 * seção com `position: relative`, perto do fechamento (`</section>`). */
export const ArdosiaSectionDrip = ({ color = '#C1552C' }: { color?: string }) => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute left-1/2 -bottom-12 z-10 hidden h-24 w-6 -translate-x-1/2 sm:block"
  >
    <ArdosiaInkStroke variant="drip" color={color} strokeWidth={2.5} className="h-full w-full" />
  </div>
);
