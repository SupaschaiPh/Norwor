/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fff3ed",
          100: "#ffe4d5",
          200: "#fec6aa",
          300: "#fe9e73",
          400: "#fc6736",
          500: "#fa4515",
          600: "#eb2b0b",
          700: "#c31c0b",
          800: "#9b1811",
          900: "#7d1711",
          950: "#430807",
        },
        secondary: {
          50: "#ecfaff",
          100: "#d5f2ff",
          200: "#b5eaff",
          300: "#82deff",
          400: "#47c9ff",
          500: "#1cabff",
          600: "#048cff",
          700: "#0073f7",
          800: "#065cc7",
          900: "#0c4f9c",
          950: "#0c2d57",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
