/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'Space Grotesk', 'sans-serif'],
        pixel: ['"Pixelify Sans"', 'monospace'],
        mono: ['monospace'],
      },
      colors: {
        base: '#19110D',
        baseDark: '#130C09',
        panel: '#2B1D18',
        panelSoft: 'rgba(43, 29, 24, 0.78)',
        panelCard: 'rgba(56, 37, 30, 0.7)',
        panelElevated: '#38241D',
        stroke: 'rgba(245, 227, 200, 0.1)',
        strokeGlow: 'rgba(185, 111, 89, 0.35)',
        accent: '#B96F59',
        accentHover: '#C87A64',
        accentSoft: '#D89578',
        terracotta: '#B96F59',
        peach: '#D89578',
        woodBrown: '#6B4535',
        deepBrown: '#4A2F25',
        darkBrown: '#2B1D18',
        cream: '#F5E3C8',
        ivory: '#FFF4DE',
        warmMuted: '#D0B6A0',
        cafeTeal: '#294B50',
        cafeTealLight: '#3D6B72',
        textPrimary: '#FFF4DE',
        textSecondary: '#F5E3C8',
        textMuted: '#D0B6A0',
        textDarkMuted: '#9B7E6D',
        gold: '#E5A93C',
        goldSoft: '#F6CF7A',
        emerald: '#3A8367',
        emeraldLight: '#52A786',
      },
      boxShadow: {
        glow: '0 0 30px rgba(185, 111, 89, 0.25)',
        goldGlow: '0 0 30px rgba(229, 169, 60, 0.25)',
        peachGlow: '0 0 30px rgba(216, 149, 120, 0.25)',
        card: '0 16px 36px rgba(15, 9, 7, 0.65)',
        pixelBorder: '0 0 0 1px rgba(245, 227, 200, 0.12), 0 8px 30px rgba(15, 9, 7, 0.5)',
      },
      backgroundImage: {
        shimmerGradient: 'linear-gradient(90deg, #FFF4DE 0%, #B96F59 30%, #D89578 60%, #E5A93C 85%, #FFF4DE 100%)',
        warmCardGrad: 'linear-gradient(145deg, rgba(56, 37, 30, 0.8) 0%, rgba(38, 24, 19, 0.85) 100%)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseSoft: 'pulseSoft 4s ease-in-out infinite',
        scaleIn: 'scaleIn 0.25s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 1 },
        },
        scaleIn: {
          '0%': { opacity: 0, transform: 'scale(0.96)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

