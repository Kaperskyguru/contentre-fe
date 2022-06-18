<template>
  <FloatingPanel v-model="visibleModel" :inside="false" from="right">
    <template #header>
      <strong> Switch Notebook </strong>
    </template>
    <form class="w-full" @submit.prevent="onSubmit">
      <div class="mb-6">
        <DropdownField
          v-model="$v.fieldName.$model"
          type="text"
          class="w-full text-sm"
          label="Notebook Name"
          placeholder="switch notebook"
          :error="getValidationMessage($v.fieldName)"
        >
          <option>Test</option>
          <option>Test</option>
          <option>Test</option>
          <option>Test</option>
          <option>Test</option>
          <option>Test</option>
          <option>Test</option>
          <option>Test</option>
          <option>Test</option>
          <option>Test</option>
          <option>Test</option>
          <option>Test</option>
          <option>Test</option>
          <option>Test</option>
          <option>Test</option>
          <option>Test</option>
          <option>Test</option>
          <option>Test</option>
          <option>Test</option>
          <option>Test</option>
          <option>Test</option>
          <option>Test</option>
          <option>Test</option>
          <option>Test</option>
        </DropdownField>
      </div>

      <div class="justify-center w-full">
        <CheckField v-model="shareable" class="text-gray-100"
          >Shareable</CheckField
        >
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
        <Button class="w-1/2" type="submit"> Switch</Button>
      </div>
    </form></FloatingPanel
  >
</template>


<script>
import {
  CREATE_NOTEBOOK,
  DELETE_NOTEBOOK,
  GET_NOTEBOOK,
  UPDATE_NOTEBOOK
} from '~/graphql'
export default {
  model: {
    prop: 'visible',
    event: 'toggle'
  },
  props: {
    notebookId: {
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
    shareable: false,
    honeyPot: ''
  }),
  validations: {
    fieldName: {},

    honeyPot: {}
  },

  computed: {
    isEditing() {
      return !!this.notebookId
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
    notebook: {
      handler(newItem) {
        if (this.notebook) {
          this.fieldName = newItem?.name
        }
      },
      deep: true,
      immediate: true
    }
  },
  apollo: {
    notebook: {
      query: GET_NOTEBOOK,
      update(data) {
        return data.getNotebook
      },
      variables() {
        return {
          id: this.notebookId
        }
      },
      skip() {
        return !this.notebookId
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
            mutation: DELETE_NOTEBOOK,
            variables: {
              id: this.notebookId
            }
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

      if (this.visible && this.notebook) {
        this.fieldName = this.notebook?.name ?? ''
      } else {
        this.fieldName = ''
      }
    },

    async createTopic(input) {
      return await this.$apollo.mutate({
        mutation: CREATE_NOTEBOOK,
        refetchQueries: ['getTopics'],
        variables: { input },
        update: (cache, { data: { createTopic: notebook } }) => {
          cache.modify({
            id: 'ROOT_QUERY',
            fields: {
              getTopics: (queryRef) => {
                const notebookRef = cache.identify({
                  __typename: 'Topic',
                  ...notebook
                })

                return {
                  ...queryRef,
                  notebooks: [{ __ref: notebookRef }, ...queryRef.notebooks],
                  meta: { ...queryRef.meta, total: queryRef.meta.total + 1 }
                }
              }
            }
          })
          this.$emit('created', notebook)
          return notebook
        }
      })
    },

    async updateTopic(input) {
      return await this.$apollo.mutate({
        mutation: UPDATE_NOTEBOOK,
        variables: { id: this.notebookId, input }
        // update: (cache) => updateTopicCache(cache, this.notebookId)
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