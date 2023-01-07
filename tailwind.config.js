/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./docs/index.html", "./docs/logic.js"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        bright: "rgb(var(--color-bright) / <alpha-value>)",
        dark: "rgb(var(--color-dark) / <alpha-value>)",
        error: "rgb(var(--color-error) / <alpha-value>)",
      },
      keyframes: {
        blink: {
          "0%": {
            opacity: 1,
          },
          "50%": {
            opacity: 0.2,
          },
          "100%": {
            opacity: 1,
          },
        },
      },
      animation: {
        blink: "blink 0.5s ease-in-out infinite",
      },
    },
    fontFamily: {
      primary: ["Roboto Mono", "sans-serif"],
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
