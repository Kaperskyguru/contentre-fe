import { helpers } from 'vuelidate/lib/validators'

// eslint-disable-next-line no-useless-escape
const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
export const hasSymbol = helpers.withParams(
  {
    type: 'hasSymbol'
  },
  (v) => !helpers.req(v) || regex.test(v)
)
