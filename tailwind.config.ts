import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts}",
    "./data/**/*.{js,ts}",
  ],
  safelist: [
    // Category backgrounds
    "bg-gray-200", "bg-pink-300", "bg-cyan-300", "bg-yellow-300",
    // Category hover backgrounds
    "hover:bg-gray-200", "hover:bg-pink-300", "hover:bg-cyan-300", "hover:bg-yellow-300",
    // Category borders
    "border-gray-400", "border-pink-400", "border-cyan-400", "border-yellow-400",
    // Category tints
    "bg-gray-50", "bg-pink-50", "bg-cyan-50", "bg-yellow-50",
    "bg-yellow-100",
  ],
  theme: {
    extend: {
      /* Neobrutalist design tokens */
      colors: {
        /* Category accent mapping (ascending: Backlog → Considerable → Promising → Lucrative) */
        "category-backlog": {
          DEFAULT: "rgb(229 231 235)", // gray-200
          border: "rgb(156 163 175)", // gray-400
        },
        "category-considerable": {
          DEFAULT: "rgb(249 168 212)", // pink-300
          border: "rgb(244 114 182)", // pink-400
        },
        "category-promising": {
          DEFAULT: "rgb(103 232 249)", // cyan-300
          border: "rgb(34 211 238)", // cyan-400
        },
        "category-lucrative": {
          DEFAULT: "rgb(253 224 71)", // yellow-300
          border: "rgb(250 204 21)", // yellow-400
        },
      },
      borderWidth: {
        "neobrutal": "4px",
      },
      boxShadow: {
        "neobrutal": "8px 8px 0 0 rgb(0 0 0)",
        "neobrutal-sm": "4px 4px 0 0 rgb(0 0 0)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
