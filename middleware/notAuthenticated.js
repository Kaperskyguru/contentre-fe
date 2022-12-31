export default async ({ redirect, $getCurrentUser, $toast, route }) => {
  try {
    // Force load any logged in user first.
    const currentUser = await $getCurrentUser()

    // Allow access route only when no user logged in.
    if (!currentUser) return

    // Otherwise, force redirect to home.

    if (route.query.redirect)
      redirect({
        path: route.query.redirect,
        query: {
          source: route.query.source,
          tab: route.query.tab,
          plan: route.query.plan
        }
      })
    return redirect({ path: '/#onboarding', query: { ...route.query } })
  } catch (error) {
    $toast.message = error.message
  }
}
