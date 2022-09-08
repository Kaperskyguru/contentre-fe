export default async ({ route, store, redirect, $getCurrentUser, $toast }) => {
  try {
    // Force load any logged in user first.
    const currentUser = await $getCurrentUser()
    console.log(currentUser?.totalPortfolios)
    store.commit(
      'subscription/updateSubscription',
      currentUser.activeSubscription
    )
    store.commit(
      'subscription/updateTotalContents',
      currentUser?.totalContents ?? 0
    )
    store.commit(
      'subscription/updateTotalPortfolios',
      currentUser?.totalPortfolios ?? 0
    )

    // Allow access route only when user is logged in.
  } catch (error) {
    $toast.message = error.message
  }
}
