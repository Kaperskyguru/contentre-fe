<template>
  <PageContent>
    <Card
      v-click-outside="onClickOutside"
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
        <button @click.prevent="onOpenSettings">
          <SettingIcon />
        </button>
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
                  @click="updateDraft"
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
    </Card>

    <Card>
      <div class="overflow-hidden mx-auto w-[95%]">
        <TiptapEditor :content="defaultContent" @update:content="onContent" />
      </div>
    </Card>

    <LazyContentSettings
      v-model="isContentSettingVisible"
      :note-id="noteId"
      :cover-image="coverImage"
      @openImage="onOpenImage"
      @openPlugin="onOpenPlugin"
      @settings="onSettings"
    ></LazyContentSettings>

    <Dialog
      v-model="isPluginModalVisible"
      :is-large="true"
      title="Connected Apps"
    >
      <div class="block w-full text-gray-700 bg-white">
        <div class="flex justify-between w-full text-gray-700 bg-white">
          <Plugins @add="onAddApps" />
        </div>
      </div>
    </Dialog>

    <Dialog v-model="isImageModalVisible" :is-large="true" title="Upload Image">
      <div class="block w-full text-gray-700 bg-white">
        <div class="justify-between w-full text-gray-700 bg-white">
          <UploadImage @uploaded="uploadedImage" />
        </div>
      </div>
    </Dialog>
  </PageContent>
</template>

<script>
import vClickOutside from 'v-click-outside'
import {
  CONVERT_NOTE_CONTENT,
  CREATE_NOTE,
  GET_CONTENT,
  UPDATE_NOTE
} from '~/graphql'
import SettingIcon from '~/assets/icons/setting.svg?inline'

export default {
  name: 'AddContent',

  directives: {
    clickOutside: vClickOutside.directive
  },

  components: {
    SettingIcon
  },
  layout: 'Dashboard',

  apollo: {
    savedNote: {
      query: GET_CONTENT,
      update(data) {
        return data.getContent
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
    content: null,
    apps: {},
    defaultContent: null,
    isImageModalVisible: false,
    isContentSettingVisible: false,
    isPluginModalVisible: false,
    isTagModalVisible: false,
    savedNote: {},
    noteId: null,
    saved: false,
    isMenuVisible: false,
    tags: [],
    coverImage: undefined,
    settings: {}
  }),

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

  async mounted() {
    // Get from LocalDB
    const content = await this.getDraft(this.noteId)
    this.defaultContent = content?.content
  },
  methods: {
    async onContent(data) {
      const draft = await this.getDraft(this.noteId)

      this.settings = {
        ...this.settings,
        title: data.title,
        content: data.content,
        tags: [...(draft.tags ?? []), ...(data?.tags ?? [])],
        topics: [...(draft.topics ?? []), ...(data?.topics ?? [])]
      }

      this.saveDraft({
        ...this.settings
      })
    },

    onAddApps(app) {
      const name = app.name
      this.apps = {
        [name]: app.data
      }
      this.$toast.positive(`${name} plugin added successfully`)
    },

    uploadedImage(data) {
      this.isImageModalVisible = false
      if (data.length > 1) return

      const image = data[0]
      if (!image.url) return
      this.coverImage = image.url
    },
    onOpenPlugin() {
      this.isPluginModalVisible = true
    },
    onOpenImage() {
      this.isImageModalVisible = true
    },
    onOpenMenu() {
      this.isMenuVisible = !this.isMenuVisible
    },
    onOpenSettings() {
      this.isContentSettingVisible = true
    },
    onClickOutside() {
      this.isMenuVisible = false
    },

    async updateDraft() {
      if (!this.noteId) return

      const draft = await this.getDraft(this.noteId)
      const input = {
        content: this.settings?.content ?? draft?.content,
        title: this.settings?.title ?? draft.title ?? this.savedNote.title
      }

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

    findFirstImage(content) {
      const regex = /<img.+?src=[\\'"]([^\\'"]+)[\\'"].*?>/i
      const image = content?.match(regex)

      let result
      if (image && Array.isArray(image)) {
        result = this.parseHTML(image[0], 'img', 'src')
      }

      if (image && !Array.isArray(image)) {
        result = this.parseHTML(image, 'img', 'src')
      }

      return result
    },

    async getDraft(id) {
      let draft = await this.getLocalDraft(id)

      if (!draft && this.$route.query.type === 'article') {
        draft = this.savedNote
      }

      if (!draft) draft = this.savedNote

      return draft
    },

    parseHTML(content, query = 'p:first-of-type', attr = 'textContent') {
      const doc = new DOMParser().parseFromString(content, 'text/html')
      const errorNode = doc.querySelector('parsererror')

      if (errorNode) return content

      const firstParam = doc.querySelector(query)

      if (!firstParam) return content

      return firstParam[attr]
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
      const {
        data: { createNote: note }
      } = await this.$apollo.mutate({
        mutation: CREATE_NOTE,
        variables: {
          input: { title: input.title, content: input.content }
        }
      })

      if (note) {
        await this.$router.push({
          path: `/contents/add`,
          query: {
            ...this.$route.query,
            id: note.id
          }
        })

        return note
      }
      return null
    },

    async onPublish() {
      if (!this.noteId) return // Create new
      const draft = await this.getDraft(this.noteId)
      const input = {
        ...this.settings,
        status: 'PUBLISHED',
        noteId: this.noteId,
        content: this.settings?.content ?? draft?.content,
        title: this.settings?.title ?? draft.title
      }

      if (!this.settings?.excerpt) {
        this.settings.excerpt = this.parseHTML(this.settings.content)
      }

      if (!this.settings?.featuredImage) {
        this.settings.featuredImage = this.findFirstImage(this.settings.content)
      }
      try {
        await this.addContent(input)
        this.$store.commit('subscription/increment')
        // Remove local draft
        await this.$store.dispatch('content/removeDraft', {
          key: this.noteId
        })
        return this.$router.push(`/contents`)
      } catch (error) {
        await this.updateDraft(input)
        this.$toast.negative(error.message)
      }
    },

    async onSettings(data) {
      const draft = await this.getDraft(this.noteId)
      this.settings = {
        apps: {
          ...this.apps
        },
        featuredImage: this.coverImage,
        ...this.settings,
        ...data,
        content: this.settings?.content ?? draft?.content,
        title: this.settings?.title ?? draft.title ?? this.savedNote.title,
        tags: [...(draft.tags ?? []), ...(data.tags ?? [])],
        topics: [...(draft.topics ?? []), ...(data.topics ?? [])]
      }

      this.saveDraft({
        ...this.settings
      })
    },

    async addContent(input) {
      try {
        this.sending = true

        await this.convertNoteToContent(this.noteId, input)
        this.$toast.positive('Content created successfully')
        this.sending = false
      } catch (error) {
        this.sending = false
        throw error
      }
    },

    async convertNoteToContent(id, input) {
      return await this.$apollo.mutate({
        mutation: CONVERT_NOTE_CONTENT,
        variables: {
          id,
          input: { ...input }
        },
        update(data) {
          return data.content
        }
      })
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
</style>