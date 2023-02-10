/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        contsiner: "1140px",
      },
      colors: {
        primary: "#0077B5",
      },
      boxShadow: {
        all: "0px 0px 50px -3px rgba(0,0,0,0.15)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
  },
};
