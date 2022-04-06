<template>
  <FloatingPanel v-model="open" :inside="false" from="right">
    <form class="w-full" @submit.prevent="updateTag">
      <div class="mb-6">
        <TextField
          v-model="$v.fieldName.$model"
          type="text"
          class="w-full text-sm"
          label="Tag Name"
          placeholder="Enter your tag name"
          :error="getValidationMessage($v.fieldName)"
        />
      </div>
      <input
        v-model="$v.honeyPot.$model"
        type="text"
        class="absolute invisible"
      />

      <div class="flex justify-center items-center px-3 mt-4 w-full">
        <Button class="w-1/2" type="submit">Update</Button>
      </div>
    </form></FloatingPanel
  >
</template>

<script>
import { GET_TAG, UPDATE_TAG } from '~/graphql'
export default {
  model: {
    prop: 'tagId',
    event: 'update:tagId'
  },
  props: {
    tagId: {
      type: String,
      default: ''
    }
  },

  data: () => ({
    fieldName: ''
  }),
  validations: {
    fieldName: {},
    honeyPot: {}
  },
  computed: {
    open: {
      get() {
        return !!this.tagId
      },
      set(value) {
        this.$emit('update:tagId', null)
      }
    }
  },
  watch: {
    tag: {
      handler(newItem) {
        if (this.tag) {
          this.fieldName = newItem?.name
        }
      },
      deep: true,
      immediate: true
    }
  },
  apollo: {
    tag: {
      query: GET_TAG,
      update(data) {
        return data.getTag
      },
      variables() {
        return {
          id: this.tagId
        }
      },
      skip() {
        return !this.tagId
      }
    }
  },

  methods: {
    async updateTag() {
      if (this.honeyPot) return

      if (await this.isValidationInvalid()) return

      this.sending = true

      try {
        await this.$apollo.mutate({
          mutation: UPDATE_TAG,
          variables: {
            id: this.tagId,
            input: {
              name: this.fieldName
            }
          }
        })
        this.$toast.positive('Tag updated successfully')
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