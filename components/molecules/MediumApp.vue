<template>
  <div
    :id="app.slug"
    class="p-4 w-full bg-gray-50 dark:bg-gray-800 rounded-lg"
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
            :disabled="isPublishDisabled"
            value="Publish"
            class="text-gray-100"
            >Publish</CheckField
          >
          <CheckField
            v-model="medium_action"
            :disabled="isRetrievedDisabled"
            type="radio"
            value="Retrieve"
            class="text-gray-100"
            >Retrieve contents</CheckField
          >
        </div>
      </div>

      <div v-if="isPublish" class="p-5 my-5 bg-white border border-btn-green">
        <div class="flex flex-col justify-start pb-5 mb-3 space-x-2">
          <div class="mr-3">Content Format</div>
          <div class="flex flex-col mt-2 space-y-3">
            <CheckField
              v-model="medium_content_format"
              type="radio"
              value="HTML"
              class="text-gray-100"
              >HTML</CheckField
            >
            <CheckField
              v-model="medium_content_format"
              :disabled="true"
              type="radio"
              value="MARKDOWN"
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

      <div v-else>
        <div class="p-5 my-5 bg-white border border-btn-green">
          <div class="mb-3">Medium allows only a Maximum of 10 articles</div>
        </div>

        <div class="p-5 my-5 bg-white border border-btn-green">
          <div class="mb-3">Retrieve a single content</div>
          <div class="flex flex-row justify-start pb-5 mb-3 space-x-2">
            <div class="flex flex-col space-y-3">
              <TextField
                id="medium_by_id"
                v-model="medium_by_id"
                class="text-gray-100"
                label="Content ID"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <Button
          :disabled="isPublishDisabled && isRetrievedDisabled"
          @click.prevent="addMedium"
          >Add App</Button
        >
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
    },
    options: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({
    medium_action: 'Publish',
    medium_notifyFollowers: false,
    medium_content_canonical_url: '',
    medium_content_format: 'HTML',
    medium_publish_status: 'DRAFT',
    medium_by_id: null
  }),

  computed: {
    isPublish() {
      return this.medium_action === 'Publish'
    },
    isPublishDisabled() {
      const plugin = this.getPlugin()
      return plugin && plugin.publish !== undefined ? !plugin.publish : false
    },

    isRetrievedDisabled() {
      const plugin = this.getPlugin()
      return plugin && plugin.retrieve !== undefined ? !plugin.retrieve : false
    }
  },

  methods: {
    getPlugin() {
      return this.options.filter((item) => item.plugin === 'medium')[0]
    },
    addMedium() {
      const medium = {
        action: this.medium_action,
        contentFormat: this.medium_content_format,
        notifyFollowers: this.medium_notifyFollowers,
        canonicalUrl: this.medium_content_canonical_url,
        publishedStatus: this.medium_publish_status,
        contentId: this.medium_by_id ?? undefined
      }
      this.$emit('add', { name: this.app.slug, data: medium })
    }
  }
}
</script>

<style>
</style>