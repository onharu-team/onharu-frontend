import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./common/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#2B6A5C",
        "main-100": "#E6F1EE",
        "main-200": "#C8E0D9",
        "main-300": "#A6CDC2",
        "main-400": "#7FB6A8",
        "main-500": "#4F9A89",
        "main-hover": "#23574C",
        "main-active": "#1C443C",
        "main-900": "#14332D",
        sub: "#FFE39A",
        border: "#E0E0E0",
        text: "#212121",
        muted: "#949494",
        danger: "#EC0C0C",
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
    },
  },
  plugins: [],
};

export default config;
