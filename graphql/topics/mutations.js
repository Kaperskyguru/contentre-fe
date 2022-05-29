import { gql } from 'graphql-tag'

export const CREATE_TOPIC = gql`
  mutation createTopic($input: CreateTopicInput!) {
    createTopic(input: $input) {
      id
      name
    }
  }
`

export const UPDATE_TOPIC = gql`
  mutation updateTopic($id: ID!, $input: UpdateTopicInput!) {
    updateTopic(id: $id, input: $input) {
      id
      name
    }
  }
`

export const DELETE_TOPIC = gql`
  mutation deleteTopic($id: ID!) {
    deleteTopic(id: $id)
  }
`

export const DELETE_BULK_TOPIC = gql`
  mutation deleteBulkTopic($input: DeleteBulkTopicInput!) {
    deleteBulkTopic(input: $input)
  }
`
