<template>
  <div id="page-title__wrapper">
    <h1 id="page-title">{{title}}</h1>
  </div>
</template>

<script>
export default {
  name: "PageTitle",
  props: {
    title: {
      type: String,
      default: "Create Account",
    }
  }
}
</script>

<style scoped>
#page-title__wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 40px;
}
#page-title {
  color: #286963;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: 0.02em;
  font-family: "Gilroy-Bold", sans-serif;
}
</style>
