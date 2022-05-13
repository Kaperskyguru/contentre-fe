import { gql } from 'graphql-tag'

export const GET_MEDIAS = gql`
  query getMedias($size: Int, $skip: Int, $filters: MediaFiltersInput) {
    getMedias(size: $size, skip: $skip, filters: $filters) {
      media {
        id
        title
        url
        createdAt
      }
      meta {
        total
      }
    }
  }
`
