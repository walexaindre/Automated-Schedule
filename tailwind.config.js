/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,svelte,html}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'),require('daisyui')],
}

