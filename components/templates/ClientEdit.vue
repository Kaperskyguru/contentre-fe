<template>
  <FloatingPanel v-model="open" :inside="false" from="right">
    <form class="w-full" @submit.prevent="updateClient">
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

      <div class="basis-1/2 mb-6 w-full">
        <DropdownField
          v-model="$v.fieldVisibility.$model"
          :items="visibilityTypes"
          label="Visibility"
          :error="getValidationMessage($v.fieldVisibility)"
        >
          <option
            v-for="(item, itemIndex) in visibilityTypes"
            :key="itemIndex"
            :value="item"
          >
            {{ item }}
          </option>
        </DropdownField>
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
            placeholder="Enter content amount"
            :error="getValidationMessage($v.fieldAmount)"
          />
        </div>
      </div>

      <div
        class="
          flex flex-col
          justify-center
          items-center
          px-3
          mt-4
          space-y-2 space-x-0
          w-full
          md:flex-row md:space-y-0 md:space-x-2
        "
      >
        <Button class="w-1/2" type="submit">Delete</Button>
        <Button class="w-1/2" type="submit">Update</Button>
      </div>
    </form></FloatingPanel
  >
</template>

<script>
import { isURL } from '~/plugins/validators'
import { GET_CLIENT, UPDATE_CLIENT } from '~/graphql'
export default {
  model: {
    prop: 'clientId',
    event: 'update:clientId'
  },
  props: {
    clientId: {
      type: String,
      default: ''
    }
  },

  data: () => ({
    fieldName: '',
    fieldProfile: '',
    fieldWebsite: '',
    honeyPot: '',
    fieldPaymentType: '',
    fieldAmount: '',
    disableAmount: true,
    paymentTypes: ['ARTICLE', 'MONTHLY', 'ONETIME'],
    visibilityTypes: ['PUBLIC', 'PRIVATE', 'TEAM', 'UNLISTED']
  }),
  validations: {
    fieldProfile: { isURL },
    fieldName: {},
    fieldPaymentType: {},
    fieldAmount: {},
    fieldWebsite: {
      isURL
    },
    fieldVisibility: {},
    honeyPot: {}
  },
  computed: {
    open: {
      get() {
        return !!this.clientId
      },
      set(value) {
        this.$emit('update:clientId', null)
      }
    }
  },
  watch: {
    client: {
      handler(newItem) {
        if (this.client) {
          this.fieldProfile = newItem?.profile
          this.fieldWebsite = newItem?.website
          this.fieldName = newItem?.name
          this.fieldVisibility = newItem.visibility
          this.fieldPaymentType = newItem?.paymentType
          this.fieldAmount = newItem?.amount
        }
      },
      deep: true,
      immediate: true
    }
  },
  apollo: {
    client: {
      query: GET_CLIENT,
      update(data) {
        return data.getClient
      },
      variables() {
        return {
          id: this.clientId
        }
      },
      skip() {
        return !this.clientId
      }
    }
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
    async updateClient() {
      if (this.honeyPot) return

      if (await this.isValidationInvalid()) return

      this.sending = true

      try {
        await this.$apollo.mutate({
          mutation: UPDATE_CLIENT,
          variables: {
            id: this.clientId,
            input: {
              name: this.fieldName,
              website: this.fieldWebsite,
              profile: this.fieldProfile,
              visibility: this.fieldVisibility,
              amount: parseFloat(this.fieldAmount),
              paymentType: this.fieldPaymentType
            }
          }
        })
        this.$toast.positive('Client updated successfully')
        this.sending = false
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