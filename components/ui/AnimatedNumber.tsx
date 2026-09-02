'use client';

import { useEffect, useRef, useState } from 'react';
import { animate } from 'framer-motion';

/**
 * Odometer-style animated number. Used on the loss calculator so the
 * "money lost" figure visibly climbs/falls as the visitor drags a slider —
 * the motion itself reinforces the loss-aversion trigger at the exact
 * moment of interaction, instead of the value just snapping to a new
 * static number.
 */
export const AnimatedNumber = ({
  value,
  format,
}: {
  value: number;
  format: (n: number) => string;
}) => {
  const [display, setDisplay] = useState(value);
  const previous = useRef(value);

  useEffect(() => {
    const controls = animate(previous.current, value, {
      duration: 0.5,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplay(latest),
    });
    previous.current = value;
    return () => controls.stop();
  }, [value]);

  return <>{format(display)}</>;
};
