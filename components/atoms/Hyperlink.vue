<template>
  <NuxtLink v-bind="$attrs" :class="extraClasses" v-on="$listeners">
    <slot />
  </NuxtLink>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'HyperLink',
  extend: Vue.component('NuxtLink'),

  props: {
    extraClasses: {
      type: String,
      default: 'hyperlink'
    }
  }
}
</script>
