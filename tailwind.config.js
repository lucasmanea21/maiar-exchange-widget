module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: ["Geometria", "sans-serif"],
      mono: ["Geometria", "monospace"],
    },
    boxShadow: {},
    screens: {
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "2560px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      blue: "#2e52b5",
      purple: {
        lighter: "#372277",
        light: "#30095E",
        DEFAULT: "#8E2DE2",
        dark: "#4A00E0",
        darker: "#060213",
        darkest: "#14073B",
        transparent: "rgba(20, 7, 59, 0.8)",
      },
      gray: {
        light: "#E0E3E5",
        DEFAULT: "#2b2d2e",
        darker: "#242526",
      },
    },
    letterSpacing: {
      widest: "0.4rem",
    },
  },
  variants: {
    extend: {
      fontSize: {
        "7xl": "10rem",
      },
    },
  },
  plugins: [],
};
