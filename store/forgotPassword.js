export const state = () => ({
  email: ""
})

export const mutations = {
  updateEmail(state, payload) {
    state.email = payload
  },
}
