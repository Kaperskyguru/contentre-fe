import { gql } from 'graphql-tag'
// import { clientFragments } from '~/graphql/clients/fragments'

export const GET_CATEGORIES = gql`
  query getCategories($size: Int, $skip: Int, $filters: CategoryFiltersInput) {
    getCategories(size: $size, skip: $skip, filters: $filters) {
      id
      name
      color
    }
  }
`

export const GET_CATEGORY = gql`
  query getCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      color
    }
  }
`
