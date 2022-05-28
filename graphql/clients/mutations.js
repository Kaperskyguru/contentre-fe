import { gql } from 'graphql-tag'
import { clientFragments } from '~/graphql/clients/fragments'

export const CREATE_CLIENT = gql`
  mutation createClient($input: CreateClientInput!) {
    createClient(input: $input) {
      ...client
    }
  }
  ${clientFragments.client}
`

export const UPDATE_CLIENT = gql`
  mutation updateClient($id: ID!, $input: UpdateClientInput!) {
    updateClient(id: $id, input: $input) {
      ...client
    }
  }
  ${clientFragments.client}
`

export const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id)
  }
`

export const DELETE_BULK_CLIENT = gql`
  mutation deleteBulkClient($input: DeleteBulkClientInput!) {
    deleteBulkClient(input: $input)
  }
`
