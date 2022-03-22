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

export const UPDATE_CATEGORY = gql`
  mutation updateCategory($id: ID!, $input: UpdateCategoryInput!) {
    updateCategory(id: $id, input: $input) {
      id
      name
      color
    }
  }
`
