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
}) => {
  const baseStyles = 'font-bold transition-all duration-200 flex items-center justify-center gap-2 rounded-lg';

  const variants = {
    primary: 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-glow hover:shadow-orange-glow-lg',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700',
    ghost: 'text-orange-400 hover:text-orange-300 hover:bg-orange-500/5',
    outline: 'border-2 border-orange-500 text-orange-400 hover:bg-orange-500/10',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-md min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[48px]',
  };

  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
};
