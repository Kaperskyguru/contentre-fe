<template>
  <div
    class="
      block
      py-6
      px-3
      w-full
      text-gray-700
      bg-white
      rounded-lg
      border border-gray-200
    "
  >
    <div
      class="
        flex
        justify-between
        items-center
        pl-4
        space-x-3
        font-semibold
        leading-8
        text-center text-gray-900 text-sm
      "
    >
      <span>Set Reminders</span>
      <span class="text-black">
        <li class="block relative" :x-data="showChildren">
          <a
            href="#"
            class="
              flex
              items-center
              px-4
              mx-1
              h-10
              leading-10
              rounded
              cursor-pointer
            "
            @click.prevent="onShowChildren"
          >
            <PlusIcon />
          </a>
          <!-- </li> -->
          <div
            class="
              absolute
              top-auto
              right-0
              z-30
              mt-1
              text-sm
              rounded-lg
              mega-dropdown
            "
            :x-show="showChildren"
            x-transition:enter="transition ease duration-300 transform"
            x-transition:enter-start="opacity-0 translate-y-2"
            x-transition:enter-end="opacity-100 translate-y-0"
            x-transition:leave="transition ease duration-300 transform"
            x-transition:leave-start="opacity-100 translate-y-0"
            x-transition:leave-end="opacity-0 translate-y-4"
            :class="{ hidden: !showChildren }"
          >
            <div class="">
              <div class="py-6 px-3 text-gray-700 bg-white rounded-lg border">
                <div
                  class="
                    pb-2
                    space-x-3
                    font-normal
                    leading-8
                    text-gray-900 text-sm
                  "
                >
                  <div
                    class="
                      block
                      pb-2
                      pl-2
                      font-bold
                      text-black
                      md:flex md:items-center
                    "
                  >
                    <span class="text-sm"> Set Reminder </span>
                  </div>
                </div>

                <div class="flex justify-between px-3 w-full text-gray-700">
                  <form class="w-full">
                    <div class="flex flex-wrap -mx-3 mb-6">
                      <div class="px-2 mb-2 w-full md:mb-0">
                        <label
                          class="flex mb-2 text-xs font-bold text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          type="email"
                          class="p-2 mt-1 w-full text-sm rounded-md border"
                          placeholder="Reminder Name"
                        />
                      </div>
                    </div>

                    <section class="flex flex-wrap items-center pb-4">
                      <div class="mb-6 w-full md:mb-0 md:w-1/2">
                        <label class="flex text-xs font-bold text-gray-700">
                          Date
                        </label>
                        <input
                          type="email"
                          class="
                            relative
                            p-2
                            mt-2
                            w-full
                            h-10
                            text-sm
                            rounded-md
                            border
                          "
                          placeholder=""
                        />
                        <div class="absolute left-0 text-gray-500 date-icon">
                          <i class="fas fa-calendar-alt"></i>
                        </div>
                      </div>

                      <div class="px-3 mb-6 w-full md:mb-0 md:w-1/2">
                        <label
                          class="flex mb-2 ml-2 text-xs font-bold text-gray-700"
                        >
                          Time
                        </label>
                        <div class="inline-flex relative ml-2">
                          <svg
                            class="
                              absolute
                              top-0
                              right-0
                              m-4
                              w-2
                              h-2
                              pointer-events-none
                            "
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 412 232"
                          >
                            <path
                              d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                              fill="#648299"
                              fill-rule="nonzero"
                            ></path>
                          </svg>
                          <select
                            class="
                              pr-10
                              pl-5
                              h-10
                              text-gray-600
                              bg-white
                              rounded-sm
                              hover:border-gray-400
                              focus:outline-none
                              appearance-none
                              border border-gray-300
                            "
                          >
                            <option>Set reminder time</option>
                            <option>Pen</option>
                            <option>Red</option>
                            <option>Blue</option>
                            <option>Yellow</option>
                            <option>Black</option>
                            <option>Orange</option>
                          </select>
                        </div>
                      </div>
                    </section>

                    <div class="flex flex-wrap -mx-3 mb-6">
                      <div class="px-3">
                        <label
                          class="flex mb-2 text-xs font-bold text-gray-700"
                        >
                          Interval
                        </label>
                        <div class="inline-flex relative">
                          <svg
                            class="
                              absolute
                              top-0
                              right-0
                              m-4
                              w-2
                              h-2
                              pointer-events-none
                            "
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 412 232"
                          >
                            <path
                              d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                              fill="#648299"
                              fill-rule="nonzero"
                            />
                          </svg>
                          <select
                            class="
                              pr-10
                              pl-5
                              h-10
                              text-gray-600
                              bg-white
                              hover:border-gray-400
                              focus:outline-none
                              appearance-none
                              border border-gray-300
                            "
                          >
                            <option>Set your reminder interval</option>
                            <option>Red</option>
                            <option>Blue</option>
                            <option>Yellow</option>
                            <option>Black</option>
                            <option>Orange</option>
                            <option>Purple</option>
                            <option>Gray</option>
                            <option>White</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div
                      class="flex justify-center items-center px-3 mt-8 w-full"
                    >
                      <button
                        class="
                          py-2
                          px-10
                          w-3/5
                          font-bold
                          text-white
                          rounded-lg
                          shadow
                          form-btn
                          focus:shadow-outline
                        "
                        type="submit"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </li>
      </span>
    </div>

    <!-- ====== Cards Section Start -->
    <div class="container space-y-6">
      <div class="flex flex-wrap -mx-2 mt-8">
        <div class="px-4 w-full">
          <div
            class="p-4 bg-white rounded-lg border shadow-sm transition-shadow"
          >
            <div class="flex justify-between items-start">
              <div class="flex flex-col">
                <div class="relative pb-4">
                  <span class="font-bold text-black">Daily Post</span>
                  <span
                    class="
                      py-1
                      px-3
                      bg-blue-200
                      rounded-lg
                      text-purple-600 text-xs
                    "
                    >Daily</span
                  >
                </div>
                <span class="text-sm font-bold text-gray-500"
                  >Date: 18/11/2021</span
                >
                <span class="text-sm font-bold text-gray-500"
                  >Time:12:00 AM</span
                >
              </div>
              <div class="px-1 mt-8">
                <div class="flex items-start rounded-lg row">
                  <div
                    class="
                      justify-between
                      space-y-6
                      md:space-y-0 md:flex-row
                      flex flex-col
                    "
                  >
                    <div class="flex flex-wrap justify-end items-start -mb-3">
                      <button
                        class="
                          inline-flex
                          py-2
                          px-8
                          mb-3
                          text-white
                          rounded-md
                          border
                          form-btn
                        "
                      >
                        Edit
                      </button>
                      <button
                        class="
                          inline-flex
                          py-2
                          px-8
                          mb-3
                          ml-6
                          text-black
                          bg-gray-500
                          rounded-md
                        "
                      >
                        Disable
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap -mx-2">
        <div class="px-4 w-full">
          <div
            class="p-4 bg-white rounded-lg border shadow-sm transition-shadow"
          >
            <div class="flex justify-between items-start">
              <div class="flex flex-col">
                <div class="relative pb-4">
                  <span class="font-bold text-black"
                    >Write Fintech Article</span
                  >
                  <span
                    class="
                      py-1
                      px-3
                      bg-blue-200
                      rounded-lg
                      text-purple-600 text-xs
                    "
                    >Weekly</span
                  >
                </div>
                <span class="text-sm font-bold text-gray-500"
                  >Date: 18/11/2021</span
                >
                <span class="text-sm font-bold text-gray-500"
                  >Time:12:00 AM</span
                >
              </div>
              <div class="px-1 mt-8">
                <div class="flex items-start rounded-lg row">
                  <div
                    class="
                      justify-between
                      space-y-6
                      md:space-y-0 md:flex-row
                      flex flex-col
                    "
                  >
                    <div class="flex flex-wrap justify-end items-start -mb-3">
                      <button
                        class="
                          inline-flex
                          py-2
                          px-8
                          mb-3
                          text-white
                          rounded-md
                          border
                          form-btn
                        "
                      >
                        Edit
                      </button>
                      <button
                        class="
                          inline-flex
                          py-2
                          px-8
                          mb-3
                          ml-6
                          text-black
                          bg-gray-500
                          rounded-md
                        "
                      >
                        Disable
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap -mx-2">
        <div class="px-4 w-full">
          <div
            class="p-4 bg-white rounded-lg border shadow-sm transition-shadow"
          >
            <div class="flex justify-between items-start">
              <div class="flex flex-col">
                <div class="relative pb-4">
                  <span class="font-bold text-black">Write Medium Article</span>
                  <span
                    class="
                      py-1
                      px-3
                      bg-blue-200
                      rounded-lg
                      text-purple-600 text-xs
                    "
                    >Weekly</span
                  >
                </div>
                <span class="text-sm font-bold text-gray-500"
                  >Date: 18/11/2021</span
                >
                <span class="text-sm font-bold text-gray-500"
                  >Time:12:00 AM</span
                >
              </div>
              <div class="px-1 mt-8">
                <div class="flex items-start rounded-lg row">
                  <div
                    class="
                      justify-between
                      space-y-6
                      md:space-y-0 md:flex-row
                      flex flex-col
                    "
                  >
                    <div class="flex flex-wrap justify-end items-start -mb-3">
                      <button
                        class="
                          inline-flex
                          py-2
                          px-8
                          mb-3
                          text-white
                          rounded-md
                          border
                          form-btn
                        "
                      >
                        Edit
                      </button>
                      <button
                        class="
                          inline-flex
                          py-2
                          px-8
                          mb-3
                          ml-6
                          text-black
                          bg-gray-500
                          rounded-md
                        "
                      >
                        Disable
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ====== Cards Section End -->
  </div>
</template>

<script>
export default {
  name: 'ReMinders',

  components: {
    PlusIcon: () => import('~/assets/icons/plus.svg?inline')
  },
  data: () => ({
    showChildren: false
  }),

  methods: {
    onShowChildren() {
      this.showChildren = !this.showChildren
    }
  }
}
</script>

<style>
/* notification mega-dropdown */

.mega-dropdown {
  width: 28rem;
  margin-left: -22rem;
}

.mega-dropdown2 {
  width: 836px;
  margin-left: -7px;
}

.mega-dropdown3 {
  width: 837px;
  margin-left: -7rem;
}

.mega-dropdown4 {
  width: 839px;
  margin-left: -205px;
}

.date-icon {
  right: 28px;
  margin-top: -36px;
  color: #c1c1c1;
}
/* end of notification mega-dropdown */
</style>