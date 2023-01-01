<template>
  <PageContent>
    <Card
      v-click-outside="onClickOutside"
      class="flex flex-col gap-2 md:flex-row md:justify-between md:items-center"
    >
      <div class="w-full">
        <PageTitle>Add Content</PageTitle>
      </div>
      <div class="flex-1">
        <div
          v-click-outside="onClickOutside"
          class="
            flex flex-col
            items-center
            space-y-4 space-x-0
            w-full
            md:flex-row md:space-y-0 md:space-x-4
          "
        >
          <button @click.prevent="onOpenSettings">
            <SettingIcon />
          </button>

          <Button
            class="w-full"
            :disabled="!hasTitle"
            appearance="outline"
            @click.prevent="updateDraft"
          >
            Save
          </Button>

          <Button
            class="w-full"
            :disabled="!hasTitle"
            @click.prevent="onPublish"
          >
            Publish
          </Button>
        </div>
      </div>
    </Card>

    <Card>
      <div class="overflow-hidden">
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
  CONVERT_NOTE_BRIEF,
  CONVERT_NOTE_CONTENT,
  CONVERT_NOTE_OUTLINE,
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

  async asyncData(context) {
    if (!context.query?.id) return
    const client = context.app.apolloProvider.defaultClient

    try {
      const {
        data: { getContent: savedNote }
      } = await client.query({
        query: GET_CONTENT,
        variables: {
          id: context.query?.id
        },
        skip() {
          return !context.query?.id
        }
      })

      return {
        savedNote: {
          ...savedNote
        }
      }
    } catch (e) {}
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
    hasTitle: false,
    title: null,
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
    },

    title: {
      immediate: true,
      handler(value) {
        this.hasTitle = !!value
      }
    }
  },

  mounted() {
    // Get from LocalDB
    this.$nextTick(async () => {
      const content = await this.getDraft(this.noteId)
      if (!content) return
      this.title = content.title
      this.defaultContent = {
        content: content?.content ?? '',
        title: content?.title ?? ''
      }
    })
  },
  methods: {
    async onContent(data) {
      const draft = await this.getDraft(this.noteId)

      this.title = data.title

      this.settings = {
        ...this.settings,
        title: data.title,
        content: data.content,
        tags: [...(draft?.tags ?? []), ...(data?.tags ?? [])],
        topics: [...(draft?.topics ?? []), ...(data?.topics ?? [])]
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

    async removeDraft() {
      await this.$store.dispatch('content/removeDraft', {
        key: this.noteId
      })
    },

    async updateOutline() {
      if (!this.noteId) return

      const input = await this.generateInput()

      try {
        await this.$apollo.mutate({
          mutation: CONVERT_NOTE_OUTLINE,
          variables: {
            id: this.noteId,
            input: { ...input }
          },

          skip() {
            return !this.noteId
          }
        })

        await this.removeDraft()
        return this.$router.push(`/contents/outlines`)
      } catch (error) {
        await this.updateDraft(input)
        if (error.message.includes('You have exceeded your outline limit.')) {
          this.isUpgradeModalVisible = true
          return
        }
        this.$toast.negative(error.message)
      }
    },
    async updateBrief() {
      if (!this.noteId) return

      const input = await this.generateInput()

      await this.$apollo.mutate({
        mutation: CONVERT_NOTE_BRIEF,
        variables: {
          id: this.noteId,
          input: { ...input }
        },

        skip() {
          return !this.noteId
        }
      })

      await this.removeDraft()
      return this.$router.push(`/contents/briefs`)
    },

    async updateDraft() {
      if (!this.noteId) return

      const draft = await this.getDraft(this.noteId)
      const input = {
        content: this.settings?.content ?? draft?.content,
        title: this.settings?.title ?? draft?.title ?? this.savedNote?.title
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

      if (this.$route.query.type !== 'note') {
        draft = this.savedNote
      }

      if (!this.$utils.isEmpty(draft)) draft = await this.getContent(id)

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
      if (!input?.title && !input?.content) return
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

    async generateInput() {
      const draft = await this.getDraft(this.noteId)

      if (!this.settings?.excerpt) {
        this.settings.excerpt = this.parseHTML(this.settings?.content)
      }

      if (!this.settings?.featuredImage) {
        this.settings.featuredImage = this.findFirstImage(
          this.settings?.content
        )
      }

      return {
        ...this.settings,
        status: 'PUBLISHED',
        noteId: this.noteId,
        content: this.settings?.content ?? draft?.content,
        title: this.settings?.title ?? draft?.title
      }
    },

    async onPublish() {
      if (!this.noteId) return // Create new
      const input = await this.generateInput()

      try {
        await this.addContent(input)
        this.$store.commit('subscription/increment')

        await this.removeDraft()
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
        title: this.settings?.title ?? draft?.title ?? this.savedNote?.title,
        tags: [...(draft?.tags ?? []), ...(data?.tags ?? [])],
        topics: [...(draft?.topics ?? []), ...(data?.topics ?? [])],
        category: this.settings?.category ?? undefined
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

    async getContent(id) {
      if (!id) return
      try {
        const {
          data: { getContent: content }
        } = await this.$apollo.query({
          query: GET_CONTENT,
          variables: {
            id
          },
          skip() {
            return !!id
          }
        })

        return content
      } catch (error) {
        return null
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