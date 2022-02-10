
<template>
  <div>
    <slot />
  </div>
</template>
<script>
export default {
  name: 'ContainerT'
}
</script>
<style  scoped>
div {
  padding: 30px;
  margin: 30px 0px;
  outline: 1px dashed gray;
}
</style>