<template>
  <div
    class="
      w-full
      before:w-10 before:h-full before:content-[''] before:bg-red-200
      bg-red-100
      rounded
      opacity-70
    "
  >
    <div class="border-2 border-red-300"></div>
    <div
      class="flex flex-col items-center p-2 space-y-2 md:flex-row"
      :class="{ 'justify-between': showButton }"
    >
      <div class="w-10 h-10">
        <IconInformationCircle />
      </div>
      <div class="items-start" :class="{ 'items-center': showButton }">
        <slot />
      </div>
      <Button
        v-if="showButton"
        v-bind="$attrs"
        :type="link ? 'link' : ''"
        :to="link === '#' ? '' : link"
        appearance="outline-red"
        >{{ buttonText }}</Button
      >
    </div>
  </div>
</template>

<script>
import IconInformationCircle from '~/assets/icons/information-circle.svg?inline'
export default {
  name: 'WarninG',

  components: {
    IconInformationCircle
  },

  props: {
    showButton: {
      type: Boolean,
      default: true
    },
    buttonText: {
      type: String,
      default: 'Upgrade'
    },

    link: {
      type: String,
      default: '#'
    }
  }
}
</script>

<style>
</style>