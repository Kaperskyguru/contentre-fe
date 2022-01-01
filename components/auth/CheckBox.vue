<template>
<label class="auth-checkbox__container">
  <span class="gilroy-medium auth-checkbox__text">
    <slot></slot>
  </span>
  <input type="checkbox" checked="checked">
  <img class="checkmark" :src="CheckMark" alt="Checked" />
</label>
</template>

<script>
import CheckMark from "~/assets/img/auth-nav/u_check.svg"
export default {
  name: "CheckBox",
  data: () => ({
    CheckMark
  })
}
</script>

<style scoped>
/* Customize the label (the container) */
.auth-checkbox__container {
  display: inline-flex;
  position: relative;
  align-items: center;
  padding-left: 35px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.auth-checkbox__container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 30px;
  width: 30px;
  background-color: transparent;
  border-radius: 5px;
  border: 1px solid #BDBDBD;
}

/* On mouse-over, add a grey background color */
.auth-checkbox__container:hover input ~ .checkmark {
  /*background-color: #ccc;*/
}

/* When the checkbox is checked, add a blue background */
.auth-checkbox__container input:checked ~ .checkmark {
  background-color: #4FD1C5;
  border-color: #4FD1C5;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.auth-checkbox__container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.auth-checkbox__container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.auth-checkbox__text {
  color: #888;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.02em;
  margin-left: 8px;
}
</style>
