<template>
  <div
    class="relative mb-8 w-full rounded-lg border shadow-sm transition-shadow"
    :class="{ 'bg-gray-100': disableField, 'bg-white': !disableField }"
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
                :class="{ hidden: !showEditingOptions }"
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
          <span class="pl-2 text-2xl font-bold text-gray-600">
            <slot name="title">Sample title</slot></span
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
          class="absolute top-auto right-0 z-30 text-sm rounded-lg"
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
    <div class="leading-4">
      <TextField
        v-model="model"
        :placeholder="placeholder"
        class="w-full h-full"
        :show-border="false"
        :is-editor="true"
        :required="isRequired"
        :rows="rows"
        :type="type"
        :accept="accept"
        :disabled="disableField"
        :error="error"
      ></TextField>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'input'
  },

  props: {
    shouldShowEditingOptions: {
      default: false,
      type: Boolean
    },

    editor: {
      type: Boolean,
      default: false
    },

    type: {
      type: String,
      default: 'text'
    },

    accept: {
      type: String,
      default: ''
    },

    isRequired: {
      default: true,
      type: Boolean
    },
    rows: {
      default: 0,
      type: Number
    },
    disabled: {
      default: false,
      type: Boolean
    },
    shouldShowOptions: {
      default: true,
      type: Boolean
    },
    error: { default: null, type: [String, Boolean] },
    value: {
      default: '',
      type: String
    },
    placeholder: {
      default: 'Sample placeholder',
      type: String
    }
  },

  data: () => ({
    showEditingOptions: false,
    showOptions: false,
    disableField: false
  }),

  computed: {
    model: {
      get() {
        return this.value
      },

      set(value) {
        this.$emit('input', value)
      }
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
    toggleEditingOptions() {
      this.showEditingOptions = !this.showEditingOptions
    },
    toggleOptions() {
      this.showOptions = !this.showOptions
    }
  }
}
</script>

<style>
</style>