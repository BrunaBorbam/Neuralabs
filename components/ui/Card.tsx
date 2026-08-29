import { motion } from 'framer-motion';
import React from 'react';

interface CardProps {
  variant?: 'glass' | 'surface' | 'accent' | 'gradient';
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ variant = 'glass', children, className = '' }) => {
  const variants = {
    glass: 'bg-white/5 backdrop-filter backdrop-blur-md border border-white/10 shadow-lg hover:bg-white/10 hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/10',
    surface: 'bg-slate-900/50 border border-slate-700 shadow-lg hover:shadow-xl hover:border-slate-600',
    accent: 'bg-gradient-to-br from-orange-500/15 to-orange-600/5 border border-orange-500/40 shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20',
    gradient: 'bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 hover:border-orange-500/40',
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
