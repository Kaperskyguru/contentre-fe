<template>
  <!-- Main -->
  <section class="px-3 h-full md:px-12">
    <div class="flex justify-between items-center py-4">
      <!-- <h1 class="text-3xl font-bold text-gray-900">Profile</h1> -->
      <PageTitle>Profile</PageTitle>
    </div>

    <div class="container md:flex">
      <!-- Left Side -->
      <article class="w-full md:mx-2 md:w-4/12">
        <ProfileOverview />
      </article>
      <article class="w-full md:w-8/12">
        <!-- Right Side -->
        <ProfileDetails />
      </article>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ProfilePage',
  layout: 'Dashboard'
}
</script>

<style>
</style>