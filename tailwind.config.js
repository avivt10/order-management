/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aviv-colors': '#00FF00',
        'gray-custom': '#eeeeeee'
      },
      height:{
        'fullHight':'100%'
      }
    },

  },
  plugins: [],
};