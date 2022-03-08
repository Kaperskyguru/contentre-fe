import { gql } from 'graphql-tag'
import { contentFragments } from './fragments'

export const GET_CONTENTS = gql`
  query getContents($size: Int, $skip: Int, $filters: ContentFiltersInput) {
    getContents(size: $size, skip: $skip, filters: $filters) {
      ...content
    }
  }
  ${contentFragments.content}
`

export const GET_INDEX_METADATA = gql`
  query getIndexMetadata($filters: ContentFiltersInput) {
    getIndexMetadata(filters: $filters) {
      box {
        likePercent
        commentPercent
        sharePercent
        amountPercent
        likes
        shares
        comments
      }
      revenue {
        months
        data {
          current
          last
        }
      }
    }
  }
`

export const GET_CONTENT = gql`
  query getContent($id: ID!) {
    getContent(id: $id) {
      ...content
    }
  }
  ${contentFragments.content}
`
