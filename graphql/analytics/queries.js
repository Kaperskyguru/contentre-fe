import { gql } from 'graphql-tag'

export const GET_OVERALL_STATS = gql`
  query getOverallStats($filters: ContentFiltersInput) {
    getOverallStats(filters: $filters) {
      stats {
        interactions
        growth
        name
        status
        totalShares
        totalComments
        totalLikes
        totalContents
      }
      performance {
        totalInteractions
        totalAmount
        totalContents
      }
      categoryStat {
        name
        totalContents
        totalLikes
        totalComments
        totalShares
      }
    }
  }
`

export const GET_CATEGORY_STATS = gql`
  query getCategoryStats($filters: ContentFiltersInput) {
    getCategoryStats(filters: $filters) {
      name
      totalAmount
      totalContents
      totalInteractions
      totalClients
    }
  }
`

export const GET_TAG_STATS = gql`
  query getTagStats($filters: ContentFiltersInput) {
    getTagStats(filters: $filters) {
      name
      totalAmount
      totalContents
      totalInteractions
      totalClients
    }
  }
`
