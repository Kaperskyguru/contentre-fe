<template>
  <section class="px-3 h-full md:px-12">
    <!-- TOP -->
    <section class="flex flex-wrap justify-between items-center py-4">
      <div class="flex justify-between items-center py-4">
        <PageTitle>Content</PageTitle>
      </div>
      <div class="flex items-center sm:justify-center">
        <p>3 selected</p>
        <div class="flex justify-center items-center px-3 bg-gray-50">
          <div
            class="px-5 bg-white rounded-lg border border-gray-200 shadow-lg"
          >
            <span class="inline-block relative space-x-6 align-top">
              <button class="text-2xl leading-10 text-right">
                <svg
                  width="24"
                  height="24"
                  class="text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3333"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17
                         9l-5 5-5-5M12 12.8V2.5"
                  ></path>
                </svg>
              </button>

              <button
                class="mr-8 text-2xl leading-10 text-gray-500"
                style="margin-right: 25px"
              >
                <i class="mr-8 fas fa-layer-group"></i>
              </button>
            </span>

            <span class="inline-block relative space-x-6 align-top">
              <button class="text-3xl leading-10 text-left text-gray-500">
                <i class="far fa-bookmark fa-xs"></i>
              </button>

              <button class="text-3xl leading-10 text-left text-gray-500">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="transparent"
                  stroke="#3333"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 
                                5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 
                                1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  ></path>
                </svg>
              </button>
              <!-- Favourites Dropdown -->
              <div
                class="
                  absolute
                  top-0
                  left-0
                  z-30
                  mt-12
                  -ml-2
                  w-56
                  min-w-full
                  bg-white
                  rounded
                  shadow-md
                  md:-mr-3
                  text-sm text-gray-700
                  border border-gray-200
                "
                x-show="favourites.showSearch"
                style="display: none"
                x-transition:enter="transition ease duration-300 transform"
                x-transition:enter-start="opacity-0 translate-y-2"
                x-transition:enter-end="opacity-100 translate-y-0"
                x-transition:leave="transition ease duration-300 transform"
                x-transition:leave-start="opacity-100 translate-y-0"
                x-transition:leave-end="opacity-0 translate-y-4"
              >
                <span
                  class="
                    absolute
                    top-0
                    left-0
                    -mt-1
                    ml-4
                    w-3
                    h-3
                    bg-white
                    transform
                    rotate-45
                    border border-gray-200
                  "
                ></span>
                <div
                  class="overflow-auto relative z-10 w-full bg-white rounded"
                >
                  <!-- Search Input Field -->
                  <div class="p-1">
                    <input
                      type="text"
                      class="
                        block
                        px-3
                        w-full
                        h-10
                        leading-10
                        rounded
                        outline-none
                        form-input
                        border-2 border-indigo-500
                        focus:border-primary-500
                      "
                      placeholder="Start typing..."
                      x-ref="searchField"
                      x-model="favourites.search"
                    />
                  </div>
                  <!-- Filtered Options -->
                  <ul x-show="favourites.filteredOptions().length">
                    <!-- Loop Filtered Options -->
                    <template
                      x-for="(option,index) in favourites.filteredOptions()"
                    >
                      <li>
                        <a
                          href="#"
                          class="
                            items-center
                            w-full
                            h-10
                            leading-none
                            focus:outline-none focus:bg-gray-200
                          "
                        >
                          <span class="block w-10 text-xl text-center">
                            <i class="mdi" :class="'mdi-' + option.icon"></i>
                          </span>
                          <span class="block flex-1"></span>
                          <span
                            class="block w-10 text-2xl text-center bg-red-500"
                          >
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#000"
                              stroke-width="3"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path
                                d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5"
                              ></path>
                            </svg>
                          </span>
                        </a>
                      </li>
                    </template>
                  </ul>
                </div>
              </div>
            </span>
          </div>
        </div>

        <div class="inline-flex relative justify-start ml-2">
          <input
            type="search"
            class="py-3 px-8 rounded-lg border-0 shadow bg-purple-white"
            placeholder="Search by name..."
          />
          <div class="absolute mt-4 ml-2 pin-r pin-t">
            <svg
              version="1.1"
              class="h-4 text-dark"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 52.966 52.966"
              style="enable-background: new 0 0 52.966 52.966"
              xml:space="preserve"
            >
              <path
                d="M51.704,51.273L36.845,35.82c3.79-3.801,6.138-9.041,6.138-14.82c0-11.58-9.42-21-21-21s-21,9.42-21,21s9.42,21,21,21
          c5.083,0,9.748-1.817,13.384-4.832l14.895,15.491c0.196,0.205,0.458,0.307,0.721,0.307c0.25,0,0.499-0.093,0.693-0.279
          C52.074,52.304,52.086,51.671,51.704,51.273z M21.983,40c-10.477,0-19-8.523-19-19s8.523-19,19-19s19,8.523,19,19
          S32.459,40,21.983,40z"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>

    <section
      class="flex flex-col justify-between space-y-6 md:flex-row md:space-y-0"
    >
      <div class="flex flex-wrap justify-end items-start -mb-3">
        <div class="inline-flex relative ml-2">
          <svg
            class="absolute top-0 right-0 m-4 w-2 h-2 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 412 232"
          >
            <path
              d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355
                  0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 
                  17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592
                   0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
              fill="#648299"
              fill-rule="nonzero"
            ></path>
          </svg>
          <select
            class="
              pr-10
              pl-5
              w-64
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
            <option>Month</option>
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
        <div class="inline-flex relative ml-2">
          <svg
            class="absolute top-0 right-0 m-4 w-2 h-2 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 412 232"
          >
            <path
              d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355
                  0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 
                  17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592
                   0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
              fill="#648299"
              fill-rule="nonzero"
            ></path>
          </svg>
          <select
            class="
              pr-10
              pl-5
              w-64
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
            <option>Filter</option>
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
      <div class="mr-6">
        <Button type="link" :to="{ name: 'contents/add' }" appearance="primary">
          Add Content
        </Button>
      </div>
    </section>

    <!-- table -->
    <section>
      <div class="mt-2 bg-white">
        <div class="container px-4 mx-auto">
          <div class="overflow-x-auto px-4 -mx-4 sm:-mx-8">
            <!-- <div
              class="inline-block overflow-hidden min-w-full rounded-lg shadow"
            > -->
            <Contents :checked.sync="checked" />
            <!-- </div> -->
          </div>
        </div>
      </div>
    </section>
    <!-- end of table -->
  </section>
</template>

<script>
export default {
  name: 'ContentPage',
  layout: 'Dashboard',
  data: () => ({
    checked: [],
    option: {
      icon: ''
    }
  }),

  watch: {
    $route() {
      this.checked = []
    }
  }
}
</script>

<style>
</style>