<template>
  <div
    :id="app.slug"
    class="hidden p-4 w-full bg-gray-50 dark:bg-gray-800 rounded-lg"
    role="tabpanel"
    :aria-labelledby="`${app.slug}-tab`"
  >
    <div class="mr-4">
      <div class="flex flex-row justify-start mb-3 space-x-2">
        <div class="mr-3">Actions</div>
        <div class="flex flex-row space-x-3">
          <CheckField
            v-model="medium_action"
            type="radio"
            value="Publish"
            class="text-gray-100"
            >Publish</CheckField
          >
          <CheckField
            v-model="medium_action"
            type="radio"
            value="Retrieve"
            class="text-gray-100"
            >Retrieve contents</CheckField
          >
        </div>
      </div>

      <div class="p-5 my-5 bg-white border border-btn-green">
        <div class="flex flex-col justify-start pb-5 mb-3 space-x-2">
          <div class="mr-3">Content Format</div>
          <div class="flex flex-col mt-2 space-y-3">
            <CheckField
              v-model="medium_content_format"
              type="radio"
              value="html"
              class="text-gray-100"
              >HTML</CheckField
            >
            <CheckField
              v-model="medium_content_format"
              :disabled="true"
              type="radio"
              value="markdown"
              class="text-gray-100"
              >MARKDOWN</CheckField
            >
          </div>
        </div>

        <div class="flex flex-row justify-start pb-5 mb-3 space-x-2">
          <div class="flex flex-col space-y-3">
            <TextField
              id="medium_content_canonical_url"
              v-model="medium_content_canonical_url"
              class="text-gray-100"
              label="Canonical URL"
            />
          </div>
        </div>

        <div class="flex flex-row justify-start pb-5 mb-3 space-x-2">
          <div class="flex flex-col space-y-3">
            <CheckField
              id="medium_notify_followers"
              v-model="medium_notifyFollowers"
              class="text-gray-100"
              >Notify Followers
            </CheckField>
          </div>
        </div>

        <div class="flex flex-row justify-start pb-5 mb-3 space-x-2">
          <div class="flex flex-col space-y-3">
            <DropdownField
              v-model="medium_publish_status"
              placeholder="Publish Status"
              label="Publish Status"
            >
              <option value="public">PUBLIC</option>
              <option value="draft">DRAFT</option>
              <option value="unlisted">UNLISTED</option>
            </DropdownField>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <Button @click.prevent="addMedium">Add App</Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    app: {
      type: Object,
      default: () => {}
    }
  },

  data: () => ({
    medium_action: 'Publish',
    medium_notifyFollowers: false,
    medium_content_canonical_url: '',
    medium_content_format: 'html',
    medium_publish_status: ''
  }),

  methods: {
    addMedium() {
      const medium = {
        // action: this.medium_action,
        contentFormat: this.medium_content_format,
        notifyFollowers: this.medium_notifyFollowers,
        canonicalUrl: this.medium_content_canonical_url,
        publishedStatus: this.medium_publish_status
      }
      this.$emit('add', { name: this.app.slug, data: medium })
    }
  }
}
</script>

<style>
</style>