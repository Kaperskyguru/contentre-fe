<template>
  <section class="px-3 h-full md:px-12">
    <div class="flex justify-between items-center py-4">
      <PageTitle>Tags</PageTitle>
    </div>

    <section
      class="
        flex flex-col
        justify-between
        mb-6
        space-y-6 space-x-0
        md:flex-row md:space-y-0 md:space-x-6
      "
    >
      <div>
        <ContentFilter :filter-columns="columns" @filters="onFilters" />
      </div>

      <div class="basis-4/5">
        <SearchField
          id="search"
          v-model="filters.terms"
          placeholder="Search by name..."
        />
      </div>

      <div>
        <Button @click.prevent="onAddTag">Add Tag</Button>
      </div>
    </section>

    <section class="mt-5 h-screen bg-white">
      <div class="bg-white">
        <div class="container px-4 mx-auto">
          <div class="overflow-x-auto px-4 -mx-4 h-screen sm:-mx-8">
            <TagOverview :checked.sync="checked" :filters="filters" />
          </div>
        </div>
      </div>
    </section>

    <Dialog v-model="isConfirmModalVisible">
      <div class="block w-full text-gray-700 bg-white">
        <div class="flex justify-between w-full text-gray-700 bg-white">
          <AddTag @create:success="onAddTag" />
        </div>
      </div>
    </Dialog>
  </section>
</template>

<script>
// import fragment from 'vue-frag'
export default {
  name: 'TagS',
  // directives: {
  //   fragment
  // },

  layout: 'Dashboard',
  data: () => ({
    isConfirmModalVisible: false,
    checked: [],

    searchedTerm: '',
    filters: {},

    columns: [
      { name: 'Name', key: 'name' },
      { name: 'Total Contents', key: 'totalContents' },
      { name: 'Created', key: 'createdAt' },
      { name: 'Total Amount', key: 'amount' }
    ]
  }),
  head() {
    return {
      title: 'Tags'
    }
  },

  methods: {
    onAddTag() {
      this.isConfirmModalVisible = !this.isConfirmModalVisible
    },

    onFilters(v) {
      this.filters = {
        ...this.filters,
        ...v
      }
    }
  }
}
</script>

<style>
</style>