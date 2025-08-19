/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        waterbnb: {
          light: "#BBDEFB", // Light sky blue for backgrounds
          DEFAULT: "#2196F3", // Main brand blue
          dark: "#1769AA", // Darker blue for hover/focus
          accent: "#06B6D4", // Cyan accent for highlights
          deep: "#0D47A1", // Very deep blue for strong contrast
        },
      },
    },
  },
  plugins: [],
};
