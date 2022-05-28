<template>
  <div class="bg-white rounded-xl shadow">
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
        <span class="tracking-wide">Profile Details</span>
      </div>
    </div>
    <!-- End of about section -->

    <!-- Personal Details -->
    <div class="py-6 px-4 bg-white rounded-sm border-b-2 shadow-sm">
      <div
        class="
          block
          py-6
          px-3
          mb-5
          text-gray-700
          bg-white
          rounded-lg
          border border-gray-200
        "
      >
        <div class="pb-4 space-x-3 text-sm font-normal leading-8 text-gray-900">
          <span>Personal Details</span>
        </div>

        <!-- FORM -->

        <ProfileForm />
      </div>

      <!-- DIV 2 -->
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
        <div class="pb-4 space-x-3 text-sm font-normal leading-8 text-gray-900">
          <div
            class="block pb-4 pl-2 font-bold text-black md:flex md:items-center"
          >
            <span class="text-sm"> Social Links </span>
          </div>
        </div>

        <div class="block justify-between px-3 w-full text-gray-700 bg-white">
          <Form class="w-full" @submit.prevent="onCreateSocial">
            <div class="mb-6">
              <DropdownField
                v-model="$v.fieldName.$model"
                label="Select social media"
                placeholder="Facebook"
              >
                <option
                  v-for="(item, itemIndex) in socials"
                  :key="itemIndex"
                  :value="item && item.name ? item.name : ''"
                >
                  {{ item && item.name ? item.name : '' }}
                </option>
              </DropdownField>
            </div>

            <div class="mb-6">
              <TextField
                v-model="$v.fieldLink.$model"
                label="Link"
                placeholder="https://twitter.com/contentreio"
                :error="getValidationMessage($v.fieldLink)"
              />
            </div>

            <div class="flex justify-center items-center mt-4 w-full">
              <Button class="w-1/2" type="submit"> Add </Button>
            </div>
          </Form>
        </div>
      </div>
      <div class="my-8">
        <div class="pb-4 space-x-3 text-sm font-normal leading-8 text-gray-900">
          <span>Social Links</span>
        </div>

        <SocialLinks :socials="getSocials" />
      </div>
    </div>

    <!-- End of Personal Details -->
  </div>
</template>

<script>
import { CREATE_SOCIAL, GET_SOCIALS } from '~/graphql'
import { isURL, hasLetter } from '~/plugins/validators'
export default {
  data: () => ({
    getSocials: [],
    fieldName: '',
    fieldIcon: '',
    fieldLink: '',
    socials: [
      {
        name: 'Facebook',
        icon: ''
      },
      {
        name: 'Twitter',
        icon: ''
      },
      {
        name: 'Instagram',
        icon: ''
      },
      {
        name: 'LinkedIn',
        icon: ''
      },
      {
        name: 'WhatsApp',
        icon: ''
      }
    ]
  }),

  validations: {
    fieldLink: { isURL },
    fieldName: {
      hasLetter
    },
    honeyPot: {}
  },

  apollo: {
    getSocials: {
      query: GET_SOCIALS,
      variables: {},
      update(data) {
        return data.getSocials.socials
      }
    }
  },
  methods: {
    async onCreateSocial() {
      if (this.honeyPot) return

      if (await this.isValidationInvalid()) return

      this.sending = true

      const input = {
        name: this.fieldName || undefined,
        link: this.fieldLink || undefined
      }

      try {
        await this.$apollo.mutate({
          mutation: CREATE_SOCIAL,
          variables: {
            input
          },
          update: (cache, { data: { createdSocial } }) => {
            this.socials.push(createdSocial)
            this.$apollo.queries.getSocials.refetch()
          }
        })

        this.$toast.positive('Social created successfully')
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