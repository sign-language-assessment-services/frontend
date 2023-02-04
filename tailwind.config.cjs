/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{html,js}',
    './src/components/**/*.{html,js}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
  },
}
