import { gql } from 'graphql-tag'

export const GET_OUTLINES = gql`
  query getOutlines($size: Int, $skip: Int, $filters: OutlineFiltersInput) {
    getOutlines(size: $size, skip: $skip, filters: $filters) {
      outlines {
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

export const GET_OUTLINE = gql`
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
