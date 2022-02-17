<template>
  <section class="px-3 h-full md:px-12">
    <div class="flex justify-between items-center py-4">
      <PageTitle>Dashboard</PageTitle>
    </div>
    <section class="container mx-auto">
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <!-- Stat box 1 -->
        <StatBox
          v-for="(stat, key) in stats"
          :key="`stat-${key}`"
          :stat="stat"
        />
      </div>
    </section>

    <!-- Chart -->

    <section class="pt-6">
      <div
        class="
          gap-4
          w-full
          md:grid-cols-2
          lg:grid-cols-2
          xl:grid-cols-3
          2xl:grid-cols-3
          grid grid-cols-1
        "
      >
        <!-- Chart 1 -->
        <div class="p-4 bg-white rounded-lg shadow sm:p-6 md:col-span-2 xl:p-8">
          <Chart />
        </div>
        <!-- Chart 2-->
        <div class="p-2 bg-white rounded-lg shadow sm:p-3 xl:p-5">
          <Chart1 />
        </div>
      </div>
    </section>

    <!-- Chart End -->

    <!-- table -->

    <section class="container px-4 mx-auto mt-8 bg-white">
      <ClientOverview :checked.sync="checked" />
    </section>

    <!-- End of table -->
  </section>
</template>

<script>
import Rocket from '~/assets/icons/rocket.svg'
import Show from '~/assets/icons/show.svg'
import Heart from '~/assets/icons/heart.svg'
import Chat from '~/assets/icons/chat.svg'
export default {
  name: 'HomePage',
  layout: 'Dashboard',
  data: () => ({
    checked: [],
    stats: [
      {
        text: 'Avg. Click Rate',
        value: '56.8%',
        increment: '19.3%',
        icon: Rocket
      },
      {
        text: 'Page Views',
        value: '56.8%',
        increment: '19.3%',
        icon: Show
      },
      {
        text: 'Total Likes',
        value: '56.8%',
        increment: '19.3%',
        icon: Heart
      },
      {
        text: 'Total Comments',
        value: '56.8%',
        increment: '19.3%',
        icon: Chat
      }
    ]
  })
}
</script>

<style>
</style>
