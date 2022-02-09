<template>
  <div class="relative" :x-data="{ open }" @click.prevent="open = !open">
    <div
      class="
        items-center
        py-2
        px-4
        mt-2
        w-full
        bg-teal-900
        cursor-pointer
        md:w-auto md:inline md:mt-0 md:ml-4
        flex flex-row
        text-xl text-white text-left
      "
    >
      <span>Gilroy</span>
      <svg
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        :class="{ 'rotate-180': open, 'rotate-0': !open }"
        class="
          inline
          mt-1
          ml-16
          w-4
          h-4
          text-white
          bg-teal-600
          transition-transform
          duration-200
          transform
          md:-mt-1
        "
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>
    <div
      :x-show="open"
      x-transition:enter="transition ease-out duration-100"
      x-transition:enter-start="transform opacity-0 scale-95"
      x-transition:enter-end="transform opacity-100 scale-100"
      x-transition:leave="transition ease-in duration-75"
      x-transition:leave-start="transform opacity-100 scale-100"
      x-transition:leave-end="transform opacity-0 scale-95"
      :class="{ hidden: !open }"
      class="
        absolute
        right-0
        mt-2
        w-full
        rounded-md
        shadow-lg
        origin-top-right
        md:w-48
      "
      style="width: 11rem"
    >
      <div class="p-2 bg-white dark-mode:bg-gray-800 rounded-md shadow">
        <a
          class="
            block
            py-2
            px-4
            mt-2
            text-sm
            font-semibold
            dark-mode:text-gray-200 dark-mode:hover:text-white
            hover:text-gray-900
            dark-mode:focus:text-white
            focus:text-gray-900
            bg-transparent
            dark-mode:bg-transparent dark-mode:hover:bg-gray-600
            hover:bg-gray-200
            dark-mode:focus:bg-gray-600
            focus:bg-gray-200
            rounded-lg
            focus:outline-none
            md:mt-0
          "
          href="#"
          >Link #1</a
        >
        <a
          class="
            block
            py-2
            px-4
            mt-2
            text-sm
            font-semibold
            dark-mode:text-gray-200 dark-mode:hover:text-white
            hover:text-gray-900
            dark-mode:focus:text-white
            focus:text-gray-900
            bg-transparent
            dark-mode:bg-transparent dark-mode:hover:bg-gray-600
            hover:bg-gray-200
            dark-mode:focus:bg-gray-600
            focus:bg-gray-200
            rounded-lg
            focus:outline-none
            md:mt-0
          "
          href="#"
          >Link #2</a
        >
        <a
          class="
            block
            py-2
            px-4
            mt-2
            text-sm
            font-semibold
            dark-mode:text-gray-200 dark-mode:hover:text-white
            hover:text-gray-900
            dark-mode:focus:text-white
            focus:text-gray-900
            bg-transparent
            dark-mode:bg-transparent dark-mode:hover:bg-gray-600
            hover:bg-gray-200
            dark-mode:focus:bg-gray-600
            focus:bg-gray-200
            rounded-lg
            focus:outline-none
            md:mt-0
          "
          href="#"
          >Link #3</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    open: false
  })
}
</script>

<style>
</style>