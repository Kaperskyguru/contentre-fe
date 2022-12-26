<template>
  <div class="overscroll-contain border-t-2 border-l-2 border-white">
    <div class="overflow-hidden">
      <div class="flex justify-between mx-2 space-y-6 md:flex-row md:space-y-0">
        <div class="flex flex-wrap justify-end items-start mb-3">
          <div class="p-2 mb-3 text-2xl text-white cursor-pointer">Color</div>
          <div
            class="p-2 mb-3 ml-6 text-2xl text-white cursor-pointer"
            style="color: #286963"
          >
            Libraries
          </div>
          <div
            class="p-2 mb-3 ml-6 text-2xl text-white cursor-pointer"
            style="color: #286963"
          >
            Background
          </div>
        </div>
      </div>

      <div
        class="flex flex-col justify-between space-y-6 md:flex-row md:space-y-0"
      >
        <div class="flex flex-wrap justify-end items-start mx-2 mb-6">
          <div class="p-2 mb-3 text-2xl text-white cursor-pointer">
            <svg
              width="27"
              height="30"
              viewBox="0 0 27 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="6.85"
                y="9.38125"
                width="20.05"
                height="20.05"
                fill="black"
                stroke="white"
                stroke-width="0.2"
              />
              <rect
                x="0.1"
                y="0.1"
                width="20.05"
                height="20.05"
                fill="white"
                stroke="black"
                stroke-width="0.2"
              />
            </svg>
          </div>
          <div
            class="p-2 mb-3 ml-6 text-2xl text-white cursor-pointer"
            style="color: #286963"
          >
            <img class="" src="~/assets/img/color2.png" alt="img1" />
          </div>
          <div
            class="p-2 mb-3 ml-6 text-2xl text-white cursor-pointer"
            style="color: #286963"
          >
            <img class="" src="~/assets/img/color.png" alt="img1" />
          </div>
        </div>
      </div>

      <div
        class="
          flex flex-col
          justify-between
          items-center
          px-4
          space-y-6
          bg-gray-500
          md:flex-row md:space-y-0
        "
        style="background: #102a27"
      >
        <div class="text-xl font-bold text-white">Layers</div>
        <div class="text-xl text-white">
          <svg
            class="w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </div>
      </div>

      <div
        class="
          py-4
          mt-4
          w-full
          text-gray-700
          dark-mode:text-gray-200
          bg-white
          dark-mode:bg-gray-800
        "
        style="background: #102a27"
      >
        <div
          class="
            flex flex-col
            mx-auto
            max-w-screen-xl
            md:flex-row md:items-center
          "
        >
          <div class="flex flex-row justify-between items-center">
            <nav
              class="
                hidden
                flex-col
                grow
                pb-4
                md:flex md:flex-row md:justify-end md:pb-0
              "
            >
              <div
                class="relative"
                :x-data="{ open }"
                @click.prevent="open = !open"
              >
                <div
                  class="
                    flex flex-row
                    items-center
                    p-2
                    mt-2
                    w-full
                    font-bold
                    text-left text-white
                    bg-teal-900
                    cursor-pointer
                    md:inline md:mt-0 md:ml-4 md:w-auto
                  "
                >
                  <span>Opacity</span>
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    :class="{
                      'rotate-180': open,
                      'rotate-0': !open
                    }"
                    class="
                      inline
                      mt-1
                      ml-4
                      w-4
                      h-4
                      text-white
                      bg-teal-600
                      transition-transform
                      duration-200
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
              </div>

              <div
                class="relative"
                :x-data="{ toolsOpen }"
                @click.prevent="toolsOpen = !toolsOpen"
              >
                <div
                  class="
                    flex flex-row
                    items-center
                    p-2
                    mt-2
                    w-full
                    font-bold
                    text-left text-white
                    bg-teal-900
                    cursor-pointer
                    md:inline md:mt-0 md:ml-4 md:w-auto
                  "
                >
                  <span>Tools</span>
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    :class="{
                      'rotate-180': toolsOpen,
                      'rotate-0': !toolsOpen
                    }"
                    class="
                      inline
                      mt-1
                      ml-4
                      w-4
                      h-4
                      text-white
                      bg-teal-600
                      transition-transform
                      duration-200
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
              </div>

              <div
                class="relative"
                :x-data="{ rulerOpen }"
                @click.prevent="rulerOpen = !rulerOpen"
              >
                <div
                  class="
                    flex flex-row
                    items-center
                    p-2
                    mt-2
                    w-full
                    font-bold
                    text-left text-white
                    bg-teal-900
                    cursor-pointer
                    md:inline md:mt-0 md:ml-4 md:w-auto
                  "
                >
                  <span>Rulers</span>
                </div>
              </div>

              <div
                class="relative"
                :x-data="{ gridOpen }"
                @click.prevent="gridOpen = !gridOpen"
              >
                <div
                  class="
                    flex flex-row
                    items-center
                    p-2
                    mt-2
                    w-full
                    font-bold
                    text-left text-white
                    bg-teal-900
                    cursor-pointer
                    md:inline md:mt-0 md:ml-4 md:w-auto
                  "
                >
                  <span>Grids</span>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    open: true,
    gridOpen: false,
    rulerOpen: false,
    toolsOpen: false,
    menu: false,
    panel: false
  })
}
</script>

<style>
</style>