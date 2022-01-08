import Vue from 'vue'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.mixin({
  methods: {
    async isValidationInvalid() {
      this.$v.$reset()
      await this.$nextTick()
      this.$v.$touch()
      return this.$v.$invalid === true
    },

    getValidationMessage(field) {
      try {
        if (!field.$error) return null
        const properties = Object.keys(field)
        const validators = properties
          .filter((property) => !property.startsWith('$'))
          .filter((validator) => field[validator] === false)
        const validator = validators[0]
        const params = field.$params[validator]
        return this.$utils.errors(validator, params) // update this to locale
      } catch {
        return this.$utils.errors('default')
      }
    }
  }
})
