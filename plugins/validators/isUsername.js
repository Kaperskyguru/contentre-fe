import { helpers } from 'vuelidate/lib/validators'

// eslint-disable-next-line no-useless-escape
const regex = /^[a-z\d]+$/i
export const isUsername = helpers.withParams(
  {
    type: 'isUsername'
  },
  (v) => !helpers.req(v) || regex.test(v)
)
