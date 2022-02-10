<template>
  <div class="flex fixed w-full bg-teal-900" style="background: #083430">
    <div class="text-white border-r-2 cursor-pointer" style="width: 66px">
      <a
        href="#"
        class="
          inline-flex
          items-center
          py-3
          px-2
          hover:text-white
          focus:text-white
        "
        :class="{
          'justify-start': menu,
          'justify-center': !menu
        }"
      >
        <span class="ml-2 font-bold" :class="{ hidden: menu }" :x-show="menu"
          >T</span
        >
        <svg
          fill="currentColor"
          :class="{ 'rotate-180': menu, 'rotate-0': !menu }"
          viewBox="0 0 20 20"
          class="
            inline
            mt-1
            ml-2
            w-4
            h-4
            text-white
            transition-transform
            duration-200
            transform
            md:-mt-1
          "
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 
                1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </a>
    </div>

    <div
      class="
        w-full
        text-gray-700
        bg-white
        dark-mode:text-gray-200 dark-mode:bg-gray-800
      "
      style="background: #083430"
      :class="{ hidden: menu }"
    >
      <div
        :x-data="{ open }"
        class="
          pr-4
          mx-auto
          max-w-screen-xl
          md:items-center md:flex-row
          flex flex-col
        "
      >
        <div class="flex flex-row justify-between items-center p-4">
          <nav
            :class="{ flex: open, hidden: !open }"
            class="
              hidden
              flex-col
              grow
              pb-4
              md:flex md:justify-end md:flex-row md:pb-0
            "
          >
            <!--  -->
            <PortfolioMenu />
            <PortfolioMenu />
          </nav>
          <button
            class="rounded-lg focus:outline-none md:hidden focus:shadow-outline"
            @click.prevent="open = !open"
          >
            <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
              <path
                x-show="!open"
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
              <path
                :x-show="open"
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!--  -->
  </div>
</template>

<script>
export default {
  data: () => ({
    open: false,
    menu: false,
    panel: false
  }),

  computed: {
    window() {
      if (process.browser) {
        return window
      }
      return null
    }
  }
}
</script>

<style>
</style>