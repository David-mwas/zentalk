/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        base: "18px",
      },
      lineHeight: {
        relaxed: "1.6",
      },
      colors: {
        "gray-800": "#333",
      },
      // fontFamily: {
      //   sans: ["Arial", "Helvetica", "sans-serif"],
      // },
    },
  },
  plugins: [],
};
