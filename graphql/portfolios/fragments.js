import { gql } from 'graphql-tag'

export const portfolioFragments = {
  portfolio: gql`
    fragment portfolio on Portfolio {
      id
      title
      isPremium
      template {
        content
        id
        template {
          id
          type
        }
      }
      url
      type
      description
      googleAnalyticId
      domain
      password
      createdAt
      updatedAt
    }
  `
}
