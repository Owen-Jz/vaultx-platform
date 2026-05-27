import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0A0C10',
          secondary: '#111318',
          elevated: '#181B22',
          card: '#1C2028',
        },
        accent: {
          gold: '#C9A85C',
          'gold-light': '#E0C27A',
          'gold-dark': '#A8833A',
          amber: '#F59E0B',
        },
        text: {
          primary: '#F8F7F4',
          secondary: '#A8A5A0',
          muted: '#6B6860',
          inverse: '#0A0C10',
        },
        border: {
          default: '#2A2D35',
          subtle: '#1E2028',
          focus: '#C9A85C',
        },
        status: {
          success: '#4ADE80',
          warning: '#FBBF24',
          danger: '#F87171',
          info: '#60A5FA',
        },
      },
      fontFamily: {
        display: ['var(--font-sora)', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '32': '128px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)',
        elevated: '0 4px 16px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)',
        glow: '0 0 24px rgba(201,168,92,0.2)',
        'glow-lg': '0 0 48px rgba(201,168,92,0.3)',
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '8px',
        md: '10px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 16px rgba(201,168,92,0.1)' },
          '50%': { boxShadow: '0 0 32px rgba(201,168,92,0.35)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'slide-in': 'slide-in 0.4s ease-out',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #C9A85C 0%, #A8833A 100%)',
        'gradient-dark': 'linear-gradient(180deg, #111318 0%, #0A0C10 100%)',
        'gradient-card': 'linear-gradient(145deg, #1C2028 0%, #111318 100%)',
        'gradient-radial-gold': 'radial-gradient(ellipse at top, rgba(201,168,92,0.08) 0%, transparent 60%)',
      },
    },
  },
  plugins: [],
}

export default config
