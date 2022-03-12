<template>
  <section class="px-3 h-full md:px-12">
    <div class="flex justify-between items-center py-4">
      <PageTitle>Categories</PageTitle>

      <Button @click.prevent="onAddClient">Add Category</Button>
    </div>

    <!-- calender -->
    <!-- <section>
      <ContentFilter />
    </section> -->
    <!-- end of calender -->

    <!-- statistics -->

    <!-- ====== Cards Section Start -->
    <!-- <section class="pt-6 pb-2">
      <BarCharts />
    </section> -->
    <!-- ====== Cards Section End -->
    <!-- end of statistic -->

    <section
      class="flex flex-col justify-between space-y-6 md:flex-row md:space-y-0"
    >
      <Filters :columns="[]" @filters="onFilters" />
    </section>

    <section class="mt-5 h-screen bg-white">
      <div class="bg-white">
        <div class="container px-4 mx-auto">
          <div class="overflow-x-auto px-4 -mx-4 h-screen sm:-mx-8">
            <CategoryOverview :checked.sync="checked" />
          </div>
        </div>
      </div>
    </section>

    <Dialog v-model="isConfirmModalVisible">
      <div class="block w-full text-gray-700 bg-white">
        <div class="flex justify-between w-full text-gray-700 bg-white">
          <AddClient @create:success="onAddClient" />
        </div>
      </div>
    </Dialog>
  </section>
</template>

<script>
// import fragment from 'vue-frag'
export default {
  name: 'CategoryTw',
  // directives: {
  //   fragment
  // },

  layout: 'Dashboard',
  data: () => ({
    isConfirmModalVisible: false,
    checked: []
  }),

  methods: {
    onAddClient() {
      this.isConfirmModalVisible = !this.isConfirmModalVisible
    }
  }
}
</script>

<style>
</style>