/** @type {import('tailwindcss').Config} */
const { colors: defaultColors } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["src/*.{html,js}", "./src/logic.js"],
  theme: {
    extend: {
      colors: {
        primary: "#323437",
        /* secondary: "#fda4af" */ secondary: "#E2B714",
        white: "#ffffff",
      },
    },
    // animation: {
    //   "pulse-faster": "pulse 0.5s linear infinite",
    // },
    fontFamily: {
      primary: ["Roboto Mono", "sans-serif"],
    },
  },
  plugins: [],
};
