<template>
  <p>{{ content }}</p>
</template>

<script>
import ParagraphSetting from './ParagraphSetting.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Paragraph',
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  // We introduce a craft config attribute in vue's component option,
  // that can define the default props of our page element.
  craft: {
    defaultProps: {
      content: 'Lorem ipsum dolor'
    },
    settings: {
      ParagraphSetting
    }
  }
}
</script>