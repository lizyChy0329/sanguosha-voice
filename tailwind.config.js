/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wei: { DEFAULT: '#dc2626', light: '#fca5a5' },
        shu: { DEFAULT: '#16a34a', light: '#86efac' },
        wu: { DEFAULT: '#2563eb', light: '#93c5fd' },
        qun: { DEFAULT: '#7c3aed', light: '#c4b5fd' },
      },
    },
  },
  plugins: [],
}
