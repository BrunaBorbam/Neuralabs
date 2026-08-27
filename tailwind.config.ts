import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // PRIMARY DARK
        slate: {
          900: '#0F172A',
          850: '#0A0E27', // Neuralabs primary
          800: '#1E293B',
          700: '#334155',
          600: '#475569',
          500: '#64748B',
          400: '#94A3B8',
          300: '#CBD5E1',
          200: '#E2E8F0',
          100: '#F1F5F9',
        },

        // PRIMARY ORANGE
        orange: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#FF8C00', // Neuralabs orange
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A360D',
          900: '#7C2D12',
        },

        // SECONDARY ACCENT
        violet: {
          50: '#F8F5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#DDD6FE',
          400: '#C4B5FD',
          500: '#8B5CF6', // Highlight violet
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },

        // STATUS COLORS
        green: {
          500: '#10B981',
          600: '#059669',
        },
        red: {
          500: '#EF4444',
          600: '#DC2626',
        },
        amber: {
          500: '#F59E0B',
          600: '#D97706',
        },

        // SEMANTICS
        background: '#0A0E27',
        foreground: '#FFFFFF',
        muted: '#94A3B8',
        'muted-foreground': '#475569',
        border: '#334155',
        'border-light': 'rgba(255, 140, 0, 0.1)',
        ring: '#FF8C00',
      },

      fontSize: {
        // Display (Headlines)
        'display-2xl': ['80px', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.02em' }],
        'display-xl': ['64px', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.02em' }],
        'display-lg': ['48px', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.01em' }],
        'display-md': ['40px', { lineHeight: '1.3', fontWeight: '700' }],

        // Heading (Section titles)
        'heading-xl': ['32px', { lineHeight: '1.3', fontWeight: '700' }],
        'heading-lg': ['28px', { lineHeight: '1.4', fontWeight: '700' }],
        'heading-md': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        'heading-sm': ['20px', { lineHeight: '1.5', fontWeight: '600' }],

        // Body
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-xs': ['12px', { lineHeight: '1.5', fontWeight: '400' }],

        // Emphasis
        'label': ['12px', { lineHeight: '1.5', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }],
        'label-md': ['14px', { lineHeight: '1.5', fontWeight: '600' }],

        // Mobile
        'mobile-display-xl': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        'mobile-display-lg': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        'mobile-heading-lg': ['24px', { lineHeight: '1.3', fontWeight: '700' }],
      },

      spacing: {
        // 8px grid system
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
        '5xl': '128px',
      },

      borderRadius: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        'full': '9999px',
      },

      boxShadow: {
        // Shadows
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',

        // Glow effects
        'orange-glow': '0 0 20px rgba(255, 140, 0, 0.3)',
        'orange-glow-lg': '0 0 40px rgba(255, 140, 0, 0.4)',
        'violet-glow': '0 0 20px rgba(139, 92, 246, 0.3)',
      },

      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },

      animation: {
        // Micro-interactions
        'pulse-soft': 'pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },

      keyframes: {
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 140, 0, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 140, 0, 0.5)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-orange': 'linear-gradient(135deg, rgba(255, 140, 0, 0.2) 0%, transparent 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0A0E27 0%, #0F172A 100%)',
        'gradient-orange-dark': 'linear-gradient(135deg, #FF8C00 0%, #EA580C 100%)',
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};

export default config;
