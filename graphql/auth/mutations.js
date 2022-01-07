import { gql } from 'graphql-tag'
import { userFragments } from '~/graphql/users/fragments'

export const CHANGE_PASSWORD = gql`
  mutation changePassword($oldPassword: String!, $newPassword: String!) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      ...user
    }
  }
  ${userFragments.user}
`

// export const CREATE_PASSWORD = gql`
//   mutation createPassword($password: String!) {
//     createPassword(password: $password) {
//       ...user
//       ...userRelations
//     }
//   }
//   ${userFragments.user}
//   ${userFragments.userRelations}
// `

export const LOGIN_USER = gql`
  mutation loginUser($input: LoginUserInput!) {
    loginUser(data: $input) {
      ...user
    }
  }
  ${userFragments.user}
`

export const LOGOUT_USER = gql`
  mutation logoutUser {
    logoutUser
  }
`

export const RESET_PASSWORD = gql`
  mutation resetPassword($newPassword: String!) {
    resetPassword(newPassword: $newPassword) {
      ...user
    }
  }
  ${userFragments.user}
`

export const SEND_EMAIL_CODE = gql`
  mutation sendEmailCode($email: String!) {
    sendEmailCode(email: $email)
  }
`

export const SEND_PASSWORD_RESET_CODE = gql`
  mutation sendPasswordResetCode($email: String!) {
    sendPasswordResetCode(email: $email)
  }
`

export const SEND_PHONE_CODE = gql`
  mutation sendPhoneCode($phoneCode: String!, $phoneNumber: String!) {
    sendPhoneCode(phoneCode: $phoneCode, phoneNumber: $phoneNumber)
  }
`

export const USE_EMAIL_CODE = gql`
  mutation useEmailCode($code: String!) {
    useEmailCode(code: $code) {
      ...user
    }
  }
  ${userFragments.user}
`

export const USE_PASSWORD_RESET_CODE = gql`
  mutation usePasswordResetCode($code: String!, $email: String!) {
    usePasswordResetCode(code: $code, email: $email) {
      ...user
    }
  }
  ${userFragments.user}
`

export const USE_PHONE_CODE = gql`
  mutation usePhoneCode($code: String!) {
    usePhoneCode(code: $code) {
      id
      phoneConfirmed
    }
  }
`

export const VERIFY_USERNAME = gql`
  mutation verifyUsername($username: String!) {
    verifyUsername(username: $username)
  }
`
