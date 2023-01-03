<!-- eslint-disable vue/no-v-html  -->
<template>
  <section>
    <PageContent>
      <Card class="flex flex-row gap-2 justify-between items-center">
        <PageTitle>Notebooks</PageTitle>

        <div
          class="
            flex flex-col
            space-y-3 space-x-0
            md:flex-row md:space-y-0 md:space-x-3
          "
        >
          <Button appearance="outline" @click.prevent="onSwitchNotebook"
            >View Notebooks</Button
          >
          <Button @click.prevent="onAddNotebook">Create Notebook</Button>
        </div>
      </Card>

      <Card class="flex flex-row gap-2 justify-between items-center">
        <ContentFilter
          :remove="remove"
          :filter-columns="columns"
          @filters="onFilters"
        >
          <div class="mb-6">
            <DropdownField
              placeholder="Select a notebook"
              :items="notebooks.items"
              label="Notebooks"
              @update:value="onNotebookFilter"
            />
          </div>
        </ContentFilter>

        <SearchField
          id="search"
          v-model="filters.terms"
          placeholder="Search by name..."
        />
      </Card>

      <Card>
        <div class="grid grid-cols-1 gap-4 px-5 w-full md:grid-cols-12 lg:px-0">
          <div
            class="
              col-span-12
              p-4
              bg-[#286963]
              rounded-lg
              lg:col-span-4 lg:mr-6
            "
          >
            <div class="flex justify-between items-center w-full">
              <p class="text-sm font-semibold text-white">SCRATCH PAD</p>
              <div>
                <button @click.prevent="onOpenScratchMenu">
                  <img
                    src="https://raw.githubusercontent.com/Succyvibe/example_portfolio/main/img/dots.png"
                    alt=""
                    class="w-[20px]"
                  />
                </button>
                <!-- <div
                v-if="scratchMenu"
                x-transition:enter="transition ease-out duration-100"
                x-transition:enter-start="transform opacity-0 scale-95"
                x-transition:enter-end="transform opacity-100 scale-100"
                x-transition:leave="transition ease-in duration-75"
                x-transition:leave-start="transform opacity-100 scale-100"
                x-transition:leave-end="transform opacity-0 scale-95"
                class="
                  absolute
                  top-auto
                  z-40
                  py-3
                  px-5
                  mt-2
                  w-60
                  bg-white
                  dark:bg-gray-800
                  rounded-lg
                  border
                  dark:border-transparent
                  shadow
                "
              >
                <ul class="space-y-3 dark:text-white">
                  <li class="font-medium hover:bg-gray-100">
                    <Hyperlink
                      :to="{
                        path: `/contents/add?type=note`
                      }"
                    >
                      <button
                        class="flex items-center transition-colors duration-200"
                      >
                        Convert to content
                      </button>
                    </Hyperlink>
                  </li>
                  <hr class="dark:border-gray-700" />
                  <li class="font-medium hover:bg-gray-100">
                    <button
                      class="flex items-center transition-colors duration-200"
                      @click.prevent="content = ''"
                    >
                      Clear scratch card
                    </button>
                  </li>
                </ul>
              </div> -->
              </div>
            </div>
            <textarea
              id=""
              v-model="scratchContent"
              name=""
              cols="30"
              rows="10"
              class="
                mt-2
                w-full
                font-gilroy
                text-lg text-white
                bg-transparent
                outline-none
              "
              placeholder="Start writing"
            ></textarea>
          </div>
        </div>
      </Card>

      <Card>
        <UserNotes :notebooks="notebooks" :notes="notes" />
      </Card>

      <ViewNotebook v-model="isSwitchModalVisible" />
      <NotebookEdit v-model="isConfirmModalVisible" />
      <!-- </section> -->
    </PageContent>
  </section>
</template>

<script>
import { GET_NOTEBOOKS, GET_NOTES } from '~/graphql'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Notebooks',

  layout: 'Dashboard',
  data: () => ({
    updatedNoteId: null,
    filters: {},
    content: '',
    filteredNotebookId: null,
    scratchContent: null,
    scratchMenu: false,
    isConfirmModalVisible: false,
    isSwitchModalVisible: false,
    remove: ['client', 'category', 'topic', 'tag', 'amount'],
    columns: [
      { name: 'Title', key: 'title' },
      { name: 'Created', key: 'createdAt' }
    ],
    notes: {
      items: [],
      total: 0
    },
    notebooks: {
      items: [],
      total: 0
    }
  }),

  head() {
    return {
      title: 'Notebooks'
    }
  },

  mounted() {},

  methods: {
    updateScratch(content) {
      console.log('hello', content)
    },

    onNotebookFilter(v) {
      this.filteredNotebookId = v
      this.filters = {
        ...this.filters,
        notebookId: v
      }
    },

    onFilters(v) {
      this.filters = {
        ...this.filters,
        ...v,
        notebookId: this.filteredNotebookId
      }
    },
    onAddNotebook(id) {
      this.updatedNoteId = id
      this.isConfirmModalVisible = !this.isConfirmModalVisible
    },
    onSwitchNotebook() {
      this.isSwitchModalVisible = !this.isSwitchModalVisible
    }
  },

  apollo: {
    notes: {
      query: GET_NOTES,
      fetchPolicy: 'cache-and-network',
      update(data) {
        return { items: data.getNotes.notes, total: data.getNotes.meta.total }
      },
      variables() {
        return {
          size: 30,
          skip: 0,
          filters: { ...this.filters }
        }
      }
    },

    notebooks: {
      query: GET_NOTEBOOKS,
      fetchPolicy: 'cache-and-network',
      update(data) {
        return {
          items: data.getNotebooks.notebooks,
          total: data.getNotebooks.meta.total
        }
      }
    }
  }
}
</script>

<style>
</style>