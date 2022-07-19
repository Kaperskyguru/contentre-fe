// import MeetupEvents from '~/Services/Scrappers/event-scrapper'

export const state = () => ({
  numberOfContents: 0,
  numberOfPortfolios: 0,
  note: {}
})

export const mutations = {
  appendContent(state, payload) {
    state.note.content = payload.content
  },
  saveContent(state, payload) {
    state.note = payload
  }
}

export const getters = {
  getNote: (state) => (id) => {
    if (state.note.id === id) {
      return state.note
    }
    return null
  }
}

export const actions = {
  //   async saveDraft({ commit, app }, payload) {
  //     const client = app.apolloProvider.defaultClient
  //   }
}
