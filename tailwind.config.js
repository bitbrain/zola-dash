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
      mono: ['"Cascadia Mono"', ...defaultTheme.fontFamily.mono],
    },
    extend: {
      colors: {
        // Light/Dark surfaces mapped from jekyll-dash
        white: '#DAE4ED', // light background
        slate: {
          100: '#EEF4F8',
          300: '#CFD9E2',
          400: '#B7C3CE',
          500: '#5C697A',
          600: '#8793A0',
          700: '#1C2026',
          800: '#16191E',
          900: '#0E1013',
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
        red: { 500: '#FF4554' },
        orange: { 500: '#ED9C50' },
        yellow: { 500: '#ED9C50' },
        teal: { 500: '#46C999' },
        green: { 500: '#4EBC6B' },
        cyan: { 500: '#46C999' },
        blue: { 500: '#5B85FF' },
        pink: { 500: '#F54784' },
        purple: { 500: '#F54784' },
        accent: '#637AFE',
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
