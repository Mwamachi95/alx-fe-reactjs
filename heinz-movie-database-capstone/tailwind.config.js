// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        tazama: {
          yellow: '#E7B10A', // Mustard yellow
          blue: '#1A374D',   // Navy blue
          light: '#F5F5F5',  // Light background
          dark: '#1E1E1E',   // Dark background
          gray: '#718096',   // Neutral gray
        },
      },
      transitionProperty: {
        'width': 'width',
        'spacing': 'margin, padding',
      },
      animation: {
        'text-reveal': 'text-reveal 2.5s ease forwards',
        'letter-fade': 'letter-fade 0.5s ease-out forwards',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'bounce': 'bounce 1s infinite',
      },
      keyframes: {
        'text-reveal': {
          '0%': { transform: 'scale(1.5)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        'letter-fade': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
    },
  },
  plugins: [],
}