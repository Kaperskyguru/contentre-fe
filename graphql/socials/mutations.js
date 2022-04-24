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
