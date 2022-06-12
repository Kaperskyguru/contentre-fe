// import MeetupEvents from '~/Services/Scrappers/event-scrapper'

export const state = () => ({
  numberOfContents: 0,
  numberOfPortfolios: 0,
  contents: {
    content: ''
  }
})

export const mutations = {
  appendContent(state, payload) {
    state.contents.content = payload.content
  },
  saveContent(state, payload) {
    state.contents = payload
  }
}

export const actions = {
  //   async saveDraft({ commit, app }, payload) {
  //     const client = app.apolloProvider.defaultClient
  //   }
}
