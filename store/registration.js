export const state = () => ({
  username: "",
  full_name: "",
  email: "",
  password: "",
  password_again: "",
})

export const mutations = {
  updateUserName(state, payload) {
    state.username = payload;
  },
  updateFullName(state, payload) {
    state.full_name = payload;
  },
  updateEmail(state, payload) {
    state.email = payload
  },
  updatePassword(state, payload) {
    state.password = payload
  },
  updatePasswordAgain(state, payload) {
    state.password_again = payload
  }
}
