import { gql } from 'graphql-tag'

export const CREATE_CATEGORY = gql`
  mutation createCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      name
      color
    }
  }
`
