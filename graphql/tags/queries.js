import { gql } from 'graphql-tag'

export const GET_TAGS = gql`
  query getTags($size: Int, $skip: Int, $filters: TagFiltersInput) {
    getTags(size: $size, skip: $skip, filters: $filters) {
      id
      name
      totalAmount
      totalContents
      createdAt
    }
  }
`

export const GET_TAG = gql`
  query getTag($id: ID!) {
    getTag(id: $id) {
      id
      name
      totalAmount
      totalContents
      createdAt
    }
  }
`
