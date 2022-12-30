/** @type {import('tailwindcss').Config} */
const { colors: defaultColors } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["src/*.{html,js}"],
  theme: {
    extend: {
      colors: { primary: "#323437", secondary: "#fda4af", white: "#ffffff" },
    },
    animation: {
      "pulse-faster": "pulse 0.5s linear infinite",
    },
    fontFamily: {
      josef: ["Josefin Sans", "sans-serif"],
    },
  },
  plugins: [],
};
