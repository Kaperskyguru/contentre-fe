<template>
  <div>
    <input
      v-model="content"
      class="
        block
        py-4
        pr-12
        pl-5
        w-full
        rounded
        focus:border-body-text-color focus:outline-none
        font-gilroy font-medium
        border-solid border border-border-inner
      "
      type="text"
    />
  </div>
</template>

<script>
// import { settingMixin } from '@v-craft/core'

export default {
  //   mixins: [settingMixin],
  computed: {
    content: {
      get() {
        return this.elementProps.content
      },
      set(value) {
        this.updateContent(value)
      }
    }
  },
  methods: {
    updateContent(content) {
      this.elementPropsSetter({ content })
    }
  }
}
</script>