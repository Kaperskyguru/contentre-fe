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
    <div class="p-3 bg-white rounded-md border shadow-sm">
      <div class="group flex justify-between font-medium text-black">
        <div class="flex bg-transparent" style="font-size: 20px">
          <MediumIcon />
        </div>
        <div class="text-right">
          <Button :disabled="isAdded" @click.prevent="onAddApp('Medium')"
            >Add</Button
          >
        </div>
      </div>
      <div class="py-10 leading-8">
        <p class="text-xl font-bold text-teal-600">Medium</p>
        <p class="text-base text-gray-500">Where good ideas find you.</p>
      </div>
    </div>

    <div
      v-for="app in apps.items"
      :key="app.id"
      class="p-3 bg-white rounded-md border shadow-sm"
    >
      <div class="group flex justify-between font-medium text-black">
        <div class="flex bg-transparent" style="font-size: 20px">
          <img
            class="mx-auto w-10 h-10"
            src="https://res.cloudinary.com/practicaldev/image/fetch/s--R9qwOwpC--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/78hs31fax49uwy6kbxyw.png"
            alt="Dev Community Inc"
          />
        </div>
        <div class="text-right">
          <Button :disabled="isAdded" @click.prevent="onAddApp(app.name)"
            >Add</Button
          >
        </div>
      </div>
      <div class="py-10 leading-8">
        <p class="text-xl font-bold text-teal-600">
          {{ app.name }}
        </p>

        <!-- Dev Community -->
        <p class="text-base text-gray-500">
          {{ app.app.description }}
          <!-- We're a place where coders share, stay up-to-date and grow their
              careers. -->
        </p>
      </div>
    </div>

    <div class="p-3 bg-white rounded-md border shadow-sm">
      <div class="group flex justify-between font-medium text-black">
        <div class="flex bg-transparent" style="font-size: 20px">
          <img
            class="mx-auto w-10 h-10"
            src="https://cdn.hashnode.com/res/hashnode/image/upload/v1611902473383/CDyAuTy75.png?auto=compress"
            alt="Hashnode icon"
          />
        </div>
        <div class="text-right">
          <Button
            :disabled="isAdded"
            :is-pro-feature="true"
            message="Coming Soon"
            @click.prevent="onAddApp('Hashnode')"
            >Add {{ isAdded }}</Button
          >
        </div>
      </div>
      <div class="py-10 leading-8">
        <p class="text-xl font-bold text-teal-600">Hashnode</p>
        <p class="text-base text-gray-500">
          Home for tech writers and readers.
        </p>
      </div>
    </div>

    <div class="p-3 bg-white rounded-md border shadow-sm">
      <div class="group flex justify-between font-medium text-black">
        <div class="flex bg-transparent">
          <img
            class="mx-auto w-10 h-10 border"
            src="~/assets/img/drive.png"
            alt=""
          />
        </div>
        <div class="text-right">
          <Button
            :disabled="isAdded"
            :is-pro-feature="true"
            message="Coming Soon"
            @click.prevent="onAddApp('Google Drive')"
            >Add</Button
          >
        </div>
      </div>
      <div class="py-10 leading-8">
        <p class="text-xl font-bold text-teal-600">Google Drive</p>
        <p class="text-base text-gray-500">
          Cloud storage and file synchronization service developed by google
        </p>
      </div>
    </div>

    <div class="p-3 bg-white rounded-md border shadow-sm">
      <div class="group flex justify-between font-medium text-black">
        <div class="flex bg-transparent">
          <img class="mx-auto w-8 h-8" src="~/assets/img/word.png" alt="" />
        </div>
        <div class="text-right">
          <Button
            :disabled="isAdded"
            :is-pro-feature="true"
            message="Coming Soon"
            @click.prevent="onAddApp('Microsoft Word')"
            >Add</Button
          >
        </div>
      </div>
      <div class="py-10 leading-8">
        <p class="text-xl font-bold text-teal-600">Microsoft Word</p>
        <p class="text-base text-gray-500">Word Processing Software</p>
      </div>
    </div>

    <div class="p-3 bg-white rounded-md border shadow-sm">
      <div class="group flex justify-between font-medium text-black">
        <div class="flex bg-transparent">
          <img class="mx-auto w-8 h-8" src="~/assets/img/slack.png" alt="" />
        </div>
        <div class="text-right">
          <Button
            :disabled="isAdded"
            :is-pro-feature="true"
            message="Coming Soon"
            @click.prevent="onAddApp('Slack')"
            >Add</Button
          >
        </div>
      </div>
      <div class="py-10 leading-8">
        <p class="text-xl font-bold text-teal-600">Slack</p>
        <p class="text-base text-gray-500">Where the future works</p>
      </div>
    </div>

    <div class="p-3 bg-white rounded-md border shadow-sm">
      <div class="group flex justify-between font-medium text-black">
        <div class="flex bg-transparent">
          <img class="mx-auto w-10 h-10" src="~/assets/img/note.png" alt="" />
        </div>
        <div class="text-right text-gray-500">
          <Button
            :disabled="isAdded"
            :is-pro-feature="true"
            message="Coming Soon"
            @click.prevent="onAddApp('Microsoft One Note')"
            >Add</Button
          >
        </div>
      </div>
      <div class="py-10 leading-8">
        <p class="text-xl font-bold text-gray-500">Microsoft One Note</p>
        <p class="text-base text-gray-500">
          The digital note taking app for all your devices
        </p>
      </div>
    </div>

    <!-- <div class="p-3 bg-white rounded-md border shadow-sm">
      <div class="group flex justify-between font-medium text-black">
        <div class="flex bg-transparent">
          <img class="mx-auto w-10 h-10" src="~/assets/img/date.png" alt="" />
        </div>
        <div class="text-right text-gray-500">
          <ToggleOffIcon />
        </div>
      </div>
      <div class="py-10 leading-8">
        <p class="text-xl font-bold text-gray-500">Google Calender</p>
        <p class="text-base text-gray-500">Make the most of everyday</p>
      </div>
    </div> -->
  </div>
</template>

<script>
import { CREATE_APP } from '~/graphql'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Apps',
  components: {
    MediumIcon: () => import('~/assets/icons/medium.svg?inline')
  },
  data: () => ({
    isAdded: false,
    apps: {
      items: [],
      total: 0
    }
  }),

  methods: {
    async onAddApp(name) {
      this.sending = true

      try {
        await this.$apollo.mutate({
          mutation: CREATE_APP,
          variables: {
            input: {
              name
            }
          }
        })
        this.$toast.positive('App added successfully')
        this.sending = false
        this.isAdded = true
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