/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          950: '#020617',
          900: '#05101f',
          850: '#081423',
          800: '#0b1628',
          700: '#10213a',
        },
        accent: {
          400: '#67e8f9',
          500: '#22d3ee',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        neon: {
          purple: '#a855f7',
          blue: '#3b82f6',
          cyan: '#22d3ee',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(34, 211, 238, 0.18), 0 20px 80px rgba(8, 145, 178, 0.18)',
      },
      backgroundImage: {
        'grid-soft':
          'linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px)',
        'hero-radial':
          'radial-gradient(circle at top left, rgba(168, 85, 247, 0.22), transparent 32%), radial-gradient(circle at top right, rgba(34, 211, 238, 0.18), transparent 24%), radial-gradient(circle at bottom, rgba(59, 130, 246, 0.10), transparent 34%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -14px, 0)' },
        },
        drift: {
          '0%': { transform: 'translateX(-10%) translateY(0)' },
          '50%': { transform: 'translateX(6%) translateY(-12px)' },
          '100%': { transform: 'translateX(-10%) translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        drift: 'drift 22s ease-in-out infinite',
        glowPulse: 'glowPulse 6s ease-in-out infinite',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      transitionTimingFunction: {
        mellow: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
