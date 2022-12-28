<template>
  <FloatingPanel v-model="open" from="right">
    <template #header>
      <strong>
        {{ isEditing ? 'Edit outline' : 'Create outline' }}
      </strong>
    </template>
    <Form class="w-full" @submit.prevent="updateOutline">
      <div class="mb-6">
        <TextField
          v-model="$v.fieldTitle.$model"
          type="text"
          class="w-full text-sm"
          label="Title"
          placeholder="Enter outline title"
          :error="getValidationMessage($v.fieldTitle)"
        />
      </div>
      <input
        v-model="$v.honeyPot.$model"
        type="text"
        class="absolute invisible"
      />

      <div class="mb-6 w-full">
        <TagsAutocomplete
          key="tagAutocomplete"
          v-model="$v.fieldTags.$model"
          class="w-full"
          placeholder="Add a tag..."
          label="Tag"
          :outline-id="outlineId"
          :should-update="false"
          :is-required="false"
          :error="getValidationMessage($v.fieldTags)"
          @deleted="removeTag"
          @update:value="onUpdateTags"
          @focus="onFocusAutocomplete"
          @blur="onBlurAutocomplete"
        ></TagsAutocomplete>
      </div>

      <div class="mb-6 w-full">
        <TopicsAutocomplete
          key="topicAutocomplete"
          v-model="$v.fieldTopics.$model"
          class="mr-1 w-full"
          placeholder="Add a topic..."
          label="Topic"
          :outline-id="outlineId"
          :should-update="false"
          :is-required="false"
          :error="getValidationMessage($v.fieldTopics)"
          :is-input-border-enabled="false"
          @update:value="onUpdateTopics"
          @deleted="removeTopic"
          @focus="onFocusAutocomplete"
          @blur="onBlurAutocomplete"
        ></TopicsAutocomplete>
      </div>

      <div class="flex justify-between mb-6 space-x-2 sm:flex-col md:flex-row">
        <div class="basis-1/2 w-full">
          <DropdownField
            v-model="$v.fieldStatus.$model"
            :items="statusTypes"
            label="Status"
            :error="getValidationMessage($v.fieldStatus)"
          >
            <option
              v-for="(item, itemIndex) in statusTypes"
              :key="itemIndex"
              :value="item"
            >
              {{ item }}
            </option>
          </DropdownField>
        </div>
      </div>

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
          v-if="isEditing"
          type="link"
          :disabled="!fullOutline"
          :to="{ path: `/outlines/add?id=${outlineId}&type=article` }"
          appearance="secondary"
          class="w-full"
        >
          {{ 'Edit full outline' }}
        </Button>

        <Button type="submit" class="w-full">
          {{ 'Update' }}
        </Button>
      </div>
    </Form>
  </FloatingPanel>
</template>

<script>
import { GET_CONTENT, UPDATE_CONTENT } from '~/graphql'
import { decimal } from '~/plugins/validators'
export default {
  model: {
    prop: 'outlineId',
    event: 'update:outlineId'
  },
  props: {
    outlineId: {
      type: String,
      default: ''
    }
  },

  data: () => ({
    showAutoComplete: false,
    fieldComment: '',
    fieldTitle: '',
    fieldCategory: '',
    fieldVisibility: '',
    fieldStatus: '',
    fieldPaymentType: '',
    fieldTopics: '',
    fieldAmount: '',
    fieldTags: '',
    honeyPot: '',
    fullOutline: null,
    paymentTypes: ['ARTICLE', 'MONTHLY', 'ONETIME'],
    visibilityTypes: ['PUBLIC', 'PRIVATE', 'TEAM', 'UNLISTED'],
    statusTypes: ['PUBLISHED', 'DRAFT', 'DELETED'],
    disableAmount: false,
    tags: [],
    topics: []
  }),
  validations: {
    fieldStatus: {},
    fieldTitle: {},
    fieldComment: {},
    fieldVisibility: {},
    fieldTopics: {},
    fieldTags: {},
    fieldPaymentType: {},
    fieldAmount: {
      decimal
    },
    fieldCategory: {},
    honeyPot: {}
  },
  computed: {
    isEditing() {
      return !!this.outlineId
    },
    open: {
      get() {
        return !!this.outlineId
      },
      set(value) {
        this.$emit('update:outlineId', null)
      }
    }
  },
  watch: {
    outline: {
      handler(newItem) {
        if (this.outline) {
          this.fieldTitle = newItem?.title
          this.fullOutline = newItem?.outline
          this.fieldTopics = newItem?.topics
          this.fieldTags = newItem?.tags
          this.fieldVisibility = newItem?.visibility
          this.fieldStatus = newItem?.status
        }
      },
      deep: true,
      immediate: true
    }
  },
  apollo: {
    outline: {
      query: GET_CONTENT,
      update(data) {
        return data.getOutline
      },
      variables() {
        return {
          id: this.outlineId
        }
      },
      skip() {
        return !this.outlineId
      }
    }
  },

  methods: {
    selectedPayment(type) {
      if (type === 'MONTHLY') {
        // Disable only if not a new month
        this.disableAmount = true
        this.fieldAmount = this.outline?.client?.amount
      } else if (type === 'ONETIME') {
        this.fieldAmount = this.outline?.client?.amount
        this.disableAmount = true
      } else {
        this.disableAmount = false
        this.fieldAmount = 0
      }
    },
    async updateOutline() {
      if (this.honeyPot) return

      if (await this.isValidationInvalid()) return

      this.sending = true

      const input = {
        title: this.fieldTitle,
        topics:
          (this.topics && this.topics.filter((item) => item)) ?? undefined,
        tags: (this.tags && this.tags.filter((item) => item)) ?? undefined,
        amount: Number(this.fieldAmount),
        category: this.fieldCategory?.name ?? this.fieldCategory,
        comments: Number(this.fieldComment),
        visibility: this.fieldVisibility,
        paymentType: this.fieldPaymentType,
        status: this.fieldStatus
      }

      try {
        await this.$apollo.mutate({
          mutation: UPDATE_CONTENT,
          variables: {
            id: this.outlineId,
            input
          }
        })
        this.$toast.positive('Outline updated successfully')
        this.sending = false
        this.open = false
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
        this.open = false
      }
    },

    onUpdateTopics(topic) {
      if (this.topics) this.topics.push(topic?.name)
    },
    onUpdateTags(tag) {
      if (this.tags) this.tags.push(tag?.name)
    },
    removeTopic(topics) {
      console.log(topics)
      this.topics = topics && topics.map((item) => item.name)
    },
    removeTag(tags) {
      this.tags = (tags && tags.map((item) => item.name)) ?? []
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