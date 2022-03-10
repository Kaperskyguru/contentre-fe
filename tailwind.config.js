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
    extend: {
      colors: {
        'primary-teal': '#4FD1C5',
        'header-text-color': '#286963',
        'body-text-color': '#102A27',
        placeholder: '#BDBDBD',
        darksilver: '#a0a0a0',
        silver: '#d7d7d7',
        'border-inner': '#99999999',
        'default-grey': '#c4c4c4',
        'grey-shade': '#88888888',
        current: 'currentColor',
        'aside-icon-grey': '#6B8583',
        linen: '#f4f1ea',
        lavander: '#dcebf2',
        red: '#ff6955',
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
      minHeight: {
        'half-screen': '50vh',
        '80vh': '80vh'
        // NOTE: Extended 'min-h' classes with all spacing and percentage values.

        // ...spacing,
        // ...percentages
      },
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
  plugins: []
}
