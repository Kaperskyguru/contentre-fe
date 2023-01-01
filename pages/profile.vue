<template>
  <PageContent>
    <Card>
      <div class="flex justify-between items-center">
        <PageTitle>Profile</PageTitle>
      </div>
    </Card>
    <div class="gap-2 md:flex">
      <!-- Left Side -->
      <article class="w-full md:w-4/12">
        <ProfileOverview />
      </article>
      <article class="w-full md:w-8/12">
        <!-- Right Side -->
        <ProfileDetails />
      </article>
    </div>
  </PageContent>
</template>

<script>
export default {
  name: 'ProfilePage',
  layout: 'Dashboard',
  head() {
    return {
      title: 'Profile'
    }
  }
}
</script>

<style>
</style>