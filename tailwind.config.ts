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
            DEFAULT: '#05ff5c', // Base brand green
            50: '#f0fff7',    // Very light green (tint of #05ff5c)
            100: '#d9ffe9',   // Light green
            200: '#b0ffd1',   // Lighter green
            300: '#88ffb9',   // Medium light green
            400: '#3dff7b',   // Medium green (tint)
            500: '#05ff5c',   // Brand green (CTA)
            600: '#04d94f',   // Darker green
            700: '#03b342',   // Dark green
            800: '#028f36',   // Very dark green
            900: '#026b29',   // Forest green
            950: '#013d19',   // Deep forest green
          },
          // Brand palette aligned to requested hues
          emerald: {
            DEFAULT: '#6fde15', // primary brand green
            50: '#f2fde6',
            100: '#e4fbcf',
            200: '#c7f6a1',
            300: '#a9f072',
            400: '#8ceb44',
            500: '#6fde15', // requested
            600: '#4fb20a', // darker step for hover
            700: '#247141', // requested deep green
            800: '#1d5b34',
            900: '#154327',
            950: '#0b2415'
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
