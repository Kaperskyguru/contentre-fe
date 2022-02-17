<template>
  <div class="setting-panel">
    <div class="custom-control custom-switch">
      <input
        id="editorState"
        :checked="editor.enabled"
        type="checkbox"
        class="custom-control-input"
        @change="toggleState"
      />
      <label class="custom-control-label" for="editorState">Enable</label>
    </div>
    <hr />
    <div v-if="settings" class="settings">
      <component
        :is="component"
        v-for="(component, name) in settings"
        :key="name"
      ></component>
    </div>
    <Button v-if="selectedNode" @click="removeElement"> Delete </Button>
  </div>
</template>

<script>
export default {
  name: 'SettingPanel',
  inject: ['editor'],
  computed: {
    selectedNode() {
      return this.editor.selectedNode
    },
    settings() {
      if (!this.selectedNode) {
        return null
      }

      return this.editor.getSettings(this.selectedNode)
    }
  },

  methods: {
    removeElement() {
      return this.editor.removeNode(this.selectedNode)
    },
    toggleState() {
      if (this.editor.enabled) {
        this.editor.disable()
      } else {
        this.editor.enable()
      }
    }
  }
}
</script>