/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../src/**/*.{js,ts,jsx,tsx}',
    './**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'outfit': ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
        },
      },
    },
  },
  plugins: [],
};
