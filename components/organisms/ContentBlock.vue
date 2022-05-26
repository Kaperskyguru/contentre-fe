<template>
  <div class="container mx-auto max-w-6xl">
    <h2 class="text-4xl font-bold tracking-tight text-center">My Works</h2>
    <p class="mt-2 text-lg text-center text-gray-600">
      Check out a list of some of my works below.
    </p>
    <div
      id="allContents"
      class="
        grid grid-cols-4
        gap-8
        mt-10
        sm:grid-cols-8 sm:px-8
        lg:grid-cols-12
        xl:px-0
      "
    >
      <div
        v-for="(item, index) in contents.items"
        :key="index"
        class="
          flex
          overflow-hidden
          relative
          flex-col
          col-span-4
          justify-between
          items-center
          py-12
          px-8
          space-y-4
          bg-gray-100
          sm:rounded-xl
        "
      >
        <div class="p-3 text-white bg-blue-500 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-8 h-8"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
            <path d="M5 8v-3a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-5"></path>
            <circle cx="6" cy="14" r="3"></circle>
            <path d="M4.5 17l-1.5 5l3 -1.5l3 1.5l-1.5 -5"></path>
          </svg>
        </div>
        <h4 class="text-xl font-medium text-gray-700">{{ item.title }}</h4>
        <p class="text-base text-center text-gray-500">
          {{ item.excerpt }}
        </p>
      </div>
    </div>
    <button
      id="nextPage"
      class="
        inline-flex
        justify-center
        items-center
        py-3
        mt-6
        w-full
        font-sans
        text-sm
        leading-none
        text-center text-blue-600
        hover:text-white
        no-underline
        bg-transparent
        hover:bg-blue-600
        rounded
        border border-b-2 border-blue-600
        hover:border-blue-600
        cursor-pointer
        sm:mt-8 sm:text-base
        md:text-lg
      "
      @click.prevent="next"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  props: {
    portfolio: {
      type: Array,
      default: () => []
    },
    contents: {
      type: [Object, Array],
      default: () => {}
    }
  }
}
</script>

<style>
</style>