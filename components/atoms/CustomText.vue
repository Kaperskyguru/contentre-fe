<template>
  <p class="text-sm text-gray-500 leading-6">
    {{ text }}
  </p>
</template>

<script>
export default {
  name: 'CustomText',
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
</style>