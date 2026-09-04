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
      // 1.1s (with this expo-out curve) meant each wheel tick kept gliding
      // for over a second after the input stopped — a long, shallow
      // "still-moving" tail. That reads as the page not keeping up with the
      // cursor, which is what "trava" (stutter) feels like even on frames
      // that are technically rendering fine. 0.85s keeps the same eased,
      // non-linear feel (nothing snaps) while cutting that lag noticeably.
      duration: 0.85,
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
