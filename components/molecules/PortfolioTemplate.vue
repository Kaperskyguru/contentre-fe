<template>
  <div class="flex-none mr-4 w-2/3 rounded-lg border md:w-1/4">
    <a
      href="#"
      class="
        flex
        relative
        justify-center
        items-center
        w-full
        h-[400px]
        rounded-xl
        transition
        duration-500
        card-banner
      "
    >
      <div class="w-full h-full rounded-xl">
        <img
          :src="getImage"
          class="w-full h-full rounded-xl"
          style="object-fit: cover"
          :alt="template.title"
        />
      </div>
      <div
        class="
          absolute
          top-0
          left-0
          w-full
          h-full
          rounded-xl
          border-y-2
          transition
        "
      >
        <div class="absolute bottom-0 px-4 w-full bg-white transition-all">
          <div class="p-5 w-full border-t-2">
            <div>
              <h3 class="text-lg font-semibold">
                {{
                  template.title === 'Blank' ? 'Use Default' : template.title
                }}
              </h3>
            </div>

            <div class="flex-col pt-3 space-y-2 w-full card-actionList btn-dg">
              <Button
                class="w-full"
                appearance="outline"
                type="link"
                target="_blank"
                :href="template.demoLink"
              >
                Preview Sample
              </Button>

              <Button
                class="w-full"
                @click.prevent="onAddPortfolio(template.id)"
              >
                Use This Sample
              </Button>
            </div>
          </div>
        </div>
      </div>
    </a>

    <LazyPortfolioEdit
      v-model="isConfirmModalVisible"
      :template-id="templateId"
      @toggle="refetch"
      @created="refetch"
    />
  </div>
</template>

<!-- 
    Store Image location
    Store Demo link location
 -->

<script>
export default {
  props: {
    template: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    templateId: null,
    isConfirmModalVisible: false
  }),

  computed: {
    getImage() {
      return (
        this.template?.image ??
        'https://res.cloudinary.com/kaperskydisk/image/upload/v1667834666/contentre/assets/default_portfolio.png'
      )
    }
  },

  methods: {
    onAddPortfolio(id) {
      this.templateId = id
      this.isConfirmModalVisible = true
    },

    refetch() {
      this.$router.push('/portfolios')
    }
  }
}
</script>

<style scoped>
.card-actionList {
  display: none;
  gap: 15px;
  transition: 0.3s;
}

.card-banner:is(:hover, :focus-within) .btn-dg {
  display: flex;
  /* opacity: 1; */
}
</style>  