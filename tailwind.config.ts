import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f4ff",
          100: "#e0e9ff",
          200: "#c1d3ff",
          300: "#a2bcff",
          400: "#8fa3ff",
          500: "#6b5aff",
          600: "#5a3aff",
          700: "#4c1aff",
          800: "#3d0aff",
          900: "#2800dd",
          950: "#1a00aa",
        },
      },
    },
  },
  plugins: [],
};

export default config;
