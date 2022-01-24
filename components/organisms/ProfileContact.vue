<template>
  <div class="px-4 border-t-2 my-8 pt-4 pb-5">
    <div
      class="
        flex
        items-center
        justify-between
        space-x-3
        font-semibold
        text-gray-900 text-sm
        leading-8
        text-center
        py-4
      "
    >
      <span>Contact Details</span>
      <span class="text-black">
        <svg
          aria-hidden="true"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </span>
    </div>

    <div class="space-y-4">
      <div class="flex items-center">
        <div
          class="
            inline-flex
            flex-shrink-0
            items-center
            justify-center
            h-8
            w-8
            text-blue-600
            bg-blue-100
            rounded-full
            mr-2
          "
        >
          <i class="fas fa-phone-alt"></i>
        </div>
        <div>
          <span class="block">Phone Number</span>
          <span class="block text-teal-600 text-xs italic">{{
            user.phoneNumber
          }}</span>
        </div>
      </div>

      <div class="flex items-center">
        <div
          class="
            inline-flex
            flex-shrink-0
            items-center
            justify-center
            h-8
            w-8
            text-blue-600
            bg-blue-100
            rounded-full
            mr-2
          "
        >
          <i class="fas fa-envelope"></i>
        </div>
        <div>
          <span class="block">Email Address</span>
          <span class="block text-teal-600 text-xs italic">{{
            user.email
          }}</span>
        </div>
      </div>

      <div class="flex items-center">
        <div
          class="
            inline-flex
            flex-shrink-0
            items-center
            justify-center
            h-8
            w-8
            text-blue-600
            bg-blue-100
            rounded-full
            mr-2
          "
        >
          <i class="fas fa-map-marker-alt"></i>
        </div>
        <div>
          <span class="block">Home Address</span>
          <span class="block text-teal-600 text-xs italic">{{
            user.homeAddress
          }}</span>
        </div>
      </div>

      <div class="flex items-center">
        <div
          class="
            inline-flex
            flex-shrink-0
            items-center
            justify-center
            h-8
            w-8
            text-blue-600
            bg-blue-100
            rounded-full
            mr-2
          "
        >
          <i class="fab fa-skype"></i>
        </div>
        <div>
          <span class="block">Skype</span>
          <span class="block text-teal-600 text-xs italic">@janesmith</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: [Array, Object],
      default: () => {}
    }
  }
}
</script>

<style>
</style>