<template>
  <div class="w-full h-full">
    <div
      class="
        w-full
        text-sm
        font-medium
        text-center text-gray-500
        dark:text-gray-400
        border-b border-gray-200
        dark:border-gray-700
      "
    >
      <div class="flex w-full">
        <TagsAutocomplete
          id="3"
          key="tagAutocomplete"
          v-model="$v.fieldTags.$model"
          class="mr-1 w-full"
          placeholder="Select up 5 tags"
          :should-update="false"
          :fake-input="true"
          :rows="5"
          :options="{
            fakeInput: true,
            isGrid: true
          }"
          :is-required="false"
          :hide-pencil-icon="false"
          :error="getValidationMessage($v.fieldTags)"
          :is-input-border-enabled="false"
          @update:value="onUpdateTags"
          @focus="onFocusAutocomplete"
          @blur="onBlurAutocomplete"
          ><span slot="title">Tags</span></TagsAutocomplete
        >
      </div>
    </div>
    <div class="flex justify-end space-x-4">
      <Button class="py-4 px-24 mt-4" @click.prevent="onAddTags"> Add </Button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tags: {
      type: Array,
      default: () => []
    }
  },

  apollo: {
    // Todo: Load existing Tags from Content ID into tags array
  },

  data: () => ({
    fieldTags: '',
    newTags: [],
    showAutoComplete: false
  }),

  validations: {
    fieldTags: {}
  },
  computed: {
    computedTags() {
      return this.newTags.concat(this.tags)
    }
  },
  methods: {
    onUpdateTags(tags) {
      this.showAutoComplete = false
      console.log(tags)
      this.fieldTags = tags
      this.newTags.push(tags?.name)
    },

    onAddTags() {
      //Todo:: Save to DB with Content ID

      this.$emit('addTags', this.newTags)
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
<style scoped>
.active {
  @apply text-blue-600 dark:text-blue-500 rounded-t-lg border-b-2 border-blue-600 dark:border-blue-500;
}
</style>