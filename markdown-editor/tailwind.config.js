/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        darkMoon: "#151619",
        inkwellInception: "#1D1F22",
        caviar: "#2B2D31",
        antarcticDeep: "#35393F",
        blueSlate: "#5A6069",
        adeptusBattlegrey: "#7C8187",
        ashBlue: "#C1C4CB",
        titaniumWhite: "#E4E4E4",
        whiteSmoke: "#F5F5F5",
        emergencyZone: "#E46643",
        melonRed: "#F39765",
        sooty: "#141414",
        doctor: "#F9F9F9",
        steam: "#DDD",
      },
      fontFamily: {
        commissioner: ['"Commissioner"', "sans-serif"],
        robotoSlab: ['"Roboto Slab"', "serif"],
        robotoMono: ['"Roboto Mono"', "monospace"],
      },
      keyframes: {
        fadeOut: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
      },
      animation: {
        fadeOut: "fadeOut 200ms ease-in",
      },
      transitionDuration: {
        400: "400ms",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
