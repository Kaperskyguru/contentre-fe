// import MeetupEvents from '~/Services/Scrappers/event-scrapper'

import { GET_CONTENT, GET_NOTE } from '~/graphql'

export const state = () => ({
  numberOfContents: 0,
  numberOfPortfolios: 0,
  note: {},
  content: {}
})

export const mutations = {
  appendContent(state, payload) {
    state.note.content = payload.content
  },
  saveContent(state, payload) {
    state.note = payload
  },

  save(state, payload) {
    state.content = payload
  }
}

export const getters = {
  getNote: (state) => (id) => {
    if (state.note?.id === id) {
      return state.note
    }
    return null
  },

  getContent: (state) => (id) => {
    if (state.content?.id === id) {
      return state.content
    }
    return null
  }
}

export const actions = {
  async getNote({ commit }, { slug, client }) {
    const {
      data: { getNote: savedNote }
    } = await client.query({
      query: GET_NOTE,
      variables: {
        id: slug
      },
      skip: !slug
    })
    commit('saveContent', savedNote)
    return savedNote
  },

  async getContent({ commit }, { slug, client }) {
    const {
      data: { getContent: savedContent }
    } = await client.query({
      query: GET_CONTENT,
      variables: {
        id: slug
      },
      skip: !slug
    })
    commit('save', savedContent)
    return savedContent
  }
}
