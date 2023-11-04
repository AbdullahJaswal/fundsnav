import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: "0.65rem",
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: "#66cc8a",
          secondary: "#c9b74f",
          accent: "#ea5234",
          neutral: "#b0b8b0",
          "base-100": "#FFFFFF",
          "base-200": "#fafafa",
          "base-300": "#edf2ed",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",

          "--rounded-box": "0.75rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-text-case": "uppercase", // set default text transform for buttons
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "1px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.5rem", // border radius of tabs
        },
        dark: {
          primary: "#66cc8a",
          secondary: "#edd85f",
          accent: "#ea5234",
          neutral: "#252525",
          "base-100": "#000000",
          "base-200": "#0c0c0c",
          "base-300": "#181818",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",

          "--rounded-box": "0.75rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-text-case": "uppercase", // set default text transform for buttons
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "1px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.5rem", // border radius of tabs
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};

export default config;
