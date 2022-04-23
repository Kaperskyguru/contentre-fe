<template>
  <div class="inline-block overflow-hidden min-w-full rounded-lg shadow">
    <div class="p-4">
      <h2 class="font-gilroy text-2xl font-semibold leading-tight">
        {{ title }}
      </h2>
    </div>
    <table class="min-w-full">
      <thead class="bg-white border-b">
        <tr v-if="headers.length">
          <th
            class="
              py-3
              px-5
              font-roboto
              text-xs
              font-semibold
              tracking-wider
              text-left text-gray-600
              uppercase
              bg-gray-100
              border-b-2 border-gray-200
            "
          >
            <CheckField />
          </th>
          <th
            v-for="(header, i) in headers"
            :key="i"
            class="
              py-3
              px-5
              font-roboto
              text-xs
              font-semibold
              tracking-wider
              text-left text-gray-600
              uppercase
              bg-gray-100
              border-b-2 border-gray-200
            "
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody v-if="rowData.length">
        <tr
          v-for="(data, i) in rowData"
          :key="i"
          class="
            bg-white
            hover:bg-gray-100
            border-b
            transition
            duration-300
            ease-in-out
          "
        >
          <td class="py-2 px-5 text-sm whitespace-nowrap">
            <div class="font-roboto text-gray-900 whitespace-no-wrap">
              <CheckField
                :id="uid"
                v-model="checkModel"
                :value="data.id"
                :checked="checked.includes(data.id)"
                @change="addItem(data.id)"
              />
            </div>
          </td>

          <td
            v-for="(body, index) in sortRowDataColumn(data)"
            :key="index"
            class="py-2 px-5 text-sm whitespace-nowrap"
          >
            <p class="font-roboto text-gray-900 whitespace-no-wrap">
              {{ body }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-between items-center py-2 px-5 bg-white border-t">
      <span class="text-sm xs:text-sm text-gray-900"> 15 to 29 out of 96 </span>
      <div class="flex flex-col items-center">
        <div class="flex text-gray-700">
          <div
            class="flex justify-center items-center mr-1 w-8 h-8 cursor-pointer"
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
              class="w-4 h-4 feather feather-chevron-left"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </div>
          <div class="flex h-8 font-medium">
            <div
              class="
                justify-center
                items-center
                w-8
                text-white
                bg-gray-500
                cursor-pointer
                md:flex
              "
            >
              1
            </div>
            <div class="justify-center items-center w-8 cursor-pointer md:flex">
              2
            </div>
            <div class="justify-center items-center w-8 cursor-pointer md:flex">
              ...
            </div>
            <div class="justify-center items-center w-8 cursor-pointer md:flex">
              16
            </div>
          </div>
          <div
            class="flex justify-center items-center ml-1 w-8 h-8 cursor-pointer"
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
              class="w-4 h-4 feather feather-chevron-right"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Table',

  props: {
    title: {
      type: String,
      default: ''
    },
    headers: {
      type: Array,
      default: () => []
    },

    rowData: {
      type: [Object, Array],
      default: () => {}
    }
  },

  data: () => ({
    checked: []
  }),

  computed: {
    uid() {
      return this.$utils.uidGenerator()
    },

    checkModel: {
      get() {
        return this.checked
      },
      set(value) {
        this.$emit('update:checked', value)
      }
    }
  },

  methods: {
    sortRowDataColumn(data) {
      const { id, ...obj } = data
      return Object.values(obj)
    },

    addItem(data) {
      if (this.checked.includes(data)) {
        return this.checked.filter(function (ele) {
          return ele !== data
        })
      } else this.checked.push(data.id)
    }
  }
}
</script>

<style>
</style>
