<template>
  <div class="text-darksilver field topic-selector" :class="classes">
    <label :for="uid" class="flex">{{ label }}</label>
    <div
      class="
        bg-white
        focus-within:bg-white
        hover:bg-white
        border border-silver
        focus-within:border-btn-green
        hover:border-btn-green
        topic-selector--input
      "
    >
      <div
        v-for="(topic, i) in filteredTopics"
        :key="i"
        class="topic-selector--item"
      >
        <p class="p-1 m-2 text-white bg-gray-400">
          {{ topic && topic.name }}

          <i class="icon topic-selector--remove" @click="removeTag(i)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
              />
            </svg>
          </i>
        </p>
      </div>

      <AutocompleteField
        :id="uid"
        ref="elementRef"
        v-model="topic"
        class="my-2"
        hide-arrow-down
        :placeholder="placeholder"
        :label-class="labelClass"
        :rows="rows"
        :chip-style="chipStyle"
        :items="getTopics.items"
        :loading="$apollo.queries.getTopics.loading"
        :allow-creation="allowCreation"
        :hide-pencil-icon="hidePencilIcon"
        :disabled="disabled"
        :show-border="showBorder"
        @keyup.enter.prevent="addTag"
        @keyup.space="addTagKey"
        @keyup.188="addTagKey"
        @keyup.8="handleBackspace"
        @update:search="search = $event"
        @update:value="selectTag"
        @comma="selectTagKey"
        @comma:value="selectTagKey"
        @create="selectTag"
        @blur="onBlurAutocomplete"
        @focus="onFocusAutocomplete"
      />
    </div>
    <p v-if="error" class="validation-message">{{ error }}</p>
  </div>
</template>

<script>
// import gql from 'graphql-topic'
import { nextTick } from '@nuxtjs/composition-api'
import vClickOutside from 'v-click-outside'
import { GET_TOPICS, UPDATE_TOPIC } from '~/graphql'
export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  model: {
    prop: 'value',
    event: 'update:value'
  },

  props: {
    id: {
      type: String,
      default: ''
    },

    topicId: {
      type: String,
      default: null
    },

    shouldUpdate: {
      type: Boolean,
      default: true
    },

    shouldDelete: {
      type: Boolean,
      default: true
    },

    value: {
      type: [String, Object, Array],
      default: null
    },

    rows: {
      default: null,
      type: [String, Number]
    },

    label: {
      type: String,
      default: null
    },

    labelClass: {
      default: '',
      type: String
    },
    classes: {
      default: '',
      type: String
    },

    regex: {
      type: RegExp,
      default: () => {
        return /^[\s\S]*$/
      }
    },
    regexError: {
      type: String,
      default: 'Invalid format'
    },

    chipStyle: {
      type: [String, Array, Object],
      default: ''
    },

    error: {
      type: [String, Boolean],
      default: null
    },

    disabled: {
      type: Boolean,
      default: false
    },
    items: {
      type: [Array, Object],
      default: null
    },

    all: {
      type: Boolean,
      default: true
    },

    allowCreation: {
      type: Boolean,
      default: true
    },

    showBorder: {
      type: Boolean,
      default: false
    },

    hidePencilIcon: {
      type: Boolean,
      default: true
    },
    placeholder: {
      default: 'Sample placeholder',
      type: String
    }
  },

  apollo: {
    getTopics: {
      query: GET_TOPICS,
      variables() {
        return {
          skip: 0,
          size: 30,
          filters: {
            terms: this.search
            // all: this.all
          }
        }
      },
      update(data) {
        if (this.topicId) {
          return data.getTopics.filter((topic) => topic.id !== this.topicId)
        }
        return { items: data.getTopics.topics }
      },
      skip() {
        return !!this.items
      }
    }
  },
  data: () => ({
    showEditingOptions: false,
    showOptions: false,
    disableField: false,
    search: '',
    topic: '',
    showAutoComplete: false,
    topics: [],
    getTopics: {
      items: []
    }
  }),

  computed: {
    uid() {
      return this.$utils.uidGenerator(this.id)
    },

    filteredTopics() {
      return this.topics.filter((topic) => topic && topic.name)
    }
  },
  watch: {
    disabled: {
      handler(va) {
        this.disableField = va
      },
      immediate: true
    },

    value: {
      handler(va) {
        if (Array.isArray(va)) {
          const mapp = va.map((item) => ({ name: item }))
          this.topics = [...mapp, ...this.topics]
          return
        }
        this.topics.push(va)
      },
      immediate: true,
      deep: true
    }
  },

  methods: {
    validate(topic) {
      return this.regex.test(topic)
    },
    onClickShowAutoComplete() {
      if (this.disabled) return

      this.showAutoComplete = true

      nextTick(() => {
        const input = this.$el.querySelector('input')
        input?.focus()
      })
    },

    removeTag(index) {
      this.topics.splice(index, 1)
      this.$emit('deleted', this.topics)
    },

    selectTagKey(topic) {
      const name = topic?.name ?? topic
      if (!this.validate(name)) {
        this.$toast.negative(this.regexError)
      }

      this.selectTag(name.substring(0, name.length - 1))
    },

    async selectTag(topic) {
      if (this.shouldUpdate) {
        try {
          await this.$apollo.mutate({
            mutation: UPDATE_TOPIC,
            variables: {
              id: topic?.id,
              input: {
                name: topic?.name ?? topic
              }
            }
          })
        } catch (error) {
          this.$toast.negative(error.message)
        }
      }
      this.$emit('deleted', this.topics)
      this.showAutoComplete = false

      topic = topic?.name ? topic : { name: topic }
      const found = this.topics?.find(
        (topic1) => topic && topic1?.name === topic?.name
      )
      if (!found) this.$emit('update:value', topic)
    },

    onClickOutside() {
      this.showAutoComplete = false
      this.showOptions = false
      this.showEditingOptions = false
    },

    onStopPropagation(event) {
      if (this.disabled) return
      event.preventDefault()
      event.stopPropagation()
    },

    onFocusAutocomplete() {
      this.showAutoComplete = true
      this.$emit('focus')
    },

    toggleEditingOptions() {
      this.showEditingOptions = !this.showEditingOptions
    },
    toggleOptions() {
      this.showOptions = !this.showOptions
    },

    onBlurAutocomplete() {
      setTimeout(() => {
        this.showAutoComplete = false
      }, 150)

      this.$emit('blur')
    }
  }
}
</script>

<style scoped>
label {
  margin-bottom: 8px;
  display: block;
}
.topic-selector--input {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;

  /* 1px solid #ccc; */
}
.topic-selector--item {
  margin: 0;
  padding: 0;
  user-select: none;
}
.topic-selector--remove {
  display: inline-block;
  vertical-align: text-top;
  vertical-align: middle;
  cursor: pointer;
}

.topic-selector--remove svg {
  fill: currentColor;
}
.topic-selector-input {
  margin-bottom: 0;
  min-width: 60px;
  border: none;
  outline: none;
  flex-grow: 1;
  background: transparent;
}
</style>