import { helpers } from 'vuelidate/lib/validators'

const regex = /[a-z]+/i
export const hasLetter = helpers.withParams(
  {
    type: 'hasLetter'
  },
  (v) => !helpers.req(v) || regex.test(v)
)
