module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-teal': "#4FD1C5",
        'header-text-color': "#286963",
        'body-text-color': '#102A27',
        'placeholder': '#BDBDBD',
        'border-inner': '#99999999',
        'default-grey': '#c4c4c4',
        'grey-shade': '#88888888',
      },
      fontFamily: {
        gilroy: ['Gilroy', 'sans-serif'],
        helvetica: ['Helvetica', 'sans-serif'],
      },
      backgroundImage: {
        'auth-background': "url(~assets/img/auth-nav/backdrop.svg)"
      },
      minHeight: {
        'half-screen': '50vh',
        '80vh': '80vh',
      },
      width: {
        '80vw': '80vw'
      },
      padding: {
        '10vw': '10vw',
      }
    },
  },
  plugins: [],
}
