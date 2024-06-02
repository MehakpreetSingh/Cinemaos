/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",'./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    extend: {
      // Custom scrollbar styles
      ':-webkit-scrollbar': {
        width: '4px',
      },
      ':-webkit-scrollbar-track': {
        backgroundColor: '#f1f1f1',
      },
      ':-webkit-scrollbar-thumb': {
        backgroundColor: '#888',
        borderRadius: '4px',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
