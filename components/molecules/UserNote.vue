<!-- eslint-disable vue/no-v-html -->
<template>
  <li class="relative mr-3">
    <div
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
          @click="onOpenSubMenu(note.id)"
        />
        <div
          v-if="menu && activeMenu === note.id"
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
            z-[100]
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
                class="flex items-center transition-colors duration-200"
                @click.prevent="onAddToNotebook(note.id)"
              >
                Add to Notebook
              </button>
            </li>
            <li class="font-medium hover:bg-gray-100">
              <button
                class="flex items-center transition-colors duration-200"
                @click.prevent="onShareNote(note.id)"
              >
                Share note
              </button>
            </li>
            <hr class="dark:border-gray-700" />
            <li class="font-medium hover:bg-gray-100">
              <Hyperlink
                :to="{
                  path: `/contents/add?type=note&id=${note.id}`
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
                href="#"
                class="flex items-center transition-colors duration-200"
                @click.prevent="onDeleteNote(note.id)"
              >
                Delete note
              </button>
            </li>
          </ul>
        </div>
      </div>
      <Hyperlink
        :to="{ path: `/contents/add?type=note&id=${note.id}` }"
        class="min-w-[10.72rem]"
      >
        <div class="flex flex-col justify-between w-[10.72rem] h-full">
          <div class="w-full">
            <h3 class="text-lg font-bold">{{ note.title }}</h3>
            <article
              class="mt-3 text-sm"
              v-html="getExcerpt(note.content)"
            ></article>
          </div>
          <div class="text-sm">
            {{ $d(new Date(note.updatedAt), 'monthDayShortLong') }}
          </div>
        </div>
      </Hyperlink>

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

      <Dialog
        v-model="isShareModalVisible"
        :is-large="true"
        title="Create shareable link"
        @answer="deleteNote"
      >
        <div class="block w-full text-gray-700 bg-white">
          <div class="flex justify-between w-full text-gray-700 bg-white">
            <div class="mt-4 w-full">
              <TextField
                v-model="sharedLink"
                class="w-full"
                label="Shareable Link"
                :disabled="true"
              >
                <template #append-inner>
                  <div class="mr-2 ml-3 text-darksilver fill-current">C</div>
                </template>
              </TextField>
            </div>
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
            <Button @click="onCreateShareLink">Share</Button>
          </div>
        </div>
      </Dialog>
    </div>
  </li>
</template>

<script>
import { DELETE_NOTE, UPDATE_NOTE } from '~/graphql'
import IconInformationCircle from '~/assets/icons/information-circle.svg?inline'
export default {
  components: {
    IconInformationCircle
  },
  props: {
    note: {
      type: Object,
      default: () => {}
    },
    notebooks: {
      type: Object,
      default: () => {}
    }
  },

  validations: {
    fieldName: {},

    honeyPot: {}
  },

  data: () => ({
    deleteNoteId: null,
    shareId: null,
    scratchMenu: false,
    activeMenu: null,
    menu: false,
    sharedLink: '',
    isDeleteModalVisible: false,
    isShareModalVisible: false,
    isAddToNotebookModalVisible: false
  }),

  methods: {
    async onCreateShareLink() {
      await this.$apollo.mutate({
        mutation: UPDATE_NOTE,
        variables: {
          id: this.shareId,
          input: {
            shareable: true
          }
        },
        update: (cache, { data: { updateNote } }) => {
          this.sharedLink = updateNote.shareLink
        }
      })
    },

    onOpenSubMenu(id) {
      this.menu = !this.menu

      if (this.menu) this.activeMenu = id
      else this.activeMenu = null
    },

    onOpenScratchMenu() {
      this.scratchMenu = !this.scratchMenu
    },

    onDeleteNote(id) {
      this.deleteNoteId = id
      this.isDeleteModalVisible = !this.isDeleteModalVisible
      this.closeDropdown()
    },

    onAddToNotebook() {
      this.isAddToNotebookModalVisible = !this.isAddToNotebookModalVisible
      this.closeDropdown()
    },

    onShareNote(id) {
      this.shareId = id
      this.isShareModalVisible = true
      this.closeDropdown()
    },

    getExcerpt(excerpt) {
      return (excerpt && excerpt?.substring(0, 140) + '...') ?? ''
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
    onKeyUp(event) {
      const keyCode = event.keyCode || event.which
      if (keyCode === 27) this.closeDropdown()
    },

    closeDropdown() {
      this.menu = false
      // this.scratchMenu = false
      document.removeEventListener('keyup', this.onKeyUp)
    }
  }
}
</script>

<style>
</style>