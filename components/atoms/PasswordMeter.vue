<template>
  <div class="flex items-start">
    <div :class="[correct ? 'bg-primary-teal' : 'bg-default-grey']" class="inline-block mt-1 mr-1.5 rounded-full w-2.5 h-2.5"></div>
    <small
          :class="[correct ? 'text-body-text-color' : 'text-placeholder']"
           class="font-gilroy text-sm">{{ text }}</small>
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
