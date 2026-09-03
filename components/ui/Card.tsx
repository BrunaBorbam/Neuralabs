import { motion } from 'framer-motion';
import React from 'react';

interface CardProps {
  variant?: 'glass' | 'surface' | 'accent' | 'gradient';
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ variant = 'glass', children, className = '' }) => {
  const variants = {
    glass: 'bg-pearl-100/5 backdrop-filter backdrop-blur-md border border-pearl-100/10 shadow-lg hover:bg-pearl-100/[0.08] hover:border-blush-500/30 hover:shadow-xl hover:shadow-blush-500/10',
    surface: 'bg-obsidian-800/60 border border-obsidian-600 shadow-lg hover:shadow-xl hover:border-blush-500/20',
    // "accent" = the highlighted/recommended card treatment (Pricing's
    // featured plan, a Pillars card) — moved to gold, the new primary
    // accent, so the strongest visual pull on the page consistently reads
    // as the warm color, not the muted blush.
    accent: 'bg-gradient-to-br from-gold-500/15 to-gold-700/5 border border-gold-500/40 shadow-lg shadow-gold-500/10 hover:shadow-gold-500/20',
    gradient: 'bg-gradient-to-br from-blush-500/10 to-transparent border border-blush-500/20 hover:border-blush-500/40',
  };

  return (
    <motion.div
      className={`rounded-2xl p-8 transition-all duration-300 ${variants[variant]} ${className}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};
