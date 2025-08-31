/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#e0e7ff',
          100: '#c7d2fe',
          200: '#a5b4fc',
          300: '#818cf8',
          400: '#6366f1',
          500: '#06b6d4', // Cyan
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        success: {
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          500: '#facc15',
          600: '#eab308',
        },
        text: {
          DEFAULT: '#000000', // All text is black by default
        },
        secondary: {
          500: '#000000', // Black for secondary text
          600: '#000000',
        },
        accent: {
          500: '#000000', // Black for accent text
          600: '#000000',
        },
        error: {
          500: '#000000', // Black for error text
          600: '#000000',
        },
        info: {
          500: '#000000', // Black for info text
          600: '#000000',
        },
        background: '#ffffff',
        surface: '#f3f4f6',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Montserrat', 'ui-sans-serif', 'system-ui'],
      },
      container: {
        center: true,
        padding: '1rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};