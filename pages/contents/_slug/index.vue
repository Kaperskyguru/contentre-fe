<template>
  <section class="px-3 md:px-12">
    <section
      class="flex flex-wrap justify-between items-center py-4 mt-4 w-full"
    >
      <PageTitle>Edit Content</PageTitle>
    </section>

    <section class="container">
      <div>
        <div
          class="flex items-center mb-6 space-x-1 cursor-pointer md:mb-0"
          @click.prevent="onUploadImage"
        >
          <span class="relative">
            <svg
              class="mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              width="10=4"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </span>
          <span class="mr-4 text-sm font-normal text-gray-500 md:mr-6"
            >Add Image Cover</span
          >
        </div>

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
// import MeMarkdown from 'medium-editor-markdown'
import TurndownService from 'turndown'
import { GET_CONTENT, UPDATE_CONTENT } from '~/graphql'
import { required, hasLetter } from '~/plugins/validators'
// import MediumEditor from 'medium-editor'

export default {
  name: 'EditPage',
  layout: 'Dashboard',

  async asyncData(context) {
    const client = context.app.apolloProvider.defaultClient

    try {
      const {
        data: { getContent: savedContent }
      } = await client.query({
        query: GET_CONTENT,
        variables: {
          id: context.params.slug
        },
        skip: !context.params.slug
      })
      return {
        savedContent
      }
    } catch (e) {
      return {
        error: true
      }
    }
  },
  data: () => ({
    editor: ClassicEditor,
    content: '',
    defaultValue: '',
    isImageModalVisible: false,
    savedContent: null,
    contentId: null,
    saved: true,
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
    },
    fieldExcerpt: {
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
    '$route.params': {
      immediate: true,
      handler(params) {
        this.contentId = params.slug
      }
    }
  },

  mounted() {
    // await new MediumEditor('#editor', this.options)
    this.defaultValue = `${this.getContent(this.savedContent)}`
    this.fieldTitle = this.savedContent?.title

    const _this = this
    this.$nextTick(() => {
      // Save draft every 5 minutes
      setInterval(async () => {
        if (!_this.saved) {
          const contents = {
            title: _this.fieldTitle,
            content: _this.content,
            status: 'DRAFT',
            visibility: 'PRIVATE',
            tags: [],
            category: 'Uncategorized'
          }
          await _this.updateDraft(contents)
          _this.saved = true
        }
      }, 5000)
    })
  },
  methods: {
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

    onUploadImage() {
      this.isImageModalVisible = true
    },
    getContent(content) {
      if (content?.content) return content?.content
      else return content?.excerpt
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

      const contents = {
        title: this.fieldTitle,
        content: this.content,
        status: 'DRAFT',
        visibility: 'PRIVATE',
        tags: [],
        category: 'Uncategorized'
      }
      // Save to state
      await this.$store.commit('content/appendContent', contents)
      this.saved = false
    },

    uploadCallback(url) {},

    async updateDraft(input) {
      return await this.$apollo.mutate({
        mutation: UPDATE_CONTENT,
        variables: {
          id: this.contentId,
          input: { ...input }
        },
        update(data) {
          return data.content
        },
        skip() {
          return !this.contentId
        }
      })
    },

    async onPublish() {
      try {
        const contents = {
          title: this.fieldTitle,
          content: this.content,
          visibility: 'PRIVATE',
          status: 'PUBLISHED',
          tags: [],
          category: 'Uncategorized'
        }
        await this.updateDraft(contents)
        return await this.$router.push(`/contents/${this.contentId}/edit`)

        // Redirect to 'add'
      } catch (error) {
        console.log(error)
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