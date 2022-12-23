// NOTE: Hardcoded spacing configuration for reuse on 'min-' and 'max-' classes.
const spacing = {
  px: '1px',
  0: '0px',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  4.5: '1.125rem',
  5: '1.25rem',
  5.5: '1.375rem',
  6: '1.5rem',
  6.5: '1.625rem',
  7: '1.75rem',
  7.5: '1.875rem',
  8: '2rem',
  8.5: '2.125rem',
  9: '2.25rem',
  9.5: '2.375rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  13: '3.25rem',
  14: '3.5rem',
  15: '3.75rem',
  16: '4rem',
  17: '4.25rem',
  18: '4.5rem',
  19: '4.75rem',
  20: '5rem',
  22: '5.5rem',
  24: '6rem',
  26: '6.5rem',
  28: '7rem',
  30: '7.5rem',
  32: '8rem',
  34: '8.5rem',
  36: '9rem',
  38: '9.5rem',
  40: '10rem',
  42: '10.5rem',
  44: '11rem',
  46: '11.5rem',
  48: '12rem',
  50: '12.5rem',
  52: '13rem',
  54: '13.5rem',
  56: '14rem',
  58: '14.5rem',
  60: '15rem',
  62: '15.5rem',
  64: '16rem',
  66: '16.5rem',
  68: '17rem',
  70: '17.5rem',
  72: '18rem',
  74: '18.5rem',
  76: '19rem',
  78: '19.5rem',
  80: '20rem',
  82: '20.5rem',
  84: '21rem',
  86: '21.5rem',
  88: '22rem',
  90: '22.5rem',
  92: '23rem',
  94: '23.5rem',
  96: '24rem'
}

// NOTE: Hardcoded percentage values for reuse on 'min-' and 'max-' classes.
const percentages = {
  '1/2': '50%',
  '1/3': '33.333333%',
  '2/3': '66.666667%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',
  '1/6': '16.666667%',
  '2/6': '33.333333%',
  '3/6': '50%',
  '4/6': '66.666667%',
  '5/6': '83.333333%',
  '1/12': '8.333333%',
  '2/12': '16.666667%',
  '3/12': '25%',
  '4/12': '33.333333%',
  '5/12': '41.666667%',
  '6/12': '50%',
  '7/12': '58.333333%',
  '8/12': '66.666667%',
  '9/12': '75%',
  '10/12': '83.333333%',
  '11/12': '91.666667%'
}

module.exports = {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
      xs: '380px',
      mdCustom: '868px'
    },
    extend: {
      colors: {
        'primary-teal': '#4FD1C5',
        'header-text-color': '#286963',
        'body-text-color': '#102A27',
        placeholder: '#BDBDBD',
        warngray: '#958e80',
        darksilver: '#a0a0a0',
        whitesmoke: '#eee',
        silver: '#d7d7d7',
        warndarkgray: '#413734',
        'border-inner': '#999999',
        'default-grey': '#c4c4c4',
        'grey-shade': '#888888',
        current: 'currentColor',
        'aside-icon-grey': '#6B8583',
        linen: '#f4f1ea',
        lavander: '#dcebf2',
        'btn-green': '#4fd1c5',
        'btn-light': '#4fd1c5',
        snow: '#fafaf8',
        mistyrose: '#ffdfdb',
        powderblue: '#acdcff'
      },
      fontFamily: {
        gilroy: ['Gilroy', 'sans-serif'],
        helvetica: ['Helvetica', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif']
      },
      backgroundImage: {
        'auth-background': 'url(~assets/img/auth-nav/backdrop.svg)'
      },

      // NOTE: Extended 'blur' adding a very small size.
      blur: {
        xs: '2px'
      },

      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
        xs: '380px',
        mdCustom: '868px'
      },

      // NOTE: Extended 'min-h' classes with all spacing and percentage values.
      minHeight: {
        ...spacing,
        ...percentages
      },

      // NOTE: Extended 'max-h' classes with all spacing and percentage values.
      maxHeight: {
        ...spacing,
        ...percentages
      },

      // NOTE: Extended 'min-w' classes with all spacing and percentage values.
      minWidth: {
        ...spacing,
        ...percentages
      },

      // NOTE: Extended 'max-w' classes with all spacing and percentage values.
      maxWidth: {
        ...spacing,
        ...percentages
      },
      // minHeight: {
      //   'half-screen': '50vh',
      //   '80vh': '80vh'
      //   // NOTE: Extended 'min-h' classes with all spacing and percentage values.

      //   // ...spacing,
      //   // ...percentages
      // },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.15rem' }],
        base: ['0.9375rem', { lineHeight: '1.25rem' }],
        lg: ['1.125rem', { lineHeight: '1.5rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }]
      },
      width: {
        '80vw': '80vw'
      },
      padding: {
        '10vw': '10vw'
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/typography')
  ]
}
