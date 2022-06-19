<template>
  <section class="px-3 md:px-12">
    <section
      class="flex flex-wrap justify-between items-center py-4 mt-4 w-full"
    >
      <PageTitle>Edit Content</PageTitle>
    </section>

    <section class="container">
      <div>
        <div class="items-center mb-6">
          <div class="items-center mb-6 md:mb-0">
            <div
              class="flex items-center mb-6 space-x-1 cursor-pointer"
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
          </div>
          <div class="flex mb-6 space-x-2">
            <div class="flex flex-wrap items-center mb-6 space-x-2 md:mb-0">
              <span class="relative text-gray-500">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-4 h-4"
                  style=""
                >
                  <g>
                    <path
                      d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z"
                    ></path>
                    <path
                      d="M7.27 22.054c-1.61 0-3.197-.735-4.225-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.023 1.026-3.105 1.026z"
                    ></path>
                  </g>
                </svg>
              </span>
              <span class="mr-4 text-sm font-normal text-gray-500 md:mr-6"
                >Tags</span
              >
            </div>
            <div class="relative gap-2 text-xs">
              <div
                v-for="(tag, index) in tags"
                :key="index"
                class="
                  inline-flex
                  items-center
                  px-2
                  mx-1
                  space-x-2
                  bg-blue-200
                  rounded
                "
              >
                <span>{{ tag }}</span>
              </div>

              <div
                class="
                  inline-flex
                  items-center
                  px-2
                  space-x-2
                  text-black
                  rounded
                "
                @click.prevent="onOpenTagManager"
              >
                <span>
                  <IconPencil class="mr-2 h-3.5 pointer-events-none"
                /></span>
              </div>
            </div>
          </div>
          <div class="flex mb-6 space-x-2">
            <div class="flex flex-wrap items-center mb-6 space-x-2 md:mb-0">
              <span class="relative text-gray-500">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-4 h-4"
                  style=""
                >
                  <g>
                    <path
                      d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z"
                    ></path>
                    <path
                      d="M7.27 22.054c-1.61 0-3.197-.735-4.225-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.023 1.026-3.105 1.026z"
                    ></path>
                  </g>
                </svg>
              </span>
              <span class="mr-4 text-sm font-normal text-gray-500 md:mr-6"
                >Topics(niches)</span
              >
            </div>
            <div class="relative gap-2 text-xs">
              <div
                class="
                  inline-flex
                  items-center
                  px-2
                  space-x-2
                  bg-blue-200
                  rounded
                  text-dark
                "
              >
                <span>Medium</span>
              </div>

              <div
                class="
                  inline-flex
                  items-center
                  px-2
                  space-x-2
                  bg-blue-100
                  rounded
                  text-dark
                "
              >
                <span>Zikoko</span>
              </div>
            </div>
          </div>
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

    <Dialog v-model="isTagModalVisible" :is-large="true" title="Tag manager">
      <div class="block w-full text-gray-700 bg-white">
        <div class="justify-between w-full text-gray-700 bg-white">
          <TagManager @addTags="onTags" />
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
import { GET_NOTE, UPDATE_NOTE } from '~/graphql'
import { required, hasLetter } from '~/plugins/validators'
// import MediumEditor from 'medium-editor'

export default {
  name: 'EditPage',

  components: {
    IconPencil: () => import('~/assets/icons/pencil.svg?inline')
  },
  layout: 'Dashboard',

  async asyncData(context) {
    const getNote = await context.store.getters['content/getNote']
    const savedNote = await getNote(context.params.slug)

    if (savedNote)
      return {
        savedNote
      }

    const client = context.app.apolloProvider.defaultClient

    try {
      const {
        data: { getNote: savedNote }
      } = await client.query({
        query: GET_NOTE,
        variables: {
          id: context.params.slug
        },
        skip: !context.params.slug
      })
      return {
        savedNote
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
    isTagModalVisible: false,
    savedNote: null,
    contentId: null,
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
    this.defaultValue = `${this.getContent(this.savedNote)}`
    this.fieldTitle = this.savedNote?.title

    const _this = this
    this.$nextTick(() => {
      // Save draft every 5 minutes

      let refreshIntervalId
      try {
        refreshIntervalId = setInterval(async () => {
          if (!_this.saved) {
            const contents = {
              title: _this.fieldTitle,
              content: _this.content
            }
            await _this.updateDraft(contents)
            _this.saved = true
          }
        }, 5000)
      } catch (error) {
        if (refreshIntervalId) clearInterval(refreshIntervalId)
      }
      if (_this.saved) clearInterval(refreshIntervalId)
    })
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

      const contents = {
        title: this.fieldTitle,
        content: this.content,
        id: this.contentId
      }
      // Save to state
      await this.$store.commit('content/saveContent', contents)
      this.saved = false
    },

    uploadCallback(url) {},

    async updateDraft(input) {
      if (!this.contentId) return
      await this.$store.commit('content/saveContent', {
        id: this.contentId,
        ...input
      })
      return await this.$apollo.mutate({
        mutation: UPDATE_NOTE,
        variables: {
          id: this.contentId,
          input: { ...input }
        },

        skip() {
          return !this.contentId
        }
      })
    },

    async onPublish() {
      try {
        const content = {
          title: this.fieldTitle,
          content: this.content
        }
        await this.updateDraft(content)
        return await this.$router.push(`/contents/${this.contentId}/publish`)

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