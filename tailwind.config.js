const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./templates/**/*.html", "./theme/**/*.html"],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      screens: {
        lg: '800px',
        xl: '900px',
        '2xl': '900px',
      },
    },
    fontFamily: {
      serif: ['"Crimson Pro"', ...defaultTheme.fontFamily.serif],
      sans: ['"Work Sans"', ...defaultTheme.fontFamily.sans],
      mono: ['"Cascadia Mono"', '"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
    },
    extend: {
      colors: {
        // Light/Dark surfaces mapped from jekyll-dash
        white: '#DAE4ED', // light background
        slate: {
          100: '#EEF4F8',
          300: '#CFD9E2',
          400: '#B7C3CE',
          500: '#A0ADBA',
          600: '#8793A0',
          700: '#5F6B78',
          800: '#15171A', // dark header
          900: '#0F1014', // dark content/background
        },
        gray: {
          400: '#B7C3CE',
          500: '#A0ADBA',
        },
        amber: {
          100: '#FFF4D6', // pale from jekyll yellow
        },
        indigo: {
          500: '#6775C4',
          900: '#2F3A8C',
        },
        // Accent palette
        red: { 500: '#F24784' },
        orange: { 500: '#EA9D53' },
        yellow: { 500: '#FCBC28' },
        teal: { 500: '#4BC997' },
        green: { 500: '#50BD6A' },
        cyan: { 500: '#4FC1E4' },
        blue: { 500: '#637AFE' },
        purple: { 500: '#8E59D7' },
      }
      ,
      typography: (theme) => ({
        DEFAULT: {
          css: {
            code: { fontStyle: 'normal', fontSize: '1rem' },
            pre: { fontSize: '1rem' },
            'pre code': { fontStyle: 'normal', fontSize: '1rem' },
          }
        },
        // Ensure large typography scale keeps code/pre at 1rem in light mode
        '2xl': {
          css: {
            code: { fontStyle: 'normal', fontSize: '1rem' },
            pre: { fontSize: '1rem' },
            'pre code': { fontStyle: 'normal', fontSize: '1rem' },
          }
        },
        invert: {
          css: {
            code: { fontStyle: 'normal', fontSize: '1rem' },
            pre: { fontSize: '1rem' },
            'pre code': { fontStyle: 'normal', fontSize: '1rem' },
          }
        }
      })
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
