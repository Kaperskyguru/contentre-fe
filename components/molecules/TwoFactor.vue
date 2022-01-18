<template>
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
      <p class="text-sm mb-4">Two Factor Authentication</p>
    </div>

    <div class="grid grid-cols-3 gap-4 border-b-2">
      <div class="col-span-2 pb-4">
        <p class="text-gray-600 text-sm">
          Do you want to enable a two factor authenfication to further protect
          your account and personal details?
        </p>
      </div>
      <div class="pb-4">
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
          <button
            class="text-white font-bold py-4 px-4 rounded-lg"
            type="submit"
          >
            Enable
          </button>
        </div>
      </div>
    </div>

    <div class="py-6">
      <div class="block text-black font-bold mt-4 pb-2">
        <p class="text-sm">Biometric Authentication</p>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div class="col-span-2 pt-2">
          <p class="text-gray-600 text-sm">Finger or Security question</p>
        </div>
        <div class="pb-4">
          <div
            class="
              w-full
              px-3
              flex
              items-center
              justify-center
              shadow
              border
              focus:shadow-outline
            "
          >
            <button
              class="text-black font-bold py-2 px-4 rounded-lg"
              type="submit"
            >
              Set Up
            </button>
          </div>
        </div>
      </div>

      <div class="block text-black font-bold mt-4 pb-2">
        <p class="text-sm">Email Verification</p>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div class="col-span-2 pt-2">
          <p class="text-gray-600 text-sm">
            Backup email for verification link
          </p>
        </div>
        <div class="pb-4">
          <div
            class="
              w-full
              px-3
              flex
              items-center
              justify-center
              shadow
              border
              focus:shadow-outline
            "
          >
            <button
              class="text-black font-bold py-2 px-4 rounded-lg"
              type="submit"
            >
              Set Up
            </button>
          </div>
        </div>
      </div>

      <div class="block text-black font-bold mt-4 pb-2">
        <p class="text-sm">SMA 2FA</p>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div class="col-span-2 pt-2">
          <p class="text-gray-600 text-sm">
            To get OTP incase of any login attempt
          </p>
        </div>
        <div class="pb-4">
          <div
            class="
              w-full
              px-3
              flex
              items-center
              justify-center
              shadow
              border
              focus:shadow-outline
            "
          >
            <button
              class="text-black font-bold py-2 px-4 rounded-lg"
              type="submit"
            >
              Set Up
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>