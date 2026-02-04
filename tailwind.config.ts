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
      maxWidth: {
        wrapper: "1470px",
      },
      padding: {
        wrapper: "15px",
      },
      spacing: {
        "section-lg-top": "6.25rem",
        "section-lg-bottom": "9.375rem",
        "section-sm-top": "2.5rem",
        "section-sm-bottom": "3.75rem",
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.5" }], // 12
        sm: ["0.875rem", { lineHeight: "1.5" }], // 14
        base: ["1rem", { lineHeight: "1.5" }], // 16
        md: ["1.125rem", { lineHeight: "1.5" }], // 18
        lg: ["1.25rem", { lineHeight: "1.5" }], // 20
        xl: ["1.5rem", { lineHeight: "1.5" }], // 24
        "2xl": ["2rem", { lineHeight: "1.5" }], // 32
        "3xl": ["2.5rem", { lineHeight: "1.5" }], // 40
      },
      borderRadius: {
        sm: "5px",
        md: "10px",
        full: "100px",
      },
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
        sub: {
          main: "#FFE39A",
          "sub-100": "#FFF8E1",
          "sub-200": "#FFF1C2",
          "sub-300": "#FFE9A8",
          "sub-500": "#F5D67F",
          "sub-600": "#E6C665",
          "sub-700": "#CFAE52",
          "sub-800": "#B2963F",
          "sub-900": "#8A732E",
        },
        border: "#E0E0E0",
        text: "#212121",
        subtle: "#949494",
        "text-secondary": "#757575",
        danger: "#EC0C0C",
      },
      animation: {
        slidedown: "slidedown 300ms ease-out",
        slideup: "slideup 300ms ease-in",
      },
      keyframes: {
        slidedown: {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        slideup: {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        bottomSheet: {
          from: { maxHeight: "var(--startH)" },
          to: { maxHeight: "var(--endH)" },
        },
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
        gmarketsans: ["var(--font-gmarketsans)"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};

export default config;
