<template>
  <section class="px-3 h-full md:px-12">
    <div class="flex justify-between items-center py-4">
      <PageTitle>Categories</PageTitle>
    </div>

    <section
      class="
        flex flex-col
        justify-between
        mb-6
        space-y-6 space-x-6
        md:flex-row md:space-y-0
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
        <Button @click.prevent="onAddCategory">Add Category</Button>
      </div>
    </section>

    <section class="mt-5 h-screen bg-white">
      <div class="bg-white">
        <div class="container px-4 mx-auto">
          <div class="overflow-x-auto px-4 -mx-4 h-screen sm:-mx-8">
            <CategoryOverview :checked.sync="checked" :filters="filters" />
          </div>
        </div>
      </div>
    </section>

    <CategoryEdit
      v-model="isEditPanelVisible"
      :category-id="categoryId"
    ></CategoryEdit>
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
    isEditPanelVisible: false,
    checked: [],
    searchedTerm: '',
    filters: {},
    columns: [
      { name: 'Name', key: 'name' },
      { name: 'Total Contents', key: 'totalContents' },
      { name: 'Created', key: 'createdAt' },
      { name: 'Amount', key: 'amount' }
    ]
  }),

  methods: {
    onAddCategory() {
      this.isEditPanelVisible = !this.isEditPanelVisible
    }
  },

  onFilters(v) {
    this.filters = {
      ...this.filters,
      ...v
    }
  }
}
</script>

<style>
</style>