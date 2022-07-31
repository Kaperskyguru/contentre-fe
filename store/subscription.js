export const state = () => ({
  subscription: {},
  numberOfContents: 0,
  numberOfPortfolios: 0
})

export const mutations = {
  updateSubscription(state, payload) {
    state.subscription = payload
  },

  updateFeature(state, payload) {
    state.subscription = {
      ...state.subscription,
      payload
    }
  },

  updateTotalContents(state, payload) {
    state.numberOfContents = payload
  },

  increment(state) {
    state.numberOfContents += 1
  },

  incrementBy(state, payload) {
    state.numberOfContents += payload
  },

  updateTotalPortfolios(state, payload) {
    state.numberOfPortfolios = payload
  }
}

export const getters = {
  getTotalContents(state) {
    return state.numberOfContents
  },
  getTotalPortfolios(state) {
    return state.numberOfPortfolios
  }
}
