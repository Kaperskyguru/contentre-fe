<template>
  <li class="relative mr-5 cardd">
    <div
      class="
        flex
        relative
        justify-center
        items-center
        w-full
        h-full
        bg-white
        rounded-xl
        transition
        duration-500
        cursor-pointer
        card-banner
      "
    >
      <img
        :src="getImage"
        class="w-full h-full rounded-xl"
        style="object-fit: contain"
        :alt="portfolio.title"
      />
      <div
        v-if="portfolio.isPremium"
        class="
          absolute
          top-[2px]
          left-[10px]
          px-2
          mt-8
          font-semibold
          text-white
          bg-blue-700
          rounded-lg
        "
      >
        Pro
      </div>
      <div class="absolute bottom-0 left-0 w-full h-full transition">
        <transition
          appear
          enter-active-class="transition-transform duration-500 transform-gpu"
          enter-class="translate-y-full"
        >
          <div
            class="
              absolute
              bottom-0
              py-2
              px-4
              w-full
              bg-white
              border-t-2 border-gray-100
            "
          >
            <div class="flex flex-col w-full">
              <div class="flex justify-between items-center w-full">
                <div class="">
                  <h4 class="font-semibold">
                    {{ portfolio.title }}
                  </h4>
                  <p>
                    Updated -
                    {{ formatDate(portfolio.updatedAt) }}
                  </p>
                </div>

                <a target="_blank" :href="url">
                  <div
                    class="
                      flex
                      items-center
                      p-1
                      w-8
                      h-8
                      text-btn-green
                      rounded-full
                      border border-btn-green
                    "
                  >
                    <PreviewIcon />
                  </div>
                </a>
              </div>

              <div class="card-action-list btn-show">
                <div
                  class="
                    flex
                    items-center
                    p-2
                    w-8
                    h-8
                    text-white
                    bg-btn-green
                    rounded-lg
                  "
                  @click.prevent="onEditPortfolio(portfolio.id)"
                >
                  <span class="w-full">
                    <EditIcon />
                  </span>
                </div>
                <div
                  class="
                    flex
                    items-center
                    p-2
                    w-8
                    h-8
                    text-white
                    bg-btn-green
                    rounded-lg
                  "
                >
                  <ShareIcon />
                </div>
                <div
                  class="
                    flex
                    items-center
                    p-2
                    w-8
                    h-8
                    text-white
                    bg-btn-green
                    rounded-lg
                  "
                  @click.prevent="onDeletePortfolio(portfolio.id)"
                >
                  <DeleteIcon />
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  components: {
    EditIcon: () => import('~/assets/icons/edit.svg?inline'),
    DeleteIcon: () => import('~/assets/icons/delete.svg?inline'),
    ShareIcon: () => import('~/assets/icons/share.svg?inline'),
    PreviewIcon: () => import('~/assets/icons/preview.svg?inline')
  },

  props: {
    portfolio: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    getImage() {
      if (this.isCustomized) {
        return 'https://res.cloudinary.com/kaperskydisk/image/upload/v1667820583/contentre/assets/customizer.png'
      }
      return (
        this.portfolio?.userTemplate?.template?.image ??
        'https://res.cloudinary.com/kaperskydisk/image/upload/v1667834666/contentre/assets/default_portfolio.png'
      )
    },
    url() {
      let domain = ''
      if (this.portfolio?.domain) domain = `https://${this.portfolio?.domain}`
      return this.portfolio?.domain ? domain : this.portfolio.url
    },
    isCustomized() {
      return this.portfolio?.userTemplate?.template?.type === 'CUSTOMIZED'
    }
  },
  methods: {
    onEditPortfolio(id) {
      this.$emit('edit', id)
    },
    onDeletePortfolio(id) {
      this.$emit('delete', id)
    },

    formatDate(date) {
      if (!date) return ''
      return this.$d(new Date(date), 'monthYearShort')
    }
  }
}
</script>

<style>
</style>