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
            v-model="devto_action"
            type="radio"
            value="Publish"
            class="text-gray-100"
            >Publish</CheckField
          >
          <CheckField
            v-model="devto_action"
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
              v-model="devto_content_format"
              type="radio"
              value="HTML"
              class="text-gray-100"
              >HTML</CheckField
            >
            <CheckField
              v-model="devto_content_format"
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
              id="devto_content_canonical_url"
              v-model="devto_content_canonical_url"
              class="text-gray-100"
              label="Canonical URL"
            />
          </div>
        </div>

        <div class="flex flex-row justify-start pb-5 mb-3 space-x-2">
          <div class="flex flex-col space-y-3">
            <CheckField
              id="devto_notify_followers"
              v-model="devto_notifyFollowers"
              class="text-gray-100"
              >Notify Followers
            </CheckField>
          </div>
        </div>

        <div class="flex flex-row justify-start pb-5 mb-3 space-x-2">
          <div class="flex flex-col space-y-3">
            <DropdownField
              v-model="devto_publish_status"
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
                id="devto_perpage"
                v-model="devto_perpage"
                class="text-gray-100"
                label="Per Page"
              />
            </div>
          </div>

          <div class="flex flex-row justify-start pb-5 mb-3 space-x-2">
            <div class="flex flex-col space-y-3">
              <TextField
                id="devto_page_number"
                v-model="devto_page_number"
                type="number"
                class="text-gray-100"
                label="Page number"
              />
            </div>
          </div>

          <div class="mb-3">Content Status</div>
          <div class="flex flex-row space-x-3">
            <CheckField
              v-model="devto_content_status"
              type="radio"
              class="text-gray-100"
              >All</CheckField
            >
            <CheckField
              v-model="devto_content_status"
              type="radio"
              value="PUBLISHED"
              class="text-gray-100"
              >Published</CheckField
            >
            <CheckField
              v-model="devto_content_status"
              type="radio"
              value="DRAFTS"
              class="text-gray-100"
              >Drafts</CheckField
            >
          </div>
        </div>

        <div class="p-5 my-5 bg-white border border-btn-green">
          <div class="mb-3">Retrieve a single content</div>
          <div class="flex flex-row justify-start pb-5 mb-3 space-x-2">
            <div class="flex flex-col space-y-3">
              <TextField
                id="devto_by_id"
                v-model="devto_by_id"
                class="text-gray-100"
                label="Content ID"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <Button @click.prevent="addDevto">Add App</Button>
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
    devto_action: 'Publish',
    devto_notifyFollowers: false,
    devto_content_canonical_url: '',
    devto_content_format: 'HTML',
    devto_publish_status: 'DRAFT',
    devto_username: '',
    devto_page_number: 1,
    devto_perpage: 30,
    devto_by_id: null,
    devto_content_status: 'PUBLISHED'
  }),

  computed: {
    isPublish() {
      return this.devto_action === 'Publish'
    }
  },

  methods: {
    addDevto() {
      const devto = {
        action: this.devto_action,
        contentFormat: this.devto_content_format,
        notifyFollowers: this.devto_notifyFollowers,
        canonicalUrl: this.devto_content_canonical_url,
        publishedStatus: this.devto_publish_status,
        page: this.devto_page_number,
        username: this.devto_username,
        contentId: this.devto_by_id ?? undefined,
        per_page: this.devto_perpage,
        contentStatus:
          this.devto_content_status === 'all'
            ? undefined
            : this.devto_content_status
      }
      this.$emit('add', { name: this.app.slug, data: devto })
    }
  }
}
</script>
    
    <style>
</style>