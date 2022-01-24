<template>
  <div>
    <div class="px-4 border-t-2 pt-4">
      <div
        class="
          flex
          items-center
          justify-between
          space-x-3
          font-semibold
          text-gray-900 text-sm
          leading-8
          text-center
        "
      >
        <span>Portfolio Link</span>
        <span class="text-black">
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </span>
      </div>

      <div class="bg-teal-100 leading-6 rounded-lg pl-2 my-4 links">
        <a :href="user.portfolio" target="_blank" class="text-gray-600">
          {{ user.portfolio }}
        </a>
      </div>
    </div>

    <!-- Profile link -->

    <div class="px-4 border-t-2 my-8 pt-4 text-center">
      <div
        class="
          flex
          items-center
          justify-between
          space-x-3
          font-semibold
          text-gray-900 text-sm
          leading-8
          text-center
        "
      >
        <span>Profile Links</span>
        <span class="text-black">
          <i class="fas fa-plus"></i>
        </span>
      </div>

      <div class="grid grid-cols-5 mt-2">
        <div class="text-center my-2">
          <img
            class="h-12 w-12 rounded-full mx-auto"
            src="~/assets/img/medium.png"
            alt=""
          />
          <a href="#" class="text-xs profilelink-a">Medium</a>
        </div>
        <div class="text-center my-2">
          <img
            class="h-12 w-12 rounded-full mx-auto"
            src="~/assets/img/zikoko.png"
            alt=""
          />
          <a href="#" class="text-xs profilelink-a text-purple-600">Zikoko</a>
        </div>
        <div class="text-center my-2">
          <img
            class="h-12 w-12 rounded-full mx-auto"
            src="~/assets/img/write.png"
            alt=""
          />
          <a href="#" class="text-xs profilelink-a text-red-600"
            >Writers Stage</a
          >
        </div>
        <div class="text-center my-2">
          <img
            class="h-12 w-12 rounded-full mx-auto"
            src="~/assets/img/pen.png"
            alt=""
          />
          <a href="#" class="text-xs profilelink-a text-blue-600"
            >I write stuffs</a
          >
        </div>

        <div class="text-center my-2">
          <img
            class="h-12 w-12 rounded-full mx-auto"
            src="~/assets/img/article.png"
            alt=""
          />
          <a href="#" class="text-xs profilelink-a text-unknown"
            >I write Articles</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: [Array, Object],
      default: () => {}
    }
  }
}
</script>

<style>
</style>