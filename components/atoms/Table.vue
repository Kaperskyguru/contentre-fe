<template>
  <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
    <div class="pb-4 px-4 pt-4">
      <h2 class="text-2xl font-gilroy font-semibold leading-tight">
        {{ title }}
      </h2>
    </div>
    <table class="min-w-full">
      <thead class="bg-white border-b">
        <tr v-if="headers.length">
          <th
            class="
              px-5
              py-3
              border-b-2 border-gray-200
              bg-gray-100
              text-left text-xs
              font-semibold font-roboto
              text-gray-600
              uppercase
              tracking-wider
            "
          >
            <CheckField />
          </th>
          <th
            v-for="(header, i) in headers"
            :key="i"
            class="
              px-5
              py-3
              border-b-2 border-gray-200
              bg-gray-100
              text-left text-xs
              font-semibold font-roboto
              text-gray-600
              uppercase
              tracking-wider
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
            border-b
            transition
            duration-300
            ease-in-out
            hover:bg-gray-100
          "
        >
          <td class="px-5 py-2 whitespace-nowrap text-sm">
            <div class="text-gray-900 font-roboto whitespace-no-wrap">
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
            class="px-5 py-2 whitespace-nowrap text-sm"
          >
            <p class="text-gray-900 font-roboto whitespace-no-wrap">
              {{ body }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="px-5 py-2 bg-white border-t flex items-center justify-between">
      <span class="text-sm xs:text-sm text-gray-900"> 15 to 29 out of 96 </span>
      <div class="flex flex-col items-center">
        <div class="flex text-gray-700">
          <div
            class="h-8 w-8 mr-1 flex justify-center items-center cursor-pointer"
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
              class="feather feather-chevron-left w-4 h-4"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </div>
          <div class="flex h-8 font-medium">
            <div
              class="
                w-8
                md:flex
                justify-center
                items-center
                cursor-pointer
                bg-gray-500
                text-white
              "
            >
              1
            </div>
            <div class="w-8 md:flex justify-center items-center cursor-pointer">
              2
            </div>
            <div class="w-8 md:flex justify-center items-center cursor-pointer">
              ...
            </div>
            <div class="w-8 md:flex justify-center items-center cursor-pointer">
              16
            </div>
          </div>
          <div
            class="h-8 w-8 ml-1 flex justify-center items-center cursor-pointer"
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
              class="feather feather-chevron-right w-4 h-4"
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
        console.log(value)
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
