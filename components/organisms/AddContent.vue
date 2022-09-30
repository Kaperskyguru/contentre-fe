<template>
  <div>
    <div class="grid grid-cols-2 gap-4 w-full lg:grid-cols-3">
      <div
        class="
          flex flex-col
          justify-center
          items-center
          p-2
          text-center
          focus-within:bg-white
          hover:bg-white
          border
          focus-within:border-btn-green
          hover:border-btn-green hover:duration-300
          cursor-pointer
        "
        @click.prevent="uploadContent"
      >
        <ProfileIcon />
        <p class="py-1 text-lg font-bold">URL</p>
        <p class="text-xs font-light">Pull contents from URL</p>
      </div>
      <div
        class="
          flex flex-col
          justify-center
          items-center
          p-2
          text-center
          bg-gray-100
          border
        "
      >
        <ProfileIcon />
        <p class="py-1 text-lg font-bold">PDF</p>
        <p class="text-xs font-light">Upload a PDF file</p>
      </div>
      <div
        class="
          flex flex-col
          justify-center
          items-center
          p-2
          text-center
          bg-gray-100
          border
        "
      >
        <ProfileIcon />
        <p class="py-1 text-lg font-bold">CSV</p>
        <p class="text-xs font-light">Import content from (Excel, CSV, Docs)</p>
      </div>
      <div
        class="
          flex flex-col
          justify-center
          items-center
          p-2
          text-center
          focus-within:bg-white
          hover:bg-white
          border
          focus-within:border-btn-green
          hover:border-btn-green hover:duration-300
          cursor-pointer
        "
        @click.prevent="pullContent"
      >
        <ProfileIcon />
        <p class="py-1 text-lg font-bold">Site</p>
        <p class="text-xs font-light">Pull from Dev, Medium, Hashnode etc</p>
      </div>

      <div
        class="
          flex flex-col
          justify-center
          items-center
          p-2
          text-center
          bg-gray-100
          border
        "
      >
        <ProfileIcon />
        <p class="py-1 text-lg font-bold">Blog</p>
        <p class="text-xs font-light">Pull contents from profile.</p>
      </div>

      <Hyperlink
        :to="{ name: 'contents/add', query: { type: 'note' } }"
        disabled
        class="
          flex flex-col
          justify-center
          items-center
          p-2
          text-center
          focus-within:bg-white
          hover:bg-white
          border
          focus-within:border-btn-green
          hover:border-btn-green
          duration-300
          cursor-pointer
        "
      >
        <ProfileIcon />
        <p class="py-1 text-lg font-bold">Blog</p>
        <p class="text-xs font-light">Write an article or blog post</p>
      </Hyperlink>
    </div>

    <Dialog v-model="isPluginVisible" :is-large="true" title="Connected Apps">
      <div class="block w-full text-gray-700 bg-white">
        <div class="flex justify-between w-full text-gray-700 bg-white">
          <Plugins
            :show-submit="true"
            :options="options"
            @add="onAddPlugin"
            @performAction="onPerformAction"
          />
        </div>
      </div>
    </Dialog>

    <Dialog v-model="isConfirmModalVisible">
      <div class="block w-full text-gray-700 bg-white">
        <div class="flex justify-between w-full text-gray-700 bg-white">
          <UploadContent @create:success="onContentUploaded" />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { PULL_MULTIPLE_CONTENT } from '~/graphql'
export default {
  components: {
    ProfileIcon: () => import('~/assets/icons/profile.svg?inline')
  },
  data: () => ({
    isConfirmModalVisible: false,
    isPluginVisible: false,
    plugins: [],
    options: [
      { plugin: 'medium', retrieve: false, publish: false },
      { plugin: 'devto', retrieve: true, publish: false },
      { plugin: 'hashnode', retrieve: true, publish: false }
    ]
  }),

  methods: {
    pullContent() {
      this.isPluginVisible = true
    },
    uploadContent() {
      this.isConfirmModalVisible = true
    },

    onAddPlugin(data) {
      if (!this.plugins.find((item) => item.name === data.name))
        this.plugins.push(data)

      // TODO:: try replacing incase of new changes
      this.$toast.negative('Plugin already added')
    },

    async onPerformAction() {
      // TODO:: Use Pusher to perform this action in the background
      try {
        await this.$apollo.mutate({
          mutation: PULL_MULTIPLE_CONTENT,
          variables: {
            input: {
              plugins: this.plugins
            }
          }
        })
        this.$toast.positive('Multiple Content created successfully')
        this.sending = false
        this.$emit('create:success', true)
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
        this.$emit('create:success', false)
      }
    },

    onContentUploaded(content) {
      if (!content) return

      return this.$emit('created', content)
    }
  }
}
</script>

<style>
</style>