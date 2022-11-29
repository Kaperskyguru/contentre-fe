<template>
  <section class="px-3 md:px-12">
    <section
      class="flex flex-wrap justify-between items-center py-4 mt-4 w-full"
    >
      <PageTitle>Add Content</PageTitle>
    </section>

    <section class="container">
      <div>
        <TextField
          v-model="$v.fieldTitle.$model"
          placeholder="Title"
          field-class="placeholder:text-2xl placeholder:py-3"
          container-class="py-3 text-2xl bg-transparent hover:bg-transparent font-bold focus-within:bg-transparent"
          :show-border="false"
          :autofocus="true"
          :error="getValidationMessage($v.fieldTitle)"
          @update:value="onChange"
        ></TextField>

        <section class="flex flex-row space-x-2 w-full h-full">
          <div id="editor" class="p-3 w-full text-sm">
            <medium-editor
              v-model="content"
              :prefill="defaultValue"
              :options="options"
              :on-change="onChange"
              :hide-gist="false"
              @uploaded="uploadCallback"
            >
            </medium-editor>
          </div>
          <div v-if="showMarkdown" class="w-1/2">
            <pre id="markdown"></pre>
          </div>

          <!-- Remove this later -->
          <div v-else class="w-1/2"></div>
        </section>
      </div>
      <div
        class="
          flex flex-col
          justify-end
          my-8
          space-y-4 space-x-0
          md:flex-row md:space-y-0 md:space-x-4
        "
      >
        <Button appearance="outline" @click.prevent="saveNote">
          Save Note
        </Button>
        <Button @click.prevent="onPublish"> Publish </Button>
      </div>
    </section>

    <Dialog v-model="isImageModalVisible" :is-large="true" title="Upload Image">
      <div class="block w-full text-gray-700 bg-white">
        <div class="justify-between w-full text-gray-700 bg-white">
          <UploadImage />
        </div>
      </div>
    </Dialog>
  </section>
  <!-- end of page -->
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import TurndownService from 'turndown'
import { CREATE_NOTE, GET_NOTE, UPDATE_NOTE } from '~/graphql'
import { required, hasLetter } from '~/plugins/validators'

export default {
  name: 'AddPage',

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