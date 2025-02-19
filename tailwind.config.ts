
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem",
        "2xl": "6rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "primary-dark": "#8E1D35",
        "primary-mid": "#B72C47",
        "primary-light": "#FFCCD5",
        "primary-ultra-light": "#FFF0F3",
        "text-primary": "#333333",
        "text-secondary": "#555555",
        "success": "#2E8B57",
        "warning": "#FFD700",
        "chart-grid": "#D3D3D3",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#8E1D35",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#FFCCD5",
          foreground: "#8E1D35",
        },
      },
      borderRadius: {
        lg: "16px",
        md: "12px",
        sm: "8px",
      },
      fontFamily: {
        gilroy: ["Gilroy", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        "h1": ["48px", { letterSpacing: "-0.5px", lineHeight: "1.2" }],
        "h2": ["36px", { letterSpacing: "-0.3px", lineHeight: "1.3" }],
        "h3": ["24px", { letterSpacing: "0", lineHeight: "1.4" }],
        "body": ["16px", { lineHeight: "1.6" }],
        "body-sm": ["14px", { lineHeight: "1.5" }],
        "accent": ["16px", { lineHeight: "1.4" }],
      },
      boxShadow: {
        'card': '0 4px 8px rgba(183, 44, 71, 0.1)',
        'card-hover': '0 8px 16px rgba(183, 44, 71, 0.15)',
        'inner': 'inset 0 2px 4px rgba(183, 44, 71, 0.05)',
      },
      backgroundImage: {
        'dot-pattern': 'radial-gradient(circle, #B72C47 1px, transparent 1px)',
        'gradient-primary': 'linear-gradient(135deg, #8E1D35 0%, #FFCCD5 100%)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        'fade-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'scale-up': {
          '0%': {
            transform: 'scale(1)'
          },
          '100%': {
            transform: 'scale(1.05)'
          }
        },
        'pulse': {
          '0%, 100%': {
            opacity: '1'
          },
          '50%': {
            opacity: '0.6'
          }
        },
        'cross-fade': {
          '0%': {
            opacity: '0'
          },
          '100%': {
            opacity: '1'
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
        "scale-up": "scale-up 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
        "pulse": "pulse 1.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite",
        "cross-fade": "cross-fade 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
