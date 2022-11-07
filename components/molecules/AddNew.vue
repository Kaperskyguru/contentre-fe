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
        <div class="flex justify-center pb-1">
          <BigAddIcon />
        </div>
        <p class="font-semibold">Create New</p>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  components: {
    BigAddIcon: () => import('~/assets/icons/big-add.svg?inline')
  }
}
</script>

<style>
</style>