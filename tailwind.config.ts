import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#2c7da0",
        dark: "#203656",
        gray: "#ced4da",
      },
      backgroundImage: {
        job: "url('/assets/images/job-bg.jpg')",
      },
    },
  },
  plugins: [],
};
export default config;
