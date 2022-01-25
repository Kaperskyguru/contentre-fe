<template>
  <section class="h-full lg:ml-64 px-3 md:px-12">
    <div class="flex items-center justify-between py-4">
      <!-- <h1 class="mx-2 text-xl font-bold text-gray-900 pt-4">Analytics</h1> -->
      <PageTitle>Analytics</PageTitle>
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

    <!-- calender -->
    <section>
      <ContentFilter />
    </section>
    <!-- end of calender -->

    <!-- Charts -->
    <div class="pt-6">
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
        <Chart />

        <div class="w-full lg:px-2 my-20 bg-white rounded-lg pt-4 shadow-lg">
          <!-- Card -->
          <div class="overflow-hidden">
            <header class="leading-tight px-2">
              <span class="text-2xl sm:text-2xl font-bold text-gray-900"
                >Overall Performance</span
              >
              <h3 class="text-normal font-normal text-gray-500 pb-4">
                Weekly Posts
              </h3>
            </header>

            <div class="flex items-center justify-evenly">
              <div class="">
                <img
                  alt="Placeholder"
                  class="block h-auto w-full"
                  src="~/assets/img/graph2.png"
                />
              </div>

              <div class="relative">
                <div class="relative">
                  <span
                    class="
                      inline-block
                      relative
                      bg-teal-300
                      rounded-lg
                      dots
                      dot-color
                    "
                  ></span>
                  <span class="pl-1 dotfont"> Delivery: 70%</span>
                </div>

                <div class="relative">
                  <span
                    class="inline-block relative bg-teal-300 rounded-lg dots"
                  ></span>
                  <span class="pl-1 dotfont"> Engagement: 60%</span>
                </div>

                <div class="relative">
                  <span
                    class="
                      inline-block
                      relative
                      bg-teal-300
                      rounded-lg
                      dots
                      dotlast-color
                    "
                  ></span>
                  <span class="pl-1 dotfont"> Consistency: 65%</span>
                </div>
              </div>
            </div>
          </div>
          <!-- END Card -->
        </div>
      </div>
    </div>

    <!-- End of Charts -->

    <!-- table -->

    <!-- <div class="container mx-auto px-4">
      <div class="flex items-center justify-between py-4">
        <h1 class="text-xl font-bold text-gray-900 pt-4">Overall Stats</h1>
      </div>

      <section class="bg-white mt-8 container mx-auto px-4">
        <div class="-mx-4 sm:-mx-8 px-4 overflow-x-auto">
          <ClientTable />
        </div>
      </section>
    </div> -->

    <section class="container mx-auto mt-4">
      <OverallStatTable />
    </section>
    <!-- end of table -->

    <!-- footer Articles -->
    <section class="container mx-auto">
      <div class="flex items-center justify-between py-4">
        <h1 class="text-3xl font-bold text-gray-900 pt-4">Top Articles</h1>
      </div>
      <div class="flex flex-wrap">
        <Column />

        <Column />

        <Column />
      </div>
    </section>
    <!-- end of footer Articles -->
  </section>
</template>

<script>
import Rocket from '~/assets/icons/rocket.svg'
import Show from '~/assets/icons/show.svg'
import Heart from '~/assets/icons/heart.svg'
import Chat from '~/assets/icons/chat.svg'
export default {
  name: 'AnalyticPage',
  layout: 'Dashboard',

  data: () => ({
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