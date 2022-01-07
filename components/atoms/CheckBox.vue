<template>
  <label class="inline-flex relative items-center pl-9 cursor-pointer text-sm select-none">
  <span class="font-gilroy text-medium text-grey-shade">
    <slot></slot>
  </span>
    <input
      :checked="isChecked"
      v-bind="$attrs"
      :value="computedValue"
      class="absolute opacity-0 cursor-pointer h-0 w-0" type="checkbox" @change="changed">
    <div
      class="absolute peer-checked:bg-primary-teal justify-center items-center inline-flex top-0 left-0 h-[30px] w-[30px] border rounded bg-transparent border-placeholder">
      <img :src="CheckMark" alt="Checked"/>
    </div>
  </label>
</template>

<script>
import CheckMark from "~/assets/img/auth-nav/u_check.svg";

export default {
  name: "CheckBoxTW",
  inheritAttrs: false,
  model: {
    prop: "modelValue",
    event: "change",
  },
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    modelValue: {
      default: false,
    },
    trueValue: {
      default: true,
    },
    falseValue: {
      default: false,
    },
  },
  data: () => ({
    CheckMark
  }),
  computed: {
    computedValue() {
      return this.value === "" ? this.label : this.value;
    },
    isChecked() {
      if (this.modelValue instanceof Array) {
        return this.modelValue.includes(this.value);
      }
      return this.modelValue === this.trueValue;
    },
  },
  methods: {
    changed(e) {
      const currentlyChecked = e.target.checked;
      if (this.modelValue instanceof Array) {
        const newValue = [...this.modelValue];

        if (currentlyChecked) {
          newValue.push(this.computedValue);
        } else {
          newValue.splice(newValue.indexOf(this.computedValue), 1);
        }

        this.$emit("change", newValue);
      } else {
        this.$emit(
          "change",
          currentlyChecked ? this.trueValue : this.falseValue
        );
      }
    },
  }
}
</script>

<style scoped>

</style>
