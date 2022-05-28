import { gql } from 'graphql-tag'

export const GET_MEMBERS = gql`
  query getMembers($contains: String) {
    getMembers(contains: $contains) {
      id
      name
      lastActivityAt
      role
      createdAt
      username
    }
  }
`
