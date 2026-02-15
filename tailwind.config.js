/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./utils/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        surface: "#0B1120",
        card: "#121A2B",
        accent: "#5CE0B8",
        accent2: "#4EA6FF"
      },
      boxShadow: {
        glow: "0 0 30px rgba(92, 224, 184, 0.25)",
        soft: "0 20px 60px rgba(8, 10, 18, 0.55)"
      }
    }
  },
  plugins: []
};
