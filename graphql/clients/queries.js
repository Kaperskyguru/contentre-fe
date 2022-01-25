import { gql } from 'graphql-tag'
import { clientFragments } from '~/graphql/clients/fragments'

export const GET_CLIENTS = gql`
  query getClients($size: Int, $skip: Int, $filters: ClientFiltersInput) {
    getClients(size: $size, skip: $skip, filters: $filters) {
      ...client
    }
  }
  ${clientFragments.client}
`

export const GET_CLIENT = gql`
  query getClient($id: ID!) {
    getClient(id: $id) {
      ...client
    }
  }
  ${clientFragments.client}
`
