<template>
  <main class="w-full min-h-screen">
    <div class="container mx-auto mt-5">
      <Editor component="div" class="w-full" :resolver-map="resolverMap">
        <div class="flex flex-row justify-between">
          <div class="w-1/3">
            <Blueprint component="Button">
              Paragraph
              <template #blueprint>
                <Paragraph />
              </template>
            </Blueprint>
            <Blueprint component="Button">
              Container
              <template #blueprint>
                <Canvas component="Container" />
              </template>
            </Blueprint>

            <div class="mt-5">
              <SettingPanel />
            </div>
          </div>
          <div class="w-full">
            <Frame component="div" class="preview-panel">
              <Canvas component="Container">
                <Paragraph />
              </Canvas>
            </Frame>
          </div>
        </div>
      </Editor>
    </div>
  </main>
</template>

<script>
import { Canvas, Editor, Frame, Blueprint } from '@v-craft/core'
import SettingPanel from '~/components/SettingPanel.vue'
import Container from '~/components/elements/Container.vue'
import Paragraph from '~/components/elements/Paragraph.vue'

export default {
  name: 'TestApp',
  components: {
    Canvas,
    Editor,
    Frame,
    Paragraph,
    SettingPanel,
    Blueprint
  },
  data() {
    return {
      resolverMap: {
        Canvas,
        Container,
        Paragraph
      }
    }
  }
}
</script>