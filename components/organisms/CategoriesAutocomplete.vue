<template>
  <div
    v-if="!fakeInput"
    v-click-outside="onClickOutside"
    class="relative mb-8 bg-white rounded-lg border shadow-sm transition-shadow"
  >
    <div
      class="
        flex
        justify-between
        items-center
        px-4
        text-gray-900
        border-b-2 border-dashed
      "
    >
      <div class="flex flex-col items-center">
        <div class="flex relative">
          <span
            v-if="shouldShowEditingOptions"
            class="relative top-2"
            style="top: 7px"
          >
            <li
              class="block relative"
              :x-data="showEditingOptions"
              @click.prevent="toggleEditingOptions"
            >
              <svg
                class="shrink-0 w-8 h-6 text-gray-500"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                ></path>
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>

              <div
                class="absolute top-auto left-0 z-30 mt-1 rounded-lg"
                :x-show="showEditingOptions"
                x-transition:enter="transition ease duration-300 transform"
                x-transition:enter-start="opacity-0 translate-y-2"
                x-transition:enter-end="opacity-100 translate-y-0"
                x-transition:leave="transition ease duration-300 transform"
                x-transition:leave-start="opacity-100 translate-y-0"
                x-transition:leave-end="opacity-0 translate-y-4"
                :class="{ hidden: showEditingOptions }"
              >
                <div
                  class="
                    py-2
                    pr-24
                    pl-2
                    text-gray-700
                    bg-white
                    rounded-lg
                    border
                  "
                >
                  <div class="flex px-3 text-gray-700">
                    <div class="flex flex-wrap">
                      <div class="space-y-3 font-medium">
                        <p>Color</p>
                        <p>Heading</p>
                        <p>Link</p>
                        <p>Text Style</p>
                        <p>Font</p>
                        <p>Font size</p>
                        <p>List</p>
                        <p>File</p>
                        <p>Delete</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </span>
          <span class="pl-2 text-2xl font-bold text-gray-600"
            ><slot name="title">Sample title</slot></span
          >
          <span
            v-if="isRequired"
            class="relative pl-4 text-xs text-teal-300 uppercase"
            style="top: 10px"
            >Required</span
          >
        </div>
      </div>
      <li
        v-if="!shouldShowOptions"
        class="block relative py-9 mx-1 cursor-pointer"
      ></li>
      <li
        v-if="shouldShowOptions"
        class="block relative cursor-pointer"
        :x-data="showOptions"
        @click.prevent="toggleOptions"
      >
        <span class="mx-1">
          <svg
            class="shrink-0 w-8 h-6 text-gray-500"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            ></path>
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </span>
        <div
          class="absolute top-auto right-0 z-50 text-sm rounded-lg"
          style="right: -14px; top: 55px"
          :x-show="showOptions"
          x-transition:enter="transition ease duration-300 transform"
          x-transition:enter-start="opacity-0 translate-y-2"
          x-transition:enter-end="opacity-100 translate-y-0"
          x-transition:leave="transition ease duration-300 transform"
          x-transition:leave-start="opacity-100 translate-y-0"
          x-transition:leave-end="opacity-0 translate-y-4"
          :class="{ hidden: !showOptions }"
        >
          <div
            class="
              py-4
              pr-24
              pl-8
              mr-0
              text-gray-700
              bg-white
              rounded-lg
              border
            "
          >
            <div class="flex justify-between w-full text-gray-700">
              <div class="flex flex-wrap">
                <ul class="space-y-3 dark:text-white">
                  <li
                    class="font-medium"
                    @click.prevent="disableField = !disableField"
                  >
                    <!-- <a href="#" class="flex"> -->
                    {{ disableField ? 'Enable' : 'Disable' }}
                    <!-- </a> -->
                  </li>
                  <li class="font-medium">
                    <a href="#" class="flex"> Archive </a>
                  </li>
                  <li class="font-medium">
                    <a href="#" class="flex"> Duplicate </a>
                  </li>
                  <li class="font-medium">
                    <a href="#" class="flex"> Delete </a>
                  </li>
                  <li class="font-medium">
                    <a href="#" class="flex"> Settings </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </li>
    </div>
    <div class="flex leading-4 text-gray-400">
      <!-- <p>Related tags for the articles</p> -->
      <Tooltip
        v-if="!showAutoComplete && displayCategory"
        key="label"
        :trigger="['hover']"
        :label="displayCategory"
        :disabled="!displayCategory"
      >
        <span
          class="
            overflow-hidden
            pt-5
            pl-5
            w-full
            leading-snug
            text-gray-800 text-ellipsis
            whitespace-nowrap
            cursor-pointer
          "
          :class="[
            {
              'text-gray-400': !displayCategory
            }
          ]"
          @click="onClickShowAutoComplete"
        >
          {{ displayCategory }}
        </span>
      </Tooltip>

      <AutocompleteField
        v-else
        :id="id"
        ref="elementRef"
        class="w-full"
        hide-arrow-down
        :placeholder="placeholder"
        :value="value"
        :label="label"
        :label-class="labelClass"
        :chip-style="chipStyle"
        :items="items ? items : getCategories.items"
        :allow-creation="allowCreation"
        :hide-pencil-icon="hidePencilIcon"
        :disabled="disabled"
        :show-border="showBorder"
        :is-input-border-enabled="isInputBorderEnabled"
        @update:search="search = $event"
        @update:value="selectCategory"
        @create="selectCategory"
        @blur="onBlurAutocomplete"
        @focus="onFocusAutocomplete"
      />
    </div>
    <div v-if="error" class="mt-3">
      <small class="ml-5 font-gilroy text-xs font-bold text-red-600">{{
        error
      }}</small>
    </div>
  </div>

  <AutocompleteField
    v-else
    :id="id"
    ref="elementRef"
    :placeholder="placeholder"
    :value="value"
    :label="label"
    :label-class="labelClass"
    :chip-style="chipStyle"
    :items="items ? items : getCategories.items"
    :allow-creation="allowCreation"
    :loading="$apollo.queries.getCategories.loading"
    :hide-pencil-icon="hidePencilIcon"
    :disabled="disabled"
    :show-border="showBorder"
    @update:search="search = $event"
    @update:value="selectCategory"
    @create="selectCategory"
    @blur="onBlurAutocomplete"
    @focus="onFocusAutocomplete"
  />
</template>

<script>
import { nextTick } from '@nuxtjs/composition-api'
import vClickOutside from 'v-click-outside'
import { GET_CATEGORIES, UPDATE_CONTENT } from '~/graphql'
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

    items: {
      type: [Array, Object],
      default: null
    },

    isInputBorderEnabled: {
      type: Boolean,
      default: true
    },

    fakeInput: {
      default: false,
      type: Boolean
    },

    categoryId: {
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

    label: {
      type: String,
      default: null
    },

    labelClass: {
      default: '',
      type: String
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

    allowCreation: {
      type: Boolean,
      default: true
    },

    content: {
      type: Object,
      default: null
    },
    showBorder: {
      type: Boolean,
      default: false
    },

    hidePencilIcon: {
      type: Boolean,
      default: true
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
    getCategories: {
      query: GET_CATEGORIES,
      variables() {
        return {
          skip: 0,
          size: 30
        }
      },
      update(data) {
        return {
          items: data.getCategories.categories ?? [],
          total: data.getCategories.meta.total
        }
      },
      skip() {
        return !!this.items || this.items === null
      }
    }
  },
  data: () => ({
    showEditingOptions: false,
    showOptions: false,
    disableField: false,
    search: '',
    showAutoComplete: false,
    getCategories: {
      items: [],
      total: 0
    }
  }),

  computed: {
    displayCategory() {
      return this.value?.name ?? this.value ?? ''
    }
  },
  watch: {
    disabled: {
      handler(va) {
        this.disableField = this.disabled
      },
      immediate: true
    }
  },

  methods: {
    onClickShowAutoComplete() {
      if (this.disabled) return

      this.showAutoComplete = true

      nextTick(() => {
        const input = this.$el.querySelector('input')
        input?.focus()
      })
    },
    async selectCategory(category) {
      if (this.shouldUpdate) {
        try {
          await this.$apollo.mutate({
            mutation: UPDATE_CONTENT,
            refetchQueries: ['getContents'],
            variables: {
              id: this.content?.id,
              input: {
                category:
                  category?.name === null ? '' : category?.name ?? category
              }
            },
            update: (
              cache,
              { data: { updateTransaction: transactionData } }
            ) => {
              // updateCategoryCache(cache, category?.id)
              // let categoryRef = null
              // if (transactionData?.category?.id) {
              //   categoryRef = cache.writeFragment({
              //     data: {
              //       ...transactionData?.category,
              //       color: null
              //     },
              //     fragment: gql`
              //       fragment NewCategory on Category {
              //         id
              //         color
              //         name
              //       }
              //     `
              //   })
              // }
              // cache.modify({
              //   id: `Transaction:${transactionData.id}`,
              //   fields: {
              //     category: () => categoryRef
              //   }
              // })
            },
            optimisticResponse: {
              updateCategory: {
                ...this.transaction,
                __typename: 'Category',
                category: category?.name
                  ? category
                  : {
                      name: category,
                      id: null,
                      color: null,
                      totalContents: 0,
                      createdAt: null,
                      updatedAt: null
                    }
              }
            }
          })
        } catch (error) {
          this.$toast.negative(error.message)
        }
      }
      this.showAutoComplete = false
      this.$emit('update:value', category)
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

<style>
</style>