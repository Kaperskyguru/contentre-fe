import { gql } from 'graphql-tag'
import { contentFragments } from '~/graphql/contents/fragments'

export const CREATE_CONTENT = gql`
  mutation createContent($input: CreateContentInput!) {
    createContent(input: $input) {
      ...content
    }
  }
  ${contentFragments.content}
`

export const CONVERT_NOTE_CONTENT = gql`
  mutation convertNoteContent($id: ID!, $input: ConvertContentInput!) {
    convertNoteContent(id: $id, input: $input) {
      ...content
    }
  }
  ${contentFragments.content}
`

export const UPLOAD_CONTENT = gql`
  mutation uploadContent($input: UploadContentInput!) {
    uploadContent(input: $input) {
      ...content
    }
  }
  ${contentFragments.content}
`

export const UPLOAD_MULTIPLE_CONTENT = gql`
  mutation uploadMultipleContent($input: UploadMultipleContentInput!) {
    uploadMultipleContent(input: $input) {
      ...content
    }
  }
  ${contentFragments.content}
`

export const DELETE_BULK_CONTENT = gql`
  mutation deleteBulkContent($input: DeleteBulkContentInput!) {
    deleteBulkContent(input: $input)
  }
`

export const UPDATE_CONTENT = gql`
  mutation updateContent($id: ID!, $input: UpdateContentInput!) {
    updateContent(id: $id, input: $input) {
      ...content
    }
  }
  ${contentFragments.content}
`

export const DELETE_CONTENT = gql`
  mutation deleteContent($id: ID!) {
    deleteContent(id: $id)
  }
`
