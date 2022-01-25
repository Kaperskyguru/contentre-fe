<template>
  <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
    <div class="pb-4 px-4 pt-4">
      <h2 class="text-2xl font-gilroy font-semibold leading-tight">Clients</h2>
    </div>
    <table v-if="clients" class="min-w-full">
      <thead class="bg-white border-b">
        <tr>
          <th
            class="
              px-5
              py-3
              border-b-2 border-gray-200
              bg-gray-100
              text-left text-xs
              font-semibold font-roboto
              text-gray-600
              uppercase
              tracking-wider
            "
          >
            Website
          </th>
          <th
            class="
              px-5
              py-3
              border-b-2 border-gray-200
              bg-gray-100
              text-left text-xs
              font-semibold
              text-gray-600
              uppercase
              font-roboto
              tracking-wider
            "
          >
            Profile link
          </th>
          <th
            class="
              px-5
              py-3
              border-b-2 border-gray-200
              bg-gray-100
              text-left text-xs
              font-semibold
              text-gray-600
              uppercase
              font-roboto
              tracking-wider
            "
          >
            Total Contents
          </th>
          <th
            class="
              px-5
              py-3
              border-b-2 border-gray-200
              bg-gray-100
              text-left text-xs
              font-semibold
              text-gray-600
              uppercase
              font-roboto
              tracking-wider
            "
          >
            Created
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(client, index) in clients"
          :key="index"
          class="
            bg-white
            border-b
            transition
            duration-300
            ease-in-out
            hover:bg-gray-100
          "
          @click="openPane(client.id)"
        >
          <td class="px-5 py-2 whitespace-nowrap text-sm">
            <div class="flex items-center">
              <div class="flex-shrink-0 w-10 h-10 p-2">
                <input type="checkbox" />
              </div>
              <div class="ml-3">
                <p class="text-gray-900 font-roboto whitespace-no-wrap">
                  {{ client.name }}
                </p>
              </div>
            </div>
          </td>

          <td class="px-5 py-2 whitespace-nowrap text-sm">
            <p class="text-gray-900 font-roboto whitespace-nowrap">
              {{ client.profile }}
            </p>
          </td>

          <td class="px-5 py-2 whitespace-nowrap text-sm">
            <p class="text-gray-900 font-roboto whitespace-nowrap">
              {{ client.totalContents }}
            </p>
          </td>

          <td class="px-5 py-2 whitespace-nowrap text-sm">
            <p class="text-gray-900 font-roboto whitespace-nowrap">
              {{ client.createdAt }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="px-5 py-2 bg-white border-t flex items-center justify-between">
      <span class="text-sm xs:text-sm text-gray-900"> 15 to 29 out of 96 </span>
      <div class="flex flex-col items-center">
        <div class="flex text-gray-700">
          <div
            class="h-8 w-8 mr-1 flex justify-center items-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-chevron-left w-4 h-4"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </div>
          <div class="flex h-8 font-medium">
            <div
              class="
                w-8
                md:flex
                justify-center
                items-center
                cursor-pointer
                bg-gray-500
                text-white
              "
            >
              1
            </div>
            <div class="w-8 md:flex justify-center items-center cursor-pointer">
              2
            </div>
            <div class="w-8 md:flex justify-center items-center cursor-pointer">
              ...
            </div>
            <div class="w-8 md:flex justify-center items-center cursor-pointer">
              16
            </div>
          </div>
          <div
            class="h-8 w-8 ml-1 flex justify-center items-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-chevron-right w-4 h-4"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <ClientEdit v-model="clientId"></ClientEdit>
  </div>
</template>

<script>
import { GET_CLIENTS } from '~/graphql'
export default {
  data: () => ({
    clientId: null
  }),
  apollo: {
    clients: {
      query: GET_CLIENTS,
      fetchPolicy: 'cache-and-network',
      update(data) {
        return data.getClients
      },
      variables: {
        size: 10,
        skip: 0
      }
    }
  },

  methods: {
    openPane(id) {
      this.clientId = id
    }
  }
}
</script>

<style>
</style>
