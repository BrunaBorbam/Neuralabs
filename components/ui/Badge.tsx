import React from 'react';

interface BadgeProps {
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'primary', children, className = '' }) => {
  const variants = {
    primary: 'bg-blush-500/15 border border-blush-500/40 text-blush-200 hover:bg-blush-500/25 hover:border-blush-500/60',
    success: 'bg-green-500/15 border border-green-500/40 text-green-300 hover:bg-green-500/25 hover:border-green-500/60',
    warning: 'bg-amber-500/15 border border-amber-500/40 text-amber-300 hover:bg-amber-500/25 hover:border-amber-500/60',
    error: 'bg-red-500/15 border border-red-500/40 text-red-300 hover:bg-red-500/25 hover:border-red-500/60',
    info: 'bg-pearl-200/10 border border-pearl-200/30 text-pearl-100 hover:bg-pearl-200/20 hover:border-pearl-200/50',
  };

  return (
    <div className={`inline-block px-4 py-2 rounded-full text-xs font-bold tracking-wide text-transform uppercase transition-all duration-200 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};
