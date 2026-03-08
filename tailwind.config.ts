import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cerrado: {
          50: "#f4faef",
          100: "#dff0cb",
          200: "#c7e39f",
          300: "#abd372",
          400: "#8fc44f",
          500: "#6ea92f",
          600: "#558620",
          700: "#3f6318",
          800: "#2a4012",
          900: "#17240a"
        }
      }
    }
  },
  plugins: []
};

export default config;
