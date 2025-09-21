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
        blueA: "#cfe7fc",
        primaryB: "var(--primary200)",
      },
    },
  },
  plugins: [],
};
