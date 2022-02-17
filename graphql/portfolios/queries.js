import { gql } from 'graphql-tag'
import { portfolioFragments } from './fragments'

export const GET_PORTFOLIOS = gql`
  query getPortfolios($size: Int, $skip: Int, $filters: PortfolioFiltersInput) {
    getPortfolios(size: $size, skip: $skip, filters: $filters) {
      ...portfolio
    }
  }
  ${portfolioFragments.portfolio}
`

export const GET_PORTFOLIO = gql`
  query getPortfolio($id: ID!) {
    getPortfolio(id: $id) {
      ...portfolio
    }
  }
  ${portfolioFragments.portfolio}
`