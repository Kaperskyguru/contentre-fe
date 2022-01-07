import { InMemoryCache } from '@apollo/client/core'
import { setContext } from 'apollo-link-context'
import { uidGenerator } from './utils'
export default (context) => {
  const headerLink = setContext((_, previousContext) => ({
    credentials: 'include',
    headers: {
      ...previousContext.headers,
      'x-from-path': window.location.href
    }
  }))

  return {
    cache: new InMemoryCache(),
    // typeDefs,
    // resolvers: {
    //   Mutation: {
    //     ...resolvers
    //   }
    // },
    httpEndpoint: context.env.API_URL,
    link: headerLink.concat(headerLink),
    connectToDevTools: context.env.NODE_ENV === 'development',
    httpLinkOptions: {
      headers: {
        'x-transaction-id': uidGenerator()
      }
    }
  }
}
