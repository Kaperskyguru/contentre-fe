import { gql } from 'graphql-tag'

export const CREATE_SNIPPET = gql`
  mutation createSnippet($input: CreateSnippetInput!) {
    createSnippet(input: $input) {
      id
      title
      content
      createdAt
    }
  }
`

export const UPDATE_SNIPPET = gql`
  mutation updateSnippet($id: ID!, $input: UpdateSnippetInput!) {
    updateSnippet(id: $id, input: $input) {
      id
      title
      content
      createdAt
    }
  }
`

export const DELETE_SNIPPET = gql`
  mutation deleteSnippet($id: ID!) {
    deleteSnippet(id: $id)
  }
`

export const DELETE_BULK_SNIPPET = gql`
  mutation deleteBulkSnippet($input: DeleteBulkSnippetInput!) {
    deleteBulkSnippet(input: $input)
  }
`
