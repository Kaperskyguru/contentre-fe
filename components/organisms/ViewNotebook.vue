<template>
  <FloatingPanel v-model="visibleModel" :inside="false" from="right">
    <template #header>
      <strong> View Notebook </strong>
    </template>
    <form class="w-full" @submit.prevent="onSubmit">
      <div class="mb-6">
        <DropdownField
          v-model="selectedItem"
          type="text"
          class="w-full text-sm"
          label="Notebook"
          placeholder="Select a notebook"
          @update:value="onSelected"
        >
          <!-- <option disabled selected>All</option> -->
          <option
            v-for="(item, itemIndex) in notebooks.items"
            :key="itemIndex"
            :value="item.id"
          >
            {{ item.name }}
          </option>
        </DropdownField>
      </div>

      <div v-if="isSelected" class="mt-4 w-full">
        <TextField
          v-model="$v.fieldName.$model"
          label="Name"
          :disabled="!isEditable"
          :error="getValidationMessage($v.fieldName)"
        >
        </TextField>
      </div>

      <div v-if="isSelected" class="justify-center mt-4 w-full">
        <CheckField
          v-model="shareable"
          class="text-gray-100"
          @changed="onShareable"
          >Shareable</CheckField
        >
      </div>

      <div v-if="shareable" class="mt-4 w-full">
        <TextField
          v-model="$v.fieldURL.$model"
          label="Shareable Link"
          :disabled="true"
          :error="getValidationMessage($v.fieldURL)"
        >
          <template #append-inner>
            <div class="mr-2 ml-3 text-darksilver fill-current">C</div>
          </template>
        </TextField>
      </div>

      <div
        v-if="isSelected"
        class="
          flex flex-col
          justify-center
          items-center
          mt-4
          space-y-2 space-x-0
          w-full
          md:flex-row md:space-y-0 md:space-x-2
        "
      >
        <Button class="w-full" appearance="outline-red" @click="onClickDelete">
          Delete</Button
        >
        <Button class="w-full" type="submit"> Update</Button>
      </div>
    </form>
  </FloatingPanel>
</template>


<script>
import { DELETE_NOTEBOOK, GET_NOTEBOOKS, UPDATE_NOTEBOOK } from '~/graphql'
export default {
  model: {
    prop: 'visible',
    event: 'toggle'
  },
  props: {
    visible: {
      default: false,
      type: Boolean
    }
  },

  data: () => ({
    fieldName: '',
    fieldURL: '',
    selectedItem: '',
    isDeleteModalVisible: false,
    isSelected: false,
    notebookId: '',
    notebooks: {
      items: []
    },
    shareable: false,
    honeyPot: ''
  }),
  validations: {
    fieldName: {},
    fieldURL: {},
    honeyPot: {}
  },

  computed: {
    visibleModel: {
      get() {
        return this.visible
      },
      set(value) {
        this.$emit('toggle', value)
      }
    }
  },

  apollo: {
    notebooks: {
      query: GET_NOTEBOOKS,
      update(data) {
        return {
          items: data.getNotebooks.notebooks,
          total: data.getNotebooks.meta.total
        }
      },
      variables() {
        return {
          size: 30,
          skip: 0
        }
      }
    }
  },

  methods: {
    async onShareable() {
      // Update and Create link
      /**
       * https://contentre.io/views/_slug
       */
      const input = {
        shareable: this.shareable
      }
      await this.updateNotebook(input)
    },
    onSelected(e) {
      this.isSelected = true
      this.notebookId = e

      const notebook = this.findNotebook(e)
      this.fieldName = notebook.name
      this.fieldURL = notebook.link
      this.shareable = notebook.shareable
      this.isEditable = !notebook.name.includes('Personal Notebook')
    },

    findNotebook(id) {
      return this.notebooks.items.find((item) => item.id === id)
    },

    async onClickDelete() {
      const answer = confirm('Are you sure you want to delete your notebook?')
      if (!answer) {
        this.notebookId = null
        return
      }

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
        this.$toast.positive('Notebook deleted successfully')
        this.sending = false
        this.visibleModel = false
        this.notebookId = null
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
        this.visibleModel = false
      }
    },

    async updateNotebook(input) {
      return await this.$apollo.mutate({
        mutation: UPDATE_NOTEBOOK,
        variables: { id: this.notebookId, input },
        update: (cache, { data: { updateNotebook } }) => {
          this.fieldURL = updateNotebook.link
        }
      })
    },

    async onSubmit() {
      if (await this.isValidationInvalid()) return

      try {
        this.sending = true
        const input = {
          name: this.fieldName,
          shareable: this.shareable
        }

        this.$emit('updated', await this.updateNotebook(input))
        this.$toast.positive('Notebook updated successfully')
        this.visibleModel = false
      } catch (error) {
        this.$toast.negative(error.message)
      } finally {
        this.sending = false
      }
    }
  }
}
</script>

<style>
</style>