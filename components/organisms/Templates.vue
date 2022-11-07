<template>
  <section class="w-full">
    <PortfolioTemplates :templates="templates" title="Technical Writing" />
  </section>
</template>

<script>
import { GET_TEMPLATES } from '~/graphql'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Templates',

  data: () => ({
    templates: []
  }),
  apollo: {
    templates: {
      query: GET_TEMPLATES,
      variables: {
        size: 10,
        skip: 0
      },
      update(data) {
        return data.getTemplates
      }
    }
  }
}
</script>

<style>
</style>