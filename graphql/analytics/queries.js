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

export const GET_CONTENT_STATS = gql`
  query getContentStats($filters: ContentFiltersInput) {
    getContentStats(filters: $filters) {
      box {
        amountPercent
        amount
        totalContents
        amountPercentStat
        contentPercent
        clientPercent
        totalClients
        interactionPercent
        currentInteractions
      }
      revenue {
        months
        data {
          current
          last
        }
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

export const GET_TOPIC_STATS = gql`
  query getTopicStats($filters: ContentFiltersInput) {
    getTopicStats(filters: $filters) {
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
