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
        <Button
          appearance="primary"
          :is-pro-feature="hasExceededContent"
          :message="
            hasExceededContent ? 'You have exceeded this plan, upgrade now' : ''
          "
          @click.prevent="onAddContent"
        >
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

    <Dialog v-model="isAddContent">
      <div class="block w-full text-gray-700 bg-white">
        <div class="flex justify-between w-full text-gray-700 bg-white">
          <LazyAddContent @created="onCreateSuccess" />
        </div>
      </div>
      <div class="flex justify-center pt-5 text-xs font-bold text-btn-green">
        <Hyperlink to="#"> Or bulk import URLs </Hyperlink>
      </div>
    </Dialog>
  </section>
</template>

<script>
import { currentUser } from '~/components/mixins'
export default {
  name: 'ContentPage',
  mixins: [currentUser],
  layout: 'Dashboard',
  data: () => ({
    checked: [],
    searchedTerm: '',
    filters: {},
    isAddCategory: false,
    isAddContent: false,
    columns: [
      { name: 'Title', key: 'title' },
      { name: 'Client', key: 'client' },
      { name: 'Category', key: 'category' },
      { name: 'Visibility', key: 'visibility' },
      { name: 'Last Updated', key: 'lastUpdated' },
      { name: 'Amount', key: 'amount' }
    ]
  }),

  computed: {
    hasExceededContent() {
      const subValue = this.$utils.getFeatureValue(
        this.currentUser.subscription,
        'TOTAL_CONTENTS'
      )

      if (subValue === 0) return false
      return this.currentUser.totalContent <= subValue
    }
  },

  watch: {
    $route() {
      this.checked = []
    }
  },

  methods: {
    onAddContent() {
      this.isAddContent = true
    },
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