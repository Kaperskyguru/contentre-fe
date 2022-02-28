<template>
  <div class="flex flex-wrap justify-end items-start -mb-3">
    <div class="inline-flex relative">
      <svg
        class="absolute top-0 right-0 m-4 w-2 h-2 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 412 232"
      >
        <path
          d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355
                  0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 
                  17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592
                   0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
          fill="#648299"
          fill-rule="nonzero"
        ></path>
      </svg>
      <select
        class="
          pr-10
          pl-5
          w-64
          h-10
          text-gray-600
          bg-white
          rounded-sm
          hover:border-gray-400
          focus:outline-none
          appearance-none
          border border-gray-300
        "
      >
        <option>Month</option>
        <option>Red</option>
        <option>Blue</option>
        <option>Yellow</option>
        <option>Black</option>
        <option>Orange</option>
        <option>Purple</option>
        <option>Gray</option>
        <option>White</option>
      </select>
    </div>
    <div class="inline-flex relative ml-2">
      <svg
        class="absolute top-0 right-0 m-4 w-2 h-2 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 412 232"
      >
        <path
          d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355
                  0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 
                  17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592
                   0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
          fill="#648299"
          fill-rule="nonzero"
        ></path>
      </svg>
      <select
        v-model="sortBy"
        class="
          pr-10
          pl-5
          w-64
          h-10
          text-gray-600
          bg-white
          rounded-sm
          hover:border-gray-400
          focus:outline-none
          appearance-none
          border border-gray-300
        "
        @change="onChange"
      >
        <option disabled value="" selected>Filter</option>
        <slot>
          <option v-for="(column, i) in columns" :key="i" :value="column.key">
            {{ column.name }}
          </option></slot
        >
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterS',
  props: {
    columns: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    sortBy: ''
  }),
  methods: {
    onChange(e) {
      this.$emit('filters', { sortBy: this.sortBy })
    }
  }
}
</script>

<style>
</style>