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
        <div class="flex flex-col justify-start pb-5 mb-3 space-x-2">
          <div class="mr-3">Content Format</div>
          <div class="flex flex-col mt-2 space-y-3">
            <CheckField
              v-model="hashnode_content_format"
              type="radio"
              value="HTML"
              class="text-gray-100"
              >HTML</CheckField
            >
            <CheckField
              v-model="hashnode_content_format"
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
              id="hashnode_notify_followers"
              v-model="hashnode_notifyFollowers"
              class="text-gray-100"
              >Notify Followers
            </CheckField>
          </div>
        </div>

        <div class="flex flex-row justify-start pb-5 mb-3 space-x-2">
          <div class="flex flex-col space-y-3">
            <DropdownField
              v-model="hashnode_publish_status"
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

      <!-- Retrieve -->
      <div v-else>
        <div class="p-5 my-5 bg-white border border-btn-green">
          <div class="mb-3">Retrieve all your articles</div>
          <div class="flex flex-row justify-start pb-5 mb-3 space-x-2">
            <div class="flex flex-col space-y-3">
              <TextField
                id="hashnode_username"
                v-model="hashnode_username"
                class="text-gray-100"
                label="Username"
              />
            </div>
          </div>

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
                id="devto_by_slug"
                v-model="devto_by_slug"
                class="text-gray-100"
                label="Content Slug"
              />
            </div>
          </div>

          <div class="flex flex-row justify-start pb-5 mb-3 space-x-2">
            <div class="flex flex-col space-y-3">
              <TextField
                id="devto_by_hostname"
                v-model="devto_by_hostname"
                class="text-gray-100"
                label="Content Hostname"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <Button @click.prevent="addHashnode">Add App</Button>
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
    hashnode_action: 'Publish',
    hashnode_notifyFollowers: false,
    hashnode_content_canonical_url: '',
    hashnode_content_format: 'HTML',
    hashnode_publish_status: 'DRAFT',
    hashnode_username: '',
    hashnode_page_number: 0,
    devto_by_hostname: '',
    devto_by_slug: ''
  }),

  computed: {
    isPublish() {
      return this.hashnode_action === 'Publish'
    }
  },

  methods: {
    addHashnode() {
      const hashnode = {
        action: this.hashnode_action,
        contentFormat: this.hashnode_content_format,
        notifyFollowers: this.hashnode_notifyFollowers,
        canonicalUrl: this.hashnode_content_canonical_url,
        publishedStatus: this.hashnode_publish_status,
        page: this.hashnode_page_number,
        username: this.hashnode_username,
        hostname: this.devto_by_hostname,
        slug: this.devto_by_slug
      }
      this.$emit('add', { name: this.app.slug, data: hashnode })
    }
  }
}
</script>
  
  <style>
</style>