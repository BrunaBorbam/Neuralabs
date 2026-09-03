'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Magnetic glass tilt wrapper — pointer-driven 3D rotation plus an
 * edge-lit glass glow on hover. Used on the Nichos cards, which are the
 * highest-value click on the landing page (they lead into the Portfólio
 * Vivo demos), so this is where the extra polish pays off most.
 *
 * Kept subtle by design: max ~6° of rotation, no bloom — luxury reads as
 * restraint, not spectacle.
 */
export const TiltCard = ({
  children,
  className = '',
  intensity = 5,
}: {
  children: React.ReactNode;
  className?: string;
  /** Max rotation in degrees and glow strength multiplier. Default (5) is
   * the original "subtle" feel; pass a lower value (e.g. 3) for an even
   * more delicate touch on smaller/denser layouts like the Nichos grid. */
  intensity?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [intensity, -intensity]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-intensity, intensity]), springConfig);
  const glowX = useTransform(mouseX, [0, 1], ['0%', '100%']);
  const glowY = useTransform(mouseY, [0, 1], ['0%', '100%']);
  const glowOpacity = Math.min(0.18, (intensity / 5) * 0.18);
  const glowRadius = Math.round(220 + (intensity / 5) * 100);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    mouseX.set((event.clientX - bounds.left) / bounds.width);
    mouseY.set((event.clientY - bounds.top) / bounds.height);
  };

  const handlePointerLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`group/tilt relative [transform-style:preserve-3d] ${className}`}
    >
      {/* Edge-lit glass glow that follows the pointer, visible only on hover */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(${glowRadius}px circle at ${x} ${y}, rgba(216,194,184,${glowOpacity}), transparent 70%)`
          ),
        }}
      />
      {children}
    </motion.div>
  );
};
