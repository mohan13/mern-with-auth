/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-100": "2C3A4F",
        "primary-200": "#56647b",
        "primary-300": "#b4c2dc",
        "accent-100": "#FF4D4D",
        "accent-200": "#ffecda",
        "text-100": "#FFFFFF",
        "text-200": "#e0e0e0",
        "bg-100": "#1A1F2B",
        "bg-200": "#292e3b",
        "bg-300": "#414654",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
