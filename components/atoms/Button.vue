<template>
  <div class="auth-submit-button__wrapper">
    <button v-bind="$attrs" class="auth-submit-button gilroy-bold">
      <slot />
    </button>
  </div>
</template>

<script>
export default {
  name: 'Button'
}
</script>

<style scoped>
.auth-submit-button__wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
}
.auth-submit-button {
  background: #4fd1c5;
  border-radius: 5px;
  color: white;
  padding: 16px 55px;
  margin: 32px 0;
}
</style>
