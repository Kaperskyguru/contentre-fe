<!-- eslint-disable vue/no-v-html */ -->
<template>
  <div class="p-5">
    <PageTitle>Verify your phone number</PageTitle>
    <p>Enter the 6 digit code sent to your phone.</p>
    <br />
    <form @submit.prevent="onSubmit">
      <NumberField
        id="code"
        ref="code"
        v-model="$v.fieldVerificationCode.$model"
        name="code"
        autofocus
        autocomplete="one-time-code"
        label="6-digit code"
        enterkeyhint="send"
        maxlength="6"
        empty-undefined
        field-class="text-center text-2xl font-mono pl-1.5 pr-0 py-1.5 tracking-[.5em] pt-4"
        :error="getValidationMessage($v.fieldVerificationCode)"
      />

      <template v-if="!sending">
        <p
          v-if="resendSeconds === 0"
          class="text-sm text-center text-warndarkgray"
        >
          <span>Didn't receive the verification code?</span>

          <a
            href="#resend-confirmation"
            class="font-bold hyperlink"
            @click.prevent="onResendCode"
          >
            Resend
          </a>
        </p>

        <p
          v-else
          class="-mx-4 text-sm text-center text-warndarkgray"
          v-html="
            `Not received? Wait <strong>${resendSeconds}</strong> seconds to resend another code.`
          "
        />
      </template>
      <div class="flex justify-center my-9 w-full">
        <Button
          type="button"
          appearance="secondary"
          :disabled="sending"
          @click.prevent="onGoBack"
        >
          Back
        </Button>
        <Button>Next</Button>
      </div>
    </form>
  </div>
</template>

<script>
import { GET_CURRENT_USER, SEND_PHONE_CODE, USE_PHONE_CODE } from '~/graphql'
import { required, minLength } from '~/plugins/validators'
const MIN_RESEND_SECONDS = 30
export default {
  name: 'VerifyEmail',
  layout: 'AuthLayout',

  middleware: ['isAuthenticated', 'notPhoneConfirmed'],

  data: () => ({
    sending: false,
    resendSeconds: MIN_RESEND_SECONDS,
    resendSecondsInterval: null,
    fieldVerificationCode: ''
  }),

  validations: {
    fieldVerificationCode: { required, minLength: minLength(6) }
  },
  head() {
    return {
      title: 'Verify Phone'
    }
  },

  mounted() {
    this.resendSecondsInterval = setInterval(() => {
      if (this.resendSeconds > 0) {
        this.resendSeconds--
      }
    }, 1000)
  },

  destroyed() {
    if (this.resendSecondsInterval) {
      clearInterval(this.resendSecondsInterval)
    }
  },

  methods: {
    async onGoBack() {
      this.sending = true
      this.$v.$reset()
      await this.$logoutUser()
    },

    async onResendCode() {
      try {
        this.$toast.message = ''
        this.sending = true

        await this.$apollo.mutate({
          mutation: SEND_PHONE_CODE,
          variables: {
            email: this.$route.query.email
          }
        })

        this.resendSeconds = MIN_RESEND_SECONDS
      } catch (error) {
        this.$toast.negative(error.message)
      } finally {
        this.sending = false
      }
    },

    async onSubmit() {
      try {
        this.$toast.message = ''
        if (await this.isValidationInvalid()) return
        this.sending = true

        await this.$apollo.mutate({
          mutation: USE_PHONE_CODE,
          variables: {
            code: this.fieldVerificationCode.toString(),
            email: this.$route.query.email
          },
          update: (cache, { data: { usePasswordResetCode } }) => {
            cache.writeQuery({
              query: GET_CURRENT_USER,
              data: { getCurrentUser: usePasswordResetCode }
            })
          }
        })

        await this.$router.push(this.$route.query.redirect ?? '/')
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
      }
    }
  }
}
</script>

<style scoped>
</style>
