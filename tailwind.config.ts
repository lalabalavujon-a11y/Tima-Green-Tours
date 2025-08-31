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
        },
        // New Fiji-inspired palette from upgrade plan
        lagoon: "#0EA5E9",
        deepsea: "#075985",
        coral: "#F97316",
        palm: "#10B981",
        sand: "#F3F4F6",
        kava: "#7C5A42",
        ink: "#0B1220"
      },
      borderRadius: {
        xl: '20px',
        '2xl': '24px'
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,.05)',
        md: '0 6px 12px rgba(0,0,0,.08)',
        lg: '0 12px 24px rgba(0,0,0,.12)'
      },
      fontSize: {
        'display': ['48px', { lineHeight: '54px', letterSpacing: '-0.02em' }],
        'display-sm': ['40px', { lineHeight: '48px', letterSpacing: '-0.02em' }],
        'h1': ['40px', { lineHeight: '48px', letterSpacing: '-0.02em' }],
        'h2': ['32px', { lineHeight: '40px', letterSpacing: '-0.01em' }],
        'h3': ['24px', { lineHeight: '32px', letterSpacing: '-0.01em' }],
        'body': ['16px', { lineHeight: '24px' }],
        'small': ['14px', { lineHeight: '20px' }]
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      }
    }
  },
  plugins: []
} satisfies Config;
