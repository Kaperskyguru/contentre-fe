import { gql } from 'graphql-tag'

export const CREATE_MEDIA = gql`
  mutation createMedia($input: CreateMediaInput!) {
    createMedia(input: $input) {
      id
      url
      title
      createdAt
    }
  }
`
