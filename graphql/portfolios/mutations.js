import { gql } from 'graphql-tag'
import { portfolioFragments } from '~/graphql/portfolios/fragments'

export const CREATE_PORTFOLIO = gql`
  mutation createPortfolio($input: CreatePortfolioInput!) {
    createPortfolio(input: $input) {
      ...portfolio
    }
  }
  ${portfolioFragments.portfolio}
`
export const DELETE_PORTFOLIO = gql`
  mutation deletePortfolio($id: ID!) {
    deletePortfolio(id: $id)
  }
`

export const UPDATE_PORTFOLIO = gql`
  mutation updatePortfolio($id: ID!, $input: UpdatePortfolioInput!) {
    updatePortfolio(id: $id, input: $input) {
      ...portfolio
    }
  }
  ${portfolioFragments.portfolio}
`

export const UPDATE_USER_TEMPLATE = gql`
  mutation updateUserTemplate($id: ID!, $input: UpdateUserTemplateInput!) {
    updateUserTemplate(id: $id, input: $input) {
      id
      content
      css
    }
  }
`

export const CREATE_USER_TEMPLATE = gql`
  mutation createUserTemplate($id: ID!, $input: CreateUserTemplateInput!) {
    createUserTemplate(input: $input) {
      id
      content
      css
    }
  }
`
