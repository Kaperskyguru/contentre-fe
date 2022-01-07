// let hasCapital = false
// for (let i = 0; i < this.fieldPassword.length; i++) {
//   if (
//     this.fieldPassword[i].toUpperCase() === this.fieldPassword[i] &&
//     /[A-Za-z]/.test(this.fieldPassword[i])
//   ) {
//     hasCapital = true
//   }
// }
// return hasCapital

import { helpers } from 'vuelidate/lib/validators'

const regex = /[A-Z]/
export const hasCapital = helpers.withParams(
  {
    type: 'hasCapital'
  },
  (v) => !helpers.req(v) || regex.test(v)
)
