<template>
  <div class="p-3 text-center bg-white rounded-xl">
    <div class="overflow-hidden mt-4 image">
      <Avatar
        :name="user.name"
        :src="user.avatarURL"
        size="large"
        class="mx-auto w-16 h-16 rounded-full"
      />
    </div>
    <h1 class="my-1 mb-2 text-xl font-bold leading-8 text-gray-900">
      {{ user.name || '' }}
    </h1>
    <h3 class="mb-2 leading-6 text-gray-600">
      {{ user.jobTitle || '' }}
    </h3>

    <!-- social media Icons -->
    <div class="flex justify-center items-center">
      <div class="flex justify-center items-center space-x-4">
        <!-- Socials here -->
        <a
          v-for="social in getSocials"
          :key="social.id"
          target="_blank"
          class="w-8 h-8"
          :href="social.link"
        >
          <Avatar
            :name="social.name"
            :src="computeIcon(social.name)"
            size="auto"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_SOCIALS } from '~/graphql'
export default {
  props: {
    user: {
      type: [Array, Object],
      default: () => {}
    }
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
    computeIcon(name) {
      return require(`~/assets/socials/${name}.png`)
    }
  }
}
</script>

<style>
</style>