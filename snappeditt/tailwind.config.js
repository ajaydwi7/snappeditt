/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}", // Include Relume UI components
  ],
  theme: {
    extend: {
      colors: {
        primaryRed: "#f44336",
        primaryBlack: "#404141",
        customGray: "#333333",
        customtextGray: "#ffffff99",
      },
      fontFamily: {
        primary: "Andika",
        secondry: "Audiowide",
        cursive: "Courgette",
      },
      keyframes: {
        "fade-in": {
          from: {
            opacity: "0",
            transform: "translateY(10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
      },
    },
  },
  presets: [require("@relume_io/relume-tailwind")],
  plugins: [],
};
