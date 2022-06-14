<template>
  <form class="w-full" @submit.prevent="createClient">
    <div class="mb-6">
      <TextField
        v-model="$v.fieldTitle.$model"
        type="text"
        class="w-full text-sm"
        label="Title"
        placeholder="Enter your portfolio title"
        :error="getValidationMessage($v.fieldTitle)"
      />
    </div>
    <input
      v-model="$v.honeyPot.$model"
      type="text"
      class="absolute invisible"
    />
    <!-- <div class="mb-6 w-full">
      <TextField
        v-model="$v.fieldURL.$model"
        type="text"
        class="w-full text-sm"
        label="URL"
        placeholder="Enter URL"
        :error="getValidationMessage($v.fieldURL)"
      />
    </div> -->

    <section class="mb-6">
      <TextField
        v-model="$v.fieldDescription.$model"
        :rows="5"
        type="text"
        class="w-full text-sm"
        label="Description"
        placeholder="Enter your description"
        :error="getValidationMessage($v.fieldDescription)"
      />
    </section>

    <section class="">
      <DropdownField
        v-model="$v.fieldTemplate.$model"
        type="text"
        class="w-full text-sm text-darksilver"
        label="Description"
        placeholder="Select your template"
        :error="getValidationMessage($v.fieldTemplate)"
      >
        <option value="blank">Create Blank</option>
        <option value="1">Sample 1</option>
        <option value="2">Sample 2</option>
        <option value="3">Sample 3</option>
        <option value="4">Sample 4</option>
      </DropdownField>
    </section>

    <div class="flex justify-center items-center px-3 mt-4 w-full">
      <Button class="w-1/2" type="submit">Create</Button>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex'
import { CREATE_PORTFOLIO } from '~/graphql'
import { required } from '~/plugins/validators'
export default {
  data: () => ({
    fieldTitle: '',
    // fieldURL: '',
    fieldDescription: '',
    fieldTemplate: '',
    honeyPot: ''
  }),
  validations: {
    // fieldURL: { isURL },
    fieldTemplate: {},
    fieldTitle: {
      required
    },
    fieldDescription: {},
    honeyPot: {}
  },

  computed: {
    canCustomizePortfolio() {
      return this.$utils.getFeatureValue(this.subscription, 'TOTAL_CONTENTS')
    },

    ...mapState({
      subscription: (state) => {
        return state.subscription.subscription
      }
    })
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
              // url: this.fieldURL,
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