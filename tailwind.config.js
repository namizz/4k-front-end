/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/Main/Main.js",
    "./src/components/Card.js",
    "./src/components/Delete.js",
    "./src/components/FilterBox.js",
    "./src/components/InputBox.js",
    "./src/Login/LogInPage.jsx",
    "./src/updateUser/Form.js",
    "./src/components/ConfirmationModal.js",
    "./src/components/Edit.js",
    "./src/components/Logout.js",
    "./src/components/Header.js",
    "./src/createUser/Form.js",
    "./src/updateUser/Form.js",
  ],
  theme: {
    extend: {
      colors: {
        "custom-orange": "#FFA526",
        "card-blue": "#374A64",
        textc: "#31537D",
        or: "#F58311",
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
        round: "8vw",
        "80p": "15vw",
      },
      width: {
        card: "30%",
        form: "clamp(10px, 70vw, 550px)",
      },
      fontSize: {
        cardtext: "clamp(10px,1.1vw,1.2em)",
        biblequote: "clamp(1em,1.2vw,2em)",
        filter: "clamp(1em,1.75vw,1.3em)",
        heade: "clamp(12px, 3vw, 2.8em)",
      },
    },
  },
  plugins: [],
};
