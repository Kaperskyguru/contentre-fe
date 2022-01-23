import { gql } from 'graphql-tag'
import { userFragments } from '~/graphql/users/fragments'

export const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      ...user
    }
  }
  ${userFragments.user}
`

export const UPDATE_USER = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      ...user
    }
  }
  ${userFragments.user}
`

export const DELETE_USER = gql`
  mutation {
    deleteUser
  }
`

export const USER_SWITCHED_LANGUAGE = gql`
  mutation userSwitchedLanguage($newLanguage: String!) {
    userSwitchedLanguage(newLanguage: $newLanguage)
  }
`
