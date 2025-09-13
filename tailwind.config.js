import tailwindTypography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './.storybook/**/*.{ts,tsx,js,jsx,mdx}'],
  theme: {
    extend: {
      colors: {
        tfl: {
          ink: '#03071c',
          surface: '#ffffff',
          surfaceMuted: '#f7f9fa',
          panel: '#e1e4e8',
          border: '#c1c8d2',
          highlight: '#ffe500',
          line: {
            bakerloo: '#b26300',
            central: '#dc241f',
            circle: '#ffc80a',
            district: '#007d32',
            hammersmithCity: '#f589a6',
            jubilee: '#838d93',
            metropolitan: '#9b0058',
            northern: '#000000',
            piccadilly: '#0019a8',
            victoria: '#039be5',
            waterlooCity: '#76d0bd',
            elizabeth: '#60399e',
            overground: '#fa7b05',
            dlr: '#00afad',
            tram: '#5fb526',
            liberty: '#61686b',
            lioness: '#ffa600',
            mildmay: '#006fe6',
            suffragette: '#18a95d',
            weaver: '#9b0058',
            windrush: '#dc241f',
          },
        },
        status: {
          success: '#00703C',
          warning: '#FFDD00',
          error: '#D4351C',
        },
        mode: {
          underground: '#0019A8',
          overground: '#FA7B05',
          dlr: '#00AFAD',
          elizabeth: '#60399E',
          trams: '#5FB526',
          victoria: '#039BE5',
        },
      },
      spacing: {
        4.5: '1.125rem',
      },
      boxShadow: {
        'inset-1': 'inset 0 0 1px 1px #03071c',
      },
      fontFamily: {
        sans: ['Johnston100-Light', '"Avenir Next"', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [tailwindTypography],
};
