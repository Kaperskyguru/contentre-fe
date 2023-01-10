<template>
  <FloatingPanel v-model="visibleModel" from="right">
    <template #header>
      <strong>
        {{ isEditing ? 'Edit portfolio' : 'Create portfolio' }}
      </strong>
    </template>

    <Loading v-if="$apollo.loading" class="flex flex-1 items-center h-full" />
    <form class="w-full" @submit.prevent="onSubmit">
      <section class="p-3 mb-3 border">
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
          class="hidden absolute invisible"
        />

        <div class="mb-3">
          <TextField
            v-model="$v.fieldDescription.$model"
            :rows="3"
            type="text"
            class="w-full text-sm"
            label="Description"
            placeholder="Enter your description"
            :error="getValidationMessage($v.fieldDescription)"
          />
        </div>
      </section>
      <section class="p-3 mb-3 border">
        <div class="mb-5 text-darksilver"><p>Content rules:</p></div>
        <div class="mb-6">
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

        <div class="mb-3 w-full">
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

      <section class="p-3 mb-3 border">
        <div class="mb-5 text-darksilver"><p>Premium features:</p></div>
        <div class="mb-6 w-full">
          <TextField
            v-model="$v.fieldCustomDomain.$model"
            class="w-full text-sm"
            label="Custom Domain"
            type="websiteURL"
            :disabled="!isPremium"
            enterkeyhint="next"
            maxlength="2048"
            autocomplete="url"
            :error="
              !isPremium
                ? 'This is a premium feature'
                : getValidationMessage($v.fieldCustomDomain)
            "
          >
            <template #append-inner>
              <Tooltip
                :label="`Learn more`"
                :trigger="['hover', 'focus']"
                position="top"
              >
                <a
                  href="#"
                  target="_blank"
                  tabindex="0"
                  class="
                    mr-1
                    rounded-full
                    outline-none
                    ring-0
                    transition-all
                    cursor-pointer
                  "
                >
                  <IconInformationCircle
                    class="object-contain w-5 h-5 fill-current"
                  />
                </a>
              </Tooltip>
            </template>
          </TextField>
          <p v-if="isEditing" class="shrink pt-2 text-sm text-darksilver">
            Original URL: {{ fieldURL }}
          </p>
        </div>
        <div class="mb-6">
          <TextField
            v-model="$v.fieldGoogleAnalyticId.$model"
            :disabled="!isPremium"
            type="text"
            class="w-full text-sm"
            label="Google Analytic ID"
            placeholder="Enter your Google Analytics ID"
            :error="
              !isPremium
                ? 'This is a premium feature'
                : getValidationMessage($v.fieldGoogleAnalyticId)
            "
          >
            <template #append-inner>
              <Tooltip
                :label="`Learn more`"
                :trigger="['hover', 'focus']"
                position="top"
              >
                <a
                  href="#"
                  target="_blank"
                  tabindex="0"
                  class="
                    mr-1
                    rounded-full
                    outline-none
                    ring-0
                    transition-all
                    cursor-pointer
                  "
                >
                  <IconInformationCircle
                    class="object-contain w-5 h-5 fill-current"
                  />
                </a>
              </Tooltip>
            </template>
          </TextField>
        </div>
        <div class="mb-6">
          <CheckField
            v-model="passwordProtected"
            class="text-gray-100"
            @changed="onPasswordProtected"
            >Password Protected</CheckField
          >
          <TextField
            v-if="disabled"
            v-model="$v.fieldPassword.$model"
            type="password"
            class="w-full text-sm"
            label="Password"
            placeholder="Enter your password"
            :error="
              !isPremium
                ? 'This is a premium feature'
                : getValidationMessage($v.fieldPassword)
            "
          />
        </div>

        <div class="mb-6">
          <CheckField v-model="showInDirectory" class="text-gray-100"
            >Show in writer's directory for hiring</CheckField
          >
        </div>
      </section>

      <div
        class="
          flex flex-col
          pt-2
          mb-1
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

  components: {
    IconInformationCircle: () =>
      import('~/assets/icons/information-circle.svg?inline')
  },

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
    fieldCustomDomain: '',
    fieldURL: '',
    fieldTags: '',
    fieldCategory: '',
    fieldClient: '',
    shouldCustomize: false,
    showInDirectory: false,
    passwordProtected: false,
    fieldGoogleAnalyticId: '',
    fieldDescription: '',
    fieldPassword: '',
    fieldTopics: '',
    fieldTemplate: '',
    honeyPot: '',
    tags: [],
    topics: [],
    templates: []
  }),
  validations: {
    fieldGoogleAnalyticId: {},
    fieldCustomDomain: {},
    fieldTags: {},
    fieldTopics: {},
    fieldClient: {},
    fieldCategory: {},
    fieldTemplate: {},
    fieldPassword: {},
    showInDirectory: {},
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
    isPremium() {
      return this.currentUser?.isPremium
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
    onPasswordProtected() {
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
        this.fieldTemplate = this.portfolio?.template?.id
        this.fieldGoogleAnalyticId = this.portfolio?.googleAnalyticId
        this.fieldPassword = this.portfolio?.password
        this.fieldCustomDomain = this.portfolio?.domain
        this.showInDirectory = this.portfolio?.showInDirectory
      } else {
        this.fieldTitle = ''
        this.fieldURL = ''
        this.fieldDescription = ''
        this.fieldCustomDomain = ''
        this.fieldTemplate = ''
        this.fieldGoogleAnalyticId = ''
        this.fieldPassword = ''
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
          googleAnalyticId: this.fieldGoogleAnalyticId,
          clientId: this.fieldClient?.id ?? undefined,
          categoryId: this.fieldCategory?.id ?? undefined,
          tags: this.tags,
          topics: this.topics,
          password: this.fieldPassword,
          shouldCustomize: this.shouldCustomize,
          description: this.fieldDescription,
          showInDirectory: this.showInDirectory,
          customDomain:
            this.fieldCustomDomain === this.portfolio?.domain
              ? undefined
              : this.fieldCustomDomain,
          templateId:
            this.templateId && this.templateId.toLowerCase() === 'blank'
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
