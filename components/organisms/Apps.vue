<template>
  <div
    class="
      grid
      overflow-auto
      grid-cols-1
      gap-4
      p-4
      sm:grid-cols-2
      lg:grid-cols-2
    "
  >
    <div
      v-for="app in apps.items"
      :key="app.id"
      class="p-3 bg-white rounded-md border shadow-sm"
    >
      <div class="group flex justify-between font-medium text-black">
        <div class="flex bg-transparent" style="font-size: 20px">
          <img
            class="mx-auto w-10 h-10"
            :src="
              app.icon
                ? app.icon
                : 'https://res.cloudinary.com/practicaldev/image/fetch/s--R9qwOwpC--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/78hs31fax49uwy6kbxyw.png'
            "
            :alt="app.name"
          />
        </div>
        <div class="text-right">
          <Button :disabled="sending" @click.prevent="onAddApp(app.name)"
            >Add</Button
          >
        </div>
      </div>
      <div class="py-10 leading-8">
        <p class="text-xl font-bold text-teal-600">
          {{ app.name }}
        </p>

        <p class="text-base text-gray-500">
          {{ app.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { CREATE_CONNECTED_APP, GET_APPS } from '~/graphql'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Apps',

  data: () => ({
    isAdded: false,
    apps: {
      items: [],
      total: 0
    }
  }),
  apollo: {
    apps: {
      query: GET_APPS,
      fetchPolicy: 'cache-and-network',
      update(data) {
        return { items: data.getApps.apps, total: data.getApps.meta.total }
      },
      variables() {
        return {
          size: 30,
          skip: 0
          // filters: { ...this.filters }
        }
      }
    }
  },
  methods: {
    async onAddApp(name) {
      this.sending = true
      try {
        await this.$apollo.mutate({
          mutation: CREATE_CONNECTED_APP,
          variables: {
            input: {
              name
            }
          }
        })
        this.$toast.positive('App added successfully')
        this.sending = false
        this.isAdded = true
        this.$emit('add')
      } catch (error) {
        if (error.message.includes('App already created')) {
          this.isAdded = true
        }
        this.$toast.negative(error.message)
        this.sending = false
      }
    }
  }
}
</script>

<style>
</style>