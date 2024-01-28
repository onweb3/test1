/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      redHat: "var(--red-hat)",
      moment: "'Inter', sans-serif",
    },
    colors: {
      main: "#17191E",
      grey: "#2E2E2E",
      green: "#11FF37",
      "light-green": "#ACFFB9",
      white: "white",
      black: "black",
      transparent: "transparent",
      blue: "#00A3FF",
      green: "#4EFF4A",
      grey: "rgba(201, 196, 189, 1)",
      grey2: "#83888F",
      greyDark: "#151515",
      border: "#B3B4BD33",
      "light-grayish": "rgba(0,0,0,.04)",
    },

    extend: {
      transitionProperty: {
        height: "height",
      },
      borderWidth: {
        1: "1px",
      },
      backgroundImage: {
        "green-gradient":
          "linear-gradient(161.83deg, #ACFFB9 12.35%, #22FF45 95.75%)",

        "green-gradient-2":
          "linear-gradient(158.2deg, #ACFFB9 14.29%, #11FF37 97.14%)",

        "tier-active":
          "linear-gradient(126.73deg, rgba(172, 255, 185, 0.3) 28.63%, rgba(62, 255, 93, 0.3) 97.49%)",
          "primary-gradient":
          "linear-gradient(to bottom right, #00A3FF, #4EFF4A)",

        "hero-bg":
          "radial-gradient(54.98% 54.98% at 37.8% 25.8%, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.35) 100%)",

        "feature-card":
          "radial-gradient(70.56% 70.56% at 50% 29.44%, rgba(69, 69, 69, 0.41) 0%, rgba(0, 0, 0, 0.205) 100%)",

        "team-card":
          "radial-gradient(70.56% 70.56% at 50% 29.44%, rgba(69, 69, 69, 0.41) 0%, rgba(64, 217, 140, 0.2) 100%)",

        "feature-card-border":
          "linear-gradient(105.54deg, #00A3FF 0.76%, rgba(0, 163, 255, 0) 34.37%, rgba(64, 217, 140, 0.2) 63.91%, #40D98C 98.54%)",

        "green-radial":
          "radial-gradient(70.56% 70.56% at 50% 29.44%, rgba(46, 79, 47, 0.8) 0%, rgba(0, 0, 0, 0.4) 100%)",
     
      },
    },
  },
  plugins: [],
};
