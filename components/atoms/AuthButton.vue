<template>
<div class="flex my-9 w-full justify-center">
  <button :disabled="disabled" v-bind="$attrs" class="auth-button disabled:cursor-not-allowed disabled:opacity-75 font-gilroy mx-auto inline-block font-bold rounded text-white text-base bg-primary-teal py-4 px-8 text-center sm:text-xl">
    <slot></slot>
  </button>
</div>
</template>

<script>
export default {
  name: "AuthButtonTW",
  inheritAttrs: false,
  props: {
    disabled: {
      type: Boolean
    }
  }
}
</script>

<style scoped>
.auth-button:disabled {
  cursor: not-allowed;
}
</style>
