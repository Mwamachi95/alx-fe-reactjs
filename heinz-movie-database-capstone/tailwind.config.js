// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Use class strategy for dark mode
  theme: {
    extend: {
      colors: {
        tazama: {
          yellow: '#E7B10A', // Mustard yellow
          blue: '#1A374D',   // Navy blue
          light: '#F5F5F5',  // Light background
          dark: '#1E1E1E',   // Dark background
        },
      },
      animation: {
        'loadingBar': 'loadingBar 1.5s infinite linear',
      },
      keyframes: {
        loadingBar: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
    },
  },
  plugins: [],
}