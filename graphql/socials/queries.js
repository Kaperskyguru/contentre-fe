import { gql } from 'graphql-tag'

export const GET_SOCIALS = gql`
  query getSocials($size: Int, $skip: Int) {
    getSocials(size: $size, skip: $skip) {
      socials {
        id
        name
        icon
        link
        createdAt
      }
      meta {
        total
      }
    }
  }
`

export const GET_SOCIAL_BY_NAME = gql`
  query getSocialByName($name: String!) {
    getSocialByName(name: $name) {
      id
      name
      icon
      link
      createdAt
    }
  }
`
