/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#2e1065",
        },
        secondary: {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#52525b",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
          950: "#09090b",
        },
        accent: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
          950: "#083344",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Outfit", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },

      boxShadow: {
        glass: "0 8px 32px 0 rgba(0,0,0,0.1)",
        "glass-dark": "0 8px 32px 0 rgba(0,0,0,0.4)",
        neon: "0 0 20px rgba(124,58,237,0.3)",
        "neon-cyan": "0 0 20px rgba(6,182,212,0.3)",
      },

      backgroundImage: {
        "mesh-light":
          "radial-gradient(at 40% 20%, hsla(271,79%,81%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,76%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(335,100%,86%,1) 0px, transparent 50%)",

        "mesh-dark":
          "radial-gradient(at 40% 20%, hsla(271,79%,20%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,20%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(335,100%,20%,1) 0px, transparent 50%)",
      },

      animation: {
        "fade-in": "fadeIn .5s ease-in-out",
        "slide-up": "slideUp .6s cubic-bezier(0.16,1,0.3,1)",
        blob: "blob 7s infinite",
        glow: "glow 3s ease-in-out infinite alternate",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },

        slideUp: {
          "0%": {
            transform: "translateY(30px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },

        blob: {
          "0%": {
            transform: "translate(0,0) scale(1)",
          },
          "33%": {
            transform: "translate(30px,-50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px,20px) scale(.9)",
          },
          "100%": {
            transform: "translate(0,0) scale(1)",
          },
        },

        glow: {
          "0%": {
            boxShadow: "0 0 10px rgba(124,58,237,.2)",
          },
          "100%": {
            boxShadow: "0 0 25px rgba(124,58,237,.6)",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};