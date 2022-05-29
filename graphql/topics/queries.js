import { gql } from 'graphql-tag'

export const GET_TOPICS = gql`
  query getTopics($size: Int, $skip: Int, $filters: TopicFiltersInput) {
    getTopics(size: $size, skip: $skip, filters: $filters) {
      topics {
        id
        name
        totalAmount
        totalContents
        createdAt
      }
      meta {
        total
      }
    }
  }
`
export const GET_TOPIC = gql`
  query getTopic($id: ID!) {
    getTopic(id: $id) {
      id
      name
      totalContents
      totalAmount
      createdAt
    }
  }
`
