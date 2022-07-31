import { gql } from 'graphql-tag'
import { userFragments } from '~/graphql/users/fragments'
import { clientFragments } from '~/graphql/clients/fragments'

export const contentFragments = {
  content: gql`
    fragment content on Content {
      id
      title
      client {
        ...client
      }
      visibility
      lastUpdated
      url
      tags
      user {
        ...user
      }
      topics {
        name
        id
      }
      type
      excerpt
      status
      content
      likes
      shares
      comments
      amount
      interactions
      paymentType
      category {
        id
        name
        color
      }
      featuredImage
      createdAt
      updatedAt
    }
    ${clientFragments.client}
    ${userFragments.user}
  `
}
