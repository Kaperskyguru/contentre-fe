<template>
  <PageContent>
    <Card
      class="flex flex-col gap-2 md:flex-row md:justify-between md:items-center"
    >
      <div class="w-full">
        <PageTitle>Tags</PageTitle>
      </div>
      <div class="flex-1">
        <div
          v-click-outside="onClickOutside"
          class="
            flex flex-col
            items-center
            space-y-4 space-x-0
            w-full
            md:flex-row md:space-y-0 md:space-x-4
          "
        >
          <Button class="w-full" @click.prevent="onAddTag">Add Tag</Button>
          <Button
            v-if="checked.length"
            class="w-full"
            appearance="secondary"
            @click.prevent="onDeleteBulkTag"
            >Delete Tag{{ checked.length > 1 ? 's' : '' }}</Button
          >
        </div>
      </div>
    </Card>

    <Card class="flex flex-row gap-2 justify-between items-center">
      <ContentFilter
        :remove="remove"
        :filter-columns="columns"
        @filters="onFilters"
      />

      <SearchField
        id="search"
        v-model="filters.terms"
        placeholder="Search by name..."
      />
    </Card>

    <Card class="h-full md:h-[750px]">
      <TagOverview :checked.sync="checked" :filters="filters" />
    </Card>

    <Dialog v-model="isConfirmModalVisible">
      <div class="block w-full text-gray-700 bg-white">
        <div class="flex justify-between w-full text-gray-700 bg-white">
          <AddTag @create:success="onAddTag" />
        </div>
      </div>
    </Dialog>

    <Dialog
      v-model="isBulkDeleteTagVisible"
      primary-text="Confirm"
      secondary-text="Cancel"
      @answer="deleteBulkTag"
    >
      <template #icon>
        <IconInformationCircle class="w-20 h-20" />
      </template>
      <p>
        Are you sure you want to delete {{ checked.length }} tag{{
          checked.length > 1 ? 's' : ''
        }}?
      </p>
    </Dialog>
  </PageContent>
</template>

<script>
import { DELETE_BULK_TAG } from '~/graphql'
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
    remove: ['client', 'category', 'topic', 'tag'],
    sending: false,
    isBulkDeleteTagVisible: false,
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
    onDeleteBulkTag() {
      this.isBulkDeleteTagVisible = true
    },
    async deleteBulkTag(answer) {
      if (!answer) return

      try {
        await this.$apollo.mutate({
          mutation: DELETE_BULK_TAG,
          refetchQueries: ['getTags'],
          variables: {
            input: {
              ids: this.checked
            }
          }
        })

        this.$emit('deleted')
        this.sending = false
        this.$toast.positive('Tags deleted successfully')
        this.checked = []
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
      }
    },
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