import React from 'react';
import { motion } from 'framer-motion';

export const FloatingOrb = ({ delay = 0, color = 'orange' }: { delay?: number; color?: string }) => {
  const colors = {
    orange: 'from-orange-500 to-orange-600',
    violet: 'from-violet-500 to-violet-600',
    slate: 'from-slate-700 to-slate-800',
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
        className="absolute inset-0 bg-gradient-to-r from-orange-500/50 to-violet-500/50 blur-2xl"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <span className="relative bg-gradient-to-r from-orange-400 to-violet-400 bg-clip-text text-transparent font-black">
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
      className="text-5xl md:text-7xl font-black font-serif text-orange-500"
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {children}
    </motion.div>
  );
};

export const PulseGlow = ({ children, color = 'orange' }: { children: React.ReactNode; color?: string }) => {
  const colors = {
    orange: 'shadow-orange-glow hover:shadow-orange-glow-lg',
    violet: 'shadow-violet-glow',
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
