import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          charcoal: '#172322',
          ivory: '#F7F6F2',
          cream: '#F2EFEB',
          sage: '#8FA496',
          softsage: '#A8B9AE',
          teal: '#54C5C0',
          tealDark: '#3DAAA6',
          mint: '#EBF6F5',
          muted: '#7A8884',
        },
      },
      fontFamily: {
        // Body text, navigation, forms and buttons
        sans: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        // Hero headlines, section titles, statistics
        heading: ['Manrope', 'system-ui', 'sans-serif'],
        // Testimonials, highlighted phrases, small editorial details
        accent: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.22)',
        soft: '0 12px 35px -8px rgba(23, 35, 34, 0.08)',
        elevated: '0 20px 40px -12px rgba(23, 35, 34, 0.12)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: 0, transform: 'translateY(12px) scale(0.98)' },
          to: { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
      },
    },
  },
  plugins: [forms],
}
