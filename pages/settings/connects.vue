<template>
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
        <span class="tracking-wide">Connect</span>
      </div>
    </div>
    <!-- End of about section -->

    <!-- contact -->
    <div class="py-6 px-4 bg-white rounded-sm shadow-sm">
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
        <div class="block pb-2 font-bold text-black">
          <p class="mb-4 text-sm">Referrals</p>
        </div>
        <div class="block font-normal text-black">
          <p class="text-base text-gray-500">
            Copy and share your contentre link with others
          </p>
        </div>

        <div class="flex flex-col gap-4 justify-evenly md:flex-row">
          <div class="pb-2 w-full">
            <TextField
              type="email"
              class="w-full text-sm"
              :disabled="true"
              :value="`https://app.contentre.io/auth/register?referrer=${currentUser.username}`"
            />
          </div>
          <Button type="submit"> Copy Link </Button>
        </div>

        <div class="block pb-2 mt-6 font-normal text-black">
          <p class="text-base text-gray-500">Invite friends to Contentre</p>
        </div>

        <div class="flex flex-col gap-4 justify-evenly mb-5 md:flex-row">
          <div class="pb-4 w-full">
            <TextField
              type="email"
              class="w-full text-sm"
              placeholder="Enter your friend's email"
            />
          </div>
          <Button type="submit"> Invite </Button>
        </div>

        <CustomText
          :text="`Total users referred: ${currentUser.totalUsersReferred}`"
        />
      </div>
    </div>

    <!-- End of contact --->

    <div class="py-6 px-4 bg-white rounded-sm shadow-sm">
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
        <div class="block pb-2 font-bold text-black">
          <p class="mb-4 text-sm">Teams Members</p>
        </div>
        <div class="w-full">
          <Warning
            v-if="isUnderDevelopment"
            href="https://forms.gle/9PG1eC373JZLhFXK7"
            button-text="Give Feedback"
            >Team feature is under development</Warning
          >
        </div>
        <div class="block pb-2 mt-6 font-normal text-black">
          <p class="text-base text-gray-500">
            Invite team members to Contentre
          </p>
        </div>

        <div
          class="flex flex-col gap-4 justify-between mb-8 w-full md:flex-row"
        >
          <div class="pb-4 w-full">
            <TextField
              type="email"
              class="w-full text-sm"
              placeholder="Enter your team member email"
            />
          </div>
          <Button type="submit" :is-pro-feature="true" message="Coming Soon">
            Invite
          </Button>
        </div>

        <section class="container px-4 mx-auto bg-white">
          <div class="overflow-x-auto px-4 -mx-4 sm:-mx-8">
            <Table title="Team Members" :headers="headers" :row-data="data" />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { currentUser } from '~/components/mixins'
export default {
  name: 'ConnectS',

  mixins: [currentUser],

  data: () => ({
    headers: ['Website', 'Profile link', 'Total Contents'],
    isUnderDevelopment: true,
    data: [
      {
        id: 'aas-dsd-xx-ad-cdad',
        name: 'Solomon Eseme',
        username: 'Kap',
        date: 'here'
      }
    ]
  }),
  head() {
    return {
      title: 'Settings | Connects'
    }
  }
}
</script>

<style>
</style>