/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        vendor: {
          primary: '#4F46E5',
          secondary: '#5A5FF2',
          surface: '#F9FAFB',
          border: '#E5E7EB',
          text: {
            main: '#111827',
            muted: '#6B7280',
            light: '#9CA3AF',
          }
        }
      },
      borderRadius: {
        'vendor-xl': '20px',
        'vendor-lg': '12px',
      },
      animation: {
        'gradient-slow': 'gradient 8s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
      },
    },
  },
}
