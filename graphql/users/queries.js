import { gql } from 'graphql-tag'
import { userFragments } from '~/graphql/users/fragments'

export const GET_CURRENT_USER = gql`
  query getCurrentUser {
    getCurrentUser {
      ...user
    }
  }
  ${userFragments.user}
`
