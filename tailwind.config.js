/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: { background: "cccccc" },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            text: {
              100: "#333333",
              200: "#5c5c5c",
            },
            primary: {
              100: "#0077C2",
              200: "#59a5f5",
              300: "#c8ffff",
              DEFAULT: "#0077C2",
              foreground: "#ffffff",
            },
          },
        },
      },
    }),
  ],
};
// --primary-100:#0077C2;
// --primary-200:#59a5f5;
// --primary-300:#c8ffff;
// --accent-100:#00BFFF;
// --accent-200:#00619a;
// --text-100:#333333;
// --text-200:#5c5c5c;
// --bg-100:#FFFFFF;
// --bg-200:#f5f5f5;
// --bg-300:#cccccc;
