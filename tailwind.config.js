/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EFF3F3",
        secondary: "#38a1f3",
        success: "#00c853",
        info: "#3182ce",
        warning: "#e9c46a",
        error: "#f53f7c",
        gray: "#D6DFDF",
        gray200: "#E2E3E4",
        gray300: "#E0E7E7",
        gray800: "#D6DFDF",
        darkGray: "#D3D3D3",
        lightGray: "#EBEFEF80",
      },
      spacing: {
        12: "3rem",
        16: "4rem",
        24: "6rem",
        32: "8rem",
      },
    },
  },
  plugins: [],
};
