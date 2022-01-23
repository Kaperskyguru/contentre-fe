<template>
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
        <span class="tracking-wide">Connect</span>
      </div>
    </div>
    <!-- End of about section -->

    <!-- contact -->
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
        <div class="block text-black font-bold pb-2">
          <p class="text-sm mb-4">Referrals</p>
        </div>
        <div class="block text-black font-normal">
          <p class="text-base text-gray-500">
            Copy and share your contentre link with others
          </p>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <div class="col-span-2 pb-2">
            <TextField
              type="email"
              class="w-full text-sm"
              :disabled="true"
              :value="`https://www.contentre.io/referrals/${currentUser.username}`"
            />
          </div>
          <div>
            <div
              class="
                w-full
                px-3
                flex
                items-center
                justify-center
                shadow
                form-btn
                focus:shadow-outline
              "
            >
              <Button type="submit"> Copy Link </Button>
            </div>
          </div>
        </div>

        <div class="block text-black font-normal pb-2 mt-6">
          <p class="text-base text-gray-500">Invite friends to Contentre</p>
        </div>

        <div class="grid grid-cols-3 gap-4 mb-5">
          <div class="col-span-2 pb-4">
            <TextField
              type="email"
              class="w-full text-sm"
              placeholder="Enter your friend's email"
            />
          </div>
          <div>
            <div
              class="
                w-full
                px-3
                flex
                items-center
                justify-center
                shadow
                form-btn
                focus:shadow-outline
              "
            >
              <Button type="submit"> Invite </Button>
            </div>
          </div>
        </div>

        <CustomText
          :text="`Total users referred: ${currentUser.totalUsersReferred}`"
        />
      </div>
    </div>

    <!-- End of contact --->

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
        <div class="block text-black font-bold pb-2">
          <p class="text-sm mb-4">Teams Members</p>
        </div>

        <div class="block text-black font-normal pb-2 mt-">
          <p class="text-base text-gray-500">
            Invite team members to Contentre
          </p>
        </div>

        <div class="grid grid-cols-3 gap-4 mb-8">
          <div class="col-span-2 pb-4">
            <TextField
              type="email"
              class="w-full text-sm"
              placeholder="Enter your team member email"
            />
          </div>
          <div>
            <div
              class="
                w-full
                px-3
                flex
                items-center
                justify-center
                shadow
                form-btn
                focus:shadow-outline
              "
            >
              <Button type="submit"> Invite </Button>
            </div>
          </div>
        </div>

        <section class="bg-white container mx-auto px-4">
          <div class="-mx-4 sm:-mx-8 px-4 overflow-x-auto">
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
  layout: 'SettingsLayout',

  data: () => ({
    headers: ['Website', 'Profile link', 'Total Contents'],
    data: [
      {
        id: 'aas-dsd-xx-ad-cdad',
        name: 'Solomon Eseme',
        username: 'Kap',
        date: 'here'
      }
    ]
  })
}
</script>

<style>
</style>