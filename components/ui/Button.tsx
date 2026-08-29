import { motion } from 'framer-motion';
import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  type = 'button',
  onClick,
  disabled = false,
  loading = false,
}) => {
  const baseStyles = 'font-bold transition-all duration-200 flex items-center justify-center gap-2 rounded-lg relative';

  const variants = {
    primary: 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 disabled:from-slate-700 disabled:to-slate-800 disabled:shadow-none',
    secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm disabled:opacity-50',
    ghost: 'text-orange-400 hover:text-orange-300 hover:bg-orange-500/5 disabled:opacity-50',
    outline: 'border-2 border-orange-500 text-orange-400 hover:bg-orange-500/10 hover:text-orange-300 disabled:border-slate-600 disabled:text-slate-600',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-md min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[48px]',
  };

  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && (
        <motion.div
          className="absolute inset-0 rounded-lg opacity-50"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}
        />
      )}
      {!loading && icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="relative z-10">{loading ? '...Processando' : children}</span>
    </motion.button>
  );
};
