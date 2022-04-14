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

      <div
        class="
          flex flex-col
          pt-2
          mb-6
          space-y-4 space-x-0
          md:flex-row md:space-y-0 md:space-x-4
        "
      >
        <Button
          appearance="secondary"
          class="w-full"
          @click.prevent="onClickDelete"
        >
          {{ 'Delete' }}
        </Button>

        <Button class="w-full" type="submit" :waiting="sending">
          Update
        </Button>
      </div>
    </form></FloatingPanel
  >
</template>

<script>
import { DELETE_TAG, GET_TAG, UPDATE_TAG } from '~/graphql'
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
    async onClickDelete() {
      try {
        this.$emit(
          'deleted',
          await this.$apollo.mutate({
            mutation: DELETE_TAG,
            variables: {
              id: this.tagId
            }
          })
        )
        this.$toast.positive('Tag deleted successfully')
        this.sending = false
        this.open = false
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
        this.open = false
      }
    },
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