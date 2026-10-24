/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0C0C0C",
        silver: "#D7E2EA",
        muted: "#646973",
      },
      fontFamily: {
        kanit: ["Kanit", "sans-serif"],
      },
    },
  },
  plugins: [],
}
