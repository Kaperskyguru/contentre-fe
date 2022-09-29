import { gql } from 'graphql-tag'

export const CREATE_SOCIAL = gql`
  mutation createSocial($input: CreateSocialInput!) {
    createSocial(input: $input) {
      id
      name
      icon
      link
      createdAt
    }
  }
`

export const UPDATE_SOCIAL = gql`
  mutation updateSocial($id: ID!, $input: UpdateSocialInput!) {
    updateSocial(id: $id, input: $input) {
      id
      name
      icon
      link
      createdAt
    }
  }
`
