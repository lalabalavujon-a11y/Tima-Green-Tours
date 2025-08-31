import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{json,md}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#118a7e",
          teal: "#17a2a0",
          sand: "#f5efe6",
          night: "#0b1b1b"
        }
      }
    }
  },
  plugins: []
} satisfies Config;
