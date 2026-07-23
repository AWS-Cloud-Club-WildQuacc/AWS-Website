/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        squid: {
          ink: '#232F3E',
          50: '#f0f2f5',
          100: '#e0e3e9',
          200: '#c2c6cd',
          300: '#a3a9b1',
          400: '#858d95',
          500: '#667078',
          600: '#4d525a',
          700: '#33353b',
          800: '#1a1b1e',
          900: '#0d0e0f',
          950: '#060708',
        },
        smile: {
          orange: '#FF9900',
          50: '#fff8f0',
          100: '#ffeecd',
          200: '#ffdcb8',
          300: '#ffc99a',
          400: '#ffb577',
          500: '#ffa255',
          600: '#e68a00',
          700: '#cc6f00',
          800: '#b35500',
          900: '#993a00',
          950: '#662700',
        },
      },
    },
  },
  plugins: [],
}