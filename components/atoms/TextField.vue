<template>
  <div class="mb-6">
    <div>
      <label
        v-if="label"
        class="
          font-gilroy
          text-body-text-color
          font-medium
          tracking-wide
          mb-2
          block
        "
        >{{ label }}</label
      >
      <div class="relative">
        <input
          :value="value"
          class="
            font-gilroy
            focus:border-body-text-color focus:outline-none
            border-solid border border-border-inner
            rounded
            py-4
            pl-5
            pr-12
            font-medium
            block
            w-full
          "
          v-bind="$attrs"
          :type="actualType"
          @input="onInput"
        />
        <img
          v-if="type === 'password'"
          :src="closeEyes ? closedEye : openedEye"
          :alt="closeEyes ? 'Show Password' : 'Hide Password'"
          class="absolute top-5 right-5"
          @click="togglePasswordType"
        />
      </div>
    </div>
    <div class="mt-3">
      <div v-if="error">
        <small class="font-bold font-gilroy text-red-600 text-xs">{{
          error
        }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import EyeOpen from '~/assets/img/auth-nav/eye-opened.svg'
import EyeClosed from '~/assets/img/auth-nav/eye-closed.svg'

export default {
  name: 'TextFieldTW',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },

    type: {
      type: String,
      default: 'text'
    },

    error: { default: null, type: [String, Boolean] },

    value: {
      type: [String, Number],
      default: ''
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
    },
    onInput(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style scoped>
</style>
