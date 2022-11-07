<template>
  <div class="p-4 mt-5 bg-gray-100 rounded-xl">
    <div class="flex justify-between items-center">
      <div class="flex items-center space-x-2">
        <img :src="getIcon" alt="" />
        <a href="#" class="text-lg font-semibold">{{ title }}</a>
      </div>
    </div>

    <div class="flex overflow-x-scroll items-start py-3 no-scrollbar">
      <PortfolioTemplate
        v-for="template in templates"
        :key="template.id"
        :template="template"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    templates: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: null
    }
  },

  computed: {
    getIcon() {
      return this.icon ?? require('~/assets/img/document-text.png')
    }
  }
}
</script>

<style>
</style>