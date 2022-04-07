<template>
  <div
    :id="`${uid}-container`"
    ref="elementRef"
    v-click-outside="onClickOutside"
    class="relative autocomplete-field"
    :class="[$attrs.class]"
    @keydown.esc="$emit('blur')"
  >
    <TextField
      :id="uid"
      ref="textFieldRef"
      v-model="textField"
      class="w-full"
      :name="uid"
      :autocomplete="`new-${uid}`"
      :clearable="!!value && !disabled"
      :container-class="computedContainerClass"
      :label="label"
      :label-class="labelClass"
      :placeholder="!value ? placeholder : null"
      :enterkeyhint="enterkeyhint"
      :field-class="fieldClass"
      :disabled="disabled"
      :show-border="showBorder"
      :error="error"
      @keypress.enter.stop.prevent="createItem()"
      @keydown="onKeyDown"
      @icon:click="$emit('update:value', null)"
      @focus="onFocusTextField"
      @blur="lostFocus"
    >
      <template #append-inner>
        <IconPencil
          v-if="!value && !hidePencilIcon && !loading"
          class="mr-2 h-3.5 pointer-events-none"
        />
        <!-- <Loading v-if="loading" size="xs" class="mr-1.5 pointer-events-none" /> -->
        <IconArrowDown
          v-else-if="!value && !hideArrowDown"
          class="mr-3 w-3 h-3 text-gray-400 pointer-events-none fill-current"
        />
      </template>
      <template v-if="value" #prepend-inner>
        <Chip
          :value="value"
          :avatar="(value || {})[avatarKey]"
          size="small"
          :chip-class="[
            'w-full',
            {
              'relative top-[0.15rem] mx-1': !disabled,
              '!bg-none relative top-[0.15rem] ml-1': disabled
            },
            $utils.checkCallback(chipClass)
          ]"
          :style="$utils.checkCallback(chipStyle)"
        />
      </template>
    </TextField>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-show="open && !loading && (itemsFiltered.length || canCreate)"
        class="
          absolute
          z-50
          focus:z-50
          w-full
          bg-white
          border border-darksilver
          focus:outline-none
          ring-1
          focus:ring-2
          ring-black ring-opacity-5
          shadow
          origin-top
          cursor-default
        "
      >
        <ul
          aria-haspopup="listbox"
          aria-activedescendant
          tabindex="-1"
          role="listbox"
          class="overflow-y-auto max-h-40"
        >
          <li
            v-if="canCreate"
            id="create"
            ref="liCreateItemRef"
            class="
              py-2
              px-3
              w-full
              leading-5
              text-left text-black
              hover:bg-linen
              focus:bg-linen focus:outline-none
              cursor-pointer
              select-none
            "
            :class="{ 'font-bold': !isAnyItemBold && !!textField }"
            :value="textField"
            role="option"
            tabindex="0"
            @focus="itemFocused($event)"
            @blur="itemUnfocused"
            @keydown.up="focus"
            @keydown.down="focusNext($event)"
            @keypress.enter.prevent="createItem()"
            @click="createItem()"
          >
            Add {{ textField }}
          </li>
          <li
            v-for="item in itemsFiltered"
            :id="`select-button-${uid}-${item.id}`"
            :key="item.id"
            ref="itemRefs"
            :class="{ 'font-bold': isItemBold(item) }"
            class="
              flex
              items-center
              py-2
              px-3
              w-full
              leading-5
              text-left text-black
              hover:bg-primary-teal
              focus:bg-linen focus:outline-none
              cursor-pointer
              select-none
            "
            value="1"
            role="option"
            tabindex="0"
            @focus="itemFocused($event)"
            @blur="itemUnfocused"
            @keydown.up="focusPrevious($event)"
            @keydown.down="focusNext($event)"
            @keypress.enter.stop.prevent="selectItem(item)"
            @click="selectItem(item)"
          >
            <img
              v-if="item[avatarKey]"
              :src="item[avatarKey]"
              width="20"
              height="20"
              class="mr-3"
            />
            <template v-if="item[colorKey]">
              <Chip
                :value="item[titleKey]"
                :style="{ background: `#${item[colorKey]}80` }"
                size="small"
                class="-my-1 -mx-2"
              />
            </template>
            <template v-else>
              {{ item.nickname || item[titleKey] }}
            </template>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
import { debounce } from '~/plugins/utils'
import Chip from '~/components/atoms/Chip.vue'
import TextField from '~/components/atoms/TextField.vue'

export default {
  name: 'AutocompleteField',

  components: {
    Chip,
    TextField,
    // Loading: () => import('~/components/molecules/Loading.vue'),
    IconArrowDown: () => import('~/assets/icons/arrow-down.svg?inline'),
    IconPencil: () => import('~/assets/icons/pencil.svg?inline')
  },

  directives: {
    clickOutside: vClickOutside.directive
  },

  inheritAttrs: false,

  model: {
    prop: 'value',
    event: 'update:value'
  },

  props: {
    id: {
      type: String,
      default: ''
    },

    items: {
      type: Array,
      default: () => []
    },
    showBorder: {
      type: Boolean,
      default: false
    },

    titleKey: {
      type: String,
      default: 'name'
    },

    avatarKey: {
      type: String,
      default: 'avatar'
    },

    colorKey: {
      type: String,
      default: 'color'
    },

    value: {
      type: [String, Object],
      default: null
    },

    disabled: {
      type: Boolean,
      default: false
    },

    hidePencilIcon: {
      type: Boolean,
      default: true
    },

    hideArrowDown: {
      type: Boolean,
      default: false
    },

    label: {
      type: String,
      default: null
    },

    labelClass: {
      default: '',
      type: String
    },

    placeholder: {
      type: String,
      default: null
    },

    error: {
      type: [String, Boolean],
      default: null
    },

    enterkeyhint: {
      type: String,
      default: ''
    },

    casing: {
      type: String,
      validate: (value) => ['uppercase', 'lowercase'].includes(value),
      default: null
    },

    containerClass: {
      type: String,
      default: 'overflow-hidden'
    },

    chipClass: {
      type: [String, Array, Object],
      default: ''
    },

    chipStyle: {
      type: [String, Array, Object],
      default: ''
    },

    fieldClass: {
      type: [String, Object],
      default: ''
    },

    loading: {
      type: Boolean,
      default: false
    },

    allowCreation: {
      type: Boolean,
      default: true
    },

    isInputBorderEnabled: {
      type: Boolean,
      default: true
    },

    addText: {
      type: String,
      default: 'addClient'
    }
  },

  emits: ['update:value', 'update:search', 'create', 'blur', 'focus'],

  data: () => ({
    uid: '',
    open: false,
    shouldClose: false,
    currentFocus: null,
    textField: ''
  }),

  computed: {
    computedContainerClass() {
      if (!this.isInputBorderEnabled) {
        return this.containerClass.concat(
          ' ',
          'border-transparent duration-300 !ring-0 mt-0 w-full'
        )
      }

      return this.containerClass
    },

    itemsFiltered() {
      return this.items.filter((item) => !!item && !!item[this.titleKey])
    },

    itemFound() {
      return this.itemsFiltered.find(
        (item) =>
          (item[this.titleKey] || '').toUpperCase() ===
          this.textField.toUpperCase()
      )
    },

    canCreate() {
      return this.allowCreation && this.textField?.length > 0 && !this.itemFound
    },

    isAnyItemBold() {
      return this.itemsFiltered.some((item) => this.isItemBold(item))
    }
  },

  watch: {
    textField: debounce(function (newVal) {
      if (newVal) {
        this.$emit('update:search', this.textField)
      }
    }, 500)

    // value: {
    // handler(newVal) {
    //   console.log(newVal)
    //   this.textField = newVal?.name
    // },
    // immediate: true
    // },
  },

  mounted() {
    this.uid = this.$utils.uidGenerator(this.id)
  },

  methods: {
    async lostFocus() {
      this.shouldClose = true
      await this.$nextTick()

      setTimeout(() => {
        if (this.shouldClose) this.onClickOutside()
      }, 50)
    },

    focus() {
      this.shouldClose = false
      setTimeout(() => this.$refs.textFieldRef?.focus(), 10)
    },

    itemFocused(event) {
      this.shouldClose = false
      this.currentFocus = event.target
    },

    itemUnfocused() {
      this.currentFocus = null

      setTimeout(() => {
        if (!this.currentFocus) this.lostFocus()
      }, 50)
    },

    onFocusTextField() {
      this.shouldClose = false
      this.$emit('focus')
      this.open = true
      this.currentFocus = this.$refs.textFieldRef
    },

    onKeyDown(event) {
      if (event.code === 'ArrowDown') {
        if (this.canCreate && this.$refs.liCreateItemRef) {
          this.$refs.liCreateItemRef.focus()
          event.preventDefault()
        } else if (this.$refs.itemRefs?.length > 0) {
          this.$refs.itemRefs[0].focus()
          event.preventDefault()
        }
      } else if (event.code === 'Backspace' && !this.textField) {
        this.$emit('update:value', '')
        event.preventDefault()
      }
    },

    focusPrevious(event) {
      const target = event.target

      if (
        !target ||
        !target.previousElementSibling ||
        !target.previousElementSibling.focus
      ) {
        return this.focus()
      }

      target.previousElementSibling.focus()
    },

    focusNext(event) {
      const target = event.target

      if (
        !target ||
        !target.nextElementSibling ||
        !target.nextElementSibling.focus
      ) {
        return
      }

      target.nextElementSibling.focus()
    },

    isItemBold(item) {
      if (this.value && !this.textField) {
        return this.value === item[this.titleKey]
      } else if (this.textField) {
        return this.textField === item[this.titleKey]
      }

      return false
    },

    createItem() {
      if (this.loading) return
      if (!this.itemFound) {
        this.$emit('create', this.textField)
        this.textField = ''
        this.open = false
      } else {
        this.selectItem(this.itemFound)
      }
    },

    selectItem(item) {
      this.$emit('update:value', item)
      this.textField = ''
      setTimeout(() => {
        this.open = false
      }, 100)
    },

    onClickOutside() {
      this.open = false
      this.$emit('lost-focus', this.textField)
      this.textField = ''
      this.$emit('blur')
      this.shouldClose = false
    }
  }
}
</script>
