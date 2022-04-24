import { gql } from 'graphql-tag'
// import { clientFragments } from '~/graphql/clients/fragments'

export const GET_CATEGORIES = gql`
  query getCategories($size: Int, $skip: Int, $filters: CategoryFiltersInput) {
    getCategories(size: $size, skip: $skip, filters: $filters) {
      categories {
        id
        name
        color
        totalContents
        totalAmount
        createdAt
      }
      meta {
        total
      }
    }
  }
`

export const GET_CATEGORY = gql`
  query getCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      color
      totalContents
      totalAmount
      createdAt
    }
  }
`
