import { gql } from 'graphql-tag'

export const CREATE_OUTLINE = gql`
  mutation createOutline($input: CreateOutlineInput!) {
    createOutline(input: $input) {
      id
      title
      content
      createdAt
    }
  }
`

export const CONVERT_NOTE_OUTLINE = gql`
  mutation convertNoteOutline($id: ID!, $input: ConvertOutlineInput!) {
    convertNoteOutline(id: $id, input: $input) {
      id
      title
      content
      createdAt
    }
  }
`

export const CAN_ADD_OUTLINE = gql`
  mutation canAddOutline {
    canAddOutline
  }
`

export const UPDATE_OUTLINE = gql`
  mutation updateOutline($id: ID!, $input: UpdateOutlineInput!) {
    updateOutline(id: $id, input: $input) {
      id
      title
      content
      createdAt
    }
  }
`

export const DELETE_OUTLINE = gql`
  mutation deleteOutline($id: ID!) {
    deleteOutline(id: $id)
  }
`

export const DELETE_BULK_OUTLINE = gql`
  mutation deleteBulkOutline($input: DeleteBulkOutlineInput!) {
    deleteBulkOutline(input: $input)
  }
`
