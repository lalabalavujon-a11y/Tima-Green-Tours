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
        // Primary brand colors from main website
        brand: {
          green: {
            50: '#f0fdf4',   // Very light green
            100: '#dcfce7',  // Light muted green (header background)
            200: '#bbf7d0',  // Light green
            300: '#86efac',  // Medium light green
            400: '#4ade80',  // Medium green
            500: '#22c55e',  // Vibrant emerald (CTA button)
            600: '#16a34a',  // Darker green
            700: '#15803d',  // Dark green
            800: '#166534',  // Very dark green
            900: '#14532d',  // Forest green
          },
          black: '#000000',  // Pure black for text and accents
          white: '#ffffff',  // Clean white for backgrounds
        },
        // Supporting colors from main website
        accent: {
          navy: '#1e3a8a',   // Deep navy blue
          teal: '#0d9488',   // Blue-green transition
          gray: {
            50: '#f9fafb',   // Very light gray
            100: '#f3f4f6',  // Light gray
            200: '#e5e7eb',  // Medium light gray
            300: '#d1d5db',  // Medium gray
            400: '#9ca3af',  // Darker gray
            500: '#6b7280',  // Dark gray
            600: '#4b5563',  // Very dark gray
            700: '#374151',  // Almost black
            800: '#1f2937',  // Dark charcoal
            900: '#111827',  // Near black
          }
        }
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
