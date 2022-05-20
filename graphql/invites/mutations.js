import { gql } from 'graphql-tag'

export const INVITE_FRIENDS = gql`
  mutation inviteFriends($data: InviteFriendsInput!) {
    inviteFriends(data: $data)
  }
`
