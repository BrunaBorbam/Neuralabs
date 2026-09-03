import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const FloatingOrb = ({ delay = 0, color = 'blush' }: { delay?: number; color?: string }) => {
  const colors = {
    blush: 'from-blush-500 to-blush-700',
    gold: 'from-gold-400 to-gold-700',
    pearl: 'from-pearl-200 to-pearl-400',
    slate: 'from-obsidian-600 to-obsidian-700',
  };

  return (
    <motion.div
      className={`absolute w-32 h-32 bg-gradient-to-br ${colors[color as keyof typeof colors]} rounded-full blur-3xl`}
      animate={{
        y: [0, 40, 0],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

export const GlowingText = ({ text }: { text: string }) => {
  return (
    <motion.div
      className="relative inline-block"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blush-500/40 to-pearl-200/30 blur-2xl"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <span className="relative bg-gradient-to-r from-blush-300 to-pearl-200 bg-clip-text text-transparent font-black">
        {text}
      </span>
    </motion.div>
  );
};

export const AnimatedCounter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const timer = setInterval(() => {
            start += value / 50;
            if (start >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 30);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <motion.div
      ref={ref}
      className="text-5xl md:text-7xl font-black font-serif text-blush-400"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {count}
      {suffix}
    </motion.div>
  );
};

export const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (revealed) return;
    const el = ref.current;
    if (!el) return;

    // Driven off scroll position directly rather than IntersectionObserver:
    // under Lenis's eased fast-scroll (or any main-thread jank that makes it
    // catch up in one jump), an element can cross the viewport between two
    // observer callbacks and never register as intersecting — leaving it
    // permanently opacity:0. Reading the live rect on every scroll/resize
    // frame can't miss it that way; worst case it reveals a frame late.
    const check = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100 && rect.bottom > 100) {
        setRevealed(true);
      }
    };
    check(); // already in view on mount (above the fold)

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        check();
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [revealed]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={revealed ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

export const PulseGlow = ({ children, color = 'blush' }: { children: React.ReactNode; color?: string }) => {
  const colors = {
    blush: 'shadow-blush-glow hover:shadow-blush-glow-lg',
    pearl: 'shadow-blush-glow',
  };

  return (
    <motion.div
      className={`${colors[color as keyof typeof colors]} transition-all duration-300`}
      whileHover={{ scale: 1.05 }}
    >
      {children}
    </motion.div>
  );
};
