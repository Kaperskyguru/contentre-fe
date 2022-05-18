import { gql } from 'graphql-tag'

export const CREATE_APP = gql`
  mutation createApp($input: CreateAppInput!) {
    createApp(input: $input) {
      id
      name
      token
      secret
      createdAt
    }
  }
`

export const UPDATE_APP = gql`
  mutation updateApp($id: ID!, $input: UpdateAppInput!) {
    updateApp(id: $id, input: $input) {
      id
      name
      token
      secret
      createdAt
      updatedAt
    }
  }
`
