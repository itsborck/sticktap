/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        flash : {
          '0%, 50%, 100%': { borderColor: 'transparent' },
          '25%, 75%': { borderColor: 'rgb(239 68 68)' },
        },
      },
      animation: {
        flash: 'flash 2s infinite',
      },
    },
  },
  variants: {
    extned: {
      backgroundColor: ['dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd'],
      textColor: ['dark', 'dark-hover', 'dark-active'],
    },
  },
  plugins: [],
}

