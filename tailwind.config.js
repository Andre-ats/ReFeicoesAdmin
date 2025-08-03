/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: 
    {
      colors:{
        marromReFeicoes:"#742912",
        cinzaReFeicoes:"#c1cdcd",
        brancoReFeicoes:"#e5e5e5",
        amareloReFeicoes:"#f2b00f",
        vermelhoReFeicoes: "#d94014"
      }
    },
  },
  plugins: [],
}