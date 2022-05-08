<template>
  <div class="flex items-center bg-gray-50">
    <!--  -->
    <div
      class="
        flex
        justify-between
        items-center
        py-1
        px-2
        space-x-6
        bg-white
        rounded-lg
        border border-gray-200
      "
    >
      <div class="flex justify-between">
        <span class="pr-2">{{ selected.length }}</span>
        <span>selected</span>
      </div>
      <span class="inline-block relative">
        <button class="text-2xl leading-10 text-right">
          <DownloadIcon />
        </button>
      </span>

      <span class="inline-block relative">
        <button
          class="text-2xl leading-10 text-gray-500"
          @click.prevent="toggleExport = !toggleExport"
        >
          <ExportIcon />
        </button>
        <!-- Export Dropdown -->
        <div
          class="
            absolute
            top-0
            left-0
            z-30
            pl-5
            mt-8
            -ml-2
            min-w-full
            text-sm text-gray-700
            bg-white
            rounded
            border border-gray-200
            shadow-md
          "
          :class="{ hidden: toggleExport }"
          x-transition:enter="transition ease duration-300 transform"
          x-transition:enter-start="opacity-0 translate-y-2"
          x-transition:enter-end="opacity-100 translate-y-0"
          x-transition:leave="transition ease duration-300 transform"
          x-transition:leave-start="opacity-100 translate-y-0"
          x-transition:leave-end="opacity-0 translate-y-4"
        >
          <div class="overflow-auto relative z-10 w-full bg-white rounded">
            <!-- Filtered Options -->
            <ul>
              <li class="m-2">CSV</li>
              <li class="m-2">PDF</li>
              <li class="m-2">XLSX</li>
            </ul>
          </div>
        </div>
      </span>

      <span class="inline-block relative">
        <button class="text-2xl leading-10 text-left text-gray-500">
          <BookmarkIcon />
        </button>
      </span>
      <span class="inline-block relative">
        <button class="text-2xl leading-10 text-left text-gray-500">
          <FavoriteIcon />
        </button>
      </span>

      <!-- <span class="inline-block relative">
        <button class="text-2xl leading-10 text-left text-gray-500">
          <PortfolioIcon />
        </button>
      </span> -->
    </div>
  </div>
</template>

<script>
export default {
  components: {
    BookmarkIcon: () => import('~/assets/icons/bookmark.svg?inline'),
    DownloadIcon: () => import('~/assets/icons/download.svg?inline'),
    FavoriteIcon: () => import('~/assets/icons/favourite.svg?inline'),
    ExportIcon: () => import('~/assets/icons/export.svg?inline')
    // PortfolioIcon: () => import('~/assets/icons/porfolio.svg?inline')
  },
  props: {
    selected: {
      type: [Array, Object],
      default: () => []
    }
  },
  data: () => ({
    toggleExport: true,
    option: {
      icon: ''
    }
  })
}
</script>

<style>
</style>