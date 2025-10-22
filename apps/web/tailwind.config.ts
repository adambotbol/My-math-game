import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#5B6DFF",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#FF9F68",
          foreground: "#2D1F1F",
        },
        success: "#4FD1C5",
        warning: "#F6C065",
        danger: "#F87171",
      },
      fontFamily: {
        sans: ["'Quicksand'", ...fontFamily.sans],
      },
      borderRadius: {
        xl: "1.5rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
