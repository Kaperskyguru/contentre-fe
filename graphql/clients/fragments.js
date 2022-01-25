import { gql } from 'graphql-tag'
import { userFragments } from '~/graphql/users/fragments'

export const clientFragments = {
  client: gql`
    fragment client on Client {
      id
      name
      website
      profile
      totalContents
      createdAt
      createdAt
      updatedAt
      user {
        ...user
      }
    }
    ${userFragments.user}
  `
}
