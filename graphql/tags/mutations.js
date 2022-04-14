import { gql } from 'graphql-tag'

export const UPDATE_TAG = gql`
  mutation updateTag($id: ID!, $input: UpdateTagInput!) {
    updateTag(id: $id, input: $input) {
      id
      name
      totalAmount
      totalContents
      createdAt
    }
  }
`

export const CREATE_TAG = gql`
  mutation createTag($input: CreateTagInput!) {
    createTag(input: $input) {
      id
      name
      totalAmount
      totalContents
      createdAt
    }
  }
`

export const DELETE_TAG = gql`
  mutation deleteTag($id: ID!) {
    deleteTag(id: $id)
  }
`
