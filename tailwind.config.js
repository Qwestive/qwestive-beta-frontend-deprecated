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
  darkMode: 'class', // or 'media' or 'class'
  variants: {
    extend: {
      ringWidth: ['hover', 'active'],
      ringColor: ['hover', 'active'],
      ringOpacity: ['hover', 'active'],
      appearance: ['hover', 'focus'],
      display: ['dark'],
    },
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'qwestive-white': '#FAF9FA',
        'landing-page-card-gray': '#ECEFF1',
        'qwestive-purple': '#6560fb', // very near indigo 500
        'qwestive-purple-hover': '#4c48c2',
        qwestivepurple: {
          50: '#E7E3FC',
        },
        qwestivegray: {
          50: '#f9f9fa',
          100: '#dae2e8',
        },
        qwestiveblue: {
          100: '#a8cae9'
        },
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        fuchsia: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        cyan: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        sky: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        stone: colors.warmGray,
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
      },

      // that is animation class
      animation: {
        fadeIn: 'fadeIn 1.5s ease-in',
        fadeInSlide: 'fadeInSlide 1.5s ease-in',
        bounce0: 'bounce 1s infinite 0ms',
        bounce200: 'bounce 1s infinite 200ms',
        bounce400: 'bounce 1s infinite 400ms',
      },

      // that is actual animation
      keyframes: (theme) => ({
        fadeInSlide: {
          from: {
            opacity: '0',
            transform: 'translateY(150px)',
          },
          to: {
            opacity: '100',
            transform: 'translateY(0px)',
          },
        },
        fadeIn: {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '100',
          },
        },
      }),
    },
  },

  plugins: [require('@tailwindcss/forms')],
};
