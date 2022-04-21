<template>
  <div>
    <div class="px-4 pt-4 border-t-2">
      <div
        class="
          flex
          justify-between
          items-center
          space-x-3
          text-sm
          font-semibold
          leading-8
          text-center text-gray-900
        "
      >
        <span>Portfolio Link</span>
        <span class="text-black">
          <!-- <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="shrink-0 mt-0.5 mr-2 -ml-1 w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg> -->

          <PencilIcon />
        </span>
      </div>

      <div class="pl-2 my-4 leading-6 bg-teal-100 rounded-lg links">
        <a :href="user.portfolio" target="_blank" class="text-gray-600">
          {{ user.portfolio }}
        </a>
      </div>
    </div>

    <!-- Profile link -->

    <div class="px-4 pt-4 my-8 text-center border-t-2">
      <div
        class="
          flex
          justify-between
          items-center
          space-x-3
          text-sm
          font-semibold
          leading-8
          text-center text-gray-900
        "
      >
        <span>Profile Links</span>
        <div class="flex">
          <ShareIcon />

          <span class="ml-5 text-black">
            <Hyperlink :to="{ name: 'clients' }">
              <span class="text-black hover:text-btn-green">
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="shrink-0 mt-0.5 mr-2 -ml-1 w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </span>
            </Hyperlink>
          </span>
        </div>
      </div>

      <div class="grid grid-cols-5 mt-2">
        <div v-for="(client, i) in clients" :key="i" class="my-2 text-center">
          <a :href="client.profile" class="text-xs profilelink-a">
            <img
              class="mx-auto w-12 h-12 leading-6 rounded-full border"
              :src="generateIcon(client.icon)"
              alt=""
            />
            {{ client.name }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_CLIENTS } from '~/graphql'
export default {
  components: {
    ShareIcon: () => import('~/assets/icons/share.svg?inline')
  },
  props: {
    user: {
      type: [Array, Object],
      default: () => {}
    }
  },
  data() {
    return {
      clients: []
    }
  },
  apollo: {
    clients: {
      query: GET_CLIENTS,
      fetchPolicy: 'cache-and-network',
      update(data) {
        return data.getClients.clients.filter((client) => client.profile)
      }
    }
  },

  methods: {
    generateIcon(icon) {
      return icon ?? 'https://contentre.io/favicon.ico'
    }
  }
}
</script>

<style>
</style>