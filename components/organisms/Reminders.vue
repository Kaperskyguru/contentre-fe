<template>
  <div
    class="py-6 w-full text-gray-700 bg-white rounded-lg border border-gray-200"
  >
    <div
      class="
        flex
        justify-between
        items-center
        pl-4
        mb-3
        space-x-3
        text-sm
        font-semibold
        leading-8
        text-center text-gray-900
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

          <div
            v-if="showChildren"
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
                    text-sm
                    font-normal
                    leading-8
                    text-gray-900
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
                        <TextField placeholder="Reminder Name" label="Name" />
                      </div>
                    </div>

                    <section class="flex flex-wrap items-center pb-4">
                      <div class="mb-6 w-full md:mb-0 md:w-1/2">
                        <DateField
                          v-model="fieldDate"
                          class="flex-1"
                          :max="new Date()"
                          label="Date"
                          placeholder=""
                        />
                        <div class="absolute left-0 text-gray-500 date-icon">
                          <i class="fas fa-calendar-alt"></i>
                        </div>
                      </div>

                      <div class="px-3 mb-6 w-full md:mb-0 md:w-1/2">
                        <div class="inline-flex relative ml-2">
                          <DateField
                            v-model="fieldDate"
                            class="flex-1"
                            :max="new Date()"
                            label="Time"
                            placeholder="Set reminder time"
                          />
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
                          <DropdownField>
                            <option>Set your reminder interval</option>
                            <option>Red</option>
                            <option>Blue</option>
                            <option>Yellow</option>
                            <option>Black</option>
                            <option>Orange</option>
                            <option>Purple</option>
                            <option>Gray</option>
                            <option>White</option>
                          </DropdownField>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Button class="" type="submit"> Save </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </li>
      </span>
    </div>

    <div class="w-full">
      <Warning
        v-if="isUnderDevelopment"
        href="https://forms.gle/9PG1eC373JZLhFXK7"
        button-text="Give Feedback"
        >Reminder feature is under development</Warning
      >
    </div>
    <!-- ====== Cards Section Start -->
    <div class="container space-y-6 w-full">
      <div class="flex flex-wrap -mx-2 mt-8">
        <div class="px-4 w-full">
          <div
            class="p-4 bg-white rounded-lg border shadow-sm transition-shadow"
          >
            <div class="flex flex-col justify-between">
              <div class="flex flex-col">
                <div class="relative pb-4">
                  <span class="font-bold text-black">Daily Post</span>
                  <span
                    class="
                      py-1
                      px-3
                      text-xs text-purple-600
                      bg-blue-200
                      rounded-lg
                    "
                    >Daily</span
                  >
                </div>
                <div class="w-full">
                  <span class="text-sm font-bold text-gray-500"
                    >Date: 18/11/2021</span
                  >
                  <span class="text-sm font-bold text-gray-500"
                    >Time:12:00 AM</span
                  >
                </div>
              </div>
              <div class="px-1 mt-8 w-full">
                <div class="flex items-start w-full rounded-lg">
                  <div
                    class="
                      flex flex-col
                      pt-2
                      mb-6
                      space-y-4 space-x-0
                      w-full
                      md:flex-row md:space-y-0 md:space-x-4
                    "
                  >
                    <Button appearance="outline"> Edit </Button>
                    <Button appearance="outline-red"> Disable </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap -mx-2 mt-8">
        <div class="px-4 w-full">
          <div
            class="p-4 bg-white rounded-lg border shadow-sm transition-shadow"
          >
            <div class="flex flex-col justify-between">
              <div class="flex flex-col">
                <div class="relative pb-4">
                  <span class="font-bold text-black"
                    >Write Fintech Article</span
                  >
                  <span
                    class="
                      py-1
                      px-3
                      text-xs text-purple-600
                      bg-blue-200
                      rounded-lg
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
              <div class="px-1 mt-8 w-full">
                <div class="flex items-start w-full rounded-lg">
                  <div
                    class="
                      flex flex-col
                      pt-2
                      mb-6
                      space-y-4 space-x-0
                      w-full
                      md:flex-row md:space-y-0 md:space-x-4
                    "
                  >
                    <Button appearance="outline"> Edit </Button>
                    <Button appearance="outline-red"> Disable </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DropdownField from '../atoms/DropdownField.vue'
export default {
  name: 'ReMinders',

  components: {
    PlusIcon: () => import('~/assets/icons/plus.svg?inline'),
    DropdownField
  },
  data: () => ({
    showChildren: false,
    isUnderDevelopment: true,
    fieldDate: ''
  }),

  methods: {
    onShowChildren() {
      // if (this.isUnderDevelopment) return
      this.showChildren = !this.showChildren
    }
  }
}
</script>

<style scoped>
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