<template>
  <FloatingPanel v-model="visibleModel" from="right">
    <template #header>
      <strong>
        {{ 'Post settings' }}
      </strong>
    </template>
    <form @submit.prevent="addContent()">
      <div class="flex justify-center p-6 mb-6 w-full bg-white border">
        <div
          v-if="newCoverImage"
          class="relative w-full opacity-100 hover:opacity-40 cursor-pointer"
          @click.prevent="onUploadImage"
        >
          <div class="w-full">
            <img :src="newCoverImage" alt="" class="w-full" />
          </div>
        </div>

        <div
          v-else
          class="flex justify-center items-center mb-6 space-x-1 cursor-pointer"
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

      <div class="mb-6 w-full">
        <!-- <TextField
            v-model="$v.fieldTitle.$model"
            placeholder="Enter Content title"
            label="Content Title"
            :is-required="false"
            :rows="1"
            :error="getValidationMessage($v.fieldTitle)"
          >
          </TextField> -->
        <section class="flex flex-col mt-4 w-full md:flex-row">
          <div class="mr-4 w-full">
            <TagsAutocomplete
              key="tagAutocomplete"
              v-model="$v.fieldTags.$model"
              class="w-full"
              placeholder="Add a tag..."
              label="Tag"
              should-replace
              :content-id="noteId"
              :should-update="false"
              :is-required="false"
              :error="getValidationMessage($v.fieldTags)"
              :is-input-border-enabled="false"
              @update:value="onUpdateTags"
              @focus="onFocusAutocomplete"
              @blur="onBlurAutocomplete"
            ></TagsAutocomplete>
          </div>
          <div class="w-full">
            <TopicsAutocomplete
              key="topicAutocomplete"
              v-model="$v.fieldTopics.$model"
              class="mr-1 w-full"
              placeholder="Add a topic..."
              label="Topic"
              should-replace
              :should-update="false"
              :is-required="false"
              :error="getValidationMessage($v.fieldTags)"
              :is-input-border-enabled="false"
              @update:value="onUpdateTopics"
              @focus="onFocusAutocomplete"
              @blur="onBlurAutocomplete"
            ></TopicsAutocomplete>
          </div>
        </section>
        <div class="mt-4 w-full">
          <TextField
            v-model="$v.fieldURL.$model"
            placeholder="Paste Canonical URL"
            label="Canonical URL"
            :is-required="false"
            :error="getValidationMessage($v.fieldURL)"
          >
            <template #append-inner>
              <div class="mr-2 ml-3 text-darksilver fill-current">
                <!-- <IconSearch /> -->
                M
              </div>
            </template>
          </TextField>
        </div>
      </div>

      <section
        class="
          flex flex-col
          mb-6
          space-y-4 space-x-0
          w-full
          md:flex-row md:space-y-0 md:space-x-4
        "
      >
        <CategoriesAutocomplete
          v-model="$v.fieldCategory.$model"
          :error="getValidationMessage($v.fieldCategory)"
          :should-update="false"
          :is-required="false"
          :fake-input="true"
          :show-border="true"
          :hide-pencil-icon="false"
          class="mr-1 w-full"
          :should-show-options="false"
          placeholder="Select a category"
          @update:value="onUpdateCategory"
          @focus="onFocusAutocomplete"
          @blur="onBlurAutocomplete"
        ></CategoriesAutocomplete>

        <ClientsAutocomplete
          id="1"
          key="autocomplete"
          v-model="$v.fieldClient.$model"
          :should-update="false"
          :show-border="true"
          :allow-creation="false"
          :fake-input="true"
          :is-required="false"
          class="mr-1 w-full"
          :should-show-options="false"
          :hide-pencil-icon="false"
          :placeholder="defaultClient"
          :error="getValidationMessage($v.fieldClient)"
          @update:value="onUpdateClient"
          @focus="onFocusAutocomplete"
          @blur="onBlurAutocomplete"
        ></ClientsAutocomplete>
      </section>
      <!-- end of card category -->
      <input
        v-model="$v.honeyPot.$model"
        type="text"
        class="absolute invisible"
      />
      <!-- card tags -->

      <section class="mb-6">
        <TextField
          v-model="$v.fieldExcerpt.$model"
          :rows="5"
          :editor="true"
          :is-required="true"
          placeholder="+ Type your content excerpt here"
          :error="getValidationMessage($v.fieldExcerpt)"
        >
          <span slot="title">Excerpt</span>
        </TextField>
      </section>

      <section class="p-3 mb-3 border">
        <div class="mb-5 text-darksilver"><p>Schedule Post:</p></div>
        <div class="flex flex-wrap items-center">
          <div class="mb-6 w-full md:mb-0 md:w-1/2">
            <DateField
              v-model="$v.fieldDate.$model"
              class="flex-1"
              :disabled="!isPremium"
              :max="new Date()"
              :min="new Date()"
              label="Date"
              placeholder="Set Schedule Date"
              full-calendar
              :error="
                !isPremium
                  ? 'This is a premium feature'
                  : getValidationMessage($v.fieldDate)
              "
            />
          </div>

          <div class="pl-0 w-full md:pl-2 md:mb-0 md:w-1/2">
            <TextField
              v-model="$v.fieldTime.$model"
              :disabled="!isPremium"
              type="time"
              label="Time"
              class="flex-1"
              placeholder="Set reminder time"
              :error="
                !isPremium
                  ? 'This is a premium feature'
                  : getValidationMessage($v.fieldTime)
              "
            />
          </div>
        </div>
      </section>

      <div class="flex flex-col justify-between md:flex-row">
        <Button @click.prevent="onPlugins"> Add Plugins </Button>
      </div>
    </form>
  </FloatingPanel>
</template>
  
<script>
import { GET_CONTENT } from '~/graphql'
import { hasLetter } from '~/plugins/validators'
import { currentUser } from '~/components/mixins/currentUser'
export default {
  name: 'ContentSettings',
  components: {},
  mixins: [currentUser],

  model: {
    prop: 'visible',
    event: 'toggle'
  },

  props: {
    noteId: { type: String, default: '' },
    visible: {
      default: false,
      type: Boolean
    },
    coverImage: {
      type: String,
      default: null
    }
  },
  data: () => ({
    checked: [],
    selectedClient: null,
    fieldTopics: '',
    showAutoComplete: false,
    fieldURL: '',
    fieldExcerpt: '',
    honeyPot: '',
    newCoverImage: '',
    fieldClient: '',
    fieldTags: '',
    fieldCategory: '',
    fieldTime: '',
    fieldDate: '',
    tags: [],
    topics: []
  }),

  validations: {
    fieldDate: {},
    fieldTime: {},
    fieldExcerpt: {
      hasLetter
    },
    fieldURL: {},
    fieldTopics: {},
    fieldClient: {},
    fieldTags: {},
    fieldCategory: {},

    honeyPot: {}
  },

  computed: {
    isPremium() {
      return this.currentUser?.isPremium
    },
    defaultClient() {
      return 'Choose a client'
    },

    visibleModel: {
      get() {
        return this.visible
      },

      set(value) {
        this.$emit('toggle', value)
      }
    }
  },

  watch: {
    visible: {
      async handler(value) {
        if (!value) this.saveSettings()
        if (value) await this.initializeDefaultData()
      }
    },

    coverImage: {
      handler(value) {
        this.newCoverImage = value
      }
    }
  },

  methods: {
    async initializeDefaultData() {
      if (!this.noteId) return
      const draft = await this.getDraft(this.noteId)

      if (!draft) return

      this.fieldClient = draft?.clientId
      this.fieldTags = draft?.tags
      this.fieldTopics = draft?.topics
      this.fieldURL = draft?.url
      this.newCoverImage =
        draft?.featuredImage ?? this.findFirstImage(draft.content)
      this.fieldCategory = draft?.category
      this.fieldExcerpt = this.generateExcerpt(this.parseHTML(draft?.content))
    },

    async getDraft(id) {
      let draft = await this.getLocalDraft(id)

      if (!draft && this.$route.query.type === 'article') {
        draft = await this.getNoteById(id)
      }

      return draft
    },

    async getLocalDraft(key) {
      return await this.$store.dispatch('content/getDraft', { key })
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

    parseHTML(content, query = 'p:first-of-type', attr = 'textContent') {
      const doc = new DOMParser().parseFromString(content, 'text/html')
      const errorNode = doc.querySelector('parsererror')

      if (errorNode) return content

      const firstParam = doc.querySelector(query)

      if (!firstParam) return content

      return firstParam[attr]
    },

    onUploadImage() {
      this.visibleModel = false
      this.$emit('openImage', true)
    },

    generateExcerpt(content) {
      if (!content) return ''
      return content && content.substring(0, 140)
    },

    async getNoteById(id) {
      try {
        const {
          data: { getContent: note }
        } = await this.$apollo.query({
          query: GET_CONTENT,
          variables: {
            id
          },
          skip() {
            return !id
          }
        })

        return note
      } catch (error) {
        return null
      }
    },

    onUpdateClient(client) {
      this.showAutoComplete = false
      this.fieldClient = client
    },
    onPlugins() {
      this.visibleModel = false
      this.$emit('openPlugin')
    },

    onUpdateTags(tags) {
      this.showAutoComplete = false
      this.fieldTags = tags
      this.tags.push(tags?.name)
    },

    onUpdateTopics(topics) {
      this.showAutoComplete = false
      this.fieldTopics = topics
      this.topics.push(topics?.name)
    },

    onUpdateCategory(category) {
      this.showAutoComplete = false
      this.fieldCategory = category
    },
    saveSettings() {
      const input = {
        url: this.fieldURL,
        tags: this.tags,
        topics: this.topics,
        excerpt: this.fieldExcerpt,
        clientId: this.fieldClient?.id,
        category:
          this.fieldCategory?.name ?? this.fieldCategory ?? 'Uncategorized'
      }

      this.$emit('settings', input)
    },

    onFocusAutocomplete() {
      this.showAutoComplete = true
    },

    onBlurAutocomplete() {
      setTimeout(() => {
        this.showAutoComplete = false
      }, 150)
    }
  }
}
</script>

  <style>
</style>