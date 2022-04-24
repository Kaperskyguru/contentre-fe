<template>
  <FloatingPanel v-model="visibleModel" from="right">
    <template #header>
      <strong>
        {{ isEditing ? 'Edit category' : 'Create category' }}
      </strong>
    </template>

    <Loading v-if="$apollo.loading" class="flex flex-1 items-center h-full" />
    <form v-else @submit.prevent="onSubmit">
      <div class="mb-6">
        <TextField
          id="name"
          v-model="$v.fieldName.$model"
          name="name"
          autofocus
          autocomplete="name"
          label="Name"
          enterkeyhint="next"
          maxlength="50"
          :error="getValidationMessage($v.fieldName)"
        >
          <template v-if="isEditing" #append-inner>
            <IconPencil class="mr-2 w-5 h-5 pointer-events-none" />
          </template>
        </TextField>
      </div>

      <div class="mb-6">
        <ColorPicker
          id="color"
          v-model="$v.fieldColor.$model"
          name="color"
          label="Color"
          :error="getValidationMessage($v.fieldColor)"
        />
      </div>

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
          v-if="isEditing"
          appearance="secondary"
          class="w-full"
          @click.prevent="onClickDelete"
        >
          {{ 'Delete' }}
        </Button>

        <Button class="w-full" type="submit" :waiting="sending">
          {{ isEditing ? 'Update' : 'Create' }}
        </Button>
      </div>
    </form>
  </FloatingPanel>
</template>

<script>
import {
  UPDATE_CATEGORY,
  CREATE_CATEGORY,
  GET_CATEGORY,
  DELETE_CATEGORY,
  updateCategoryCache
} from '~/graphql'
import { required, minLength } from '~/plugins/validators'

export default {
  name: 'CategoryEdit',

  components: {
    IconPencil: () => import('~/assets/icons/pencil.svg?inline')
  },

  model: {
    prop: 'visible',
    event: 'toggle'
  },

  props: {
    categoryId: {
      default: null,
      type: String
    },

    visible: {
      default: false,
      type: Boolean
    }
  },

  emits: ['toggle', 'created', 'updated'],

  data: () => ({
    sending: false,
    fieldName: '',
    fieldColor: '',
    category: null,
    defaultColor: '#d6d6d6'
  }),

  apollo: {
    category: {
      query: GET_CATEGORY,
      variables() {
        return { id: this.categoryId }
      },
      update(data) {
        return data.getCategory
      },
      skip() {
        return !this.categoryId
      },
      result() {
        this.resetForm()
      }
    }
  },

  validations: {
    fieldName: { required, minLength: minLength(2) },
    fieldColor: {}
  },

  computed: {
    isEditing() {
      return !!this.categoryId
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
    categoryId() {
      this.category = null
      this.resetForm()
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
            mutation: DELETE_CATEGORY,
            variables: {
              id: this.categoryId
            },
            update: (cache) => updateCategoryCache(cache, this.categoryId)
          })
        )
        this.$toast.positive('Category deleted successfully')
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

      if (this.visible && this.category) {
        this.fieldName = this.category?.name ?? ''
        this.fieldColor = this.category?.color
          ? `#${this.category?.color}`
          : this.defaultColor
      } else {
        this.fieldName = ''
        this.fieldColor = ''
      }
    },

    async createCategory(input) {
      return await this.$apollo.mutate({
        mutation: CREATE_CATEGORY,
        variables: { input },
        update: (cache, { data: { createCategory: category } }) => {
          cache.modify({
            id: 'ROOT_QUERY',
            fields: {
              getCategories: (queryRef) => {
                const categoryRef = cache.identify({
                  __typename: 'Category',
                  ...category
                })

                return {
                  ...queryRef,
                  categories: [{ __ref: categoryRef }, ...queryRef.categories],
                  meta: { ...queryRef.meta, total: queryRef.meta.total + 1 }
                }
              }
            }
          })
          this.$emit('created', category)
          return category
        }
      })
    },

    async updateCategory(input) {
      return await this.$apollo.mutate({
        mutation: UPDATE_CATEGORY,
        variables: { id: this.categoryId, input },
        update: (cache) => updateCategoryCache(cache, this.categoryId)
      })
    },

    async onSubmit() {
      const isAnyDirty = this.$v.$anyDirty
      const isColorDirty = this.$v.fieldColor.$dirty

      if (await this.isValidationInvalid()) return

      try {
        this.sending = true
        this.$toast.message = ''

        const input = {
          name: this.fieldName,
          color: isColorDirty
            ? this.fieldColor === this.defaultColor
              ? null
              : this.fieldColor.replace('#', '')
            : undefined
        }

        if (isAnyDirty) {
          if (this.isEditing) {
            this.$emit('updated', await this.updateCategory(input))
          } else {
            this.$emit('created', await this.createCategory(input))
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
