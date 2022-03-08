<template>
  <div class="flex flex-col justify-center items-center my-6">
    <IconFolderOpen class="h-8 text-gray-300 fill-current" />
    <p class="mt-4 text-lg text-gray-300">
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
