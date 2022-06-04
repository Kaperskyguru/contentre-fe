export default ({ route, redirect, $getCurrentUser, $toast }) => {
  try {
    // Force load any logged in user first.
    // Allow access route only when user is logged in.
  } catch (error) {
    $toast.message = error.message
  }
}
