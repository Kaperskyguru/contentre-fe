<template>
  <section class="h-full lg:ml-64 px-3 md:px-12">
    <div class="flex items-center justify-between py-4">
      <h1 class="mx-2 text-xl font-bold text-gray-900 pt-4">Dashboard</h1>
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

    <!-- Chart -->

    <section class="pt-6">
      <div
        class="
          w-full
          grid grid-cols-1
          xl:grid-cols-2
          2xl:grid-cols-3
          gap-4
          md:grid-cols-2
          lg:grid-cols-2
          xl:grid-cols-3
        "
      >
        <!-- Chart 1 -->
        <Chart />

        <!-- Chart 2-->
        <Chart1 />
      </div>
    </section>

    <!-- Chart End -->

    <!-- table -->

    <section class="bg-white mt-8 container mx-auto px-4">
      <div class="-mx-4 sm:-mx-8 px-4 overflow-x-auto">
        <ClientTable />
      </div>
    </section>

    <!-- End of table -->
  </section>
</template>

<script>
export default {
  name: 'HomePage',

  layout: 'Dashboard'
}
</script>

<style>
</style>