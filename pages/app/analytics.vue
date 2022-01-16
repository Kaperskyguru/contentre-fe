<template>
  <section class="h-full lg:ml-64 px-3 md:px-12">
    <div class="flex items-center justify-between py-4">
      <h1 class="mx-2 text-xl font-bold text-gray-900 pt-4">Analytics</h1>
    </div>
    <section class="container mx-auto">
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <!-- Stat box 1 -->
        <StatBox />
        <StatBox />
        <StatBox />
        <StatBox />
      </div>
    </section>

    <!-- table -->

    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between py-4">
        <h1 class="text-xl font-bold text-gray-900 pt-4">Overall Stats</h1>
      </div>

      <section class="bg-white mt-8 container mx-auto px-4">
        <div class="-mx-4 sm:-mx-8 px-4 overflow-x-auto">
          <ClientTable />
        </div>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AnalyticPage',
  layout: 'Dashboard'
}
</script>

<style>
</style>