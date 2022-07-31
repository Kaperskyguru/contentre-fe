<template>
  <section class="px-3 h-full md:px-12">
    <section
      class="flex flex-wrap justify-between items-center py-4 mt-4 w-full"
    >
      <!-- <div class="flex justify-between items-center py-4 space-x-3"> -->
      <!-- <i class="fas fa-arrow-left"></i> -->
      <PageTitle>Publish Content</PageTitle>
      <!-- </div> -->
      <div class="flex flex-col items-center sm:justify-center md:flex-row">
        <button
          class="inline-flex py-3 pl-5 mb-3 font-bold focus:outline-none"
          @click.prevent="onBack"
        >
          Back
        </button>

        <div class="flex justify-center items-center px-3 bg-gray-50">
          <button
            class="inline-flex py-3 pl-5 mb-3 font-bold focus:outline-none"
            @click.prevent="addContent('DRAFT')"
          >
            Save as draft
          </button>
        </div>

        <div v-if="false" class="inline-flex relative justify-start ml-2">
          <a href="#">
            <Button
              class="
                inline-flex
                py-3
                px-5
                mb-3
                ml-6
                text-white
                bg-teal-600
                focus:bg-teal-600
                rounded-md
                form-btn
              "
              @click.prevent="uploadContent"
            >
              Upload
            </Button>
          </a>
        </div>
      </div>
    </section>

    <!-- cards -->

    <!-- card title -->
    <form @submit.prevent="addContent()">
      <section class="flex">
        <div class="flex justify-center mr-6 mb-6 w-3/4 bg-white">
          <div
            v-if="coverImage"
            class="relative w-full opacity-100 hover:opacity-40 cursor-pointer"
            @click.prevent="onUploadImage"
          >
            <div class="w-full">
              <img :src="coverImage" alt="" class="w-full" />
            </div>
          </div>

          <div
            v-else
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

        <div class="mb-6 w-full">
          <TextField
            v-model="$v.fieldTitle.$model"
            placeholder="Enter Content title"
            label="Content Title"
            :is-required="false"
            :rows="1"
            :error="getValidationMessage($v.fieldTitle)"
          >
          </TextField>
          <section class="flex flex-col mt-4 w-full md:flex-row">
            <div class="mr-4 w-full">
              <TagsAutocomplete
                key="tagAutocomplete"
                v-model="$v.fieldTags.$model"
                class="w-full"
                placeholder="Add a tag..."
                label="Tag"
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
              <TagsAutocomplete
                key="tagAutocomplete"
                v-model="$v.fieldTopics.$model"
                class="mr-1 w-full"
                placeholder="Add a topic..."
                label="Topic"
                :should-update="false"
                :is-required="false"
                :error="getValidationMessage($v.fieldTags)"
                :is-input-border-enabled="false"
                @update:value="onUpdateTopics"
                @focus="onFocusAutocomplete"
                @blur="onBlurAutocomplete"
              ></TagsAutocomplete>
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
      </section>

      <section class="flex flex-col w-full md:flex-row">
        <CategoriesAutocomplete
          v-model="$v.fieldCategory.$model"
          :error="getValidationMessage($v.fieldCategory)"
          :should-update="false"
          :is-required="false"
          :hide-pencil-icon="false"
          class="mr-1 w-full"
          placeholder="Select a category"
          @update:value="onUpdateCategory"
          @focus="onFocusAutocomplete"
          @blur="onBlurAutocomplete"
          ><span slot="title">Categories</span></CategoriesAutocomplete
        >

        <ClientsAutocomplete
          id="1"
          key="autocomplete"
          v-model="$v.fieldClient.$model"
          :should-update="false"
          :allow-creation="false"
          :is-required="false"
          class="mr-1 w-full"
          :hide-pencil-icon="false"
          :placeholder="defaultClient"
          :error="getValidationMessage($v.fieldClient)"
          @update:value="onUpdateClient"
          @focus="onFocusAutocomplete"
          @blur="onBlurAutocomplete"
          ><span slot="title">Client</span></ClientsAutocomplete
        >
      </section>
      <!-- end of card category -->
      <input
        v-model="$v.honeyPot.$model"
        type="text"
        class="absolute invisible"
      />
      <!-- card tags -->

      <section>
        <ContentField
          v-model="$v.fieldExcerpt.$model"
          :rows="8"
          :editor="true"
          :is-required="true"
          :show-border="false"
          placeholder="+ Type your content excerpt here"
          :spellcheck="false"
          :error="getValidationMessage($v.fieldExcerpt)"
        >
          <span slot="title">Excerpt</span>
        </ContentField>
      </section>
      <!-- end of card tags -->

      <div class="flex flex-col justify-between md:flex-row">
        <div class="flex flex-col justify-start">
          <div class="flex justify-start mt-8">
            <!-- <div class="mr-3">Published to:</div> -->
            <Button appearance="outline-red" @click.prevent="onPlugins">
              <div class="text-red-600 hover:text-white">
                <GroupingIcon />
              </div>
            </Button>
          </div>
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
          <Button
            appearance="outline"
            :is-pro-feature="true"
            message="Coming Soon"
          >
            Schedule
          </Button>
          <Button type="submit"> Publish and send now</Button>
        </div>
      </div>
    </form>

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
          <UploadImage @image="uploadedImage" />
        </div>
      </div>
    </Dialog>
  </section>
</template>

<script>
import { CONVERT_NOTE_CONTENT, GET_NOTE } from '~/graphql'
import { required, hasLetter } from '~/plugins/validators'
import GroupingIcon from '~/assets/icons/client.svg?inline'
import { isArray } from '~/storybook-static/10.1f062e8d.iframe.bundle'
export default {
  name: 'PublishContent',
  components: {
    GroupingIcon
  },
  layout: 'Dashboard',

  async asyncData(context) {
    const savedNote = await context.store.state.content.contents

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
    checked: [],
    isImageModalVisible: false,
    isConfirmModalVisible: false,
    isPluginModalVisible: false,
    isPreviewModalVisible: false,
    selectedClient: null,
    fieldTopics: '',
    showAutoComplete: false,
    fieldTitle: '',
    fieldURL: '',
    fieldExcerpt: '',
    honeyPot: '',
    fieldClient: '',
    fieldTags: '',
    fieldCategory: '',
    fieldImage: '',
    tags: [],
    topics: [],
    sending: false,
    coverImage: undefined,
    apps: {}
  }),

  validations: {
    fieldTitle: {
      required,
      hasLetter
    },
    fieldExcerpt: {
      required,
      hasLetter
    },
    fieldURL: {},
    fieldTopics: {},
    fieldClient: {},
    fieldTags: {},
    fieldCategory: {},

    honeyPot: {}
  },
  head() {
    return {
      title: 'Publish Content'
    }
  },

  computed: {
    defaultClient() {
      return 'Choose a client'
    }
  },

  watch: {
    '$route.params': {
      immediate: true,
      handler(params) {
        this.noteId = params.slug
      }
    }
  },

  created() {
    this.fieldExcerpt = `${this.generateExcerpt(this.savedNote?.content) ?? ''}`
    this.fieldTitle = this.savedNote?.title

    // Find first image in content
    this.coverImage = this.findFirstImage()
  },

  methods: {
    findFirstImage() {
      const regex = /<img.+?src=[\\'"]([^\\'"]+)[\\'"].*?>/i
      const image = this.savedNote?.content?.match(regex)
      return image && isArray(image) ? image[0] : image ?? undefined
    },

    onUploadImage() {
      this.isImageModalVisible = true
    },

    uploadedImage(url) {
      this.isImageModalVisible = false
      if (url.length > 1) return
      this.coverImage = url[0]
    },

    onAddApps(app) {
      const name = app.name
      this.apps = {
        [name]: app.data
      }
      this.$toast.positive(`${name} plugin added successfully`)
    },
    generateExcerpt(content) {
      return content.substring(0, 140).replace(/<\/p>/g, '').concat('</p>')
    },

    onUpdateClient(client) {
      this.showAutoComplete = false
      this.fieldClient = client
    },
    onPlugins() {
      this.isPluginModalVisible = true
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
    async addContent(type = 'PUBLISHED') {
      if (this.honeyPot) return

      if (await this.isValidationInvalid()) return

      if (!this.savedNote) return

      try {
        this.sending = true
        const input = {
          url: this.fieldURL,
          tags: this.tags,
          topics: this.topics,
          featuredImage: this.coverImage,
          content: this.savedNote.content,
          excerpt: this.fieldExcerpt,
          title: this.savedNote.title,
          status: 'PUBLISHED',
          apps: this.apps,
          clientId: this.fieldClient?.id,
          category:
            this.fieldCategory?.name ?? this.fieldCategory ?? 'Uncategorized',
          noteId: this.$route?.params?.slug ?? ''
        }
        if (type === 'DRAFT') {
          input.status = 'DRAFT'
        }
        await this.createContent(this.noteId, input)
        this.$toast.positive('Content created successfully')
        this.sending = false
        this.$store.commit('subscription/increment')

        return this.$router.push(`/contents`)
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
      }
    },

    async createContent(id, input) {
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
    },

    async onBack() {
      return await this.$router.push(`/contents/${this.noteId}`)
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