import { gql } from 'graphql-tag'

export const GET_APPS = gql`
  query getApps($size: Int, $skip: Int, $filters: AppFiltersInput) {
    getApps(size: $size, skip: $skip, filters: $filters) {
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
// SLUG should be inside APP

export const GET_APP = gql`
  query getApp($id: ID!) {
    getApp(id: $id) {
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
