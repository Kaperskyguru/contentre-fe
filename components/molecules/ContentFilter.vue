<template>
  <div class="py-4 flex flex items-center flex-wrap">
    <div class="w-2/5 bg-white shadow rounded-sm p-4">
      <ul class="flex items-center flex-wrap justify-between calender-font">
        <li>
          <a
            href="#"
            class="
              text-sm
              font-normal
              text-gray-600
              hover:text-black
              focus:text-black
              md:mr-6
            "
            >Days</a
          >
        </li>
        <li>
          <a
            href="#"
            class="
              text-sm
              font-bold
              text-gray-600
              hover:text-dark
              focus:text-black
              md:mr-6
            "
            >Week</a
          >
        </li>
        <li>
          <a
            href="#"
            class="
              text-sm
              font-normal
              text-gray-600
              hover:text-dark
              focus:text-black
              md:mr-6
            "
            >Month</a
          >
        </li>
        <li>
          <a
            href="#"
            class="
              text-sm
              font-normal
              text-gray-600
              hover:text-dark
              focus:text-black
              md:mr-6
            "
            >Year</a
          >
        </li>
      </ul>
    </div>
    <div class="flex sm:justify-center space-x-6">
      <div class="relative inline-flex ml-2">
        <SelectIcon />
        <select
          class="
            border border-gray-300
            rounded-sm
            text-gray-600
            h-10
            pl-5
            pr-10
            bg-white
            hover:border-gray-400
            focus:outline-none
            appearance-none
          "
        >
          <option>Add Widget</option>
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
    </div>
  </div>
</template>

<script>
import SelectIcon from '~/assets/icons/select.svg?inline'
export default {
  components: {
    SelectIcon
  }
}
</script>

<style>
</style>