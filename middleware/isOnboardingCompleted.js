export default async ({ redirect, $getCurrentUser, $toast, route }) => {
  try {
    // Force load any logged in user first.
    const currentUser = await $getCurrentUser()

    // Allow access route only when user has finished onboarding flow.
    if (currentUser.hasFinishedOnboarding) return

    // Otherwise, check for which onboarding stop to redirect.
    // First of all, if the user has arrived through an invite.
    //   if ((currentUser.invitesReceived ?? []).length) {
    //     // Redirect to the right accept-invite step.
    //     if (!currentUser.phoneNumber) {
    //       return redirect('/accept-invite/add-phone')
    //     } else if (!currentUser.phoneConfirmed) {
    //       return redirect('/accept-invite/verify-phone')
    //     } else {
    //       return redirect('/accept-invite/completed')
    //     }
    //   }

    // Not an invited user, just go through the main onboarding flow.
    if (currentUser?.totalContents === 0 && route.hash === '#onboarding') {
      return redirect('/contents/add#upload')
    } else if (!currentUser.emailConfirmed) {
      return redirect(`/auth/verify-email?email=${currentUser.email}`)
    } else if (
      !currentUser.bio ||
      !currentUser.jobTitle ||
      !currentUser.homeAddress ||
      !currentUser.phoneNumber
    ) {
      return redirect('/profile#onboarding')

      // } else if (!currentUser.phoneConfirmed) {
      //   return redirect('/auth/verify-phone')
    }
  } catch (error) {
    $toast.message = error.message
  }
}
