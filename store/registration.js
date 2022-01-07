import { gql } from 'nuxt-graphql-request';

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

export const actions = {
  async registerUser({state}) {
    try {
      const mutation = gql`
      mutation createUser($input: CreateUserInput!){
        createUser(input: $input) {
        email,
        name,
        username
      }
    }
    `

      const variables = {
        input: {
          email: state.email,
          password: state.password,
          name: state.full_name,
          username: state.username,
        }
      }

      const data = await this.$graphql.default.request(mutation, variables);
      // eslint-disable-next-line no-console
      console.log(data);
    } catch(err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }


  }
}
