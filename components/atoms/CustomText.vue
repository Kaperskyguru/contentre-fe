<template>
  <p class="text-sm leading-6 text-gray-500" v-html="text"></p>
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