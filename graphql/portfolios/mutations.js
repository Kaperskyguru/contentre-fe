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
