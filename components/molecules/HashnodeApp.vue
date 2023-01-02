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
            v-model="hashnode_action"
            type="radio"
            value="Publish"
            class="text-gray-100"
            >Publish</CheckField
          >
          <CheckField
            v-model="hashnode_action"
            type="radio"
            value="Retrieve"
            class="text-gray-100"
            >Retrieve contents</CheckField
          >
        </div>
      </div>

      <div v-if="isPublish" class="p-5 my-5 bg-white border border-btn-green">
        <div class="flex flex-row justify-start pb-5 mb-3 space-x-2">
          <div class="flex flex-col space-y-3">
            <TextField
              id="hashnode_publication_id"
              v-model="hashnode_publication_id"
              class="text-gray-100"
              label="Publication ID"
            />
          </div>
        </div>

        <div class="flex flex-row justify-start pb-5 mb-3 space-x-2">
          <div class="flex flex-col space-y-3">
            <TextField
              id="hashnode_content_canonical_url"
              v-model="hashnode_content_canonical_url"
              class="text-gray-100"
              label="Canonical URL"
            />
          </div>
        </div>

        <div class="flex flex-row justify-start pb-5 mb-3 space-x-2">
          <div class="flex flex-col space-y-3">
            <CheckField
              id="hashnode_hideFromFeed"
              v-model="hashnode_hideFromFeed"
              class="text-gray-100"
              >Hide from feed?
            </CheckField>
          </div>
        </div>
      </div>

      <!-- Retrieve -->
      <div v-else>
        <div class="p-5 my-5 bg-white border border-btn-green">
          <div class="mb-3">Retrieve all your articles</div>

          <div class="flex flex-row justify-start pb-5 mb-3 space-x-2">
            <div class="flex flex-col space-y-3">
              <TextField
                id="hashnode_page_number"
                v-model="hashnode_page_number"
                type="number"
                class="text-gray-100"
                label="Page number"
              />
            </div>
          </div>
        </div>

        <div class="p-5 my-5 bg-white border border-btn-green">
          <div class="mb-3">Retrieve a single content</div>
          <div class="flex flex-row justify-start pb-5 mb-3 space-x-2">
            <div class="flex flex-col space-y-3">
              <TextField
                id="hashnode_by_slug"
                v-model="hashnode_by_slug"
                class="text-gray-100"
                label="Content Slug"
              />
            </div>
          </div>

          <div class="flex flex-row justify-start pb-5 mb-3 space-x-2">
            <div class="flex flex-col space-y-3">
              <TextField
                id="hashnode_by_hostname"
                v-model="hashnode_by_hostname"
                class="text-gray-100"
                label="Content Hostname"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <Button
          :disabled="isPublishDisabled && isRetrievedDisabled"
          @click.prevent="addHashnode"
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
    hashnode_action: 'Publish',
    hashnode_hideFromFeed: false,
    hashnode_content_canonical_url: '',
    hashnode_publication_id: '',
    hashnode_page_number: 0,
    hashnode_by_hostname: '',
    hashnode_by_slug: ''
  }),

  computed: {
    isPublish() {
      return this.hashnode_action === 'Publish'
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
      return this.options.filter((item) => item.plugin === 'hashnode')[0]
    },
    addHashnode() {
      const hashnode = {
        action: this.hashnode_action,
        publicationId: this.hashnode_publication_id,
        canonicalUrl: this.hashnode_content_canonical_url,
        page: this.hashnode_page_number,
        hideFromHashnodeFeed: this.hashnode_hideFromFeed,
        hostname: this.hashnode_by_hostname,
        slug: this.hashnode_by_slug
      }
      this.$emit('add', { name: this.app.slug, data: hashnode })
    }
  }
}
</script>
  
  <style>
</style>