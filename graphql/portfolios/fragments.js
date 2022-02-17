import { gql } from 'graphql-tag'

export const portfolioFragments = {
  portfolio: gql`
    fragment portfolio on Portfolio {
      id
      title
      templateId
      url
      type
      description
      createdAt
      updatedAt
    }
  `
}
