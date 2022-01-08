export default async ({ route, redirect, $getCurrentUser, $toast }) => {
  try {
    // Force load any logged in user first.
    const currentUser = await $getCurrentUser()

    // Allow access route only when email was confirmed.
    if (currentUser.emailConfirmed) return

    // Force 2FA email verification.
    return redirect({
      path: '/auth/forgot-password/verify-email',
      query: { redirect: route.path }
    })
  } catch (error) {
    $toast.message = error.message
  }
}
