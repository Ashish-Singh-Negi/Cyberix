import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        lightGray: "#f9fafb",
        darkGray: "#111827",
      },
      borderColor: {
        custom: "#6b7280",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateY(-20%)", opacity: "0" },
          "100%": { tranform: "translateX(0)", opacity: "1" },
        },
        loading: {
          "0%": {
            opacity: "0",
            transform: "scale(0.5)",
          },
          "50%": {
            opacity: "0.5",
            transform: "scale(1)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(0.5)",
          },
        },
      },
      animation: {
        slideIn: "slideIn 0.5s ease",
        loading: "loading 1s ease-in-out var(--loading-delay,0) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
