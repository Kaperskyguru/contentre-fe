<template>
  <div class="auth-input__wrapper">
    <label v-if="label" class="gilroy-medium">{{ label }}</label>
    <div class="auth-input__container">
      <input class="gilroy-medium" :type="actualType" v-bind="$attrs" />
      <img
        v-if="type === 'password'"
        :src="closeEyes ? closedEye : openedEye"
        :alt="closeEyes ? 'Show Password' : 'Hide Password'"
        @click="togglePasswordType"
      />
    </div>
  </div>
</template>

<script>
import EyeOpen from '~/assets/img/auth-nav/eye-opened.svg'
import EyeClosed from '~/assets/img/auth-nav/eye-closed.svg'

export default {
  name: 'InputField',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  data: () => ({
    openedEye: EyeOpen,
    closedEye: EyeClosed,
    actualType: 'text',
  }),
  computed: {
    closeEyes() {
      return this.actualType === 'password'
    },
  },
  mounted() {
    this.actualType = this.type
  },
  methods: {
    togglePasswordType() {
      this.actualType = this.actualType === 'password' ? 'text' : 'password'
    },
  },
}
</script>

<style scoped>
.auth-input__wrapper {
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-bottom: 24px;
}

.auth-input__wrapper input {
  border: 1px solid rgba(153, 153, 153, 0.6);
  border-radius: 5px;
  padding: 15px 30px;
  font-size: 16px;
  display: block;
  width: 100%;
}

.auth-input__wrapper label {
  color: #102a27;
  line-height: 24px;
  font-size: 16px;
  margin-bottom: 8px;
}

.auth-input__wrapper input::placeholder {
  color: #bdbdbd;
}

.auth-input__container {
  position: relative;
  width: 100%;
  display: block;
}

.auth-input__container img {
  position: absolute;
  right: 5%;
  top: calc(50% - 12px);
  cursor: pointer;
}
</style>
