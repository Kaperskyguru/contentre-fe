export default async ({ route, redirect, $getCurrentUser, $toast }) => {
  try {
    // Force load any logged in user first.
    const currentUser = await $getCurrentUser()

    // Allow access route only when user is logged in.
    if (currentUser) return

    // Otherwise, force redirect to sign in.
    return redirect({
      path: '/auth/login',
      query: { redirect: route.path }
    })
  } catch (error) {
    $toast.message = error.message
  }
}
