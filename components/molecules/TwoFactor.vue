<template>
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
      <p class="mb-4 text-sm">Two Factor Authentication</p>
    </div>

    <div class="grid grid-cols-3 gap-4 border-b-2">
      <div class="col-span-2 pb-4">
        <p class="text-sm text-gray-600">
          Do you want to enable a two factor authentication to further protect
          your account and personal details?
        </p>
      </div>
    </div>

    <div class="py-6">
      <div class="block pb-2 mt-4 font-bold text-black">
        <p class="text-sm">Email Verification</p>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div class="col-span-2 pt-2">
          <p class="text-sm text-gray-600">
            Backup email for verification link
          </p>
        </div>
        <div class="pb-4">
          <div
            class="
              flex
              justify-center
              items-center
              px-3
              w-full
              border
              shadow
              focus:shadow-outline
            "
          >
            <button
              class="py-2 px-4 font-bold text-black rounded-lg"
              @click.prevent="onEmailVerify"
            >
              Set Up
            </button>
          </div>
        </div>
      </div>

      <div class="block pb-2 mt-4 font-bold text-black">
        <p class="text-sm">SMA 2FA</p>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div class="col-span-2 pt-2">
          <p class="text-sm text-gray-600">
            To get OTP incase of any login attempt
          </p>
        </div>
        <div class="pb-4">
          <div
            class="
              flex
              justify-center
              items-center
              px-3
              w-full
              border
              shadow
              focus:shadow-outline
            "
          >
            <button
              class="py-2 px-4 font-bold text-black rounded-lg"
              @click.prevent="onSMA2FA"
            >
              Set Up
            </button>
          </div>
        </div>
      </div>
    </div>

    <Dialog v-model="is2FAModalVisible" :secondary-text="'Close'">
      <template slot="icon">
        <div class="uppercase">Verify phone number</div></template
      >
      <!-- <div class="block w-full text-gray-700 bg-white"> -->
      <div class="flex w-full text-gray-700 bg-white">
        <VerifySMS2FA @create:success="onVerifiedSMS2FA" />
      </div>
      <!-- </div> -->
    </Dialog>

    <Dialog v-model="isEmailModalVisible" :secondary-text="'Close'">
      <template slot="icon">
        <div class="uppercase">Verify email address</div></template
      >

      <div class="flex w-full text-gray-700 bg-white">
        <VerifyEmail @create:success="onVerifiedEmail" />
      </div>
    </Dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    is2FAModalVisible: false,
    isEmailModalVisible: false
  }),
  methods: {
    onSMA2FA() {
      this.is2FAModalVisible = true
    },
    onEmailVerify() {
      this.isEmailModalVisible = true
    },
    onVerifiedSMS2FA() {},
    onVerifiedEmail() {}
  }
}
</script>

<style>
</style>