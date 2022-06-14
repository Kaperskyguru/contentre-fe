export default async ({ redirect, $getCurrentUser, $toast, route }) => {
  try {
    // Force load any logged in user first.
    const currentUser = await $getCurrentUser()

    // Allow access route only when user has not finished onboarding flow.
    if (currentUser?.totalContent === 0) {
      return redirect('/contents/add#upload')
    } else if (!currentUser?.hasFinishedOnboarding) {
      if (!currentUser?.emailConfirmed) {
        if (route.path === '/auth/verify-email') return

        return redirect(`/auth/verify-email?email=${currentUser?.email}`)
      } else if (
        !currentUser?.bio ||
        !currentUser?.jobTitle ||
        !currentUser?.address ||
        !currentUser?.phoneNumber
      ) {
        if (route.path === '/profile') return

        return redirect('/profile')
      } else if (!currentUser?.phoneNumber || !currentUser?.phoneConfirmed) {
        if (['/auth/add-phone', '/settings'].includes(route.path)) return

        return redirect('/settings')
      }
    }

    // Otherwise, force redirect to home.
    return redirect('/')
  } catch (error) {
    $toast.message = error.message
  }
}
