<template>
  <section class="px-3 h-full md:px-12">
    <form @submit.prevent="addContent">
      <section
        class="flex flex-wrap justify-between items-center py-4 mt-4 w-full"
      >
        <!-- <div class="flex justify-between items-center py-4 space-x-3"> -->
        <!-- <i class="fas fa-arrow-left"></i> -->
        <PageTitle>Add Content</PageTitle>
        <!-- </div> -->
        <div class="flex flex-col items-center sm:justify-center md:flex-row">
          <button
            class="inline-flex py-3 pl-5 mb-3 font-bold focus:outline-none"
            @click.prevent="onPreviewContent"
          >
            Preview
          </button>

          <div class="flex justify-center items-center px-3 bg-gray-50">
            <button
              class="inline-flex py-3 pl-5 mb-3 font-bold focus:outline-none"
              @click.prevent="addContent('DRAFT')"
            >
              Save as draft
            </button>
          </div>

          <div class="inline-flex relative justify-start ml-2">
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
          :disabled="true"
          :error="getValidationMessage($v.fieldURL)"
        >
          <span slot="title">Canonical URL </span></ContentField
        >

        <ContentField
          type="file"
          accept=".jpeg,.jpg,.png,image/jpeg,image/png"
          class="w-full text-sm"
          label="Cover image"
          @change="selectFile"
        >
          <span slot="title">Cover image </span></ContentField
        >
      </section>

      <!-- end of card link -->

      <!-- card category -->

      <section class="flex flex-col w-full md:flex-row">
        <ClientsAutocomplete
          id="1"
          key="autocomplete"
          v-model="$v.fieldClient.$model"
          :should-update="false"
          :allow-creation="false"
          class="mr-1 w-full md:w-1/2"
          :hide-pencil-icon="false"
          :placeholder="defaultClient"
          :error="getValidationMessage($v.fieldClient)"
          @update:value="onUpdateClient"
          @focus="onFocusAutocomplete"
          @blur="onBlurAutocomplete"
          ><span slot="title">Client</span></ClientsAutocomplete
        >

        <CategoriesAutocomplete
          v-model="$v.fieldCategory.$model"
          :error="getValidationMessage($v.fieldCategory)"
          :should-update="false"
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

      <!-- card tags -->

      <section>
        <ContentField
          v-model="$v.fieldExcerpt.$model"
          :rows="8"
          :is-required="false"
          :show-border="false"
          placeholder="+ Type your content excerpt here"
          :spellcheck="false"
          :should-show-editing-options="true"
          :error="getValidationMessage($v.fieldExcerpt)"
        >
          <span slot="title">Excerpt</span>
        </ContentField>
      </section>
      <!-- end of card tags -->

      <section>
        <ContentField
          v-model="$v.fieldContent.$model"
          :rows="20"
          placeholder="+ Type your content here"
          :spellcheck="false"
          :disabled="true"
          :show-border="false"
          :should-show-editing-options="true"
          :error="getValidationMessage($v.fieldContent)"
        >
          <span slot="title">Content</span>
        </ContentField>
      </section>

      <div class="flex flex-col justify-between md:flex-row">
        <div class="flex flex-col justify-start">
          <div class="flex justify-start mt-8">
            <div class="mr-3">Published to:</div>
            <div
              class="
                flex flex-col
                justify-end
                items-start
                -mb-3
                text-gray-100
                md:flex-row md:flex-wrap
              "
            >
              <div class="mr-4">
                <CheckField id="medium" v-model="medium" class="text-gray-100"
                  >Medium</CheckField
                >
              </div>
              <div class="mr-4">
                <CheckField id="devto" v-model="devto" class="text-gray-100"
                  >Dev Community</CheckField
                >
              </div>
              <div class="mr-4">
                <CheckField
                  id="hashnode"
                  v-model="hashnode"
                  class="text-gray-100"
                  >Hashnode</CheckField
                >
              </div>
            </div>
          </div>

          <div class="flex justify-start mt-4 sm:mt-8">
            <div class="mr-3">Share to:</div>
            <div
              class="
                flex flex-col
                justify-end
                items-start
                -mb-3
                text-gray-100
                md:flex-row md:flex-wrap
              "
            >
              <div class="mr-4">
                <CheckField id="medium" v-model="medium" class="text-gray-100"
                  >Facebook</CheckField
                >
              </div>
              <div class="mr-4">
                <CheckField id="devto" v-model="devto" class="text-gray-100"
                  >Twitter</CheckField
                >
              </div>
              <div class="mr-4">
                <CheckField
                  id="hashnode"
                  v-model="hashnode"
                  class="text-gray-100"
                  >Linkedin</CheckField
                >
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-end my-8 md:flex-row">
          <button
            id="buttonmodal"
            class="
              py-4
              px-24
              mt-4
              text-sm
              font-bold
              leading-5
              text-center text-white
              bg-teal-300
              rounded-md
              form-btn
            "
            type="submit"
          >
            Publish
          </button>
          <button
            class="
              py-4
              px-24
              mt-4
              text-sm
              font-bold
              leading-5
              text-center text-white
              rounded-md
              md:ml-4
              form-btn
            "
          >
            Schedule
          </button>
        </div>
      </div>
    </form>
    <Dialog v-model="isPreviewModalVisible" is-large>
      <div class="block w-full text-gray-700 bg-white">
        <div class="flex justify-between w-full text-gray-700 bg-white">
          <ContentPreview @close="isPreviewModalVisible = false" />
        </div>
      </div>
    </Dialog>
    <Dialog v-model="isConfirmModalVisible">
      <div class="block w-full text-gray-700 bg-white">
        <div class="flex justify-between w-full text-gray-700 bg-white">
          <UploadContent @create:success="onContentUploaded" />
        </div>
      </div>
    </Dialog>
  </section>
</template>

<script>
import { CREATE_CONTENT } from '~/graphql'
import {
  // maxLength,
  // minLength,
  required,
  // hasNumber,
  hasLetter
  // hasSymbol,
  // hasCapital
} from '~/plugins/validators'
export default {
  name: 'AddPage',
  layout: 'Dashboard',

  data: () => ({
    checked: [],
    isConfirmModalVisible: false,
    isPreviewModalVisible: false,
    selectedClient: null,
    showAutoComplete: false,
    fieldTitle: '',
    fieldURL: '',
    fieldExcerpt: '',
    fieldContent: '',
    fieldClient: null,
    fieldTags: null,
    fieldCategory: null,
    tags: [],
    sending: false,
    medium: '',
    devto: '',
    hashnode: '',
    coverImage: null
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
    fieldContent: {
      hasLetter
    },
    fieldURL: {},
    fieldClient: {
      required
    },
    fieldTags: {
      required
    },
    fieldCategory: {
      required
    },

    honeyPot: {}
  },
  head() {
    return {
      title: 'Portfolios | Edit Portfolio'
    }
  },

  computed: {
    defaultClient() {
      return 'Choose a client'
    }
  },

  beforeMount() {
    const callbackPaths = ['/contents/add#upload']

    if (callbackPaths.includes(this.$route.fullPath)) {
      this.isConfirmModalVisible = true
    }
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
    onUpdateClient(client) {
      this.showAutoComplete = false
      this.fieldClient = client
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
    async addContent(type = 'DRAFT') {
      if (this.honeyPot) return

      if (await this.isValidationInvalid()) return

      if (type === 'DRAFT') {
        console.log(type)
        return
      }

      this.sending = true
      try {
        await this.$apollo.mutate({
          mutation: CREATE_CONTENT,
          variables: {
            input: {
              url: this.fieldURL,
              tags: this.tags,
              content: this.fieldContent,
              excerpt: this.fieldExcerpt,
              title: this.fieldTitle,
              clientId: this.fieldClient?.id,
              category: this.fieldCategory
            }
          }
        })
        this.$toast.positive('Content created successfully')
        this.sending = false
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
      }
    },

    onPreviewContent() {
      this.isPreviewModalVisible = true
    },
    uploadContent() {
      this.isConfirmModalVisible = true
    },

    onContentUploaded(content) {
      if (!content) return
      this.isConfirmModalVisible = false
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