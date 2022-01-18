<template>
  <!-- Main -->

  <!-- Right Side -->
  <div class="w-full md:w-10/12 mx-2 h-64 shadow rounded-xl bg-white">
    <!-- Profile tab -->
    <!-- About Section -->
    <div class="bg-white shadow-sm rounded-xl">
      <div
        class="
          flex
          items-center
          space-x-2
          font-semibold
          text-gray-900
          leading-8
          px-4
          border-b-2
          py-6
        "
      >
        <span class="tracking-wide">Notification</span>
      </div>
    </div>
    <!-- End of about section -->

    <!-- select notification -->
    <div class="bg-white shadow-sm rounded-sm px-4 py-2">
      <div class="w-full block bg-white text-gray-700">
        <div class="block text-gray-500 pb-2">
          <p class="text-base mb-4">
            Select method of notification (You are allowed to select more than
            one)
          </p>
        </div>

        <div
          class="
            flex flex-col
            space-y-6
            md:space-y-0 md:flex-row
            justify-between
          "
        >
          <div class="flex flex-wrap items-start justify-end -mb-3">
            <button
              class="
                inline-flex
                px-8
                py-2
                form-btn
                text-white
                border
                rounded-md
                mb-3
              "
            >
              Email
            </button>
            <button
              class="
                inline-flex
                px-8
                py-2
                text-white
                form-btn
                rounded-md
                ml-6
                mb-3
              "
            >
              In-app
            </button>
            <button
              class="
                inline-flex
                px-8
                py-2
                text-white
                form-btn
                rounded-md
                ml-6
                mb-3
              "
            >
              Push
            </button>
          </div>
        </div>

        <div class="py-6">
          <p class="text-base text-gray-500">Select type of notification</p>

          <div class="px-2 my-4 space-y-6">
            <div class="flex">
              <div class="inline-flex flex-shrink-0 justify-center mr-2">
                <label
                  for="checkbox"
                  class="relative flex-inline items-center rounded-2xl"
                />
                <input
                  id="checkbox"
                  type="checkbox"
                  class="relative peer z-20 focus:ring-0"
                />
              </div>
              <div>
                <span class="block text-base">News and Updates</span>
                <span class="block text-gray-500 text-xs"
                  >Get notified on our latest news and updates</span
                >
              </div>
            </div>

            <div class="flex">
              <div class="inline-flex flex-shrink-0 justify-center mr-2">
                <label
                  for="checkbox"
                  class="relative flex-inline items-center rounded-2xl"
                />
                <input
                  id="checkbox"
                  type="checkbox"
                  class="relative peer z-20 focus:ring-0"
                />
              </div>
              <div>
                <span class="block text-base">News Comments</span>
                <span class="block text-gray-500 text-xs"
                  >Get notified on any new comments or direct message on any of
                  your channel</span
                >
              </div>
            </div>

            <div class="flex">
              <div class="inline-flex flex-shrink-0 justify-center mr-2">
                <label
                  for="checkbox"
                  class="relative flex-inline items-center rounded-2xl"
                />
                <input
                  id="checkbox"
                  type="checkbox"
                  class="relative peer z-20 focus:ring-0"
                />
              </div>
              <div>
                <span class="block text-base">Reminders</span>
                <span class="block text-gray-500 text-xs"
                  >Keep up with your goals and target</span
                >
              </div>
            </div>

            <div class="flex">
              <div class="inline-flex flex-shrink-0 justify-center mr-2">
                <label
                  for="checkbox"
                  class="relative flex-inline items-center rounded-2xl"
                />
                <input
                  id="checkbox"
                  type="checkbox"
                  class="relative peer z-20 focus:ring-0"
                />
              </div>
              <div>
                <span class="block text-base">Activities</span>
                <span class="block text-gray-500 text-xs"
                  >Posts, interactions, updates on articles, etc</span
                >
              </div>
            </div>

            <div class="flex">
              <div class="inline-flex flex-shrink-0 justify-center mr-2">
                <label
                  for="checkbox"
                  class="relative flex-inline items-center rounded-2xl"
                />
                <input
                  id="checkbox"
                  type="checkbox"
                  class="relative peer z-20 focus:ring-0"
                />
              </div>
              <div>
                <span class="block text-base">Request</span>
                <span class="block text-gray-500 text-xs">
                  New request to connect or share with friends</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- End of select notification--->

      <div class="bg-white shadow-sm rounded-sm px-4 py-6">
        <div
          class="
            w-full
            px-3
            py-6
            block
            bg-white
            text-gray-700
            border border-gray-200
            rounded-lg
          "
        >
          <div
            class="
              flex
              items-center
              pl-4
              justify-between
              space-x-3
              font-semibold
              text-gray-900 text-sm
              leading-8
              text-center
            "
          >
            <span>Set Reminders</span>
            <span class="text-black">
              <li
                class="block relative"
                x-data="{showChildren:false}"
                @click.prevent="showChildren = false"
              >
                <a
                  href="#"
                  class="
                    flex
                    items-center
                    h-10
                    leading-10
                    px-4
                    rounded
                    cursor-pointer
                    mx-1
                  "
                  @click.prevent="showChildren = !showChildren"
                >
                  <i class="fas fa-plus"></i>
                </a>
                <div
                  class="
                    mega-dropdown
                    rounded-lg
                    text-sm
                    absolute
                    top-auto
                    left-0
                    z-30
                    mt-1
                  "
                  x-show="showChildren"
                  x-transition:enter="transition ease duration-300 transform"
                  x-transition:enter-start="opacity-0 translate-y-2"
                  x-transition:enter-end="opacity-100 translate-y-0"
                  x-transition:leave="transition ease duration-300 transform"
                  x-transition:leave-start="opacity-100 translate-y-0"
                  x-transition:leave-end="opacity-0 translate-y-4"
                  style="display: none"
                >
                  <div class="">
                    <div
                      class="px-3 py-6 text-gray-700 border bg-white rounded-lg"
                    >
                      <div
                        class="
                          space-x-3
                          font-normal
                          text-gray-900 text-sm
                          leading-8
                          pb-2
                        "
                      >
                        <div
                          class="
                            md:flex md:items-center
                            block
                            text-black
                            font-bold
                            pl-2
                            pb-2
                          "
                        >
                          <span class="text-sm"> Set Reminder </span>
                        </div>
                      </div>

                      <div
                        class="
                          flex
                          justify-between
                          w-full
                          px-3
                          block
                          text-gray-700
                        "
                      >
                        <form class="w-full">
                          <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full md:w-3/4 px-2 mb-2 md:mb-0">
                              <label
                                class="
                                  flex
                                  text-gray-700 text-xs
                                  font-bold
                                  mb-2
                                "
                              >
                                Name
                              </label>
                              <input
                                type="email"
                                class="
                                  w-full
                                  mt-1
                                  p-2
                                  text-sm
                                  border
                                  rounded-md
                                "
                                placeholder="Reminder Name"
                              />
                            </div>
                          </div>

                          <section
                            class="pb-4 flex flex items-center flex-wrap"
                          >
                            <div class="w-full md:w-1/2 mb-6 md:mb-0">
                              <label
                                class="flex text-gray-700 text-xs font-bold"
                              >
                                Date
                              </label>
                              <input
                                type="email"
                                class="
                                  w-full
                                  h-10
                                  mt-2
                                  p-2
                                  text-sm
                                  border
                                  rounded-md
                                  relative
                                "
                                placeholder=""
                              />
                              <div
                                class="date-icon absolute text-gray-500 left-0"
                              >
                                <i class="fas fa-calendar-alt"></i>
                              </div>
                            </div>

                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                              <label
                                class="
                                  flex
                                  text-gray-700 text-xs
                                  font-bold
                                  mb-2
                                  ml-2
                                "
                              >
                                Time
                              </label>
                              <div class="relative inline-flex ml-2">
                                <svg
                                  class="
                                    w-2
                                    h-2
                                    absolute
                                    top-0
                                    right-0
                                    m-4
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
                                    border border-gray-300
                                    rounded-sm
                                    text-gray-600
                                    h-10
                                    pl-5
                                    pr-10
                                    bg-white
                                    hover:border-gray-400
                                    focus:outline-none
                                    appearance-none
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
                                class="
                                  flex
                                  text-gray-700 text-xs
                                  font-bold
                                  mb-2
                                "
                              >
                                Interval
                              </label>
                              <div class="relative inline-flex">
                                <svg
                                  class="
                                    w-2
                                    h-2
                                    absolute
                                    top-0
                                    right-0
                                    m-4
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
                                    border border-gray-300
                                    text-gray-600
                                    h-10
                                    pl-5
                                    pr-10
                                    bg-white
                                    hover:border-gray-400
                                    focus:outline-none
                                    appearance-none
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
                            class="
                              w-full
                              px-3
                              flex
                              items-center
                              justify-center
                              mt-8
                            "
                          >
                            <button
                              class="
                                shadow
                                form-btn
                                w-3/5
                                focus:shadow-outline
                                text-white
                                font-bold
                                py-2
                                px-10
                                rounded-lg
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
              <div class="w-full px-4">
                <div
                  class="
                    p-4
                    transition-shadow
                    border
                    rounded-lg
                    shadow-sm
                    bg-white
                  "
                >
                  <div class="flex items-start justify-between">
                    <div class="flex flex-col">
                      <div class="relative pb-4">
                        <span class="text-black font-bold">Daily Post</span>
                        <span
                          class="
                            bg-blue-200
                            px-3
                            py-1
                            text-purple-600 text-xs
                            rounded-lg
                          "
                          >Daily</span
                        >
                      </div>
                      <span class="text-gray-500 text-sm font-bold"
                        >Date: 18/11/2021</span
                      >
                      <span class="text-gray-500 text-sm font-bold"
                        >Time:12:00 AM</span
                      >
                    </div>
                    <div class="px-1 mt-8">
                      <div class="flex flex row items-start rounded-lg">
                        <div
                          class="
                            flex flex-col
                            space-y-6
                            md:space-y-0 md:flex-row
                            justify-between
                          "
                        >
                          <div
                            class="flex flex-wrap items-start justify-end -mb-3"
                          >
                            <button
                              class="
                                inline-flex
                                px-8
                                py-2
                                form-btn
                                text-white
                                border
                                rounded-md
                                mb-3
                              "
                            >
                              Edit
                            </button>
                            <button
                              class="
                                inline-flex
                                px-8
                                py-2
                                text-black
                                bg-gray-500
                                rounded-md
                                ml-6
                                mb-3
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
              <div class="w-full px-4">
                <div
                  class="
                    p-4
                    transition-shadow
                    border
                    rounded-lg
                    shadow-sm
                    bg-white
                  "
                >
                  <div class="flex items-start justify-between">
                    <div class="flex flex-col">
                      <div class="relative pb-4">
                        <span class="text-black font-bold"
                          >Write Fintech Article</span
                        >
                        <span
                          class="
                            bg-blue-200
                            px-3
                            py-1
                            text-purple-600 text-xs
                            rounded-lg
                          "
                          >Weekly</span
                        >
                      </div>
                      <span class="text-gray-500 text-sm font-bold"
                        >Date: 18/11/2021</span
                      >
                      <span class="text-gray-500 text-sm font-bold"
                        >Time:12:00 AM</span
                      >
                    </div>
                    <div class="px-1 mt-8">
                      <div class="flex flex row items-start rounded-lg">
                        <div
                          class="
                            flex flex-col
                            space-y-6
                            md:space-y-0 md:flex-row
                            justify-between
                          "
                        >
                          <div
                            class="flex flex-wrap items-start justify-end -mb-3"
                          >
                            <button
                              class="
                                inline-flex
                                px-8
                                py-2
                                form-btn
                                text-white
                                border
                                rounded-md
                                mb-3
                              "
                            >
                              Edit
                            </button>
                            <button
                              class="
                                inline-flex
                                px-8
                                py-2
                                text-black
                                bg-gray-500
                                rounded-md
                                ml-6
                                mb-3
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
              <div class="w-full px-4">
                <div
                  class="
                    p-4
                    transition-shadow
                    border
                    rounded-lg
                    shadow-sm
                    bg-white
                  "
                >
                  <div class="flex items-start justify-between">
                    <div class="flex flex-col">
                      <div class="relative pb-4">
                        <span class="text-black font-bold"
                          >Write Medium Article</span
                        >
                        <span
                          class="
                            bg-blue-200
                            px-3
                            py-1
                            text-purple-600 text-xs
                            rounded-lg
                          "
                          >Weekly</span
                        >
                      </div>
                      <span class="text-gray-500 text-sm font-bold"
                        >Date: 18/11/2021</span
                      >
                      <span class="text-gray-500 text-sm font-bold"
                        >Time:12:00 AM</span
                      >
                    </div>
                    <div class="px-1 mt-8">
                      <div class="flex flex row items-start rounded-lg">
                        <div
                          class="
                            flex flex-col
                            space-y-6
                            md:space-y-0 md:flex-row
                            justify-between
                          "
                        >
                          <div
                            class="flex flex-wrap items-start justify-end -mb-3"
                          >
                            <button
                              class="
                                inline-flex
                                px-8
                                py-2
                                form-btn
                                text-white
                                border
                                rounded-md
                                mb-3
                              "
                            >
                              Edit
                            </button>
                            <button
                              class="
                                inline-flex
                                px-8
                                py-2
                                text-black
                                bg-gray-500
                                rounded-md
                                ml-6
                                mb-3
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
      </div>

      <!-- End of Change Password -->

      <!-- End of profile tab -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationPage',
  layout: 'SettingsLayout'
}
</script>

<style>
</style>