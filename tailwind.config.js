import tailwindTypography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './.storybook/**/*.{ts,tsx,js,jsx,mdx}'],
  theme: {
    extend: {
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
