'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

const MOBILE_BREAKPOINT = 768;

export const SmoothScroll = () => {
  useEffect(() => {
    // Native touch scroll on mobile is faster and smoother (120Hz) than any JS-driven
    // smoothing layer, so Lenis only takes over wheel-based scrolling on desktop/tablet.
    if (window.innerWidth < MOBILE_BREAKPOINT) return;

    const lenis = new Lenis({
      // duration/easing (tried before, down to 0.85s) means every wheel
      // "click" starts its own fixed-length animation that runs to
      // completion and decelerates to a stop. With a rodinha (notched mouse
      // wheel, confirmed as what Bruna uses) input arrives in discrete
      // ticks, not a continuous roll — so each tick's animation finishes
      // and the page visibly stops before the next tick arrives. That
      // jump→stop→jump→stop cadence is what read as "travamento", even
      // though each individual animation was rendering smoothly.
      //
      // lerp mode instead: every frame the visible position eases toward
      // whatever the current target is (position += (target - position) *
      // lerp), and a new wheel tick just moves the target — there is no
      // per-tick animation to "finish", so the motion never has a stop
      // condition to expose between ticks. This is Lenis's own recommended
      // mode for wheel-driven (non-touch) scrolling for exactly this
      // reason. 0.1 is Lenis's default lerp factor.
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
};
