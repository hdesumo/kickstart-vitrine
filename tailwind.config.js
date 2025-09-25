/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4CAF50",
          dark: "#388E3C",
        },
        secondary: {
          DEFAULT: "#2563EB",
          dark: "#1E40AF",
        },
        accent: "#F59E0B",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        marquee: "marquee 15s linear infinite",
        "marquee-slow": "marquee 30s linear infinite", // Ajout
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".btn-primary": {
          "@apply bg-primary text-white px-4 py-2 rounded-md font-semibold hover:bg-primary-dark transition": {},
        },
        ".btn-secondary": {
          "@apply bg-secondary text-white px-4 py-2 rounded-md font-semibold hover:bg-secondary-dark transition": {},
        },
        ".link": {
          "@apply text-primary hover:text-primary-dark transition": {},
        },
      });
    },
  ],
};
