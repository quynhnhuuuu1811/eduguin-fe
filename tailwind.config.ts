/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
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
