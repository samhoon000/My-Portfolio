/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        base: '#0a0a0a',
        panel: '#161616',
        panelSoft: '#1a1a1a',
        stroke: '#2a2a2a',
        accent: '#38bdf8',
        accentSoft: '#22d3ee',
        textPrimary: '#ffffff',
        textSecondary: '#ffffff',
        textMuted: '#ffffff',
        emerald: '#10b981',
      },
      boxShadow: {
        glow: '0 0 40px rgba(59,130,246,0.18)',
        card: '0 12px 30px rgba(0,0,0,0.45)',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseSoft: 'pulseSoft 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 0.55 },
          '50%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}

