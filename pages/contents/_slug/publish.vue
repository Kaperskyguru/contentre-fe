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
      <section>
        <ContentField
          v-model="$v.fieldTitle.$model"
          placeholder="Enter Content title"
          :is-required="false"
          :error="getValidationMessage($v.fieldTitle)"
        >
          <span slot="title">Content Title</span></ContentField
        >
      </section>

      <!-- end of card title -->

      <!-- card link -->
      <section class="flex flex-col space-x-1 w-full md:flex-row">
        <ContentField
          v-model="$v.fieldURL.$model"
          placeholder="Paste Canonical URL"
          :is-required="false"
          :error="getValidationMessage($v.fieldURL)"
        >
          <span slot="title">Canonical URL </span></ContentField
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

      <!-- end of card link -->

      <!-- card category -->

      <section class="flex flex-col w-full md:flex-row">
        <CategoriesAutocomplete
          v-model="$v.fieldCategory.$model"
          :error="getValidationMessage($v.fieldCategory)"
          :should-update="false"
          :is-required="false"
          :hide-pencil-icon="false"
          class="mr-1 w-full md:w-1/2"
          placeholder="Select a category"
          @update:value="onUpdateCategory"
          @focus="onFocusAutocomplete"
          @blur="onBlurAutocomplete"
          ><span slot="title">Categories</span></CategoriesAutocomplete
        >

        <TagsAutocomplete
          id="3"
          key="tagAutocomplete"
          v-model="$v.fieldTags.$model"
          class="mr-1 w-full md:w-1/2"
          placeholder="Select up 5 tags"
          :should-update="false"
          :is-required="false"
          :hide-pencil-icon="false"
          :error="getValidationMessage($v.fieldTags)"
          :is-input-border-enabled="false"
          @update:value="onUpdateTags"
          @focus="onFocusAutocomplete"
          @blur="onBlurAutocomplete"
          ><span slot="title">Tags</span></TagsAutocomplete
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
  </section>
</template>

<script>
import { CREATE_CONTENT, GET_NOTE } from '~/graphql'
import { required, hasLetter } from '~/plugins/validators'
import GroupingIcon from '~/assets/icons/client.svg?inline'
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
    isConfirmModalVisible: false,
    isPluginModalVisible: false,
    isPreviewModalVisible: false,
    selectedClient: null,
    showAutoComplete: false,
    fieldTitle: '',
    fieldURL: '',
    fieldExcerpt: '',
    honeyPot: '',
    fieldClient: '',
    fieldTags: '',
    fieldCategory: '',
    tags: [],
    sending: false,
    coverImage: null,
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
  },

  beforeMount() {
    const callbackPaths = ['/contents/add#upload']

    if (callbackPaths.includes(this.$route.fullPath)) {
      this.isConfirmModalVisible = true
    }
  },

  methods: {
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
          // featuredImage: this.coverImage,
          content: this.savedNote.content,
          excerpt: this.fieldExcerpt,
          title: this.savedNote.title,
          status: 'PUBLISHED',
          apps: this.apps,
          clientId: this.fieldClient?.id,
          category:
            this.fieldCategory?.name ?? this.fieldCategory ?? 'Uncategorized'
        }
        if (type === 'DRAFT') {
          input.status = 'DRAFT'
        }

        await this.createContent(input)
        this.$toast.positive('Content created successfully')
        this.sending = false
        return await this.$router.push(`/contents`)
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
      }
    },

    async createContent(input) {
      return await this.$apollo.mutate({
        mutation: CREATE_CONTENT,
        variables: {
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