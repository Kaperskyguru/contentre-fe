import { gql } from 'graphql-tag'

export const GET_SNIPPETS = gql`
  query getSnippets($size: Int, $skip: Int, $filters: SnippetFiltersInput) {
    getSnippets(size: $size, skip: $skip, filters: $filters) {
      snippets {
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

export const GET_SNIPPET = gql`
  query getSnippet($id: ID!) {
    getSnippet(id: $id) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`
