export const state = () => ({
  email: "",
  password: "",
  rememberMe: false,
})

export const mutations = {
  updateEmail(state, payload) {
    state.email = payload
  },
  updatePassword(state, payload) {
    state.password = payload
  },
  toggleRememberMe(state) {
    state.rememberMe = !state.rememberMe
  }
}
