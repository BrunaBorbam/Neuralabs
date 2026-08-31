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
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
