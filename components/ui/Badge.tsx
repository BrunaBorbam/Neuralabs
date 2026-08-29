import React from 'react';

interface BadgeProps {
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'primary', children, className = '' }) => {
  const variants = {
    primary: 'bg-orange-500/15 border border-orange-500/40 text-orange-300 hover:bg-orange-500/25 hover:border-orange-500/60',
    success: 'bg-green-500/15 border border-green-500/40 text-green-300 hover:bg-green-500/25 hover:border-green-500/60',
    warning: 'bg-amber-500/15 border border-amber-500/40 text-amber-300 hover:bg-amber-500/25 hover:border-amber-500/60',
    error: 'bg-red-500/15 border border-red-500/40 text-red-300 hover:bg-red-500/25 hover:border-red-500/60',
    info: 'bg-violet-500/15 border border-violet-500/40 text-violet-300 hover:bg-violet-500/25 hover:border-violet-500/60',
  };

  return (
    <div className={`inline-block px-4 py-2 rounded-full text-xs font-bold tracking-wide text-transform uppercase transition-all duration-200 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};
