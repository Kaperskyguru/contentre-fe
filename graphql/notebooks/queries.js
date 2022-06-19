import { gql } from 'graphql-tag'

// NOTEBOOKS
export const GET_NOTEBOOKS = gql`
  query getNotebooks($size: Int, $skip: Int, $filters: NotebookFiltersInput) {
    getNotebooks(size: $size, skip: $skip, filters: $filters) {
      notebooks {
        id
        name
        totalNotes
        createdAt
      }
      meta {
        total
      }
    }
  }
`

export const GET_NOTEBOOK = gql`
  query getNotebook($id: ID!) {
    getNotebook(id: $id) {
      id
      name
      totalNotes
      createdAt
    }
  }
`

// NOTES
export const GET_NOTES = gql`
  query getNotes($size: Int, $skip: Int, $filters: NoteFiltersInput) {
    getNotes(size: $size, skip: $skip, filters: $filters) {
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

export const GET_NOTE = gql`
  query getNote($id: ID!) {
    getNote(id: $id) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`
