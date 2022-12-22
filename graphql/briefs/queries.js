import { gql } from 'graphql-tag'

export const GET_BRIEFS = gql`
  query getBriefs($size: Int, $skip: Int, $filters: OutlineFiltersInput) {
    getBriefs(size: $size, skip: $skip, filters: $filters) {
      notes {
        id
        title
        content
        createdAt
        updatedAt
      }
      meta {
        total
      }
    }
  }
`

export const GET_BRIEF = gql`
  query getOutline($id: ID!) {
    getOutline(id: $id) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`
