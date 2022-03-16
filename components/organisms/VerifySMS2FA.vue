<template>
  <form class="w-full" @submit.prevent="createClient">
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="col-span-2 pb-2">
        <TextField type="text" class="w-full text-sm" />
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
          <Button type="submit"> Send Code </Button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-4">
      <div class="col-span-2 pb-2">
        <TextField type="number" class="w-full text-sm" />
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
          <Button type="submit"> Verify Code </Button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { CREATE_PORTFOLIO } from '~/graphql'
import { required, isURL } from '~/plugins/validators'
export default {
  data: () => ({
    fieldTitle: '',
    fieldURL: '',
    fieldDescription: '',
    fieldTemplate: '',
    honeyPot: ''
  }),
  validations: {
    fieldURL: { isURL },
    fieldTemplate: {},
    fieldTitle: {
      required
    },
    fieldDescription: {},
    honeyPot: {}
  },

  methods: {
    async createClient() {
      if (this.honeyPot) return

      if (await this.isValidationInvalid()) return

      this.sending = true

      try {
        await this.$apollo.mutate({
          mutation: CREATE_PORTFOLIO,
          variables: {
            input: {
              title: this.fieldTitle,
              url: this.fieldURL,
              templateId:
                this.fieldTemplate === 'blank' ? undefined : this.fieldTemplate,
              description: this.fieldDescription
            }
          }
        })
        this.$toast.positive('Portfolio created successfully')
        this.sending = false
        this.$emit('create:success', true)
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
        this.$emit('create:success', false)
      }
    }
  }
}
</script>

<style>
</style>