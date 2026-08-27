import React from 'react';

interface BadgeProps {
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'primary', children, className = '' }) => {
  const variants = {
    primary: 'bg-orange-500/20 border border-orange-500/50 text-orange-400',
    success: 'bg-green-500/20 border border-green-500/50 text-green-400',
    warning: 'bg-amber-500/20 border border-amber-500/50 text-amber-400',
    error: 'bg-red-500/20 border border-red-500/50 text-red-400',
    info: 'bg-violet-500/20 border border-violet-500/50 text-violet-400',
  };

  return (
    <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};
