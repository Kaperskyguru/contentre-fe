<template>
  <div class="mb-6">
    <label v-if="label" class="font-gilroy text-body-text-color font-medium tracking-wide mb-2 block">{{ label }}</label>
    <div class="relative">
      <input class="font-gilroy focus:border-body-text-color focus:outline-none border-solid border border-border-inner rounded py-4 pl-5 pr-12 font-medium block w-full" v-bind="$attrs" :type="actualType" />
      <img
        v-if="type === 'password'"
        :src="closeEyes ? closedEye : openedEye"
        :alt="closeEyes ? 'Show Password' : 'Hide Password'"
        class="absolute top-5 right-5"
        @click="togglePasswordType"
      />
    </div>
  </div>
</template>

<script>
import EyeOpen from "~/assets/img/auth-nav/eye-opened.svg";
import EyeClosed from "~/assets/img/auth-nav/eye-closed.svg";

export default {
  name: "TextFieldTW",
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  data: () => ({
    openedEye: EyeOpen,
    closedEye: EyeClosed,
    actualType: 'text'
  }),
  computed: {
    closeEyes() {
      return this.actualType === 'password'
    }
  },
  mounted() {
    this.actualType = this.type
  },
  methods: {
    togglePasswordType() {
      this.actualType = this.actualType === 'password' ? 'text' : 'password'
    }
  }
}
</script>

<style scoped>

</style>
