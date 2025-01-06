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
    },
  },
  presets: [require("@relume_io/relume-tailwind")],
  plugins: [],
};
