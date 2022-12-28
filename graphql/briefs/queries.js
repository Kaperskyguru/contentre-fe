import { gql } from 'graphql-tag'

export const GET_BRIEFS = gql`
  query getBriefs($size: Int, $skip: Int, $filters: BriefFiltersInput) {
    getBriefs(size: $size, skip: $skip, filters: $filters) {
      briefs {
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
  query getBrief($id: ID!) {
    getBrief(id: $id) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`
