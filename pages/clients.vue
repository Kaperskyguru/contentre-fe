<template>
  <section class="h-full lg:ml-64 px-3 md:px-12">
    <div class="flex items-center justify-between py-4">
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

    <section class="bg-white mt-8 container mx-auto px-4">
      <div class="-mx-4 sm:-mx-8 px-4 overflow-x-auto">
        <ClientTable />
      </div>
    </section>

    <Dialog v-model="isConfirmModalVisible">
      <div class="w-full block bg-white text-gray-700">
        <div class="flex justify-between w-full block bg-white text-gray-700">
          <AddClient @create:success="onAddClient" />
        </div>
      </div>
    </Dialog>
  </section>
</template>

<script>
export default {
  name: 'ClientTw',
  layout: 'Dashboard',

  data: () => ({
    isConfirmModalVisible: false
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