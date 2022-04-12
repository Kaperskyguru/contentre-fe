<template>
  <main
    class="flex min-w-full min-h-screen bg-gray-500"
    style="background: #102a27"
  >
    <!-- <div
      class="grow h-full text-gray-800 bg-transparent"
      
    > -->
    <header class="flex fixed items-center pr-6 w-full h-16 bg-white sm:pr-10">
      <div
        class="relative w-16"
        style="
          background: #083430;
          width: 66px;
          border-bottom: 30px solid white;
        "
      >
        <a href="#" class="inline-flex justify-center items-center">
          <img
            src="~/assets/img/icon.png"
            class="img-fluid"
            alt="contentre logo"
          />
        </a>
      </div>

      <div class="relative w-full max-w-md sm:-ml-2">
        <div x-data="{ open: false }">
          <div
            class="relative"
            :class="{
              'border-indigo-700 transform transition duration-300 ': open
            }"
            x-transition:enter-end="transform opacity-100 scale-100"
            x-transition:leave="transition ease-in duration-75"
            x-transition:leave-start="transform opacity-100 scale-100"
            @click="open = !open"
          >
            <div class="space-x-3 cursor-pointer">
              <div class="text-gray-900 dark:text-white">
                <div class="ml-8 text-xl font-bold cursor-pointer">
                  Portfolio
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    :class="{ 'rotate-180': open, 'rotate-0': !open }"
                    class="
                      inline
                      mt-1
                      ml-1
                      w-4
                      h-4
                      transition-transform
                      duration-200
                      rotate-0
                      md:-mt-1
                    "
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      c=""
                      lip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <div
              x-show="open"
              x-transition:enter="transition ease-out duration-100"
              x-transition:enter-start="transform opacity-0 scale-95"
              x-transition:enter-end="transform opacity-100 scale-100"
              x-transition:leave="transition ease-in duration-75"
              x-transition:leave-start="transform opacity-100 scale-100"
              x-transition:leave-end="transform opacity-0 scale-95"
              class="
                absolute
                py-3
                px-5
                mt-2
                w-60
                bg-white
                dark:bg-gray-800
                rounded-lg
                border
                dark:border-transparent
                shadow
              "
              style="display: none"
            >
              <ul class="space-y-3 dark:text-white">
                <li class="font-medium">
                  <a
                    href="#"
                    class="
                      flex
                      items-center
                      border-r-4 border-transparent
                      hover:border-indigo-700
                      transition-colors
                      duration-200
                    "
                  >
                    <div class="mr-3">
                      <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                    </div>
                    Account
                  </a>
                </li>
                <li class="font-medium">
                  <a
                    href="#"
                    class="
                      flex
                      items-center
                      border-r-4 border-transparent
                      hover:border-indigo-700
                      transition-colors
                      duration-200
                    "
                  >
                    <div class="mr-3">
                      <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        ></path>
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                    </div>
                    Setting
                  </a>
                </li>
                <hr class="dark:border-gray-700" />
                <li class="font-medium">
                  <a
                    href="#"
                    class="
                      flex
                      items-center
                      border-r-4 border-transparent
                      hover:border-red-600
                      transition-colors
                      duration-200
                    "
                  >
                    <div class="mr-3 text-red-600">
                      <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        ></path>
                      </svg>
                    </div>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="flex shrink-0 items-center ml-auto">
        <div class="flex flex-wrap justify-end items-start -mb-2">
          <div class="inline-flex cursor-pointer text-dark-900">Preview</div>
          <div class="inline-flex ml-6 cursor-pointer text-dark-900">Save</div>
          <button
            class="
              inline-flex
              py-1
              px-4
              ml-6
              text-sm text-white
              rounded-md
              form-btn
            "
          >
            Submit
          </button>
        </div>
      </div>

      <div class="flex shrink-0 items-center ml-auto">
        <div
          class="inline-flex relative items-center p-2 cursor-pointer"
          @click="panel = !panel"
          @click.prevent="panel = false"
        >
          <span
            class="
              overflow-hidden
              mx-2
              w-8
              h-8
              bg-gray-100
              rounded-full
              border
              sm:ml-3
            "
          >
            <img
              src="~/assets/img/avatar.jpg"
              alt="user profile photo"
              class="object-cover w-full h-full"
            />
          </span>
          <div class="hidden md:flex md:flex-col md:items-end md:leading-tight">
            <span class="text-sm text-gray-600">Janet Smith</span>
          </div>
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="hidden w-6 h-6 text-gray-300 sm:block"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div
          class="absolute p-2 w-48 bg-white rounded-md border"
          style="top: 60px; display: none"
          x-show="panel"
        >
          <div class="p-2 hover:bg-blue-100 cursor-pointer">Profile</div>
          <div class="p-2 hover:bg-blue-100 cursor-pointer">Messages</div>
          <div class="p-2 hover:bg-blue-100 cursor-pointer">To-Do's</div>
        </div>
      </div>
    </header>

    <section class="overflow-hidden grow h-full">
      <Nuxt />

      <Toast />
    </section>
    <!-- </div> -->
  </main>
</template>

<script>
export default {
  data: () => ({
    open: false,
    menu: false,
    panel: false
  })
}
</script>

<style scoped>
</style>