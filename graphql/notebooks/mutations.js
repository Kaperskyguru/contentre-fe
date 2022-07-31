import { gql } from 'graphql-tag'

export const UPDATE_NOTEBOOK = gql`
  mutation updateNotebook($id: ID!, $input: UpdateNotebookInput!) {
    updateNotebook(id: $id, input: $input) {
      id
      name
      link
      totalNotes
      createdAt
    }
  }
`

export const CREATE_NOTEBOOK = gql`
  mutation createNotebook($input: CreateNotebookInput!) {
    createNotebook(input: $input) {
      id
      name
      link
      totalNotes
      createdAt
    }
  }
`

export const CREATE_NOTE = gql`
  mutation createNote($input: CreateNoteInput!) {
    createNote(input: $input) {
      id
      title
      shareLink
      createdAt
    }
  }
`

export const UPDATE_NOTE = gql`
  mutation updateNote($id: ID!, $input: UpdateNoteInput!) {
    updateNote(id: $id, input: $input) {
      id
      title
      shareLink
      createdAt
    }
  }
`

export const DELETE_NOTEBOOK = gql`
  mutation deleteNotebook($id: ID!) {
    deleteNotebook(id: $id)
  }
`
export const DELETE_NOTE = gql`
  mutation deleteNote($id: ID!) {
    deleteNote(id: $id)
  }
`

export const DELETE_BULK_NOTEBOOK = gql`
  mutation deleteBulkNotebook($input: DeleteBulkNotebookInput!) {
    deleteBulkNotebook(input: $input)
  }
`
