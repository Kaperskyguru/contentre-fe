<template>
  <section class="px-3 h-full md:px-12">
    <div class="flex justify-between items-center py-4">
      <PageTitle>Clients</PageTitle>
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

      <div class="flex space-x-0 md:space-x-3">
        <Button @click.prevent="onAddClient">Add Client</Button>
        <Button
          v-if="checked.length"
          appearance="secondary"
          @click.prevent="onDeleteBulkClient"
          >Delete Client{{ checked.length > 1 ? 's' : '' }}</Button
        >
      </div>
    </section>

    <section class="mt-5 h-screen bg-white">
      <div class="bg-white">
        <div class="container px-4 mx-auto">
          <div class="overflow-x-auto px-4 -mx-4 h-screen sm:-mx-8">
            <ClientOverview :checked.sync="checked" :filters="filters" />
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

    <Dialog
      v-model="isBulkDeleteClientVisible"
      primary-text="Confirm"
      secondary-text="Cancel"
      @answer="deleteBulkClient"
    >
      <template #icon>
        <IconInformationCircle class="w-20 h-20" />
      </template>
      <p>
        Are you sure you want to delete {{ checked.length }} client{{
          checked.length > 1 ? 's' : ''
        }}?
      </p>
    </Dialog>
  </section>
</template>

<script>
import { DELETE_BULK_CLIENT } from '~/graphql'
// import fragment from 'vue-frag'
export default {
  name: 'ClientTw',
  // directives: {
  //   fragment
  // },

  components: {
    IconInformationCircle: () =>
      import('~/assets/icons/information-circle.svg?inline')
  },

  layout: 'Dashboard',
  data: () => ({
    isConfirmModalVisible: false,
    isBulkDeleteClientVisible: false,
    checked: [],

    searchedTerm: '',
    filters: {},

    columns: [
      { name: 'Name', key: 'name' },
      { name: 'Payment', key: 'payment' },
      { name: 'Total Contents', key: 'totalContents' },
      { name: 'Created', key: 'createdAt' },
      { name: 'Amount', key: 'amount' },
      { name: 'Status', key: 'status' }
    ]
  }),
  head() {
    return {
      title: 'Clients'
    }
  },

  methods: {
    onAddClient() {
      this.isConfirmModalVisible = !this.isConfirmModalVisible
    },

    onDeleteBulkClient() {
      this.isBulkDeleteClientVisible = true
    },
    async deleteBulkClient(answer) {
      if (!answer) return
      try {
        await this.$apollo.mutate({
          mutation: DELETE_BULK_CLIENT,
          refetchQueries: ['getClients'],
          variables: {
            input: {
              ids: this.checked
            }
          }
        })

        this.$emit('deleted')
        this.sending = false
        this.$toast.positive('Clients deleted successfully')
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
      }
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