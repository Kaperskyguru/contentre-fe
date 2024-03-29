<template>
  <div class="w-full">
    <form class="mb-5 w-full" @submit.prevent="uploadContent">
      <div class="">
        <TextField
          v-model="$v.fieldURLs.$model"
          type="text"
          :rows="20"
          class="w-full text-sm"
          label="Content URLs"
          placeholder="Paste all your content URLs (separate by newline)"
          :error="getValidationMessage($v.fieldURLs)"
        />
      </div>
      <input
        v-model="$v.honeyPot.$model"
        type="text"
        class="absolute invisible"
      />

      <div
        v-if="isOnboarding"
        class="
          flex flex-col
          justify-center
          items-center
          px-3
          mt-4
          space-y-4 space-x-0
          w-full
          md:flex-row md:space-y-0 md:space-x-4
        "
      >
        <Button
          appearance="outline"
          class="flex-1"
          @click.prevent="$emit('close')"
        >
          {{ 'Skip' }}
        </Button>

        <Button type="submit" :waiting="sending" class="flex-1">
          {{ 'Upload' }}
        </Button>
      </div>
      <div v-else class="flex justify-center items-center px-3 mt-4 w-full">
        <Button type="submit" :waiting="sending"> Upload </Button>
      </div>
    </form>
    <small class="pt-3 text-sm text-center text-red-300"
      >* Only upload contents you have the legal right to</small
    >
  </div>
</template>

<script>
import { UPLOAD_MULTIPLE_CONTENT } from '~/graphql'
import { required } from '~/plugins/validators'
export default {
  props: {
    isOnboarding: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    fieldURLs: '',
    honeyPot: '',
    content: [],
    sending: false
  }),
  validations: {
    fieldURLs: {
      required
    },

    honeyPot: {}
  },

  methods: {
    async uploadContent() {
      if (this.honeyPot) return

      if (await this.isValidationInvalid()) return

      this.sending = true

      try {
        await this.$apollo.mutate({
          mutation: UPLOAD_MULTIPLE_CONTENT,
          variables: {
            input: {
              urls: this.fieldURLs.split(/\r?\n/)
            }
          },
          update(cache, { data: { uploadMultipleContent: contents } }) {
            contents.forEach((content) => {
              cache.modify({
                id: 'ROOT_QUERY',
                fields: {
                  getContents: (queryRef) => {
                    const contentRef = cache.identify({
                      __typename: 'Content',
                      ...content
                    })

                    return {
                      ...queryRef,
                      contents: [{ __ref: contentRef }, ...queryRef.contents],
                      meta: {
                        ...queryRef.meta,
                        total: queryRef.meta.total + 1
                      }
                    }
                  }
                }
              })
            })
          }
        })
        this.$toast.positive('Content upload successfully')
        this.sending = false
        this.$emit('created', true)
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