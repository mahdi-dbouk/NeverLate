/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "fadeInBounce": 'fadeInBounce 1s',
        "fadeOutBounce": 'fadeOutBounce 1s'
      }
    },
  },
  plugins: [],
}

