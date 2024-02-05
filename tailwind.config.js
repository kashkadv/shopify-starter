/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/*.liquid",
    "./layout/*.liquid",
    "./snippets/*.liquid",
    "./sections/*.liquid",
  ],
  plugins: [require("@tailwindcss/typography")],
  theme: {},
}
