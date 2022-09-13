import { gql } from 'graphql-tag'

export const GET_CONNECTED_APPS = gql`
  query getConnectedApps($size: Int, $skip: Int, $filters: AppFiltersInput) {
    getConnectedApps(size: $size, skip: $skip, filters: $filters) {
      apps {
        id
        name
        token
        secret
        slug
        isActivated
        app {
          name
          description
          icon
        }
        createdAt
        updatedAt
      }
      meta {
        total
      }
    }
  }
`

export const GET_APPS = gql`
  query getApps($size: Int, $skip: Int, $filters: AppFiltersInput) {
    getApps(size: $size, skip: $skip, filters: $filters) {
      apps {
        id
        name
        icon
        description
        createdAt
        updatedAt
      }
      meta {
        total
      }
    }
  }
`
// SLUG should be inside APP

export const GET_CONNECTED_APP = gql`
  query getConnectedApp($id: ID!) {
    getConnectedApp(id: $id) {
      id
      name
      token
      slug
      secret
      isActivated
      createdAt
      updatedAt
    }
  }
`
