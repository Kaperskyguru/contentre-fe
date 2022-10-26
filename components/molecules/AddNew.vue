<template>
  <li class="relative mr-5 cursor-pointer cardd">
    <div
      class="
        group
        flex
        justify-center
        items-center
        h-full
        bg-gray-200
        hover:bg-gray-300
        rounded-xl
        transition-all
        duration-500
      "
      @click.prevent="$emit('add')"
    >
      <div>
        <div class="flex justify-center">
          <img
            src="~/assets/img/add-icon.png"
            alt=""
            class="w-[40px] group-hover:shadow-lg"
          />
        </div>
        <p class="font-semibold">Create New</p>
      </div>
    </div>
  </li>
</template>

<script>
export default {}
</script>

<style>
</style>