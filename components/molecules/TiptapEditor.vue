<template>
  <div id="editor" class="overflow-hidden mx-4 w-full min-h-full md:mx-0">
    <client-only>
      <floating-menu
        v-if="editor"
        class="z-50"
        :editor="editor"
        :tippy-options="{ duration: 100, maxWidth: '100%', placement: 'left' }"
      >
        <button @click="onUploadImage">
          <image-icon />
        </button>
        <button
          :class="{ 'is-active': editor.isActive('codeBlock') }"
          @click="editor.chain().focus().toggleCodeBlock().run()"
        >
          <CodePreIcon />
        </button>
      </floating-menu>

      <bubble-menu
        v-if="editor"
        :editor="editor"
        :tippy-options="{ duration: 100 }"
      >
        <div v-if="editor" id="d-wysisyg-control">
          <span>
            <button
              :class="{ 'is-active': editor.isActive('bold') }"
              @click="editor.chain().focus().toggleBold().run()"
            >
              <BoldIcon />
            </button>
            <button
              :class="{ 'is-active': editor.isActive('italic') }"
              @click="editor.chain().focus().toggleItalic().run()"
            >
              <ItalicIcon />
            </button>
            <button
              :class="{ 'is-active': editor.isActive('strike') }"
              @click="editor.chain().focus().toggleStrike().run()"
            >
              <StrikeIcon />
            </button>
            <button
              :class="{ 'is-active': editor.isActive('blockquote') }"
              @click="editor.chain().focus().toggleBlockquote().run()"
            >
              <QuoteIcon />
            </button>
            <button
              :class="{ 'is-active': editor.isActive('underline') }"
              @click="editor.chain().focus().toggleUnderline().run()"
            >
              <UnderlineIcon />
            </button>

            <button
              :class="{ 'is-active': editor.isActive('link') }"
              @click="toggleLink"
            >
              <LinkIcon v-if="!editor.isActive('link')" />
              <UnLinkIcon v-else />
            </button>

            <button
              :class="{ 'is-active': editor.isActive('code') }"
              @click="editor.chain().focus().toggleCode().run()"
            >
              <CodeIcon />
            </button>
          </span>
        </div>
      </bubble-menu>

      <!-- Top Menu -->
      <div class="w-full bg-white">
        <div
          id="d-wysiwyg-semantic-container"
          class="flex justify-center w-full border-b-2"
        >
          <div
            v-if="editor"
            id="d-wysisyg-controls"
            class="flex overflow-x-auto px-2 w-full md:justify-center"
          >
            <span>
              <Tooltip label="Generate Outline">
                <button @click="generateOutline">
                  <OutlineIcon />
                </button>
              </Tooltip>
              <Tooltip label="Generate Summary">
                <button @click="generateSummary">
                  <SummaryIcon />
                </button>
              </Tooltip>
              <Tooltip label="Generate Content Brief">
                <button @click="generateBrief">
                  <BriefIcon />
                </button>
              </Tooltip>
              <Tooltip label="Generate Code Snippet">
                <button @click="generateCodeSnippet">
                  <SnippetIcon />
                </button>
              </Tooltip>
            </span>

            <span>
              <button
                :class="{
                  'is-active': editor.isActive('heading', { level: 1 })
                }"
                @click="
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                "
              >
                <H1Icon />
              </button>

              <DropdownField
                v-model="selected"
                class="border-0"
                field-class="border-0 text-transparent"
                :class="{
                  'is-active': editor.isActive('heading', { level: selected })
                }"
                @update:value="onSelectedHeader(selected)"
              >
                <option
                  v-for="(heading, index) in availableHeadings"
                  :key="`heading-${index}`"
                  :value="heading"
                >
                  H{{ heading }}
                </option>
              </DropdownField>
            </span>
            <span>
              <button
                :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
                @click="editor.chain().focus().setTextAlign('left').run()"
              >
                <LeftIcon />
              </button>
              <button
                :class="{
                  'is-active': editor.isActive({ textAlign: 'center' })
                }"
                @click="editor.chain().focus().setTextAlign('center').run()"
              >
                <CenterIcon />
              </button>
              <button
                :class="{
                  'is-active': editor.isActive({ textAlign: 'right' })
                }"
                @click="editor.chain().focus().setTextAlign('right').run()"
              >
                <RightIcon />
              </button>
              <button
                :class="{
                  'is-active': editor.isActive({ textAlign: 'justify' })
                }"
                @click="editor.chain().focus().setTextAlign('justify').run()"
              >
                <JustifyIcon />
              </button>
            </span>

            <span>
              <button
                :class="{ 'is-active': editor.isActive('bulletList') }"
                @click="editor.chain().focus().toggleBulletList().run()"
              >
                <list-icon />
              </button>
              <button
                :class="{ 'is-active': editor.isActive('orderedList') }"
                @click="editor.chain().focus().toggleOrderedList().run()"
              >
                <OrderedListIcon />
              </button>
            </span>

            <span>
              <button @click="editor.chain().focus().undo().run()">
                <UndoIcon />
              </button>
              <button @click="editor.chain().focus().redo().run()">
                <RedoIcon />
              </button>
              <button @click="clearAll()">
                <ClearIcon />
              </button>
            </span>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="overflow-hidden">
        <div
          class="
            overflow-x-hidden overflow-y-auto
            pt-5
            w-full
            h-[900px]
            bg-white
          "
        >
          <div class="mx-auto w-[98%] md:w-[60%]">
            <editor-content :editor="editor" />
          </div>
        </div>
      </div>
    </client-only>

    <Dialog v-model="isImageModalVisible" :is-large="true" title="Upload Image">
      <div class="block w-full text-gray-700 bg-white">
        <div class="justify-between w-full text-gray-700 bg-white">
          <UploadImage @uploaded="uploadedImage" />
        </div>
      </div>
    </Dialog>

    <Dialog v-model="isUpgradeModalVisible" :is-large="true">
      <UpgradeModal @back="back">This is a premium feature</UpgradeModal>
    </Dialog>
  </div>
</template>
  
  <script>
import {
  Editor,
  EditorContent,
  VueNodeViewRenderer,
  BubbleMenu,
  FloatingMenu
} from '@tiptap/vue-2'
import { StarterKit } from '@tiptap/starter-kit'
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
import { Document } from '@tiptap/extension-document'
import { TextAlign } from '@tiptap/extension-text-align'
import { Underline } from '@tiptap/extension-underline'
import { BulletList } from '@tiptap/extension-bullet-list'
import { ListItem } from '@tiptap/extension-list-item'
import { Code } from '@tiptap/extension-code'
import { Link } from '@tiptap/extension-link'
import { Image } from '@tiptap/extension-image'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Heading } from '@tiptap/extension-heading'
import { Text } from '@tiptap/extension-text'
import { lowlight } from 'lowlight'
import CodeBlockComponent from '../atoms/CodeBlock'
import { currentUser } from '~/components/mixins'
import { isArray } from '~/plugins/utils'
import { CREATE_OUTLINE } from '~/graphql'

const CustomDocument = Document.extend({
  content: 'heading block*',
  name: 'title'
})

// const OutlineDocument = Document.extend({
//   content: 'content block+',
//   name: 'outline'
// })
export default {
  components: {
    EditorContent,
    BubbleMenu,
    FloatingMenu,
    BoldIcon: () => import('~/assets/icons/editor/bold.svg?inline'),
    ItalicIcon: () => import('~/assets/icons/editor/italic.svg?inline'),
    StrikeIcon: () => import('~/assets/icons/editor/strike.svg?inline'),
    QuoteIcon: () => import('~/assets/icons/editor/quote.svg?inline'),
    CenterIcon: () => import('~/assets/icons/editor/center.svg?inline'),
    ImageIcon: () => import('~/assets/icons/editor/ImageIcon.vue'),
    JustifyIcon: () => import('~/assets/icons/editor/justify.svg?inline'),
    LinkIcon: () => import('~/assets/icons/editor/link.svg?inline'),
    UnLinkIcon: () => import('~/assets/icons/editor/unlink.svg?inline'),
    ListIcon: () => import('~/assets/icons/editor/ListIcon.svg?inline'),
    RedoIcon: () => import('~/assets/icons/editor/redo.svg?inline'),
    RightIcon: () => import('~/assets/icons/editor/right.svg?inline'),
    LeftIcon: () => import('~/assets/icons/editor/left.svg?inline'),
    CodeIcon: () => import('~/assets/icons/editor/code.svg?inline'),
    OrderedListIcon: () =>
      import('~/assets/icons/editor/orderedList.svg?inline'),
    UnderlineIcon: () => import('~/assets/icons/editor/underline.svg?inline'),
    UndoIcon: () => import('~/assets/icons/editor/undo.svg?inline'),
    CodePreIcon: () => import('~/assets/icons/editor/codePre.svg?inline'),
    H1Icon: () => import('~/assets/icons/editor/H1.svg?inline'),
    ClearIcon: () => import('~/assets/icons/editor/clear.svg?inline'),
    SnippetIcon: () => import('~/assets/icons/editor/snippet.svg?inline'),
    OutlineIcon: () => import('~/assets/icons/editor/outline.svg?inline'),
    SummaryIcon: () => import('~/assets/icons/editor/summary.svg?inline'),
    BriefIcon: () => import('~/assets/icons/editor/brief.svg?inline')
  },
  mixins: [currentUser],

  props: {
    content: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      selected: '2',
      isUpgradeModalVisible: false,
      editor: null,
      availableHeadings: [2, 3, 4, 5, 6],
      showOptions: false,
      focused: false,
      isImageModalVisible: false
    }
  },

  computed: {
    isPremium() {
      return this.currentUser?.isPremium
    }
  },

  watch: {
    content: {
      handler(value) {
        if (!value) return
        const isSame = this.editor.getHTML() === value

        if (isSame) return

        this.editor.commands.setContent(value, false)
      }
    }
  },

  mounted() {
    const _self = this
    this.editor = new Editor({
      content: '',
      extensions: [
        CustomDocument,
        // OutlineDocument,
        ListItem,
        Document,
        BulletList,
        StarterKit.configure({
          document: false,
          history: true
        }),

        Underline,
        Code,
        Image,
        Text,
        Link,
        Placeholder.configure({
          showOnlyWhenEditable: false,
          placeholder: ({ node }) => {
            if (node.type.name === 'heading') {
              return 'Title here'
            }

            return 'Write your heart out'
          }
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph']
        }),
        Heading.configure({
          HTMLAttributes: {
            class: 'heading',
            levels: [1, 2, 3, 4, 5, 6]
          }
        }),
        CodeBlockLowlight.extend({
          addNodeView() {
            return VueNodeViewRenderer(CodeBlockComponent)
          }
        }).configure({ lowlight })
      ],
      editorProps: {
        attributes: {
          class:
            'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl py-5 focus:outline-none w-full min-h-full font-gilroy font-light text-zinc-700 text-xl'
        }
      },

      onUpdate({ editor }) {
        _self.$emit('update:content', {
          title: _self.getTitle(),
          content: editor.getHTML()
        })
      }
    })
  },

  beforeDestroy() {
    this.editor.destroy()
  },

  methods: {
    parseHTML(content, query = 'p:first-of-type', attr = 'textContent') {
      const doc = new DOMParser().parseFromString(content, 'text/html')
      const errorNode = doc.querySelector('parsererror')

      console.log(doc)

      if (errorNode) return content
      return doc
    },

    async generateOutline() {

      // if (!this.isPremium) {
      //   this.isUpgradeModalVisible = true
      //   return
      // }

      const title = this.getTitle()
      try {
        const res = await this.$apollo.mutate({
          mutation: CREATE_OUTLINE,
          update: (cache, { data: { createOutline: outline } }) => {
            return {
              ...outline
            }
          },
          variables: {
            input: {
              title
            }
          }
        })

        const outline = res.data.createOutline

        this.editor.commands.setContent(`
        <h1>${title}</h1>
        <h2 class="outline">Outline</h2>
        <ul>${outline.content
          .replaceAll('\n\n', '<li>')
          .replaceAll('\n', '<p>')
          .replaceAll('\n<p>[a-zA-Z].', '<ul><li>')}</ul>
          ${this.editor
            .getHTML()
            .replace(/^<h1.+?h1>/, '')
            .replace(/^<h2.+?Outline.*?<\/ul>/, '')}
        `)

        this.$toast.positive('Outline created successfully')
        // this.sending = false
        this.$emit('create:success', true)
      } catch (error) {
        this.$toast.negative(error.message)
        // this.sending = false
      }
    },
    generateBrief() {
      if (!this.isPremium) {
        this.isUpgradeModalVisible = true
        return
      }

      const title = this.getTitle()
      console.log(title)
    },
    generateCodeSnippet() {
      if (!this.isPremium) {
        this.isUpgradeModalVisible = true
        return
      }

      const title = this.getTitle()
      console.log(title)
    },
    generateSummary() {
      if (!this.isPremium) {
        this.isUpgradeModalVisible = true
        return
      }

      const title = this.getTitle()
      console.log(title)
    },
    getTitle() {
      const html = this.editor.getJSON()

      if (!isArray(html.content[0]?.content)) {
        this.$toast.negative('Add a title')
        return
      }

      return html.content[0]?.content[0]?.text
    },
    toggleOptions() {
      this.showOptions = !this.showOptions
    },

    checkClicks(e) {
      if (this.showOptions && !e.target.closest('#headings')) {
        this.showOptions = false
      }
    },

    toggleFocusClass(val) {
      this.focused = val
    },

    onUploadImage() {
      this.isImageModalVisible = true
    },

    uploadedImage(data) {
      this.isImageModalVisible = false
      if (data.length > 1) return

      const image = data[0]
      if (!image.url) return
      this.editor.chain().focus().setImage({ src: image.url }).run()
    },

    back() {
      this.isUpgradeModalVisible = false
    },

    clearAll() {
      this.editor.chain().focus().unsetAllMarks().run()
      this.editor.chain().focus().clearNodes().run()
    },

    onSelectedHeader(header) {
      if (!header) return
      this.editor.commands.toggleHeading({ level: Number(header) })
    },

    toggleLink() {
      if (this.editor.isActive('link')) {
        this.editor.chain().focus().unsetLink().run()
      } else {
        const previousUrl = this.editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        // cancelled
        if (url === null) {
          return
        }

        // empty
        if (url === '') {
          this.editor.chain().focus().extendMarkRange('link').unsetLink().run()

          return
        }

        // update link
        this.editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: url })
          .run()
      }
    }
  }
}
</script>
<style lang="scss">
#editor button {
  @apply p-2 hover:bg-black hover:text-white;
}

#editor h1.heading {
  @apply text-5xl bg-transparent text-black hover:bg-transparent font-bold focus-within:bg-transparent pb-5 pt-2;
}

#editor h2.heading {
  @apply text-4xl bg-transparent text-black hover:bg-transparent font-bold focus-within:bg-transparent;
}

#editor h3.heading {
  @apply text-3xl bg-transparent text-black hover:bg-transparent font-bold focus-within:bg-transparent;
}

#editor h4.heading {
  @apply text-2xl bg-transparent text-black hover:bg-transparent font-bold focus-within:bg-transparent;
}

#editor h5.heading {
  @apply text-xl bg-transparent text-black hover:bg-transparent font-bold focus-within:bg-transparent;
}

#editor h6.heading {
  @apply text-lg bg-transparent text-black hover:bg-transparent font-bold focus-within:bg-transparent;
}

// #editor p.is-empty::before {
//   content: attr(data-placeholder);
//   float: left;
//   color: #adb5bd;
//   pointer-events: none;
//   height: 0;
// }

#editor h1.is-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}

#editor p {
  @apply leading-relaxed;
}

#editor code {
  font-size: 0.9rem;
  padding: 0.25em;
  border-radius: 0.25em;
  background-color: rgba(#616161, 0.1);
  color: #616161;
  box-decoration-break: clone;
}

#editor {
  ul,
  ol {
    padding: 0 1rem;
    @apply ml-2 py-0;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  li {
    padding: 0;
    margin: 0;
  }

  li > p {
    padding: 0.5rem;
    margin: 0;
  }

  li > p::first-child {
    padding: 0rem;
    margin: 0;
  }

  ul {
    list-style: disc;
  }
  strong {
    @apply font-bold;
  }
  ol {
    list-style: decimal;
  }

  pre {
    font-family: 'JetBrainsMono', monospace;
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    margin-left: 10px;
    background-color: #0d0d0d;
    border-radius: 3px;
    word-wrap: break-word;
    white-space: pre-wrap;
    color: #fff;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }

    .hljs-comment,
    .hljs-quote {
      color: #616161;
    }

    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: #f98181;
    }

    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #fbbc88;
    }

    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #b9f18d;
    }

    .hljs-title,
    .hljs-section {
      color: #faf594;
    }

    .hljs-keyword,
    .hljs-selector-tag {
      color: #70cff8;
    }

    .hljs-emphasis {
      font-style: italic;
    }

    .hljs-strong {
      font-weight: 700;
    }
  }
}
#editor h1,
h2,
h3,
h4,
h5,
h6 {
  line-height: 1.1;
}

#editor a {
  color: #68cef8;
  cursor: pointer;
}

.ui-wysiwyg__wrapper {
  font-family: sans-serif;
  &.dark_mode {
    .ui-text-field__label {
      color: var(--dark-input-label-color);
    }
  }
}
#d-wysisyg-controls {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */

  span {
    display: flex;
    @apply border p-0 m-2;
  }

  & > * {
    margin-right: 8px;
  }

  &::-webkit-scrollbar {
    /* WebKit */
    width: 0;
    height: 0;
  }
  &.focused {
    border-color: var(--light-primary-action-color);
  }
  button {
    background: transparent;
    border: none;
    color: #5f6b7a;
    cursor: pointer;
    &:hover,
    &.is-active {
      color: var(--light-primary-action-color);
    }
  }
}
.d-wysiwyg-editor {
  // padding: 8px 16px;
  border: 1px solid #ced6de;
  border-radius: 0 0 4px 4px;
  min-height: 150px;
  &.focused {
    border-color: var(--light-primary-action-color);
  }
}
#d-wysiwyg-semantic-container {
  border-radius: 4px;
  box-shadow: 0px 1px 2px rgba(63, 63, 68, 0.1);
  &:hover {
    & > div {
      border-color: var(--light-primary-action-color);
    }
  }
  &.focused {
    box-shadow: 0 0 0 3px var(--light-primary-action-box-shadow-color);
  }
  &.dark_mode {
    .d-wysiwyg-editor {
      background-color: var(--dark-input-background-color);
      border-color: var(--dark-input-border-color);
      color: #fff;
    }
    .d-wysisyg-controls {
      background-color: var(--dark-input-background-color);
      border-color: var(--dark-input-border-color);
      button {
        color: #cbd5e1;
        &.is-active {
          color: var(--dark-primary-action-color);
        }
      }
    }
  }
}

.ProseMirror-focused {
  border-color: transparent;
  outline-color: transparent;
}
/* Placeholder (at the top) */
.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #b8c4ce;
  pointer-events: none;
  height: 0;
}
.ProseMirror.ProseMirror-focused {
  outline: none;
  border: none;
}

.tippy-box {
  margin: 0 2rem;
}

.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  img {
    max-width: 100%;
    height: auto;

    &.ProseMirror-selectednode {
      outline: 3px solid var(--light-primary-action-color);
    }
  }
}
#headings {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  #heading-options {
    position: absolute;
    background: white;
    border-radius: 5px;
    z-index: 9000000;
    top: 100%;
    border: 1px solid #e6e6e6;
  }
  .heading-option {
    &:hover {
      background: #f8f8f8;
    }
    padding: 7px;
  }
}
</style>