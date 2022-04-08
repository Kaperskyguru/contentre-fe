<template>
  <div v-if="user" v-click-outside="onClickOutside" class="flex items-center">
    <div class="items-center lg:flex">
      <!--user profile -->
      <div class="flex justify-center items-center dark:bg-gray-500">
        <div :x-data="open" class="flex justify-center items-center">
          <div
            class="relative"
            :class="{
              'border-indigo-700 transform transition duration-300 ': open
            }"
            x-transition:enter-end="transform opacity-100 scale-100"
            x-transition:leave="transition ease-in duration-75"
            x-transition:leave-start="transform opacity-100 scale-100"
            @click.prevent="toggleDropdown"
          >
            <div
              class="flex justify-center items-center space-x-3 cursor-pointer"
            >
              <Avatar :name="user.username" :src="user.avatarURL" />
              <div
                class="text-sm text-gray-900 dark:text-white sm:hidden md:flex"
              >
                <div class="cursor-pointer">
                  {{ user.username }}
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
                      md:-mt-1
                    "
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      c
                      lip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <div
              v-show="open == true"
              :x-show="open"
              x-transition:enter="transition ease-out duration-100"
              x-transition:enter-start="transform opacity-0 scale-95"
              x-transition:enter-end="transform opacity-100 scale-100"
              x-transition:leave="transition ease-in duration-75"
              x-transition:leave-start="transform opacity-100 scale-100"
              x-transition:leave-end="transform opacity-0 scale-95"
              class="
                absolute
                top-auto
                right-0
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
            >
              <ul class="space-y-3 dark:text-white">
                <li class="font-medium">
                  <Hyperlink
                    :to="{ name: 'profile' }"
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
                      <ProfileIcon />
                    </div>

                    Account
                  </Hyperlink>
                </li>
                <li class="font-medium">
                  <Hyperlink
                    :to="{ name: 'settings' }"
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
                      <SettingIcon id="settings-icon" />
                    </div>
                    Setting
                  </Hyperlink>
                </li>
                <hr class="dark:border-gray-700" />
                <li class="font-medium">
                  <button
                    href="#"
                    class="
                      flex
                      items-center
                      border-r-4 border-transparent
                      transition-colors
                      duration-200
                      hover:border-red-600
                    "
                    @click.prevent="onLogout"
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
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
export default {
  components: {
    ProfileIcon: () => import('~/assets/icons/profile.svg?inline'),
    SettingIcon: () => import('~/assets/icons/setting.svg?inline')
  },

  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  },

  data: () => ({ open: false }),

  methods: {
    toggleDropdown() {
      this.open = !this.open

      if (this.open) {
        document.addEventListener('keyup', this.onKeyUp)
      } else {
        document.removeEventListener('keyup', this.onKeyUp)
      }
    },

    onLogout() {
      this.$emit('logout')
      this.closeDropdown()
    },

    closeDropdown() {
      this.open = false
      document.removeEventListener('keyup', this.onKeyUp)
    },

    onClickOutside() {
      this.closeDropdown()
    },

    onKeyUp(event) {
      const keyCode = event.keyCode || event.which
      if (keyCode === 27) this.closeDropdown()
    }
  }
}
</script>

<style>
</style>