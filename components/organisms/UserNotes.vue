<template>
  <section class="grid grid-cols-1 gap-4 w-full h-full md:grid-cols-12 lg:px-0">
    <div class="col-span-12 p-4 w-full lg:col-span-12">
      <div class="col-span-12 w-full bg-white rounded-lg lg:col-span-12">
        <div class="flex justify-between">
          <div>
            <div class="mb-5">
              <a href="#">
                <p class="text-[14px] font-semibold">NOTES</p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div v-click-outside="onClickOutside" class="overflow-hidden w-full">
        <div class="flex overflow-x-scroll gap-1 mt-4 w-full">
          <div
            class="
              flex
              justify-center
              items-center
              min-w-[10.72rem]
              h-[16.125rem]
              bg-gray-100
              rounded-lg
              border-2
            "
          >
            <hyperlink to="/contents/add?type=note">
              <div
                class="flex flex-col justify-center items-center w-full h-full"
              >
                <div
                  class="
                    flex
                    justify-center
                    items-center
                    w-[3.125rem]
                    h-[3.125rem]
                    bg-[#286963]
                    rounded-full
                  "
                >
                  <i class="text-2xl text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      style="fill: white; transform: ; msfilter: "
                    >
                      <path
                        d="M6.012 18H21V4c0-1.103-.897-2-2-2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.988 5 19.806 5 19s.55-.988 1.012-1zM8 9h3V6h2v3h3v2h-3v3h-2v-3H8V9z"
                      ></path>
                    </svg>
                  </i>
                </div>
                <p class="text-[14px] font-semibold">Create new note</p>
              </div>
            </hyperlink>
          </div>

          <section class="mb-2">
            <div class="">
              <ul class="flex overflow-x-scroll list-none">
                <UserNote
                  v-for="(item, index) in notes.items"
                  :key="index"
                  :notebooks="notebooks"
                  :note="item"
                />
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import vClickOutside from 'v-click-outside'
export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    notes: {
      type: Object,
      default: () => {}
    },

    notebooks: {
      type: Object,
      default: () => {}
    }
  },

  data: () => ({
    menu: false
  }),
  methods: {
    closeDropdown() {
      this.menu = false
      // this.scratchMenu = false
      document.removeEventListener('keyup', this.onKeyUp)
    },

    onKeyUp(event) {
      const keyCode = event.keyCode || event.which
      if (keyCode === 27) this.closeDropdown()
    },

    onClickOutside() {
      // this.isMenuShown = false
      this.closeDropdown()
    }
  }
}
</script>

<style>
</style>