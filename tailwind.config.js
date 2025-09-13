import tailwindTypography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Johnston100-Light', '"Avenir Next"', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [tailwindTypography],
};
