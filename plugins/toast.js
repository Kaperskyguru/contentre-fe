import Vue from 'vue'

export default (_context, inject) => {
  inject(
    'toast',

    Vue.observable({
      message: '',
      type: 'negative',
      timeout: 5000,

      negative(message = '', timeout = 5000) {
        console.log(message)
        this.type = 'negative'
        this.message = message
        this.timeout = timeout
      },

      positive(message = '', timeout = 5000) {
        this.type = 'positive'
        this.message = message
        this.timeout = timeout
      }
    })
  )
}
