<!-- eslint-disable vue/no-v-html  -->
<template>
  <section class="px-3 h-full md:px-12">
    <div class="flex justify-between items-center py-4">
      <PageTitle>Notebooks</PageTitle>
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
        <ContentFilter
          :remove="remove"
          :filter-columns="columns"
          @filters="onFilters"
        >
          <div class="mb-6">
            <DropdownField
              :items="notebooks.items"
              label="Notebooks"
              @update:value="onNotebookFilter"
            />
          </div>
        </ContentFilter>
      </div>

      <!-- <div class="basis-4/5">
        <SearchField
          id="search"
          v-model="filters.terms"
          placeholder="Search by name..."
        />
      </div> -->

      <div class="flex space-x-0 md:space-x-3">
        <Button appearance="outline" @click.prevent="onSwitchNotebook"
          >View Notebooks</Button
        >
        <Button @click.prevent="onAddNotebook">Create Notebook</Button>
      </div>
    </section>

    <section class="mt-5">
      <div
        class="grid grid-cols-1 gap-4 px-5 w-full h-60 md:grid-cols-12 lg:px-0"
      >
        <div
          class="
            col-span-12
            p-4
            mb-5
            bg-[#286963]
            rounded-lg
            lg:col-span-4 lg:mr-6
          "
        >
          <div class="flex justify-between items-center">
            <p class="text-sm font-semibold text-white">SCRATCH PAD</p>
            <a href="#">
              <img
                src="https://raw.githubusercontent.com/Succyvibe/example_portfolio/main/img/dots.png"
                alt=""
                class="w-[20px]"
            /></a>
          </div>
          <textarea
            id=""
            name=""
            cols="30"
            rows="10"
            class="mt-2 w-full text-sm bg-transparent outline-none"
            placeholder="Start writing"
          ></textarea>
        </div>
        <div
          class="col-span-12 p-4 bg-white rounded-lg shadow-lg lg:col-span-12"
        >
          <div class="flex justify-between">
            <div>
              <div class="mb-5">
                <a href="#">
                  <p class="text-[14px] font-semibold">
                    NOTES
                    <span
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        style="fill: rgba(0, 0, 0, 1); transform: ; msfilter: "
                      >
                        <path
                          d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"
                        ></path>
                      </svg>
                    </span>
                  </p>
                </a>
              </div>
              <!-- <div>
                <ul class="flex text-sm">
                  <li>
                    <a
                      href=""
                      class="text-[#102A27] border-b-2 border-[#102A27]"
                      >Recent</a
                    >
                  </li>
                </ul>
              </div> -->
            </div>
            <div>
              <div class="flex items-center">
                <a href="#" class="flex items-center">
                  <i class="text-2xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      style="fill: rgba(0, 0, 0, 1); transform: ; msfilter: "
                    >
                      <path
                        d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"
                      ></path>
                      <path
                        d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"
                      ></path>
                    </svg>
                  </i>
                </a>
                <a href="#" class="flex items-center ml-4">
                  <img
                    src="https://raw.githubusercontent.com/Succyvibe/example_portfolio/main/img/dots.png"
                    alt=""
                    class="mt-1 w-[20px]"
                  />
                </a>
              </div>
            </div>
          </div>

          <div class="overflow-hidden w-full">
            <div class="flex overflow-x-auto gap-1 mt-4 w-full">
              <div
                v-for="(item, index) in notes.items"
                :key="index"
                class="
                  p-3
                  min-w-[10.72rem]
                  h-[16.125rem]
                  bg-white
                  hover:bg-gray-100
                  rounded-lg
                  border-2
                  cursor-pointer
                "
              >
                <div class="flex relative justify-end">
                  <img
                    src="https://raw.githubusercontent.com/Succyvibe/example_portfolio/main/img/dots.png"
                    alt=""
                    class="w-[20px]"
                    @click="onOpenSubMenu(item.id)"
                  />
                  <div
                    v-if="menu && activeMenu === item.id"
                    x-transition:enter="transition ease-out duration-100"
                    x-transition:enter-start="transform opacity-0 scale-95"
                    x-transition:enter-end="transform opacity-100 scale-100"
                    x-transition:leave="transition ease-in duration-75"
                    x-transition:leave-start="transform opacity-100 scale-100"
                    x-transition:leave-end="transform opacity-0 scale-95"
                    class="
                      absolute
                      top-auto
                      right-0
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
                        <button
                          class="
                            flex
                            items-center
                            transition-colors
                            duration-200
                          "
                          @click.prevent="onAddToNotebook(item.id)"
                        >
                          Add to Notebook
                        </button>
                      </li>
                      <li class="font-medium hover:bg-gray-100">
                        <button
                          class="
                            flex
                            items-center
                            transition-colors
                            duration-200
                          "
                        >
                          Share note
                        </button>
                      </li>
                      <hr class="dark:border-gray-700" />
                      <li class="font-medium hover:bg-gray-100">
                        <Hyperlink
                          :to="{ path: `/contents/${item.id}/publish` }"
                        >
                          <button
                            class="
                              flex
                              items-center
                              transition-colors
                              duration-200
                            "
                          >
                            Convert to content
                          </button>
                        </Hyperlink>
                      </li>
                      <li class="font-medium hover:bg-gray-100">
                        <button
                          class="
                            flex
                            items-center
                            transition-colors
                            duration-200
                          "
                        >
                          Convert to brief
                        </button>
                      </li>
                      <li class="font-medium hover:bg-gray-100">
                        <button
                          href="#"
                          class="
                            flex
                            items-center
                            transition-colors
                            duration-200
                          "
                        >
                          Convert to task
                        </button>
                      </li>
                      <hr class="dark:border-gray-700" />
                      <li class="font-medium hover:bg-gray-100">
                        <button
                          href="#"
                          class="
                            flex
                            items-center
                            transition-colors
                            duration-200
                          "
                          @click.prevent="onDeleteNote(item.id)"
                        >
                          Delete note
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <Hyperlink :to="{ path: `/contents/${item.id}` }">
                  <div class="flex flex-col justify-between w-full h-full">
                    <div>
                      <h3 class="text-lg font-bold">{{ item.title }}</h3>
                      <article
                        class="mt-3 text-sm"
                        v-html="item.content"
                      ></article>
                    </div>
                    <div class="text-sm">
                      {{ $d(new Date(item.updatedAt), 'monthDayShortLong') }}
                    </div>
                  </div>
                </Hyperlink>
              </div>

              <div
                class="
                  flex
                  justify-center
                  items-center
                  min-w-[10.72rem]
                  h-[16.125rem]
                  bg-gray-100
                  rounded-lg
                  border-2
                "
              >
                <a href="">
                  <div
                    class="
                      flex flex-col
                      justify-center
                      items-center
                      w-full
                      h-full
                    "
                  >
                    <div
                      class="
                        flex
                        justify-center
                        items-center
                        w-[3.125rem]
                        h-[3.125rem]
                        bg-[#286963]
                        rounded-full
                      "
                    >
                      <i class="text-2xl text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          style="fill: white; transform: ; msfilter: "
                        >
                          <path
                            d="M6.012 18H21V4c0-1.103-.897-2-2-2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.988 5 19.806 5 19s.55-.988 1.012-1zM8 9h3V6h2v3h3v2h-3v3h-2v-3H8V9z"
                          ></path>
                        </svg>
                      </i>
                    </div>
                    <p class="text-[14px] font-semibold">Create new note</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Dialog
      v-model="isDeleteModalVisible"
      primary-text="Confirm"
      secondary-text="Cancel"
      @answer="deleteNote"
    >
      <template #icon>
        <IconInformationCircle class="w-20 h-20" />
      </template>
      <p>Are you sure you want to delete your note?</p>
    </Dialog>

    <Dialog
      v-model="isAddToNotebookModalVisible"
      :is-large="true"
      title="Add to Notebook"
      @answer="deleteNote"
    >
      <div class="block w-full text-gray-700 bg-white">
        <div class="flex justify-between w-full text-gray-700 bg-white">
          <form class="w-full" @submit.prevent="addToNotebook">
            <div class="mb-6">
              <DropdownField
                v-model="$v.fieldName.$model"
                type="text"
                :items="notebooks.items"
                class="w-full text-sm"
                label="Notebook Name"
                :error="getValidationMessage($v.fieldName)"
              >
                <option
                  v-for="(item, index) in notebooks.items"
                  :key="index"
                  :value="item.id"
                >
                  {{ item.name }}
                </option>
              </DropdownField>
            </div>

            <div
              class="
                flex flex-col
                justify-center
                items-center
                px-3
                mt-4
                space-y-2 space-x-0
                w-full
                md:flex-row md:space-y-0 md:space-x-2
              "
            >
              <Button type="submit">Add</Button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>

    <NotebookEdit v-model="isConfirmModalVisible" />
    <SwitchNotebook v-model="isSwitchModalVisible" />
  </section>
</template>

<script>
import { DELETE_NOTE, GET_NOTEBOOKS, GET_NOTES, UPDATE_NOTE } from '~/graphql'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Notebooks',
  layout: 'Dashboard',

  data: () => ({
    deleteNoteId: null,
    updatedNoteId: null,
    searchedTerm: '',
    filters: {},
    filteredNotebookId: null,
    fieldName: '',
    activeMenu: null,
    menu: false,
    isConfirmModalVisible: false,
    isDeleteModalVisible: false,
    isSwitchModalVisible: false,
    isAddToNotebookModalVisible: false,
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

  validations: {
    fieldName: {},

    honeyPot: {}
  },

  head() {
    return {
      title: 'Notebooks'
    }
  },

  methods: {
    onAddToNotebook() {
      this.isAddToNotebookModalVisible = !this.isAddToNotebookModalVisible
    },
    onDeleteNote(id) {
      this.deleteNoteId = id
      this.isDeleteModalVisible = !this.isDeleteModalVisible
    },
    onOpenSubMenu(id) {
      this.menu = !this.menu

      if (this.menu) this.activeMenu = id
      else this.activeMenu = null
    },

    onNotebookFilter(v) {
      this.filteredNotebookId = v
    },

    onFilters(v) {
      this.filters = {
        notebookId: this.filteredNotebookId,
        ...this.filters,
        ...v
      }
    },
    onAddNotebook(id) {
      this.updatedNoteId = id
      this.isConfirmModalVisible = !this.isConfirmModalVisible
    },
    onSwitchNotebook() {
      this.isSwitchModalVisible = !this.isSwitchModalVisible
    },

    async addToNotebook() {
      try {
        await this.$apollo.mutate({
          mutation: UPDATE_NOTE,
          variables: {
            id: this.updatedNoteId,
            input: {
              notebookId: this.fieldName
            }
          },
          skip: () => this.updatedNoteId === null
        })

        this.$toast.positive('Note added successfully')
        this.sending = false
        this.updatedNoteId = null
        this.$apollo.queries.notes.refetch()
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
        this.updatedNoteId = null
      }
    },

    async deleteNote(answer) {
      if (!answer) {
        this.deleteNoteId = null
        return
      }

      try {
        this.$emit(
          'deleted',
          await this.$apollo.mutate({
            mutation: DELETE_NOTE,
            variables: {
              id: this.deleteNoteId
            }
          })
        )
        this.$toast.positive('Note deleted successfully')
        this.sending = false
        this.deleteNoteId = null
        this.$apollo.queries.notes.refetch()
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
        this.deleteNoteId = null
      }
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
      },
      variables() {
        return {
          size: 30,
          skip: 0,
          filters: { ...this.filters }
        }
      }
    }
  }
}
</script>

<style>
</style>