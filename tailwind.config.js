/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './App.tsx', './index.tsx', './pages/**/*.tsx', './components/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        paper: '#000000',
        ink: '#F8FAFC',
        muted: '#94A3B8',
        hairline: '#1E293B',
        surface: '#0F172A',
        accent: {
          DEFAULT: '#3B82F6',
          hover: '#60A5FA',
        },
        brand: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          900: '#064E3B',
        },
        /* Semantic flags — used only inside .editorial (light) essay pages. */
        flag: {
          red: '#991B1B',
          green: '#15803D',
          gold: '#A16207',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        serif: ['"Crimson Pro"', 'Charter', 'Georgia', 'serif'],
        tamil: ['"Noto Serif Tamil"', '"Crimson Pro"', 'Charter', 'Georgia', 'serif'],
      },
      maxWidth: {
        prose: '38rem',
        measure: '46rem',
        page: '70rem',
      },
      letterSpacing: {
        tightish: '-0.02em',
        widest: '0.15em',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #0284c733 0deg, #0ea5e911 180deg, #0284c733 360deg)',
      },
    },
  },
  plugins: [],
};
