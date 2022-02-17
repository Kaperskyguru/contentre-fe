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
// export const DELETE_CLIENT = gql`
//   mutation deleteClient($id: ID!) {
//     deleteClient(id: $id)
//   }
// `
