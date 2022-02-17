<template>
  <!-- Right Side -->
  <div class="mx-2 w-full h-64 bg-white rounded-xl shadow md:w-10/12">
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

        <div class="grid grid-cols-3 gap-4">
          <div class="col-span-2 pb-2">
            <TextField
              type="email"
              class="w-full text-sm"
              :disabled="true"
              :value="`https://www.contentre.io/register?referrer=${currentUser.username}`"
            />
          </div>
          <div>
            <div
              class="
                flex
                justify-center
                items-center
                px-3
                w-full
                shadow
                form-btn
                focus:shadow-outline
              "
            >
              <Button type="submit"> Copy Link </Button>
            </div>
          </div>
        </div>

        <div class="block pb-2 mt-6 font-normal text-black">
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
                flex
                justify-center
                items-center
                px-3
                w-full
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

        <div class="block pb-2 font-normal text-black mt-">
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
                flex
                justify-center
                items-center
                px-3
                w-full
                shadow
                form-btn
                focus:shadow-outline
              "
            >
              <Button type="submit"> Invite </Button>
            </div>
          </div>
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