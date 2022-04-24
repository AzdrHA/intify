module.exports = {
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontSize: {
      'xs': '.75rem',
      'tiny': '.875rem',
    },
    colors: {
      'primary': '#8290C4FF',
      'dark': '#292929',
      'dark-100': '#1d1d1d',
      'dark-200': '#262626',


      'transparent': 'transparent',
      'current': 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
    },
    extend: {},
  },
  variants: {
    extend: {
      borderRadius: ['hover', 'focus'],
      transitionTimingFunction: ['hover', 'focus'],
    },
  },
  plugins: [],
};
