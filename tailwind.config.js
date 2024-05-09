/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      visibility: {
        'visible': 'visible',
        'invisible': 'hidden',
      },
    },
    fontFamily: {
      'inter': ["Inter", "sans serif"],
      'Mulish': ["Mulish", "sans serif"],
      'Poppins': ["Poppins", "sans serif"],
    },
    fontWeight: {
      small: "300",
      regular: '400',
      medium :'450',
      bold: '500',
      extra: "700"
    },
    screens: {
      'md': '1024px',
      'lg': '1280px',
    },
    boxShadow: {
      'button': '1px 1px 4px 1px rgba(0, 0, 0, 0.25)',
      'search': ' 0px 0px 14px 1px rgba(0,0,0,0.10)',
      'md': '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1)'
    },
  },
  plugins: [],
}


