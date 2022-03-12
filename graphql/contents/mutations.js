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

export const UPLOAD_CONTENT = gql`
  mutation uploadContent($input: UploadContentInput!) {
    uploadContent(input: $input) {
      ...content
    }
  }
  ${contentFragments.content}
`

export const UPDATE_CONTENT = gql`
  mutation updateContent($id: ID!, $input: UpdateContentInput!) {
    updateContent(id: $id, input: $input) {
      ...content
    }
  }
  ${contentFragments.content}
`

// export const DELETE_CLIENT = gql`
//   mutation deleteClient($id: ID!) {
//     deleteClient(id: $id)
//   }
// `
