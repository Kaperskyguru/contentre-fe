<template>
  <div class="correct-password-identifier">
    <div class="correct-password-identifier__dot" :class="{correct}"/>
    <small class="correct-password-identifier__text gilroy-regular" :class="{correct}">{{text}}</small>
  </div>
</template>

<script>
export default {
  name: "CorrectPasswordIdentifier",
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
.correct-password-identifier__dot {
  border-radius: 50%;
  background: #C4C4C4;
  height: 10px;
  width: 10px;
  display: inline-flex;
  margin-right: 8px;
}
.correct-password-identifier__dot.correct {
  background: #4FD1C5
}
.correct-password-identifier {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.correct-password-identifier__text {
  color: #BDBDBD;
  font-size: 14px;
  letter-spacing: 0.02em;
}
.correct-password-identifier__text.correct {
  color: #102A27;
  font-family: "Gilroy-Bold", sans-serif;
}
</style>
