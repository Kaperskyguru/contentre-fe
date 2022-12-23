<template>
  <PageContent>
    <Card
      class="
        flex flex-col flex-wrap
        gap-2
        justify-between
        items-center
        py-4
        md:flex-row md:p-5
      "
    >
      <PageTitle>Clients</PageTitle>
      <div class="flex space-x-0 md:space-x-3">
        <Button @click.prevent="onAddClient">Add Client</Button>
        <Button
          v-if="checked.length"
          appearance="secondary"
          @click.prevent="onDeleteBulkClient"
          >Delete Client{{ checked.length > 1 ? 's' : '' }}</Button
        >
      </div>
    </Card>

    <Card
      class="
        flex flex-col flex-wrap
        gap-2
        justify-between
        items-center
        py-4
        md:flex-row md:p-5
      "
    >
      <ContentFilter :filter-columns="columns" @filters="onFilters" />

      <SearchField
        id="search"
        v-model="filters.terms"
        placeholder="Search by name..."
      />
    </Card>

    <Card class="min-h-96">
      <ClientOverview :checked.sync="checked" :filters="filters" />
    </Card>
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
  </PageContent>
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