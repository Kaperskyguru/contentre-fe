<template>
<label class="inline-flex relative items-center pl-9 cursor-pointer text-sm select-none">
  <span class="font-gilroy text-medium text-grey-shade">
    <slot></slot>
  </span>
  <input class="absolute opacity-0 cursor-pointer h-0 w-0" type="checkbox">
  <img class="absolute top-0 left-0 h-[30px] w-[30px] border rounded bg-transparent border-placeholder" :src="CheckMark" alt="Checked" />
</label>
</template>

<script>
import CheckMark from "~/assets/img/auth-nav/u_check.svg";

export default {
  name: "CheckBoxTW",
  data: () => ({
    CheckMark
  })
}
</script>

<style scoped>

</style>
