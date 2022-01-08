import { gql } from 'graphql-tag'
// import { companyFragments } from '~/graphql/companies/fragments'

export const userFragments = {
  user: gql`
    fragment user on User {
      id
      avatarURL
      email
      emailConfirmed
      name
      username
      lastActivityAt
      phoneNumber
      phoneConfirmed
      createdAt
      updatedAt
    }
  `

  //   userRelations: gql`
  //     fragment userRelations on User {
  //       activeRole
  //       activeCompany {
  //         ...activeCompany
  //       }
  //       invitesReceived {
  //         ...inviteReceived
  //       }
  //     }
  //     ${companyFragments.activeCompany}
  //   `
}
