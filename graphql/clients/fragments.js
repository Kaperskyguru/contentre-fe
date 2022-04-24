import { gql } from 'graphql-tag'

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
      totalAmount
      visibility
      status
      createdAt
      createdAt
      updatedAt
    }
  `
}
