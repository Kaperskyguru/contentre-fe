import { gql } from 'graphql-tag'

export const portfolioFragments = {
  portfolio: gql`
    fragment portfolio on Portfolio {
      id
      title
      isPremium
      userTemplate {
        content
        id
        template {
          id
          type
          image
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
