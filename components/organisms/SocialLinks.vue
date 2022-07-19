<template>
  <div class="flex flex-wrap items-center space-x-6">
    <a
      v-for="social in socials"
      :key="social.id"
      target="_blank"
      class="w-8 h-8"
      :href="social.link"
    >
      <Avatar :name="social.name" :src="computeIcon(social.name)" size="auto" />
    </a>
  </div>
</template>

<script>
export default {
  props: {
    socials: {
      type: [Array, Object],
      default: () => []
    }
  },
  methods: {
    computeIcon(name) {
      return require(`~/assets/portfolio/${name}.png`)
    }
  }
}
</script>

<style>
</style>