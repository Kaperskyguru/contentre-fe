import { SEND_SEGMENT } from '~/graphql'

export default (context, inject) => {
  const apolloClient = context.app.apolloProvider.defaultClient
  const segment = async ({
    operation = 'track',
    data = null,
    eventName = undefined
  }) => {
    const currentUser = await context.$getCurrentUser()
    if (operation === 'identify' && !data) {
      data = {
        email: currentUser.email
      }
    }

    if (operation === 'track') {
      data = {
        ...(data || {}),
        email: currentUser?.email ?? null,
        teamId: currentUser?.activeTeam?.id ?? null
      }
    }
    if (process.env.DISABLE_SEGMENT) {
      // eslint-disable-next-line no-console
      console.info('segment', operation, {
        data,
        eventName,
        userId: currentUser?.id ?? null
      })
      return
    }
    await apolloClient.mutate({
      mutation: SEND_SEGMENT,
      variables: {
        input: {
          operation,
          data,
          eventName,
          userId: currentUser?.id ?? null
        }
      }
    })
  }

  inject('segment', segment)
}
