/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        primary: "#6666ff"
      }
    },
  },
  plugins: [],
  corePlugins:{
    preflight: false,
  },
}