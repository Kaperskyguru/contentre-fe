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
          <!-- <template #prepend-inner>
            <span class="pl-2 w-full text-darksilver">{{
              $v.fieldURL.$model
            }}</span>
          </template> -->
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

      <section v-if="!isEditing" class="mb-6">
        <DropdownField
          v-model="$v.fieldTemplate.$model"
          type="text"
          class="w-full text-sm text-darksilver"
          label="Description"
          placeholder="Select your template"
          :error="getValidationMessage($v.fieldTemplate)"
        >
          <option value="blank">Create Blank</option>
          <!-- <option value="1">Sample 1</option>
          <option value="2">Sample 2</option>
          <option value="3">Sample 3</option>
          <option value="4">Sample 4</option> -->
        </DropdownField>
      </section>

      <div
        class="
          flex flex-col
          pt-2
          mb-6
          space-y-4 space-x-0
          md:flex-row md:space-y-0 md:space-x-4
        "
      >
        <Button v-if="isEditing" appearance="secondary" class="w-full">
          {{ 'Edit Page' }}
        </Button>

        <Button class="w-full" type="submit" :waiting="sending">
          {{ isEditing ? 'Update' : 'Create' }}
        </Button>
      </div>

      <Hyperlink
        v-if="isEditing"
        target="_blank"
        class="text-red-700"
        :to="{ path: `/portfolios/c/${getTemplateId}` }"
      >
        Customize in new page
      </Hyperlink>
    </form>
  </FloatingPanel>
</template>

<script>
import { CREATE_PORTFOLIO, GET_PORTFOLIO, UPDATE_PORTFOLIO } from '~/graphql'
import { currentUser } from '~/components/mixins/currentUser'
import { required, hasNoSpace } from '~/plugins/validators'

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
    portfolio: {},
    sending: false,
    fieldTitle: '',
    fieldURL: '',
    fieldDescription: '',
    fieldTemplate: '',
    honeyPot: ''
  }),
  validations: {
    fieldURL: { hasNoSpace },
    fieldTemplate: {},
    fieldTitle: {
      required
    },
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
    }
  },

  computed: {
    getTemplateId() {
      return this.portfolio?.template?.id
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
    resetForm() {
      this.$v.$reset()

      if (this.visible && this.portfolio) {
        this.fieldTitle = this.portfolio?.title ?? ''
        this.fieldURL = this.portfolio?.url
        this.fieldDescription = this.portfolio?.description
        this.fieldTemplate = this.portfolio?.template?.title
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

        // const url = process.server
        //   ? 'https://contentre.io'
        //   : `${window.location.protocol}//${window.location.host}`

        const input = {
          title: this.fieldTitle,
          // url: `${url}/${currentUser.username}?type=${this.fieldURL}`,
          description: this.fieldDescription,
          templateId:
            this.fieldTemplate === 'blank' ? undefined : this.fieldTemplate
        }

        if (isAnyDirty) {
          if (this.isEditing) {
            this.$emit('updated', await this.updatePortfolio(input))
          } else {
            this.$emit('created', await this.createPortfolio(input))
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
