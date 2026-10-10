/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
      colors: {
        black: '#000000',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scan': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(400px)' },
          '100%': { transform: 'translateY(0)' },
        },
        'lip-sync': {
          '0%, 100%': { opacity: '0', transform: 'scaleY(1)' },
          '25%': { opacity: '0.2', transform: 'scaleY(1.1)' },
          '50%': { opacity: '0', transform: 'scaleY(1)' },
          '75%': { opacity: '0.3', transform: 'scaleY(1.2)' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'scan': 'scan 3s ease-in-out infinite',
        'lip-sync': 'lip-sync 0.3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
