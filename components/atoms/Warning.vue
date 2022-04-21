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
    <div class="flex justify-between items-center p-2">
      <div class="w-10 h-10">
        <IconInformationCircle />
      </div>
      <div class="items-center text-sm font-normal">
        <slot />
      </div>
      <Button
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