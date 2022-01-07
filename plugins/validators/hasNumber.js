import { helpers } from 'vuelidate/lib/validators'

const regex = /\d+/
export const hasNumber = helpers.withParams(
  {
    type: 'hasNumber'
  },
  (v) => !helpers.req(v) || regex.test(v)
)
