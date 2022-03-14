<template>
  <section class="px-3 h-full md:px-12">
    <!-- TOP -->
    <section class="grid grid-cols-12 items-center py-4">
      <div class="flex col-span-2 py-4">
        <PageTitle>Content</PageTitle>
      </div>
      <div class="flex col-span-10">
        <div class="basis-1/2">
          <FavouriteField :selected="checked.length" />
        </div>
      </div>
    </section>

    <section
      class="
        justify-between
        mb-6
        md:flex-row md:space-y-0
        space-y-6 space-x-6
        flex flex-col
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
        <Button type="link" :to="{ name: 'contents/add' }" appearance="primary">
          Add Content
        </Button>
      </div>
    </section>

    <!-- table -->
    <section class="mt-5">
      <div class="bg-white">
        <div class="container px-4 mx-auto">
          <div class="overflow-x-auto px-4 -mx-4 h-screen sm:-mx-8">
            <Contents :checked.sync="checked" :filters="filters" />
          </div>
        </div>
      </div>
    </section>
    <!-- end of table -->

    <LazyCategoryEdit v-model="isAddCategory" @created="onCreateSuccess" />
  </section>
</template>

<script>
export default {
  name: 'ContentPage',
  layout: 'Dashboard',
  data: () => ({
    checked: [],
    searchedTerm: '',
    filters: {},
    isAddCategory: false,
    columns: [
      { name: 'Title', key: 'title' },
      { name: 'Client', key: 'client' },
      { name: 'Category', key: 'category' },
      { name: 'Visibility', key: 'visibility' },
      { name: 'Last Updated', key: 'lastUpdated' },
      { name: 'Amount', key: 'amount' }
    ]
  }),

  watch: {
    $route() {
      this.checked = []
    }
  },

  methods: {
    onAddCategory() {
      this.isAddCategory = true
    },
    onCreateSuccess() {
      this.$toast.positive('Category created successfully')
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