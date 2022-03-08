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
      amount
      paymentType
      icon
      status
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
