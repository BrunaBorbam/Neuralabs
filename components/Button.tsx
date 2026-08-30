'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  isLoading?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  isLoading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      'bg-brand-600 text-white hover:bg-brand-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
    secondary:
      'bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700',
    ghost:
      'bg-transparent text-brand-600 hover:bg-brand-50 dark:hover:bg-slate-800/50 border border-brand-200 dark:border-slate-700',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={disabled || isLoading}
      className={`
        ${sizes[size]} ${variants[variant]}
        rounded-lg font-semibold
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2
        ${className}
      `}
      {...props}
    >
      {isLoading && (
        <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
      )}
      {children}
    </motion.button>
  );
}
