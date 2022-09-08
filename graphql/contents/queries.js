import { gql } from 'graphql-tag'
import { contentFragments } from './fragments'

export const GET_CONTENTS = gql`
  query getContents($size: Int, $skip: Int, $filters: ContentFiltersInput) {
    getContents(size: $size, skip: $skip, filters: $filters) {
      meta {
        total
        netTotal
      }
      contents {
        ...content
      }
    }
  }
  ${contentFragments.content}
`

export const GET_INDEX_METADATA = gql`
  query getIndexMetadata($filters: ContentFiltersInput) {
    getIndexMetadata(filters: $filters) {
      box {
        amountPercent
        amount
        totalContents
        amountPercentStat
        contentPercent
        clientPercent
        totalClients
        interactionPercent
        currentInteractions
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

export const GET_BOX_STATS = gql`
  query getBoxStats($filters: ContentFiltersInput) {
    getBoxStats(filters: $filters) {
      amountPercent
      amount
      totalContents
      amountPercentStat
      contentPercent
      clientPercent
      totalClients
      interactionPercent
      currentInteractions
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
