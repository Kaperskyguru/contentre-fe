<template>
  <div class="field tag-selector" :class="classes">
    <label :for="id">{{ label }}</label>
    <div class="tag-selector--input">
      <div v-for="(tag, i) in filteredTags" :key="i" class="tag-selector--item">
        <p class="p-1 mx-2 mt-5 text-white bg-primary-teal">
          {{ tag && tag.name }}

          <i class="icon tag-selector--remove" @click="removeTag(i)">
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

      <!-- <input
        :id="name"
        v-model="tag"
        type="text"
        :name="name"
        class="tag-selector-input"
        @keyup.enter.prevent="addTag"
        @keyup.space="selectTagKey"
        @keyup.188="selectTagKey"
        @keyup.8="handleBackspace"
      /> -->
      <AutocompleteField
        :id="id"
        ref="elementRef"
        v-model="tag"
        class="w-full"
        hide-arrow-down
        :placeholder="placeholder"
        :label="label"
        :label-class="labelClass"
        :rows="rows"
        :chip-style="chipStyle"
        :items="getTags.items"
        :loading="$apollo.queries.getTags.loading"
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
// import gql from 'graphql-tag'
import { nextTick } from '@nuxtjs/composition-api'
import vClickOutside from 'v-click-outside'
import { GET_TAGS, UPDATE_TAG } from '~/graphql'
export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  model: {
    prop: 'value',
    event: 'update:value'
  },

  props: {
    hideArrowDown: {
      type: Boolean,
      default: true
    },

    id: {
      type: String,
      default: ''
    },

    tagId: {
      type: String,
      default: null
    },
    shouldShowEditingOptions: {
      default: false,
      type: Boolean
    },

    shouldUpdate: {
      type: Boolean,
      default: true
    },

    isRequired: {
      default: true,
      type: Boolean
    },
    value: {
      type: [String, Object],
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

    fakeInput: {
      default: false,
      type: Boolean
    },

    shouldShowOptions: {
      default: true,
      type: Boolean
    },
    placeholder: {
      default: 'Sample placeholder',
      type: String
    }
  },

  apollo: {
    getTags: {
      query: GET_TAGS,
      variables() {
        return {
          skip: 0,
          size: 30,
          filters: {
            terms: this.search,
            all: this.all
          }
        }
      },
      update(data) {
        if (this.tagId) {
          return data.getTags.filter((tag) => tag.id !== this.tagId)
        }
        return { items: data.getTags.tags }
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
    tag: '',
    showAutoComplete: false,
    tags: [],
    getTags: {
      items: []
    }
  }),

  computed: {
    displayTag() {
      return this.value?.name ?? this.value ?? ''
    },

    joinTags() {
      return (
        this.filteredTags && this.filteredTags.map((tag) => tag.name).join(',')
      )
    },

    filteredTags() {
      return this.tags.filter((tag) => tag && tag.name)
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
        this.tags.push(va)
      },
      immediate: true,
      deep: true
    }
  },

  mounted() {
    this.tags = []
  },

  methods: {
    validate(tag) {
      return this.regex.test(tag)
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
      this.tags.splice(index, 1)
    },

    selectTagKey(tag) {
      const name = tag?.name ?? tag
      if (!this.validate(name)) {
        this.$toast.negative(this.regexError)
      }

      this.selectTag(name.substring(0, name.length - 1))
    },

    async selectTag(tag) {
      if (this.shouldUpdate) {
        try {
          await this.$apollo.mutate({
            mutation: UPDATE_TAG,
            variables: {
              id: tag.id,
              input: {
                name: tag?.name ?? tag
              }
            }
          })
        } catch (error) {
          this.$toast.negative(error.message)
        }
      }

      this.showAutoComplete = false

      tag = tag?.name ? tag : { name: tag }
      const found = this.tags.find((tag1) => tag && tag1.name === tag.name)
      if (!found) this.$emit('update:value', tag)
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
.tag-selector--input {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  border: 1px solid #ccc;
}
.tag-selector--item {
  margin: 0;
  padding: 0;
  user-select: none;
}
.tag-selector--remove {
  display: inline-block;
  vertical-align: text-top;
  vertical-align: middle;
  cursor: pointer;
}

.tag-selector--remove svg {
  fill: currentColor;
}
.tag-selector-input {
  margin-bottom: 0;
  min-width: 60px;
  border: none;
  outline: none;
  flex-grow: 1;
  background: transparent;
}
</style>