/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/Main/Main.js", "./src/components/Card.js"],
  theme: {
    extend: {
      colors: {
        "custom-orange": "#FFA526",
        "card-blue": "#374A64",
      },
      fontFamily: {
        "jolly-lodger": ['"Jolly Lodger"', "system-ui"],
      },
      animation: {
        "letter-appear": "letterAppear 3s ease-in-out forwards", // Animation for each letter
      },
      keyframes: {
        letterAppear: {
          "0%": { opacity: 0 }, // Initial state: invisible and moved up
          "100%": { opacity: 1 }, // Final state: fully visible and in place
        },
      },
      borderRadius: {
        "card-radius": "clamp(10px,4.5vw,4em)",
      },
      height: {
        "80p": "15vw",
      },
    },
  },
  plugins: [],
};
