<template>
  <FloatingPanel v-model="open" from="right">
    <template #header>
      <strong>
        {{ isEditing ? 'Edit content' : 'Create content' }}
      </strong>
    </template>
    <Form class="w-full" @submit.prevent="updateContent">
      <div class="mb-6">
        <TextField
          v-model="$v.fieldTitle.$model"
          type="text"
          class="w-full text-sm"
          label="Title"
          placeholder="Enter content title"
          :error="getValidationMessage($v.fieldTitle)"
        />
      </div>
      <input
        v-model="$v.honeyPot.$model"
        type="text"
        class="absolute invisible"
      />

      <div class="mb-6">
        <CategoriesAutocomplete
          v-model="$v.fieldCategory.$model"
          :fake-input="true"
          :options="{
            fakeInput: true,
            isGrid: true
          }"
          :should-update="false"
          :allow-creation="true"
          :show-border="true"
          :item="content"
          label="Category"
          placeholder="Enter content category"
          :error="getValidationMessage($v.fieldCategory)"
        />
      </div>

      <!-- <div class="flex "> -->
      <div class="mb-6 w-full">
        <TagsAutocomplete
          key="tagAutocomplete"
          v-model="$v.fieldTags.$model"
          class="w-full"
          placeholder="Add a tag..."
          label="Tag"
          :content-id="contentId"
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
          :content-id="contentId"
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
        <div class="basis-1/2 mb-6 w-full">
          <DropdownField
            v-model="$v.fieldVisibility.$model"
            :items="visibilityTypes"
            label="Visibility"
            :error="getValidationMessage($v.fieldVisibility)"
          >
            <option
              v-for="(item, itemIndex) in visibilityTypes"
              :key="itemIndex"
              :value="item"
            >
              {{ item }}
            </option>
          </DropdownField>
        </div>

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

      <div class="flex mb-6">
        <div class="basis-1/2 sm:w-full">
          <DropdownField
            v-model="$v.fieldPaymentType.$model"
            :items="paymentTypes"
            label="Payment Type"
            :error="getValidationMessage($v.fieldPaymentType)"
            @update:value="selectedPayment"
          >
            <option
              v-for="(item, itemIndex) in paymentTypes"
              :key="itemIndex"
              :value="item"
            >
              {{ item }}
            </option>
          </DropdownField>
        </div>
        <div class="basis-1/2 ml-1 sm:w-full">
          <TextField
            v-model="$v.fieldAmount.$model"
            type="text"
            class="w-full text-sm"
            label="Amount"
            :disabled="disableAmount"
            placeholder="Enter content amount"
            :error="getValidationMessage($v.fieldAmount)"
          />
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
          :disabled="!fullContent"
          :to="{ path: `/contents/${contentId}/` }"
          appearance="secondary"
          class="w-full"
        >
          {{ 'Edit full content' }}
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
    prop: 'contentId',
    event: 'update:contentId'
  },
  props: {
    contentId: {
      type: String,
      default: ''
    }
  },

  data: () => ({
    tags: [],
    topics: [],
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
    fullContent: null,
    paymentTypes: ['ARTICLE', 'MONTHLY', 'ONETIME'],
    visibilityTypes: ['PUBLIC', 'PRIVATE', 'TEAM', 'UNLISTED'],
    statusTypes: ['PUBLISHED', 'DRAFT', 'DELETED'],
    disableAmount: false
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
      return !!this.contentId
    },
    open: {
      get() {
        return !!this.contentId
      },
      set(value) {
        this.$emit('update:contentId', null)
      }
    }
  },
  watch: {
    content: {
      handler(newItem) {
        if (this.content) {
          this.fieldTitle = newItem?.title
          this.fullContent = newItem?.content
          this.fieldTopics = newItem?.topics
          this.fieldTags = newItem?.tags
          this.fieldAmount = newItem?.amount
          this.fieldCategory = newItem?.category?.name
          this.fieldComment = newItem?.comments
          this.fieldVisibility = newItem?.visibility
          this.fieldStatus = newItem?.status
          this.fieldPaymentType = newItem?.paymentType
        }
      },
      deep: true,
      immediate: true
    }
  },
  apollo: {
    content: {
      query: GET_CONTENT,
      update(data) {
        return data.getContent
      },
      variables() {
        return {
          id: this.contentId
        }
      },
      skip() {
        return !this.contentId
      }
    }
  },

  methods: {
    selectedPayment(type) {
      if (type === 'MONTHLY') {
        // Disable only if not a new month
        this.disableAmount = true
        this.fieldAmount = this.content?.client?.amount
      } else if (type === 'ONETIME') {
        this.fieldAmount = this.content?.client?.amount
        this.disableAmount = true
      } else {
        this.disableAmount = false
        this.fieldAmount = 0
      }
    },
    async updateContent() {
      if (this.honeyPot) return

      if (await this.isValidationInvalid()) return

      this.sending = true

      const input = {
        title: this.fieldTitle,
        topics: this.topics.filter((item) => item),
        tags: this.tags.filter((item) => item),
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
            id: this.contentId,
            input
          }
        })
        this.$toast.positive('Content updated successfully')
        this.sending = false
        this.open = false
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
        this.open = false
      }
    },

    onUpdateTopics(topic) {
      this.topics.push(topic?.name)
    },
    onUpdateTags(tag) {
      this.tags.push(tag?.name)
    },
    removeTopic(topics) {
      this.topics = topics.map((item) => item.name)
    },
    removeTag(tags) {
      this.tags = tags.map((item) => item.name)
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