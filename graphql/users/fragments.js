import { gql } from 'graphql-tag'

export const userFragments = {
  user: gql`
    fragment user on User {
      id
      avatarURL
      email
      emailConfirmed
      name
      username
      country
      bio
      homeAddress
      portfolioURL
      subscriptionId
      activeSubscription {
        id
        name
        expiry
        updatedAt
        planId
        channel
        features {
          feature
          value
          id
        }
      }
      paying
      isTrial
      jobTitle
      isPremium
      hasFinishedOnboarding
      totalContents
      totalPortfolios
      totalUsersReferred
      lastActivityAt
      phoneNumber
      phoneConfirmed
      createdAt
      updatedAt
    }
  `
}
