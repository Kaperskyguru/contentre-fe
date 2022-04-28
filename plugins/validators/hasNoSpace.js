import { helpers } from 'vuelidate/lib/validators'

const regex = /^([A-z])*[^\s]\1*$/
export const hasNoSpace = helpers.withParams(
  {
    type: 'hasNoSpace'
  },
  (v) => !helpers.req(v) || regex.test(v)
)
