<template>
  <!-- <PageContent> -->
  <section v-click-outside="onClickOutside" class="w-full">
    <div class="overflow-hidden mx-auto w-[95%]">
      <section
        class="
          flex flex-col
          justify-between
          items-center
          py-4
          mt-0
          w-full
          md:flex-row md:mt-4 md:space-y-0 md:space-x-4
        "
      >
        <PageTitle>Add Content</PageTitle>
        <div
          v-click-outside="onClickOutside"
          class="
            flex flex-col
            justify-end
            my-1
            space-y-4 space-x-0
            md:flex-row md:my-8 md:space-y-0 md:space-x-4
          "
        >
          <div>
            <Button appearance="outline" @click.prevent="onOpenMenu">
              Save As
            </Button>
            <div
              v-if="isMenuVisible"
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
                  <button
                    class="flex items-center transition-colors duration-200"
                  >
                    Note
                  </button>
                </li>
                <li class="font-medium hover:bg-gray-100">
                  <button
                    class="flex items-center transition-colors duration-200"
                  >
                    Outline
                  </button>
                </li>
                <li class="font-medium hover:bg-gray-100">
                  <button
                    class="flex items-center transition-colors duration-200"
                  >
                    Brief
                  </button>
                </li>
                <!-- <hr class="dark:border-gray-700" />
                <li class="font-medium hover:bg-gray-100">
                  <Hyperlink to="#">
                    <button
                      class="flex items-center transition-colors duration-200"
                    >
                      Snippet
                    </button>
                  </Hyperlink>
                </li> -->
              </ul>
            </div>
          </div>
          <Button @click.prevent="onPublish"> Publish </Button>
        </div>
      </section>

      <section class="w-full min-h-full text-gray-700 bg-white">
        <div class="h-full bg-white">
          <tiptap-editor />
        </div>
      </section>
    </div>

    <Dialog v-model="isImageModalVisible" :is-large="true" title="Upload Image">
      <div class="block w-full text-gray-700 bg-white">
        <div class="justify-between w-full text-gray-700 bg-white">
          <UploadImage />
        </div>
      </div>
    </Dialog>
  </section>
  <!-- end of page -->
  <!-- </PageContent> -->
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import TurndownService from 'turndown'
import vClickOutside from 'v-click-outside'
import { CREATE_NOTE, GET_NOTE, UPDATE_NOTE } from '~/graphql'
import { required, hasLetter } from '~/plugins/validators'

export default {
  name: 'AddPage',

  directives: {
    clickOutside: vClickOutside.directive
  },

  components: {
    // IconPencil: () => import('~/assets/icons/pencil.svg?inline')
  },
  layout: 'Dashboard',

  apollo: {
    savedNote: {
      query: GET_NOTE,
      update(data) {
        const note = data.getNote
        this.defaultValue = note.content
        this.fieldTitle = note.title
        return note
      },
      variables() {
        return {
          id: this.noteId
        }
      },
      skip() {
        return !this.noteId
      }
    }
  },

  data: () => ({
    editor: ClassicEditor,
    content: null,
    defaultValue: '',
    isImageModalVisible: false,
    isTagModalVisible: false,
    savedNote: {},
    noteId: null,
    saved: false,
    isMenuVisible: false,
    tags: [],
    fieldTitle: '',
    showMarkdown: false,
    editorConfig: {
      ref: 'field'
    },

    options: {
      uploadUrl: 'https://api.imgur.com/3/image',
      uploadUrlHeader: { Authorization: 'Client-ID db856b43cc7f441' },
      file_input_name: 'image',
      file_size: 1024 * 1024 * 10,
      subscribeToMeEditableInput: true,
      imgur: true,
      placeholder: {
        text: 'Write your heart out'
      },
      anchor: {
        linkValidation: true
      },
      keyboardCommands: {
        commands: [
          {
            command: 'bold',
            key: 'B',
            meta: true,
            shift: false,
            alt: false
          },
          {
            command: 'italic',
            key: 'I',
            meta: true,
            shift: false,
            alt: false
          },
          {
            command: 'underline',
            key: 'U',
            meta: true,
            shift: false,
            alt: false
          }
        ]
      },
      anchorPreview: true,
      toolbar: {
        buttons: [
          'bold',
          'italic',
          'unorderedlist',
          'orderedlist',
          'underline',
          'quote',
          'h1',
          'h2',
          'h3',
          'h4',
          'justifyLeft',
          'justifyCenter',
          'justifyRight',
          'justifyFull',
          'outdent',
          'indent',
          'superscript',
          'subscript',
          'removeFormat',
          'html',
          {
            name: 'anchor',
            action: 'createLink',
            aria: 'link',
            tagNames: ['a'],
            contentDefault: '<b>🔗</b>',
            contentFA: '<i class="fa fa-link"></i>'
          },
          {
            name: 'pre',
            action: 'append-pre',
            aria: 'code highlight',
            tagNames: ['pre'],
            contentDefault: '<b><\\></b>',
            contentFA: '<i class="fa fa-code fa-lg"></i>'
          },
          {
            name: 'image',
            action: 'image',
            aria: 'insert image from url',
            tagNames: ['img'],
            contentDefault: '<b>image</b>',
            contentFA: '<i class="fa fa-picture-o"></i>'
          }
        ]
      },
      extensions: {}
    }
  }),

  validations: {
    fieldTitle: {
      required,
      hasLetter
    }
  },
  head() {
    return {
      title: 'Add Content'
    }
  },

  watch: {
    '$route.query': {
      immediate: true,
      handler(query) {
        this.noteId = query.id
      }
    }
  },

  mounted() {
    // Get from LocalDB
    this.$nextTick(async () => {
      const content = await this.getLocalDraft(this.noteId)
      this.defaultValue = content?.content ?? this.getContent(this.savedNote)
      this.fieldTitle = content?.title ?? this.savedNote?.title
    })

    // TODO: Use Pusher
    // const _this = this
    // this.$nextTick(() => {
    //   if (this.$route.query.type !== 'NOTE') return

    //   // Save draft every 5 minutes
    //   let refreshIntervalId
    //   try {
    //     refreshIntervalId = setInterval(async () => {
    //       if (!_this.saved) {
    //         const contents = {
    //           title: _this.fieldTitle,
    //           content: _this.content
    //         }
    //         await _this.updateDraft(contents)
    //         _this.saved = true
    //       }
    //     }, 5000)
    //   } catch (error) {
    //     if (refreshIntervalId) clearInterval(refreshIntervalId)
    //   }
    //   if (_this.saved) clearInterval(refreshIntervalId)
    // })
  },
  methods: {
    onTags(tags) {
      this.tags = tags
      this.isTagModalVisible = false
    },
    onOpenTagManager() {
      this.isTagModalVisible = true
    },
    async selectFile(e) {
      const file = e.target.files[0]

      /* Make sure file exists */
      if (!file) return

      const readData = (f) =>
        new Promise((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.readAsDataURL(f)
        })

      /* Read data */
      this.coverImage = await readData(file)
    },

    uploadCallback() {},
    onOpenMenu() {
      this.isMenuVisible = !this.isMenuVisible
    },

    onClickOutside() {
      this.isMenuVisible = false
    },
    onUploadImage() {
      this.isImageModalVisible = true
    },
    getContent(content) {
      return content?.content
    },
    async onChange(s) {
      if (this.showMarkdown) {
        const editable = document.querySelector('#markdown')
        const turndown = new TurndownService({
          emDelimiter: '_',
          linkStyle: 'inlined',
          headingStyle: 'atx'
        })
        editable.textContent = turndown.turndown(s)
      }

      const content = {
        title: this.fieldTitle,
        content: this.content ?? ''
      }

      await this.saveDraft(content)
      this.saved = false
    },

    async saveNote() {
      try {
        const content = {
          title: this.fieldTitle,
          content: this.content ?? ''
        }
        await this.saveDraft(content)
        await this.updateDraft(content)
        this.$toast.positive('Note saved successfully')
      } catch (error) {
        this.$toast.negative(error.message)
      }
    },

    async updateDraft(input) {
      if (!this.noteId) return
      await this.$store.commit('content/saveContent', {
        id: this.noteId,
        ...input
      })
      return await this.$apollo.mutate({
        mutation: UPDATE_NOTE,
        variables: {
          id: this.noteId,
          input: { ...input }
        },

        skip() {
          return !this.noteId
        }
      })
    },

    async getLocalDraft(key) {
      return await this.$store.dispatch('content/getDraft', { key })
    },

    async saveDraft(input) {
      let key = this.noteId
      if (!key) {
        const note = await this.createNote(input)
        if (!note) return
        key = note.id
      }

      await this.$store.dispatch('content/saveDraft', {
        data: input,
        key
      })
    },

    async createNote(input) {
      if (await this.isValidationInvalid()) return
      const {
        data: { createNote: note }
      } = await this.$apollo.mutate({
        mutation: CREATE_NOTE,
        variables: {
          input
        }
      })

      if (note) {
        await this.$router.push({
          path: `/contents/add`,
          query: {
            ...this.$route.query,
            type: 'note',
            id: note.id
          }
        })

        return note
      }
      return null
    },

    generateKey() {
      return String(Math.floor(100000 + Math.random() * 900000))
    },

    async onPublish() {
      try {
        const content = {
          title: this.fieldTitle,
          content: this.content ?? ''
        }
        await this.updateDraft(content)
        return await this.$router.push(`/contents/${this.noteId}/publish`)
      } catch (error) {
        this.$toast.negative(error.message)
      }
    }
  }
}
</script>

<style scoped>
pre#markdown {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  margin-left: 10px;
  background-color: #f7f7f7;
  border-radius: 3px;
  word-wrap: break-word;
  white-space: pre-wrap;
  @apply text-gray-700 !important;
}

a:hover {
  color: #2980b9 !important;
}

blockquote {
  margin: 25px;
  border-left: 6px solid #2ecc71;
  padding-left: 9px;
  margin-left: -15px;
}

#markdown,
#editor {
  font-family: 'Lora', serif;
  outline: none;
  font-size: 19px;
}
</style>