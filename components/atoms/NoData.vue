<template>
  <div class="flex flex-col justify-center items-center">
    <IconFolderOpen class="h-8 fill-current text-silver" />
    <p class="mt-2 text-lg text-silver">
      {{ message || 'No data to show' }}
    </p>

    <Button
      v-if="filterApplied"
      class="mt-4"
      appearance="secondary"
      size="small"
      @click="$emit('clear')"
    >
      {{ 'Clear applied filters' }}
    </Button>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'NoData',

  components: {
    IconFolderOpen: () => import('~/assets/icons/folder-open.svg?inline')
  },

  props: {
    message: {
      default: null,
      type: String
    },
    filterApplied: {
      default: false,
      type: Boolean
    }
  }
})
</script>
