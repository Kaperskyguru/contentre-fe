<template>
  <p>{{ content }}</p>
</template>

<script>
import ParagraphSetting from '~/components/elements/ParagraphSetting.vue'
export default {
  name: 'ParagraphE',
  props: {
    content: String
  },
  // We introduce a craft config attribute in vue's component option,
  // that can define the default props of our page element.
  craft: {
    defaultProps: {
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }
  },
  settings: {
    ParagraphSetting
  }
}
</script>