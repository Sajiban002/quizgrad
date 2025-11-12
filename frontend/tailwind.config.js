/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef9ec',
          100: '#fdefc8',
          200: '#fbde8c',
          300: '#f9c750',
          400: '#f7b027',
          500: '#f19010',
          600: '#d56809',
          700: '#b1470b',
          800: '#903710',
          900: '#762e11',
        }
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}