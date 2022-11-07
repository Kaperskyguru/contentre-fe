<template>
  <div class="grid grid-cols-1 gap-4 w-full h-full md:grid-cols-12 lg:px-0">
    <div class="col-span-12 p-4 w-full lg:col-span-12">
      <div class="justify-between items-center my-8 md:flex">
        <div>
          <h1 class="text-2xl font-semibold">Portfolios</h1>
          <p>
            Create multiple personalized portfolio for each client, category,
            tag, or niche
          </p>
        </div>
      </div>

      <section class="mb-2">
        <div class="">
          <div class="p-4 mt-5 bg-gray-100 rounded-xl">
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-2">
                <img src="~/assets/img/document-text.png" alt="" />
                <a href="#" class="text-lg font-semibold">All Portfolios</a>
              </div>
            </div>

            <ul class="flex overflow-x-scroll py-3 list-none no-scrollbar">
              <AddNew @add="onAddPortfolio" />
              <UserPortfolio
                v-for="(portfolio, i) in portfolios.items"
                :key="i"
                :portfolio="portfolio"
                @edit="onEditPortfolio"
                @delete="onDeletePortfolio"
              />
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    portfolios: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    onAddPortfolio() {
      this.$emit('create')
    },

    onEditPortfolio(id) {
      this.$emit('edit', id)
    },
    onDeletePortfolio(id) {
      this.$emit('delete', id)
    },

    formatDate(date) {
      if (!date) return ''
      return this.$d(new Date(date), 'monthYearShort')
    }
  }
}
</script>

<style>
</style>