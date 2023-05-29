/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      blue: "#1fb6ff",
      purple: "#7e5bef",
      yellow: "#ffc82c",
      gray: "#8492a6",
      white: "#fff",
      black: "#000",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
  },
  plugins: [require("daisyui")],
};
