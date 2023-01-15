<template>
  <Portal selector="#portal-panel" :disabled="!expanded">
    <div
      class="grid"
      :class="{
        'fixed top-0 bottom-0 left-0 right-0 !ml-0 !mt-0 z-3': expanded
      }"
    >
      <Card ref="panel" class="flex flex-col space-y-4" :class="cardClass">
        <header class="flex" :class="headerClass">
          <div
            class="items-center space-y-2 md:flex md:space-y-0 md:space-x-4"
            :class="headerContentClass"
          >
            <Logo v-if="expanded" size="small" />

            <slot v-if="!hasHeaderExpandedSlot || !expanded" name="header">
              <strong>&nbsp;</strong>
            </slot>

            <slot
              v-else-if="hasHeaderExpandedSlot && expanded"
              name="header-expanded"
            >
              <strong>&nbsp;</strong>
            </slot>
          </div>

          <Tooltip :label="expanded ? $t('close') : $t('expand')">
            <ToggleButton
              v-model="expandedModel"
              :class="[{ hidden: hideToggle }, toggleClass]"
              class="text-darksilver hover:text-black"
            >
              <div slot="icon-active" class="custom-icon" role="presentation">
                <IconClose />
              </div>

              <div slot="icon-inactive" class="custom-icon" role="presentation">
                <IconExpand />
              </div>
            </ToggleButton>
          </Tooltip>
        </header>

        <div class="flex-1" :class="containerClass">
          <slot />
        </div>
      </Card>
    </div>
  </Portal>
</template>

<script>
import { Portal } from '@linusborg/vue-simple-portal'
import Card from '~/components/atoms/Card.vue'
import Tooltip from '~/components/atoms/Tooltip.vue'
import Logo from '~/components/molecules/Logo.vue'
import ToggleButton from '~/components/molecules/ToggleButton.vue'

export default {
  name: 'ExpandableCard',

  components: {
    Card,
    Tooltip,
    Logo,
    ToggleButton,
    Portal,
    IconClose: () => import('~/assets/icons/close.svg?inline'),
    IconExpand: () => import('~/assets/icons/expand.svg?inline')
  },

  model: {
    prop: 'expanded',
    event: 'toggle'
  },

  props: {
    expanded: {
      type: Boolean,
      default: false
    },

    cardClass: {
      type: [String, Object],
      default: 'overflow-hidden space-y-4'
    },

    headerClass: {
      type: [String, Object],
      default: 'items-start justify-between'
    },

    headerContentClass: {
      type: [String, Object],
      default: null
    },

    containerClass: {
      type: [String, Object],
      default: 'overflow-hidden md:overflow-auto'
    },

    hideToggle: {
      type: Boolean,
      default: false
    },

    toggleClass: {
      type: [String, Object],
      default: '-mt-1.5 -mb-3'
    }
  },

  emits: ['toggle'],

  computed: {
    hasHeaderSlot() {
      return !!(this.$slots.header && this.$slots.header.length)
    },

    hasHeaderExpandedSlot() {
      return !!(
        this.$slots['header-expanded'] && this.$slots['header-expanded'].length
      )
    },

    expandedModel: {
      get() {
        return this.expanded
      },

      set(value) {
        this.$emit('toggle', value)
      }
    }
  },

  watch: {
    async expanded(value) {
      await this.$nextTick()

      if (value) {
        document.addEventListener('keyup', this.close)

        const panel = this.$refs.panel
        if (panel && panel.$el && panel.$el.focus) panel.$el.focus()
      } else {
        document.removeEventListener('keyup', this.close)
      }
    }
  },

  destroyed() {
    document.removeEventListener('keyup', this.close)
  },

  methods: {
    close(event) {
      if (event.type !== 'keyup' || event.keyCode === 27) {
        this.expandedModel = false
      }
    }
  }
}
</script>
