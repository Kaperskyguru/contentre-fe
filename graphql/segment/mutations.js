import { gql } from 'graphql-tag'

export const SEND_SEGMENT = gql`
  mutation sendSegment($input: SendSegmentInput!) {
    sendSegment(input: $input)
  }
`
