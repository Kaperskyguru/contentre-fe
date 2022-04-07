<template>
  <section class="px-3 h-full md:px-12">
    <div class="flex justify-between items-center">
      <PageTitle>Content</PageTitle>
    </div>

    <section
      class="
        flex flex-col
        justify-between
        mb-6
        space-y-6 space-x-0
        md:flex-row md:space-y-0 md:space-x-5
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
        <FavouriteField :selected="checked" />
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