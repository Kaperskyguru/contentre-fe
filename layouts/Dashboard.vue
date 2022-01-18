<template>
  <main>
    <nav class="bg-white border-b border-gray-200 fixed z-30 w-full navside-bs">
      <Nav />
    </nav>
    <div class="flex pt-16">
      <Aside />
    </div>
    <Nuxt />
  </main>
</template>

<script>
export default {
  name: 'DashboardNav',

  // middleware: ['isAuthenticated', 'isEmailConfirmed']
}
</script>

<style>
</style>
