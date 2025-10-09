/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        indigoShadow: "0px 0px 20px 0px rgba(102, 16, 242, 0.4)",
        indigoMediumShadow: "10px 10px 200px 150px rgba(102, 16, 242, 0.5)",
        yellowShadow: "0px 0px 20px 0px rgba(255, 221, 0, 0.5)",
        yellowMediumShadow: "10px 10px 200px 150px rgba(255, 221, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
