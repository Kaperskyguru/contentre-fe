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
      firstname
      lastname
      bio
      homeAddress
      portfolio
      subscriptionId
      subscription {
        id
        name
        expiry
        features {
          feature
          value
          id
        }
      }
      paying
      isTrial
      jobTitle
      hasFinishedOnboarding
      totalContents
      totalUsersReferred
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
