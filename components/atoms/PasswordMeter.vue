<template>
<div class="flex items-start">
  <div class="inline-block mt-1 mr-1.5 bg-default-grey rounded-full w-2.5 h-2.5"></div>
  <small class="font-gilroy text-placeholder text-sm">{{text}}</small>
</div>
</template>

<script>
export default {
  name: "PasswordMeterTW",
  props: {
    text: {
      type: String,
      default: "Password should be at least 6 characters"
    },
    correct: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
