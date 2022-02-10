/* eslint-disable @typescript-eslint/no-var-requires, global-require */
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [
    './src/*.tsx',
    './src/pages/**/*.{html,js,jsx,ts,tsx}',
    './src/common/components/**/*.{html,js,jsx,ts,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'qwestive-white': '#FAF9FA',
        'qwestive-gray': '#A3A171',
        'qwestive-purple': '#6560fb',
        'qwestive-purple-hover': '#4c48c2',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
