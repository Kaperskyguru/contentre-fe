import { gql } from 'graphql-tag'

export const portfolioFragments = {
  portfolio: gql`
    fragment portfolio on Portfolio {
      id
      title
      template {
        content
        id
      }
      url
      type
      description
      createdAt
      updatedAt
    }
  `
}
