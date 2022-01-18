<template>
  <!-- Main -->
  <section class="h-full lg:ml-64 px-3 md:px-12">
    <div class="flex items-center justify-between py-4">
      <!-- <h1 class="text-3xl font-bold text-gray-900">Profile</h1> -->
      <PageTitle>Profile</PageTitle>
    </div>

    <div class="container mx-auto mx-5 md:flex no-wrap md:-mx-2">
      <!-- Left Side -->
      <article class="w-full md:w-4/12 md:mx-2">
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