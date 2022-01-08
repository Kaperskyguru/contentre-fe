export default async ({ redirect, $getCurrentUser, $toast }) => {
  try {
    // Force load any logged in user first.
    const currentUser = await $getCurrentUser()

    // Allow access route only when email was not confirmed.
    if (!currentUser.emailConfirmed) return

    // Otherwise, if has finished the onboarding flow...
    // if (currentUser.hasFinishedOnboarding) {
    // Force redirect to home.
    return redirect('/')
    // } else {
    //   // Force redirect to next onboarding step.
    //   return redirect('/auth/signup/add-phone')
    // }
  } catch (error) {
    $toast.message = error.message
  }
}
