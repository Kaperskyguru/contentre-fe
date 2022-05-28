<template>
  <div class="flex items-center bg-gray-50">
    <!--  -->
    <div
      class="
        flex
        justify-between
        items-center
        py-1
        px-2
        space-x-6
        bg-white
        rounded-lg
        border border-gray-200
      "
    >
      <div class="flex justify-between">
        <span class="pr-2">{{ selected.length }}</span>
        <span>selected</span>
      </div>
      <span class="inline-block relative">
        <button
          :disabled="isDisabled"
          class="
            text-2xl
            leading-10
            text-right text-gray-500
            disabled:opacity-75 disabled:cursor-not-allowed
          "
          @click.prevent="onDeleteBulk"
        >
          <DeleteIcon />
        </button>
      </span>

      <span class="inline-block relative">
        <button
          :disabled="isDisabled"
          class="
            text-2xl
            leading-10
            text-gray-500
            disabled:opacity-75 disabled:cursor-not-allowed
          "
          @click.prevent="toggleExport = !toggleExport"
        >
          <ExportIcon />
        </button>
        <!-- Export Dropdown -->
        <div
          class="
            absolute
            top-0
            left-0
            z-30
            pl-5
            mt-8
            -ml-2
            min-w-full
            text-sm text-gray-700
            bg-white
            rounded
            border border-gray-200
            shadow-md
          "
          :class="{ hidden: toggleExport }"
          x-transition:enter="transition ease duration-300 transform"
          x-transition:enter-start="opacity-0 translate-y-2"
          x-transition:enter-end="opacity-100 translate-y-0"
          x-transition:leave="transition ease duration-300 transform"
          x-transition:leave-start="opacity-100 translate-y-0"
          x-transition:leave-end="opacity-0 translate-y-4"
        >
          <div class="overflow-auto relative z-10 w-full bg-white rounded">
            <!-- Filtered Options -->
            <ul>
              <li class="m-2">CSV</li>
              <li class="m-2">PDF</li>
              <li class="m-2">XLSX</li>
            </ul>
          </div>
        </div>
      </span>

      <span class="inline-block relative">
        <button
          :disabled="isDisabled"
          class="
            text-2xl
            leading-10
            text-left text-gray-500
            disabled:opacity-75 disabled:cursor-not-allowed
          "
          @click.prevent="onBulkAddToPortfolio"
        >
          <BookmarkIcon />
        </button>
      </span>
      <span class="inline-block relative">
        <button
          :disabled="isDisabled"
          class="
            text-2xl
            leading-10
            text-left text-gray-500
            disabled:opacity-75 disabled:cursor-not-allowed
          "
        >
          <FavoriteIcon />
        </button>
      </span>
    </div>

    <Dialog
      v-model="isBulkDeleteContentVisible"
      primary-text="Confirm"
      secondary-text="Cancel"
      @answer="deleteBulkContent"
    >
      <template #icon>
        <IconInformationCircle class="w-20 h-20" />
      </template>
      <p>
        Are you sure you want to delete {{ selected.length }} content{{
          selected.length > 1 ? 's' : ''
        }}?
      </p>
    </Dialog>

    <Dialog
      v-model="isAddToPortfolioVisible"
      primary-text="Confirm"
      secondary-text="Cancel"
      @answer="addContentToPortfolio"
    >
      <div class="py-6">
        <p class="text-base text-gray-500">
          Add {{ selected.length }} content{{ selected.length > 1 ? 's' : '' }}
          to the selected portfolios
        </p>

        <div class="px-2 pt-3 my-4 space-y-6">
          <div
            v-for="portfolio in portfolios.items"
            :key="portfolio.id"
            class="flex"
          >
            <div class="justify-center w-full">
              <CheckField v-model="selectedPortfolio" :value="portfolio.id">
                <div>
                  <span class="block text-base">{{ portfolio.title }}</span>
                  <span class="block text-xs text-gray-500">{{
                    portfolio.description
                  }}</span>
                </div>
              </CheckField>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { DELETE_BULK_CONTENT, GET_PORTFOLIOS } from '~/graphql'
export default {
  components: {
    BookmarkIcon: () => import('~/assets/icons/bookmark.svg?inline'),
    DeleteIcon: () => import('~/assets/icons/delete.svg?inline'),
    FavoriteIcon: () => import('~/assets/icons/favourite.svg?inline'),
    ExportIcon: () => import('~/assets/icons/export.svg?inline'),
    IconInformationCircle: () =>
      import('~/assets/icons/information-circle.svg?inline')
  },
  props: {
    selected: {
      type: [Array, Object],
      default: () => []
    },
    checked: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    toggleExport: true,
    isBulkDeleteContentVisible: false,
    isAddToPortfolioVisible: false,
    selectedPortfolio: [],
    portfolios: {
      items: [],
      total: 0
    },
    option: {
      icon: ''
    }
  }),

  computed: {
    isDisabled() {
      return !this.selected.length > 0
    }
  },

  apollo: {
    portfolios: {
      query: GET_PORTFOLIOS,
      fetchPolicy: 'cache-and-network',
      update(data) {
        // const items = data.getPortfolios.filter((p) => p.code)

        return { items: data.getPortfolios, total: data.getPortfolios.length }
      },
      variables: {
        size: 10,
        skip: 0
      }
    }
  },

  methods: {
    addContentToPortfolio(answer) {
      if (!answer) return
      console.log('')
    },
    onDeleteBulk() {
      this.isBulkDeleteContentVisible = true
    },

    onBulkAddToPortfolio() {
      this.isAddToPortfolioVisible = true
    },

    async deleteBulkContent(answer) {
      if (!answer) return
      try {
        await this.$apollo.mutate({
          mutation: DELETE_BULK_CONTENT,
          refetchQueries: ['getContents'],
          variables: {
            input: {
              ids: this.selected
            }
          }
        })

        this.$emit('deleted')
        this.sending = false
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
      }
    }
  }
}
</script>

<style>
</style>