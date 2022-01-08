export default async ({ redirect, $getCurrentUser, $toast }) => {
  try {
    // Force load any logged in user first.
    const currentUser = await $getCurrentUser()

    await this.$logoutUser()

    // Allow access route only when no user logged in.
    if (!currentUser) return

    // Otherwise, force redirect to home.
    return redirect('/')
  } catch (error) {
    $toast.message = error.message
  }
}
