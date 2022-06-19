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
          @update:value="onUpdateTitle"
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
        <Button> Publish </Button>
      </div>
    </section>
  </section>
  <!-- end of page -->
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// import MeMarkdown from 'medium-editor-markdown'
import TurndownService from 'turndown'
import { CREATE_NOTE } from '~/graphql'
import { required, hasLetter } from '~/plugins/validators'
// import MediumEditor from 'medium-editor'

export default {
  name: 'AddPage',
  layout: 'Dashboard',
  data: () => ({
    editor: ClassicEditor,
    content: '',
    defaultValue: '',
    savedContent: null,
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
        text: 'Write your heart out...'
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
      }
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

  methods: {
    async onUpdateTitle() {
      if (this.honeyPot) return

      if (await this.isValidationInvalid()) return
      const content = {
        title: this.fieldTitle,
        content: this.content
      }

      await this.saveDraft(content)
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
        content: this.content
      }
      await this.$store.commit('content/appendContent', contents)
    },

    uploadCallback(url) {},

    async saveDraft(input) {
      const {
        data: { createNote: note }
      } = await this.$apollo.mutate({
        mutation: CREATE_NOTE,
        variables: {
          input
        }
      })

      await this.$store.commit('content/saveContent', note)
      return await this.$router.push(`/contents/${note.id}?type=note`)
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