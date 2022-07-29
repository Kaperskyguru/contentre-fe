<template>
  <div class="w-full h-full">
    <div
      class="
        text-sm
        font-medium
        text-center text-gray-500
        dark:text-gray-400
        border-b border-gray-200
        dark:border-gray-700
      "
    >
      <ul id="tabs" class="flex flex-wrap -mb-px">
        <li class="mr-2">
          <a
            id="upload-tab"
            href="#upload"
            class="
              inline-block
              p-4
              hover:text-gray-600
              dark:hover:text-gray-300
              rounded-t-lg
              border-b-2 border-transparent
              hover:border-blue-500
            "
            data-tabs-target="#upload"
            type="button"
            role="tab"
            aria-controls="upload"
            aria-selected="false"
          >
            Upload
          </a>
        </li>
        <li class="mr-2">
          <a
            id="profaily-tab"
            href="#profaily"
            class="
              inline-block
              p-4
              hover:text-gray-600
              dark:hover:text-gray-300
              rounded-t-lg
              border-b-2 border-transparent
              hover:border-blue-500
            "
            data-tabs-target="#profaily"
            type="button"
            role="tab"
            aria-controls="profaily"
            aria-selected="false"
          >
            Gallery
          </a>
        </li>
        <li class="mr-2">
          <a
            id="link-tab"
            href="#link"
            class="
              inline-block
              p-4
              hover:text-gray-600
              dark:hover:text-gray-300
              rounded-t-lg
              border-b-2 border-transparent
              hover:border-blue-500
            "
            data-tabs-target="#link"
            type="button"
            role="tab"
            aria-controls="link"
            aria-selected="false"
          >
            Link
          </a>
        </li>
      </ul>
    </div>

    <div id="myTabContent">
      <div
        id="profaily"
        class="hidden w-full"
        role="tabpanel"
        aria-labelledby="profaily-tab"
      >
        <div
          class="w-full text-sm"
          x-show="showChildren"
          x-transition:enter="transition ease duration-300 transform"
          x-transition:enter-start="opacity-0 translate-y-2"
          x-transition:enter-end="opacity-100 translate-y-0"
          x-transition:leave="transition ease duration-300 transform"
          x-transition:leave-start="opacity-100 translate-y-0"
          x-transition:leave-end="opacity-0 translate-y-4"
        >
          <div
            class="
              overflow-auto overflow-y-auto
              w-full
              h-64
              bg-white
              transition
              duration-300
              ease-in
            "
          >
            <!-- Test content -->
            <div class="my-6 space-y-2 md:justify-between md:items-center">
              <div class="flex flex-wrap">
                <Tooltip
                  v-for="item in media.items"
                  :key="item.id"
                  :trigger="['hover']"
                  :label="item.title"
                  class="p-0"
                >
                  <div class="p-0 w-1/5 border-0" @click="selectedImage(item)">
                    <img
                      :src="item.url"
                      :alt="item.title"
                      width="150"
                      height="150"
                      class="p-2 mx-auto w-full"
                    />
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="upload"
        class="hidden w-full"
        role="tabpanel"
        aria-labelledby="upload-tab"
      >
        <div
          class="text-sm rounded-lg"
          x-show="showChildren"
          x-transition:enter="transition ease duration-300 transform"
          x-transition:enter-start="opacity-0 translate-y-2"
          x-transition:enter-end="opacity-100 translate-y-0"
          x-transition:leave="transition ease duration-300 transform"
          x-transition:leave-start="opacity-100 translate-y-0"
          x-transition:leave-end="opacity-0 translate-y-4"
        >
          <div class="pt-4 text-gray-700 bg-white">
            <div class="flex relative justify-center items-center w-full">
              <input
                type="file"
                :multiple="multiple"
                :disabled="uploading"
                accept=".jpeg,.jpg,.png,image/jpeg,image/png"
                class="
                  block
                  relative
                  z-50
                  p-20
                  w-full
                  h-full
                  opacity-0
                  cursor-pointer
                "
                @change="selectFile"
              />
              <div class="absolute inset-x-0 top-0 p-10 m-auto text-center">
                <Button
                  class="
                    py-4
                    px-10
                    w-3/5
                    font-bold
                    text-white
                    rounded-lg
                    shadow
                    form-btn
                  "
                  type="submit"
                  :waiting="uploading"
                >
                  <!-- <i class="fas fa-upload"></i> -->
                  Upload Image
                </Button>
                <p class="mt-4">Or drop a file</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="link"
        class="hidden w-full"
        role="tabpanel"
        aria-labelledby="link-tab"
      >
        <div
          class="text-sm"
          x-show="showChildren"
          x-transition:enter="transition ease duration-300 transform"
          x-transition:enter-start="opacity-0 translate-y-2"
          x-transition:enter-end="opacity-100 translate-y-0"
          x-transition:leave="transition ease duration-300 transform"
          x-transition:leave-start="opacity-100 translate-y-0"
          x-transition:leave-end="opacity-0 translate-y-4"
        >
          <div class="pt-4 mb-6 text-gray-700">
            <div class="justify-center pb-4 w-full bg-transparent">
              <TextField
                type="url"
                class="p-4"
                placeholder="Upload image link"
              />
            </div>

            <div class="flex justify-center space-x-4">
              <Button class="py-4 px-24 mt-4"> Upload </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { GET_MEDIAS, CREATE_MEDIA } from '~/graphql'
import { currentUser } from '~/components/mixins'
import { isArray } from '~/plugins/utils'
export default {
  mixins: [currentUser],
  props: {
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    filters: {},
    uploading: false,
    media: {
      items: [],
      total: 0
    }
  }),
  mounted() {
    this.$nextTick(() => {
      this.tabToggle()
    })
  },

  apollo: {
    media: {
      query: GET_MEDIAS,
      variables() {
        return {
          skip: 0,
          size: 30,
          filters: { ...this.filters }
        }
      },
      update(data) {
        return {
          items: data.getMedias.media ?? [],
          total: data.getMedias.meta.total
        }
      }
    }
  },

  methods: {
    selectedImage(image) {
      return this.$emit('image', [image.url])
    },

    async selectFile(e) {
      try {
        let image = null
        let imageURL = ''
        if (!this.multiple) {
          const file = e.target.files[0]

          /* Make sure file exists */
          if (!file) return

          const readData = (f) =>
            new Promise((resolve) => {
              const reader = new FileReader()
              reader.onloadend = () => resolve(reader.result)
              reader.readAsDataURL(f)
            })
          image = await readData(file)

          this.uploading = true
          imageURL = await this.uploadToCloudinary(image)

          // Upload to DB
          const data = [
            {
              url: imageURL,
              title: ''
            }
          ]
          await this.uploadImage(data)
        }

        this.uploading = false
        this.$toast.positive('Media created successfully')
        this.filters = {
          ...this.filters
        }
        return this.$emit('image', [imageURL])
      } catch (error) {
        this.$toast.negative(error.message)
      } finally {
        this.uploading = false
      }
    },

    async uploadToCloudinary(image) {
      if (image) {
        const cloudinary = await this.$cloudinary.upload(image, {
          folder: 'contentre/media/images/' + this.currentUser.id,
          upload_preset: 'yijnms7k'
        })

        return cloudinary?.secure_url || null
      }
      return null
    },

    async uploadImage(data) {
      if (isArray(data) && data.length > 1) return

      await this.$apollo.mutate({
        mutation: CREATE_MEDIA,
        variables: {
          input: {
            url: data[0].url,
            title: data[0].title
          }
        }
      })
    },

    tabToggle() {
      const tabsContainer = document.querySelector('#tabs')

      const tabTogglers = tabsContainer.querySelectorAll('a')

      tabTogglers.forEach(function (toggler) {
        toggler.addEventListener('click', function (e) {
          e.preventDefault()

          const tabName = this.getAttribute('href')

          const tabContents = document.querySelector('#myTabContent')

          for (let i = 0; i < tabContents.children.length; i++) {
            tabTogglers[i].parentElement.classList.remove('active')
            tabContents.children[i].classList.remove('hidden')
            if ('#' + tabContents.children[i].id === tabName) {
              continue
            }
            tabContents.children[i].classList.add('hidden')
          }
          e.target.parentElement.classList.add('active')
        })
      })

      document.getElementById('profaily-tab').click()
    }
  }
}
</script>
<style scoped>
.active {
  @apply text-blue-600 dark:text-blue-500 rounded-t-lg border-b-2 border-blue-600 dark:border-blue-500;
}
</style>