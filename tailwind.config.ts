/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xsss: "375px",
      xss: "425px",
      xs: "481px",
      sm: "641px",
      md: "900px",
      lg: "1025px",
      xl: "1281px",
      "2xl": "1441px",
      "3xl": "1544px",
    },
    extend: {
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
        sugar: ["Sugar", "sans-serif"],
      },
      colors: {
        blue100: "var(--color-blue100)",
        primary200: "var(--color-primary200)",
        primary500: "var(--color-primary500)",
        blue700: "var(--color-blue700)",
        blue600: "var(--color-blue600)",
      },
    },
  },
  plugins: [],
};
