<template>
  <!-- Main -->

  <!-- Right Side -->
  <div class="w-full h-64 bg-white rounded-xl shadow md:w-10/12">
    <!-- Profile tab -->
    <!-- About Section -->
    <div class="bg-white rounded-xl shadow-sm">
      <div
        class="
          flex
          items-center
          py-6
          px-4
          space-x-2
          font-semibold
          leading-8
          text-gray-900
          border-b-2
        "
      >
        <span class="tracking-wide">Notification</span>
      </div>
    </div>
    <!-- End of about section -->

    <!-- select notification -->
    <div class="p-2 w-full bg-white rounded-sm shadow-sm">
      <div class="block w-full text-gray-700 bg-white">
        <div class="block pb-2 text-gray-500">
          <p class="mb-4 text-base">
            Select method of notification (You are allowed to select more than
            one)
          </p>
        </div>

        <div
          class="
            flex flex-col
            justify-between
            px-2
            space-y-6
            md:flex-row md:space-y-0
          "
        >
          <div
            class="flex flex-wrap justify-end items-start -mb-3 text-gray-100"
          >
            <div class="mr-4">
              <CheckField id="email" v-model="email" class="text-gray-100"
                >Email</CheckField
              >
            </div>
            <div class="mr-4">
              <CheckField id="inApp" v-model="inApp" class="text-gray-100"
                >In-app</CheckField
              >
            </div>
            <div class="mr-4">
              <CheckField
                id="push"
                v-model="push"
                :is-under-development="true"
                class="text-gray-100"
                >Push</CheckField
              >
            </div>
          </div>
        </div>

        <div class="py-6">
          <p class="text-base text-gray-500">Select type of notification</p>

          <div class="px-2 my-4 space-y-6">
            <div class="flex">
              <div class="justify-center w-full">
                <CheckField
                  id="news"
                  v-model="news"
                  type="checkbox"
                  class="peer relative z-20 focus:ring-0"
                >
                  <div>
                    <span class="block text-base">News and Updates</span>
                    <span class="block text-xs text-gray-500"
                      >Get notified on our latest news and updates</span
                    >
                  </div>
                </CheckField>
              </div>
            </div>

            <!-- <div class="flex">
              <div class="justify-center w-full">
                <CheckField
                  id="newComments"
                  v-model="newComments"
                  type="checkbox"
                  class="peer relative z-20 focus:ring-0"
                >
                  <div>
                    <span class="block text-base">News Comments</span>
                    <span class="block text-xs text-gray-500"
                      >Get notified on any new comments or direct message on any
                      of your channel</span
                    >
                  </div>
                </CheckField>
              </div>
            </div> -->

            <div class="flex">
              <div class="justify-center w-full">
                <CheckField
                  id="reminders"
                  v-model="reminders"
                  class="peer relative z-20 focus:ring-0"
                >
                  <div>
                    <span class="block text-base">Reminders</span>
                    <span class="block text-xs text-gray-500"
                      >Keep up with your goals and target</span
                    >
                  </div>
                </CheckField>
              </div>
            </div>

            <div class="flex">
              <div class="justify-center w-full">
                <CheckField
                  id="activities"
                  v-model="activities"
                  type="checkbox"
                  class="peer relative z-20 focus:ring-0"
                >
                  <div>
                    <span class="block text-base">Activities</span>
                    <span class="block text-xs text-gray-500"
                      >Posts, interactions, updates on articles, etc</span
                    >
                  </div>
                </CheckField>
              </div>
            </div>

            <!-- <div class="flex">
              <div class="justify-center w-full">
                <CheckField
                  id="request"
                  v-model="request"
                  type="checkbox"
                  class="peer relative z-20 focus:ring-0"
                >
                  <div>
                    <span class="block text-base">Request</span>
                    <span class="block text-xs text-gray-500">
                      New request to connect or share with friends</span
                    >
                  </div>
                </CheckField>
              </div>
            </div> -->
          </div>
        </div>
      </div>

      <!-- End of select notification--->

      <div class="py-6 w-full bg-white rounded-sm shadow-sm">
        <Reminders />
      </div>

      <!-- End of Change Password -->

      <!-- End of profile tab -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationPage',
  data: () => ({
    email: false,
    inApp: false,
    push: false,
    showChildren: false,
    request: false,
    news: false,
    newComments: false,
    reminders: false,
    activities: false
  }),

  methods: {
    onShowChildren() {
      this.showChildren = !this.showChildren
    }
  }
}
</script>

<style>
</style>