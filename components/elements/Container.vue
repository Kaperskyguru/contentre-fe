
<template>
  <!-- <div id="main" class="" style="position: relative"> -->
  <VueDraggableResizable
    :w="100"
    :h="100"
    :parent="true"
    @dragging="onDrag"
    @resizing="onResize"
  >
    <slot />
  </VueDraggableResizable>
  <!-- </div> -->
</template>
<script>
import VueDraggableResizable from 'vue-draggable-resizable'
export default {
  name: 'ContainerT',

  components: {
    VueDraggableResizable
  },

  data() {
    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0
    }
  },
  methods: {
    onResize(x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    },
    onDrag(x, y) {
      this.x = x
      this.y = y
    }
  }
}
</script>
<style  scoped>
div#main {
  padding: 30px;
  margin: 30px 0px;
  outline: 1px dashed red;
}
</style>