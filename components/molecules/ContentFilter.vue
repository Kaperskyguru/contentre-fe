<template>
  <div class="flex flex-wrap items-center py-4">
    <div class="p-4 w-1/5 bg-white rounded-sm shadow">
      <ul class="flex flex-wrap justify-start items-center">
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
              hover:text-gray-900
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
              hover:text-gray-900
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
              hover:text-gray-900
              focus:text-black
              md:mr-6
            "
            >Year</a
          >
        </li>
      </ul>
    </div>
    <div class="flex sm:justify-center">
      <div class="inline-flex relative p-2 ml-2 bg-white rounded-sm shadow">
        <select
          class="
            pl-5
            text-gray-600
            rounded-sm
            hover:border-none
            focus:outline-none
            appearance-none
            border border-none
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
export default {
  components: {}
}
</script>

<style>
</style>