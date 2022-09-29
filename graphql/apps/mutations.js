import { gql } from 'graphql-tag'

export const CREATE_CONNECTED_APP = gql`
  mutation createConnectedApp($input: CreateAppInput!) {
    createConnectedApp(input: $input) {
      id
      name
      token
      secret
      createdAt
    }
  }
`

export const UPDATE_CONNECTED_APP = gql`
  mutation updateConnectedApp($id: ID!, $input: UpdateAppInput!) {
    updateConnectedApp(id: $id, input: $input) {
      id
      name
      token
      secret
      createdAt
      updatedAt
    }
  }
`
