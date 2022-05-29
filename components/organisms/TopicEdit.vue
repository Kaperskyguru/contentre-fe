<template>
  <FloatingPanel v-model="visibleModel" :inside="false" from="right">
    <template #header>
      <strong>
        {{ isEditing ? 'Edit topic' : 'Create topic' }}
      </strong>
    </template>
    <form class="w-full" @submit.prevent="onSubmit">
      <div class="mb-6">
        <TextField
          v-model="$v.fieldName.$model"
          type="text"
          class="w-full text-sm"
          label="Topic Name"
          placeholder="Enter your topic name"
          :error="getValidationMessage($v.fieldName)"
        />
      </div>

      <div
        class="
          flex flex-col
          justify-center
          items-center
          px-3
          mt-4
          space-y-2 space-x-0
          w-full
          md:flex-row md:space-y-0 md:space-x-2
        "
      >
        <Button class="w-1/2" type="submit">
          {{ isEditing ? 'Update' : 'Create' }}</Button
        >
      </div>
    </form></FloatingPanel
  >
</template>


<script>
import { CREATE_TOPIC, DELETE_TOPIC, GET_TOPIC, UPDATE_TOPIC } from '~/graphql'
export default {
  model: {
    prop: 'visible',
    event: 'toggle'
  },
  props: {
    topicId: {
      type: String,
      default: ''
    },
    visible: {
      default: false,
      type: Boolean
    }
  },

  data: () => ({
    fieldName: '',
    honeyPot: ''
  }),
  validations: {
    fieldName: {},

    honeyPot: {}
  },

  computed: {
    isEditing() {
      return !!this.topicId
    },

    visibleModel: {
      get() {
        return this.visible
      },

      set(value) {
        this.$emit('toggle', value)
      }
    }
  },
  watch: {
    visibleModel() {
      this.resetForm()
    },
    topic: {
      handler(newItem) {
        if (this.topic) {
          this.fieldName = newItem?.name
        }
      },
      deep: true,
      immediate: true
    }
  },
  apollo: {
    topic: {
      query: GET_TOPIC,
      update(data) {
        return data.getTopic
      },
      variables() {
        return {
          id: this.topicId
        }
      },
      skip() {
        return !this.topicId
      }
    }
  },

  mounted() {
    this.resetForm()
  },

  methods: {
    async onClickDelete() {
      try {
        this.$emit(
          'deleted',
          await this.$apollo.mutate({
            mutation: DELETE_TOPIC,
            variables: {
              id: this.topicId
            }
            // update: (cache) => updateTopicCache(cache, this.topicId)
          })
        )
        this.$toast.positive('Topic deleted successfully')
        this.sending = false
        this.open = false
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
        this.open = false
      }
    },
    resetForm() {
      this.$v.$reset()

      if (this.visible && this.topic) {
        this.fieldName = this.topic?.name ?? ''
        // this.fieldColor = this.topic?.color
        //   ? `#${this.topic?.color}`
        //   : this.defaultColor
      } else {
        this.fieldName = ''
        // this.fieldColor = ''
      }
    },

    async createTopic(input) {
      return await this.$apollo.mutate({
        mutation: CREATE_TOPIC,
        refetchQueries: ['getTopics'],
        variables: { input },
        update: (cache, { data: { createTopic: topic } }) => {
          cache.modify({
            id: 'ROOT_QUERY',
            fields: {
              getTopics: (queryRef) => {
                const topicRef = cache.identify({
                  __typename: 'Topic',
                  ...topic
                })

                return {
                  ...queryRef,
                  topics: [{ __ref: topicRef }, ...queryRef.topics],
                  meta: { ...queryRef.meta, total: queryRef.meta.total + 1 }
                }
              }
            }
          })
          this.$emit('created', topic)
          return topic
        }
      })
    },

    async updateTopic(input) {
      return await this.$apollo.mutate({
        mutation: UPDATE_TOPIC,
        variables: { id: this.topicId, input }
        // update: (cache) => updateTopicCache(cache, this.topicId)
      })
    },

    async onSubmit() {
      const isAnyDirty = this.$v.$anyDirty
      //   const isColorDirty = this.$v.fieldColor.$dirty

      if (await this.isValidationInvalid()) return

      try {
        this.sending = true
        this.$toast.message = ''

        const input = {
          name: this.fieldName
          //   color: isColorDirty
          //     ? this.fieldColor === this.defaultColor
          //       ? null
          //       : this.fieldColor.replace('#', '')
          //     : undefined
        }

        if (isAnyDirty) {
          if (this.isEditing) {
            this.$emit('updated', await this.updateTopic(input))
          } else {
            this.$emit('created', await this.createTopic(input))
          }
        }

        this.$emit('toggle', false)
      } catch (error) {
        this.$toast.negative(error.message)
      } finally {
        this.sending = false
        this.$emit('toggle', false)
      }
    }
  }
}
</script>

<style>
</style>