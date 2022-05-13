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

export const GET_PORTFOLIO_CONTENT = gql`
  query getPortfolioContent(
    $size: Int
    $skip: Int
    $filters: PortfolioContentFilters!
  ) {
    getPortfolioContent(size: $size, skip: $skip, filters: $filters) {
      clients {
        id
        name
      }
      tags {
        id
        name
      }
      categories {
        id
        name
        color
      }
      contents {
        contents {
          url
          title
          featuredImage
          excerpt
          tags
          client {
            name
            profile
            icon
          }
          category {
            name
            color
          }
        }
        meta {
          total
        }
      }
    }
  }
`

export const GET_PORTFOLIO_DETAIL = gql`
  query getPortfolioDetail($filters: PortfolioContentFilters!) {
    getPortfolioDetail(filters: $filters) {
      about
      coverImage
      job
      profileImage
      name
    }
  }
`
