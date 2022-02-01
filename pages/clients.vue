<template>
  <section class="px-3 h-full md:px-12 lg:ml-64">
    <div class="flex justify-between items-center py-4">
      <PageTitle>Clients</PageTitle>

      <Button @click.prevent="onAddClient">Add Client</Button>
    </div>

    <!-- calender -->
    <section>
      <ContentFilter />
    </section>
    <!-- end of calender -->

    <!-- statistics -->

    <!-- ====== Cards Section Start -->
    <section class="pt-6 pb-2">
      <BarCharts />
    </section>
    <!-- ====== Cards Section End -->
    <!-- end of statistic -->

    <section
      class="
        container
        overflow-y-auto
        flex-1
        shrink-0
        px-4
        mx-auto
        mt-8
        min-h-80vh
        bg-white
        md:shrink
      "
    >
      <div class="overflow-y-auto px-4 -mx-4 sm:-mx-8">
        <ClientTable :checked.sync="checked" />
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
import fragment from 'vue-frag'
export default {
  name: 'ClientTw',
  directives: {
    fragment
  },

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