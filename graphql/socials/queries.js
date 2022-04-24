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
