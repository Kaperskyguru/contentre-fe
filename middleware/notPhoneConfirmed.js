export default async ({ redirect, $getCurrentUser, $toast }) => {
  try {
    // Force load any logged in user first.
    const currentUser = await $getCurrentUser()

    // Allow access route only when phone was not confirmed.
    if (!currentUser.phoneConfirmed) return

    // Force redirect to home.
    return redirect('/')
  } catch (error) {
    $toast.message = error.message
  }
}
