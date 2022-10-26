<template>
  <FloatingPanel v-model="visibleModel" from="right">
    <template #header>
      <strong>
        {{ isEditing ? 'Edit portfolio' : 'Create portfolio' }}
      </strong>
    </template>

    <Loading v-if="$apollo.loading" class="flex flex-1 items-center h-full" />
    <form class="w-full" @submit.prevent="onSubmit">
      <div class="mb-6">
        <TextField
          v-model="$v.fieldTitle.$model"
          type="text"
          class="w-full text-sm"
          label="Title"
          placeholder="Enter your portfolio title"
          :error="getValidationMessage($v.fieldTitle)"
        />
      </div>
      <input
        v-model="$v.honeyPot.$model"
        type="text"
        class="absolute invisible"
      />
      <div v-if="portfolioId" class="mb-6 w-full">
        <TextField
          v-model="$v.fieldURL.$model"
          class="w-full text-sm"
          label="URL"
          type="websiteURL"
          disabled
          enterkeyhint="next"
          maxlength="2048"
          autocomplete="url"
          :error="getValidationMessage($v.fieldURL)"
        >
        </TextField>
      </div>

      <section class="mb-6">
        <TextField
          v-model="$v.fieldDescription.$model"
          :rows="5"
          type="text"
          class="w-full text-sm"
          label="Description"
          placeholder="Enter your description"
          :error="getValidationMessage($v.fieldDescription)"
        />
      </section>

      <section class="p-3 mb-6 border">
        <div class="mb-6">
          <div class="mb-5 text-darksilver"><p>Content rules:</p></div>
          <ClientsAutocomplete
            id="1"
            key="autocomplete"
            v-model="$v.fieldClient.$model"
            label="Client"
            :should-update="false"
            :allow-creation="false"
            :fake-input="true"
            :show-border="true"
            class="mr-1 w-full"
            placeholder="Select a client"
            :error="getValidationMessage($v.fieldClient)"
          />
        </div>
        <div class="mb-6 w-full">
          <CategoriesAutocomplete
            v-model="$v.fieldCategory.$model"
            label="Category"
            :error="getValidationMessage($v.fieldCategory)"
            :should-update="false"
            :fake-input="true"
            :show-border="true"
            :allow-creation="false"
            class="mr-1 w-full"
            placeholder="Select a category"
          />
        </div>
        <div class="mb-6 w-full">
          <TagsAutocomplete
            v-model="$v.fieldTags.$model"
            label="Tags"
            class="mr-1 w-full"
            placeholder="Select tags"
            :should-update="false"
            :allow-creation="false"
            :error="getValidationMessage($v.fieldTags)"
            @update:value="onUpdateTags"
          />
        </div>

        <div class="mb-6 w-full">
          <TopicsAutocomplete
            v-model="$v.fieldTopics.$model"
            label="Topics"
            class="mr-1 w-full"
            placeholder="Select topics"
            :should-update="false"
            :allow-creation="false"
            :error="getValidationMessage($v.fieldTopics)"
            @update:value="onUpdateTopics"
          />
        </div>
      </section>
      <!-- <section v-if="!isEditing" class="p-3 mb-6 border">
        <div class="mb-6">
          <DropdownField
            v-model="$v.fieldTemplate.$model"
            type="text"
            :disabled="disabled"
            class="w-full text-sm text-darksilver"
            label="Select a template"
            placeholder="Select your template"
            :error="getValidationMessage($v.fieldTemplate)"
          >
            <option
              v-for="template in templates"
              :key="template.id"
              :value="template.id"
            >
              {{ template.title === 'Blank' ? 'Use Default' : template.title }}
            </option>
          </DropdownField>
        </div>
        <CheckField
          v-model="shouldCustomize"
          class="text-gray-100"
          @changed="onShouldCustomize"
          >Customize New Template</CheckField
        >
      </section> -->

      <div
        class="
          flex flex-col
          pt-2
          mb-6
          space-y-4 space-x-0
          md:flex-row md:space-y-0 md:space-x-4
        "
      >
        <Button
          v-if="isCustomized && isEditing"
          appearance="secondary"
          class="w-full"
          :to="{ path: `/portfolios/customizer/?id=${getTemplateId}` }"
          type="link"
          target="_blank"
        >
          {{ 'Customize Page' }}
        </Button>

        <Button class="w-full" type="submit" :waiting="sending">
          {{ isEditing ? 'Update' : 'Create' }}
        </Button>
      </div>
    </form>
  </FloatingPanel>
</template>

<script>
import {
  CREATE_PORTFOLIO,
  GET_PORTFOLIO,
  GET_TEMPLATES,
  UPDATE_PORTFOLIO
} from '~/graphql'
import { currentUser } from '~/components/mixins/currentUser'
import { required } from '~/plugins/validators'

export default {
  name: 'PortfolioEdit',

  mixins: [currentUser],

  model: {
    prop: 'visible',
    event: 'toggle'
  },

  props: {
    portfolioId: {
      default: null,
      type: String
    },

    templateId: {
      type: String,
      default: null
    },

    isDeletePortfolioVisible: {
      type: Boolean,
      default: false
    },

    visible: {
      default: false,
      type: Boolean
    }
  },

  emits: ['toggle', 'created', 'updated'],

  data: () => ({
    disabled: false,
    portfolio: {},
    sending: false,
    fieldTitle: '',
    fieldURL: '',
    fieldTags: '',
    fieldCategory: '',
    fieldClient: '',
    shouldCustomize: false,
    fieldDescription: '',
    fieldTopics: '',
    fieldTemplate: '',
    honeyPot: '',
    tags: [],
    topics: [],
    templates: []
  }),
  validations: {
    fieldURL: {},
    fieldTags: {},
    fieldTopics: {},
    fieldClient: {},
    fieldCategory: {},
    fieldTemplate: {},
    fieldTitle: {
      required
    },
    shouldCustomize: {},
    fieldDescription: {},
    honeyPot: {}
  },

  apollo: {
    portfolio: {
      query: GET_PORTFOLIO,
      variables() {
        return { id: this.portfolioId }
      },
      update(data) {
        return data.getPortfolio
      },
      skip() {
        return !this.portfolioId
      },
      result() {
        this.resetForm()
      }
    },
    templates: {
      query: GET_TEMPLATES,
      variables: {
        size: 10,
        skip: 0
      },
      update(data) {
        return data.getTemplates
      }
    }
  },

  computed: {
    getTemplateId() {
      return this.portfolio?.template?.id
    },

    isCustomized() {
      return this.portfolio?.template?.template?.type === 'CUSTOMIZED'
    },
    isEditing() {
      return !!this.portfolioId
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
    visibleModel() {
      this.resetForm()
    },
    portfolioId() {
      this.portfolio = null
      this.resetForm()
    }
  },

  mounted() {
    this.resetForm()
  },

  methods: {
    onShouldCustomize() {
      this.disabled = !this.disabled
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
    resetForm() {
      this.$v.$reset()

      if (this.visible && this.portfolio) {
        this.fieldTitle = this.portfolio?.title ?? ''
        this.fieldURL = this.portfolio?.url
        this.fieldDescription = this.portfolio?.description
        this.fieldTemplate = this.portfolio?.template?.title
        // this.fieldCategory =
      } else {
        this.fieldTitle = ''
        this.fieldURL = ''
        this.fieldDescription = ''
        this.fieldTemplate = ''
      }
    },

    async createPortfolio(input) {
      return await this.$apollo.mutate({
        mutation: CREATE_PORTFOLIO,
        variables: { input },
        update: (cache, { data: { createPortfolio: portfolio } }) => {
          return portfolio
        }
      })
    },

    async updatePortfolio(input) {
      delete input.templateId
      return await this.$apollo.mutate({
        mutation: UPDATE_PORTFOLIO,
        variables: { id: this.portfolioId, input }
      })
    },

    async onSubmit() {
      const isAnyDirty = this.$v.$anyDirty

      if (await this.isValidationInvalid()) return

      try {
        this.sending = true
        this.$toast.message = ''

        const input = {
          title: this.fieldTitle,
          clientId: this.fieldClient?.id ?? undefined,
          categoryId: this.fieldCategory?.id ?? undefined,
          tags: this.tags,
          topics: this.topics,
          shouldCustomize: this.shouldCustomize,
          description: this.fieldDescription,
          templateId:
            this.templateId.toLowerCase() === 'blank'
              ? undefined
              : this.templateId
        }

        if (isAnyDirty) {
          if (this.isEditing) {
            this.$emit('updated', await this.updatePortfolio(input))
          } else {
            return this.$emit('created', await this.createPortfolio(input))
          }
        }

        this.$emit('toggle', false)
        this.$toast.positive('Portfolio updated successfully')
      } catch (error) {
        this.$toast.negative(error.message)
      } finally {
        this.sending = false
        this.$emit('toggle', false)
        this.visibleModel = false
      }
    }
  }
}
</script>
