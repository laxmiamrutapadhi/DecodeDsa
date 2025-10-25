/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      transitionDuration: { DEFAULT: '200ms' },
    },
  },
  plugins: [],
}
