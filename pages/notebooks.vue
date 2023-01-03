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