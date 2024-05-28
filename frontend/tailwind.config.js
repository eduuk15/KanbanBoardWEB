/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "priority-high": "#FF5733",
        "priority-medium": "#FFA933",
        "priority-low": "#33A1FF",
      },
    },
  },
  plugins: [],
};
