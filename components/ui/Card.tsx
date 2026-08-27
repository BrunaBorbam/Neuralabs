import React from 'react';

interface CardProps {
  variant?: 'glass' | 'surface' | 'accent' | 'gradient';
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ variant = 'glass', children, className = '' }) => {
  const variants = {
    glass: 'bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:border-orange-500/50',
    surface: 'bg-slate-800 border border-slate-700 shadow-md',
    accent: 'bg-gradient-orange border border-orange-500/30 shadow-orange-glow',
    gradient: 'bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20',
  };

  return (
    <div className={`rounded-2xl p-8 transition-all duration-300 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};
