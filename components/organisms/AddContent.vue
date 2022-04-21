<template>
  <div>
    <div class="grid gap-4 w-full lg:grid-cols-3">
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
          bg-gray-100
          border
        "
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
        :to="{ name: 'contents/add' }"
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
export default {
  components: {
    ProfileIcon: () => import('~/assets/icons/profile.svg?inline')
  },
  data: () => ({
    isConfirmModalVisible: false
  }),

  methods: {
    uploadContent() {
      this.isConfirmModalVisible = true
    }
  }
}
</script>

<style>
</style>