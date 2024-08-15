const colors = require('./src/ui/nativewind-colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        spaceMono: ['SpaceMono-Regular'],
      },
      colors,
    },
  },
  plugins: [],
};
