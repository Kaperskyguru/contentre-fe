import { gql } from 'graphql-tag'

export const CREATE_BRIEF = gql`
  mutation createBrief($input: CreateBriefInput!) {
    createBrief(input: $input) {
      id
      title
      content
      createdAt
    }
  }
`

export const CONVERT_NOTE_BRIEF = gql`
  mutation convertNoteBrief($id: ID!, $input: ConvertBriefInput!) {
    convertNoteBrief(id: $id, input: $input) {
      id
      title
      content
      createdAt
    }
  }
`

export const UPDATE_BRIEF = gql`
  mutation updateBrief($id: ID!, $input: UpdateBriefInput!) {
    updateBrief(id: $id, input: $input) {
      id
      title
      content
      createdAt
    }
  }
`

export const DELETE_BRIEF = gql`
  mutation deleteBrief($id: ID!) {
    deleteBrief(id: $id)
  }
`

export const DELETE_BULK_BRIEF = gql`
  mutation deleteBulkBrief($input: DeleteBulkBriefInput!) {
    deleteBulkBrief(input: $input)
  }
`
