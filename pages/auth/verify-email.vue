<!-- eslint-disable vue/no-v-html */ -->
<template>
  <div class="p-5">
    <PageTitle>Verify your email </PageTitle>
    <p>
      {{
        `For additional security, enter the 6 digit code sent into
      ${email} before changing your password.`
      }}
    </p>
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
          <span>Didn't receive an email?</span>

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
            `Look for the code inside your inbox. <br>Please wait <strong>${resendSeconds} seconds</strong> before asking for a new code.`
          "
        />
      </template>
      <div
        class="
          flex flex-col
          justify-center
          pt-2
          mb-6
          space-y-4 space-x-0
          w-full
          md:flex-row md:space-y-0 md:space-x-4
        "
      >
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
import { GET_CURRENT_USER, SEND_EMAIL_CODE, USE_EMAIL_CODE } from '~/graphql'
import { required, minLength } from '~/plugins/validators'
const MIN_RESEND_SECONDS = 30
export default {
  name: 'VerifyEmail',
  layout: 'AuthLayout',

  middleware: ['isAuthenticated', 'notOnboardingCompleted'],

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
      title: 'Verify Email'
    }
  },
  computed: {
    email() {
      return this.$route.query.email || ''
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
          mutation: SEND_EMAIL_CODE,
          variables: {
            email: this.email,
            template: 'email-verification'
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
          mutation: USE_EMAIL_CODE,
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

        await this.$router.push({
          path: this.$route.query.redirect ?? '/#onboarding',
          query: {
            ...this.$route.query
          }
        })
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
