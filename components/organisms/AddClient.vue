<template>
  <form class="w-full" @submit.prevent="createClient">
    <div class="mb-6">
      <TextField
        v-model="$v.fieldName.$model"
        type="text"
        class="w-full text-sm"
        label="Client Name"
        placeholder="Enter your client name"
        :error="getValidationMessage($v.fieldName)"
      />
    </div>
    <input
      v-model="$v.honeyPot.$model"
      type="text"
      class="absolute invisible"
    />
    <div class="mb-6 w-full">
      <TextField
        v-model="$v.fieldWebsite.$model"
        type="text"
        class="w-full text-sm"
        label="Client Website"
        placeholder="Enter client website"
        :error="getValidationMessage($v.fieldWebsite)"
      />
    </div>

    <div class="mb-6">
      <TextField
        v-model="$v.fieldProfile.$model"
        type="text"
        class="w-full text-sm"
        label="Profile Link"
        placeholder="Enter your content profile"
        :error="getValidationMessage($v.fieldProfile)"
      />
    </div>

    <div class="flex mb-6">
      <div class="basis-1/2 sm:w-full">
        <DropdownField
          v-model="$v.fieldPaymentType.$model"
          :items="paymentTypes"
          label="Payment Type"
          :error="getValidationMessage($v.fieldPaymentType)"
          @update:value="selectedPayment"
        >
          <option
            v-for="(item, itemIndex) in paymentTypes"
            :key="itemIndex"
            :value="item"
          >
            {{ item }}
          </option>
        </DropdownField>
      </div>
      <div class="basis-1/2 ml-1 sm:w-full">
        <TextField
          v-model="$v.fieldAmount.$model"
          type="text"
          class="w-full text-sm"
          label="Amount"
          :disabled="disableAmount"
          placeholder="Enter payment amount"
          :error="getValidationMessage($v.fieldAmount)"
        />
      </div>
    </div>

    <div class="flex justify-center items-center px-3 mt-4 w-full">
      <Button class="w-1/2" type="submit"> Save </Button>
    </div>
  </form>
</template>

<script>
import { CREATE_CLIENT } from '~/graphql'
import { required, isURL } from '~/plugins/validators'
export default {
  data: () => ({
    fieldName: '',
    fieldProfile: '',
    fieldWebsite: '',
    fieldPaymentType: '',
    fieldAmount: '',
    disableAmount: false,
    honeyPot: '',
    paymentTypes: ['ARTICLE', 'MONTHLY', 'ONETIME']
  }),
  validations: {
    fieldProfile: { isURL },
    fieldName: {
      required
    },
    fieldAmount: {},
    fieldPaymentType: {},
    fieldWebsite: {
      required,
      isURL
    },

    honeyPot: {}
  },

  methods: {
    selectedPayment(type) {
      if (type === 'ARTICLE') {
        this.fieldAmount = 0
        this.disableAmount = true
      } else {
        this.fieldAmount = this.client?.amount
        this.disableAmount = false
      }
    },
    async createClient() {
      if (this.honeyPot) return

      if (await this.isValidationInvalid()) return

      this.sending = true

      try {
        await this.$apollo.mutate({
          mutation: CREATE_CLIENT,
          variables: {
            input: {
              name: this.fieldName,
              website: this.fieldWebsite,
              profile: this.fieldProfile
            }
          }
        })
        this.$toast.positive('Client created successfully')
        this.sending = false
        this.$emit('create:success', true)
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
      }
    }
  }
}
</script>

<style>
</style>