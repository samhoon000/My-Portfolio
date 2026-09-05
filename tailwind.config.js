/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'Inter', 'sans-serif'],
        display: ['Pixelify Sans', 'monospace'],
        pixel: ['Pixelify Sans', 'monospace'],
        mono: ['monospace'],
      },
      colors: {
        // Café Aesthetic Palette - Typography & Surfaces
        base: '#140c09',
        panel: '#20130e',
        panelSoft: '#2b1b14',
        panelWood: '#3b251c',
        stroke: '#4a2f24',
        accent: '#E39A73', // Primary Accent
        accentSoft: '#E39A73',
        accentHover: '#F0B08A', // Strong Accent
        textPrimary: '#FFF1D6', // Primary Text (warm ivory)
        textSecondary: '#F5E3C8', // Secondary Text
        textMuted: '#E8D2B5', // Muted Text
        textDark: '#2B1D18', // Dark Text for light elements only
        textDarkMuted: '#9B7E66',
        cafeTeal: '#294b50', // Pixel accent
        emerald: '#3ea878',
      },
      boxShadow: {
        glow: '0 0 35px rgba(227,154,115,0.25)',
        warmCard: '0 16px 36px rgba(10,5,3,0.65)',
        pixelBorder: '0 0 0 1px rgba(227,154,115,0.2)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseSoft: 'pulseSoft 4s ease-in-out infinite',
        scaleIn: 'scaleIn 0.25s ease-out forwards',
        snowDrift: 'snowDrift 10s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 1 },
        },
        scaleIn: {
          '0%': { opacity: 0, transform: 'scale(0.96)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        snowDrift: {
          '0%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(50vh) translateX(20px)' },
          '100%': { transform: 'translateY(100vh) translateX(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
