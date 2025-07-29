/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'manpuku-red': '#d32f2f',
        'manpuku-orange': '#ff9800',
      },
      fontFamily: {
        'japanese': ['Hiragino Sans', 'Yu Gothic', 'Meiryo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
